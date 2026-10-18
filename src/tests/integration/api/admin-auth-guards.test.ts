/**
 * Admin API Route — Auth Guard Coverage
 *
 * Each admin handler performs the same guard pattern:
 *   const session = await getSession();
 *   if (!session || session.user.role !== "admin") return 401
 *
 * This file verifies all three scenarios for every admin handler:
 *   1. No session (unauthenticated) => 401
 *   2. Authenticated as "member" (wrong role) => 401
 *   3. Authenticated as "admin" (correct role) => proceeds (2xx or 4xx from logic, not 401)
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { mockReset } from "vitest-mock-extended";

const { getSessionMock } = vi.hoisted(() => ({ getSessionMock: vi.fn() }));

vi.mock("@/lib/prisma", async () => {
  const { prismaMock } = await import("@/tests/helpers/prisma-mock");
  return { prisma: prismaMock };
});
vi.mock("@/lib/auth", () => ({ getSession: getSessionMock }));

import { prismaMock } from "@/tests/helpers/prisma-mock";

// ---------------------------------------------------------------------------
// Session factories
// ---------------------------------------------------------------------------

const NO_SESSION = null;
const MEMBER_SESSION = { user: { id: "m1", role: "member", email: "m@t.ph", teamId: "t1" } };
const ADMIN_SESSION = { user: { id: "a1", role: "admin", email: "admin@sbv.one" } };

// ---------------------------------------------------------------------------
// Lazy imports — placed after mocks so the mocked prisma is used at module
// evaluation time.
// ---------------------------------------------------------------------------

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

import {
  POST as membersPOST,
  PATCH as membersPATCH,
  DELETE as membersDELETE,
} from "@/app/api/admin/teams/[id]/members/route";

import {
  POST as scoresPOST,
  PATCH as scoresPATCH,
} from "@/app/api/admin/teams/[id]/scores/route";

// ---------------------------------------------------------------------------
// Reusable request factory
// ---------------------------------------------------------------------------

function makeRequest(method: string, url: string, body?: object): Request {
  return new Request(url, {
    method,
    headers: body ? { "Content-Type": "application/json" } : {},
    body: body ? JSON.stringify(body) : undefined,
  });
}

const TEAM_PARAMS = { params: Promise.resolve({ id: "team-cuid-001" }) };

// =============================================================================
// Helper: runs the standard three-scenario auth guard test for a handler
// =============================================================================

function describeAuthGuard(
  handlerName: string,
  handler: (req: Request, ctx?: unknown) => Promise<Response>,
  req: () => Request,
  ctx?: unknown
) {
  describe(`${handlerName} — auth guard`, () => {
    beforeEach(() => {
      mockReset(prismaMock);
      vi.clearAllMocks();
      // Default stubs so the handler can proceed past auth without crashing
      prismaMock.applicant.findMany.mockResolvedValue([]);
      prismaMock.applicant.update.mockResolvedValue({} as never);
      prismaMock.applicant.delete.mockResolvedValue({} as never);
      prismaMock.team.findMany.mockResolvedValue([]);
      prismaMock.team.create.mockResolvedValue({ id: "t1", slug: "s1" } as never);
      prismaMock.team.update.mockResolvedValue({ id: "t1" } as never);
      prismaMock.team.delete.mockResolvedValue({} as never);
      prismaMock.challenge.findMany.mockResolvedValue([]);
      prismaMock.challenge.create.mockResolvedValue({ id: "c1" } as never);
      prismaMock.challenge.update.mockResolvedValue({ id: "c1" } as never);
      prismaMock.teamMember.create.mockResolvedValue({ id: "m1", password: null } as never);
      prismaMock.teamMember.update.mockResolvedValue({ id: "m1", password: null } as never);
      prismaMock.teamMember.delete.mockResolvedValue({} as never);
      prismaMock.team.count.mockResolvedValue(0);
      prismaMock.teamMember.count.mockResolvedValue(0);
      prismaMock.applicant.count.mockResolvedValue(0);
      prismaMock.weekProgress.upsert.mockResolvedValue({} as never);
      prismaMock.weekProgress.update.mockResolvedValue({} as never);
      prismaMock.weekProgress.findMany.mockResolvedValue([]);
      // Transaction stub that runs the callback immediately
      prismaMock.$transaction.mockImplementation(async (fn: unknown) =>
        typeof fn === "function" ? fn(prismaMock) : Promise.all(fn as Promise<unknown>[])
      );
    });

    it("returns 401 with no session (unauthenticated)", async () => {
      getSessionMock.mockResolvedValue(NO_SESSION);
      const res = await handler(req(), ctx);
      expect(res.status).toBe(401);
      const body = await res.json();
      expect(body.error).toBe("Unauthorized");
    });

    it("returns 401 when authenticated as 'member' role", async () => {
      getSessionMock.mockResolvedValue(MEMBER_SESSION);
      const res = await handler(req(), ctx);
      expect(res.status).toBe(401);
    });

    it("does NOT return 401 when authenticated as 'admin' role", async () => {
      getSessionMock.mockResolvedValue(ADMIN_SESSION);
      const res = await handler(req(), ctx);
      expect(res.status).not.toBe(401);
    });
  });
}

// =============================================================================
// /api/admin/applications
// =============================================================================

describeAuthGuard(
  "GET /api/admin/applications",
  applicationsGET,
  () => makeRequest("GET", "http://localhost/api/admin/applications")
);

describeAuthGuard(
  "PATCH /api/admin/applications",
  applicationsPATCH,
  () => makeRequest("PATCH", "http://localhost/api/admin/applications", { id: "app-1", status: "accepted" })
);

describeAuthGuard(
  "DELETE /api/admin/applications",
  applicationsDELETE,
  () => makeRequest("DELETE", "http://localhost/api/admin/applications?id=app-1")
);

// =============================================================================
// /api/admin/teams
// =============================================================================

describeAuthGuard(
  "GET /api/admin/teams",
  teamsGET
  , () => makeRequest("GET", "http://localhost/api/admin/teams")
);

describeAuthGuard(
  "POST /api/admin/teams",
  teamsPOST,
  () => makeRequest("POST", "http://localhost/api/admin/teams", {
    name: "Test Team",
    productName: "TestProd",
    description: "Desc",
    niche: "Tech",
  })
);

describeAuthGuard(
  "PATCH /api/admin/teams",
  teamsPATCH,
  () => makeRequest("PATCH", "http://localhost/api/admin/teams", { id: "t1", name: "New Name" })
);

describeAuthGuard(
  "DELETE /api/admin/teams",
  teamsDELETE,
  () => makeRequest("DELETE", "http://localhost/api/admin/teams?id=t1")
);

// =============================================================================
// /api/admin/challenges
// =============================================================================

describeAuthGuard(
  "GET /api/admin/challenges",
  challengesGET,
  () => makeRequest("GET", "http://localhost/api/admin/challenges")
);

describeAuthGuard(
  "POST /api/admin/challenges",
  challengesPOST,
  () => makeRequest("POST", "http://localhost/api/admin/challenges", {
    week: 1,
    name: "Challenge",
    description: "Desc",
    tests: "Tests",
  })
);

describeAuthGuard(
  "PATCH /api/admin/challenges",
  challengesPATCH,
  () => makeRequest("PATCH", "http://localhost/api/admin/challenges", { id: "c1", name: "Updated" })
);

// =============================================================================
// /api/admin/stats
// =============================================================================

describeAuthGuard(
  "GET /api/admin/stats",
  statsGET,
  () => makeRequest("GET", "http://localhost/api/admin/stats")
);

// =============================================================================
// /api/admin/teams/[id]/members
// =============================================================================

describeAuthGuard(
  "POST /api/admin/teams/[id]/members",
  (req, ctx) => membersPOST(req, ctx as typeof TEAM_PARAMS),
  () => makeRequest("POST", "http://localhost/api/admin/teams/team-1/members", {
    name: "New Member",
    email: "new@team.ph",
    role: "hacker",
    bio: "bio here",
  }),
  TEAM_PARAMS
);

describeAuthGuard(
  "PATCH /api/admin/teams/[id]/members",
  (req, ctx) => membersPATCH(req, ctx as typeof TEAM_PARAMS),
  () => makeRequest("PATCH", "http://localhost/api/admin/teams/team-1/members", { memberId: "m1", name: "Updated" }),
  TEAM_PARAMS
);

describeAuthGuard(
  "DELETE /api/admin/teams/[id]/members",
  (req, ctx) => membersDELETE(req, ctx as typeof TEAM_PARAMS),
  () => makeRequest("DELETE", "http://localhost/api/admin/teams/team-1/members?memberId=m1"),
  TEAM_PARAMS
);

// =============================================================================
// /api/admin/teams/[id]/scores
// =============================================================================

describeAuthGuard(
  "POST /api/admin/teams/[id]/scores",
  (req, ctx) => scoresPOST(req, ctx as typeof TEAM_PARAMS),
  () => makeRequest("POST", "http://localhost/api/admin/teams/team-1/scores", {
    week: 1,
    shipTarget: "Landing Page",
    score: 8,
    feedback: "Good.",
    completed: true,
  }),
  TEAM_PARAMS
);

describeAuthGuard(
  "PATCH /api/admin/teams/[id]/scores",
  (req, ctx) => scoresPATCH(req, ctx as typeof TEAM_PARAMS),
  () => makeRequest("PATCH", "http://localhost/api/admin/teams/team-1/scores", { week: 1, score: 9 }),
  TEAM_PARAMS
);

// =============================================================================
// /api/dashboard — member-only guard (role must be "member", not "admin")
// =============================================================================

describe("GET /api/dashboard — member-only auth guard", () => {
  // Dashboard uses a different guard: role !== "member" => 401
  // Import inside describe to avoid hoisting issues with separate mock
  let dashboardGET: (req: Request) => Promise<Response>;

  beforeEach(async () => {
    mockReset(prismaMock);
    vi.clearAllMocks();
    const mod = await import("@/app/api/dashboard/route");
    dashboardGET = mod.GET;
    prismaMock.teamMember.findUnique.mockResolvedValue(null);
  });

  it("returns 401 with no session", async () => {
    getSessionMock.mockResolvedValue(NO_SESSION);
    const res = await dashboardGET(makeRequest("GET", "http://localhost/api/dashboard"));
    expect(res.status).toBe(401);
  });

  it("returns 401 when authenticated as 'admin' role (not a member)", async () => {
    getSessionMock.mockResolvedValue(ADMIN_SESSION);
    const res = await dashboardGET(makeRequest("GET", "http://localhost/api/dashboard"));
    expect(res.status).toBe(401);
  });

  it("does NOT return 401 when authenticated as 'member' role", async () => {
    getSessionMock.mockResolvedValue(MEMBER_SESSION);
    // Will return 404 because member is not found in DB — that's fine, not 401
    const res = await dashboardGET(makeRequest("GET", "http://localhost/api/dashboard"));
    expect(res.status).not.toBe(401);
  });
});
