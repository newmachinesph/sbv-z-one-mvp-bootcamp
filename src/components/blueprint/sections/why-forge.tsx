import { PageWrapper } from "../page-wrapper";
import { whyForge } from "../blueprint-data";

export function WhyForge() {
  return (
    <PageWrapper pageNumber={4} bg="gray" backgroundImage="/blueprint/4.jpg">
      <div className="flex h-full flex-col">
        {/* Section label */}
        <p
          className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#F59E0B] mb-3"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          03 / Why Z1 Forge
        </p>
        <h2
          className="text-[32px] font-bold tracking-tight text-white mb-3 leading-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Not a Mission Statement.{" "}
          <span className="gradient-text-orange">A Reason to Exist.</span>
        </h2>
        <p
          className="text-[14px] text-white/70 leading-relaxed mb-10 max-w-lg"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          The world has enough pitch decks and not enough live products. Here&apos;s
          why that matters for the partners and mentors who work with us.
        </p>

        {/* 3 Purpose cards */}
        <div className="space-y-5 mb-8">
          {whyForge.pillars.map((pillar) => (
            <div
              key={pillar.label}
              className="rounded-xl border border-white/10 bg-white/10 backdrop-blur-sm p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="inline-flex items-center rounded-full bg-[#F59E0B]/20 px-3 py-1 text-[11px] font-bold text-[#FBBF24] uppercase tracking-[0.1em]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {pillar.label}
                </span>
                <h3
                  className="text-[16px] font-bold text-white"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {pillar.title}
                </h3>
              </div>
              <p
                className="text-[13px] text-white/70 leading-[1.8]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {pillar.body}
              </p>
            </div>
          ))}
        </div>

        {/* Market scope */}
        <div className="mt-auto">
          <p
            className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#F59E0B] mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Market Scope
          </p>
          <div className="grid grid-cols-2 gap-3">
            {whyForge.marketScope.map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-white/10 bg-white/10 backdrop-blur-sm px-4 py-3"
              >
                <h4
                  className="text-[13px] font-bold text-white mb-1"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {item.title}
                </h4>
                <p
                  className="text-[11px] text-white/50 leading-relaxed"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
