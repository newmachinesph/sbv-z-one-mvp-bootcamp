"use client";

import { useState } from "react";
import Link from "next/link";
import posthog from "posthog-js";
import {
  ChevronDown,
  Target,
  Rocket,
  TrendingUp,
  Trophy,
  CheckCircle2,
  Clock,
  ArrowRight,
} from "lucide-react";
import {
  phases as phaseData,
  weeks,
  weeklyPrinciples,
  getTotalHours,
} from "./program-data";

const phaseIcons = [Target, Rocket, TrendingUp, Trophy];

export function ProgramContent() {
  const [expandedWeeks, setExpandedWeeks] = useState<Set<number>>(
    new Set([1])
  );

  function toggleWeek(week: number) {
    setExpandedWeeks((prev) => {
      const next = new Set(prev);
      if (next.has(week)) {
        next.delete(week);
      } else {
        next.add(week);
        posthog.capture("program_week_expanded", { week });
      }
      return next;
    });
  }

  function expandAll() {
    setExpandedWeeks(new Set(weeks.map((w) => w.week)));
  }

  function collapseAll() {
    setExpandedWeeks(new Set());
  }

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-5xl">
          {/* Section header + controls */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#F59E0B] mb-2">
                Week by Week
              </p>
              <h2
                className="font-heading text-[clamp(24px,3vw,36px)] font-bold tracking-tight text-[#111827]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Your 12-Week Journey
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={expandAll}
                className="text-[13px] font-semibold text-[#6B7280] hover:text-[#F59E0B] transition-colors duration-300"
              >
                Expand All
              </button>
              <span className="w-px h-4 bg-[#E5E7EB]" />
              <button
                type="button"
                onClick={collapseAll}
                className="text-[13px] font-semibold text-[#6B7280] hover:text-[#F59E0B] transition-colors duration-300"
              >
                Collapse All
              </button>
            </div>
          </div>

          {/* Principles legend */}
          <div className="mb-10 rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-5">
            <p
              className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#D97706] mb-3"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              12 Weekly Principles
            </p>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {weeklyPrinciples.map((p) => (
                <div key={p.week} className="flex items-start gap-2">
                  <span className="shrink-0 text-[12px] font-bold text-[#F59E0B] font-mono w-6">
                    {String(p.week).padStart(2, "0")}
                  </span>
                  <span className="text-[13px] text-[#6B7280]">
                    <strong className="text-[#111827]">{p.name}</strong>{" "}
                    &mdash; {p.short}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Phases */}
          {phaseData.map((phase, phaseIdx) => {
            const PhaseIcon = phaseIcons[phaseIdx];
            const phaseWeeks = weeks.filter((w) =>
              phase.weeks.includes(w.week)
            );

            return (
              <div key={phase.name} className="mb-12 last:mb-0">
                {/* Phase header */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#FEF3C7]">
                    <PhaseIcon className="h-5 w-5 text-[#D97706]" />
                  </span>
                  <div>
                    <h3
                      className="text-[18px] font-bold text-[#111827]"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      Phase {phase.phase}: {phase.name}
                    </h3>
                    <p className="text-[13px] text-[#9CA3AF]">
                      {phase.subtitle}
                    </p>
                  </div>
                </div>

                {/* Week cards */}
                <div className="space-y-3">
                  {phaseWeeks.map((week) => {
                    const isExpanded = expandedWeeks.has(week.week);
                    const totalHrs = getTotalHours(week);

                    return (
                      <div
                        key={week.week}
                        className="group relative rounded-2xl border border-[#E5E7EB] bg-white transition-all duration-500 hover:shadow-[0_12px_40px_rgba(0,0,0,0.04),0_0_0_2px_rgba(245,158,11,0.12)]"
                      >
                        {/* Header */}
                        <button
                          type="button"
                          onClick={() => toggleWeek(week.week)}
                          className="flex w-full items-center gap-4 px-6 py-5 text-left"
                        >
                          {/* Week badge */}
                          <span
                            className="font-heading shrink-0 flex items-center justify-center w-10 h-10 rounded-xl text-[13px] font-bold transition-colors duration-300"
                            style={{
                              backgroundColor: isExpanded
                                ? "#F59E0B"
                                : "#FEF3C7",
                              color: isExpanded ? "#fff" : "#D97706",
                            }}
                          >
                            {String(week.week).padStart(2, "0")}
                          </span>

                          <div className="shrink-0 w-px h-6 bg-[#E5E7EB]" />

                          {/* Title + theme */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-heading text-[15px] md:text-[16px] font-semibold text-[#111827]">
                                {week.title}
                              </span>
                            </div>
                            <p className="mt-0.5 text-[13px] text-[#9CA3AF] truncate">
                              {week.principle.name}
                            </p>
                          </div>

                          {/* Hours badge (desktop) */}
                          <span className="hidden md:inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold bg-[#FEF3C7] text-[#D97706] shrink-0">
                            <Clock className="h-3 w-3" />
                            ~{totalHrs} hrs/week
                          </span>

                          {/* Chevron */}
                          <ChevronDown
                            className={`shrink-0 h-5 w-5 text-[#9CA3AF] transition-transform duration-300 ${
                              isExpanded ? "rotate-180 text-[#F59E0B]" : ""
                            }`}
                          />
                        </button>

                        {/* Expanded content */}
                        <div
                          className="overflow-hidden transition-all duration-300"
                          style={{
                            maxHeight: isExpanded ? "2000px" : "0px",
                            opacity: isExpanded ? 1 : 0,
                          }}
                        >
                          <div className="px-6 pb-6">
                            <div className="h-px w-full bg-[#E5E7EB] mb-6" />

                            {/* Ship target */}
                            <div className="rounded-xl border border-[#FDE68A] bg-[#FFFBEB] p-4 mb-4">
                              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#D97706] mb-1">
                                Ship Target
                              </p>
                              <p className="text-[14px] text-[#111827] leading-relaxed">
                                {week.shipTarget}
                              </p>
                            </div>

                            {/* Milestone badge */}
                            <div className="mb-4">
                              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold bg-[#FEF3C7] text-[#D97706]">
                                <CheckCircle2 className="h-3 w-3" />
                                {week.milestone}
                              </span>
                            </div>

                            {/* Role hours summary */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                              {week.roles.map((r) => (
                                <div
                                  key={r.code}
                                  className="rounded-lg border border-[#E5E7EB] px-3 py-2 text-center"
                                >
                                  <p className="text-[11px] font-bold text-[#D97706] font-mono">
                                    {r.code}
                                  </p>
                                  <p className="text-[14px] font-semibold text-[#111827]">
                                    ~{r.estimatedHours}h
                                  </p>
                                  <p className="text-[11px] text-[#9CA3AF]">
                                    {r.role}
                                  </p>
                                </div>
                              ))}
                            </div>

                            {/* View details link */}
                            <Link
                              href={`/program/${week.slug}`}
                              className="inline-flex items-center gap-2 rounded-full border border-[#F59E0B] px-5 py-2.5 text-[13px] font-semibold text-[#D97706] transition-all hover:bg-[#F59E0B] hover:text-white"
                            >
                              View Full Week Details
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </div>
                        </div>

                        {/* Ghost index */}
                        <span
                          className="absolute top-4 right-6 font-heading text-[56px] md:text-[72px] font-extrabold leading-none select-none pointer-events-none"
                          style={{ color: "#F59E0B", opacity: 0.06 }}
                        >
                          {String(week.week).padStart(2, "0")}
                        </span>

                        {/* Hover accent line */}
                        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
