import { describe, it, expect, vi, beforeEach } from "vitest";
import { mockReset } from "vitest-mock-extended";

vi.mock("@/lib/prisma", async () => {
  const { prismaMock } = await import("@/tests/helpers/prisma-mock");
  return { prisma: prismaMock };
});

import { prismaMock } from "@/tests/helpers/prisma-mock";
vi.mock("@/lib/mail", () => ({ sendEmail: vi.fn().mockResolvedValue(undefined) }));
vi.mock("@/lib/rate-limit", () => ({
  checkRateLimit: vi.fn().mockReturnValue({ allowed: true, retryAfterMs: 0 }),
  getRateLimitKey: vi.fn().mockReturnValue("test-ip"),
}));
vi.mock("@react-email/components", () => ({ render: vi.fn().mockResolvedValue("<html/>") }));
vi.mock("@/emails/application-confirmation", () => ({ default: vi.fn(() => null) }));

import { POST } from "@/app/api/apply/route";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const BASE_VALID_BODY = {
  name: "Test Applicant",
  email: "applicant@example.com",
  linkedinUrl: "https://linkedin.com/in/testapplicant",
  preferredRole: "hacker",
  skills: ["JavaScript", "React"],
  experience: "3 years building web apps",
  motivation:
    "I want to build products that truly help people and working within a structured 4H team framework is exactly the kind of environment I need to grow.",
  location: "Manila, Philippines",
};

function makeApplicantRow(overrides = {}) {
  return {
    id: "applicant-cuid-001",
    name: BASE_VALID_BODY.name,
    email: BASE_VALID_BODY.email,
    preferredRole: "HACKER",
    skills: BASE_VALID_BODY.skills,
    experience: BASE_VALID_BODY.experience,
    motivation: BASE_VALID_BODY.motivation,
    linkedinUrl: BASE_VALID_BODY.linkedinUrl,
    resumeUrl: null,
    portfolioUrl: null,
    location: BASE_VALID_BODY.location,
    status: "PENDING",
    appliedAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
}

function makeRequest(body: object): Request {
  return new Request("http://localhost/api/apply", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

// =============================================================================
// Happy path
// =============================================================================

describe("POST /api/apply — happy path", () => {
  beforeEach(() => {
    mockReset(prismaMock);
    prismaMock.applicant.findUnique.mockResolvedValue(null);
    prismaMock.applicant.create.mockResolvedValue(makeApplicantRow() as never);
    prismaMock.admin.findMany.mockResolvedValue([]);
  });

  it("returns 201 with applicant id on a complete valid submission", async () => {
    const res = await POST(makeRequest(BASE_VALID_BODY));
    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.id).toBe("applicant-cuid-001");
    expect(body.message).toMatch(/submitted successfully/i);
  });

  it("stores skills as array when skills is a comma-separated string", async () => {
    prismaMock.applicant.create.mockResolvedValue(makeApplicantRow() as never);
    await POST(makeRequest({ ...BASE_VALID_BODY, skills: "JavaScript, React, Node.js" }));

    const createCall = prismaMock.applicant.create.mock.calls[0][0];
    expect(Array.isArray(createCall.data.skills)).toBe(true);
    expect(createCall.data.skills).toContain("JavaScript");
    expect(createCall.data.skills).toContain("React");
    expect(createCall.data.skills).toContain("Node.js");
  });

  it("trims whitespace from name before storing", async () => {
    prismaMock.applicant.create.mockResolvedValue(makeApplicantRow() as never);
    await POST(makeRequest({ ...BASE_VALID_BODY, name: "  Test Applicant  " }));
    const createCall = prismaMock.applicant.create.mock.calls[0][0];
    expect(createCall.data.name).toBe("Test Applicant");
  });

  it("lowercases email before storing", async () => {
    prismaMock.applicant.create.mockResolvedValue(makeApplicantRow() as never);
    await POST(makeRequest({ ...BASE_VALID_BODY, email: "UPPER@EXAMPLE.COM" }));
    const createCall = prismaMock.applicant.create.mock.calls[0][0];
    expect(createCall.data.email).toBe("upper@example.com");
  });

  it("stores null for optional resumeUrl when not provided", async () => {
    const { resumeUrl: _, ...withoutResume } = BASE_VALID_BODY as typeof BASE_VALID_BODY & { resumeUrl?: string };
    prismaMock.applicant.create.mockResolvedValue(makeApplicantRow() as never);
    await POST(makeRequest(withoutResume));
    const createCall = prismaMock.applicant.create.mock.calls[0][0];
    expect(createCall.data.resumeUrl).toBeNull();
  });

  it("accepts an optional valid resumeUrl", async () => {
    prismaMock.applicant.create.mockResolvedValue(makeApplicantRow({ resumeUrl: "https://example.com/resume.pdf" }) as never);
    const res = await POST(makeRequest({ ...BASE_VALID_BODY, resumeUrl: "https://example.com/resume.pdf" }));
    expect(res.status).toBe(201);
  });

  it("accepts an optional valid portfolioUrl", async () => {
    prismaMock.applicant.create.mockResolvedValue(makeApplicantRow({ portfolioUrl: "https://portfolio.dev" }) as never);
    const res = await POST(makeRequest({ ...BASE_VALID_BODY, portfolioUrl: "https://portfolio.dev" }));
    expect(res.status).toBe(201);
  });
});

// =============================================================================
// Required field validation
// =============================================================================

describe("POST /api/apply — required field validation", () => {
  beforeEach(() => {
    mockReset(prismaMock);
    prismaMock.applicant.findUnique.mockResolvedValue(null);
  });

  const requiredFields = ["name", "email", "linkedinUrl", "preferredRole", "skills", "experience", "motivation"] as const;

  requiredFields.forEach((field) => {
    it(`returns 400 when '${field}' is missing`, async () => {
      const body = { ...BASE_VALID_BODY } as Record<string, unknown>;
      delete body[field];
      const res = await POST(makeRequest(body));
      expect(res.status).toBe(400);
    });
  });

  it("returns 400 when location is missing", async () => {
    const { location: _, ...noLocation } = BASE_VALID_BODY as typeof BASE_VALID_BODY & { location?: string };
    const res = await POST(makeRequest(noLocation));
    expect(res.status).toBe(400);
  });

  it("returns 400 when location is an empty string", async () => {
    const res = await POST(makeRequest({ ...BASE_VALID_BODY, location: "" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 when location is whitespace only", async () => {
    const res = await POST(makeRequest({ ...BASE_VALID_BODY, location: "   " }));
    expect(res.status).toBe(400);
  });
});

// =============================================================================
// Name validation
// =============================================================================

describe("POST /api/apply — name validation", () => {
  beforeEach(() => {
    mockReset(prismaMock);
    prismaMock.applicant.findUnique.mockResolvedValue(null);
    prismaMock.applicant.create.mockResolvedValue(makeApplicantRow() as never);
    prismaMock.admin.findMany.mockResolvedValue([]);
  });

  it("rejects name longer than 200 characters", async () => {
    const res = await POST(makeRequest({ ...BASE_VALID_BODY, name: "A".repeat(201) }));
    expect(res.status).toBe(400);
  });

  it("accepts name exactly 200 characters", async () => {
    const res = await POST(makeRequest({ ...BASE_VALID_BODY, name: "A".repeat(200) }));
    expect(res.status).toBe(201);
  });

  it("returns 400 when name is not a string (number passed)", async () => {
    const res = await POST(makeRequest({ ...BASE_VALID_BODY, name: 12345 }));
    expect(res.status).toBe(400);
  });
});

// =============================================================================
// Email validation
// =============================================================================

describe("POST /api/apply — email validation", () => {
  beforeEach(() => {
    mockReset(prismaMock);
    prismaMock.applicant.findUnique.mockResolvedValue(null);
    prismaMock.applicant.create.mockResolvedValue(makeApplicantRow() as never);
    prismaMock.admin.findMany.mockResolvedValue([]);
  });

  it("rejects an invalid email address", async () => {
    const res = await POST(makeRequest({ ...BASE_VALID_BODY, email: "not-an-email" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.field).toBe("email");
  });

  it("rejects an email with no domain", async () => {
    const res = await POST(makeRequest({ ...BASE_VALID_BODY, email: "user@" }));
    expect(res.status).toBe(400);
  });
});

// =============================================================================
// Motivation boundary conditions
// =============================================================================

describe("POST /api/apply — motivation field boundary conditions", () => {
  beforeEach(() => {
    mockReset(prismaMock);
    prismaMock.applicant.findUnique.mockResolvedValue(null);
    prismaMock.applicant.create.mockResolvedValue(makeApplicantRow() as never);
    prismaMock.admin.findMany.mockResolvedValue([]);
  });

  it("rejects motivation with exactly 49 characters (below minimum)", async () => {
    const res = await POST(makeRequest({ ...BASE_VALID_BODY, motivation: "x".repeat(49) }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.field).toBe("motivation");
  });

  it("accepts motivation with exactly 50 characters (boundary minimum)", async () => {
    const res = await POST(makeRequest({ ...BASE_VALID_BODY, motivation: "x".repeat(50) }));
    expect(res.status).toBe(201);
  });

  it("accepts motivation with exactly 5000 characters (boundary maximum)", async () => {
    const res = await POST(makeRequest({ ...BASE_VALID_BODY, motivation: "x".repeat(5000) }));
    expect(res.status).toBe(201);
  });

  it("rejects motivation with exactly 5001 characters (above maximum)", async () => {
    const res = await POST(makeRequest({ ...BASE_VALID_BODY, motivation: "x".repeat(5001) }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.field).toBe("motivation");
  });

  it("rejects motivation that is not a string", async () => {
    const res = await POST(makeRequest({ ...BASE_VALID_BODY, motivation: 12345 }));
    expect(res.status).toBe(400);
  });
});

// =============================================================================
// LinkedIn URL validation
// =============================================================================

describe("POST /api/apply — LinkedIn URL validation", () => {
  beforeEach(() => {
    mockReset(prismaMock);
    prismaMock.applicant.findUnique.mockResolvedValue(null);
    prismaMock.applicant.create.mockResolvedValue(makeApplicantRow() as never);
    prismaMock.admin.findMany.mockResolvedValue([]);
  });

  it("accepts a valid https LinkedIn URL", async () => {
    const res = await POST(makeRequest({ ...BASE_VALID_BODY, linkedinUrl: "https://www.linkedin.com/in/valid-user" }));
    expect(res.status).toBe(201);
  });

  it("accepts a LinkedIn URL without www subdomain", async () => {
    const res = await POST(makeRequest({ ...BASE_VALID_BODY, linkedinUrl: "https://linkedin.com/in/valid-user" }));
    expect(res.status).toBe(201);
  });

  it("rejects a javascript: protocol URL (XSS vector)", async () => {
    const res = await POST(makeRequest({ ...BASE_VALID_BODY, linkedinUrl: "javascript:alert(1)" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.field).toBe("linkedinUrl");
  });

  it("rejects an ftp:// LinkedIn URL", async () => {
    const res = await POST(makeRequest({ ...BASE_VALID_BODY, linkedinUrl: "ftp://linkedin.com/in/user" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.field).toBe("linkedinUrl");
  });

  it("rejects a non-LinkedIn https URL", async () => {
    const res = await POST(makeRequest({ ...BASE_VALID_BODY, linkedinUrl: "https://twitter.com/user" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.field).toBe("linkedinUrl");
  });

  it("rejects a LinkedIn URL that does not include /in/ path", async () => {
    const res = await POST(makeRequest({ ...BASE_VALID_BODY, linkedinUrl: "https://linkedin.com/company/sbv" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.field).toBe("linkedinUrl");
  });
});

// =============================================================================
// Optional URL validation (resumeUrl, portfolioUrl)
// =============================================================================

describe("POST /api/apply — optional URL validation", () => {
  beforeEach(() => {
    mockReset(prismaMock);
    prismaMock.applicant.findUnique.mockResolvedValue(null);
    prismaMock.applicant.create.mockResolvedValue(makeApplicantRow() as never);
    prismaMock.admin.findMany.mockResolvedValue([]);
  });

  it("rejects a resumeUrl with javascript: protocol", async () => {
    const res = await POST(makeRequest({ ...BASE_VALID_BODY, resumeUrl: "javascript:alert(1)" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.field).toBe("resumeUrl");
  });

  it("rejects a resumeUrl that is not http/https", async () => {
    const res = await POST(makeRequest({ ...BASE_VALID_BODY, resumeUrl: "ftp://files.example.com/resume.pdf" }));
    expect(res.status).toBe(400);
  });

  it("rejects a portfolioUrl with javascript: protocol", async () => {
    const res = await POST(makeRequest({ ...BASE_VALID_BODY, portfolioUrl: "javascript:void(0)" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.field).toBe("portfolioUrl");
  });

  it("accepts null/undefined for optional URLs (they are not required)", async () => {
    const res = await POST(makeRequest({ ...BASE_VALID_BODY, resumeUrl: null, portfolioUrl: null }));
    expect(res.status).toBe(201);
  });
});

// =============================================================================
// preferredRole validation
// =============================================================================

describe("POST /api/apply — preferredRole validation", () => {
  beforeEach(() => {
    mockReset(prismaMock);
    prismaMock.applicant.findUnique.mockResolvedValue(null);
    prismaMock.applicant.create.mockResolvedValue(makeApplicantRow() as never);
    prismaMock.admin.findMany.mockResolvedValue([]);
  });

  it("accepts all valid 4H roles", async () => {
    for (const role of ["hacker", "hustler", "hipster", "hound"]) {
      mockReset(prismaMock);
      prismaMock.applicant.findUnique.mockResolvedValue(null);
      prismaMock.applicant.create.mockResolvedValue(makeApplicantRow() as never);
      prismaMock.admin.findMany.mockResolvedValue([]);

      const res = await POST(makeRequest({ ...BASE_VALID_BODY, preferredRole: role }));
      expect(res.status, `Expected 201 for role '${role}'`).toBe(201);
    }
  });

  it("rejects an unrecognized role 'founder'", async () => {
    const res = await POST(makeRequest({ ...BASE_VALID_BODY, preferredRole: "founder" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.field).toBe("preferredRole");
  });

  it("rejects an empty string role", async () => {
    const res = await POST(makeRequest({ ...BASE_VALID_BODY, preferredRole: "" }));
    expect(res.status).toBe(400);
  });
});

// =============================================================================
// Location boundary conditions
// =============================================================================

describe("POST /api/apply — location boundary conditions", () => {
  beforeEach(() => {
    mockReset(prismaMock);
    prismaMock.applicant.findUnique.mockResolvedValue(null);
    prismaMock.applicant.create.mockResolvedValue(makeApplicantRow() as never);
    prismaMock.admin.findMany.mockResolvedValue([]);
  });

  it("accepts a location within 300 characters", async () => {
    const res = await POST(makeRequest({ ...BASE_VALID_BODY, location: "Manila, Philippines" }));
    expect(res.status).toBe(201);
  });

  it("accepts location exactly 300 characters", async () => {
    const res = await POST(makeRequest({ ...BASE_VALID_BODY, location: "A".repeat(300) }));
    expect(res.status).toBe(201);
  });

  it("rejects location exceeding 300 characters", async () => {
    const res = await POST(makeRequest({ ...BASE_VALID_BODY, location: "A".repeat(301) }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.field).toBe("location");
  });
});

// =============================================================================
// Duplicate detection
// =============================================================================

describe("POST /api/apply — duplicate detection", () => {
  beforeEach(() => mockReset(prismaMock));

  it("returns 409 when an application with the same email already exists", async () => {
    prismaMock.applicant.findUnique.mockResolvedValue(makeApplicantRow() as never);

    const res = await POST(makeRequest(BASE_VALID_BODY));
    expect(res.status).toBe(409);
    const body = await res.json();
    expect(body.field).toBe("email");
    // create should NOT have been called
    expect(prismaMock.applicant.create).not.toHaveBeenCalled();
  });
});

// =============================================================================
// Email sending (does not block submission)
// =============================================================================

describe("POST /api/apply — email sending behavior", () => {
  beforeEach(() => {
    mockReset(prismaMock);
    prismaMock.applicant.findUnique.mockResolvedValue(null);
    prismaMock.applicant.create.mockResolvedValue(makeApplicantRow() as never);
  });

  it("still returns 201 even when email sending throws (non-blocking)", async () => {
    const { sendEmail } = await import("@/lib/mail");
    vi.mocked(sendEmail).mockRejectedValueOnce(new Error("SMTP down"));
    prismaMock.admin.findMany.mockResolvedValue([]);

    const res = await POST(makeRequest(BASE_VALID_BODY));
    // The applicant was saved — email failure must not affect the HTTP response
    expect(res.status).toBe(201);
  });

  it("sends BCC to admin emails when admins exist", async () => {
    const { sendEmail } = await import("@/lib/mail");
    vi.mocked(sendEmail).mockResolvedValue(undefined);
    prismaMock.admin.findMany.mockResolvedValue([
      { id: "a1", email: "admin@sbv.one", password: "h", createdAt: new Date() },
    ] as never);

    await POST(makeRequest(BASE_VALID_BODY));

    expect(sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({ bcc: ["admin@sbv.one"] })
    );
  });
});

// =============================================================================
// Rate limiting
// =============================================================================

describe("POST /api/apply — rate limiting", () => {
  it("returns 429 when rate limit is exceeded", async () => {
    const { checkRateLimit } = await import("@/lib/rate-limit");
    vi.mocked(checkRateLimit).mockReturnValueOnce({ allowed: false, retryAfterMs: 30000 });

    const res = await POST(makeRequest(BASE_VALID_BODY));
    expect(res.status).toBe(429);
    const body = await res.json();
    expect(body.error).toMatch(/too many requests/i);
  });
});
