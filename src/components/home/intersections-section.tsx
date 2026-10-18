"use client";

import { motion, useReducedMotion } from "framer-motion";
import { collaborativePairs } from "./home-data";
import { FadeInView } from "./fade-in-view";

/* ── Minimal SVG: two nodes joined by a line ── */
function ConnectionIcon({ className }: { className?: string }) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      className={className}
    >
      <line
        x1="12"
        y1="20"
        x2="28"
        y2="20"
        stroke="#E5E7EB"
        strokeWidth="1.5"
        className="group-hover:stroke-[#F59E0B] transition-colors duration-500"
      />
      <circle
        cx="10"
        cy="20"
        r="4"
        fill="#111827"
        className="group-hover:fill-[#F59E0B] transition-colors duration-500"
      />
      <circle
        cx="30"
        cy="20"
        r="4"
        fill="#111827"
        className="group-hover:fill-[#F59E0B] transition-colors duration-500"
      />
    </svg>
  );
}

/* ── Extract short role codes from pair name ── */
function getRoleCodes(name: string): [string, string] {
  const map: Record<string, string> = {
    Hacker: "Hk",
    Hustler: "Hu",
    Hipster: "Hp",
    Hound: "Hd",
  };
  const parts = name.split(" × ");
  return [map[parts[0]] ?? parts[0], map[parts[1]] ?? parts[1]];
}

export default function IntersectionsSection() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="relative bg-white py-24 md:py-32 overflow-hidden">
      <div className="relative container mx-auto px-6">
        {/* Header */}
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <FadeInView>
            <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#F59E0B] mb-4">
              Collaborative Pairs
            </p>
          </FadeInView>
          <FadeInView delay={0.1}>
            <h2
              className="font-heading text-[clamp(32px,4vw,56px)] font-bold tracking-tight text-[#111827] mb-5"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Built at the{" "}
              <span className="gradient-text-orange">Intersections</span>
            </h2>
          </FadeInView>
          <FadeInView delay={0.2}>
            <p className="text-[clamp(16px,1.5vw,20px)] text-[#6B7280] leading-relaxed max-w-2xl mx-auto">
              The 4H defines ownership, not isolation. The best features happen
              when two roles collide.
            </p>
          </FadeInView>
        </div>

        {/* Pair cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {collaborativePairs.map((pair, i) => {
            const [codeA, codeB] = getRoleCodes(pair.name);

            return (
              <FadeInView key={pair.name} delay={i * 0.08}>
              <motion.div
                className="group relative flex flex-col rounded-2xl border border-[#E5E7EB] bg-white p-7 md:p-8 h-full transition-all duration-500 hover:-translate-y-1"
                whileHover={
                  shouldReduce
                    ? undefined
                    : {
                        boxShadow:
                          "0 20px 60px rgba(0,0,0,0.06), 0 0 0 2px rgba(245,158,11,0.15), inset 0 0 0 1px rgba(245,158,11,0.08)",
                      }
                }
              >
                {/* Ghost index number */}
                <span
                  className="absolute top-5 right-7 font-heading text-[64px] md:text-[80px] font-extrabold leading-none select-none"
                  style={{ color: "#F59E0B", opacity: 0.35 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Role code badges + connection icon */}
                <div className="relative flex items-center gap-1.5 mb-5">
                  <span className="inline-flex items-center justify-center h-8 px-3 rounded-lg bg-[#111827] text-[11px] font-bold uppercase tracking-wider text-white">
                    {codeA}
                  </span>
                  <ConnectionIcon />
                  <span className="inline-flex items-center justify-center h-8 px-3 rounded-lg bg-[#111827] text-[11px] font-bold uppercase tracking-wider text-white">
                    {codeB}
                  </span>
                </div>

                {/* Nickname */}
                <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#F59E0B] mb-2">
                  {pair.nickname}
                </span>

                {/* Pair name */}
                <h3
                  className="font-heading text-[17px] md:text-[18px] font-bold text-[#111827] mb-2 leading-snug"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {pair.name}
                </h3>

                {/* Divider */}
                <div className="h-px w-full bg-[#E5E7EB] mb-3" />

                {/* Description */}
                <p className="text-[14px] md:text-[15px] text-[#6B7280] leading-relaxed mb-0 flex-grow">
                  {pair.description}
                </p>


                {/* Hover accent line — top edge */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
              </FadeInView>
            );
          })}
        </div>
      </div>
    </section>
  );
}
