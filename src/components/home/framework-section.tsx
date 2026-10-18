"use client";

import { motion, useReducedMotion } from "framer-motion";
import { roles } from "./home-data";
import { FadeInView } from "./fade-in-view";

const roleColors: Record<string, { accent: string; bg: string; border: string }> = {
  HACKER: {
    accent: "#F59E0B",
    bg: "rgba(245, 158, 11, 0.06)",
    border: "rgba(245, 158, 11, 0.15)",
  },
  HUSTLER: {
    accent: "#111827",
    bg: "rgba(17, 24, 39, 0.04)",
    border: "rgba(17, 24, 39, 0.10)",
  },
  HIPSTER: {
    accent: "#F59E0B",
    bg: "rgba(245, 158, 11, 0.06)",
    border: "rgba(245, 158, 11, 0.15)",
  },
  HOUND: {
    accent: "#111827",
    bg: "rgba(17, 24, 39, 0.04)",
    border: "rgba(17, 24, 39, 0.10)",
  },
};

export default function FrameworkSection() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <FadeInView>
            <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#F59E0B] mb-4">
              The 4H Framework
            </p>
          </FadeInView>
          <FadeInView delay={0.1}>
            <h2
              className="font-heading text-[clamp(32px,4vw,56px)] font-bold tracking-tight text-[#111827] mb-5"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Four people. Four roles.
              <br />
              <span className="gradient-text-orange">One product that ships.</span>
            </h2>
          </FadeInView>
          <FadeInView delay={0.2}>
            <p className="text-[clamp(16px,1.5vw,20px)] text-[#6B7280] leading-relaxed">
              Four strengths. One product that actually ships.
            </p>
          </FadeInView>
        </div>

        {/* Role cards — 2x2 grid on desktop, stacked on mobile */}
        <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
          {roles.map((role, i) => {
            const colors = roleColors[role.name];
            const Illustration = role.illustration;

            return (
              <FadeInView key={role.name} delay={i * 0.12}>
                <motion.div
                  className="group relative rounded-2xl border bg-white p-8 md:p-10 transition-all duration-500 hover:-translate-y-1"
                  style={{ borderColor: colors.border }}
                  whileHover={shouldReduce ? undefined : {
                    boxShadow: "0 20px 60px rgba(0,0,0,0.06), 0 0 0 2px rgba(245,158,11,0.15), inset 0 0 0 1px rgba(245,158,11,0.08)",
                  }}
                >
                {/* Hover accent line — top edge */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="relative flex flex-col gap-5">
                  {/* Illustration + role name row */}
                  <div className="flex items-center gap-4">
                    <Illustration size={52} />
                    <div>
                      <h3
                        className="font-heading text-[13px] font-bold uppercase tracking-[0.15em]"
                        style={{
                          fontFamily: "var(--font-heading)",
                          color: colors.accent,
                        }}
                      >
                        {role.name}
                      </h3>
                      <p className="text-[18px] md:text-[20px] font-semibold text-[#111827] leading-snug">
                        {role.description}
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div
                    className="h-px w-full"
                    style={{ backgroundColor: colors.border }}
                  />

                  {/* Detail */}
                  <p className="text-[15px] text-[#6B7280] leading-relaxed">
                    {role.detail}
                  </p>
                </div>

                </motion.div>
              </FadeInView>
            );
          })}
        </div>
      </div>
    </section>
  );
}
