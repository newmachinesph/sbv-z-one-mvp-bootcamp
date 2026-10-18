"use client";

import { useState } from "react";
import posthog from "posthog-js";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  MapPin,
  Linkedin,
  Send,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

/* ─── Contact info cards ─── */
const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@sbv.one",
    href: "mailto:hello@sbv.one",
  },
  {
    icon: Mail,
    label: "Partnerships",
    value: "partnerships@sbv.one",
    href: "mailto:partnerships@sbv.one",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Makati, Philippines",
    href: null,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Starting Block Ventures",
    href: "https://www.linkedin.com/company/starting-block-ventures",
  },
];

/* ─── FAQ items ─── */
const faqs = [
  {
    question: "What is Z1 Forge and how does it work?",
    answer:
      "Z1 Forge is a 12-week startup bootcamp where teams of 4 build, ship, and launch a live product. Each team follows the 4H framework — Hacker (builds), Hustler (sells), Hipster (brands), and Hound (researches). Every week has a ship target, a scored challenge, and mentor feedback. By Week 12, you present at Demo Day with a production-deployed product, real users, and a pitch deck.",
  },
  {
    question: "Do I need a team to apply, or can I apply solo?",
    answer:
      "You can apply as an individual — no team required. We match solo applicants into teams of 4 based on your preferred role (Hacker, Hustler, Hipster, or Hound) and complementary skills. If you already have a partial or full team, you can note that in your application and we'll keep you together.",
  },
  {
    question: "How much does it cost to join?",
    answer:
      "Cohort 1 is completely free. We want to prove the model with the first batch of builders before introducing any pricing. You get access to the full 12-week curriculum, on-demand mentors, weekly challenges, community events, and Demo Day — all at no cost.",
  },
  {
    question: "What is the time commitment each week?",
    answer:
      "Expect to dedicate 20–25 hours per week. The weekly rhythm is structured: Monday sprint kickoff, Tuesday–Thursday build time, Wednesday mid-week challenge, Friday ship review, and Saturday retrospective. The program is remote-first, so you can work from anywhere.",
  },
  {
    question: "What do I walk away with after 12 weeks?",
    answer:
      "A live production-deployed product with 50+ signups and 10+ active users, 2+ third-party integrations, payment billing with free and paid tiers, an investor-ready pitch deck, a 90-day product roadmap, brand identity and social presence, and your first revenue or validated pricing. Your Demo Day pitch is published on our Pitch platform and presented to investors worldwide — not just a room of a handful of local investors.",
  },
  {
    question: "What role does AI play in the program?",
    answer:
      "AI is a co-pilot, not a replacement. It pair-programs with your Hacker, drafts copy for your Hustler, generates design variations for your Hipster, and synthesizes research for your Hound. Your team makes every strategic decision — AI handles the heavy lifting so you can ship faster.",
  },
  {
    question: "What are the four platforms in the SBV ecosystem?",
    answer:
      "Forge (z1.sbv.one) handles intake, team matching, and progress tracking. Mentor (mentor.sbv.one) connects you with expert mentors on demand. Pitch (pitch.sbv.one) manages pitch deck submissions and investor visibility. InSpace (inspace.sbv.one) hosts community events — monthly Grit Chronicles founder firesides, Breakpoints.live challenge streams, and Demo Day.",
  },
  {
    question: "Where is the program based?",
    answer:
      "The program is remote-first and open globally. Our base is in Makati, Philippines, and we partner with Incub8space for optional coworking. Weekly ship reviews and community events happen online, so you can participate from anywhere in the world.",
  },
];

/* ─── Form types ─── */
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

/* ─── FAQ accordion section ─── */
function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#F59E0B] mb-4">
            FAQ
          </p>
          <h2
            className="font-heading text-[clamp(32px,4vw,56px)] font-bold tracking-tight text-[#111827] mb-5"
          >
            Frequently Asked{" "}
            <span className="gradient-text-orange">Questions</span>
          </h2>
          <p className="text-[clamp(16px,1.5vw,20px)] text-[#6B7280] leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about Z1 Forge, the 4H framework, and
            how to get started.
          </p>
        </div>

        {/* FAQ items */}
        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;

            return (
              <div
                key={i}
                className="group relative rounded-2xl border border-[#E5E7EB] bg-white transition-all duration-500 hover:shadow-[0_12px_40px_rgba(0,0,0,0.04),0_0_0_2px_rgba(245,158,11,0.12)]"
              >
                <button
                  type="button"
                  onClick={() => { setOpenIndex(isOpen ? null : i); if (!isOpen) posthog.capture("faq_open", { question: faq.question }); }}
                  className="flex w-full items-center gap-5 px-6 py-5 text-left"
                >
                  {/* Index */}
                  <span
                    className="font-heading shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-[#FEF3C7] text-[13px] font-bold text-[#D97706] transition-colors duration-300 group-hover:bg-[#F59E0B] group-hover:text-white"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Divider */}
                  <div className="shrink-0 w-px h-6 bg-[#E5E7EB]" />

                  {/* Question */}
                  <span className="flex-1 text-[15px] md:text-[16px] text-[#111827] leading-relaxed font-medium">
                    {faq.question}
                  </span>

                  {/* Chevron */}
                  <ChevronDown
                    className={`shrink-0 h-5 w-5 text-[#9CA3AF] transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#F59E0B]" : ""
                    }`}
                  />
                </button>

                {/* Answer */}
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    maxHeight: isOpen ? "300px" : "0px",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="px-6 pb-6 pl-[88px]">
                    <p className="text-[14px] md:text-[15px] text-[#6B7280] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>

                {/* Hover accent line */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate(): FormErrors {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email.";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required.";
    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
    } else if (formData.message.trim().length < 20) {
      newErrors.message = "Please write at least 20 characters.";
    }
    return newErrors;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const data = await res.json();
        setErrors({ message: data.error || "Something went wrong." });
        setIsSubmitting(false);
        return;
      }
      setSubmitted(true);
      posthog.capture("contact_form_submitted", { subject: formData.subject });
    } catch {
      setErrors({ message: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  }

  function updateField(field: keyof FormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ——— Hero ——— */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Background subtle grid */}
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
            <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#F59E0B] mb-4">
              Contact
            </p>
            <h1
              className="font-heading text-[clamp(32px,5vw,56px)] font-bold tracking-tight text-[#111827] mb-5"
            >
              Get in Touch
            </h1>
            <p className="text-[clamp(16px,1.5vw,20px)] text-[#6B7280] leading-relaxed max-w-2xl mx-auto">
              Have a question about the program, partnerships, or want to get
              involved? We&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* ——— Contact cards ——— */}
      <section className="relative pb-24 md:pb-32">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl grid gap-4 grid-cols-1 md:grid-cols-2">
            {contactInfo.map((item, i) => {
              const Icon = item.icon;
              const Wrapper = item.href ? "a" : "div";
              const wrapperProps = item.href
                ? {
                    href: item.href,
                    target: item.href.startsWith("http")
                      ? ("_blank" as const)
                      : undefined,
                    rel: item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined,
                  }
                : {};

              return (
                <Wrapper
                  key={item.label}
                  {...wrapperProps}
                  className="group relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-7 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.06),0_0_0_2px_rgba(245,158,11,0.15),inset_0_0_0_1px_rgba(245,158,11,0.08)]"
                >
                  {/* Ghost index */}
                  <span className="absolute top-4 right-6 font-heading text-[56px] md:text-[72px] font-extrabold leading-none text-[#F59E0B]/[0.06] select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="relative flex flex-col gap-4">
                    {/* Icon */}
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#FEF3C7] transition-colors duration-300 group-hover:bg-[#F59E0B]">
                      <Icon className="h-5 w-5 text-[#D97706] transition-colors duration-300 group-hover:text-white" />
                    </div>

                    {/* Text */}
                    <div>
                      <span
                        className="font-heading block text-[11px] font-bold uppercase tracking-[0.2em] text-[#F59E0B] mb-1"
                      >
                        {item.label}
                      </span>
                      <p className="font-heading text-[17px] md:text-[19px] font-bold text-[#111827] leading-snug">
                        {item.value}
                      </p>
                    </div>
                  </div>

                  {/* Hover accent line */}
                  <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Wrapper>
              );
            })}
          </div>
        </div>
      </section>

      {/* ——— FAQ ——— */}
      <FaqSection />

      {/* ——— Inquiry form ——— */}
      <section className="bg-[#F9FAFB] py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-2xl">
            {/* Header */}
            <div className="text-center mb-12">
              <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#F59E0B] mb-4">
                Inquiry
              </p>
              <h2
                className="font-heading text-[clamp(28px,4vw,44px)] font-bold tracking-tight text-[#111827] mb-4"
              >
                Send Us a{" "}
                <span className="gradient-text-orange">Message</span>
              </h2>
              <p className="text-[16px] text-[#6B7280] leading-relaxed">
                Fill out the form below and we&apos;ll get back to you within 48
                hours.
              </p>
            </div>

            {/* Success state */}
            {submitted ? (
              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-10 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#FEF3C7]">
                  <CheckCircle className="h-8 w-8 text-[#D97706]" />
                </div>
                <h3
                  className="font-heading text-[22px] font-bold text-[#111827] mb-2"
                >
                  Message Sent!
                </h3>
                <p className="text-[15px] text-[#6B7280] mb-8 max-w-sm mx-auto">
                  Thank you, {formData.name}. We&apos;ll get back to you at{" "}
                  <strong className="text-[#111827]">{formData.email}</strong>{" "}
                  within 48 hours.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#111827] transition-colors duration-300 hover:text-[#F59E0B]"
                >
                  Back to Home
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              /* Form card */
              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name + Email row */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label
                        htmlFor="contact-name"
                        className="text-[13px] font-semibold text-[#111827]"
                      >
                        Full Name
                      </label>
                      <Input
                        id="contact-name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        aria-invalid={!!errors.name}
                        className="rounded-xl border-[#E5E7EB] focus-visible:ring-[#F59E0B]/30 focus-visible:border-[#F59E0B]"
                      />
                      {errors.name && (
                        <p className="flex items-center gap-1 text-[13px] text-red-500">
                          <AlertCircle className="h-3.5 w-3.5" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="contact-email"
                        className="text-[13px] font-semibold text-[#111827]"
                      >
                        Email Address
                      </label>
                      <Input
                        id="contact-email"
                        type="email"
                        placeholder="you@email.com"
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        aria-invalid={!!errors.email}
                        className="rounded-xl border-[#E5E7EB] focus-visible:ring-[#F59E0B]/30 focus-visible:border-[#F59E0B]"
                      />
                      {errors.email && (
                        <p className="flex items-center gap-1 text-[13px] text-red-500">
                          <AlertCircle className="h-3.5 w-3.5" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <label
                      htmlFor="contact-subject"
                      className="text-[13px] font-semibold text-[#111827]"
                    >
                      Subject
                    </label>
                    <Input
                      id="contact-subject"
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={(e) => updateField("subject", e.target.value)}
                      aria-invalid={!!errors.subject}
                      className="rounded-xl border-[#E5E7EB] focus-visible:ring-[#F59E0B]/30 focus-visible:border-[#F59E0B]"
                    />
                    {errors.subject && (
                      <p className="flex items-center gap-1 text-[13px] text-red-500">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label
                      htmlFor="contact-message"
                      className="text-[13px] font-semibold text-[#111827]"
                    >
                      Message
                    </label>
                    <Textarea
                      id="contact-message"
                      placeholder="Tell us how we can help..."
                      value={formData.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      aria-invalid={!!errors.message}
                      rows={5}
                      className="rounded-xl border-[#E5E7EB] focus-visible:ring-[#F59E0B]/30 focus-visible:border-[#F59E0B] resize-none"
                    />
                    <div className="flex items-center justify-between">
                      <p className="text-[12px] text-[#9CA3AF]">
                        Minimum 20 characters
                      </p>
                      <p
                        className={`text-[12px] ${
                          formData.message.length >= 20
                            ? "text-[#D97706]"
                            : "text-[#9CA3AF]"
                        }`}
                      >
                        {formData.message.length}/20+
                      </p>
                    </div>
                    {errors.message && (
                      <p className="flex items-center gap-1 text-[13px] text-red-500">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="h-px w-full bg-[#E5E7EB]" />

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-glow group w-full inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-[15px] font-semibold text-black transition-all disabled:opacity-60 disabled:pointer-events-none"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </button>

                  <p className="text-center text-[12px] text-[#9CA3AF]">
                    We typically respond within 48 hours. For urgent matters,
                    email us directly at{" "}
                    <a
                      href="mailto:hello@sbv.one"
                      className="text-[#D97706] hover:underline"
                    >
                      hello@sbv.one
                    </a>
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
