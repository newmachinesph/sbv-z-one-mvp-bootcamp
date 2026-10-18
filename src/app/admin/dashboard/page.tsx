import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { AdminDashboardContent } from "./admin-dashboard-content";

export default async function AdminDashboardPage() {
  await requireAdmin();

  const [teamCount, memberCount, applicantCount, pendingApplicants, recentApplicants, teams, mentorCount, pendingMentors, recentMentors] =
    await Promise.all([
      prisma.team.count(),
      prisma.teamMember.count(),
      prisma.applicant.count(),
      prisma.applicant.count({ where: { status: "PENDING" } }),
      prisma.applicant.findMany({
        orderBy: { appliedAt: "desc" },
        take: 5,
      }),
      prisma.team.findMany({
        include: { members: true },
        orderBy: { totalPoints: "desc" },
        take: 5,
      }),
      prisma.mentorApplication.count(),
      prisma.mentorApplication.count({ where: { status: "PENDING" } }),
      prisma.mentorApplication.findMany({
        orderBy: { appliedAt: "desc" },
        take: 5,
      }),
    ]);

  return (
    <AdminDashboardContent
      stats={{
        teamCount,
        memberCount,
        applicantCount,
        pendingApplicants,
        mentorCount,
        pendingMentors,
      }}
      recentApplicants={recentApplicants.map((a) => ({
        id: a.id,
        name: a.name,
        email: a.email,
        location: a.location,
        role: a.preferredRole.toLowerCase(),
        skills: a.skills,
        experience: a.experience,
        motivation: a.motivation,
        linkedinUrl: a.linkedinUrl,
        resumeUrl: a.resumeUrl,
        portfolioUrl: a.portfolioUrl,
        status: a.status.toLowerCase(),
        appliedAt: a.appliedAt.toISOString(),
      }))}
      recentMentors={recentMentors.map((m) => ({
        id: m.id,
        name: m.name,
        email: m.email,
        phone: m.phone,
        linkedinUrl: m.linkedinUrl,
        resumeUrl: m.resumeUrl,
        portfolioUrl: m.portfolioUrl,
        whatBuilt: m.whatBuilt,
        whatFailed: m.whatFailed,
        whatShipped: m.whatShipped,
        whyMentor: m.whyMentor,
        weeklyAvailability: m.weeklyAvailability,
        status: m.status.toLowerCase(),
        appliedAt: m.appliedAt.toISOString(),
      }))}
      topTeams={teams.map((t) => ({
        id: t.id,
        slug: t.slug,
        name: t.name,
        productName: t.productName,
        totalPoints: t.totalPoints,
        currentWeek: t.currentWeek,
        memberCount: t.members.length,
        status: t.status.toLowerCase(),
      }))}
    />
  );
}
