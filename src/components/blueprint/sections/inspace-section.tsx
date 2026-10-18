import { PageWrapper } from "../page-wrapper";
import { inSpaceContent } from "../blueprint-data";

export function InSpaceSection() {
  return (
    <PageWrapper pageNumber={10} bg="gray" backgroundImage="/blueprint/10.jpg">
      <div className="flex h-full flex-col">
        {/* Section label */}
        <p
          className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#F59E0B] mb-3"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          09 / InSpace &amp; Community
        </p>
        <h2
          className="text-[32px] font-bold tracking-tight text-white mb-3 leading-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Where the Community{" "}
          <span className="gradient-text-orange">Comes Alive</span>
        </h2>
        <p
          className="text-[14px] text-white/70 leading-relaxed mb-8 max-w-lg"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {inSpaceContent.subtitle}
        </p>

        {/* 3 Format cards */}
        <div className="space-y-4 mb-8">
          {inSpaceContent.formats.map((format) => (
            <div
              key={format.name}
              className="rounded-xl border border-white/10 bg-white/10 backdrop-blur-sm p-5 flex items-start gap-4"
            >
              <span
                className="inline-flex items-center justify-center w-10 h-10 shrink-0 rounded-xl bg-white/15 backdrop-blur-sm text-[10px] font-bold text-[#F59E0B]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {format.icon}
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3
                    className="text-[15px] font-bold text-white"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {format.name}
                  </h3>
                  {format.frequency && (
                    <span className="inline-flex items-center rounded-full bg-[#F59E0B]/20 px-2 py-0.5 text-[10px] font-semibold text-[#FBBF24]">
                      {format.frequency}
                    </span>
                  )}
                </div>
                <p
                  className="text-[12px] text-white/70 leading-relaxed mb-2"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {format.description}
                </p>
                <p
                  className="text-[11px] text-[#FBBF24] font-medium leading-relaxed"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {format.partnerAngle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Key moments timeline */}
        <div className="mt-auto">
          <p
            className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#F59E0B] mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Key Community Moments
          </p>
          <div className="grid grid-cols-5 gap-3">
            {inSpaceContent.moments.map((m) => (
              <div
                key={m.week}
                className="rounded-lg border border-white/10 bg-white/10 backdrop-blur-sm px-3 py-3 text-center"
              >
                <span
                  className="flex items-center justify-center w-8 h-8 mx-auto mb-1 rounded-lg bg-[#F59E0B]/20 text-[11px] font-bold text-[#FBBF24]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  W{m.week}
                </span>
                <span
                  className="block text-[10px] text-white/70 leading-tight mt-1"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
