import { PageWrapper } from "../page-wrapper";
import { programPhases, weeklyRhythm } from "../blueprint-data";

export function ProgramOverview() {
  return (
    <PageWrapper pageNumber={7} bg="gray" backgroundImage="/blueprint/7.jpg">
      <div className="flex h-full flex-col">
        {/* Section label */}
        <p
          className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#F59E0B] mb-3"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          06 / Program Overview
        </p>
        <h2
          className="text-[32px] font-bold tracking-tight text-white mb-8 leading-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          12 Weeks.{" "}
          <span className="gradient-text-orange">7 Phases.</span>
        </h2>

        {/* Vertical timeline */}
        <div className="relative mb-10">
          {/* Vertical line */}
          <div className="absolute left-[18px] top-2 bottom-2 w-px bg-white/15" />

          <div className="space-y-5">
            {programPhases.map((phase, i) => (
              <div key={phase.name} className="relative flex items-start gap-5 pl-0">
                {/* Timeline dot */}
                <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[#F59E0B] bg-black/60 backdrop-blur-sm">
                  <span
                    className="text-[11px] font-bold text-[#FBBF24]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 rounded-xl border border-white/10 bg-white/10 backdrop-blur-sm px-5 py-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="text-[15px] font-bold text-white"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {phase.name}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-[#F59E0B]/20 px-2.5 py-0.5 text-[10px] font-semibold text-[#FBBF24]">
                      Week {phase.weeks}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {phase.milestones.map((m) => (
                      <span
                        key={m}
                        className="inline-flex items-center rounded-md bg-white/10 px-2.5 py-1 text-[11px] text-white/70"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Rhythm Grid */}
        <div className="mt-auto">
          <p
            className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#F59E0B] mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Weekly Rhythm
          </p>
          <div className="grid grid-cols-5 gap-3">
            {weeklyRhythm.map((item) => (
              <div
                key={item.day}
                className="rounded-lg border border-white/10 bg-white/10 backdrop-blur-sm px-3 py-3 text-center"
              >
                <span
                  className="flex items-center justify-center w-8 h-8 mx-auto mb-1 rounded-lg bg-[#F59E0B]/20 text-[11px] font-bold text-[#FBBF24]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {item.day.charAt(0)}
                </span>
                <span
                  className="block text-[11px] font-bold text-white mb-0.5"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {item.day}
                </span>
                <span
                  className="block text-[10px] text-white/50 leading-tight"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {item.activity}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
