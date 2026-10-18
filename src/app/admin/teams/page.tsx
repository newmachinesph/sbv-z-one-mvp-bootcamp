import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { TeamsManagementContent } from "./teams-management-content";

export default async function AdminTeamsPage() {
  await requireAdmin();

  const teams = await prisma.team.findMany({
    include: {
      members: true,
      progress: { orderBy: { week: "asc" } },
    },
    orderBy: { totalPoints: "desc" },
  });

  return (
    <TeamsManagementContent
      teams={teams.map((t) => ({
        id: t.id,
        slug: t.slug,
        name: t.name,
        productName: t.productName,
        description: t.description,
        niche: t.niche,
        currentWeek: t.currentWeek,
        totalPoints: t.totalPoints,
        status: t.status.toLowerCase(),
        members: t.members.map((m) => ({
          id: m.id,
          name: m.name,
          email: m.email,
          role: m.role.toLowerCase(),
          skills: m.skills,
          bio: m.bio,
          avatar: m.avatar,
        })),
        progress: t.progress.map((p) => ({
          id: p.id,
          week: p.week,
          shipTarget: p.shipTarget,
          completed: p.completed,
          score: p.score,
          feedback: p.feedback,
        })),
      }))}
    />
  );
}
