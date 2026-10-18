"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeInView } from "./fade-in-view";
import { outcomes } from "./home-data";

/*
  Graduation Outcomes — alternating full-width rows with
  left-aligned numbered items. Distinct from the 2-col card grids
  used by other sections.
*/

export default function OutcomesSection() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <FadeInView>
            <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#F59E0B] mb-4">
              Graduation Outcomes
            </p>
          </FadeInView>
          <FadeInView delay={0.1}>
            <h2
              className="font-heading text-[clamp(32px,4vw,56px)] font-bold tracking-tight text-[#111827] mb-5"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              What You{" "}
              <span className="gradient-text-orange">Walk Away With.</span>
            </h2>
          </FadeInView>
          <FadeInView delay={0.2}>
            <p className="text-[clamp(16px,1.5vw,20px)] text-[#6B7280] leading-relaxed max-w-2xl mx-auto">
              Not certificates. Not pitch decks collecting dust. A live product
              with real users and real revenue.
            </p>
          </FadeInView>
        </div>

        {/* Outcomes — stacked full-width rows for visual variety */}
        <div className="mx-auto max-w-3xl space-y-3">
          {outcomes.map((outcome, i) => (
            <FadeInView key={outcome} delay={i * 0.06} direction={i % 2 === 0 ? "left" : "right"}>
              <motion.div
                className="group flex items-center gap-5 rounded-2xl border border-[#E5E7EB] bg-white px-6 py-5 transition-all duration-500 hover:-translate-y-0.5"
                whileHover={
                  shouldReduce
                    ? undefined
                    : {
                        boxShadow:
                          "0 12px 40px rgba(0,0,0,0.04), 0 0 0 2px rgba(245,158,11,0.12)",
                      }
                }
              >
                {/* Index number */}
                <span
                  className="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-[#FEF3C7] text-[13px] font-bold text-[#D97706]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Divider */}
                <div className="shrink-0 w-px h-6 bg-[#E5E7EB]" />

                {/* Text */}
                <span className="text-[15px] md:text-[16px] text-[#111827] leading-relaxed font-medium">
                  {outcome}
                </span>

                {/* Hover accent line */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
