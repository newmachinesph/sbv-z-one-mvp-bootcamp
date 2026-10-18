"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeInView } from "./fade-in-view";
import { inSpaceFormats, inSpaceMoments } from "./home-data";

/*
  InSpace — Community events: 3 format cards + 5-node horizontal timeline.
*/

export default function InSpaceSection() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <FadeInView>
            <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#F59E0B] mb-4">
              InSpace
            </p>
          </FadeInView>
          <FadeInView delay={0.1}>
            <h2
              className="font-heading text-[clamp(32px,4vw,56px)] font-bold tracking-tight text-[#111827] mb-5"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Where the Community{" "}
              <span className="gradient-text-orange">Comes Alive.</span>
            </h2>
          </FadeInView>
          <FadeInView delay={0.2}>
            <p className="text-[clamp(16px,1.5vw,20px)] text-[#6B7280] leading-relaxed max-w-2xl mx-auto">
              Founder firesides, live pitch nights, and streamed challenges that
              turn a remote build sprint into a shared experience.
            </p>
          </FadeInView>
        </div>

        {/* Format cards */}
        <div className="mx-auto max-w-5xl grid gap-4 md:grid-cols-3 mb-16">
          {inSpaceFormats.map((format, i) => (
            <FadeInView key={format.name} delay={i * 0.1}>
              <motion.div
                className="group relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-6 md:p-7 transition-all duration-500 hover:-translate-y-0.5 h-full"
                whileHover={
                  shouldReduce
                    ? undefined
                    : {
                        boxShadow:
                          "0 20px 60px rgba(0,0,0,0.06), 0 0 0 2px rgba(245,158,11,0.15), inset 0 0 0 1px rgba(245,158,11,0.08)",
                      }
                }
              >
                {/* Content */}
                <div className="relative flex flex-col gap-3 h-full">
                  <div className="flex items-center gap-3">
                    <h3
                      className="text-[17px] md:text-[19px] font-bold text-[#111827]"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {format.name}
                    </h3>
                    {format.frequency && (
                      <span className="inline-flex items-center rounded-full bg-[#FEF3C7] px-2.5 py-0.5 text-[11px] font-semibold text-[#D97706]">
                        {format.frequency}
                      </span>
                    )}
                  </div>
                  <p className="text-[14px] md:text-[15px] leading-relaxed text-[#6B7280]">
                    {format.description}
                  </p>
                </div>

                {/* Hover accent line */}
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            </FadeInView>
          ))}
        </div>

        {/* Key Moments Timeline */}
        <div className="mx-auto max-w-4xl">
          <FadeInView>
            <h3
              className="text-center text-[15px] font-bold uppercase tracking-[0.12em] text-[#111827] mb-10"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Key Moments Across 12 Weeks
            </h3>
          </FadeInView>

          {/* Timeline nodes */}
          <div className="relative">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-5 left-[10%] right-[10%] h-px bg-[#E5E7EB]" />

            <div className="grid grid-cols-2 gap-6 md:grid-cols-5 md:gap-4">
              {inSpaceMoments.map((moment, i) => (
                <FadeInView
                  key={moment.week}
                  delay={0.3 + i * 0.1}
                >
                  <div className="flex flex-col items-center text-center">
                    {/* Node dot */}
                    <div className="relative mb-3 flex items-center justify-center">
                      <div className="h-10 w-10 rounded-full border-2 border-[#F59E0B] bg-white flex items-center justify-center">
                        <span
                          className="text-[12px] font-bold text-[#D97706]"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          W{moment.week}
                        </span>
                      </div>
                    </div>
                    {/* Label */}
                    <p className="text-[13px] leading-snug text-[#6B7280] max-w-[140px]">
                      {moment.label}
                    </p>
                  </div>
                </FadeInView>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
