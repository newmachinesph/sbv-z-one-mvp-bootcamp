import { PageWrapper } from "../page-wrapper";
import { visionMission } from "../blueprint-data";

export function VisionMission() {
  return (
    <PageWrapper pageNumber={5} bg="white" backgroundImage="/blueprint/5.jpg">
      <div className="flex h-full flex-col">
        {/* Section label */}
        <p
          className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#FBBF24] mb-3"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          04 / Vision, Mission &amp; Goals
        </p>
        <h2
          className="text-[32px] font-bold tracking-tight text-white mb-10 leading-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Where We&rsquo;re Going.{" "}
          <span className="gradient-text-orange">Why It Matters.</span>
        </h2>

        {/* Vision */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span
              className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#F59E0B] text-[13px] font-bold text-black"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              V
            </span>
            <h3
              className="text-[18px] font-bold text-white"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Our Vision
            </h3>
          </div>
          <p
            className="text-[14px] leading-[1.8] text-white/80 pl-[52px]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {visionMission.vision}
          </p>
        </div>

        {/* Mission */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span
              className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/15 text-[13px] font-bold text-[#F59E0B]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              M
            </span>
            <h3
              className="text-[18px] font-bold text-white"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Our Mission
            </h3>
          </div>
          <p
            className="text-[14px] leading-[1.8] text-white/80 pl-[52px]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {visionMission.mission}
          </p>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-[#F59E0B]/30 via-white/10 to-[#F59E0B]/30 mb-8" />

        {/* Strategic Goals */}
        <div>
          <p
            className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#FBBF24] mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Strategic Goals &amp; Objectives
          </p>
          <div className="grid grid-cols-2 gap-4">
            {visionMission.goals.map((goal, i) => (
              <div
                key={goal.title}
                className="rounded-xl border border-white/10 bg-white/5 p-5"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <span
                    className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#F59E0B]/20 text-[11px] font-bold text-[#FBBF24]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4
                    className="text-[14px] font-bold text-white"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {goal.title}
                  </h4>
                </div>
                <ul className="space-y-1.5 pl-[38px]">
                  {goal.objectives.map((obj) => (
                    <li
                      key={obj}
                      className="flex items-start gap-2 text-[12px] text-white/70 leading-relaxed"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      <span className="mt-[6px] shrink-0 h-1.5 w-1.5 rounded-full bg-[#F59E0B]" />
                      {obj}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
