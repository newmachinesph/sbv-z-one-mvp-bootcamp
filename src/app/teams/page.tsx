import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getTeams } from "@/lib/data";
import { TeamsContent } from "./teams-content";

export const metadata: Metadata = {
  title: "Teams",
  robots: { index: false, follow: true },
};

export default async function TeamsPage() {
  const teams = await getTeams();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ——— Hero header ——— */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Subtle dot grid background */}
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
                  Cohort 1 Teams
                </span>
              </span>
            </div>

            <h1
              className="font-heading text-[clamp(32px,5vw,56px)] font-bold tracking-tight text-[#111827] mb-5"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Meet the <span className="gradient-text-orange">Teams</span>
            </h1>
            <p className="text-[clamp(16px,1.5vw,20px)] text-[#6B7280] leading-relaxed max-w-2xl mx-auto">
              Four teams. Four niches. One framework. Every team ships every
              Friday using the 4H model: Hacker, Hustler, Hipster, Hound.
            </p>
          </div>
        </div>
      </section>

      <TeamsContent teams={teams} />

      <Footer />
    </div>
  );
}
