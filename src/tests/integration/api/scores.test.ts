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

import { POST, PATCH } from "@/app/api/admin/teams/[id]/scores/route";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const TEAM_PARAMS = { params: Promise.resolve({ id: "team-cuid-001" }) };

function makeRequest(method: string, body: object): Request {
  return new Request("http://localhost/api/admin/teams/team-cuid-001/scores", {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

const BASE_POST_BODY = {
  week: 1,
  shipTarget: "Landing Page",
  score: 8,
  feedback: "Good work.",
  completed: true,
};

function makeProgressRow(week: number, score: number) {
  return {
    id: `prog-${week}`,
    teamId: "team-cuid-001",
    week,
    shipTarget: `Week ${week}`,
    completed: score > 0,
    score,
    feedback: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

// =============================================================================
// POST — create/upsert week score
// =============================================================================

describe("POST /api/admin/teams/[id]/scores — happy path", () => {
  beforeEach(() => {
    mockReset(prismaMock);
    prismaMock.$transaction.mockImplementation(async (fn: unknown) =>
      typeof fn === "function" ? fn(prismaMock) : Promise.resolve()
    );
    prismaMock.weekProgress.upsert.mockResolvedValue(makeProgressRow(1, 8) as never);
    prismaMock.weekProgress.findMany.mockResolvedValue([makeProgressRow(1, 8)] as never);
    prismaMock.team.update.mockResolvedValue({ id: "team-cuid-001", totalPoints: 8 } as never);
  });

  it("returns 200 with progress and updated totalPoints", async () => {
    const res = await POST(makeRequest("POST", BASE_POST_BODY), TEAM_PARAMS);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.totalPoints).toBe(8);
    expect(body.progress).toBeDefined();
  });

  it("uses teamId from URL params (not request body)", async () => {
    await POST(makeRequest("POST", BASE_POST_BODY), TEAM_PARAMS);
    const upsertCall = prismaMock.weekProgress.upsert.mock.calls[0][0];
    expect(upsertCall.where.teamId_week.teamId).toBe("team-cuid-001");
  });

  it("defaults score to 0 when score is not provided", async () => {
    prismaMock.weekProgress.upsert.mockResolvedValue(makeProgressRow(1, 0) as never);
    prismaMock.weekProgress.findMany.mockResolvedValue([makeProgressRow(1, 0)] as never);
    prismaMock.team.update.mockResolvedValue({ id: "t1", totalPoints: 0 } as never);

    const { score: _, ...noScore } = BASE_POST_BODY;
    const res = await POST(makeRequest("POST", noScore), TEAM_PARAMS);
    expect(res.status).toBe(200);

    const upsertCall = prismaMock.weekProgress.upsert.mock.calls[0][0];
    expect(upsertCall.create.score).toBe(0);
  });

  it("defaults completed to false when completed is not provided", async () => {
    prismaMock.weekProgress.upsert.mockResolvedValue(makeProgressRow(1, 8) as never);
    prismaMock.weekProgress.findMany.mockResolvedValue([makeProgressRow(1, 8)] as never);
    prismaMock.team.update.mockResolvedValue({ id: "t1", totalPoints: 8 } as never);

    const { completed: _, ...noCompleted } = BASE_POST_BODY;
    await POST(makeRequest("POST", noCompleted), TEAM_PARAMS);

    const upsertCall = prismaMock.weekProgress.upsert.mock.calls[0][0];
    expect(upsertCall.create.completed).toBe(false);
  });

  it("recalculates totalPoints as the sum of all week scores after upsert", async () => {
    // Simulate 3 existing weeks: scores 8, 9, 7 = 24 total
    prismaMock.weekProgress.upsert.mockResolvedValue(makeProgressRow(3, 7) as never);
    prismaMock.weekProgress.findMany.mockResolvedValue([
      makeProgressRow(1, 8),
      makeProgressRow(2, 9),
      makeProgressRow(3, 7),
    ] as never);
    prismaMock.team.update.mockResolvedValue({ id: "t1", totalPoints: 24 } as never);

    const res = await POST(makeRequest("POST", { ...BASE_POST_BODY, week: 3, score: 7 }), TEAM_PARAMS);
    expect(res.status).toBe(200);

    const updateCall = prismaMock.team.update.mock.calls[0][0];
    expect(updateCall.data.totalPoints).toBe(24);
  });
});

describe("POST /api/admin/teams/[id]/scores — validation", () => {
  beforeEach(() => {
    mockReset(prismaMock);
    vi.clearAllMocks();
  });

  it("returns 400 when 'week' is missing", async () => {
    const { week: _, ...noWeek } = BASE_POST_BODY;
    const res = await POST(makeRequest("POST", noWeek), TEAM_PARAMS);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/week/i);
  });

  it("returns 400 when 'shipTarget' is missing", async () => {
    const { shipTarget: _, ...noShipTarget } = BASE_POST_BODY;
    const res = await POST(makeRequest("POST", noShipTarget), TEAM_PARAMS);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/shipTarget/i);
  });

  /**
   * SCORE BOUNDS — missing validation (these tests document the gap).
   * After adding bounds checks (score must be 0–10, integer), flip the
   * comments from "documents current behavior" to "expects 400".
   */
  it("returns 400 for a negative score", async () => {
    const res = await POST(makeRequest("POST", { ...BASE_POST_BODY, score: -5 }), TEAM_PARAMS);
    expect(res.status).toBe(400);
  });

  it("returns 400 for a score above 10", async () => {
    const res = await POST(makeRequest("POST", { ...BASE_POST_BODY, score: 99999 }), TEAM_PARAMS);
    expect(res.status).toBe(400);
  });

  it("accepts a float score like 9.5 (within valid range)", async () => {
    prismaMock.$transaction.mockImplementation(async (fn: unknown) =>
      typeof fn === "function" ? fn(prismaMock) : Promise.resolve()
    );
    prismaMock.weekProgress.upsert.mockResolvedValue(makeProgressRow(1, 9) as never);
    prismaMock.weekProgress.findMany.mockResolvedValue([makeProgressRow(1, 9)] as never);
    prismaMock.team.update.mockResolvedValue({ id: "t1", totalPoints: 9 } as never);

    const res = await POST(makeRequest("POST", { ...BASE_POST_BODY, score: 9.5 }), TEAM_PARAMS);
    expect(res.status).toBe(200);
  });

  it("accepts score = 0 (minimum valid value)", async () => {
    prismaMock.$transaction.mockImplementation(async (fn: unknown) =>
      typeof fn === "function" ? fn(prismaMock) : Promise.resolve()
    );
    prismaMock.weekProgress.upsert.mockResolvedValue(makeProgressRow(1, 0) as never);
    prismaMock.weekProgress.findMany.mockResolvedValue([makeProgressRow(1, 0)] as never);
    prismaMock.team.update.mockResolvedValue({ id: "t1", totalPoints: 0 } as never);

    const res = await POST(makeRequest("POST", { ...BASE_POST_BODY, score: 0 }), TEAM_PARAMS);
    expect(res.status).toBe(200);
  });

  it("accepts score = 10 (maximum expected value)", async () => {
    prismaMock.$transaction.mockImplementation(async (fn: unknown) =>
      typeof fn === "function" ? fn(prismaMock) : Promise.resolve()
    );
    prismaMock.weekProgress.upsert.mockResolvedValue(makeProgressRow(1, 10) as never);
    prismaMock.weekProgress.findMany.mockResolvedValue([makeProgressRow(1, 10)] as never);
    prismaMock.team.update.mockResolvedValue({ id: "t1", totalPoints: 10 } as never);

    const res = await POST(makeRequest("POST", { ...BASE_POST_BODY, score: 10 }), TEAM_PARAMS);
    expect(res.status).toBe(200);
  });
});

// =============================================================================
// PATCH — update existing week score
// =============================================================================

describe("PATCH /api/admin/teams/[id]/scores — happy path", () => {
  beforeEach(() => {
    mockReset(prismaMock);
    prismaMock.$transaction.mockImplementation(async (fn: unknown) =>
      typeof fn === "function" ? fn(prismaMock) : Promise.resolve()
    );
    prismaMock.weekProgress.update.mockResolvedValue(makeProgressRow(1, 9) as never);
    prismaMock.weekProgress.findMany.mockResolvedValue([makeProgressRow(1, 9)] as never);
    prismaMock.team.update.mockResolvedValue({ id: "team-cuid-001", totalPoints: 9 } as never);
  });

  it("returns 200 with updated progress and totalPoints", async () => {
    const res = await PATCH(makeRequest("PATCH", { week: 1, score: 9, completed: true }), TEAM_PARAMS);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.totalPoints).toBe(9);
  });

  it("returns 400 when 'week' is missing", async () => {
    const res = await PATCH(makeRequest("PATCH", { score: 9 }), TEAM_PARAMS);
    expect(res.status).toBe(400);
  });

  it("only updates fields that are explicitly provided (partial update)", async () => {
    prismaMock.weekProgress.update.mockResolvedValue(makeProgressRow(1, 9) as never);

    await PATCH(makeRequest("PATCH", { week: 1, score: 9 }), TEAM_PARAMS);

    const updateCall = prismaMock.weekProgress.update.mock.calls[0][0];
    // score should be in data, completed and feedback should NOT be
    expect(updateCall.data).toHaveProperty("score", 9);
    expect(updateCall.data).not.toHaveProperty("completed");
    expect(updateCall.data).not.toHaveProperty("feedback");
  });

  it("updates feedback without touching score when only feedback is provided", async () => {
    await PATCH(makeRequest("PATCH", { week: 1, feedback: "Updated feedback" }), TEAM_PARAMS);
    const updateCall = prismaMock.weekProgress.update.mock.calls[0][0];
    expect(updateCall.data).toHaveProperty("feedback", "Updated feedback");
    expect(updateCall.data).not.toHaveProperty("score");
  });
});
