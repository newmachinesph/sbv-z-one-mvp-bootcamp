"use client";

import Image from "next/image";
import { FadeInView } from "./fade-in-view";
import { aiDevelopmentStages } from "./home-data";

/*
  AI-Powered Development — full-width split rows.
  Each stage spans the full container width with:
    Left (dark):  AI role
    Right (light): Human role
    Orange stage badge on the center divider (desktop) or top bar (mobile).
  Uses CSS Grid for responsive layout — no hidden/flex toggle.
*/

export default function AISection() {
  return (
    <section className="bg-[#F9FAFB] py-24 md:py-32">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <FadeInView>
            <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#F59E0B] mb-4">
              AI + Human
            </p>
          </FadeInView>
          <FadeInView delay={0.1}>
            <h2
              className="font-heading text-[clamp(32px,4vw,56px)] font-bold tracking-tight text-[#111827] mb-5"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              AI Does the Heavy Lifting.
              <br />
              <span className="gradient-text-orange">You Make the Decisions.</span>
            </h2>
          </FadeInView>
          <FadeInView delay={0.2}>
            <p className="text-[clamp(16px,1.5vw,20px)] text-[#6B7280] leading-relaxed max-w-2xl mx-auto">
              AI pair-programs, drafts copy, and generates designs. Your team handles
              strategy, user conversations, and the final call on everything that ships.
            </p>
          </FadeInView>
        </div>

        {/* AI + Human visual */}
        <FadeInView delay={0.25}>
          <div className="relative mx-auto mb-12 max-w-5xl h-[220px] md:h-[320px] rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
            <Image
              src="/blueprint/9.jpg"
              alt="Robot hand and human hand reaching toward each other — AI meets human creativity"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1024px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center gap-6">
                <span className="rounded-full bg-black/60 backdrop-blur-sm px-4 py-2 text-[13px] font-bold text-white tracking-wide" style={{ fontFamily: "var(--font-heading)" }}>
                  AI
                </span>
                <div className="h-px w-12 bg-[#F59E0B]" />
                <span className="rounded-full bg-white/80 backdrop-blur-sm px-4 py-2 text-[13px] font-bold text-[#111827] tracking-wide" style={{ fontFamily: "var(--font-heading)" }}>
                  HUMAN
                </span>
              </div>
            </div>
          </div>
        </FadeInView>

        {/* AI vs Human rows — single card per row with POWERS-style connector inside */}
        <div className="mx-auto max-w-5xl space-y-4">
          {aiDevelopmentStages.map((item, i) => (
            <FadeInView key={item.stage} delay={i * 0.06}>
              <div className="rounded-xl border border-[#E5E7EB] bg-white overflow-hidden">
                {/* Stage label bar — mobile only */}
                <div className="flex items-center justify-center gap-3 py-3 border-b border-[#E5E7EB] md:!hidden">
                  <div className="h-px w-6 bg-gradient-to-r from-transparent to-[#F59E0B]" />
                  <span
                    className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#F59E0B] text-center leading-tight"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {item.stage}
                  </span>
                  <div className="h-px w-6 bg-gradient-to-l from-transparent to-[#F59E0B]" />
                </div>

                {/* AI | connector | Human — responsive grid */}
                <div className="grid grid-cols-[1fr_1px_1fr] md:grid-cols-[1fr_120px_1fr] items-stretch">
                  {/* AI side */}
                  <div className="p-4 md:p-6 flex flex-col justify-center md:text-right">
                    <span
                      className="text-[10px] font-bold uppercase tracking-[0.15em] block mb-1"
                      style={{ fontFamily: "var(--font-heading)", color: "#F59E0B" }}
                    >
                      AI
                    </span>
                    <p className="text-[12px] md:text-[15px] leading-relaxed text-[#6B7280]">
                      {item.aiRole}
                    </p>
                  </div>

                  {/* Center: thin divider on mobile, connector on desktop */}
                  <div className="bg-[#E5E7EB] md:!bg-transparent md:flex md:flex-col md:items-center md:gap-1 md:justify-center md:py-4">
                    <div className="max-md:hidden w-px h-4 bg-gradient-to-b from-[#E5E7EB] to-[#F59E0B]" />
                    <span
                      className="max-md:hidden text-[9px] font-bold uppercase tracking-[0.15em] text-[#F59E0B] text-center leading-tight"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {item.stage}
                    </span>
                    <div className="max-md:hidden w-px h-4 bg-gradient-to-b from-[#F59E0B] to-[#E5E7EB]" />
                  </div>

                  {/* Human side */}
                  <div className="p-4 md:p-6 flex flex-col justify-center">
                    <span
                      className="text-[10px] font-bold uppercase tracking-[0.15em] block mb-1"
                      style={{ fontFamily: "var(--font-heading)", color: "#9CA3AF" }}
                    >
                      Human
                    </span>
                    <p className="text-[12px] md:text-[15px] leading-relaxed font-medium text-[#111827]">
                      {item.humanRole}
                    </p>
                  </div>
                </div>
              </div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
