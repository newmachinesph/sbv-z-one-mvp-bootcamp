"use client";

import { useState } from "react";
import {
  Code,
  Briefcase,
  Palette,
  Search,
  Clock,
  CheckCircle2,
  Circle,
} from "lucide-react";
import type { WeekData } from "../program-data";

const roleIcons: Record<string, typeof Code> = {
  Hk: Code,
  Hu: Briefcase,
  Hp: Palette,
  Hd: Search,
};

const roleColors: Record<string, { bg: string; border: string; text: string }> = {
  Hk: { bg: "#EFF6FF", border: "#BFDBFE", text: "#2563EB" },
  Hu: { bg: "#FEF3C7", border: "#FDE68A", text: "#D97706" },
  Hp: { bg: "#FCE7F3", border: "#FBCFE8", text: "#DB2777" },
  Hd: { bg: "#ECFDF5", border: "#A7F3D0", text: "#059669" },
};

export function WeekContent({ week }: { week: WeekData }) {
  const [checked, setChecked] = useState<Record<string, Set<number>>>(() => {
    const initial: Record<string, Set<number>> = {};
    week.roles.forEach((r) => {
      initial[r.code] = new Set();
    });
    return initial;
  });

  function toggleTask(roleCode: string, taskIdx: number) {
    setChecked((prev) => {
      const next = { ...prev };
      const set = new Set(prev[roleCode]);
      if (set.has(taskIdx)) set.delete(taskIdx);
      else set.add(taskIdx);
      next[roleCode] = set;
      return next;
    });
  }

  function getProgress(roleCode: string, total: number) {
    const done = checked[roleCode]?.size || 0;
    return Math.round((done / total) * 100);
  }

  return (
    <section className="bg-[#F9FAFB] py-12 md:py-16">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#F59E0B] mb-2">
              Role Checklists
            </p>
            <h2
              className="font-heading text-[clamp(20px,3vw,30px)] font-bold tracking-tight text-[#111827]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              What Each Role Delivers This Week
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {week.roles.map((role) => {
              const Icon = roleIcons[role.code] || Code;
              const colors = roleColors[role.code] || roleColors.Hk;
              const progress = getProgress(role.code, role.tasks.length);
              const doneCount = checked[role.code]?.size || 0;

              return (
                <div
                  key={role.code}
                  className="rounded-2xl border bg-white overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
                  style={{ borderColor: colors.border }}
                >
                  {/* Role header */}
                  <div
                    className="px-5 py-4 flex items-center justify-between"
                    style={{ backgroundColor: colors.bg }}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="flex items-center justify-center w-9 h-9 rounded-xl"
                        style={{ backgroundColor: "white" }}
                      >
                        <Icon
                          className="h-4.5 w-4.5"
                          style={{ color: colors.text }}
                        />
                      </span>
                      <div>
                        <h3
                          className="text-[15px] font-bold text-[#111827]"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          {role.role}
                        </h3>
                        <span className="text-[11px] font-mono text-[#9CA3AF]">
                          {role.code}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold"
                        style={{
                          backgroundColor: "white",
                          color: colors.text,
                        }}
                      >
                        <Clock className="h-3 w-3" />
                        ~{role.estimatedHours}h
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="px-5 pt-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] text-[#9CA3AF]">
                        {doneCount}/{role.tasks.length} tasks
                      </span>
                      <span className="text-[11px] font-semibold" style={{ color: colors.text }}>
                        {progress}%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[#F3F4F6] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${progress}%`,
                          backgroundColor: colors.text,
                        }}
                      />
                    </div>
                  </div>

                  {/* Tasks */}
                  <div className="px-5 py-4">
                    <ul className="space-y-2.5">
                      {role.tasks.map((task, idx) => {
                        const isDone = checked[role.code]?.has(idx);
                        return (
                          <li key={idx}>
                            <button
                              type="button"
                              onClick={() => toggleTask(role.code, idx)}
                              className="flex items-start gap-3 w-full text-left group"
                            >
                              {isDone ? (
                                <CheckCircle2
                                  className="h-5 w-5 shrink-0 mt-0.5 transition-colors"
                                  style={{ color: colors.text }}
                                />
                              ) : (
                                <Circle className="h-5 w-5 shrink-0 mt-0.5 text-[#D1D5DB] group-hover:text-[#9CA3AF] transition-colors" />
                              )}
                              <span
                                className={`text-[14px] leading-relaxed transition-colors ${
                                  isDone
                                    ? "text-[#9CA3AF] line-through"
                                    : "text-[#374151]"
                                }`}
                              >
                                {task.task}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
