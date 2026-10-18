import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id: teamId } = await params;
    const body = await request.json();
    const { week, shipTarget, score, feedback, completed } = body;

    if (!week || !shipTarget) {
      return NextResponse.json({ error: "week and shipTarget required" }, { status: 400 });
    }

    if (typeof week !== "number" || week < 1 || week > 12) {
      return NextResponse.json({ error: "week must be between 1 and 12" }, { status: 400 });
    }

    if (score !== undefined && (typeof score !== "number" || score < 0 || score > 10)) {
      return NextResponse.json({ error: "score must be between 0 and 10" }, { status: 400 });
    }

    const result = await prisma.$transaction(async (tx) => {
      const progress = await tx.weekProgress.upsert({
        where: { teamId_week: { teamId, week } },
        create: {
          teamId,
          week,
          shipTarget,
          score: score ?? 0,
          feedback: feedback ?? "",
          completed: completed ?? false,
        },
        update: {
          score: score ?? 0,
          feedback: feedback ?? "",
          completed: completed ?? false,
        },
      });

      const allProgress = await tx.weekProgress.findMany({
        where: { teamId },
      });
      const totalPoints = allProgress.reduce((sum, p) => sum + p.score, 0);

      await tx.team.update({
        where: { id: teamId },
        data: { totalPoints },
      });

      return { progress, totalPoints };
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("POST /api/admin/teams/[id]/scores error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id: teamId } = await params;
    const body = await request.json();
    const { week, score, feedback, completed } = body;

    if (!week) {
      return NextResponse.json({ error: "week required" }, { status: 400 });
    }

    if (typeof week !== "number" || week < 1 || week > 12) {
      return NextResponse.json({ error: "week must be between 1 and 12" }, { status: 400 });
    }

    if (score !== undefined && (typeof score !== "number" || score < 0 || score > 10)) {
      return NextResponse.json({ error: "score must be between 0 and 10" }, { status: 400 });
    }

    const result = await prisma.$transaction(async (tx) => {
      const progress = await tx.weekProgress.update({
        where: { teamId_week: { teamId, week } },
        data: {
          ...(score !== undefined && { score }),
          ...(feedback !== undefined && { feedback }),
          ...(completed !== undefined && { completed }),
        },
      });

      const allProgress = await tx.weekProgress.findMany({
        where: { teamId },
      });
      const totalPoints = allProgress.reduce((sum, p) => sum + p.score, 0);

      await tx.team.update({
        where: { id: teamId },
        data: { totalPoints },
      });

      return { progress, totalPoints };
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("PATCH /api/admin/teams/[id]/scores error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
