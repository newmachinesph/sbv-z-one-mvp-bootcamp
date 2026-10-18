"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Calendar,
  Target,
  Rocket,
  Users,
  CheckCircle,
  Circle,
  Clock,
  ExternalLink,
  Video,
  Swords,
  TrendingUp,
  Flame,
  ArrowRight,
  BookOpen,
} from "lucide-react";

type Role = "hacker" | "hustler" | "hipster" | "hound";

const roleEmoji: Record<Role, string> = {
  hacker: "\uD83D\uDD28",
  hustler: "\uD83D\uDCE3",
  hipster: "\uD83C\uDFA8",
  hound: "\uD83D\uDD0D",
};

const roleBgColors: Record<Role, string> = {
  hacker: "bg-blue-500",
  hustler: "bg-orange-500",
  hipster: "bg-pink-500",
  hound: "bg-emerald-500",
};

const roleBadgeColors: Record<Role, string> = {
  hacker: "bg-blue-100 text-blue-800",
  hustler: "bg-orange-100 text-orange-800",
  hipster: "bg-pink-100 text-pink-800",
  hound: "bg-emerald-100 text-emerald-800",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

interface DashboardData {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    skills: string[];
  };
  team: {
    id: string;
    slug: string;
    name: string;
    productName: string;
    currentWeek: number;
    totalPoints: number;
    status: string;
    members: { id: string; name: string; role: string; skills: string[]; avatar?: string | null }[];
    weeklyProgress: {
      week: number;
      shipTarget: string;
      completed: boolean;
      score: number;
      feedback: string;
    }[];
  };
  weekInfo: {
    title: string;
    shipTarget: string;
    webinar: string;
    challenge: string;
  } | null;
  challenge: {
    name: string;
    description: string;
  } | null;
}

export function DashboardContent({ data }: { data: DashboardData }) {
  const { user, team, weekInfo, challenge } = data;
  const userRole = user.role as Role;

  const completedWeeks = team.weeklyProgress.filter((w) => w.completed).length;
  const progressPercent = Math.round((completedWeeks / 12) * 100);
  const currentWeekData = team.weeklyProgress.find(
    (w) => w.week === team.currentWeek
  );
  const streak = completedWeeks;

  return (
    <>
      {/* Dashboard Header */}
      <section className="border-b bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Welcome back,</p>
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                {user.name}{" "}
                <span className="text-muted-foreground font-normal">
                  {roleEmoji[userRole]}
                </span>
              </h1>
              <p className="mt-1 text-muted-foreground">
                {team.name} / {team.productName}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/teams/${team.slug}`}>
                  <Users className="mr-2 h-4 w-4" />
                  Team Page
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="https://mentor.sbv.one">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Mentor
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Overview Cards */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Current Week</p>
                    <p className="text-2xl font-bold">
                      {team.currentWeek}
                      <span className="text-base font-normal text-muted-foreground">/12</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-100">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Progress</p>
                    <p className="text-2xl font-bold">
                      {progressPercent}
                      <span className="text-base font-normal text-muted-foreground">%</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-yellow-100">
                    <Target className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ships Delivered</p>
                    <p className="text-2xl font-bold">
                      {completedWeeks}
                      <span className="text-base font-normal text-muted-foreground">/12</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-100">
                    <Flame className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ship Streak</p>
                    <p className="text-2xl font-bold">
                      {streak}
                      <span className="text-base font-normal text-muted-foreground"> weeks</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Column */}
            <div className="space-y-8 lg:col-span-2">
              {/* Current Ship Target */}
              <Card className="border-primary/30 bg-primary/5">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">This Week&apos;s Ship Target</CardTitle>
                  </div>
                  <CardDescription>
                    Week {team.currentWeek} — Due this Friday
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border bg-background p-4">
                    <h3 className="mb-2 text-lg font-semibold">
                      {currentWeekData?.shipTarget || weekInfo?.title || "Loading..."}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {weekInfo?.shipTarget || ""}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Due: Friday</span>
                    </div>
                    <Badge variant="outline">In Progress</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Weekly Progress Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Weekly Progress</CardTitle>
                  <CardDescription>
                    Your team&apos;s journey through the 12-week Forge
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {team.weeklyProgress.map((week) => (
                      <div
                        key={week.week}
                        className={`flex items-center gap-3 rounded-lg p-3 ${
                          week.week === team.currentWeek
                            ? "bg-primary/5 ring-1 ring-primary/20"
                            : ""
                        }`}
                      >
                        {week.completed ? (
                          <CheckCircle className="h-5 w-5 shrink-0 text-green-600" />
                        ) : week.week === team.currentWeek ? (
                          <div className="relative flex h-5 w-5 shrink-0 items-center justify-center">
                            <Circle className="h-5 w-5 text-primary" />
                            <div className="absolute h-2 w-2 rounded-full bg-primary animate-pulse" />
                          </div>
                        ) : (
                          <Circle className="h-5 w-5 shrink-0 text-muted-foreground/30" />
                        )}

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-muted-foreground">
                              Wk {week.week}
                            </span>
                            <span
                              className={`text-sm font-medium ${
                                week.week === team.currentWeek ? "text-primary" : ""
                              }`}
                            >
                              {week.shipTarget}
                            </span>
                          </div>
                        </div>

                        {week.completed && (
                          <CheckCircle className="h-4 w-4 shrink-0 text-green-600" />
                        )}
                        {week.week === team.currentWeek && !week.completed && (
                          <Badge variant="outline" className="text-xs">
                            Current
                          </Badge>
                        )}
                      </div>
                    ))}

                    {Array.from(
                      { length: 12 - team.weeklyProgress.length },
                      (_, i) => team.weeklyProgress.length + i + 1
                    ).map((weekNum) => (
                      <div
                        key={weekNum}
                        className="flex items-center gap-3 rounded-lg p-3 opacity-40"
                      >
                        <Circle className="h-5 w-5 shrink-0 text-muted-foreground/30" />
                        <span className="text-xs font-medium text-muted-foreground">
                          Wk {weekNum}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          Locked
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Overall Completion</span>
                      <span className="font-medium">{progressPercent}%</span>
                    </div>
                    <Progress value={progressPercent} className="h-2.5" />
                  </div>
                </CardContent>
              </Card>

              {/* This Week's Challenge */}
              {challenge && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Swords className="h-5 w-5 text-rose-500" />
                      <CardTitle className="text-lg">Weekly Challenge</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-lg border p-4">
                      <h3 className="mb-2 font-semibold">{challenge.name}</h3>
                      <p className="mb-3 text-sm text-muted-foreground">
                        {challenge.description}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        Deadline: This Friday
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Webinar */}
              {weekInfo && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Video className="h-5 w-5 text-blue-500" />
                      <CardTitle className="text-lg">Upcoming Webinar</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-lg border p-4">
                      <h3 className="mb-2 font-semibold">{weekInfo.webinar}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          Wednesday
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          7:00 PM PHT
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Team Members */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    <CardTitle className="text-lg">Your Team</CardTitle>
                  </div>
                  <CardDescription>{team.name}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {team.members.map((member) => {
                    const mRole = member.role as Role;
                    return (
                      <div
                        key={member.id}
                        className={`flex items-center gap-3 rounded-lg p-2 ${
                          member.id === user.id
                            ? "bg-primary/5 ring-1 ring-primary/20"
                            : ""
                        }`}
                      >
                        {member.avatar ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="h-9 w-9 shrink-0 rounded-full bg-muted"
                          />
                        ) : (
                          <div
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${roleBgColors[mRole]}`}
                          >
                            {getInitials(member.name)}
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">
                            {member.name}
                            {member.id === user.id && (
                              <span className="ml-1 text-xs text-muted-foreground">
                                (You)
                              </span>
                            )}
                          </p>
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-xs font-medium ${roleBadgeColors[mRole]}`}
                          >
                            {roleEmoji[mRole]}{" "}
                            {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href={`/teams/${team.slug}`}>
                      View Full Team Page
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Quick Links */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                    <Link href="/program">
                      <BookOpen className="mr-2 h-4 w-4" />
                      View Full Program
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                    <Link href="/teams">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      View All Teams
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                    <Link href="/teams">
                      <Users className="mr-2 h-4 w-4" />
                      Browse Teams
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                    <Link href="https://pitch.sbv.one">
                      <Rocket className="mr-2 h-4 w-4" />
                      The Pitch
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
