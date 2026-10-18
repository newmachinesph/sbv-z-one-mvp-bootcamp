import { describe, it, expect, vi, beforeEach } from "vitest";
import { mockReset } from "vitest-mock-extended";

const { getSessionMock } = vi.hoisted(() => ({ getSessionMock: vi.fn() }));

vi.mock("@/lib/prisma", async () => {
  const { prismaMock } = await import("@/tests/helpers/prisma-mock");
  return { prisma: prismaMock };
});
vi.mock("@/lib/mail", () => ({ sendEmail: vi.fn().mockResolvedValue(undefined) }));
vi.mock("@/lib/rate-limit", () => ({
  checkRateLimit: vi.fn().mockReturnValue({ allowed: true, retryAfterMs: 0 }),
  getRateLimitKey: vi.fn().mockReturnValue("test-ip"),
}));
vi.mock("@react-email/components", () => ({ render: vi.fn().mockResolvedValue("<html/>") }));
vi.mock("@/emails/mentor-confirmation", () => ({ default: vi.fn(() => null) }));
vi.mock("@/emails/contact-inquiry", () => ({ default: vi.fn(() => null) }));
vi.mock("@/lib/auth", () => ({ getSession: getSessionMock }));

import { prismaMock } from "@/tests/helpers/prisma-mock";

// Mock the program data dependency used by /api/dashboard
vi.mock("@/app/program/program-data", () => ({
  weeks: [
    {
      week: 3,
      title: "Core Feature Week",
      shipTarget: "Core Feature #1",
      webinar: "Building in Public",
      challenge: { name: "The 3-Minute Demo Duel" },
    },
  ],
}));

import { GET as dashboardGET } from "@/app/api/dashboard/route";
import { POST as mentorPOST } from "@/app/api/mentor/route";
import { POST as contactPOST } from "@/app/api/contact/route";
import { sendEmail } from "@/lib/mail";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const MEMBER_SESSION = {
  user: { id: "m1", role: "member", email: "member@team.ph", teamId: "team-1" },
};

function makeRequest(url: string, body?: object): Request {
  return new Request(url, {
    method: body ? "POST" : "GET",
    headers: body ? { "Content-Type": "application/json" } : {},
    body: body ? JSON.stringify(body) : undefined,
  });
}

// =============================================================================
// GET /api/dashboard
// =============================================================================

describe("GET /api/dashboard", () => {
  const memberRow = {
    id: "m1",
    name: "Ana Santos",
    email: "member@team.ph",
    role: "HACKER",
    skills: ["React"],
    bio: "Developer",
    password: "hashed",
    teamId: "team-1",
    avatar: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    team: {
      id: "team-1",
      slug: "team-one",
      name: "Team One",
      productName: "ProdOne",
      description: "A team",
      niche: "Tech",
      currentWeek: 3,
      totalPoints: 25,
      status: "ACTIVE",
      avatarUrl: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      members: [
        { id: "m1", name: "Ana Santos", role: "HACKER", skills: ["React"], avatar: null },
      ],
      progress: [
        { id: "p1", teamId: "team-1", week: 1, shipTarget: "Landing Page", completed: true, score: 9, feedback: "Great", createdAt: new Date(), updatedAt: new Date() },
        { id: "p2", teamId: "team-1", week: 2, shipTarget: "Auth Shell", completed: true, score: 8, feedback: "Good", createdAt: new Date(), updatedAt: new Date() },
        { id: "p3", teamId: "team-1", week: 3, shipTarget: "Core Feature", completed: false, score: 0, feedback: "", createdAt: new Date(), updatedAt: new Date() },
      ],
    },
  };

  beforeEach(() => {
    mockReset(prismaMock);
    getSessionMock.mockResolvedValue(MEMBER_SESSION);
    prismaMock.teamMember.findUnique.mockResolvedValue(memberRow as never);
    prismaMock.challenge.findUnique.mockResolvedValue({
      id: "c3",
      week: 3,
      name: "The 3-Minute Demo Duel",
      description: "Demo in 3 minutes",
      tests: "Live demo",
      winner: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as never);
  });

  it("returns 200 with user, team, weekInfo, and challenge fields", async () => {
    const res = await dashboardGET(makeRequest("http://localhost/api/dashboard"));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty("user");
    expect(body).toHaveProperty("team");
    expect(body).toHaveProperty("weekInfo");
    expect(body).toHaveProperty("challenge");
  });

  it("returns member user data without password", async () => {
    const res = await dashboardGET(makeRequest("http://localhost/api/dashboard"));
    const body = await res.json();
    expect(body.user.id).toBe("m1");
    expect(body.user.email).toBe("member@team.ph");
    expect(body.user).not.toHaveProperty("password");
  });

  it("maps member role to lowercase in user response", async () => {
    const res = await dashboardGET(makeRequest("http://localhost/api/dashboard"));
    const body = await res.json();
    expect(body.user.role).toBe("hacker");
  });

  it("maps team status to lowercase", async () => {
    const res = await dashboardGET(makeRequest("http://localhost/api/dashboard"));
    const body = await res.json();
    expect(body.team.status).toBe("active");
  });

  it("returns weekInfo matching current week when week data exists", async () => {
    const res = await dashboardGET(makeRequest("http://localhost/api/dashboard"));
    const body = await res.json();
    expect(body.weekInfo).not.toBeNull();
    expect(body.weekInfo.title).toBe("Core Feature Week");
  });

  it("returns null weekInfo when current week has no matching program data", async () => {
    // Override: team is on week 99 which doesn't exist in mock program-data
    prismaMock.teamMember.findUnique.mockResolvedValue({
      ...memberRow,
      team: { ...memberRow.team, currentWeek: 99 },
    } as never);

    const res = await dashboardGET(makeRequest("http://localhost/api/dashboard"));
    const body = await res.json();
    expect(body.weekInfo).toBeNull();
  });

  it("returns 404 when member is not found in database", async () => {
    prismaMock.teamMember.findUnique.mockResolvedValue(null);
    const res = await dashboardGET(makeRequest("http://localhost/api/dashboard"));
    expect(res.status).toBe(404);
  });

  it("uses session email to look up the member", async () => {
    await dashboardGET(makeRequest("http://localhost/api/dashboard"));
    expect(prismaMock.teamMember.findUnique).toHaveBeenCalledWith(
      expect.objectContaining({ where: { email: "member@team.ph" } })
    );
  });
});

// =============================================================================
// POST /api/mentor
// =============================================================================

const BASE_MENTOR_BODY = {
  name: "Test Mentor",
  email: "mentor@example.com",
  phone: "09171234567",
  linkedinUrl: "https://linkedin.com/in/testmentor",
  resumeUrl: "https://example.com/resume.pdf",
  whatBuilt: "I built a fintech platform used by over 10,000 users in Southeast Asia.",
  whatFailed: "We failed to find product-market fit in the B2B segment after 18 months.",
  whatShipped: "I shipped a working MVP in 8 weeks with a team of three engineers.",
  whyMentor: "I want to share everything I learned from building and failing and help founders avoid the same mistakes I made in my journey.",
  weeklyAvailability: "3-4",
  contactSlot1: "Mon 9-10am",
  contactSlot2: "Wed 2-3pm",
  contactSlot3: "Fri 11am-12pm",
};

describe("POST /api/mentor — happy path", () => {
  beforeEach(() => {
    mockReset(prismaMock);
    prismaMock.mentorApplication.findUnique.mockResolvedValue(null);
    prismaMock.mentorApplication.create.mockResolvedValue({
      ...BASE_MENTOR_BODY,
      id: "mentor-cuid-001",
      portfolioUrl: null,
      status: "PENDING",
      appliedAt: new Date(),
      updatedAt: new Date(),
    } as never);
    prismaMock.admin.findMany.mockResolvedValue([]);
  });

  it("returns 201 with id and success message", async () => {
    const res = await mentorPOST(makeRequest("http://localhost/api/mentor", BASE_MENTOR_BODY));
    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.id).toBe("mentor-cuid-001");
    expect(body.message).toMatch(/submitted successfully/i);
  });

  it("accepts an optional portfolioUrl", async () => {
    const res = await mentorPOST(makeRequest("http://localhost/api/mentor", {
      ...BASE_MENTOR_BODY,
      portfolioUrl: "https://portfolio.dev/testmentor",
    }));
    expect(res.status).toBe(201);
  });
});

describe("POST /api/mentor — validation", () => {
  beforeEach(() => {
    mockReset(prismaMock);
    prismaMock.mentorApplication.findUnique.mockResolvedValue(null);
    prismaMock.mentorApplication.create.mockResolvedValue({} as never);
    prismaMock.admin.findMany.mockResolvedValue([]);
  });

  const requiredFields = ["name", "email", "phone", "linkedinUrl", "resumeUrl"] as const;

  requiredFields.forEach((field) => {
    it(`returns 400 when '${field}' is missing`, async () => {
      const body = { ...BASE_MENTOR_BODY } as Record<string, unknown>;
      delete body[field];
      const res = await mentorPOST(makeRequest("http://localhost/api/mentor", body));
      expect(res.status).toBe(400);
    });
  });

  it("rejects phone shorter than 7 characters", async () => {
    const res = await mentorPOST(makeRequest("http://localhost/api/mentor", {
      ...BASE_MENTOR_BODY,
      phone: "123",
    }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.field).toBe("phone");
  });

  it("rejects phone longer than 30 characters", async () => {
    const res = await mentorPOST(makeRequest("http://localhost/api/mentor", {
      ...BASE_MENTOR_BODY,
      phone: "1".repeat(31),
    }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.field).toBe("phone");
  });

  it("rejects whyMentor shorter than 50 characters", async () => {
    const res = await mentorPOST(makeRequest("http://localhost/api/mentor", {
      ...BASE_MENTOR_BODY,
      whyMentor: "Too short",
    }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.field).toBe("whyMentor");
  });

  it("rejects whatBuilt shorter than 20 characters", async () => {
    const res = await mentorPOST(makeRequest("http://localhost/api/mentor", {
      ...BASE_MENTOR_BODY,
      whatBuilt: "Short",
    }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.field).toBe("whatBuilt");
  });

  it("rejects an invalid weeklyAvailability value", async () => {
    const res = await mentorPOST(makeRequest("http://localhost/api/mentor", {
      ...BASE_MENTOR_BODY,
      weeklyAvailability: "10-20",
    }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.field).toBe("weeklyAvailability");
  });

  it("accepts all valid weeklyAvailability options", async () => {
    for (const avail of ["1-2", "3-4", "5+", "flexible"]) {
      mockReset(prismaMock);
      prismaMock.mentorApplication.findUnique.mockResolvedValue(null);
      prismaMock.mentorApplication.create.mockResolvedValue({ id: "m1" } as never);
      prismaMock.admin.findMany.mockResolvedValue([]);

      const res = await mentorPOST(makeRequest("http://localhost/api/mentor", {
        ...BASE_MENTOR_BODY,
        weeklyAvailability: avail,
      }));
      expect(res.status, `Expected 201 for weeklyAvailability '${avail}'`).toBe(201);
    }
  });

  it("returns 409 when a mentor application with the same email already exists", async () => {
    prismaMock.mentorApplication.findUnique.mockResolvedValue({ id: "existing" } as never);
    const res = await mentorPOST(makeRequest("http://localhost/api/mentor", BASE_MENTOR_BODY));
    expect(res.status).toBe(409);
    const body = await res.json();
    expect(body.field).toBe("email");
  });

  it("rejects a non-LinkedIn URL in linkedinUrl", async () => {
    const res = await mentorPOST(makeRequest("http://localhost/api/mentor", {
      ...BASE_MENTOR_BODY,
      linkedinUrl: "https://github.com/testmentor",
    }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.field).toBe("linkedinUrl");
  });

  /**
   * EMAIL HEADER INJECTION — security gap documentation test
   *
   * The admin notification email uses:
   *   subject: `[Mentor Application] ${trimmed.name}`
   * trim() does NOT strip embedded newlines, so a name like
   * "Legit Name\nBcc: attacker@evil.com" reaches the subject unmodified.
   *
   * This test documents the CURRENT VULNERABLE behavior: the second
   * sendEmail call (admin notification) receives a subject containing \n.
   *
   * After adding input sanitization (strip \n and \r from name), change to:
   *   expect(adminSubject).not.toContain("\n");
   */
  it("MISSING SANITIZATION: admin notification email subject contains injected newline from name field", async () => {
    // Clear sendEmail call history for this test only
    vi.mocked(sendEmail).mockClear().mockResolvedValue(undefined);
    prismaMock.mentorApplication.create.mockResolvedValue({ id: "m1" } as never);
    // Provide one admin so the admin notification branch fires
    prismaMock.admin.findMany.mockResolvedValue([{ id: "a1", email: "admin@sbv.one", password: "h", createdAt: new Date() }] as never);

    await mentorPOST(makeRequest("http://localhost/api/mentor", {
      ...BASE_MENTOR_BODY,
      name: "Legit Name\nBcc: attacker@evil.com",
    }));

    const calls = vi.mocked(sendEmail).mock.calls;
    // calls[0] = applicant confirmation (subject is hardcoded — safe)
    // calls[1] = admin notification (subject interpolates trimmed.name — vulnerable)
    expect(calls.length).toBe(2);
    const [adminOpts] = calls[1];
    // Documents vulnerability: subject contains the injected newline.
    // TODO: After sanitizing name input, change to: expect(adminOpts.subject).not.toContain("\n")
    expect(adminOpts.subject).toContain("\n");
  });

  it("still returns 201 even if email sending fails (non-blocking)", async () => {
    vi.mocked(sendEmail).mockRejectedValue(new Error("SMTP down"));
    const res = await mentorPOST(makeRequest("http://localhost/api/mentor", BASE_MENTOR_BODY));
    expect(res.status).toBe(201);
  });
});

// =============================================================================
// POST /api/contact
// =============================================================================

const BASE_CONTACT_BODY = {
  name: "Contact Person",
  email: "contact@example.com",
  subject: "Inquiry about the bootcamp",
  message: "I am interested in joining the Z1 Forge bootcamp and wanted to ask about the next cohort.",
};

describe("POST /api/contact — happy path", () => {
  beforeEach(() => {
    mockReset(prismaMock);
    prismaMock.admin.findMany.mockResolvedValue([]);
  });

  it("returns 200 with success on a valid submission", async () => {
    const res = await contactPOST(makeRequest("http://localhost/api/contact", BASE_CONTACT_BODY));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
  });
});

describe("POST /api/contact — validation", () => {
  beforeEach(() => {
    mockReset(prismaMock);
    prismaMock.admin.findMany.mockResolvedValue([]);
  });

  const requiredFields = ["name", "email", "subject", "message"] as const;

  requiredFields.forEach((field) => {
    it(`returns 400 when '${field}' is missing`, async () => {
      const body = { ...BASE_CONTACT_BODY } as Record<string, unknown>;
      delete body[field];
      const res = await contactPOST(makeRequest("http://localhost/api/contact", body));
      expect(res.status).toBe(400);
    });
  });

  it("rejects an invalid email address", async () => {
    const res = await contactPOST(makeRequest("http://localhost/api/contact", {
      ...BASE_CONTACT_BODY,
      email: "not-an-email",
    }));
    expect(res.status).toBe(400);
  });

  it("rejects name longer than 200 characters", async () => {
    const res = await contactPOST(makeRequest("http://localhost/api/contact", {
      ...BASE_CONTACT_BODY,
      name: "A".repeat(201),
    }));
    expect(res.status).toBe(400);
  });

  it("rejects subject longer than 300 characters", async () => {
    const res = await contactPOST(makeRequest("http://localhost/api/contact", {
      ...BASE_CONTACT_BODY,
      subject: "S".repeat(301),
    }));
    expect(res.status).toBe(400);
  });

  it("rejects message shorter than 20 characters", async () => {
    const res = await contactPOST(makeRequest("http://localhost/api/contact", {
      ...BASE_CONTACT_BODY,
      message: "Too short",
    }));
    expect(res.status).toBe(400);
  });

  it("rejects message longer than 5000 characters", async () => {
    const res = await contactPOST(makeRequest("http://localhost/api/contact", {
      ...BASE_CONTACT_BODY,
      message: "x".repeat(5001),
    }));
    expect(res.status).toBe(400);
  });

  it("accepts message exactly 20 characters (boundary minimum)", async () => {
    const res = await contactPOST(makeRequest("http://localhost/api/contact", {
      ...BASE_CONTACT_BODY,
      message: "x".repeat(20),
    }));
    expect(res.status).toBe(200);
  });

  it("accepts message exactly 5000 characters (boundary maximum)", async () => {
    const res = await contactPOST(makeRequest("http://localhost/api/contact", {
      ...BASE_CONTACT_BODY,
      message: "x".repeat(5000),
    }));
    expect(res.status).toBe(200);
  });

  it("still returns 200 even if email sending fails (non-blocking)", async () => {
    vi.mocked(sendEmail).mockRejectedValue(new Error("SMTP down"));
    const res = await contactPOST(makeRequest("http://localhost/api/contact", BASE_CONTACT_BODY));
    expect(res.status).toBe(200);
  });
});
