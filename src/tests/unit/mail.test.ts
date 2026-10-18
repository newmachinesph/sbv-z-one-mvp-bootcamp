import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// ---------------------------------------------------------------------------
// vi.hoisted() ensures mock values exist when the hoisted vi.mock() factory
// executes. This avoids the "Cannot access before initialization" error.
// ---------------------------------------------------------------------------
const { sendMailMock, createTransportMock } = vi.hoisted(() => {
  const sendMailMock = vi.fn();
  const createTransportMock = vi.fn().mockReturnValue({ sendMail: sendMailMock });
  return { sendMailMock, createTransportMock };
});

vi.mock("nodemailer", () => ({
  default: { createTransport: createTransportMock },
}));

import { sendEmail } from "@/lib/mail";

const baseOpts = {
  to: "recipient@example.com",
  subject: "Hello",
  html: "<p>Test email</p>",
};

// =============================================================================
// Happy path
// =============================================================================

describe("sendEmail — happy path", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("resolves without error when sendMail succeeds on the first attempt", async () => {
    sendMailMock.mockResolvedValueOnce(undefined);
    await expect(sendEmail(baseOpts)).resolves.toBeUndefined();
    expect(sendMailMock).toHaveBeenCalledTimes(1);
  });

  it("passes the correct 'to', 'subject', and 'html' fields to nodemailer", async () => {
    sendMailMock.mockResolvedValueOnce(undefined);
    await sendEmail(baseOpts);

    const callArgs = sendMailMock.mock.calls[0][0];
    expect(callArgs.to).toBe("recipient@example.com");
    expect(callArgs.subject).toBe("Hello");
    expect(callArgs.html).toBe("<p>Test email</p>");
  });

  it("builds the 'from' field using MAIL_FROM_NAME and MAIL_FROM env vars", async () => {
    process.env.MAIL_FROM_NAME = "Test Platform";
    process.env.MAIL_FROM = "noreply@test.com";
    sendMailMock.mockResolvedValueOnce(undefined);

    await sendEmail(baseOpts);

    const callArgs = sendMailMock.mock.calls[0][0];
    expect(callArgs.from).toBe("Test Platform <noreply@test.com>");

    delete process.env.MAIL_FROM_NAME;
    delete process.env.MAIL_FROM;
  });

  it("falls back to MAIL_USERNAME for fromAddress when MAIL_FROM is not set", async () => {
    delete process.env.MAIL_FROM;
    process.env.MAIL_USERNAME = "admin@fallback.com";
    sendMailMock.mockResolvedValueOnce(undefined);

    await sendEmail(baseOpts);

    const callArgs = sendMailMock.mock.calls[0][0];
    expect(callArgs.from).toContain("admin@fallback.com");

    delete process.env.MAIL_USERNAME;
  });

  it("falls back to 'info@sbv.one' when neither MAIL_FROM nor MAIL_USERNAME is set", async () => {
    delete process.env.MAIL_FROM;
    delete process.env.MAIL_USERNAME;
    sendMailMock.mockResolvedValueOnce(undefined);

    await sendEmail(baseOpts);

    const callArgs = sendMailMock.mock.calls[0][0];
    expect(callArgs.from).toContain("info@sbv.one");
  });

  it("forwards cc, bcc, and replyTo to nodemailer", async () => {
    sendMailMock.mockResolvedValueOnce(undefined);
    await sendEmail({
      ...baseOpts,
      cc: "cc@example.com",
      bcc: ["bcc1@example.com", "bcc2@example.com"],
      replyTo: "reply@example.com",
    });

    const callArgs = sendMailMock.mock.calls[0][0];
    expect(callArgs.cc).toBe("cc@example.com");
    expect(callArgs.bcc).toEqual(["bcc1@example.com", "bcc2@example.com"]);
    expect(callArgs.replyTo).toBe("reply@example.com");
  });

  it("builds envelope including bcc recipients", async () => {
    sendMailMock.mockResolvedValueOnce(undefined);
    await sendEmail({
      ...baseOpts,
      bcc: ["bcc@example.com"],
    });

    const callArgs = sendMailMock.mock.calls[0][0];
    expect(callArgs.envelope.to).toContain("bcc@example.com");
    expect(callArgs.envelope.to).toContain("recipient@example.com");
  });

  it("creates a fresh transporter on each call (not memoized)", async () => {
    sendMailMock.mockResolvedValue(undefined);
    await sendEmail(baseOpts);
    await sendEmail(baseOpts);
    // createTransport should have been called once per sendEmail call
    expect(createTransportMock).toHaveBeenCalledTimes(2);
  });
});

// =============================================================================
// Retry logic
// =============================================================================

describe("sendEmail — retry logic", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("retries after a transient failure and succeeds on the second attempt", async () => {
    sendMailMock
      .mockRejectedValueOnce(new Error("SMTP connection timeout"))
      .mockResolvedValueOnce(undefined);

    const promise = sendEmail(baseOpts);
    // Advance timers past the first retry delay (1000ms * 1 = 1000ms)
    await vi.advanceTimersByTimeAsync(1500);
    await expect(promise).resolves.toBeUndefined();

    expect(sendMailMock).toHaveBeenCalledTimes(2);
  });

  it("retries again after a second failure and succeeds on the third attempt", async () => {
    sendMailMock
      .mockRejectedValueOnce(new Error("attempt 1"))
      .mockRejectedValueOnce(new Error("attempt 2"))
      .mockResolvedValueOnce(undefined);

    const promise = sendEmail(baseOpts);
    // Advance past delays for attempts 1 and 2 (1000ms + 2000ms)
    await vi.advanceTimersByTimeAsync(4000);
    await expect(promise).resolves.toBeUndefined();

    expect(sendMailMock).toHaveBeenCalledTimes(3);
  });

  it("throws the last error after all 3 attempts fail", async () => {
    sendMailMock
      .mockRejectedValueOnce(new Error("attempt 1"))
      .mockRejectedValueOnce(new Error("attempt 2"))
      .mockRejectedValueOnce(new Error("Permanent SMTP failure"));

    // Start the email send and capture the rejection alongside timer advancement
    // in a single await so the promise always has a rejection handler attached.
    const [result] = await Promise.allSettled([
      sendEmail(baseOpts),
      vi.advanceTimersByTimeAsync(6000),
    ]);

    expect(result.status).toBe("rejected");
    expect((result as PromiseRejectedResult).reason.message).toBe("Permanent SMTP failure");

    // Exactly 3 attempts, no more
    expect(sendMailMock).toHaveBeenCalledTimes(3);
  });

  it("does not retry after a successful first attempt", async () => {
    sendMailMock.mockResolvedValueOnce(undefined);
    const promise = sendEmail(baseOpts);
    await vi.advanceTimersByTimeAsync(5000);
    await expect(promise).resolves.toBeUndefined();
    expect(sendMailMock).toHaveBeenCalledTimes(1);
  });

  it("creates a new transporter on each retry attempt", async () => {
    sendMailMock
      .mockRejectedValueOnce(new Error("fail"))
      .mockRejectedValueOnce(new Error("fail"))
      .mockResolvedValueOnce(undefined);

    const promise = sendEmail(baseOpts);
    await vi.advanceTimersByTimeAsync(5000);
    await promise;

    // 3 attempts => 3 transporter creations
    expect(createTransportMock).toHaveBeenCalledTimes(3);
  });
});

// =============================================================================
// createTransporter configuration
// =============================================================================

describe("sendEmail — transporter configuration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("uses port 587 by default when MAIL_PORT is not set", async () => {
    delete process.env.MAIL_PORT;
    sendMailMock.mockResolvedValueOnce(undefined);
    await sendEmail(baseOpts);

    const transportConfig = createTransportMock.mock.calls[0][0];
    expect(transportConfig.port).toBe(587);
  });

  it("uses the port from MAIL_PORT env var when set", async () => {
    process.env.MAIL_PORT = "465";
    sendMailMock.mockResolvedValueOnce(undefined);
    await sendEmail(baseOpts);

    const transportConfig = createTransportMock.mock.calls[0][0];
    expect(transportConfig.port).toBe(465);

    delete process.env.MAIL_PORT;
  });

  it("sets secure=true when MAIL_SSL_TLS is 'true'", async () => {
    process.env.MAIL_SSL_TLS = "true";
    sendMailMock.mockResolvedValueOnce(undefined);
    await sendEmail(baseOpts);

    const transportConfig = createTransportMock.mock.calls[0][0];
    expect(transportConfig.secure).toBe(true);

    delete process.env.MAIL_SSL_TLS;
  });

  it("sets secure=false when MAIL_SSL_TLS is not 'true'", async () => {
    process.env.MAIL_SSL_TLS = "false";
    sendMailMock.mockResolvedValueOnce(undefined);
    await sendEmail(baseOpts);

    const transportConfig = createTransportMock.mock.calls[0][0];
    expect(transportConfig.secure).toBe(false);

    delete process.env.MAIL_SSL_TLS;
  });
});
