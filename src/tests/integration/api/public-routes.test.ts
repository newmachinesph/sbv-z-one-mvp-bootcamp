import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/prisma", async () => {
  const { prismaMock } = await import("@/tests/helpers/prisma-mock");
  return { prisma: prismaMock };
});

// Mock data.ts at module level — individual tests can override per-method mocks
// by also mocking the data module for routes that delegate to it.
vi.mock("@/lib/data", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/data")>();
  return {
    ...actual,
    getTeams: vi.fn(),
    getTeamBySlug: vi.fn(),
    getLeaderboard: vi.fn(),
    getChallenges: vi.fn(),
  };
});

import { GET as teamsGET } from "@/app/api/teams/route";
import { GET as teamBySlugGET } from "@/app/api/teams/[slug]/route";
import { GET as leaderboardGET } from "@/app/api/leaderboard/route";
import { GET as challengesGET } from "@/app/api/challenges/route";

import { getTeams, getTeamBySlug, getLeaderboard, getChallenges } from "@/lib/data";

// ---------------------------------------------------------------------------
// Shared team fixture
// ---------------------------------------------------------------------------

const fakeTeam = {
  id: "t1",
  slug: "team-tindahan",
  name: "Tindahan Tech",
  productName: "SariTrack",
  description: "Inventory management",
  niche: "Retail Tech",
  currentWeek: 6,
  totalPoints: 41,
  status: "active" as const,
  avatarUrl: null,
  members: [],
  weeklyProgress: [],
};

// =============================================================================
// GET /api/teams
// =============================================================================

describe("GET /api/teams", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns 200 with the teams array", async () => {
    vi.mocked(getTeams).mockResolvedValue([fakeTeam]);

    const req = new Request("http://localhost/api/teams");
    const res = await teamsGET(req);

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toHaveLength(1);
    expect(body[0].slug).toBe("team-tindahan");
  });

  it("passes the status query param to getTeams", async () => {
    vi.mocked(getTeams).mockResolvedValue([]);

    const req = new Request("http://localhost/api/teams?status=active");
    await teamsGET(req);

    expect(getTeams).toHaveBeenCalledWith("active");
  });

  it("passes undefined to getTeams when no status param is present", async () => {
    vi.mocked(getTeams).mockResolvedValue([]);

    const req = new Request("http://localhost/api/teams");
    await teamsGET(req);

    expect(getTeams).toHaveBeenCalledWith(undefined);
  });

  it("returns an empty array when no teams exist", async () => {
    vi.mocked(getTeams).mockResolvedValue([]);

    const req = new Request("http://localhost/api/teams");
    const res = await teamsGET(req);

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual([]);
  });

  it("returns 500 on database errors", async () => {
    vi.mocked(getTeams).mockRejectedValue(new Error("DB connection lost"));

    const req = new Request("http://localhost/api/teams");
    const res = await teamsGET(req);
    expect(res.status).toBe(500);
  });
});

// =============================================================================
// GET /api/teams/[slug]
// =============================================================================

describe("GET /api/teams/[slug]", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns 200 with team data when slug is found", async () => {
    vi.mocked(getTeamBySlug).mockResolvedValue(fakeTeam);

    const req = new Request("http://localhost/api/teams/team-tindahan");
    const res = await teamBySlugGET(req, { params: Promise.resolve({ slug: "team-tindahan" }) });

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.slug).toBe("team-tindahan");
  });

  it("returns 404 when team is not found", async () => {
    vi.mocked(getTeamBySlug).mockResolvedValue(null);

    const req = new Request("http://localhost/api/teams/nonexistent");
    const res = await teamBySlugGET(req, { params: Promise.resolve({ slug: "nonexistent" }) });

    expect(res.status).toBe(404);
    const body = await res.json();
    expect(body.error).toMatch(/not found/i);
  });

  it("passes the correct slug from URL params to getTeamBySlug", async () => {
    vi.mocked(getTeamBySlug).mockResolvedValue(fakeTeam);

    const req = new Request("http://localhost/api/teams/team-tindahan");
    await teamBySlugGET(req, { params: Promise.resolve({ slug: "team-tindahan" }) });

    expect(getTeamBySlug).toHaveBeenCalledWith("team-tindahan");
  });

  it("works with a CUID (ID fallback path via getTeamBySlug internal logic)", async () => {
    const teamFoundById = { ...fakeTeam, slug: "team-tindahan" };
    vi.mocked(getTeamBySlug).mockResolvedValue(teamFoundById);

    const req = new Request("http://localhost/api/teams/clxyz-abc123");
    const res = await teamBySlugGET(req, { params: Promise.resolve({ slug: "clxyz-abc123" }) });

    expect(res.status).toBe(200);
    // getTeamBySlug internally tries slug first, then ID — the route just passes through
    expect(getTeamBySlug).toHaveBeenCalledWith("clxyz-abc123");
  });
});

// =============================================================================
// GET /api/leaderboard
// =============================================================================

describe("GET /api/leaderboard", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns 200 with leaderboard array", async () => {
    const fakeLeaderboard = [
      {
        id: "team-tindahan",
        rank: 1,
        name: "Tindahan Tech",
        productName: "SariTrack",
        niche: "Retail Tech",
        currentWeek: 6,
        totalPoints: 41,
        maxPossiblePoints: 60,
        status: "active" as const,
        streak: 5,
        avgScore: 8.2,
      },
    ];

    vi.mocked(getLeaderboard).mockResolvedValue(fakeLeaderboard);

    const res = await leaderboardGET();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toHaveLength(1);
    expect(body[0].rank).toBe(1);
    expect(body[0].streak).toBe(5);
  });

  it("returns 200 with empty array when no teams exist", async () => {
    vi.mocked(getLeaderboard).mockResolvedValue([]);

    const res = await leaderboardGET();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual([]);
  });

  it("returns 500 on database errors", async () => {
    vi.mocked(getLeaderboard).mockRejectedValue(new Error("DB timeout"));

    const res = await leaderboardGET();
    expect(res.status).toBe(500);
  });
});

// =============================================================================
// GET /api/challenges (public — no auth required)
// =============================================================================

describe("GET /api/challenges", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns 200 with challenges array", async () => {
    const fakeChallenges = [
      { id: "c1", week: 1, name: "The 50-Email Sprint", description: "Get 50 signups", tests: "Verify emails", winner: null, createdAt: new Date(), updatedAt: new Date() },
    ];
    vi.mocked(getChallenges).mockResolvedValue(fakeChallenges as never);

    const res = await challengesGET();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toHaveLength(1);
    expect(body[0].week).toBe(1);
  });

  it("returns 200 with empty array when no challenges exist", async () => {
    vi.mocked(getChallenges).mockResolvedValue([]);

    const res = await challengesGET();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual([]);
  });
});
