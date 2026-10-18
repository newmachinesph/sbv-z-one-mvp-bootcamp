"use client";

import Image from "next/image";
import { FadeInView } from "@/components/home/fade-in-view";

export default function OriginSection() {
  return (
    <section className="bg-[#F9FAFB] py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-5xl">
          {/* Two-column: story left, logo right */}
          <div className="grid gap-12 md:grid-cols-2 items-center">
            {/* Story */}
            <div>
              <FadeInView>
                <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#F59E0B] mb-4">
                  Who We Are
                </p>
              </FadeInView>
              <FadeInView delay={0.1}>
                <h2
                  className="font-heading text-[clamp(28px,4vw,44px)] font-bold tracking-tight text-[#111827] mb-6"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  From Service Provider to{" "}
                  <span className="gradient-text-orange">Ecosystem Architect.</span>
                </h2>
              </FadeInView>
              <FadeInView delay={0.15}>
                <div className="space-y-5 text-[15px] md:text-[16px] text-[#6B7280] leading-relaxed">
                  <p>
                    <strong className="text-[#111827]">Starting Block Ventures</strong>{" "}
                    is a venture studio based in Makati, Philippines. Founded in 2024, SBV
                    champions companies bold enough to reinvent how we live — across
                    Fintech, Healthtech, SaaS, Climatetech, AI, and Consumer.
                  </p>
                  <p>
                    We evolved from being service providers to becoming ecosystem
                    architects — building the infrastructure that helps founders thrive.
                    Our reach extends across ASEAN and Greater China, connecting founders
                    with global opportunities.
                  </p>
                  <p>
                    <strong className="text-[#111827]">Z1 Forge</strong> is where that
                    ecosystem starts. It&apos;s SBV&apos;s 12-week bootcamp where teams of
                    four go from zero to one — a live, deployed product with real users and
                    real revenue. Forge is the entry point into the broader SBV ecosystem:
                    Mentors for guidance, Pitch for investor visibility, and InSpace for
                    community.
                  </p>
                </div>
              </FadeInView>
            </div>

            {/* Visual + Logo stack */}
            <FadeInView delay={0.2}>
              <div className="flex flex-col items-center gap-6">
                {/* Manila skyline image */}
                <div className="relative w-full h-[220px] md:h-[260px] rounded-2xl overflow-hidden border border-[#E5E7EB]">
                  <Image
                    src="/blueprint/3.jpg"
                    alt="Manila skyline at dusk — where SBV is rooted"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5">
                    <p className="text-[12px] font-medium text-white/80 tracking-wide">
                      Rooted in Makati, Philippines
                    </p>
                  </div>
                </div>

                {/* Logo strip */}
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 w-full">
                  <div className="rounded-xl border border-[#E5E7EB] bg-white p-5 flex items-center justify-center">
                    <Image
                      src="/sbv_logo_dark.svg"
                      alt="Starting Block Ventures"
                      width={160}
                      height={54}
                      className="h-10 md:h-12 w-auto"
                    />
                  </div>

                  {/* Arrow connector */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-px h-4 bg-gradient-to-b from-[#E5E7EB] to-[#F59E0B]" />
                    <span
                      className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#F59E0B]"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      Powers
                    </span>
                    <div className="w-px h-4 bg-gradient-to-b from-[#F59E0B] to-[#E5E7EB]" />
                  </div>

                  <div className="rounded-xl border border-[#E5E7EB] bg-white p-5 flex items-center justify-center gap-2">
                    <Image
                      src="/z1-logo-orange.svg"
                      alt="Z1 Forge"
                      width={24}
                      height={28}
                      className="h-7 w-auto"
                    />
                    <span
                      className="font-heading text-[18px] md:text-[20px] font-bold text-[#111827]"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      Forge
                    </span>
                  </div>
                </div>
              </div>
            </FadeInView>
          </div>
        </div>
      </div>
    </section>
  );
}
