import { PageWrapper } from "../page-wrapper";
import { partnershipTypes, partnerLogos } from "../blueprint-data";

const icons = ["Mt", "Cp", "Iv"];

export function PartnershipSection() {
  return (
    <PageWrapper pageNumber={12} bg="white" backgroundImage="/blueprint/12.jpg">
      <div className="flex h-full flex-col">
        {/* Section label */}
        <p
          className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#FBBF24] mb-3"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          11 / Partnership Opportunities
        </p>
        <h2
          className="text-[32px] font-bold tracking-tight text-white mb-3 leading-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Partner With{" "}
          <span className="gradient-text-orange">Z1 Forge</span>
        </h2>
        <p
          className="text-[14px] text-white/70 leading-relaxed mb-8 max-w-lg"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Multiple ways to engage with the next generation of builders, whether
          you&apos;re a mentor, corporation, or investor.
        </p>

        {/* 3-column grid */}
        <div className="grid grid-cols-3 gap-5 mb-8 flex-1">
          {partnershipTypes.map((type, i) => (
            <div
              key={type.title}
              className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 flex flex-col"
            >
              {/* Icon badge */}
              <span
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#F59E0B] text-[14px] font-bold text-black mb-3"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {icons[i]}
              </span>

              {/* Title */}
              <h3
                className="text-[16px] font-bold text-white mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {type.title}
              </h3>

              {/* Description */}
              <p
                className="text-[12px] text-white/70 leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {type.description}
              </p>

              {/* Benefits */}
              <ul className="mt-auto space-y-2">
                {type.benefits.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2 text-[11px] text-white/80 leading-relaxed"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    <span
                      className="mt-[5px] shrink-0 h-1.5 w-1.5 rounded-full bg-[#F59E0B]"
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Partner logos */}
        <div className="mt-auto">
          <p
            className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/50 mb-4 text-center"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Current Partners
          </p>
          <div className="flex items-center justify-center gap-6">
            {partnerLogos.map((partner) => (
              <div
                key={partner.name}
                className="flex items-center justify-center rounded-lg bg-white px-4 py-2.5"
              >
                <img
                  src={partner.src}
                  alt={partner.alt}
                  className="h-6 w-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
