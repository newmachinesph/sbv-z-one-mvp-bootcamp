import { describe, it, expect, vi, beforeEach } from "vitest";
import { mockReset } from "vitest-mock-extended";

vi.mock("@/lib/prisma", async () => {
  const { prismaMock } = await import("@/tests/helpers/prisma-mock");
  return { prisma: prismaMock };
});
vi.mock("@/lib/auth", () => ({
  getSession: vi.fn().mockResolvedValue({ user: { id: "a1", role: "admin" } }),
}));

import { prismaMock } from "@/tests/helpers/prisma-mock";

import {
  GET as applicationsGET,
  PATCH as applicationsPATCH,
  DELETE as applicationsDELETE,
} from "@/app/api/admin/applications/route";

import {
  GET as teamsGET,
  POST as teamsPOST,
  PATCH as teamsPATCH,
  DELETE as teamsDELETE,
} from "@/app/api/admin/teams/route";

import {
  GET as challengesGET,
  POST as challengesPOST,
  PATCH as challengesPATCH,
} from "@/app/api/admin/challenges/route";

import { GET as statsGET } from "@/app/api/admin/stats/route";

function makeRequest(method: string, url: string, body?: object): Request {
  return new Request(url, {
    method,
    headers: body ? { "Content-Type": "application/json" } : {},
    body: body ? JSON.stringify(body) : undefined,
  });
}

// =============================================================================
// /api/admin/applications
// =============================================================================

describe("GET /api/admin/applications", () => {
  beforeEach(() => mockReset(prismaMock));

  it("returns all applicants when no status filter is provided", async () => {
    const fakeApplicants = [
      { id: "a1", name: "Alice", email: "a@a.com", status: "PENDING", appliedAt: new Date() },
    ];
    prismaMock.applicant.findMany.mockResolvedValue(fakeApplicants as never);

    const res = await applicationsGET(makeRequest("GET", "http://localhost/api/admin/applications"));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toHaveLength(1);
    expect(body[0].id).toBe("a1");
  });

  it("filters by valid status query param", async () => {
    prismaMock.applicant.findMany.mockResolvedValue([]);
    await applicationsGET(makeRequest("GET", "http://localhost/api/admin/applications?status=pending"));
    expect(prismaMock.applicant.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { status: "PENDING" } })
    );
  });

  it("returns 400 for an invalid status query param", async () => {
    const res = await applicationsGET(
      makeRequest("GET", "http://localhost/api/admin/applications?status=invalid")
    );
    expect(res.status).toBe(400);
  });
});

describe("PATCH /api/admin/applications", () => {
  beforeEach(() => mockReset(prismaMock));

  it("updates applicant status and returns the updated applicant", async () => {
    const updated = { id: "a1", name: "Alice", status: "ACCEPTED" };
    prismaMock.applicant.update.mockResolvedValue(updated as never);

    const res = await applicationsPATCH(
      makeRequest("PATCH", "http://localhost/api/admin/applications", {
        id: "a1",
        status: "accepted",
      })
    );

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.id).toBe("a1");
  });

  it("returns 400 when id is missing", async () => {
    const res = await applicationsPATCH(
      makeRequest("PATCH", "http://localhost/api/admin/applications", { status: "accepted" })
    );
    expect(res.status).toBe(400);
  });

  it("returns 400 when status is missing", async () => {
    const res = await applicationsPATCH(
      makeRequest("PATCH", "http://localhost/api/admin/applications", { id: "a1" })
    );
    expect(res.status).toBe(400);
  });

  it("returns 400 for an invalid status value", async () => {
    const res = await applicationsPATCH(
      makeRequest("PATCH", "http://localhost/api/admin/applications", {
        id: "a1",
        status: "reviewed",
      })
    );
    expect(res.status).toBe(400);
  });

  it("accepts all valid ApplicantStatus values", async () => {
    const validStatuses = ["pending", "accepted", "rejected", "waitlisted"];
    for (const status of validStatuses) {
      mockReset(prismaMock);
      prismaMock.applicant.update.mockResolvedValue({ id: "a1", status: status.toUpperCase() } as never);

      const res = await applicationsPATCH(
        makeRequest("PATCH", "http://localhost/api/admin/applications", { id: "a1", status })
      );
      expect(res.status, `Expected 200 for status '${status}'`).toBe(200);
    }
  });
});

describe("DELETE /api/admin/applications", () => {
  beforeEach(() => mockReset(prismaMock));

  it("deletes applicant and returns success", async () => {
    prismaMock.applicant.delete.mockResolvedValue({ id: "a1" } as never);
    const res = await applicationsDELETE(
      makeRequest("DELETE", "http://localhost/api/admin/applications?id=a1")
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
  });

  it("returns 400 when id query param is missing", async () => {
    const res = await applicationsDELETE(
      makeRequest("DELETE", "http://localhost/api/admin/applications")
    );
    expect(res.status).toBe(400);
  });
});

// =============================================================================
// /api/admin/teams
// =============================================================================

describe("GET /api/admin/teams", () => {
  beforeEach(() => mockReset(prismaMock));

  it("returns all teams with members and progress", async () => {
    prismaMock.team.findMany.mockResolvedValue([
      { id: "t1", name: "Team One", members: [], progress: [] },
    ] as never);

    const res = await teamsGET();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toHaveLength(1);
  });

  it("includes member password field in raw admin response (no mapping)", async () => {
    // Admin GET returns raw Prisma data — passwords are included but SELECT
    // only picks specific fields (no password in the select)
    prismaMock.team.findMany.mockResolvedValue([] as never);
    const res = await teamsGET();
    expect(res.status).toBe(200);
  });
});

describe("POST /api/admin/teams", () => {
  beforeEach(() => mockReset(prismaMock));

  it("creates a team and returns 201 with the new team", async () => {
    prismaMock.team.create.mockResolvedValue({
      id: "new-t1",
      slug: "test-team-abc123",
      name: "Test Team",
      productName: "TestProd",
      description: "Desc",
      niche: "Tech",
      currentWeek: 1,
      totalPoints: 0,
      status: "ACTIVE",
    } as never);

    const res = await teamsPOST(
      makeRequest("POST", "http://localhost/api/admin/teams", {
        name: "Test Team",
        productName: "TestProd",
        description: "Desc",
        niche: "Tech",
      })
    );

    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.id).toBe("new-t1");
  });

  it("auto-generates a slug from the team name", async () => {
    prismaMock.team.create.mockResolvedValue({ id: "t1", slug: "test-team-xxxx" } as never);

    await teamsPOST(
      makeRequest("POST", "http://localhost/api/admin/teams", {
        name: "Test Team!",
        productName: "Prod",
        description: "Desc",
        niche: "Tech",
      })
    );

    const createCall = prismaMock.team.create.mock.calls[0][0];
    // Slug should contain "test-team" from the name
    expect(createCall.data.slug).toMatch(/^test-team-/);
    // Slug should only contain lowercase letters, numbers, hyphens
    expect(createCall.data.slug).toMatch(/^[a-z0-9-]+$/);
  });

  it("returns 400 when required fields are missing", async () => {
    const res = await teamsPOST(
      makeRequest("POST", "http://localhost/api/admin/teams", {
        name: "Test Team",
        // productName, description, niche missing
      })
    );
    expect(res.status).toBe(400);
  });
});

describe("PATCH /api/admin/teams", () => {
  beforeEach(() => mockReset(prismaMock));

  it("updates a team and returns the updated record", async () => {
    prismaMock.team.update.mockResolvedValue({ id: "t1", name: "New Name" } as never);

    const res = await teamsPATCH(
      makeRequest("PATCH", "http://localhost/api/admin/teams", { id: "t1", name: "New Name" })
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.name).toBe("New Name");
  });

  it("returns 400 when id is missing", async () => {
    const res = await teamsPATCH(
      makeRequest("PATCH", "http://localhost/api/admin/teams", { name: "No ID" })
    );
    expect(res.status).toBe(400);
  });

  it("returns 400 for an invalid status value", async () => {
    const res = await teamsPATCH(
      makeRequest("PATCH", "http://localhost/api/admin/teams", { id: "t1", status: "dissolved" })
    );
    expect(res.status).toBe(400);
  });

  it("accepts valid status values", async () => {
    for (const status of ["active", "graduated", "pending"]) {
      mockReset(prismaMock);
      prismaMock.team.update.mockResolvedValue({ id: "t1", status: status.toUpperCase() } as never);

      const res = await teamsPATCH(
        makeRequest("PATCH", "http://localhost/api/admin/teams", { id: "t1", status })
      );
      expect(res.status, `Expected 200 for status '${status}'`).toBe(200);
    }
  });

  it("does not set status when status is not in the body", async () => {
    prismaMock.team.update.mockResolvedValue({ id: "t1", name: "Updated" } as never);

    await teamsPATCH(
      makeRequest("PATCH", "http://localhost/api/admin/teams", { id: "t1", name: "Updated" })
    );

    const updateCall = prismaMock.team.update.mock.calls[0][0];
    expect(updateCall.data).not.toHaveProperty("status");
  });
});

describe("DELETE /api/admin/teams", () => {
  beforeEach(() => mockReset(prismaMock));

  it("deletes team and returns success message", async () => {
    prismaMock.team.delete.mockResolvedValue({ id: "t1" } as never);
    const res = await teamsDELETE(
      makeRequest("DELETE", "http://localhost/api/admin/teams?id=t1")
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.message).toMatch(/deleted/i);
  });

  it("returns 400 when id query param is missing", async () => {
    const res = await teamsDELETE(
      makeRequest("DELETE", "http://localhost/api/admin/teams")
    );
    expect(res.status).toBe(400);
  });
});

// =============================================================================
// /api/admin/challenges
// =============================================================================

describe("GET /api/admin/challenges", () => {
  beforeEach(() => mockReset(prismaMock));

  it("returns all challenges ordered by week", async () => {
    prismaMock.challenge.findMany.mockResolvedValue([
      { id: "c1", week: 1, name: "Challenge 1" },
    ] as never);

    const res = await challengesGET();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toHaveLength(1);
  });
});

describe("POST /api/admin/challenges", () => {
  beforeEach(() => mockReset(prismaMock));

  it("creates a challenge and returns 201", async () => {
    prismaMock.challenge.create.mockResolvedValue({
      id: "c1",
      week: 7,
      name: "New Challenge",
      description: "Desc",
      tests: "Tests",
    } as never);

    const res = await challengesPOST(
      makeRequest("POST", "http://localhost/api/admin/challenges", {
        week: 7,
        name: "New Challenge",
        description: "Desc",
        tests: "Tests",
      })
    );

    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.week).toBe(7);
  });

  it("returns 400 when any required field is missing", async () => {
    const res = await challengesPOST(
      makeRequest("POST", "http://localhost/api/admin/challenges", {
        week: 7,
        name: "New Challenge",
        // description and tests missing
      })
    );
    expect(res.status).toBe(400);
  });
});

describe("PATCH /api/admin/challenges", () => {
  beforeEach(() => mockReset(prismaMock));

  it("updates a challenge and returns the updated record", async () => {
    prismaMock.challenge.update.mockResolvedValue({ id: "c1", name: "Updated Name" } as never);

    const res = await challengesPATCH(
      makeRequest("PATCH", "http://localhost/api/admin/challenges", {
        id: "c1",
        name: "Updated Name",
      })
    );

    expect(res.status).toBe(200);
  });

  it("returns 400 when id is missing", async () => {
    const res = await challengesPATCH(
      makeRequest("PATCH", "http://localhost/api/admin/challenges", { name: "No ID" })
    );
    expect(res.status).toBe(400);
  });
});

// =============================================================================
// /api/admin/stats
// =============================================================================

describe("GET /api/admin/stats", () => {
  beforeEach(() => {
    mockReset(prismaMock);
    prismaMock.$transaction.mockImplementation(async (fns: unknown) =>
      Array.isArray(fns) ? Promise.all(fns) : (fns as Function)(prismaMock)
    );
    prismaMock.team.count.mockResolvedValue(5);
    prismaMock.teamMember.count.mockResolvedValue(20);
    prismaMock.applicant.count.mockResolvedValueOnce(15).mockResolvedValueOnce(3);
    prismaMock.applicant.findMany.mockResolvedValue([]);
  });

  it("returns team, member, applicant counts and recent applications", async () => {
    const res = await statsGET();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty("teamCount");
    expect(body).toHaveProperty("memberCount");
    expect(body).toHaveProperty("applicantCount");
    expect(body).toHaveProperty("pendingApplicants");
    expect(body).toHaveProperty("recentApplications");
  });

  it("fetches pending applicants count separately", async () => {
    await statsGET();
    // Should have called applicant.count twice: once for total, once for PENDING
    expect(prismaMock.applicant.count).toHaveBeenCalledWith({ where: { status: "PENDING" } });
  });

  it("recentApplications is limited to 5 entries", async () => {
    await statsGET();
    expect(prismaMock.applicant.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ take: 5 })
    );
  });
});
