import { PageWrapper } from "../page-wrapper";
import { aboutSbv } from "../blueprint-data";

export function AboutSbv() {
  return (
    <PageWrapper pageNumber={3} bg="white" backgroundImage="/blueprint/3.jpg">
      <div className="flex h-full flex-col">
        {/* Section label */}
        <p
          className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#FBBF24] mb-3"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          02 / About SBV
        </p>
        <h2
          className="text-[32px] font-bold tracking-tight text-white mb-3 leading-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          From Service Provider to{" "}
          <span className="gradient-text-orange">Ecosystem Architect</span>
        </h2>
        <p
          className="text-[14px] text-white/70 leading-relaxed mb-8 max-w-lg"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          The venture studio behind Z1 Forge, and why we built it.
        </p>

        {/* Origin paragraphs */}
        <div className="space-y-5 mb-8">
          {aboutSbv.origin.map((p, i) => (
            <p
              key={i}
              className="text-[14px] leading-[1.8] text-white/80"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {p}
            </p>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-[#F59E0B]/30 via-white/10 to-[#F59E0B]/30 mb-8" />

        {/* Core Values */}
        <div>
          <p
            className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#FBBF24] mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Our Core Values
          </p>
          <div className="grid grid-cols-2 gap-4">
            {aboutSbv.values.map((value, i) => (
              <div
                key={value.title}
                className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-5"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <span
                    className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#F59E0B] text-[11px] font-bold text-black"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4
                    className="text-[14px] font-bold text-white"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {value.title}
                  </h4>
                </div>
                <p
                  className="text-[12px] text-white/70 leading-relaxed pl-[38px]"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Purpose callout */}
        <div className="mt-auto rounded-xl bg-white/10 backdrop-blur-sm px-8 py-5 text-center">
          <p
            className="text-[16px] font-bold text-white leading-relaxed"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            &ldquo;{aboutSbv.purposeQuote}&rdquo;
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}
