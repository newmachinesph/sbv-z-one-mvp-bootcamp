"use client";

import { FadeInView } from "./fade-in-view";
import { AnimatedCounter } from "./animated-counter";

/*
  Stats strip — 4 large animated counters between Hero and Framework.
  Full-width with border dividers. Big orange numbers.
*/

const stats = [
  { value: 12, suffix: "", label: "Weeks" },
  { value: 4, suffix: "H", label: "Team Framework" },
  { value: 1, suffix: "", label: "Live Product" },
  { value: 4, suffix: "", label: "Platforms" },
];

export default function StatsSection() {
  return (
    <section className="relative bg-white border-y border-[#E5E7EB]">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4">
        {stats.map((stat, i) => (
          <FadeInView key={stat.label} delay={i * 0.1}>
            <div
              className={`px-6 py-10 md:py-16 text-center ${
                i % 2 !== 0 ? "border-l border-[#E5E7EB]" : ""
              } ${i >= 2 ? "border-t md:border-t-0 border-[#E5E7EB]" : ""} ${
                i >= 1 ? "md:border-l" : ""
              }`}
            >
              <p
                className="text-[clamp(40px,6vw,72px)] font-extrabold text-[#F59E0B] leading-none mb-3"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-[13px] font-medium uppercase tracking-[0.15em] text-[#9CA3AF]">
                {stat.label}
              </p>
            </div>
          </FadeInView>
        ))}
      </div>
    </section>
  );
}
