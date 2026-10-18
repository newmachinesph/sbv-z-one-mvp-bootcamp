import { describe, it, expect, vi, beforeEach } from "vitest";
import { mockReset } from "vitest-mock-extended";

vi.mock("@/lib/prisma", async () => {
  const { prismaMock } = await import("@/tests/helpers/prisma-mock");
  return { prisma: prismaMock };
});
vi.mock("@/lib/auth", () => ({
  getSession: vi.fn().mockResolvedValue({ user: { id: "a1", role: "admin" } }),
}));

// Mock bcryptjs for password hashing tests (we control what hash returns)
vi.mock("bcryptjs", () => ({ hash: vi.fn().mockResolvedValue("hashed-password-output") }));

import { prismaMock } from "@/tests/helpers/prisma-mock";
import { POST, PATCH, DELETE } from "@/app/api/admin/teams/[id]/members/route";
import { hash } from "bcryptjs";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const TEAM_A_PARAMS = { params: Promise.resolve({ id: "team-A" }) };
const TEAM_B_PARAMS = { params: Promise.resolve({ id: "team-B" }) };

function makeRequest(method: string, url: string, body?: object): Request {
  return new Request(url, {
    method,
    headers: body ? { "Content-Type": "application/json" } : {},
    body: body ? JSON.stringify(body) : undefined,
  });
}

function makeMemberRow(overrides: Partial<{
  id: string;
  teamId: string;
  name: string;
  email: string;
  password: string | null;
}> = {}) {
  return {
    id: overrides.id ?? "member-cuid-001",
    name: overrides.name ?? "Test Member",
    email: overrides.email ?? "member@team.ph",
    role: "HACKER",
    avatar: null,
    skills: ["JS"],
    bio: "A developer",
    password: overrides.password !== undefined ? overrides.password : "hashed",
    teamId: overrides.teamId ?? "team-A",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

// =============================================================================
// POST — create new team member
// =============================================================================

describe("POST /api/admin/teams/[id]/members — create", () => {
  beforeEach(() => {
    mockReset(prismaMock);
    prismaMock.teamMember.create.mockResolvedValue(makeMemberRow() as never);
  });

  it("returns 201 with the created member (without password field)", async () => {
    const req = makeRequest("POST", "http://localhost/api/admin/teams/team-A/members", {
      name: "Test Member",
      email: "member@team.ph",
      role: "hacker",
      bio: "A developer",
      skills: ["JS"],
    });

    const res = await POST(req, TEAM_A_PARAMS);
    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body).not.toHaveProperty("password");
    expect(body.id).toBe("member-cuid-001");
  });

  it("uses teamId from URL params when creating member", async () => {
    const req = makeRequest("POST", "http://localhost/api/admin/teams/team-A/members", {
      name: "New Member",
      email: "new@team.ph",
      role: "hustler",
      bio: "bio",
    });

    await POST(req, TEAM_A_PARAMS);
    const createCall = prismaMock.teamMember.create.mock.calls[0][0];
    expect(createCall.data.teamId).toBe("team-A");
  });

  it("hashes the password when one is provided", async () => {
    const req = makeRequest("POST", "http://localhost/api/admin/teams/team-A/members", {
      name: "New Member",
      email: "new@team.ph",
      role: "hacker",
      bio: "bio",
      password: "securepass123",
    });

    await POST(req, TEAM_A_PARAMS);
    expect(hash).toHaveBeenCalledWith("securepass123", 10);

    const createCall = prismaMock.teamMember.create.mock.calls[0][0];
    expect(createCall.data.password).toBe("hashed-password-output");
  });

  it("stores null password when no password is provided", async () => {
    const req = makeRequest("POST", "http://localhost/api/admin/teams/team-A/members", {
      name: "New Member",
      email: "new@team.ph",
      role: "hacker",
      bio: "bio",
    });

    await POST(req, TEAM_A_PARAMS);
    const createCall = prismaMock.teamMember.create.mock.calls[0][0];
    expect(createCall.data.password).toBeNull();
  });

  it("returns 400 when required fields are missing (no name)", async () => {
    const req = makeRequest("POST", "http://localhost/api/admin/teams/team-A/members", {
      email: "new@team.ph",
      role: "hacker",
      bio: "bio",
    });
    const res = await POST(req, TEAM_A_PARAMS);
    expect(res.status).toBe(400);
  });

  it("returns 400 for an invalid role", async () => {
    const req = makeRequest("POST", "http://localhost/api/admin/teams/team-A/members", {
      name: "New Member",
      email: "new@team.ph",
      role: "ceo",  // invalid
      bio: "bio",
    });
    const res = await POST(req, TEAM_A_PARAMS);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/invalid role/i);
  });

  it("returns 400 when password is provided but is shorter than 8 characters", async () => {
    const req = makeRequest("POST", "http://localhost/api/admin/teams/team-A/members", {
      name: "New Member",
      email: "new@team.ph",
      role: "hacker",
      bio: "bio",
      password: "short",
    });
    const res = await POST(req, TEAM_A_PARAMS);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/8 characters/i);
  });

  it("accepts password of exactly 8 characters (minimum length)", async () => {
    const req = makeRequest("POST", "http://localhost/api/admin/teams/team-A/members", {
      name: "New Member",
      email: "new@team.ph",
      role: "hacker",
      bio: "bio",
      password: "exactly8",
    });
    const res = await POST(req, TEAM_A_PARAMS);
    expect(res.status).toBe(201);
  });

  it("defaults skills to empty array when skills not provided", async () => {
    const req = makeRequest("POST", "http://localhost/api/admin/teams/team-A/members", {
      name: "New Member",
      email: "new@team.ph",
      role: "hacker",
      bio: "bio",
    });
    await POST(req, TEAM_A_PARAMS);
    const createCall = prismaMock.teamMember.create.mock.calls[0][0];
    expect(createCall.data.skills).toEqual([]);
  });
});

// =============================================================================
// PATCH — update existing team member (IDOR regression)
// =============================================================================

describe("PATCH /api/admin/teams/[id]/members — update", () => {
  beforeEach(() => {
    mockReset(prismaMock);
    prismaMock.teamMember.findUnique.mockResolvedValue(makeMemberRow({ teamId: "team-A" }) as never);
    prismaMock.teamMember.update.mockResolvedValue(makeMemberRow() as never);
  });

  it("returns 200 with updated member (without password field)", async () => {
    const req = makeRequest("PATCH", "http://localhost/api/admin/teams/team-A/members", {
      memberId: "member-cuid-001",
      name: "Updated Name",
    });

    const res = await PATCH(req, TEAM_A_PARAMS);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).not.toHaveProperty("password");
  });

  it("returns 400 when memberId is missing", async () => {
    const req = makeRequest("PATCH", "http://localhost/api/admin/teams/team-A/members", {
      name: "New Name",
    });
    const res = await PATCH(req, TEAM_A_PARAMS);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/memberId required/i);
  });

  it("hashes the new password when one is provided", async () => {
    prismaMock.teamMember.findUnique.mockResolvedValue(makeMemberRow({ id: "member-cuid-001", teamId: "team-A" }) as never);
    const req = makeRequest("PATCH", "http://localhost/api/admin/teams/team-A/members", {
      memberId: "member-cuid-001",
      password: "newSecurePass",
    });
    await PATCH(req, TEAM_A_PARAMS);
    expect(hash).toHaveBeenCalledWith("newSecurePass", 10);

    const updateCall = prismaMock.teamMember.update.mock.calls[0][0];
    expect(updateCall.data.password).toBe("hashed-password-output");
  });

  it("returns 400 when new password is shorter than 8 characters", async () => {
    const req = makeRequest("PATCH", "http://localhost/api/admin/teams/team-A/members", {
      memberId: "member-cuid-001",
      password: "short",
    });
    const res = await PATCH(req, TEAM_A_PARAMS);
    expect(res.status).toBe(400);
  });

  it("returns 400 for an invalid role in update", async () => {
    const req = makeRequest("PATCH", "http://localhost/api/admin/teams/team-A/members", {
      memberId: "member-cuid-001",
      role: "manager",
    });
    const res = await PATCH(req, TEAM_A_PARAMS);
    expect(res.status).toBe(400);
  });

  it("only includes changed fields in the Prisma update data (partial update)", async () => {
    prismaMock.teamMember.findUnique.mockResolvedValue(makeMemberRow({ id: "member-cuid-001", teamId: "team-A" }) as never);
    const req = makeRequest("PATCH", "http://localhost/api/admin/teams/team-A/members", {
      memberId: "member-cuid-001",
      bio: "Updated bio",
    });
    await PATCH(req, TEAM_A_PARAMS);

    const updateCall = prismaMock.teamMember.update.mock.calls[0][0];
    expect(updateCall.data).toHaveProperty("bio", "Updated bio");
    expect(updateCall.data).not.toHaveProperty("name");
    expect(updateCall.data).not.toHaveProperty("email");
  });

  /**
   * IDOR REGRESSION TEST
   *
   * The PATCH handler currently does `await params` but never uses the extracted
   * teamId to verify that the target memberId belongs to that team.
   * An admin can update ANY member from ANY team by supplying their memberId.
   *
   * This test documents the existing vulnerability:
   *   - URL says team-A
   *   - memberId in body belongs to team-B
   *   - The handler currently succeeds (200) — this is WRONG
   *
   * After the fix (verify member.teamId === urlTeamId before updating), this
   * test should be updated to expect status 403.
   */
  it("IDOR FIX: rejects updating a member from a different team", async () => {
    // Member belongs to team-B but we're calling with team-A URL params
    prismaMock.teamMember.findUnique.mockResolvedValue(makeMemberRow({ id: "member-in-team-B", teamId: "team-B" }) as never);

    const req = makeRequest("PATCH", "http://localhost/api/admin/teams/team-A/members", {
      memberId: "member-in-team-B",
      name: "Injected Name",
    });

    const res = await PATCH(req, TEAM_A_PARAMS);
    expect(res.status).toBe(404);
  });

  it("IDOR FIX: rejects deleting a member from a different team", async () => {
    prismaMock.teamMember.findUnique.mockResolvedValue(makeMemberRow({ id: "m-in-B", teamId: "team-B" }) as never);

    const req = makeRequest(
      "DELETE",
      "http://localhost/api/admin/teams/team-A/members?memberId=m-in-B"
    );

    const res = await DELETE(req, TEAM_A_PARAMS);
    expect(res.status).toBe(404);
  });
});

// =============================================================================
// DELETE — remove team member
// =============================================================================

describe("DELETE /api/admin/teams/[id]/members — delete", () => {
  beforeEach(() => {
    mockReset(prismaMock);
    prismaMock.teamMember.findUnique.mockResolvedValue(makeMemberRow({ teamId: "team-A" }) as never);
    prismaMock.teamMember.delete.mockResolvedValue(makeMemberRow() as never);
  });

  it("returns 200 with a 'Deleted' message", async () => {
    prismaMock.teamMember.findUnique.mockResolvedValue(makeMemberRow({ id: "member-cuid-001", teamId: "team-A" }) as never);
    const req = makeRequest(
      "DELETE",
      "http://localhost/api/admin/teams/team-A/members?memberId=member-cuid-001"
    );
    const res = await DELETE(req, TEAM_A_PARAMS);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.message).toMatch(/deleted/i);
  });

  it("returns 400 when memberId query param is missing", async () => {
    const req = makeRequest(
      "DELETE",
      "http://localhost/api/admin/teams/team-A/members"
    );
    const res = await DELETE(req, TEAM_A_PARAMS);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/memberId required/i);
  });

  it("calls prisma.teamMember.delete with the correct memberId", async () => {
    prismaMock.teamMember.findUnique.mockResolvedValue(makeMemberRow({ id: "target-member-id", teamId: "team-A" }) as never);
    const req = makeRequest(
      "DELETE",
      "http://localhost/api/admin/teams/team-A/members?memberId=target-member-id"
    );
    await DELETE(req, TEAM_A_PARAMS);
    expect(prismaMock.teamMember.delete).toHaveBeenCalledWith({
      where: { id: "target-member-id" },
    });
  });
});
