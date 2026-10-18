import type { Metadata } from "next";
import Link from "next/link";
import { TrackedLink } from "@/components/tracked-link";
import {
  ArrowRight,
  TrendingUp,
  Building2,
  GraduationCap,
  Heart,
  Handshake,
  Lightbulb,
  Rocket,
  BadgeDollarSign,
  Users,
  Target,
  Globe,
  Briefcase,
  FlaskConical,
  Award,
  MessageSquare,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ParallaxImage } from "@/components/parallax-image";

export const metadata: Metadata = {
  title: "Collaborate",
  description:
    "Partner with Z1 Forge — invest in pre-vetted startups, sponsor challenges, co-develop solutions, or bring your real-world problems to our ventures. Open to investors, corporations, academia, and impact organizations.",
};

/* ─── Investor-side audience cards ─── */
const investorAudience = [
  {
    icon: TrendingUp,
    title: "Investors & VCs",
    description:
      "Front-row access to pre-vetted, product-ready startups before they hit the broader market. Portfolio scouting from Week 1, Demo Day pitches, and co-invest opportunities with SBV.",
  },
  {
    icon: BadgeDollarSign,
    title: "Angel Investors",
    description:
      "Discover early-stage founders who have already shipped a live product with real users and validated revenue — not just an idea on a slide deck.",
  },
  {
    icon: Rocket,
    title: "Startup Accelerators",
    description:
      "Collaborate on deal flow, co-host events, or cross-refer founders. Our graduates leave with products, traction, and a roadmap — ready for your next stage.",
  },
  {
    icon: Award,
    title: "Grant Providers",
    description:
      "Fund impact-driven ventures building solutions for real Philippine and ASEAN communities. Every team ships a measurable product — not a research paper.",
  },
];

/* ─── Institutional-side audience cards ─── */
const institutionalAudience = [
  {
    icon: Building2,
    title: "Private Enterprises & Corporations",
    description:
      "Tap into a curated pipeline of innovation and emerging talent. Sponsor challenges aligned to your industry, recruit top builders, and integrate fresh solutions into your platforms.",
  },
  {
    icon: GraduationCap,
    title: "Academia & Research Institutions",
    description:
      "Bridge the gap between research and product. Partner with founding teams to turn academic insights into deployed technology with real users.",
  },
  {
    icon: Heart,
    title: "Humanitarian & Impact Organizations",
    description:
      "Channel builder energy toward the problems that matter most. Our ventures tackle health, education, climate, and community challenges across ASEAN.",
  },
  {
    icon: Globe,
    title: "Government & Public Sector",
    description:
      "Position your city or region as a launchpad for innovation. Partner with us to nurture local talent and catalyze tech-driven economic development.",
  },
];

/* ─── Ways to collaborate ─── */
const collaborationModes = [
  {
    icon: Handshake,
    title: "Strategic Partnership",
    description:
      "Become a long-term ecosystem partner. Get brand visibility across all SBV platforms, access to every cohort, and a seat at our advisory table.",
  },
  {
    icon: Target,
    title: "Sponsorship",
    description:
      "Sponsor weekly challenges, community events like Grit Chronicles or Breakpoints.live, or Demo Day itself. Your brand in front of builders, mentors, and investors.",
  },
  {
    icon: FlaskConical,
    title: "Project Co-Development",
    description:
      "Co-create solutions with our founding teams. Bring a problem brief, and we will match it with the right venture to prototype, test, and ship.",
  },
  {
    icon: Lightbulb,
    title: "Problem Statements",
    description:
      "Have a real-world challenge your organization needs solved? Share it with us. We will assess how our current or future ventures can address it — from concept to deployed product.",
  },
  {
    icon: Users,
    title: "Mentorship & Expertise",
    description:
      "Share your domain knowledge through structured office hours, workshops, and judging panels. Shape the next generation of product-led founders.",
  },
  {
    icon: Briefcase,
    title: "Talent Pipeline",
    description:
      "Access a pool of cross-functional builders — Hackers, Hustlers, Hipsters, and Hounds — trained through 12 weeks of intense, real-world product development.",
  },
];

/* ─── Stats ─── */
const stats = [
  { value: "12", label: "Weeks per cohort" },
  { value: "4", label: "Roles per team" },
  { value: "1", label: "Live product shipped" },
  { value: "4", label: "SBV platforms" },
];

export default function CollaboratePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ——— Hero ——— */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #F59E0B 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="relative container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(245,158,11,0.2)] bg-[rgba(245,158,11,0.08)] px-4 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F59E0B] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#F59E0B]" />
                </span>
                <span className="text-[13px] font-medium tracking-wide text-[#D97706]">
                  Partners & Collaborators
                </span>
              </span>
            </div>

            <h1
              className="font-heading text-[clamp(32px,5vw,56px)] font-bold tracking-tight text-[#111827] mb-5"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Build the Future{" "}
              <span className="gradient-text-orange">With Us.</span>
            </h1>
            <p className="text-[clamp(16px,1.5vw,20px)] text-[#6B7280] leading-relaxed max-w-2xl mx-auto mb-8">
              Z1 Forge is where pre-vetted teams ship live products every
              cohort. Whether you invest, sponsor, co-develop, or bring a
              real-world problem — there is a seat at our table for you.
            </p>
            <TrackedLink
              href="/contact"
              eventName="cta_click"
              eventProperties={{ cta: "start_conversation", source: "collaborate_hero" }}
              className="btn-glow group inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-[15px] font-semibold text-black"
            >
              Start a Conversation
              <MessageSquare className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* ——— Stats strip ——— */}
      <section className="bg-[#F9FAFB] border-y border-[#E5E7EB]">
        <div className="container mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p
                  className="font-heading text-[clamp(32px,4vw,48px)] font-bold text-[#F59E0B]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {s.value}
                </p>
                <p className="text-[13px] font-medium uppercase tracking-[0.15em] text-[#6B7280] mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Why Collaborate ——— */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#F59E0B] mb-4">
              Why Z1 Forge
            </p>
            <h2
              className="font-heading text-[clamp(28px,4vw,48px)] font-bold tracking-tight text-[#111827] mb-5"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Not a Pitch Competition.{" "}
              <span className="gradient-text-orange">A Build Engine.</span>
            </h2>
            <p className="text-[clamp(16px,1.5vw,20px)] text-[#6B7280] leading-relaxed max-w-2xl mx-auto">
              Unlike traditional accelerators that celebrate decks, we celebrate
              deploys. Every team ships working software to real users every
              single week. Partners and investors engage with founders who have
              already proven they can execute.
            </p>
          </div>

          <div className="mx-auto max-w-4xl grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Builders deserve better than a pitch competition.",
                text: "Most programs celebrate decks. We celebrate deploys. Z1 Forge exists because the best way to build a startup is to actually build one — with a real team, real users, and real deadlines.",
              },
              {
                title: "Every builder in the Philippines ships their first product.",
                text: "We are building the infrastructure for a generation of product-led founders. Not ideas on whiteboards — live products with paying users, launched by teams who learned by doing.",
              },
              {
                title: 'From "someday" to shipped.',
                text: "Twelve weeks. One team. One product. By the end, teams have revenue, users, and a roadmap — not a certificate. The gap between 'I have an idea' and 'I have a company' shrinks every cohort.",
              },
              {
                title: "AI-augmented. Human-directed.",
                text: "AI handles the heavy lifting across every stage of product development — scaffolding, feature building, design, content, research, testing, and polish. Humans make the decisions that matter.",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-8 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.06),0_0_0_2px_rgba(245,158,11,0.15),inset_0_0_0_1px_rgba(245,158,11,0.08)]"
              >
                <span className="absolute top-4 right-6 font-heading text-[56px] md:text-[72px] font-extrabold leading-none text-[#F59E0B]/[0.06] select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="relative">
                  <h3 className="font-heading text-[17px] md:text-[19px] font-bold text-[#111827] leading-snug mb-3">
                    {card.title}
                  </h3>
                  <p className="text-[14px] md:text-[15px] text-[#6B7280] leading-relaxed">
                    {card.text}
                  </p>
                </div>
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Parallax divider ——— */}
      <ParallaxImage
        src="/blueprint/12.jpg"
        alt="Partnership — building together"
        className="h-[280px] md:h-[400px]"
        overlay={
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60 z-[1]" />
            <div className="relative z-10 flex items-center justify-center h-full">
              <p
                className="font-heading text-[clamp(20px,3vw,32px)] font-bold text-white/90 tracking-tight text-center px-6"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Multiple ways to engage. One shared mission.
              </p>
            </div>
          </>
        }
      />

      {/* ——— Investor Audience ——— */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#F59E0B] mb-4">
              For Investors
            </p>
            <h2
              className="font-heading text-[clamp(28px,4vw,48px)] font-bold tracking-tight text-[#111827] mb-5"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Front-Row Access to{" "}
              <span className="gradient-text-orange">What Ships Next.</span>
            </h2>
            <p className="text-[clamp(16px,1.5vw,20px)] text-[#6B7280] leading-relaxed max-w-2xl mx-auto">
              Watch teams evolve from prototypes to live products with real users
              — culminating in Demo Day, where polished products and validated
              metrics are presented to a global audience.
            </p>
          </div>

          <div className="mx-auto max-w-5xl grid sm:grid-cols-2 gap-6">
            {investorAudience.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-7 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.06),0_0_0_2px_rgba(245,158,11,0.15),inset_0_0_0_1px_rgba(245,158,11,0.08)]"
                >
                  <span className="absolute top-4 right-6 font-heading text-[56px] md:text-[72px] font-extrabold leading-none text-[#F59E0B]/[0.06] select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="relative flex flex-col gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#FEF3C7] transition-colors duration-300 group-hover:bg-[#F59E0B]">
                      <Icon className="h-5 w-5 text-[#D97706] transition-colors duration-300 group-hover:text-white" />
                    </div>
                    <div>
                      <h3 className="font-heading text-[17px] md:text-[19px] font-bold text-[#111827] leading-snug mb-2">
                        {item.title}
                      </h3>
                      <p className="text-[14px] md:text-[15px] text-[#6B7280] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ——— Parallax divider — investors to institutions ——— */}
      <ParallaxImage
        src="/blueprint/10.jpg"
        alt="Community events and investor visibility"
        className="h-[240px] md:h-[360px]"
        overlay={
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/50 z-[1]" />
            <div className="relative z-10 flex items-center justify-center h-full">
              <p
                className="font-heading text-[clamp(18px,2.5vw,28px)] font-bold text-white/90 tracking-tight text-center px-6"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                From startups to institutions — everyone has a role in the
                ecosystem.
              </p>
            </div>
          </>
        }
      />

      {/* ——— Institutional Audience ——— */}
      <section className="py-24 md:py-32 bg-[#F9FAFB]">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#F59E0B] mb-4">
              For Institutions
            </p>
            <h2
              className="font-heading text-[clamp(28px,4vw,48px)] font-bold tracking-tight text-[#111827] mb-5"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Innovation Starts{" "}
              <span className="gradient-text-orange">At the Edges.</span>
            </h2>
            <p className="text-[clamp(16px,1.5vw,20px)] text-[#6B7280] leading-relaxed max-w-2xl mx-auto">
              Corporations, universities, and impact organizations bring domain
              expertise and real-world problems. Our ventures bring speed,
              talent, and the relentless focus of builders who ship every week.
            </p>
          </div>

          <div className="mx-auto max-w-5xl grid sm:grid-cols-2 gap-6">
            {institutionalAudience.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-7 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.06),0_0_0_2px_rgba(245,158,11,0.15),inset_0_0_0_1px_rgba(245,158,11,0.08)]"
                >
                  <span className="absolute top-4 right-6 font-heading text-[56px] md:text-[72px] font-extrabold leading-none text-[#F59E0B]/[0.06] select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="relative flex flex-col gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#FEF3C7] transition-colors duration-300 group-hover:bg-[#F59E0B]">
                      <Icon className="h-5 w-5 text-[#D97706] transition-colors duration-300 group-hover:text-white" />
                    </div>
                    <div>
                      <h3 className="font-heading text-[17px] md:text-[19px] font-bold text-[#111827] leading-snug mb-2">
                        {item.title}
                      </h3>
                      <p className="text-[14px] md:text-[15px] text-[#6B7280] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ——— Parallax divider ——— */}
      <ParallaxImage
        src="/blueprint/3.jpg"
        alt="Co-building — partners and founders working together"
        className="h-[240px] md:h-[360px]"
        overlay={
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/50 z-[1]" />
            <div className="relative z-10 flex items-center justify-center h-full">
              <p
                className="font-heading text-[clamp(18px,2.5vw,28px)] font-bold text-white/90 tracking-tight text-center px-6"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                We don&rsquo;t just invest. We roll up our sleeves and build
                alongside founders.
              </p>
            </div>
          </>
        }
      />

      {/* ——— Ways to Collaborate ——— */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#F59E0B] mb-4">
              How We Work Together
            </p>
            <h2
              className="font-heading text-[clamp(28px,4vw,48px)] font-bold tracking-tight text-[#111827] mb-5"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Many Ways to{" "}
              <span className="gradient-text-orange">Collaborate.</span>
            </h2>
            <p className="text-[clamp(16px,1.5vw,20px)] text-[#6B7280] leading-relaxed max-w-2xl mx-auto">
              From sponsoring a single challenge to embedding your problem
              statement into our cohort — we design partnerships that create
              value for everyone involved.
            </p>
          </div>

          <div className="mx-auto max-w-5xl grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {collaborationModes.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-7 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.06),0_0_0_2px_rgba(245,158,11,0.15),inset_0_0_0_1px_rgba(245,158,11,0.08)]"
                >
                  <span className="absolute top-4 right-6 font-heading text-[56px] md:text-[72px] font-extrabold leading-none text-[#F59E0B]/[0.06] select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="relative flex flex-col gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#FEF3C7] transition-colors duration-300 group-hover:bg-[#F59E0B]">
                      <Icon className="h-5 w-5 text-[#D97706] transition-colors duration-300 group-hover:text-white" />
                    </div>
                    <div>
                      <h3 className="font-heading text-[17px] md:text-[19px] font-bold text-[#111827] leading-snug mb-2">
                        {item.title}
                      </h3>
                      <p className="text-[14px] md:text-[15px] text-[#6B7280] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ——— Parallax divider — before open call ——— */}
      <ParallaxImage
        src="/blueprint/5.jpg"
        alt="The road ahead — from challenge to solution"
        className="h-[240px] md:h-[360px]"
        overlay={
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/50 z-[1]" />
            <div className="relative z-10 flex items-center justify-center h-full">
              <p
                className="font-heading text-[clamp(18px,2.5vw,28px)] font-bold text-white/90 tracking-tight text-center px-6"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Your toughest problems. Our sharpest builders.
              </p>
            </div>
          </>
        }
      />

      {/* ——— Bring Your Problem CTA ——— */}
      <section className="bg-[#F9FAFB] py-24 md:py-32 border-t border-[#E5E7EB]">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#F59E0B] mb-4">
              Open Call
            </p>
            <h2
              className="font-heading text-[clamp(28px,4vw,48px)] font-bold tracking-tight text-[#111827] mb-5"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Got a Problem?{" "}
              <span className="gradient-text-orange">
                Let Our Ventures Solve It.
              </span>
            </h2>
            <p className="text-[clamp(16px,1.5vw,18px)] text-[#6B7280] leading-relaxed max-w-2xl mx-auto mb-4">
              If your organization faces a real-world challenge — in logistics,
              health, education, finance, sustainability, or beyond — we want to
              hear about it. Share your problem statement with us, and we will
              assess how our current and future ventures can build a solution.
            </p>
            <p className="text-[clamp(15px,1.4vw,17px)] text-[#6B7280] leading-relaxed max-w-2xl mx-auto mb-10">
              Our teams don&rsquo;t just brainstorm. They ship production-ready
              products in 12 weeks — with real users, real data, and a real path
              to scale. Your challenge could become their next venture.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <TrackedLink
                href="/contact"
                eventName="cta_click"
                eventProperties={{ cta: "discuss_challenge", source: "collaborate_open_call" }}
                className="btn-glow group inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-[15px] font-semibold text-black"
              >
                Discuss a Challenge
                <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
              </TrackedLink>
              <a
                href="mailto:partnerships@sbv.one"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-8 py-4 text-[15px] font-semibold text-[#111827] transition-all duration-300 hover:border-[#F59E0B]/40 hover:text-[#D97706] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
              >
                Email Us Directly
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ——— Core values recap ——— */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#F59E0B] mb-4">
              Our Partnership Values
            </p>
            <h2
              className="font-heading text-[clamp(28px,4vw,48px)] font-bold tracking-tight text-[#111827] mb-5"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              How We Treat{" "}
              <span className="gradient-text-orange">Every Partner.</span>
            </h2>
          </div>

          <div className="mx-auto max-w-4xl grid sm:grid-cols-2 gap-6">
            {[
              {
                num: "01",
                title: "Merit-Driven",
                text: "The best ideas win, regardless of background. Our selection focuses purely on potential and execution capability — ensuring partners engage with top-tier talent.",
              },
              {
                num: "02",
                title: "Co-Building",
                text: "We don't just invest — we roll up our sleeves and build alongside founders. Partners and mentors become active collaborators, not passive observers.",
              },
              {
                num: "03",
                title: "Long-Term Partnership",
                text: "Building great companies takes time. Relationships forged during the program extend into the alumni network, deal flow pipeline, and ongoing co-building.",
              },
              {
                num: "04",
                title: "Global Mindset",
                text: "Rooted in the Philippines, thinking globally. Our network spans ASEAN, Greater China, and beyond — opening doors for partners seeking regional reach.",
              },
            ].map((v) => (
              <div
                key={v.num}
                className="group relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-8 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.06),0_0_0_2px_rgba(245,158,11,0.15),inset_0_0_0_1px_rgba(245,158,11,0.08)]"
              >
                <span className="absolute top-4 right-6 font-heading text-[56px] md:text-[72px] font-extrabold leading-none text-[#F59E0B]/[0.06] select-none">
                  {v.num}
                </span>
                <div className="relative">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#FEF3C7] text-[13px] font-bold text-[#D97706] mb-4 transition-colors duration-300 group-hover:bg-[#F59E0B] group-hover:text-white font-heading">
                    {v.num}
                  </span>
                  <h3 className="font-heading text-[17px] md:text-[19px] font-bold text-[#111827] leading-snug mb-2">
                    {v.title}
                  </h3>
                  <p className="text-[14px] md:text-[15px] text-[#6B7280] leading-relaxed">
                    {v.text}
                  </p>
                </div>
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
