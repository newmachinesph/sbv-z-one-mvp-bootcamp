import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { DashboardContent } from "./dashboard-content";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { weeks } from "@/app/program/program-data";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session || session.user.role !== "member") {
    redirect("/admin");
  }

  const member = await prisma.teamMember.findUnique({
    where: { email: session.user.email ?? "" },
    include: {
      team: {
        include: {
          members: true,
          progress: { orderBy: { week: "asc" } },
        },
      },
    },
  });

  if (!member) redirect("/");

  const challenge = await prisma.challenge.findUnique({
    where: { week: member.team.currentWeek },
  });

  const weekData = weeks.find((w) => w.week === member.team.currentWeek);

  const data = {
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
      currentWeek: member.team.currentWeek,
      totalPoints: member.team.totalPoints,
      status: member.team.status.toLowerCase(),
      members: member.team.members.map((m) => ({
        id: m.id,
        name: m.name,
        role: m.role.toLowerCase(),
        skills: m.skills,
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
    challenge: challenge
      ? {
          name: challenge.name,
          description: challenge.description,
        }
      : null,
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <DashboardContent data={data} />
      <Footer />
    </div>
  );
}
