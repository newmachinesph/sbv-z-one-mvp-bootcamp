import { PageWrapper } from "../page-wrapper";
import { outcomes } from "../blueprint-data";

const outcomeDetails = [
  { metric: "50+", unit: "Signups" },
  { metric: "10+", unit: "Active Users" },
  { metric: "2+", unit: "Integrations" },
  { metric: "$", unit: "First Revenue" },
  { metric: "1", unit: "Pitch Deck" },
  { metric: "90d", unit: "Roadmap" },
  { metric: "1", unit: "Brand Identity" },
  { metric: "1", unit: "Demo Day" },
];

export function OutcomesSection() {
  return (
    <PageWrapper pageNumber={11} bg="gray" backgroundImage="/blueprint/11.jpg">
      <div className="flex h-full flex-col">
        {/* Section label */}
        <p
          className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#F59E0B] mb-3"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          10 / Outcomes
        </p>
        <h2
          className="text-[32px] font-bold tracking-tight text-white mb-3 leading-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          What Every Team{" "}
          <span className="gradient-text-orange">Ships</span>
        </h2>
        <p
          className="text-[14px] text-white/70 leading-relaxed mb-10 max-w-lg"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Every team that completes the 12-week program walks away with
          tangible, measurable deliverables — not just ideas.
        </p>

        {/* Outcome rows */}
        <div className="space-y-3 flex-1">
          {outcomes.map((outcome, i) => (
            <div
              key={i}
              className="flex items-center gap-5 rounded-xl border border-white/10 bg-white/10 backdrop-blur-sm px-5 py-4"
            >
              {/* Number badge */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F59E0B]">
                <span
                  className="text-[14px] font-bold text-black"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Description */}
              <p
                className="flex-1 text-[14px] text-white font-medium"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {outcome}
              </p>

              {/* Metric badge */}
              <div className="shrink-0 rounded-full bg-[#F59E0B]/20 px-3 py-1">
                <span
                  className="text-[12px] font-bold text-[#FBBF24]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {outcomeDetails[i].metric}{" "}
                  <span className="font-normal text-[#FBBF24]/70">
                    {outcomeDetails[i].unit}
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
