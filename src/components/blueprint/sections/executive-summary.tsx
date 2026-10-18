import { PageWrapper } from "../page-wrapper";
import { executiveSummary } from "../blueprint-data";

export function ExecutiveSummary() {
  return (
    <PageWrapper pageNumber={2} bg="white" backgroundImage="/blueprint/2.jpg">
      <div className="flex h-full flex-col">
        {/* Section label */}
        <p
          className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#F59E0B] mb-3"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          01 / Executive Summary
        </p>
        <h2
          className="text-[32px] font-bold tracking-tight text-white mb-10 leading-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Building the Future,{" "}
          <span className="gradient-text-orange">One Ship at a Time</span>
        </h2>

        {/* Paragraphs */}
        <div className="space-y-5 mb-10">
          {executiveSummary.paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-[14px] leading-[1.8] text-white/80"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {p}
            </p>
          ))}
        </div>

        {/* Pull quote */}
        <div className="rounded-xl border-l-4 border-[#F59E0B] bg-[#F59E0B]/15 backdrop-blur-sm px-8 py-6 mb-10">
          <p
            className="text-[18px] font-semibold text-white leading-relaxed italic"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            &ldquo;{executiveSummary.pullQuote}&rdquo;
          </p>
        </div>

        {/* Stats strip */}
        <div className="mt-auto grid grid-cols-4 gap-4">
          {executiveSummary.statsStrip.map((stat) => (
            <div
              key={stat}
              className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-5 text-center"
            >
              <span
                className="block text-[20px] font-bold text-white"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {stat.split(" ")[0]}
              </span>
              <span
                className="block text-[11px] font-medium uppercase tracking-[0.1em] text-white/50 mt-1"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {stat.split(" ").slice(1).join(" ")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
