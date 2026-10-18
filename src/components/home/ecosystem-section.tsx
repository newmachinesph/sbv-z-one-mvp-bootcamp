"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeInView } from "./fade-in-view";
import { platformCards } from "./home-data";
import {
  ForgeIllustration,
  MentorIllustration,
  PitchIllustration,
  InSpaceIllustration,
} from "@/components/role-illustrations";
import type { ComponentType } from "react";

const iconMap: Record<string, ComponentType<{ className?: string; size?: number }>> = {
  Rocket: ForgeIllustration,
  Users: MentorIllustration,
  Trophy: PitchIllustration,
  Radio: InSpaceIllustration,
};

export default function EcosystemSection() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="bg-[#F9FAFB] py-24 md:py-32">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <FadeInView>
            <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#F59E0B] mb-4">
              The Ecosystem
            </p>
          </FadeInView>
          <FadeInView delay={0.1}>
            <h2
              className="font-heading text-[clamp(32px,4vw,56px)] font-bold tracking-tight text-[#111827] mb-5"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Four Platforms.{" "}
              <span className="gradient-text-orange">One Ecosystem.</span>
            </h2>
          </FadeInView>
        </div>

        {/* Cards grid */}
        <div className="mx-auto max-w-4xl grid gap-4 md:grid-cols-2">
          {platformCards.map((card, i) => {
            const Icon = iconMap[card.icon];

            return (
              <FadeInView key={card.title} delay={i * 0.1}>
                <motion.a
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative overflow-hidden rounded-2xl border p-7 md:p-8 transition-all duration-500 hover:-translate-y-0.5 block ${
                    card.isPrimary
                      ? "bg-black border-black text-white"
                      : "bg-white border-[#E5E7EB]"
                  }`}
                  whileHover={
                    shouldReduce
                      ? undefined
                      : {
                          boxShadow: card.isPrimary
                            ? "0 20px 60px rgba(0,0,0,0.15), 0 0 0 2px rgba(245,158,11,0.25)"
                            : "0 20px 60px rgba(0,0,0,0.06), 0 0 0 2px rgba(245,158,11,0.15), inset 0 0 0 1px rgba(245,158,11,0.08)",
                        }
                  }
                >
                  {/* Content */}
                  <div className="relative flex flex-col gap-4">
                    {Icon && <Icon size={52} />}
                    <div>
                      <h3
                        className={`text-[19px] md:text-[21px] font-bold mb-1 ${
                          card.isPrimary ? "text-white" : "text-[#111827]"
                        }`}
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {card.title}
                      </h3>
                      <span className="text-[13px] font-medium text-[#F59E0B]">
                        {card.subtitle}
                      </span>
                    </div>
                    <p
                      className={`text-[14px] md:text-[15px] leading-relaxed ${
                        card.isPrimary ? "text-white/60" : "text-[#6B7280]"
                      }`}
                    >
                      {card.description}
                    </p>
                  </div>

                  <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.a>
              </FadeInView>
            );
          })}
        </div>
      </div>
    </section>
  );
}
