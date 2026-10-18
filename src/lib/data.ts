import { prisma } from "@/lib/prisma";
import { parseTeamStatus, parseApplicantStatus } from "@/lib/validations";

function mapTeamMembers(members: { id: string; name: string; role: string; avatar: string | null; skills: string[]; bio: string }[]) {
  return members.map((m) => ({
    id: m.id,
    name: m.name,
    role: m.role.toLowerCase() as "hacker" | "hustler" | "hipster" | "hound",
    avatar: m.avatar || "",
    skills: m.skills,
    bio: m.bio,
  }));
}

function mapProgress(progress: { week: number; shipTarget: string; completed: boolean; score: number; feedback: string }[]) {
  return progress.map((p) => ({
    week: p.week,
    shipTarget: p.shipTarget,
    completed: p.completed,
    score: p.score,
    feedback: p.feedback,
  }));
}

export async function getTeams(status?: string) {
  const where = status
    ? { status: parseTeamStatus(status) ?? undefined }
    : undefined;

  const teams = await prisma.team.findMany({
    where,
    include: {
      members: true,
      progress: { orderBy: { week: "asc" } },
    },
    orderBy: { totalPoints: "desc" },
  });

  return teams.map((t) => ({
    id: t.id,
    slug: t.slug,
    name: t.name,
    productName: t.productName,
    description: t.description,
    niche: t.niche,
    currentWeek: t.currentWeek,
    totalPoints: t.totalPoints,
    status: t.status.toLowerCase() as "active" | "graduated" | "pending",
    avatarUrl: t.avatarUrl,
    members: mapTeamMembers(t.members),
    weeklyProgress: mapProgress(t.progress),
  }));
}

export async function getTeamBySlug(slug: string) {
  let t = await prisma.team.findUnique({
    where: { slug },
    include: {
      members: true,
      progress: { orderBy: { week: "asc" } },
    },
  });

  // Fallback: try finding by ID if slug lookup fails
  if (!t) {
    t = await prisma.team.findUnique({
      where: { id: slug },
      include: {
        members: true,
        progress: { orderBy: { week: "asc" } },
      },
    });
  }

  if (!t) return null;

  return {
    id: t.id,
    slug: t.slug,
    name: t.name,
    productName: t.productName,
    description: t.description,
    niche: t.niche,
    currentWeek: t.currentWeek,
    totalPoints: t.totalPoints,
    status: t.status.toLowerCase() as "active" | "graduated" | "pending",
    avatarUrl: t.avatarUrl,
    members: mapTeamMembers(t.members),
    weeklyProgress: mapProgress(t.progress),
  };
}

export async function getLeaderboard() {
  const teams = await prisma.team.findMany({
    include: {
      progress: { orderBy: { week: "asc" } },
    },
    orderBy: { totalPoints: "desc" },
  });

  return teams.map((t, index) => {
    const completedWeeks = t.progress.filter((p) => p.completed);
    const avgScore =
      completedWeeks.length > 0
        ? completedWeeks.reduce((sum, p) => sum + p.score, 0) /
          completedWeeks.length
        : 0;

    // Calculate streak: consecutive completed weeks from the end of ALL progress
    let streak = 0;
    for (let i = t.progress.length - 1; i >= 0; i--) {
      if (t.progress[i].completed) streak++;
      else break;
    }

    return {
      id: t.slug,
      rank: index + 1,
      name: t.name,
      productName: t.productName,
      niche: t.niche,
      currentWeek: t.currentWeek,
      totalPoints: t.totalPoints,
      maxPossiblePoints: t.currentWeek * 10,
      status: t.status.toLowerCase() as "active" | "graduated" | "pending",
      streak,
      avgScore: Math.round(avgScore * 10) / 10,
    };
  });
}


export async function getChallenges() {
  return prisma.challenge.findMany({
    orderBy: { week: "asc" },
  });
}

export async function getApplicants(status?: string) {
  const where = status
    ? { status: parseApplicantStatus(status) ?? undefined }
    : undefined;

  return prisma.applicant.findMany({
    where,
    orderBy: { appliedAt: "desc" },
  });
}
