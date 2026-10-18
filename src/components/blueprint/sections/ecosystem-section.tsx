import { PageWrapper } from "../page-wrapper";
import { platformCards } from "../blueprint-data";
import {
  ForgeIllustration,
  MentorIllustration,
  PitchIllustration,
  InSpaceIllustration,
} from "@/components/role-illustrations";

const illustrations = [
  ForgeIllustration,
  MentorIllustration,
  PitchIllustration,
  InSpaceIllustration,
];

export function EcosystemSection() {
  return (
    <PageWrapper pageNumber={8} bg="white" backgroundImage="/blueprint/8.jpg">
      <div className="flex h-full flex-col">
        {/* Section label */}
        <p
          className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#FBBF24] mb-3"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          07 / The Ecosystem
        </p>
        <h2
          className="text-[32px] font-bold tracking-tight text-white mb-3 leading-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Four Platforms.{" "}
          <span className="gradient-text-orange">One Ecosystem.</span>
        </h2>
        <p
          className="text-[14px] text-white/70 leading-relaxed mb-10 max-w-lg"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          The SBV ecosystem connects teams, mentors, investors, and community
          through four purpose-built platforms.
        </p>

        {/* 2x2 Platform Cards */}
        <div className="grid grid-cols-2 gap-5 flex-1">
          {platformCards.map((card, i) => {
            const Illustration = illustrations[i];
            const isPrimary = card.isPrimary;

            return (
              <div
                key={card.title}
                className={`rounded-xl border p-6 flex flex-col ${
                  isPrimary
                    ? "border-[#F59E0B]/30 bg-white/5 backdrop-blur-sm"
                    : "border-white/10 bg-white/10 backdrop-blur-sm"
                }`}
              >
                {/* Icon + Title */}
                <div className="flex items-center gap-4 mb-4">
                  <Illustration size={48} className="shrink-0" />
                  <div>
                    <h3
                      className="text-[18px] font-bold text-white"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {card.title}
                    </h3>
                    <span
                      className={`text-[12px] font-medium ${
                        isPrimary ? "text-[#F59E0B]" : "text-white/50"
                      }`}
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {card.subtitle}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p
                  className="text-[13px] leading-relaxed text-white/70"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </PageWrapper>
  );
}
