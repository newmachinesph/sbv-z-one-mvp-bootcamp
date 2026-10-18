import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { TrackedLink } from "@/components/tracked-link";
import { ProgramContent } from "./program-content";
import {
  Target,
  Rocket,
  TrendingUp,
  Trophy,
  BookOpen,
  MessageCircle,
  CalendarDays,
  Users,
  CheckCircle2,
  Code,
  Briefcase,
  Palette,
  Search,
  Zap,
  Globe,
  Building2,
  Landmark,
  Scale,
  BarChart3,
  Award,
  ArrowRight,
  Cpu,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";

const phaseIcons = [Target, Rocket, TrendingUp, Trophy];

const phases = [
  { name: "Foundation", weeks: "1\u20133", goal: "Clarity & Validation" },
  { name: "Build", weeks: "4\u20137", goal: "Ship MVP Fast" },
  { name: "Traction", weeks: "8\u201310", goal: "Prove Demand" },
  { name: "Demo Day", weeks: "11\u201312", goal: "Investment-Ready" },
];

const weeklyFormat = [
  { icon: BookOpen, label: "1 Core Workshop", detail: "2\u20133 hrs" },
  { icon: Rocket, label: "1 Tactical Build Session", detail: "Hands-on" },
  { icon: MessageCircle, label: "1 Mentor Office Hour", detail: "1-on-1 via SBV Mentor" },
  { icon: CalendarDays, label: "Weekly Milestone Review", detail: "Progress check" },
  { icon: Users, label: "Peer Accountability Circle", detail: "Team sync" },
];

const roles4H = [
  {
    role: "Hacker",
    code: "Hk",
    icon: Code,
    description:
      "Builder + Code Owner. Uses AI-assisted and agentic engineering tools as force multipliers. Spec-Driven Development: Specify, Plan, Tasks, Implement. The Hacker doesn\u2019t just code \u2014 they orchestrate AI agents.",
  },
  {
    role: "Hustler",
    code: "Hu",
    icon: Briefcase,
    description:
      "Seller + Business Lead. Owns revenue, partnerships, investor relations, and go-to-market. Understands GCash/Maya payment flows, local distribution channels, and the OFW/remittance economy.",
  },
  {
    role: "Hipster",
    code: "Hp",
    icon: Palette,
    description:
      "Brand + Growth Marketer. Owns brand, content, social proof, and user acquisition. Builds in public. Creates the narrative that compounds.",
  },
  {
    role: "Hound",
    code: "Hd",
    icon: Search,
    description:
      "Researcher + Data Lead. Owns user research, analytics, competitive intelligence, and product-market fit measurement. The team\u2019s truth-teller.",
  },
];

const graduationCriteria = [
  "Ship a working product with paying users",
  "Present traction metrics",
  "Demo live product on InSpace Pitch",
  "Complete investor-ready pitch submitted to pitch.sbv.one",
  "Revenue is not optional \u2014 it\u2019s a requirement",
];

const ecosystem = [
  {
    name: "Z1 Forge",
    description: "The 12-week build program. This curriculum. Takes founders from idea to shipped product with real users and revenue.",
  },
  {
    name: "Pitch",
    description: "SBV\u2019s investor-readiness platform. Z1 graduates submit final decks to pitch.sbv.one, connecting directly to SBV\u2019s investor network across ASEAN and Greater China.",
  },
  {
    name: "Mentor",
    description: "SBV\u2019s mentor network spanning Fintech, Healthtech, SaaS, Climatetech, AI, and Consumer. Weekly 1-on-1 mentor access. In the trenches with founders throughout the program and beyond.",
  },
  {
    name: "InSpace",
    description: "SBV\u2019s virtual pitch and showcase platform. Demo Day runs through InSpace Pitch. Alumni continue presenting at quarterly InSpace showcases post-graduation.",
  },
];

const phContext = [
  {
    icon: Zap,
    title: "Payment Infrastructure",
    content:
      "GCash (94M+ registered users) and Maya are the dominant payment rails. PayMongo, Xendit, and Dragonpay are the go-to payment gateways. The Philippine e-commerce market is projected to grow from $24.53B (2024) to $75.59B by 2033.",
  },
  {
    icon: BarChart3,
    title: "Funding Landscape",
    content:
      "Key local VCs: Foxmont Capital, Kickstart Ventures, IdeaSpace, Antler Philippines. The Innovative Startup Act\u2019s 2030 Vision targets doubling Filipino startups, raising $10B in investments, and producing four unicorns.",
  },
  {
    icon: Landmark,
    title: "Government Support",
    content:
      "DICT has 2.1B pesos in mobilized funds with a proposed budget of 18.9B pesos for 2026. DTI, DOST, and DICT all run grant and support programs. Regional offices and LGUs have underutilized budgets.",
  },
  {
    icon: Scale,
    title: "Regulatory",
    content:
      "The most common reason for grant rejection is a Notice of Discrepancy from the tax office. A grant-ready company is first and foremost a compliant company. BIR and SEC compliance from Day 1.",
  },
  {
    icon: Building2,
    title: "Market Reality",
    content:
      "Focus areas: payments, lending, digital wallets, logistics, and consumer marketplaces. Median age 25, ~350,000 STEM graduates annually. SBV focuses on Fintech, Healthtech, SaaS, Climatetech, AI, and Consumer.",
  },
  {
    icon: Globe,
    title: "Filipino Advantage",
    content:
      "Filipino founders are more comfortable pitching globally \u2014 English fluency is a real competitive edge for raising from regional and global investors.",
  },
];

const differentiators = [
  "Run by SBV, an ecosystem \u2014 not just a program. Z1 feeds into Pitch, Mentor, and InSpace.",
  "We don\u2019t end at Demo Day. The 90-Day Alumni Track is built in.",
  "Revenue is a graduation requirement. Not optional.",
  "AI-assisted engineering is the default. Production-grade tools with AI as force multiplier.",
  "The 4H Framework creates real accountability. Every role has deliverables every week.",
  "Weekly challenges create urgency and community.",
  "Philippine-contextualized with global ambition. Built for the PH, connected to the world.",
  "Merit-driven. Best ideas win, regardless of background.",
  "Co-building, not just investing. SBV is in the trenches with founders.",
];

const aiTools = [
  {
    name: "Claude Code",
    description: "Best for deep reasoning, complex refactoring, and autonomous multi-file changes. Agent-first: you describe, AI drives, you review.",
  },
  {
    name: "Cursor",
    description: "Best for flow and daily coding. IDE-first: you drive, AI assists. Supports up to eight agents working in parallel.",
  },
  {
    name: "Windsurf",
    description: "Strong alternative with Cascade for agentic workflows and deep context awareness. Middle ground between Cursor and Claude Code.",
  },
];

export default function ProgramPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ====== HERO ====== */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #F59E0B 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(245,158,11,0.2)] bg-[rgba(245,158,11,0.08)] px-4 py-1.5 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F59E0B] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#F59E0B]" />
              </span>
              <span className="text-[13px] font-medium tracking-wide text-[#D97706]">
                2026 Edition
              </span>
            </div>
            <h1
              className="font-heading text-[clamp(32px,5vw,56px)] font-bold tracking-tight text-[#111827] mb-5"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Z1 Forge{" "}
              <span className="gradient-text-orange">by SBV</span>
            </h1>
            <p className="text-[clamp(16px,1.5vw,20px)] text-[#6B7280] leading-relaxed max-w-2xl mx-auto mb-3">
              12-Week Zero to One Build Curriculum + 90-Day Alumni Track
            </p>
            <p className="text-[15px] text-[#9CA3AF] leading-relaxed max-w-xl mx-auto">
              From founder clarity to Demo Day to sustained growth &mdash; a
              structured path to ship your product, acquire real users, generate
              revenue, and present an investment-ready company.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <TrackedLink
                href="/apply"
                eventName="cta_click"
                eventProperties={{ cta: "apply_now", source: "program_hero" }}
                className="btn-glow inline-flex items-center justify-center rounded-full px-7 py-3 text-[14px] text-black font-semibold"
              >
                Apply Now
              </TrackedLink>
              <a
                href="#curriculum"
                className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] px-6 py-3 text-[14px] font-medium text-[#6B7280] transition-all hover:border-[#F59E0B] hover:text-[#D97706]"
              >
                View Program
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ====== PHASE LEGEND ====== */}
      <section className="border-y border-[#E5E7EB]">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-wrap items-center justify-center gap-5 md:gap-8">
            {phases.map((phase, i) => {
              const Icon = phaseIcons[i];
              return (
                <div key={phase.name} className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#FEF3C7]">
                    <Icon className="h-4.5 w-4.5 text-[#D97706]" />
                  </span>
                  <div>
                    <span
                      className="block text-[13px] font-semibold text-[#111827]"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {phase.name}
                    </span>
                    <span className="block text-[11px] text-[#9CA3AF]">
                      Weeks {phase.weeks}
                    </span>
                  </div>
                </div>
              );
            })}
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#FEF3C7]">
                <GraduationCap className="h-4.5 w-4.5 text-[#D97706]" />
              </span>
              <div>
                <span
                  className="block text-[13px] font-semibold text-[#111827]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Alumni
                </span>
                <span className="block text-[11px] text-[#9CA3AF]">
                  90-Day Track
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== WHY THIS EXISTS ====== */}
      <section className="bg-white py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-12">
              <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#F59E0B] mb-4">
                The Gap
              </p>
              <h2
                className="font-heading text-[clamp(24px,3vw,40px)] font-bold tracking-tight text-[#111827] mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Why This Curriculum Exists
              </h2>
            </div>
            <div className="space-y-6 text-[16px] text-[#6B7280] leading-relaxed">
              <p>
                The Philippines is aggressively positioning itself as a pivotal
                player in the Southeast Asian tech ecosystem. Manila&apos;s startup
                ecosystem generated <strong className="text-[#111827]">$6.3 billion</strong> in
                value from mid-2022 to the end of 2024, marking a{" "}
                <strong className="text-[#111827]">35% annual growth rate</strong>. The country
                boasts approximately 1,200 startups, 65 incubators and
                accelerators, 55 venture capitalists, and 210 coworking spaces.
              </p>
              <p>
                Yet the gap is clear: most Philippine accelerators follow a
                traditional three-month cohort model that prioritizes rapid
                pitching and fundraising over sustainable, long-term company
                building. The short-term focus leaves founders stranded once Demo
                Day ends.
              </p>
              <div className="rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-6 md:p-8">
                <p className="text-[#111827] font-semibold mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                  Z1 Forge exists to close that gap.
                </p>
                <p className="text-[#6B7280]">
                  We don&apos;t just prepare founders to pitch &mdash; we prepare them
                  to <strong className="text-[#111827]">ship, sell, and sustain</strong>.
                </p>
              </div>
              <p>
                By the end of 2025, roughly{" "}
                <strong className="text-[#111827]">85% of developers</strong> regularly use AI
                tools for coding. AI-assisted development cuts coding time by
                50&ndash;70%. What used to require a 5-person dev team for 6 months can
                now be shipped by a single Hacker with AI-assisted tools in weeks.
              </p>
              <p className="font-medium text-[#111827]">
                Z1 Forge is built around that reality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====== SBV ECOSYSTEM ====== */}
      <section className="bg-[#111827] py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#F59E0B] mb-4">
                Four Pillars
              </p>
              <h2
                className="font-heading text-[clamp(24px,3vw,40px)] font-bold tracking-tight text-white mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                The SBV Ecosystem
              </h2>
              <p className="text-[16px] text-[#9CA3AF] leading-relaxed max-w-xl mx-auto">
                Z1 Forge doesn&apos;t operate in isolation. It sits within Starting
                Block Ventures&apos; four-pillar ecosystem, each reinforcing the
                others.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {ecosystem.map((item) => (
                <div
                  key={item.name}
                  className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-[#F59E0B]/30 hover:bg-white/[0.07]"
                >
                  <h3
                    className="text-[16px] font-bold text-white mb-2"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {item.name}
                  </h3>
                  <p className="text-[14px] text-[#9CA3AF] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-[14px] text-[#9CA3AF]">
              Based in Makati, Philippines, with reach across ASEAN and Greater
              China.
            </p>
          </div>
        </div>
      </section>

      {/* ====== WEEKLY FORMAT ====== */}
      <section className="bg-[#FEFCE8] py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#F59E0B] mb-4">
                Weekly Rhythm
              </p>
              <h2
                className="font-heading text-[clamp(24px,3vw,40px)] font-bold tracking-tight text-[#111827] mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Program Structure
              </h2>
              <p className="text-[16px] text-[#6B7280] leading-relaxed max-w-xl mx-auto">
                Each week follows a consistent rhythm designed to maximize
                learning and execution.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {weeklyFormat.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="group relative rounded-2xl border border-[#FDE68A] bg-white p-6 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(245,158,11,0.1)] hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#FEF3C7]">
                        <Icon className="h-5 w-5 text-[#D97706]" />
                      </span>
                      <div>
                        <p
                          className="text-[14px] font-semibold text-[#111827]"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          {item.label}
                        </p>
                        <p className="text-[12px] text-[#9CA3AF]">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                    <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ====== 4H FRAMEWORK ====== */}
      <section className="bg-white py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#F59E0B] mb-4">
                Team Structure
              </p>
              <h2
                className="font-heading text-[clamp(24px,3vw,40px)] font-bold tracking-tight text-[#111827] mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                The 4H Framework
              </h2>
              <p className="text-[16px] text-[#6B7280] leading-relaxed max-w-xl mx-auto">
                Every team operates with four roles. In small teams, one person
                may wear multiple hats &mdash; but every function must be covered.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {roles4H.map((r) => {
                const Icon = r.icon;
                return (
                  <div
                    key={r.role}
                    className="group relative rounded-2xl border border-[#E5E7EB] bg-white p-6 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.04)] hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#FEF3C7]">
                        <Icon className="h-5 w-5 text-[#D97706]" />
                      </span>
                      <div>
                        <p
                          className="text-[16px] font-bold text-[#111827]"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          {r.role}
                        </p>
                        <p className="text-[12px] text-[#9CA3AF] font-mono">
                          {r.code}
                        </p>
                      </div>
                    </div>
                    <p className="text-[14px] text-[#6B7280] leading-relaxed">
                      {r.description}
                    </p>
                    <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ====== PH ECOSYSTEM CONTEXT ====== */}
      <section className="bg-[#FEFCE8] py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#F59E0B] mb-4">
                Local Context
              </p>
              <h2
                className="font-heading text-[clamp(24px,3vw,40px)] font-bold tracking-tight text-[#111827] mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Philippine Ecosystem
              </h2>
              <p className="text-[16px] text-[#6B7280] leading-relaxed max-w-xl mx-auto">
                Founders in Z1 Forge should understand the landscape they&apos;re
                building in.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {phContext.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-[#FDE68A] bg-white p-6"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className="h-5 w-5 text-[#D97706]" />
                      <h3
                        className="text-[14px] font-bold text-[#111827]"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-[13px] text-[#6B7280] leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ====== WEEK-BY-WEEK (Client Component) ====== */}
      <div id="curriculum">
        <ProgramContent />
      </div>

      {/* ====== ALUMNI TRACK ====== */}
      <section className="bg-[#111827] py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#F59E0B] mb-4">
                Phase 5
              </p>
              <h2
                className="font-heading text-[clamp(24px,3vw,40px)] font-bold tracking-tight text-white mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Alumni Track &mdash; 90-Day Post-Program
              </h2>
              <p className="text-[16px] text-[#9CA3AF] leading-relaxed max-w-xl mx-auto">
                Most Philippine accelerators leave founders stranded after Demo
                Day. SBV doesn&apos;t. The Alumni Track is built into Z1 Forge.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  month: 1,
                  title: "Double Down",
                  weeks: "13\u201316",
                  focus: "Scale what\u2019s working. Kill what isn\u2019t.",
                  goals: [
                    "Double active users and MRR from Demo Day baseline",
                    "Ship 2\u20133 features based on highest-signal feedback",
                    "Establish repeatable acquisition channel",
                  ],
                },
                {
                  month: 2,
                  title: "Systematize",
                  weeks: "17\u201320",
                  focus: "Turn manual processes into systems.",
                  goals: [
                    "Automate onboarding, support, and key workflows",
                    "Establish content marketing or growth flywheel",
                    "If fundraising: pitch 10+ investors",
                  ],
                },
                {
                  month: 3,
                  title: "Accelerate or Sustain",
                  weeks: "21\u201324",
                  focus: "Raise capital, join another accelerator, or build toward profitability.",
                  goals: [
                    "Close pre-seed or reach ramen profitability",
                    "Complete Alumni Demo Day on InSpace",
                    "90-day roadmap for next phase",
                  ],
                },
              ].map((m) => (
                <div
                  key={m.month}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#F59E0B]/20">
                      <span className="text-[14px] font-bold text-[#F59E0B]">
                        M{m.month}
                      </span>
                    </span>
                    <div>
                      <h3
                        className="text-[16px] font-bold text-white"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {m.title}
                      </h3>
                      <p className="text-[12px] text-[#9CA3AF]">
                        Weeks {m.weeks} &middot; {m.focus}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2 mt-4">
                    {m.goals.map((g, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-[14px] text-[#9CA3AF] leading-relaxed"
                      >
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#F59E0B] mt-0.5" />
                        {g}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
              <h3
                className="text-[16px] font-bold text-white mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Alumni Network (Ongoing)
              </h3>
              <ul className="space-y-2">
                {[
                  "Quarterly Alumni Demo Days on InSpace",
                  "SBV Mentor network for warm intros across ASEAN and Greater China",
                  "Peer community with all Z1 cohorts \u2014 past, present, and future",
                  "Priority access to SBV events and investor pitch sessions",
                  "Connections to PH ecosystem",
                  "Co-working and collaboration with SBV portfolio companies",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-[14px] text-[#9CA3AF] leading-relaxed"
                  >
                    <span className="mt-[7px] shrink-0 h-1.5 w-1.5 rounded-full bg-[#F59E0B]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ====== AI TOOLKIT ====== */}
      <section className="bg-white py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#F59E0B] mb-4">
                For Hackers
              </p>
              <h2
                className="font-heading text-[clamp(24px,3vw,40px)] font-bold tracking-tight text-[#111827] mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                AI-Assisted Engineering Toolkit
              </h2>
              <p className="text-[16px] text-[#6B7280] leading-relaxed max-w-xl mx-auto">
                The Hacker&apos;s primary leverage in 2026 is AI-assisted and
                agentic engineering.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3 mb-8">
              {aiTools.map((tool) => (
                <div
                  key={tool.name}
                  className="group relative rounded-2xl border border-[#E5E7EB] bg-white p-6 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.04)] hover:-translate-y-1"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Cpu className="h-5 w-5 text-[#D97706]" />
                    <h3
                      className="text-[15px] font-bold text-[#111827]"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {tool.name}
                    </h3>
                  </div>
                  <p className="text-[13px] text-[#6B7280] leading-relaxed">
                    {tool.description}
                  </p>
                  <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-6">
                <h4
                  className="text-[14px] font-bold text-[#111827] mb-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Spec-Driven Development
                </h4>
                <p className="text-[13px] text-[#6B7280] leading-relaxed">
                  Write structured specs before prompting AI. The workflow is{" "}
                  <strong className="text-[#111827]">Specify, Plan, Tasks, Implement</strong>.
                  AI-assisted development actually rewards good engineering
                  practices more than traditional coding.
                </p>
              </div>
              <div className="rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-6">
                <h4
                  className="text-[14px] font-bold text-[#111827] mb-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Background Agents
                </h4>
                <p className="text-[13px] text-[#6B7280] leading-relaxed">
                  Modern tools let engineers manage fleets of autonomous coding
                  agents working on separate branches. Each Hacker effectively
                  becomes a team lead overseeing multiple AI streams. Budget{" "}
                  <strong className="text-[#111827]">$60&ndash;200/month</strong> for serious
                  agentic work.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== WHAT MAKES IT DIFFERENT ====== */}
      <section className="bg-[#FEFCE8] py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-12">
              <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#F59E0B] mb-4">
                The Difference
              </p>
              <h2
                className="font-heading text-[clamp(24px,3vw,40px)] font-bold tracking-tight text-[#111827] mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                What Makes Z1 Forge Different
              </h2>
            </div>
            <div className="rounded-2xl border border-[#FDE68A] bg-white p-8 md:p-10">
              <div className="space-y-4">
                {differentiators.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Award className="h-5 w-5 shrink-0 text-[#F59E0B] mt-0.5" />
                    <span className="text-[15px] text-[#111827] leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== GRADUATION CRITERIA ====== */}
      <section className="bg-white py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-12">
              <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#F59E0B] mb-4">
                What It Takes
              </p>
              <h2
                className="font-heading text-[clamp(24px,3vw,40px)] font-bold tracking-tight text-[#111827] mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Graduation Criteria
              </h2>
            </div>
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 md:p-10">
              <div className="space-y-4">
                {graduationCriteria.map((criterion) => (
                  <div key={criterion} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-[#F59E0B] mt-0.5" />
                    <span className="text-[15px] font-medium text-[#111827]">
                      {criterion}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
