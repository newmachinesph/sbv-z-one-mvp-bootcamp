import { describe, it, expect, vi, beforeEach } from "vitest";
import { mockReset } from "vitest-mock-extended";

vi.mock("@/lib/prisma", async () => {
  const { prismaMock } = await import("@/tests/helpers/prisma-mock");
  return { prisma: prismaMock };
});

import { prismaMock } from "@/tests/helpers/prisma-mock";

import { getTeams, getTeamBySlug, getLeaderboard, getApplicants, getChallenges } from "@/lib/data";

// ---------------------------------------------------------------------------
// Shared fake data factories
// ---------------------------------------------------------------------------

type ProgressRow = { completed: boolean; score: number };

function makeTeamRow(
  overrides: Partial<{
    id: string;
    slug: string;
    name: string;
    status: string;
    currentWeek: number;
    totalPoints: number;
    progress: ProgressRow[];
  }> = {}
) {
  const progress = (overrides.progress ?? []).map((p, i) => ({
    id: `prog-${i}`,
    teamId: overrides.id ?? "t1",
    week: i + 1,
    shipTarget: `Week ${i + 1}`,
    completed: p.completed,
    score: p.score,
    feedback: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  return {
    id: overrides.id ?? "t1",
    slug: overrides.slug ?? "team-one",
    name: overrides.name ?? "Team One",
    productName: "Product One",
    description: "A description",
    niche: "Tech",
    currentWeek: overrides.currentWeek ?? 6,
    totalPoints: overrides.totalPoints ?? 0,
    status: overrides.status ?? "ACTIVE",
    avatarUrl: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    members: [],
    progress,
  };
}

// =============================================================================
// getTeams — status filtering and mapping
// =============================================================================

describe("getTeams", () => {
  beforeEach(() => mockReset(prismaMock));

  it("queries without a where clause when no status is passed", async () => {
    prismaMock.team.findMany.mockResolvedValue([]);
    await getTeams();
    expect(prismaMock.team.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: undefined })
    );
  });

  it("filters by ACTIVE status when 'active' is passed (case-insensitive)", async () => {
    prismaMock.team.findMany.mockResolvedValue([]);
    await getTeams("active");
    expect(prismaMock.team.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { status: "ACTIVE" } })
    );
  });

  it("filters by GRADUATED when 'Graduated' is passed (mixed case)", async () => {
    prismaMock.team.findMany.mockResolvedValue([]);
    await getTeams("Graduated");
    expect(prismaMock.team.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { status: "GRADUATED" } })
    );
  });

  it("passes where: { status: undefined } for an invalid status string (silent fallback)", async () => {
    // parseTeamStatus returns null for invalid values; null ?? undefined = undefined
    // This means Prisma ignores the filter and returns all teams.
    prismaMock.team.findMany.mockResolvedValue([]);
    await getTeams("invalid_status");
    expect(prismaMock.team.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { status: undefined } })
    );
  });

  it("maps DB status UPPERCASE to lowercase on returned objects", async () => {
    prismaMock.team.findMany.mockResolvedValue([makeTeamRow({ status: "ACTIVE" })] as never);
    const [team] = await getTeams();
    expect(team.status).toBe("active");
  });

  it("maps member roles to lowercase", async () => {
    const teamWithMember = {
      ...makeTeamRow(),
      members: [
        {
          id: "m1",
          name: "Ana",
          role: "HACKER",
          avatar: null,
          skills: ["JS"],
          bio: "dev",
          email: "ana@team.ph",
          password: "hash",
          teamId: "t1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    };
    prismaMock.team.findMany.mockResolvedValue([teamWithMember] as never);
    const [team] = await getTeams();
    expect(team.members[0].role).toBe("hacker");
  });

  it("maps empty avatar to empty string", async () => {
    const teamWithMember = {
      ...makeTeamRow(),
      members: [
        {
          id: "m1",
          name: "Ana",
          role: "HACKER",
          avatar: null,
          skills: [],
          bio: "bio",
          email: "ana@team.ph",
          password: null,
          teamId: "t1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    };
    prismaMock.team.findMany.mockResolvedValue([teamWithMember] as never);
    const [team] = await getTeams();
    expect(team.members[0].avatar).toBe("");
  });

  it("returns empty array when no teams exist", async () => {
    prismaMock.team.findMany.mockResolvedValue([]);
    const result = await getTeams();
    expect(result).toEqual([]);
  });
});

// =============================================================================
// getTeamBySlug — happy path, fallback to ID, not found, mapping
// =============================================================================

describe("getTeamBySlug", () => {
  beforeEach(() => mockReset(prismaMock));

  it("returns the mapped team when slug matches on first lookup", async () => {
    prismaMock.team.findUnique.mockResolvedValue(makeTeamRow({ slug: "team-tindahan" }) as never);
    const team = await getTeamBySlug("team-tindahan");
    expect(team).not.toBeNull();
    expect(team!.slug).toBe("team-tindahan");
    expect(prismaMock.team.findUnique).toHaveBeenCalledTimes(1);
  });

  it("falls back to ID lookup when slug lookup returns null", async () => {
    const teamRow = makeTeamRow({ id: "clxyz-abc123", slug: "team-one" });
    prismaMock.team.findUnique
      .mockResolvedValueOnce(null)              // slug lookup misses
      .mockResolvedValueOnce(teamRow as never); // ID lookup hits

    const team = await getTeamBySlug("clxyz-abc123");
    expect(team).not.toBeNull();
    expect(prismaMock.team.findUnique).toHaveBeenCalledTimes(2);
  });

  it("returns null when both slug and ID lookups fail", async () => {
    prismaMock.team.findUnique.mockResolvedValue(null);
    const team = await getTeamBySlug("nonexistent");
    expect(team).toBeNull();
    expect(prismaMock.team.findUnique).toHaveBeenCalledTimes(2);
  });

  it("maps status from UPPERCASE to lowercase", async () => {
    prismaMock.team.findUnique.mockResolvedValue(makeTeamRow({ status: "GRADUATED" }) as never);
    const team = await getTeamBySlug("some-slug");
    expect(team!.status).toBe("graduated");
  });

  it("maps weeklyProgress fields through correctly", async () => {
    const teamRow = makeTeamRow({
      progress: [{ completed: true, score: 9 }],
    });
    prismaMock.team.findUnique.mockResolvedValue(teamRow as never);
    const team = await getTeamBySlug("some-slug");
    expect(team!.weeklyProgress).toHaveLength(1);
    expect(team!.weeklyProgress[0].score).toBe(9);
    expect(team!.weeklyProgress[0].completed).toBe(true);
  });
});

// =============================================================================
// getLeaderboard — streak, avgScore, rank, maxPossiblePoints
// =============================================================================

describe("getLeaderboard — streak calculation", () => {
  beforeEach(() => mockReset(prismaMock));

  it("returns streak of 0 when no weeks have been completed", async () => {
    prismaMock.team.findMany.mockResolvedValue([
      makeTeamRow({ progress: [{ completed: false, score: 0 }, { completed: false, score: 0 }] }),
    ] as never);

    const [team] = await getLeaderboard();
    expect(team.streak).toBe(0);
  });

  it("returns streak equal to total weeks when all weeks are completed", async () => {
    prismaMock.team.findMany.mockResolvedValue([
      makeTeamRow({
        progress: [
          { completed: true, score: 8 },
          { completed: true, score: 9 },
          { completed: true, score: 7 },
        ],
      }),
    ] as never);

    const [team] = await getLeaderboard();
    expect(team.streak).toBe(3);
  });

  it("counts streak from the end — a gap in the middle resets the count", async () => {
    prismaMock.team.findMany.mockResolvedValue([
      makeTeamRow({
        progress: [
          { completed: true, score: 8 },   // week 1 — completed
          { completed: false, score: 0 },  // week 2 — NOT completed (gap)
          { completed: true, score: 9 },   // week 3 — completed
          { completed: true, score: 7 },   // week 4 — completed
        ],
      }),
    ] as never);

    const [team] = await getLeaderboard();
    expect(team.streak).toBe(2); // only weeks 3 and 4 count
  });

  it("returns streak of 1 when only the final week is completed", async () => {
    prismaMock.team.findMany.mockResolvedValue([
      makeTeamRow({
        progress: [
          { completed: false, score: 0 },
          { completed: false, score: 0 },
          { completed: true, score: 8 },
        ],
      }),
    ] as never);

    const [team] = await getLeaderboard();
    expect(team.streak).toBe(1);
  });

  it("returns streak of 0 when progress array is empty", async () => {
    prismaMock.team.findMany.mockResolvedValue([makeTeamRow({ progress: [] })] as never);
    const [team] = await getLeaderboard();
    expect(team.streak).toBe(0);
  });
});

describe("getLeaderboard — avgScore calculation", () => {
  beforeEach(() => mockReset(prismaMock));

  it("returns 0 when no weeks are completed", async () => {
    prismaMock.team.findMany.mockResolvedValue([
      makeTeamRow({ progress: [{ completed: false, score: 0 }] }),
    ] as never);

    const [team] = await getLeaderboard();
    expect(team.avgScore).toBe(0);
  });

  it("returns exact average when scores divide evenly", async () => {
    prismaMock.team.findMany.mockResolvedValue([
      makeTeamRow({
        progress: [
          { completed: true, score: 7 },
          { completed: true, score: 8 },
          { completed: true, score: 9 },
        ],
      }),
    ] as never);

    const [team] = await getLeaderboard();
    expect(team.avgScore).toBe(8.0); // (7+8+9)/3
  });

  it("rounds avgScore to one decimal place", async () => {
    prismaMock.team.findMany.mockResolvedValue([
      makeTeamRow({
        progress: [
          { completed: true, score: 7 },
          { completed: true, score: 8 },
        ],
      }),
    ] as never);

    const [team] = await getLeaderboard();
    expect(team.avgScore).toBe(7.5);
  });

  it("excludes incomplete weeks from avgScore calculation", async () => {
    prismaMock.team.findMany.mockResolvedValue([
      makeTeamRow({
        progress: [
          { completed: true, score: 10 },
          { completed: false, score: 5 }, // this 5 should NOT count
        ],
      }),
    ] as never);

    const [team] = await getLeaderboard();
    // Only the week with score=10 and completed=true counts
    expect(team.avgScore).toBe(10);
  });
});

describe("getLeaderboard — rank and maxPossiblePoints", () => {
  beforeEach(() => mockReset(prismaMock));

  it("assigns ranks starting at 1 in order returned by Prisma (sorted by totalPoints desc)", async () => {
    prismaMock.team.findMany.mockResolvedValue([
      makeTeamRow({ id: "t1", totalPoints: 46, progress: [] }),
      makeTeamRow({ id: "t2", totalPoints: 41, progress: [] }),
      makeTeamRow({ id: "t3", totalPoints: 36, progress: [] }),
    ] as never);

    const teams = await getLeaderboard();
    expect(teams[0].rank).toBe(1);
    expect(teams[1].rank).toBe(2);
    expect(teams[2].rank).toBe(3);
  });

  it("computes maxPossiblePoints as currentWeek * 10", async () => {
    prismaMock.team.findMany.mockResolvedValue([
      makeTeamRow({ currentWeek: 6, progress: [] }),
    ] as never);

    const [team] = await getLeaderboard();
    expect(team.maxPossiblePoints).toBe(60);
  });

  it("maxPossiblePoints is 0 when currentWeek is 0", async () => {
    prismaMock.team.findMany.mockResolvedValue([
      makeTeamRow({ currentWeek: 0, progress: [] }),
    ] as never);

    const [team] = await getLeaderboard();
    expect(team.maxPossiblePoints).toBe(0);
  });

  it("maps team status to lowercase on leaderboard entry", async () => {
    prismaMock.team.findMany.mockResolvedValue([
      makeTeamRow({ status: "GRADUATED", progress: [] }),
    ] as never);

    const [team] = await getLeaderboard();
    expect(team.status).toBe("graduated");
  });

  it("uses team slug as the leaderboard entry id", async () => {
    prismaMock.team.findMany.mockResolvedValue([
      makeTeamRow({ slug: "team-tindahan", progress: [] }),
    ] as never);

    const [team] = await getLeaderboard();
    expect(team.id).toBe("team-tindahan");
  });
});

// =============================================================================
// getApplicants — status filtering
// =============================================================================

describe("getApplicants", () => {
  beforeEach(() => mockReset(prismaMock));

  it("queries without a where clause when no status is passed", async () => {
    prismaMock.applicant.findMany.mockResolvedValue([]);
    await getApplicants();
    expect(prismaMock.applicant.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: undefined })
    );
  });

  it("filters by PENDING when 'pending' is passed", async () => {
    prismaMock.applicant.findMany.mockResolvedValue([]);
    await getApplicants("pending");
    expect(prismaMock.applicant.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { status: "PENDING" } })
    );
  });

  it("filters by ACCEPTED when 'accepted' is passed", async () => {
    prismaMock.applicant.findMany.mockResolvedValue([]);
    await getApplicants("accepted");
    expect(prismaMock.applicant.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { status: "ACCEPTED" } })
    );
  });
});

// =============================================================================
// getChallenges
// =============================================================================

describe("getChallenges", () => {
  beforeEach(() => mockReset(prismaMock));

  it("returns challenges ordered by week ascending", async () => {
    prismaMock.challenge.findMany.mockResolvedValue([]);
    await getChallenges();
    expect(prismaMock.challenge.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ orderBy: { week: "asc" } })
    );
  });
});
