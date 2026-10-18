import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getSession();
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [teamCount, memberCount, applicantCount, pendingApplicants] =
      await Promise.all([
        prisma.team.count(),
        prisma.teamMember.count(),
        prisma.applicant.count(),
        prisma.applicant.count({ where: { status: "PENDING" } }),
      ]);

    const recentApplications = await prisma.applicant.findMany({
      take: 5,
      orderBy: { appliedAt: "desc" },
    });

    return NextResponse.json({
      teamCount,
      memberCount,
      applicantCount,
      pendingApplicants,
      recentApplications,
    });
  } catch (error) {
    console.error("GET /api/admin/stats error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
