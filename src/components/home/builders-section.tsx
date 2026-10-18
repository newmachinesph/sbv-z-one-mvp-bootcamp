"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { FadeInView } from "./fade-in-view";
import { builderBlocks } from "./home-data";

/*
  Built for Builders — 2×2 grid of feature blocks.
  Each block has a bold title and description.
*/

export default function BuildersSection() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <FadeInView>
            <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#F59E0B] mb-4">
              For Builders
            </p>
          </FadeInView>
          <FadeInView delay={0.1}>
            <h2
              className="font-heading text-[clamp(32px,4vw,56px)] font-bold tracking-tight text-[#111827] mb-5"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Built for Builders,{" "}
              <span className="gradient-text-orange">Everywhere.</span>
            </h2>
          </FadeInView>
          <FadeInView delay={0.2}>
            <p className="text-[clamp(16px,1.5vw,20px)] text-[#6B7280] leading-relaxed max-w-2xl mx-auto">
              Z1 is built for anyone ready to stop planning and start shipping.
            </p>
          </FadeInView>
        </div>

        {/* Cards grid */}
        <div className="mx-auto max-w-4xl grid gap-4 md:grid-cols-2">
          {builderBlocks.map((block, i) => (
            <FadeInView key={block.title} delay={i * 0.1}>
              <motion.div
                className="group relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-6 md:p-7 h-full transition-all duration-500 hover:-translate-y-0.5"
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
              <div className="relative flex flex-col gap-3">
                <h3
                  className="text-[17px] md:text-[19px] font-bold text-[#111827] leading-snug"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {block.title}
                </h3>
                <p className="text-[14px] md:text-[15px] leading-relaxed text-[#6B7280]">
                  {block.description}
                </p>
              </div>

              {/* Hover accent line */}
              <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            </FadeInView>
          ))}
        </div>

        {/* Stage spotlight — Demo Day visual */}
        <FadeInView delay={0.5}>
          <div className="relative mx-auto mt-16 max-w-4xl h-[220px] md:h-[320px] rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
            <Image
              src="/blueprint/10.jpg"
              alt="Theater stage with spotlight — where teams present on Demo Day"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <p
                className="text-[14px] font-bold uppercase tracking-[0.15em] mb-2"
                style={{ fontFamily: "var(--font-heading)", color: "#FBBF24", textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
              >
                Week 12
              </p>
              <p className="text-[18px] md:text-[22px] text-white" style={{ fontFamily: "var(--font-heading)", textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}>
                Demo Day, <em className="font-medium">your moment on stage</em> ...
              </p>
            </div>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
