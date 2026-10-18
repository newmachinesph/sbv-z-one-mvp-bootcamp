import { PageWrapper } from "../page-wrapper";
import { aiDevelopmentStages } from "../blueprint-data";

export function AIIntegration() {
  return (
    <PageWrapper pageNumber={9} bg="white" backgroundImage="/blueprint/9.jpg">
      <div className="flex h-full flex-col">
        {/* Section label */}
        <p
          className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#F59E0B] mb-3"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          08 / AI Integration
        </p>
        <h2
          className="text-[32px] font-bold tracking-tight text-white mb-3 leading-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          AI-Augmented.{" "}
          <span className="gradient-text-orange">Human-Directed.</span>
        </h2>
        <p
          className="text-[14px] text-white/70 leading-relaxed mb-10 max-w-lg"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          AI handles the heavy lifting across every stage of product
          development. Humans make the decisions that matter.
        </p>

        {/* AI Stages Table */}
        <div className="rounded-xl border border-white/10 overflow-hidden mb-8">
          {/* Header */}
          <div className="grid grid-cols-[140px_1fr_1fr] bg-white/10 backdrop-blur-sm px-5 py-3">
            <span
              className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/50"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Stage
            </span>
            <span
              className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#F59E0B]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              AI Role
            </span>
            <span
              className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/50"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Human Role
            </span>
          </div>

          {/* Rows */}
          {aiDevelopmentStages.map((stage, i) => (
            <div
              key={stage.stage}
              className={`grid grid-cols-[140px_1fr_1fr] px-5 py-3.5 ${
                i % 2 === 0 ? "bg-white/5" : "bg-white/10"
              } ${i < aiDevelopmentStages.length - 1 ? "border-b border-white/10" : ""}`}
            >
              <span
                className="text-[13px] font-semibold text-white"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {stage.stage}
              </span>
              <span
                className="text-[12px] text-white/70 leading-relaxed"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {stage.aiRole}
              </span>
              <span
                className="text-[12px] text-white/70 leading-relaxed"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {stage.humanRole}
              </span>
            </div>
          ))}
        </div>

        {/* Callout */}
        <div className="mt-auto rounded-xl bg-white/10 backdrop-blur-sm px-8 py-6 text-center">
          <p
            className="text-[18px] font-bold text-white leading-relaxed"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            AI does the heavy lifting.{" "}
            <span className="gradient-text-orange">
              Humans make the decisions.
            </span>
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}
