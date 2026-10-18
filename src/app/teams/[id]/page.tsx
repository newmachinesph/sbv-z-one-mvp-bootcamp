import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getTeamBySlug } from "@/lib/data";
import { CheckCircle } from "lucide-react";
import type { Role } from "@/lib/types";

const roleCode: Record<Role, string> = {
  hacker: "Hk",
  hustler: "Hu",
  hipster: "Hp",
  hound: "Hd",
};

const roleLabel: Record<Role, string> = {
  hacker: "Hacker",
  hustler: "Hustler",
  hipster: "Hipster",
  hound: "Hound",
};

const roleDescription: Record<Role, string> = {
  hacker: "Builder + Code Owner",
  hustler: "Seller + Business Lead",
  hipster: "Brand + Growth Marketer",
  hound: "Researcher + Data Lead",
};

const nicheColors: Record<string, string> = {
  "Logistics / Retail Tech": "bg-blue-50 text-blue-700",
  "FinTech / Remittance": "bg-emerald-50 text-emerald-700",
  "FoodTech / Local Delivery": "bg-orange-50 text-orange-700",
  "EdTech / AI": "bg-purple-50 text-purple-700",
  "AgriTech / Fisheries": "bg-teal-50 text-teal-700",
  PropTech: "bg-indigo-50 text-indigo-700",
  TransportTech: "bg-yellow-50 text-yellow-700",
  "HR / Gig Economy": "bg-rose-50 text-rose-700",
  "Consumer Tech": "bg-cyan-50 text-cyan-700",
  HealthTech: "bg-red-50 text-red-700",
  "Creator Tools": "bg-violet-50 text-violet-700",
  CleanTech: "bg-lime-50 text-lime-700",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default async function TeamDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const team = await getTeamBySlug(id);

  if (!team) {
    notFound();
  }

  const completedWeeks = team.weeklyProgress.filter((w) => w.completed).length;
  const progressPercent = Math.round((completedWeeks / 12) * 100);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Dot grid background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #F59E0B 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative container mx-auto px-6">
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2 text-[13px]">
            <Link
              href="/teams"
              className="text-[#9CA3AF] transition-colors hover:text-[#F59E0B]"
            >
              Teams
            </Link>
            <span className="text-[#9CA3AF]">/</span>
            <span className="font-medium text-[#111827]">{team.name}</span>
          </div>

          {/* Section label */}
          <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#F59E0B] mb-4">
            Team Profile
          </p>

          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="space-y-4">
              {/* Team name + status */}
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-heading text-[clamp(32px,5vw,56px)] font-bold tracking-tight text-[#111827]">
                  {team.name}
                </h1>
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-[12px] font-semibold ${
                    team.status === "graduated"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-[#F3F4F6] text-[#6B7280]"
                  }`}
                >
                  {team.status === "graduated"
                    ? "Graduated"
                    : `Week ${team.currentWeek} of 12`}
                </span>
              </div>

              {/* Product name + niche */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-lg font-semibold text-[#111827]">
                  {team.productName}
                </span>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[12px] font-medium ${
                    nicheColors[team.niche] || "bg-gray-50 text-gray-700"
                  }`}
                >
                  {team.niche}
                </span>
              </div>

              {/* Description */}
              <p className="max-w-2xl text-[15px] leading-relaxed text-[#6B7280]">
                {team.description}
              </p>
            </div>

            {/* Stats row */}
            <div className="flex shrink-0 gap-3 md:gap-4">
              <div className="rounded-2xl border border-[#E5E7EB] bg-white px-5 py-4 text-center">
                <p className="font-heading text-2xl font-bold text-[#F59E0B] md:text-3xl">
                  {team.currentWeek}<span className="text-lg text-[#9CA3AF]">/12</span>
                </p>
                <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.2em] text-[#9CA3AF]">
                  Current Week
                </p>
              </div>
              <div className="rounded-2xl border border-[#E5E7EB] bg-white px-5 py-4 text-center">
                <p className="font-heading text-2xl font-bold text-[#F59E0B] md:text-3xl">
                  {completedWeeks}
                </p>
                <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.2em] text-[#9CA3AF]">
                  Ships Delivered
                </p>
              </div>
              <div className="rounded-2xl border border-[#E5E7EB] bg-white px-5 py-4 text-center">
                <p className="font-heading text-2xl font-bold text-[#F59E0B] md:text-3xl">
                  {progressPercent}%
                </p>
                <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.2em] text-[#9CA3AF]">
                  Completion
                </p>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-10 space-y-2">
            <div className="flex items-center justify-between text-[13px]">
              <span className="font-medium text-[#6B7280]">
                Overall Progress
              </span>
              <span className="font-heading font-bold text-[#111827]">
                {progressPercent}%
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-[#F3F4F6]">
              <div
                className="h-2 rounded-full bg-[#F59E0B] transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Left column -- Team Members */}
            <div className="lg:col-span-1">
              <p className="mb-6 text-[13px] font-medium uppercase tracking-[0.2em] text-[#F59E0B]">
                Team
              </p>
              <div className="space-y-4">
                {team.members.map((member) => (
                  <div
                    key={member.id}
                    className="group relative rounded-2xl border border-[#E5E7EB] bg-white p-5 transition-all duration-200 hover:shadow-md"
                  >
                    {/* Hover accent line */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-[3px] rounded-l-2xl bg-[#F59E0B] opacity-0 transition-opacity group-hover:opacity-100" />

                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      {member.avatar ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="h-11 w-11 shrink-0 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F59E0B] text-[13px] font-bold text-black">
                          {getInitials(member.name)}
                        </div>
                      )}

                      <div className="min-w-0 flex-1 space-y-2.5">
                        {/* Name + role badge */}
                        <div>
                          <p className="font-semibold text-[#111827]">
                            {member.name}
                          </p>
                          <div className="mt-1.5 flex items-center gap-2">
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#F59E0B] font-heading text-[12px] font-bold text-black">
                              {roleCode[member.role]}
                            </span>
                            <span className="text-[13px] font-medium text-[#6B7280]">
                              {roleLabel[member.role]} &mdash;{" "}
                              {roleDescription[member.role]}
                            </span>
                          </div>
                        </div>

                        {/* Bio */}
                        {member.bio && (
                          <p className="text-[13px] leading-relaxed text-[#9CA3AF]">
                            {member.bio}
                          </p>
                        )}

                        {/* Skills */}
                        {member.skills.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {member.skills.map((skill) => (
                              <span
                                key={skill}
                                className="rounded-full bg-[#F3F4F6] px-2.5 py-0.5 text-[11px] font-medium text-[#6B7280]"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column -- Weekly Progress */}
            <div className="lg:col-span-2">
              <p className="mb-6 text-[13px] font-medium uppercase tracking-[0.2em] text-[#F59E0B]">
                Progress
              </p>
              <div className="space-y-3">
                {team.weeklyProgress.map((week) => (
                  <div
                    key={week.week}
                    className={`group relative rounded-2xl border p-5 transition-all duration-200 ${
                      week.completed
                        ? "border-[#E5E7EB] bg-white hover:shadow-md"
                        : "border-dashed border-[#E5E7EB] bg-white"
                    }`}
                  >
                    {/* Hover accent line on completed weeks */}
                    {week.completed && (
                      <div className="pointer-events-none absolute inset-y-0 left-0 w-[3px] rounded-l-2xl bg-[#F59E0B] opacity-0 transition-opacity group-hover:opacity-100" />
                    )}

                    <div className="flex items-start gap-4">
                      {/* Week badge */}
                      <span
                        className={`inline-flex h-9 shrink-0 items-center rounded-lg px-3 font-heading text-[12px] font-bold ${
                          week.completed
                            ? "bg-[#F59E0B] text-black"
                            : "bg-[#F3F4F6] text-[#9CA3AF]"
                        }`}
                      >
                        W{week.week}
                      </span>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span
                            className={`font-medium ${
                              week.completed
                                ? "text-[#111827]"
                                : "text-[#9CA3AF]"
                            }`}
                          >
                            {week.shipTarget}
                          </span>
                          {week.completed && (
                            <CheckCircle className="h-5 w-5 shrink-0 text-[#F59E0B]" />
                          )}
                        </div>

                        {week.completed && week.feedback && (
                          <p className="mt-2 text-[13px] leading-relaxed text-[#9CA3AF]">
                            {week.feedback}
                          </p>
                        )}

                        {!week.completed && (
                          <p className="mt-1.5 text-[13px] italic text-[#9CA3AF]">
                            {week.week <= team.currentWeek
                              ? "In progress..."
                              : "Upcoming"}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Locked weeks */}
                {team.weeklyProgress.length < 12 && (
                  <div className="space-y-3">
                    {Array.from(
                      { length: 12 - team.weeklyProgress.length },
                      (_, i) => team.weeklyProgress.length + i + 1
                    ).map((weekNum) => (
                      <div
                        key={weekNum}
                        className="rounded-2xl border border-dashed border-[#E5E7EB] bg-white p-5 opacity-50"
                      >
                        <div className="flex items-center gap-4">
                          <span className="inline-flex h-9 shrink-0 items-center rounded-lg bg-[#F3F4F6] px-3 font-heading text-[12px] font-bold text-[#9CA3AF]">
                            W{weekNum}
                          </span>
                          <span className="text-[13px] text-[#9CA3AF]">
                            Locked
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="my-8 h-px w-full bg-[#E5E7EB]" />

              {/* Stat cards */}
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-2xl border border-[#E5E7EB] bg-white px-4 py-5 text-center">
                  <p className="font-heading text-2xl font-bold text-[#F59E0B]">
                    {completedWeeks}
                  </p>
                  <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.2em] text-[#9CA3AF]">
                    Weeks Completed
                  </p>
                </div>
                <div className="rounded-2xl border border-[#E5E7EB] bg-white px-4 py-5 text-center">
                  <p className="font-heading text-2xl font-bold text-[#F59E0B]">
                    {team.currentWeek}<span className="text-base text-[#9CA3AF]">/12</span>
                  </p>
                  <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.2em] text-[#9CA3AF]">
                    Current Week
                  </p>
                </div>
                <div className="rounded-2xl border border-[#E5E7EB] bg-white px-4 py-5 text-center">
                  <p className="font-heading text-2xl font-bold text-[#F59E0B]">
                    {progressPercent}%
                  </p>
                  <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.2em] text-[#9CA3AF]">
                    Completion
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-[#E5E7EB] bg-[#F9FAFB] py-24 md:py-32">
        <div className="container mx-auto flex flex-wrap items-center justify-center gap-8 px-6">
          <Link
            href="/teams"
            className="text-[14px] font-semibold text-[#111827] transition-colors hover:text-[#F59E0B]"
          >
            <span aria-hidden="true">&larr;</span> All Teams
          </Link>
          <Link
            href="/program"
            className="text-[14px] font-semibold text-[#111827] transition-colors hover:text-[#F59E0B]"
          >
            Program <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
