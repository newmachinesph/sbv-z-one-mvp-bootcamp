import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { weeks } from "@/app/program/program-data";

export async function GET() {
  const session = await getSession();
  if (!session || session.user.role !== "member") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const member = await prisma.teamMember.findUnique({
      where: { email: session.user.email },
      include: {
        team: {
          include: {
            members: true,
            progress: { orderBy: { week: "asc" } },
          },
        },
      },
    });

    if (!member) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    const challenge = await prisma.challenge.findUnique({
      where: { week: member.team.currentWeek },
    });

    const weekData = weeks.find((w) => w.week === member.team.currentWeek);

    return NextResponse.json({
      user: {
        id: member.id,
        name: member.name,
        email: member.email,
        role: member.role.toLowerCase(),
        skills: member.skills,
      },
      team: {
        id: member.team.id,
        slug: member.team.slug,
        name: member.team.name,
        productName: member.team.productName,
        description: member.team.description,
        niche: member.team.niche,
        currentWeek: member.team.currentWeek,
        totalPoints: member.team.totalPoints,
        status: member.team.status.toLowerCase(),
        members: member.team.members.map((m) => ({
          id: m.id,
          name: m.name,
          role: m.role.toLowerCase(),
          skills: m.skills,
          avatar: m.avatar,
        })),
        weeklyProgress: member.team.progress.map((p) => ({
          week: p.week,
          shipTarget: p.shipTarget,
          completed: p.completed,
          score: p.score,
          feedback: p.feedback,
        })),
      },
      weekInfo: weekData
        ? {
            title: weekData.title,
            shipTarget: weekData.shipTarget,
            webinar: weekData.webinar,
            challenge: weekData.challenge.name,
          }
        : null,
      challenge,
    });
  } catch (error) {
    console.error("GET /api/dashboard error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
