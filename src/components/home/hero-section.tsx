"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import posthog from "posthog-js";
import { CharReveal } from "./char-reveal";
import { Marquee } from "./marquee";
import { MountainGrid } from "./mountain-grid";
import { partnerLogos } from "./home-data";

export default function HeroSection() {
  const shouldReduce = useReducedMotion();

  const fade = (delay: number) =>
    shouldReduce
      ? {}
      : ({
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.5,
            delay,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
          },
        } as const);

  return (
    <>
      {/* ——— Hero ——— */}
      <section className="relative h-screen min-h-[640px] md:min-h-[960px] flex items-center justify-center bg-white overflow-hidden pt-12 md:pt-0">
        {/* Mountain grid background */}
        <MountainGrid />

        {/* Main content */}
        <div className="relative z-10 text-center px-4 md:px-6 max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div {...fade(0.2)} className="mb-5 md:mb-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(245,158,11,0.2)] bg-[rgba(245,158,11,0.08)] px-4 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F59E0B] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#F59E0B]" />
              </span>
              <span className="text-[13px] font-medium tracking-wide text-[#D97706]" style={{ fontFamily: "var(--font-sans)" }}>
                Cohort 1 is Free — Now Accepting Applications
              </span>
            </span>
          </motion.div>

          {/* Headline — Manrope (font-heading) */}
          <h1 className="font-heading leading-[0.95] mb-4 md:mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            <span className="block gradient-text-orange text-[clamp(48px,10vw,128px)] font-extrabold tracking-[-0.04em]">
              <CharReveal text="Zero to One." startDelay={0.4} />
            </span>
            <motion.span
              {...fade(0.7)}
              className="block text-[#000] text-[clamp(36px,7vw,96px)] font-bold tracking-[-0.03em]"
            >
              From Idea to Live Product
            </motion.span>
            <span className="block gradient-text-orange text-[clamp(48px,10vw,128px)] font-extrabold tracking-[-0.04em]">
              <CharReveal text="in 12 Weeks." startDelay={1.0} />
            </span>
          </h1>

          {/* Subtitle */}
          <motion.p
            {...fade(1.3)}
            className="mx-auto mb-6 md:mb-10 max-w-2xl text-[clamp(14px,1.5vw,20px)] leading-relaxed text-[#6B7280]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            A build-first program where founders collaborate to launch real
            products. Every team ships every Friday.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            {...fade(1.5)}
            className="flex flex-row items-center justify-center gap-4 max-sm:flex-col max-sm:items-stretch max-sm:px-8"
          >
            <Link
              href="/apply"
              onClick={() => posthog.capture("cta_click", { cta: "apply_now", source: "home_hero" })}
              className="btn-glow group inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-[15px] font-semibold text-black"
            >
              Apply Now
              <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/program"
              onClick={() => posthog.capture("cta_click", { cta: "view_program", source: "home_hero" })}
              className="btn-glow-dark group inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-[15px] font-semibold text-[#111827]"
            >
              View Program
            </Link>
          </motion.div>

        </div>
      </section>

      {/* ——— Partner logos ——— */}
      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-6">
          <p className="mb-8 text-center text-[12px] font-medium uppercase tracking-[0.2em] text-[#9CA3AF]">
            Trusted By Industry Partners
          </p>

          {/* Mobile: static 2-per-row grid */}
          <div className="partner-mobile grid grid-cols-2 items-center justify-items-center gap-y-8 gap-x-6 max-w-xs mx-auto">
            {partnerLogos.map((partner) => (
              <a
                key={partner.name}
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                className="grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              >
                <img
                  src={partner.src}
                  alt={partner.alt}
                  className={`${partner.height} w-auto`}
                />
              </a>
            ))}
          </div>

          {/* Desktop: marquee carousel */}
          <div className="partner-desktop">
            <Marquee speed={30}>
              {partnerLogos.map((partner) => (
                <a
                  key={partner.name}
                  href={partner.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 mx-10 md:mx-14 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                >
                  <img
                    src={partner.src}
                    alt={partner.alt}
                    className={`${partner.height} w-auto`}
                  />
                </a>
              ))}
            </Marquee>
          </div>
        </div>
      </section>
    </>
  );
}
