import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { TrackedLink } from "@/components/tracked-link";
import { WeekContent } from "./week-content";
import {
  weeks,
  getWeekBySlug,
  getTotalHours,
} from "../program-data";
import {
  Target,
  Rocket,
  TrendingUp,
  Trophy,
  CheckCircle2,
  Clock,
  ArrowLeft,
  ArrowRight,
  Lightbulb,
  Zap,
  Presentation,
  Users,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

export function generateStaticParams() {
  return weeks.map((w) => ({ week: w.slug }));
}

const phaseIcons: Record<number, typeof Target> = {
  1: Target,
  2: Rocket,
  3: TrendingUp,
  4: Trophy,
};

export default async function WeekPage({
  params,
}: {
  params: Promise<{ week: string }>;
}) {
  const { week: slug } = await params;
  const week = getWeekBySlug(slug);
  if (!week) notFound();

  const PhaseIcon = phaseIcons[week.phase] || Target;
  const totalHrs = getTotalHours(week);

  const prevWeek = weeks.find((w) => w.week === week.week - 1);
  const nextWeek = weeks.find((w) => w.week === week.week + 1);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ====== HERO ====== */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #F59E0B 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative container mx-auto px-6">
          <div className="mx-auto max-w-4xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6">
              <Link
                href="/program"
                className="text-[13px] text-[#9CA3AF] hover:text-[#F59E0B] transition-colors"
              >
                Program
              </Link>
              <span className="text-[#E5E7EB]">/</span>
              <span className="text-[13px] text-[#6B7280]">
                Week {week.week}
              </span>
            </div>

            {/* Phase badge */}
            <div className="flex items-center gap-3 mb-5">
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#FEF3C7]">
                <PhaseIcon className="h-4.5 w-4.5 text-[#D97706]" />
              </span>
              <div>
                <span className="text-[13px] font-semibold text-[#D97706]">
                  Phase {week.phase}: {week.phaseName}
                </span>
                <span className="text-[11px] text-[#9CA3AF] block">
                  {week.phaseGoal}
                </span>
              </div>
            </div>

            {/* Title */}
            <div className="flex items-start gap-4 mb-6">
              <span
                className="shrink-0 flex items-center justify-center w-14 h-14 rounded-2xl bg-[#F59E0B] text-white text-[20px] font-bold"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {String(week.week).padStart(2, "0")}
              </span>
              <div>
                <h1
                  className="font-heading text-[clamp(24px,4vw,40px)] font-bold tracking-tight text-[#111827] mb-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {week.title}
                </h1>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold bg-[#FEF3C7] text-[#D97706]">
                    <Clock className="h-3 w-3" />
                    ~{totalHrs} total hours
                  </span>
                  {week.roles.map((r) => (
                    <span
                      key={r.code}
                      className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium bg-[#F3F4F6] text-[#6B7280]"
                    >
                      <span className="font-bold text-[#D97706] font-mono">
                        {r.code}
                      </span>
                      ~{r.estimatedHours}h
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== SHIP TARGET ====== */}
      <section className="border-y border-[#E5E7EB]">
        <div className="container mx-auto px-6 py-6">
          <div className="mx-auto max-w-4xl flex items-start gap-3">
            <Zap className="h-5 w-5 shrink-0 text-[#D97706] mt-0.5" />
            <div>
              <p
                className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#D97706] mb-1"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Ship Target
              </p>
              <p className="text-[15px] text-[#111827] leading-relaxed">
                {week.shipTarget}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====== PRINCIPLE + CHALLENGE + WEBINAR + COLLABS + MENTOR ====== */}
      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-4 md:grid-cols-2 mb-6">
              {/* Principle */}
              <div className="rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-4 w-4 text-[#D97706]" />
                  <span
                    className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#D97706]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Z1 Principle
                  </span>
                </div>
                <h3
                  className="text-[18px] font-bold text-[#111827] mb-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  &ldquo;{week.principle.name}&rdquo;
                </h3>
                <p className="text-[14px] text-[#6B7280] leading-relaxed">
                  {week.principle.quote}
                </p>
              </div>

              {/* Challenge */}
              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Trophy className="h-4 w-4 text-[#D97706]" />
                  <span
                    className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#D97706]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Weekly Challenge
                  </span>
                </div>
                <h3
                  className="text-[16px] font-bold text-[#111827] mb-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {week.challenge.name}
                </h3>
                <p className="text-[14px] text-[#6B7280] leading-relaxed mb-3">
                  {week.challenge.description}
                </p>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#D97706]" />
                  <span className="text-[12px] font-semibold text-[#D97706]">
                    Success: {week.challenge.successCriteria}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3 mb-6">
              {/* Webinar */}
              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Presentation className="h-4 w-4 text-[#D97706]" />
                  <span
                    className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#D97706]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Webinar
                  </span>
                </div>
                <p className="text-[14px] font-medium text-[#111827]">
                  {week.webinar}
                </p>
              </div>

              {/* Collaborations */}
              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-[#D97706]" />
                  <span
                    className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#D97706]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Collaboration Spotlight
                  </span>
                </div>
                <div className="space-y-2">
                  {week.collaborations.map((c, i) => (
                    <div key={i}>
                      <p className="text-[13px] font-bold text-[#111827]">
                        {c.roles}
                      </p>
                      <p className="text-[13px] text-[#6B7280] leading-relaxed">
                        {c.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mentor */}
              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
                <div className="flex items-center gap-2 mb-2">
                  <MessageCircle className="h-4 w-4 text-[#D97706]" />
                  <span
                    className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#D97706]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Mentor Booking
                  </span>
                </div>
                <p className="text-[13px] text-[#6B7280] leading-relaxed">
                  {week.mentorBooking}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== ROLE CHECKLISTS (Client Component) ====== */}
      <WeekContent week={week} />

      {/* ====== MILESTONE ====== */}
      <section className="bg-[#FEFCE8] py-12 md:py-16">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FDE68A] bg-white px-5 py-2.5">
              <CheckCircle2 className="h-5 w-5 text-[#F59E0B]" />
              <span
                className="text-[15px] font-bold text-[#111827]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Milestone: {week.milestone}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ====== NAVIGATION ====== */}
      <section className="bg-white py-12 md:py-16 border-t border-[#E5E7EB]">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl flex items-center justify-between">
            {prevWeek ? (
              <TrackedLink
                href={`/program/${prevWeek.slug}`}
                eventName="program_week_navigate"
                eventProperties={{ direction: "prev", from_week: String(week.week), to_week: String(prevWeek.week) }}
                className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] px-5 py-2.5 text-[13px] font-medium text-[#6B7280] transition-all hover:border-[#F59E0B] hover:text-[#D97706]"
              >
                <ArrowLeft className="h-4 w-4" />
                Week {prevWeek.week}
              </TrackedLink>
            ) : (
              <Link
                href="/program"
                className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] px-5 py-2.5 text-[13px] font-medium text-[#6B7280] transition-all hover:border-[#F59E0B] hover:text-[#D97706]"
              >
                <ArrowLeft className="h-4 w-4" />
                Program Overview
              </Link>
            )}

            <Link
              href="/program"
              className="text-[13px] font-medium text-[#9CA3AF] hover:text-[#F59E0B] transition-colors"
            >
              All Weeks
            </Link>

            {nextWeek ? (
              <TrackedLink
                href={`/program/${nextWeek.slug}`}
                eventName="program_week_navigate"
                eventProperties={{ direction: "next", from_week: String(week.week), to_week: String(nextWeek.week) }}
                className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] px-5 py-2.5 text-[13px] font-medium text-[#6B7280] transition-all hover:border-[#F59E0B] hover:text-[#D97706]"
              >
                Week {nextWeek.week}
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
            ) : (
              <Link
                href="/program"
                className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] px-5 py-2.5 text-[13px] font-medium text-[#6B7280] transition-all hover:border-[#F59E0B] hover:text-[#D97706]"
              >
                Back to Program
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
