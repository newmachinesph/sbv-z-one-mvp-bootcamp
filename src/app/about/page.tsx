import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { TrackedLink } from "@/components/tracked-link";
import { ParallaxImage } from "@/components/parallax-image";
import OriginSection from "@/components/about/origin-section";
import ValuesSection from "@/components/about/values-section";
import PurposeSection from "@/components/about/purpose-section";
import FrameworkSection from "@/components/home/framework-section";
import EcosystemSection from "@/components/home/ecosystem-section";
import OutcomesSection from "@/components/home/outcomes-section";

export const metadata: Metadata = {
  title: "About",
  description:
    "Starting Block Ventures powers Z1 Forge — a 12-week bootcamp where teams of four ship a live product. Learn about the 4H framework, our ecosystem, and what drives us.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ——— Hero ——— */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Dot grid background */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #F59E0B 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="relative container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(245,158,11,0.2)] bg-[rgba(245,158,11,0.08)] px-4 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F59E0B] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#F59E0B]" />
                </span>
                <span className="text-[13px] font-medium tracking-wide text-[#D97706]">
                  About Z1 Forge
                </span>
              </span>
            </div>

            <h1
              className="font-heading text-[clamp(32px,5vw,56px)] font-bold tracking-tight text-[#111827] mb-5"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              The Forge Behind the{" "}
              <span className="gradient-text-orange">Founders.</span>
            </h1>
            <p className="text-[clamp(16px,1.5vw,20px)] text-[#6B7280] leading-relaxed max-w-2xl mx-auto mb-8">
              Z1 Forge is where small teams go from zero to one. Four roles,
              twelve weeks, one live product. No theory. No slides. Just
              shipping.
            </p>
            <TrackedLink
              href="/apply"
              eventName="cta_click"
              eventProperties={{ cta: "apply_now", source: "about_hero" }}
              className="btn-glow group inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-[15px] font-semibold text-black"
            >
              Apply for Cohort 1
              <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* ——— Full-width forge image divider (parallax) ——— */}
      <ParallaxImage
        src="/blueprint/1.jpg"
        alt="The forge — where ideas are shaped into products"
        className="h-[280px] md:h-[400px]"
        overlay={
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60 z-[1]" />
            <div className="relative z-10 flex items-center justify-center h-full">
              <p
                className="font-heading text-[clamp(20px,3vw,32px)] font-bold text-white/90 tracking-tight text-center px-6"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Where raw ideas are forged into real products.
              </p>
            </div>
          </>
        }
      />

      <OriginSection />
      <ValuesSection />
      <PurposeSection />

      {/* ——— Full-width journey image divider (parallax) ——— */}
      <ParallaxImage
        src="/blueprint/5.jpg"
        alt="The road ahead — from zero to one"
        className="h-[240px] md:h-[360px]"
        overlay={
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/50 z-[1]" />
            <div className="relative z-10 flex items-center justify-center h-full">
              <p
                className="font-heading text-[clamp(18px,2.5vw,28px)] font-bold text-white/90 tracking-tight text-center px-6"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                The path from &ldquo;someday&rdquo; to shipped starts here.
              </p>
            </div>
          </>
        }
      />

      <FrameworkSection />
      <EcosystemSection />
      <OutcomesSection />

      <Footer />
    </div>
  );
}
