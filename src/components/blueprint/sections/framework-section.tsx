import { PageWrapper } from "../page-wrapper";
import {
  HackerIllustration,
  HustlerIllustration,
  HipsterIllustration,
  HoundIllustration,
} from "@/components/role-illustrations";
import { roles, collaborativePairs } from "../blueprint-data";

const illustrations = [
  HackerIllustration,
  HustlerIllustration,
  HipsterIllustration,
  HoundIllustration,
];

export function FrameworkSection() {
  return (
    <PageWrapper pageNumber={6} bg="white" backgroundImage="/blueprint/6.jpg">
      <div className="flex h-full flex-col">
        {/* Section label */}
        <p
          className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#F59E0B] mb-3"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          05 / The 4H Framework
        </p>
        <h2
          className="text-[32px] font-bold tracking-tight text-white mb-3 leading-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Four Roles.{" "}
          <span className="gradient-text-orange">One Team.</span>
        </h2>
        <p
          className="text-[14px] text-white/70 leading-relaxed mb-8 max-w-lg"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Every team is built with four complementary roles that cover every
          function a startup needs — from code to customers.
        </p>

        {/* 2x2 Role Cards */}
        <div className="grid grid-cols-2 gap-5 mb-8">
          {roles.map((role, i) => {
            const Illustration = illustrations[i];
            return (
              <div
                key={role.name}
                className="rounded-xl border border-white/10 bg-white/10 backdrop-blur-sm p-5 flex items-start gap-4"
              >
                <Illustration size={56} className="shrink-0" />
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-[#F59E0B] text-[10px] font-bold text-black"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {["Hk", "Hu", "Hp", "Hd"][i]}
                    </span>
                    <span
                      className="text-[14px] font-bold text-white uppercase tracking-[0.05em]"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {role.name}
                    </span>
                  </div>
                  <p
                    className="text-[12px] font-semibold text-[#FBBF24] mb-1"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {role.description}
                  </p>
                  <p
                    className="text-[12px] text-white/70 leading-relaxed"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {role.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Collaborative Pairs */}
        <div className="mt-auto">
          <p
            className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#F59E0B] mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Collaborative Pairs
          </p>
          <div className="grid grid-cols-3 gap-3">
            {collaborativePairs.map((pair) => {
              const codeMap: Record<string, string> = {
                Hacker: "Hk", Hustler: "Hu", Hipster: "Hp", Hound: "Hd",
              };
              const [a, b] = pair.name.split(" × ");
              const codes = `${codeMap[a]} × ${codeMap[b]}`;
              return (
              <div
                key={pair.name}
                className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm px-3 py-2.5"
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span
                    className="text-[10px] font-bold text-[#FBBF24]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {codes}
                  </span>
                  <span
                    className="text-[12px] font-semibold text-white"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {pair.nickname}
                  </span>
                </div>
                <span
                  className="block text-[10px] text-white/50"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Weeks {pair.weeks}
                </span>
              </div>
              );
            })}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
