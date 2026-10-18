"use client";

import Link from "next/link";
import { useState } from "react";
import posthog from "posthog-js";
import {
  Users,
  ArrowRight,
  TrendingUp,
  Target,
} from "lucide-react";
import type { Team, Role } from "@/lib/types";

const roleEmoji: Record<Role, string> = {
  hacker: "\uD83D\uDD28",
  hustler: "\uD83D\uDCE3",
  hipster: "\uD83C\uDFA8",
  hound: "\uD83D\uDD0D",
};

const roleColors: Record<Role, string> = {
  hacker: "bg-[#F59E0B] text-white",
  hustler: "bg-[#111827] text-white",
  hipster: "bg-[#F59E0B] text-white",
  hound: "bg-[#111827] text-white",
};

const nicheColors: Record<string, { bg: string; text: string }> = {
  "Logistics / Retail Tech": { bg: "bg-blue-50", text: "text-blue-700" },
  "FinTech / Remittance": { bg: "bg-emerald-50", text: "text-emerald-700" },
  "FoodTech / Local Delivery": { bg: "bg-orange-50", text: "text-orange-700" },
  "EdTech / AI": { bg: "bg-violet-50", text: "text-violet-700" },
  "AgriTech / Fisheries": { bg: "bg-teal-50", text: "text-teal-700" },
  PropTech: { bg: "bg-indigo-50", text: "text-indigo-700" },
  TransportTech: { bg: "bg-sky-50", text: "text-sky-700" },
  "HR / Gig Economy": { bg: "bg-rose-50", text: "text-rose-700" },
  "Consumer Tech": { bg: "bg-amber-50", text: "text-amber-700" },
  HealthTech: { bg: "bg-red-50", text: "text-red-700" },
  "Creator Tools": { bg: "bg-pink-50", text: "text-pink-700" },
  CleanTech: { bg: "bg-lime-50", text: "text-lime-700" },
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const filters = [
  { key: "all", label: "All Teams" },
  { key: "active", label: "Active" },
  { key: "graduated", label: "Graduated" },
] as const;

function SkeletonBlock({ className = "" }: { className?: string }) {
  return <div className={`rounded-md bg-[#F3F4F6] ${className}`} />;
}

function SkeletonTeamCard({ index }: { index: number }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-8 md:p-9">
      <div className="relative flex flex-col gap-5">
        {/* Top row */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2.5 flex-1">
            <SkeletonBlock className="h-6 w-44" />
            <SkeletonBlock className="h-4 w-32" />
          </div>
          <SkeletonBlock className="h-7 w-20 rounded-full shrink-0" />
        </div>

        {/* Niche tag */}
        <SkeletonBlock className="h-6 w-36 rounded-full" />

        {/* Divider */}
        <div className="h-px w-full bg-[#E5E7EB]" />

        {/* Description */}
        <div className="space-y-2">
          <SkeletonBlock className="h-4 w-full" />
          <SkeletonBlock className="h-4 w-3/4" />
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {Array.from({ length: 4 }).map((_, j) => (
                <SkeletonBlock
                  key={j}
                  className="h-9 w-9 rounded-full border-2 border-white"
                />
              ))}
            </div>
            <SkeletonBlock className="h-7 w-16 rounded-full" />
          </div>
          <SkeletonBlock className="h-4 w-14" />
        </div>
      </div>
    </div>
  );
}

export function TeamsContent({ teams }: { teams: Team[] }) {
  const [filter, setFilter] = useState("all");

  const filteredTeams = teams.filter((team) => {
    if (filter === "all") return true;
    return team.status === filter;
  });

  const isEmpty = teams.length === 0;

  const stats = [
    { icon: Users, label: "Total Teams", value: teams.length },
    {
      icon: TrendingUp,
      label: "Active",
      value: teams.filter((t) => t.status === "active").length,
    },
    {
      icon: Target,
      label: "Graduated",
      value: teams.filter((t) => t.status === "graduated").length,
    },
    {
      icon: TrendingUp,
      label: "Avg Progress",
      value:
        teams.length > 0
          ? `${Math.round((teams.reduce((sum, t) => sum + t.currentWeek, 0) / teams.length / 12) * 100)}%`
          : "0%",
    },
  ];

  return (
    <>
      {/* ——— Filter pills + Grid ——— */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6">
          {/* Filter pills */}
          <div className="mb-12 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-[#F9FAFB] p-1.5">
              {filters.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => { setFilter(f.key); posthog.capture("teams_filter", { filter: f.key }); }}
                  className={`rounded-full px-5 py-2 text-[13px] font-semibold transition-all duration-300 ${
                    filter === f.key
                      ? "bg-[#111827] text-white shadow-sm"
                      : "text-[#6B7280] hover:text-[#111827]"
                  }`}
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Team cards grid — coming soon when empty */}
          {isEmpty ? (
            <div className="py-20 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#FEF3C7]">
                <Users className="h-7 w-7 text-[#D97706]" />
              </div>
              <h3
                className="font-heading text-[22px] font-bold text-[#111827] mb-3"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Coming Soon with Cohort 1
              </h3>
              <p className="text-[15px] text-[#6B7280] max-w-md mx-auto mb-8">
                Teams are being formed now. Once Cohort 1 kicks off, you&apos;ll see every team, their product, and their weekly progress here.
              </p>
              <Link
                href="/apply"
                className="btn-glow inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-[15px] font-semibold text-black"
              >
                Apply to Join a Team
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : filteredTeams.length === 0 ? (
            <div className="py-20 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#FEF3C7]">
                <Users className="h-7 w-7 text-[#D97706]" />
              </div>
              <p className="text-[17px] text-[#6B7280]">
                No teams found for this filter.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
              {filteredTeams.map((team, i) => {
                const niche = nicheColors[team.niche] || {
                  bg: "bg-gray-50",
                  text: "text-gray-700",
                };

                return (
                  <div
                    key={team.id}
                    className="group relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-8 md:p-9 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.06),0_0_0_2px_rgba(245,158,11,0.15),inset_0_0_0_1px_rgba(245,158,11,0.08)]"
                  >
                    {/* Hover accent line */}
                    <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Content */}
                    <div className="relative flex flex-col gap-5">
                      {/* Top row: team name + status */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1.5">
                          <h3
                            className="text-[20px] md:text-[22px] font-bold text-[#111827] leading-snug"
                            style={{ fontFamily: "var(--font-heading)" }}
                          >
                            {team.name}
                          </h3>
                          <p className="text-[15px] font-medium text-[#6B7280]">
                            {team.productName}
                          </p>
                        </div>
                        <span
                          className={`shrink-0 rounded-full px-3.5 py-1 text-[12px] font-bold uppercase tracking-[0.1em] ${
                            team.status === "graduated"
                              ? "bg-[#ECFDF5] text-[#059669]"
                              : team.status === "active"
                                ? "bg-[#FEF3C7] text-[#D97706]"
                                : "bg-[#F3F4F6] text-[#6B7280]"
                          }`}
                        >
                          {team.status === "graduated"
                            ? "Graduated"
                            : `Week ${team.currentWeek}`}
                        </span>
                      </div>

                      {/* Niche tag */}
                      <div>
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-[12px] font-medium ${niche.bg} ${niche.text}`}
                        >
                          {team.niche}
                        </span>
                      </div>

                      {/* Divider */}
                      <div className="h-px w-full bg-[#E5E7EB]" />

                      {/* Description */}
                      <p className="text-[14px] text-[#6B7280] leading-relaxed line-clamp-2">
                        {team.description}
                      </p>

                      {/* Bottom row: members + points + CTA */}
                      <div className="flex items-center justify-between gap-4">
                        {/* Member avatars */}
                        <div className="flex items-center gap-3">
                          <div className="flex -space-x-2">
                            {team.members.map((member) =>
                              member.avatar ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  key={member.id}
                                  src={member.avatar}
                                  alt={member.name}
                                  title={`${member.name} (${roleEmoji[member.role]} ${member.role})`}
                                  className="h-9 w-9 rounded-full border-2 border-white bg-[#F3F4F6] object-cover"
                                />
                              ) : (
                                <div
                                  key={member.id}
                                  title={`${member.name} (${roleEmoji[member.role]} ${member.role})`}
                                  className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-[11px] font-bold ${roleColors[member.role]}`}
                                >
                                  {getInitials(member.name)}
                                </div>
                              ),
                            )}
                          </div>

                          {/* Progress badge */}
                          <div className="flex items-center gap-1.5 rounded-full bg-[#FEF3C7] px-3 py-1">
                            <span className="text-[12px] font-bold text-[#D97706]">
                              Week {team.currentWeek}/12
                            </span>
                          </div>
                        </div>

                        {/* View team link */}
                        <Link
                          href={`/teams/${team.slug}`}
                          onClick={() => posthog.capture("team_view", { team: team.name, slug: team.slug })}
                          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#111827] transition-colors duration-300 hover:text-[#F59E0B] group/link"
                        >
                          View
                          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ——— Summary Stats ——— */}
      <section className="bg-[#F9FAFB] py-16 md:py-20">
        <div className="container mx-auto px-6">
          {/* Section label */}
          <div className="text-center mb-10">
            <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#F59E0B] mb-3">
              Overview
            </p>
            <h2
              className="font-heading text-[clamp(24px,3vw,36px)] font-bold tracking-tight text-[#111827]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Cohort at a <span className="gradient-text-orange">Glance</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 max-w-4xl mx-auto">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-6 text-center transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.04),0_0_0_2px_rgba(245,158,11,0.12)]"
              >
                {/* Icon */}
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[#FEF3C7] transition-colors duration-300 group-hover:bg-[#F59E0B]">
                  <stat.icon className="h-5 w-5 text-[#D97706] transition-colors duration-300 group-hover:text-white" />
                </div>

                {/* Value */}
                {isEmpty ? (
                  <SkeletonBlock className="mx-auto h-8 w-12 mb-2" />
                ) : (
                  <p
                    className="text-[28px] md:text-[32px] font-bold text-[#111827] leading-none mb-1"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {stat.value}
                  </p>
                )}

                {/* Label */}
                <p className="text-[12px] font-medium text-[#9CA3AF] uppercase tracking-[0.1em]">
                  {stat.label}
                </p>

                {/* Hover accent line */}
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
