"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeInView } from "./fade-in-view";

/*
  Bento grid layout — the core build block (Tue–Thu) dominates.
  The accent card includes a pixel-art collaboration scene (desktop only)
  showing the 4H roles working together.
*/

interface RhythmCard {
  index: string;
  label: string;
  title: string;
  description: string;
  gridClass: string;
  accent?: boolean;
}

const cards: RhythmCard[] = [
  {
    index: "01",
    label: "MON",
    title: "Sprint Kickoff",
    description: "Set goals, assign tasks, align the team for the week ahead.",
    gridClass: "md:col-start-1 md:row-start-1",
  },
  {
    index: "02",
    label: "TUE\u2013THU",
    title: "Build, Ship, Collaborate",
    description: "Heads-down building with your team. Code, design, and ship features daily.",
    gridClass: "md:col-start-2 md:col-span-2 md:row-start-1 md:row-span-2",
    accent: true,
  },
  {
    index: "03",
    label: "WED",
    title: "Mid-week Challenge",
    description: "Cross-team competitions and skill-building exercises.",
    gridClass: "md:col-start-1 md:row-start-2",
  },
  {
    index: "04",
    label: "FRI",
    title: "Ship, Share, Learn",
    description: "Demo progress, collect real user feedback, and iterate.",
    gridClass: "md:col-start-1 md:col-span-2 md:row-start-3",
  },
  {
    index: "05",
    label: "SAT",
    title: "Weekly Retrospective",
    description: "Reflect on wins, fix what\u2019s broken, plan next sprint.",
    gridClass: "md:col-start-3 md:row-start-3",
  },
];

export default function RhythmSection() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="bg-[#F9FAFB] py-24 md:py-32">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <FadeInView>
            <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#F59E0B] mb-4">
              Weekly Rhythm
            </p>
          </FadeInView>
          <FadeInView delay={0.1}>
            <h2
              className="font-heading text-[clamp(32px,4vw,56px)] font-bold tracking-tight text-[#111827] mb-5"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Ship Every Week.
              <br />
              <span className="gradient-text-orange">No Exceptions.</span>
            </h2>
          </FadeInView>
          <FadeInView delay={0.2}>
            <p className="text-[clamp(16px,1.5vw,20px)] text-[#6B7280] leading-relaxed max-w-2xl mx-auto">
              Every week follows the same heartbeat. Predictable rhythm,
              relentless output.
            </p>
          </FadeInView>
        </div>

        {/* Bento grid */}
        <div className="grid gap-3 md:grid-cols-3 md:grid-rows-3 max-w-5xl mx-auto md:auto-rows-[minmax(140px,auto)]">
          {cards.map((card, i) => (
            <FadeInView key={card.index} delay={i * 0.1} className={card.gridClass}>
              <motion.div
                className={`group relative overflow-hidden rounded-2xl border p-6 md:p-7 transition-all duration-500 hover:-translate-y-0.5 h-full ${
                  card.accent
                    ? "bg-black border-black text-white"
                    : "bg-white border-[#E5E7EB]"
                }`}
                whileHover={
                  shouldReduce
                    ? undefined
                    : {
                        boxShadow: card.accent
                          ? "0 20px 60px rgba(0,0,0,0.15), 0 0 0 2px rgba(245,158,11,0.25)"
                          : "0 20px 60px rgba(0,0,0,0.06), 0 0 0 2px rgba(245,158,11,0.15), inset 0 0 0 1px rgba(245,158,11,0.08)",
                      }
                }
              >
                {/* Ghost index */}
                <span
                  className={`absolute top-4 right-6 font-heading font-extrabold leading-none select-none ${
                    card.accent
                      ? "text-[56px] md:text-[72px] text-white/[0.36]"
                      : "text-[48px] md:text-[64px] text-[#F59E0B]/[0.36]"
                  }`}
                >
                  {card.index}
                </span>

                {/* Content */}
                <div className="relative flex flex-col justify-between h-full gap-3">
                  <div>
                    <span
                      className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] mb-2 text-[#F59E0B]"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {card.label}
                    </span>
                    <h3
                      className={`text-[17px] md:text-[19px] font-bold leading-snug mb-1 ${
                        card.accent ? "text-white" : "text-[#111827]"
                      }`}
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {card.title}
                    </h3>
                  </div>

                  {/* 4H role badges — accent card only */}
                  {card.accent && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "20px",
                        padding: "16px 0",
                        position: "relative",
                        zIndex: 10,
                      }}
                    >
                      {([
                        { name: "Hacker", code: "Hk" },
                        { name: "Hustler", code: "Hu" },
                        { name: "Hipster", code: "Hp" },
                        { name: "Hound", code: "Hd" },
                      ] as const).map((role) => (
                        <div
                          key={role.name}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "44px",
                              height: "44px",
                              borderRadius: "12px",
                              backgroundColor: "#F59E0B",
                              color: "#000",
                              fontSize: "14px",
                              fontWeight: 700,
                              fontFamily: "var(--font-heading)",
                            }}
                          >
                            {role.code}
                          </span>
                          <span
                            style={{
                              fontSize: "10px",
                              fontWeight: 500,
                              letterSpacing: "0.08em",
                              textTransform: "uppercase" as const,
                              color: "rgba(255,255,255,0.5)",
                            }}
                          >
                            {role.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <p
                    className={`text-[14px] md:text-[15px] leading-relaxed ${
                      card.accent ? "text-white/60" : "text-[#6B7280]"
                    }`}
                  >
                    {card.description}
                  </p>
                </div>

                {/* Hover accent line */}
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
