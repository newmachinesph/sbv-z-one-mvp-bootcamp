"use client";

import { useState } from "react";
import Link from "next/link";
import posthog from "posthog-js";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, Send, ArrowRight } from "lucide-react";

interface MentorFormData {
  name: string;
  email: string;
  phone: string;
  linkedinUrl: string;
  resumeUrl: string;
  portfolioUrl: string;
  whatBuilt: string;
  whatFailed: string;
  whatShipped: string;
  whyMentor: string;
  weeklyAvailability: string;
  contactSlot1: string;
  contactSlot2: string;
  contactSlot3: string;
}

type FormField = keyof MentorFormData;

type MentorFormErrors = Partial<Record<FormField, string>>;

const availabilityOptions = [
  { value: "1-2", label: "1–2 hours per week" },
  { value: "3-4", label: "3–4 hours per week" },
  { value: "5+", label: "5+ hours per week" },
  { value: "flexible", label: "Flexible — depends on the week" },
];

const roleItems = [
  "Lead one focused workshop during the 12-week program",
  "Join weekly build check-ins (async or short syncs)",
  "Give direct, tactical feedback on real products",
  "Help founders move from prototype to shipped MVP",
];

const benefitItems = [
  "Featured mentor spotlight across SBV channels",
  "Demo Day stage time and recognition",
  "First access to high-potential early-stage founders",
  "Potential advisory or equity collaboration opportunities",
  "Help shape the Philippines\u2019 builder ecosystem",
];


export default function MentorPage() {
  const [formData, setFormData] = useState<MentorFormData>({
    name: "",
    email: "",
    phone: "",
    linkedinUrl: "",
    resumeUrl: "",
    portfolioUrl: "",
    whatBuilt: "",
    whatFailed: "",
    whatShipped: "",
    whyMentor: "",
    weeklyAvailability: "",
    contactSlot1: "",
    contactSlot2: "",
    contactSlot3: "",
  });

  const [errors, setErrors] = useState<MentorFormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(0);

  const steps = [
    { label: "Contact Info", fields: ["name", "email", "phone", "linkedinUrl"] as FormField[] },
    { label: "Your Work", fields: ["resumeUrl", "portfolioUrl"] as FormField[] },
    { label: "Builder Questions", fields: ["whatBuilt", "whatFailed", "whatShipped", "whyMentor"] as FormField[] },
    { label: "Availability", fields: ["weeklyAvailability", "contactSlot1", "contactSlot2", "contactSlot3"] as FormField[] },
  ];

  function validateStep(stepIndex: number): MentorFormErrors {
    const e: MentorFormErrors = {};
    const fields = steps[stepIndex].fields;
    for (const f of fields) {
      if (f === "name" && !formData.name.trim()) e.name = "Full name is required.";
      if (f === "email") {
        if (!formData.email.trim()) e.email = "Email address is required.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Please enter a valid email address.";
      }
      if (f === "phone") {
        if (!formData.phone.trim()) e.phone = "Phone number is required.";
        else if (formData.phone.trim().length < 7) e.phone = "Please enter a valid phone number.";
      }
      if (f === "linkedinUrl") {
        if (!formData.linkedinUrl.trim()) e.linkedinUrl = "LinkedIn profile is required.";
        else if (!/^https?:\/\/(www\.)?linkedin\.com\/in\/.+/i.test(formData.linkedinUrl.trim())) e.linkedinUrl = "Please enter a valid LinkedIn URL (e.g., https://linkedin.com/in/yourname).";
      }
      if (f === "resumeUrl") {
        if (!formData.resumeUrl.trim()) e.resumeUrl = "Resume / CV link is required.";
        else if (!/^https?:\/\/.+/i.test(formData.resumeUrl.trim())) e.resumeUrl = "Please enter a valid URL starting with http:// or https://.";
      }
      if (f === "portfolioUrl" && formData.portfolioUrl.trim() && !/^https?:\/\/.+/i.test(formData.portfolioUrl.trim())) {
        e.portfolioUrl = "Please enter a valid URL starting with http:// or https://.";
      }
      if (f === "whatBuilt") {
        if (!formData.whatBuilt.trim()) e.whatBuilt = "This field is required.";
        else if (formData.whatBuilt.trim().length < 20) e.whatBuilt = "Please write at least 20 characters.";
      }
      if (f === "whatFailed") {
        if (!formData.whatFailed.trim()) e.whatFailed = "This field is required.";
        else if (formData.whatFailed.trim().length < 20) e.whatFailed = "Please write at least 20 characters.";
      }
      if (f === "whatShipped") {
        if (!formData.whatShipped.trim()) e.whatShipped = "This field is required.";
        else if (formData.whatShipped.trim().length < 20) e.whatShipped = "Please write at least 20 characters.";
      }
      if (f === "whyMentor") {
        if (!formData.whyMentor.trim()) e.whyMentor = "This field is required.";
        else if (formData.whyMentor.trim().length < 50) e.whyMentor = "Please write at least 50 characters.";
      }
      if (f === "weeklyAvailability" && !formData.weeklyAvailability) e.weeklyAvailability = "Please select your availability.";
      if (f === "contactSlot1" && !formData.contactSlot1) e.contactSlot1 = "At least 3 time slots are required.";
      if (f === "contactSlot2" && !formData.contactSlot2) e.contactSlot2 = "Please provide a second time slot.";
      if (f === "contactSlot3" && !formData.contactSlot3) e.contactSlot3 = "Please provide a third time slot.";
    }
    return e;
  }

  function handleNext() {
    const stepErrors = validateStep(step);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length === 0) {
      setStep((s) => Math.min(s + 1, steps.length - 1));
      posthog.capture("mentor_step_completed", { step: step + 1, label: steps[step].label });
    }
  }

  function handleBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function validate(): MentorFormErrors {
    const e: MentorFormErrors = {};

    if (!formData.name.trim()) e.name = "Full name is required.";
    if (!formData.email.trim()) {
      e.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      e.email = "Please enter a valid email address.";
    }
    if (!formData.phone.trim()) {
      e.phone = "Phone number is required.";
    } else if (formData.phone.trim().length < 7) {
      e.phone = "Please enter a valid phone number.";
    }
    if (!formData.linkedinUrl.trim()) {
      e.linkedinUrl = "LinkedIn profile is required.";
    } else if (
      !/^https?:\/\/(www\.)?linkedin\.com\/in\/.+/i.test(
        formData.linkedinUrl.trim()
      )
    ) {
      e.linkedinUrl =
        "Please enter a valid LinkedIn URL (e.g., https://linkedin.com/in/yourname).";
    }
    if (!formData.resumeUrl.trim()) {
      e.resumeUrl = "Resume / CV link is required.";
    } else if (!/^https?:\/\/.+/i.test(formData.resumeUrl.trim())) {
      e.resumeUrl = "Please enter a valid URL starting with http:// or https://.";
    }
    if (
      formData.portfolioUrl.trim() &&
      !/^https?:\/\/.+/i.test(formData.portfolioUrl.trim())
    ) {
      e.portfolioUrl =
        "Please enter a valid URL starting with http:// or https://.";
    }
    if (!formData.whatBuilt.trim()) {
      e.whatBuilt = "This field is required.";
    } else if (formData.whatBuilt.trim().length < 20) {
      e.whatBuilt = "Please write at least 20 characters.";
    }
    if (!formData.whatFailed.trim()) {
      e.whatFailed = "This field is required.";
    } else if (formData.whatFailed.trim().length < 20) {
      e.whatFailed = "Please write at least 20 characters.";
    }
    if (!formData.whatShipped.trim()) {
      e.whatShipped = "This field is required.";
    } else if (formData.whatShipped.trim().length < 20) {
      e.whatShipped = "Please write at least 20 characters.";
    }
    if (!formData.whyMentor.trim()) {
      e.whyMentor = "This field is required.";
    } else if (formData.whyMentor.trim().length < 50) {
      e.whyMentor = "Please write at least 50 characters.";
    }
    if (!formData.weeklyAvailability) {
      e.weeklyAvailability = "Please select your availability.";
    }
    if (!formData.contactSlot1) e.contactSlot1 = "At least 3 time slots are required.";
    if (!formData.contactSlot2) e.contactSlot2 = "Please provide a second time slot.";
    if (!formData.contactSlot3) e.contactSlot3 = "Please provide a third time slot.";

    return e;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const data = await res.json();
        if (data.error) {
          setErrors({ [data.field || "name"]: data.error });
        }
        setIsSubmitting(false);
        return;
      }
      setIsSubmitting(false);
      setSubmitted(true);
      posthog.capture("mentor_application_submitted", { availability: formData.weeklyAvailability });
    } catch {
      setErrors({ name: "Something went wrong. Please try again." });
      setIsSubmitting(false);
    }
  }

  function updateField(field: FormField, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function formatSlot(value: string) {
    if (!value) return "—";
    const d = new Date(value);
    return d.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  /* ——— Success State ——— */
  if (submitted) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-lg text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#FEF3C7]">
                <svg
                  className="h-10 w-10 text-[#D97706]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h1 className="font-heading mb-4 text-3xl font-bold text-[#111827]">
                Application Received
              </h1>
              <p className="mb-2 text-lg text-[#6B7280]">
                Thank you, {formData.name}. We&apos;ve received your mentor
                application and will review it shortly.
              </p>
              <p className="mb-8 text-[#9CA3AF]">
                We&apos;ll reach out at{" "}
                <strong className="text-[#111827]">{formData.email}</strong> to
                schedule a brief conversation.
              </p>

              {/* Summary Card */}
              <div className="mb-8 rounded-2xl border border-[#E5E7EB] bg-white p-7 text-left">
                <h2 className="font-heading mb-4 text-base font-semibold text-[#111827]">
                  Submission Summary
                </h2>
                <div className="space-y-0 text-sm">
                  {[
                    ["Name", formData.name],
                    ["Email", formData.email],
                    ["Phone", formData.phone],
                    ["LinkedIn", formData.linkedinUrl],
                    ["Resume", formData.resumeUrl],
                    ...(formData.portfolioUrl
                      ? [["Portfolio", formData.portfolioUrl]]
                      : []),
                    [
                      "Availability",
                      availabilityOptions.find(
                        (o) => o.value === formData.weeklyAvailability
                      )?.label ?? formData.weeklyAvailability,
                    ],
                    ["Slot 1", formatSlot(formData.contactSlot1)],
                    ["Slot 2", formatSlot(formData.contactSlot2)],
                    ["Slot 3", formatSlot(formData.contactSlot3)],
                  ].map(([label, value], i) => (
                    <div key={label}>
                      {i > 0 && <div className="h-px w-full bg-[#E5E7EB]" />}
                      <div className="flex justify-between py-3">
                        <span className="text-[#9CA3AF]">{label}</span>
                        <span className="max-w-[220px] truncate text-right font-medium text-[#111827]">
                          {value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-full border border-[#E5E7EB] bg-white px-8 py-3 text-[15px] font-semibold text-[#111827] transition-all hover:border-[#F59E0B]/30 hover:shadow-sm"
                >
                  Back to Home
                </Link>
                <Link
                  href="/about"
                  className="btn-glow inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 text-[15px] font-semibold text-black"
                >
                  Learn About Z1 Forge
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  /* ——— Form + Page ——— */
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ——— Hero ——— */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="pointer-events-none absolute inset-0">
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
            {/* Badge */}
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(245,158,11,0.2)] bg-[rgba(245,158,11,0.08)] px-4 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F59E0B] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#F59E0B]" />
                </span>
                <span className="text-[13px] font-medium tracking-wide text-[#D97706]">
                  Mentors — Now Recruiting
                </span>
              </span>
            </div>

            <h1 className="font-heading mb-5 text-[clamp(32px,5vw,56px)] font-bold tracking-tight text-[#111827]">
              Built something real?
              <br />
              <span className="gradient-text-orange">
                Help the next wave do the same.
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-[clamp(16px,1.5vw,20px)] leading-relaxed text-[#6B7280]">
              Z1 Forge mentors aren&apos;t career advisors — they&apos;re
              operators, founders, and builders who&apos;ve been in the
              trenches. If you&apos;ve shipped, failed, and learned, we want
              you.
            </p>
            <p className="mt-4 text-[14px] font-medium text-[#D97706]">
              1–2 hours per week. No fluff. Just execution.
            </p>
          </div>
        </div>
      </section>

      {/* ——— Content ——— */}
      <section className="bg-[#F9FAFB] py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-5">
            {/* ——— Left Column — Info ——— */}
            <div className="space-y-8 lg:col-span-2">
              {/* The Role */}
              <div>
                <h2 className="font-heading mb-4 text-xl font-bold text-[#111827]">
                  The Role
                </h2>
                <p className="mb-4 text-sm text-[#6B7280]">
                  Light-touch, high-impact. No multi-hour lectures — just
                  focused sessions and real-time guidance.
                </p>
                <div className="space-y-3">
                  {roleItems.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: "#F59E0B" }}
                      />
                      <span className="text-sm text-[#6B7280]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-px w-full bg-[#E5E7EB]" />

              {/* Why Mentor */}
              <div>
                <h2 className="font-heading mb-4 text-xl font-bold text-[#111827]">
                  Why Mentor at Z1 Forge
                </h2>
                <div className="space-y-3">
                  {benefitItems.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: "#F59E0B" }}
                      />
                      <span className="text-sm text-[#6B7280]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-px w-full bg-[#E5E7EB]" />

              {/* Quick Facts */}
              <div>
                <h2 className="font-heading mb-4 text-xl font-bold text-[#111827]">
                  Quick Facts
                </h2>
                <div className="space-y-3 text-sm">
                  {[
                    ["Commitment", "1–2 hours per week"],
                    ["Duration", "12 weeks (one cohort)"],
                    ["Format", "Remote-first with optional in-person"],
                    ["Compensation", "Visibility, network, potential equity"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center gap-3">
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: "#F59E0B" }}
                      />
                      <span className="text-[#6B7280]">
                        <strong className="text-[#111827]">{label}:</strong>{" "}
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ——— Right Column — Form ——— */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-7">
                {/* Progress bar */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    {steps.map((s, i) => (
                      <button
                        key={s.label}
                        type="button"
                        onClick={() => { if (i < step) setStep(i); }}
                        className={`flex items-center gap-1.5 text-[12px] font-semibold transition-colors duration-300 ${
                          i < step
                            ? "text-[#D97706] cursor-pointer"
                            : i === step
                              ? "text-[#111827]"
                              : "text-[#D1D5DB] cursor-default"
                        }`}
                      >
                        <span
                          className={`flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-bold transition-all duration-300 ${
                            i < step
                              ? "bg-[#F59E0B] text-white"
                              : i === step
                                ? "bg-[#111827] text-white"
                                : "bg-[#F3F4F6] text-[#9CA3AF]"
                          }`}
                        >
                          {i < step ? (
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            i + 1
                          )}
                        </span>
                        <span className="hidden sm:inline">{s.label}</span>
                      </button>
                    ))}
                  </div>
                  <div className="h-1 w-full rounded-full bg-[#F3F4F6]">
                    <div
                      className="h-1 rounded-full bg-[#F59E0B] transition-all duration-500 ease-out"
                      style={{ width: `${((step + 1) / steps.length) * 100}%` }}
                    />
                  </div>
                  <p className="mt-3 text-sm text-[#9CA3AF]">
                    Step {step + 1} of {steps.length} — {steps[step].label}
                    {step === 0 && ". Takes about 5 minutes. We read every application."}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* ——— Step 1: Contact Info ——— */}
                  {step === 0 && (
                    <>
                      {/* Name */}
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-[13px] font-semibold text-[#111827]">
                          Full Name
                        </label>
                        <Input
                          id="name"
                          placeholder="Juan dela Cruz"
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

                      {/* Email */}
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-[13px] font-semibold text-[#111827]">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="juan@email.com"
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

                      {/* Phone */}
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-[13px] font-semibold text-[#111827]">
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+63 917 123 4567"
                          value={formData.phone}
                          onChange={(e) => updateField("phone", e.target.value)}
                          aria-invalid={!!errors.phone}
                          className="rounded-xl border-[#E5E7EB] focus-visible:ring-[#F59E0B]/30 focus-visible:border-[#F59E0B]"
                        />
                        {errors.phone && (
                          <p className="flex items-center gap-1 text-[13px] text-red-500">
                            <AlertCircle className="h-3.5 w-3.5" />
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      {/* LinkedIn */}
                      <div className="space-y-2">
                        <label htmlFor="linkedinUrl" className="text-[13px] font-semibold text-[#111827]">
                          LinkedIn Profile
                        </label>
                        <Input
                          id="linkedinUrl"
                          type="url"
                          placeholder="https://linkedin.com/in/yourname"
                          value={formData.linkedinUrl}
                          onChange={(e) => updateField("linkedinUrl", e.target.value)}
                          aria-invalid={!!errors.linkedinUrl}
                          className="rounded-xl border-[#E5E7EB] focus-visible:ring-[#F59E0B]/30 focus-visible:border-[#F59E0B]"
                        />
                        {errors.linkedinUrl && (
                          <p className="flex items-center gap-1 text-[13px] text-red-500">
                            <AlertCircle className="h-3.5 w-3.5" />
                            {errors.linkedinUrl}
                          </p>
                        )}
                      </div>
                    </>
                  )}

                  {/* ——— Step 2: Your Work ——— */}
                  {step === 1 && (
                    <>
                      {/* Resume / CV Link */}
                      <div className="space-y-2">
                        <label htmlFor="resumeUrl" className="text-[13px] font-semibold text-[#111827]">
                          Resume / CV Link
                        </label>
                        <Input
                          id="resumeUrl"
                          type="url"
                          placeholder="https://drive.google.com/your-resume"
                          value={formData.resumeUrl}
                          onChange={(e) => updateField("resumeUrl", e.target.value)}
                          aria-invalid={!!errors.resumeUrl}
                          className="rounded-xl border-[#E5E7EB] focus-visible:ring-[#F59E0B]/30 focus-visible:border-[#F59E0B]"
                        />
                        <p className="text-xs text-[#9CA3AF]">
                          Google Drive, Dropbox, or any shareable link.
                        </p>
                        {errors.resumeUrl && (
                          <p className="flex items-center gap-1 text-[13px] text-red-500">
                            <AlertCircle className="h-3.5 w-3.5" />
                            {errors.resumeUrl}
                          </p>
                        )}
                      </div>

                      {/* Portfolio */}
                      <div className="space-y-2">
                        <label htmlFor="portfolioUrl" className="text-[13px] font-semibold text-[#111827]">
                          Portfolio / Website{" "}
                          <span className="font-normal text-[#9CA3AF]">(optional)</span>
                        </label>
                        <Input
                          id="portfolioUrl"
                          type="url"
                          placeholder="https://yourwebsite.com"
                          value={formData.portfolioUrl}
                          onChange={(e) => updateField("portfolioUrl", e.target.value)}
                          aria-invalid={!!errors.portfolioUrl}
                          className="rounded-xl border-[#E5E7EB] focus-visible:ring-[#F59E0B]/30 focus-visible:border-[#F59E0B]"
                        />
                        <p className="text-xs text-[#9CA3AF]">
                          GitHub, Behance, personal site, etc.
                        </p>
                        {errors.portfolioUrl && (
                          <p className="flex items-center gap-1 text-[13px] text-red-500">
                            <AlertCircle className="h-3.5 w-3.5" />
                            {errors.portfolioUrl}
                          </p>
                        )}
                      </div>
                    </>
                  )}

                  {/* ——— Step 3: Builder Questions ——— */}
                  {step === 2 && (
                    <>
                      {/* What Built */}
                      <div className="space-y-2">
                        <label htmlFor="whatBuilt" className="text-[13px] font-semibold text-[#111827]">
                          What&apos;s the most meaningful thing you&apos;ve built or led?
                        </label>
                        <Textarea
                          id="whatBuilt"
                          placeholder="A product, a team, a system — tell us about something you're proud of and your role in making it happen."
                          value={formData.whatBuilt}
                          onChange={(e) => updateField("whatBuilt", e.target.value)}
                          aria-invalid={!!errors.whatBuilt}
                          rows={3}
                          className="rounded-xl border-[#E5E7EB] focus-visible:ring-[#F59E0B]/30 focus-visible:border-[#F59E0B]"
                        />
                        {errors.whatBuilt && (
                          <p className="flex items-center gap-1 text-[13px] text-red-500">
                            <AlertCircle className="h-3.5 w-3.5" />
                            {errors.whatBuilt}
                          </p>
                        )}
                      </div>

                      {/* What Failed */}
                      <div className="space-y-2">
                        <label htmlFor="whatFailed" className="text-[13px] font-semibold text-[#111827]">
                          Tell us about something that didn&apos;t work out.
                        </label>
                        <Textarea
                          id="whatFailed"
                          placeholder="We value failure as much as success. What happened, and what did you take away from it?"
                          value={formData.whatFailed}
                          onChange={(e) => updateField("whatFailed", e.target.value)}
                          aria-invalid={!!errors.whatFailed}
                          rows={3}
                          className="rounded-xl border-[#E5E7EB] focus-visible:ring-[#F59E0B]/30 focus-visible:border-[#F59E0B]"
                        />
                        {errors.whatFailed && (
                          <p className="flex items-center gap-1 text-[13px] text-red-500">
                            <AlertCircle className="h-3.5 w-3.5" />
                            {errors.whatFailed}
                          </p>
                        )}
                      </div>

                      {/* What Shipped */}
                      <div className="space-y-2">
                        <label htmlFor="whatShipped" className="text-[13px] font-semibold text-[#111827]">
                          What have you shipped in the last 2 years?
                        </label>
                        <Textarea
                          id="whatShipped"
                          placeholder="Products launched, features shipped, teams scaled, revenue milestones — anything tangible."
                          value={formData.whatShipped}
                          onChange={(e) => updateField("whatShipped", e.target.value)}
                          aria-invalid={!!errors.whatShipped}
                          rows={3}
                          className="rounded-xl border-[#E5E7EB] focus-visible:ring-[#F59E0B]/30 focus-visible:border-[#F59E0B]"
                        />
                        {errors.whatShipped && (
                          <p className="flex items-center gap-1 text-[13px] text-red-500">
                            <AlertCircle className="h-3.5 w-3.5" />
                            {errors.whatShipped}
                          </p>
                        )}
                      </div>

                      {/* Why Mentor */}
                      <div className="space-y-2">
                        <label htmlFor="whyMentor" className="text-[13px] font-semibold text-[#111827]">
                          Why do you want to mentor at Z1 Forge?
                        </label>
                        <Textarea
                          id="whyMentor"
                          placeholder="What draws you to mentoring early-stage founders? What would you bring to the table? (Minimum 50 characters)"
                          value={formData.whyMentor}
                          onChange={(e) => updateField("whyMentor", e.target.value)}
                          aria-invalid={!!errors.whyMentor}
                          rows={4}
                          className="rounded-xl border-[#E5E7EB] focus-visible:ring-[#F59E0B]/30 focus-visible:border-[#F59E0B]"
                        />
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-[#9CA3AF]">Minimum 50 characters.</p>
                          <p className={`text-xs ${formData.whyMentor.length >= 50 ? "text-[#D97706]" : "text-[#9CA3AF]"}`}>
                            {formData.whyMentor.length}/50+
                          </p>
                        </div>
                        {errors.whyMentor && (
                          <p className="flex items-center gap-1 text-[13px] text-red-500">
                            <AlertCircle className="h-3.5 w-3.5" />
                            {errors.whyMentor}
                          </p>
                        )}
                      </div>
                    </>
                  )}

                  {/* ——— Step 4: Availability ——— */}
                  {step === 3 && (
                    <>
                      {/* Weekly Availability */}
                      <div className="space-y-2">
                        <label className="text-[13px] font-semibold text-[#111827]">
                          Weekly Availability
                        </label>
                        <Select
                          value={formData.weeklyAvailability}
                          onValueChange={(v) => updateField("weeklyAvailability", v)}
                        >
                          <SelectTrigger
                            className="w-full rounded-xl border-[#E5E7EB] focus-visible:ring-[#F59E0B]/30 focus-visible:border-[#F59E0B]"
                            aria-invalid={!!errors.weeklyAvailability}
                          >
                            <SelectValue placeholder="How many hours per week?" />
                          </SelectTrigger>
                          <SelectContent>
                            {availabilityOptions.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.weeklyAvailability && (
                          <p className="flex items-center gap-1 text-[13px] text-red-500">
                            <AlertCircle className="h-3.5 w-3.5" />
                            {errors.weeklyAvailability}
                          </p>
                        )}
                      </div>

                      {/* Contact Slots */}
                      <div className="space-y-2">
                        <label className="text-[13px] font-semibold text-[#111827]">
                          Preferred Times for an Intro Call
                        </label>
                        <p className="text-xs text-[#9CA3AF]">
                          Pick 3 date-and-time slots that work for a quick 15-minute chat.
                        </p>
                        <div className="space-y-3">
                          {(
                            [
                              ["contactSlot1", "Option 1"],
                              ["contactSlot2", "Option 2"],
                              ["contactSlot3", "Option 3"],
                            ] as const
                          ).map(([field, label]) => (
                            <div key={field} className="space-y-1">
                              <span className="text-[12px] font-medium text-[#9CA3AF]">
                                {label}
                              </span>
                              <input
                                type="datetime-local"
                                value={formData[field]}
                                onChange={(e) => updateField(field, e.target.value)}
                                aria-invalid={!!errors[field]}
                                className="flex h-10 w-full rounded-xl border border-[#E5E7EB] bg-white px-3 py-2 text-sm text-[#111827] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#D1D5DB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]/30 focus-visible:border-[#F59E0B]"
                              />
                              {errors[field] && (
                                <p className="flex items-center gap-1 text-[13px] text-red-500">
                                  <AlertCircle className="h-3.5 w-3.5" />
                                  {errors[field]}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  <div className="h-px w-full bg-[#E5E7EB]" />

                  {/* Navigation buttons */}
                  <div className="flex items-center gap-3">
                    {step > 0 && (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="rounded-full border border-[#E5E7EB] bg-white px-6 py-3.5 text-[14px] font-semibold text-[#6B7280] transition-all hover:border-[#F59E0B]/30 hover:text-[#111827]"
                      >
                        Back
                      </button>
                    )}
                    {step < steps.length - 1 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="btn-glow flex-1 rounded-full px-8 py-3.5 text-[15px] font-semibold text-black transition-all"
                      >
                        <span className="flex items-center justify-center gap-2">
                          Continue
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-glow flex-1 rounded-full px-8 py-3.5 text-[15px] font-semibold text-black transition-all disabled:pointer-events-none disabled:opacity-60"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            Submitting...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            <Send className="h-4 w-4" />
                            Submit Application
                          </span>
                        )}
                      </button>
                    )}
                  </div>

                  {step === steps.length - 1 && (
                    <p className="text-center text-xs text-[#9CA3AF]">
                      By submitting, you agree to our{" "}
                      <Link href="/terms" className="text-[#D97706] hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-[#D97706] hover:underline">
                        Privacy Policy
                      </Link>
                      . We review every application and respond within 5 business days.
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer hideCta />
    </div>
  );
}
