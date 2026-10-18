"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { weekHighlights } from "./home-data";
import { FadeInView } from "./fade-in-view";

/*
  12-Week Journey — responsive grid layout.
  Works on both mobile and desktop without scroll-hijacking.
*/

export default function JourneySection() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <FadeInView>
            <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#F59E0B] mb-4">
              The Journey
            </p>
          </FadeInView>
          <FadeInView delay={0.1}>
            <h2
              className="font-heading text-[clamp(32px,4vw,56px)] font-bold tracking-tight text-[#111827] mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              12 Weeks. 12 Ship Targets.{" "}
              <span className="gradient-text-orange">1 Live Product.</span>
            </h2>
          </FadeInView>
          <FadeInView delay={0.2}>
            <p className="text-[clamp(16px,1.5vw,18px)] text-[#6B7280] leading-relaxed max-w-2xl mx-auto">
              Every week has a clear deliverable, a scored challenge, and mentor
              feedback. Monthly Grit Chronicles webinars keep the momentum alive.
            </p>
          </FadeInView>
        </div>

        {/* Cards grid */}
        <div className="mx-auto max-w-5xl grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {weekHighlights.map((w, i) => {
            const isAccent = i === weekHighlights.length - 1;
            const isLaunch = w.label === "Launch";

            return (
              <FadeInView key={w.week} delay={i * 0.06}>
                <div
                  className={`group relative overflow-hidden rounded-2xl border p-7 h-full transition-all duration-500 hover:-translate-y-0.5 ${
                    isAccent
                      ? "bg-black border-black text-white sm:col-span-2 lg:col-span-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15),0_0_0_2px_rgba(245,158,11,0.25)]"
                      : isLaunch
                        ? "bg-[#FFFBEB] border-[#FDE68A] hover:shadow-[0_20px_60px_rgba(0,0,0,0.06),0_0_0_2px_rgba(245,158,11,0.15)]"
                        : "bg-white border-[#E5E7EB] hover:shadow-[0_20px_60px_rgba(0,0,0,0.06),0_0_0_2px_rgba(245,158,11,0.15)]"
                  }`}
                >
                  {/* Ghost week number */}
                  <span
                    className={`absolute top-3 right-5 font-heading font-extrabold leading-none select-none ${
                      isAccent
                        ? "text-[64px] text-white/[0.06]"
                        : "text-[56px] text-[#F59E0B]/[0.06]"
                    }`}
                  >
                    {w.week}
                  </span>

                  {/* Content */}
                  <div className="relative flex flex-col gap-3">
                    <div>
                      <span
                        className="block text-[11px] font-bold uppercase tracking-[0.15em] text-[#F59E0B] mb-2"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        Week {w.week}
                      </span>
                      <h3
                        className={`text-[19px] font-bold leading-snug mb-1 ${
                          isAccent ? "text-white" : "text-[#111827]"
                        }`}
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {w.label}
                      </h3>
                    </div>
                    <p
                      className={`text-[15px] leading-relaxed ${
                        isAccent ? "text-white/60" : "text-[#6B7280]"
                      }`}
                    >
                      {w.desc}
                    </p>
                  </div>

                  {/* Hover accent line */}
                  <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </FadeInView>
            );
          })}
        </div>

        {/* CTA */}
        <FadeInView delay={0.5}>
          <div className="mt-12 text-center">
            <Link
              href="/program"
              className="group inline-flex items-center gap-2 text-[15px] font-semibold text-[#111827] transition-colors duration-300 hover:text-[#F59E0B]"
            >
              Full Breakdown
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
