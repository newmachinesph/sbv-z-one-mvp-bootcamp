import { describe, it, expect } from "vitest";
import {
  isValidEmail,
  parseTeamStatus,
  parseMemberRole,
  parseApplicantStatus,
} from "@/lib/validations";

// =============================================================================
// isValidEmail
// =============================================================================

describe("isValidEmail", () => {
  // --- Valid addresses ---
  it("accepts a standard email address", () => {
    expect(isValidEmail("user@example.com")).toBe(true);
  });

  it("accepts email with plus-addressing", () => {
    expect(isValidEmail("user+tag@sub.domain.co")).toBe(true);
  });

  it("accepts short valid address", () => {
    expect(isValidEmail("a@b.io")).toBe(true);
  });

  it("accepts email with numeric local part", () => {
    expect(isValidEmail("123456@domain.com")).toBe(true);
  });

  it("accepts email at exactly 254 characters (maximum allowed)", () => {
    // RFC 5321 maximum total length
    const local = "a".repeat(64);   // 64 chars
    const domain = "b".repeat(185); // 185 chars
    // format: local@domain.com = 64 + 1 + 185 + 4 = 254
    const email = `${local}@${domain}.com`;
    expect(email.length).toBe(254);
    expect(isValidEmail(email)).toBe(true);
  });

  // --- Invalid addresses ---
  it("rejects email over 254 characters", () => {
    const local = "a".repeat(64);
    const domain = "b".repeat(186);
    const email = `${local}@${domain}.com`; // 255+ chars
    expect(isValidEmail(email)).toBe(false);
  });

  it("rejects string with no @ symbol", () => {
    expect(isValidEmail("nodomain.com")).toBe(false);
  });

  it("rejects string with no local part", () => {
    expect(isValidEmail("@domain.com")).toBe(false);
  });

  it("rejects string with no TLD", () => {
    expect(isValidEmail("user@domain")).toBe(false);
  });

  it("rejects empty string", () => {
    expect(isValidEmail("")).toBe(false);
  });

  it("rejects email with spaces in local part", () => {
    expect(isValidEmail("user name@domain.com")).toBe(false);
  });

  it("rejects email with leading whitespace", () => {
    // trim() is not called before validation — the regex will fail
    expect(isValidEmail(" user@domain.com")).toBe(false);
  });

  it("rejects email with trailing whitespace", () => {
    expect(isValidEmail("user@domain.com ")).toBe(false);
  });

  it("rejects a number passed as email", () => {
    expect(isValidEmail(42 as unknown as string)).toBe(false);
  });

  it("rejects null passed as email", () => {
    expect(isValidEmail(null as unknown as string)).toBe(false);
  });

  it("rejects undefined passed as email", () => {
    expect(isValidEmail(undefined as unknown as string)).toBe(false);
  });

  it("rejects empty object passed as email", () => {
    expect(isValidEmail({} as unknown as string)).toBe(false);
  });

  it("rejects double-@ address", () => {
    expect(isValidEmail("user@@domain.com")).toBe(false);
  });
});

// =============================================================================
// parseTeamStatus
// =============================================================================

describe("parseTeamStatus", () => {
  it("accepts lowercase 'active' and returns 'ACTIVE'", () => {
    expect(parseTeamStatus("active")).toBe("ACTIVE");
  });

  it("accepts uppercase 'ACTIVE'", () => {
    expect(parseTeamStatus("ACTIVE")).toBe("ACTIVE");
  });

  it("accepts mixed case 'Active'", () => {
    expect(parseTeamStatus("Active")).toBe("ACTIVE");
  });

  it("accepts 'graduated'", () => {
    expect(parseTeamStatus("graduated")).toBe("GRADUATED");
  });

  it("accepts 'GRADUATED'", () => {
    expect(parseTeamStatus("GRADUATED")).toBe("GRADUATED");
  });

  it("accepts 'pending'", () => {
    expect(parseTeamStatus("pending")).toBe("PENDING");
  });

  it("returns null for empty string", () => {
    expect(parseTeamStatus("")).toBeNull();
  });

  it("returns null for unrecognized value 'deleted'", () => {
    expect(parseTeamStatus("deleted")).toBeNull();
  });

  it("returns null for numeric string '1'", () => {
    expect(parseTeamStatus("1")).toBeNull();
  });

  it("returns null for SQL injection fragment", () => {
    expect(parseTeamStatus("' OR '1'='1")).toBeNull();
  });

  it("returns null for value with surrounding whitespace", () => {
    // The code does .toUpperCase() but no trim() — 'ACTIVE ' !== 'ACTIVE'
    expect(parseTeamStatus(" active ")).toBeNull();
  });

  it("returns null for prototype pollution attempt '__proto__'", () => {
    expect(parseTeamStatus("__proto__")).toBeNull();
  });
});

// =============================================================================
// parseMemberRole
// =============================================================================

describe("parseMemberRole", () => {
  it("accepts 'hacker' and returns 'HACKER'", () => {
    expect(parseMemberRole("hacker")).toBe("HACKER");
  });

  it("accepts 'HACKER'", () => {
    expect(parseMemberRole("HACKER")).toBe("HACKER");
  });

  it("accepts 'hustler'", () => {
    expect(parseMemberRole("hustler")).toBe("HUSTLER");
  });

  it("accepts 'hipster'", () => {
    expect(parseMemberRole("hipster")).toBe("HIPSTER");
  });

  it("accepts 'hound'", () => {
    expect(parseMemberRole("hound")).toBe("HOUND");
  });

  it("accepts mixed case 'Hacker'", () => {
    expect(parseMemberRole("Hacker")).toBe("HACKER");
  });

  it("returns null for empty string", () => {
    expect(parseMemberRole("")).toBeNull();
  });

  it("returns null for unrecognized role 'founder'", () => {
    expect(parseMemberRole("founder")).toBeNull();
  });

  it("returns null for numeric string '1'", () => {
    expect(parseMemberRole("1")).toBeNull();
  });

  it("returns null for whitespace-padded valid value", () => {
    expect(parseMemberRole(" hacker ")).toBeNull();
  });
});

// =============================================================================
// parseApplicantStatus
// =============================================================================

describe("parseApplicantStatus", () => {
  it("accepts 'pending' and returns 'PENDING'", () => {
    expect(parseApplicantStatus("pending")).toBe("PENDING");
  });

  it("accepts 'ACCEPTED'", () => {
    expect(parseApplicantStatus("ACCEPTED")).toBe("ACCEPTED");
  });

  it("accepts 'rejected'", () => {
    expect(parseApplicantStatus("rejected")).toBe("REJECTED");
  });

  it("accepts 'waitlisted'", () => {
    expect(parseApplicantStatus("waitlisted")).toBe("WAITLISTED");
  });

  it("returns null for unrecognized value 'reviewed'", () => {
    expect(parseApplicantStatus("reviewed")).toBeNull();
  });

  it("returns null for empty string", () => {
    expect(parseApplicantStatus("")).toBeNull();
  });

  it("returns null for whitespace-only string", () => {
    expect(parseApplicantStatus("   ")).toBeNull();
  });
});
