import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BlueprintContent } from "@/components/blueprint/blueprint-content";

export const metadata: Metadata = {
  title: "Z1 Forge Blueprint — Partners & Mentors",
  description:
    "A comprehensive overview of Z1 Forge's 12-week startup collaborative forge for partners, mentors, and investors.",
};

export default function BlueprintPage() {
  return (
    <div className="relative min-h-screen bg-[#FAFAF9]">
      {/* Full-page background pattern */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #F59E0B 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-[#FAFAF9]" />
      </div>

      <Navbar />

      {/* Hero header */}
      <section className="relative z-10 pt-32 pb-8 md:pt-40 md:pb-10">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#F59E0B] mb-4">
              Blueprint
            </p>
            <h1 className="font-heading text-[clamp(32px,5vw,56px)] font-bold tracking-tight text-[#111827] mb-5">
              Z1 Forge{" "}
              <span className="gradient-text-orange">Blueprint</span>
            </h1>
            <p className="text-[15px] text-[#6B7280]">
              A comprehensive overview of our 12-week startup collaborative
              forge for partners, mentors, and investors.
            </p>
          </div>
        </div>
      </section>

      {/* PDF Viewer — fills remaining viewport height */}
      <section className="relative z-10 px-4 pb-4 md:px-6 md:pb-6">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
          <BlueprintContent />
        </div>
      </section>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
