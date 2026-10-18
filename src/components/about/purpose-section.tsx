"use client";

import { FadeInView } from "@/components/home/fade-in-view";

const cards = [
  {
    label: "Purpose",
    title: "Builders deserve better than a pitch competition.",
    body: "Most programs celebrate decks. We celebrate deploys. Z1 exists because the best way to learn how to build a startup is to actually build one — with a real team, real users, and real deadlines. Every Friday.",
  },
  {
    label: "North Star",
    title: "Every builder in the Philippines ships their first product.",
    body: "We\u2019re building the infrastructure for a generation of product-led founders. Not just ideas on whiteboards — live products with paying users, launched by teams who learned by doing.",
  },
  {
    label: "Impact",
    title: 'From "someday" to shipped.',
    body: "Twelve weeks. One team. One product. By the end, you have revenue, users, and a roadmap — not a certificate. The gap between \u201CI have an idea\u201D and \u201CI have a company\u201D gets smaller every cohort.",
  },
];

export default function PurposeSection() {
  return (
    <section className="bg-[#F9FAFB] py-24 md:py-32">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <FadeInView>
            <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#F59E0B] mb-4">
              The Why
            </p>
          </FadeInView>
          <FadeInView delay={0.1}>
            <h2
              className="font-heading text-[clamp(32px,4vw,56px)] font-bold tracking-tight text-[#111827] mb-5"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Not a Mission Statement.
              <br />
              A <span className="gradient-text-orange">Reason to Exist.</span>
            </h2>
          </FadeInView>
          <FadeInView delay={0.2}>
            <p className="text-[clamp(16px,1.5vw,20px)] text-[#6B7280] leading-relaxed max-w-2xl mx-auto">
              We didn&apos;t write a vision on a wall. We built a program around
              a conviction: the world has enough pitch decks and not enough live
              products.
            </p>
          </FadeInView>
        </div>

        {/* Cards */}
        <div className="mx-auto max-w-5xl grid gap-6 md:grid-cols-3">
          {cards.map((card, i) => (
            <FadeInView key={card.label} delay={i * 0.08}>
              <div className="group relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-7 h-full transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.06),0_0_0_2px_rgba(245,158,11,0.15),inset_0_0_0_1px_rgba(245,158,11,0.08)]">
                <div className="relative flex flex-col gap-4">
                  {/* Label */}
                  <span
                    className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F59E0B]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {card.label}
                  </span>

                  {/* Title */}
                  <h3
                    className="text-[19px] md:text-[21px] font-bold text-[#111827] leading-snug"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {card.title}
                  </h3>

                  {/* Divider */}
                  <div className="h-px w-full bg-[#E5E7EB]" />

                  {/* Body */}
                  <p className="text-[14px] md:text-[15px] text-[#6B7280] leading-relaxed">
                    {card.body}
                  </p>
                </div>

                {/* Hover accent line */}
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
