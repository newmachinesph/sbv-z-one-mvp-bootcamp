"use client";

import { Handshake, Globe, Target, Users } from "lucide-react";
import { FadeInView } from "@/components/home/fade-in-view";

const values = [
  {
    icon: Target,
    label: "Merit-Driven",
    description:
      "The best ideas win, regardless of background. Our selection focuses purely on potential and execution capability.",
  },
  {
    icon: Handshake,
    label: "Co-Building",
    description:
      "We don\u2019t just invest \u2014 we roll up our sleeves and build alongside founders. From strategy to operations, we\u2019re in the trenches with you.",
  },
  {
    icon: Users,
    label: "Long-Term Partnership",
    description:
      "Building great companies takes time. We\u2019re committed to supporting founders through every stage of their journey.",
  },
  {
    icon: Globe,
    label: "Global Mindset",
    description:
      "Rooted in the Philippines, thinking globally. Our network spans ASEAN, Greater China, and beyond.",
  },
];

export default function ValuesSection() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <FadeInView>
            <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#F59E0B] mb-4">
              What Drives Us
            </p>
          </FadeInView>
          <FadeInView delay={0.1}>
            <h2
              className="font-heading text-[clamp(32px,4vw,56px)] font-bold tracking-tight text-[#111827] mb-5"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Our <span className="gradient-text-orange">Values</span>
            </h2>
          </FadeInView>
          <FadeInView delay={0.2}>
            <p className="text-[clamp(16px,1.5vw,20px)] text-[#6B7280] leading-relaxed max-w-2xl mx-auto">
              Every decision we make — from who we accept to how we structure the
              program — traces back to these four principles.
            </p>
          </FadeInView>
        </div>

        {/* Values grid */}
        <div className="mx-auto max-w-5xl grid gap-6 md:grid-cols-2">
          {values.map((value, i) => {
            const Icon = value.icon;
            return (
              <FadeInView key={value.label} delay={i * 0.08}>
                <div className="group relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] p-7 h-full transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.06),0_0_0_2px_rgba(245,158,11,0.15),inset_0_0_0_1px_rgba(245,158,11,0.08)]">
                  <div className="relative flex items-start gap-5">
                    {/* Icon */}
                    <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-[#FEF3C7] transition-colors duration-300 group-hover:bg-[#F59E0B]">
                      <Icon className="h-5 w-5 text-[#D97706] transition-colors duration-300 group-hover:text-white" />
                    </div>

                    {/* Text */}
                    <div className="flex flex-col gap-2">
                      <h3
                        className="text-[17px] md:text-[19px] font-bold text-[#111827] leading-snug"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {value.label}
                      </h3>
                      <p className="text-[14px] md:text-[15px] text-[#6B7280] leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>

                  {/* Hover accent line */}
                  <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </FadeInView>
            );
          })}
        </div>
      </div>
    </section>
  );
}
