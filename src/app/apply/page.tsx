"use client";

import { useState } from "react";
import posthog from "posthog-js";
import Link from "next/link";
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
import { AlertCircle, Send, ArrowRight, ChevronDown, Plus, Trash2, Users, User } from "lucide-react";

/** Single source of truth — update here when the deadline changes */
const RESPONSE_DEADLINE = "March 23–27, 2026";

type Role = "hacker" | "hustler" | "hipster" | "hound";
type ApplicationMode = "solo" | "team";

interface FormData {
  name: string;
  email: string;
  linkedinUrl: string;
  resumeUrl: string;
  portfolioUrl: string;
  preferredRole: Role | "";
  skills: string;
  experience: string;
  motivation: string;
  location: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  linkedinUrl?: string;
  resumeUrl?: string;
  portfolioUrl?: string;
  preferredRole?: string;
  skills?: string;
  experience?: string;
  motivation?: string;
  location?: string;
}

const EMPTY_FORM: FormData = {
  name: "",
  email: "",
  linkedinUrl: "",
  resumeUrl: "",
  portfolioUrl: "",
  preferredRole: "",
  skills: "",
  experience: "",
  motivation: "",
  location: "",
};

const roles = [
  {
    value: "hacker" as const,
    label: "Hacker",
    code: "Hk",
    description: "Builder + Code Owner",
  },
  {
    value: "hustler" as const,
    label: "Hustler",
    code: "Hu",
    description: "Seller + Business Lead",
  },
  {
    value: "hipster" as const,
    label: "Hipster",
    code: "Hp",
    description: "Brand + Growth Marketer",
  },
  {
    value: "hound" as const,
    label: "Hound",
    code: "Hd",
    description: "Researcher + Data Lead",
  },
];

// experience is now a free-text paragraph field

const expectations = [
  "Ship a live product in 12 weeks with a team of 4",
  "Weekly ship targets reviewed and scored by mentors",
  "On-demand access to expert mentors when you need them",
  "Monthly founder firesides and weekly team challenges",
  "Investor-ready pitch deck and a live Demo Day",
  "Join a global community of builders and founders",
];

const applyFaqs = [
  {
    question: "How much does it cost?",
    answer:
      "Cohort 1 is completely free. We want to prove the model with the first batch of builders before introducing any pricing. You get access to the full 12-week curriculum, on-demand mentors, weekly challenges, community events, and Demo Day — all at no cost.",
  },
  {
    question: "Do I need a team to apply?",
    answer:
      "No — you can apply as an individual. We match solo applicants into teams of 4 based on your preferred role and complementary skills. If you already have a partial or full team, use the Team application to apply together.",
  },
  {
    question: "What is the time commitment?",
    answer:
      "Expect 20–25 hours per week. Monday sprint kickoff, Tuesday–Thursday build time, Wednesday mid-week challenge, Friday ship review, and Saturday retrospective. The program is remote-first, so you can work from anywhere.",
  },
  {
    question: "What do I walk away with?",
    answer:
      "A live product with real users and revenue, an investor-ready pitch deck, a 90-day roadmap, brand identity, and a global network of builders. Your Demo Day pitch is presented to investors worldwide — not just a handful of local investors.",
  },
];

// ============================================================================
// Shared field components
// ============================================================================

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="flex items-center gap-1 text-[13px] text-red-500">
      <AlertCircle className="h-3.5 w-3.5" />
      {message}
    </p>
  );
}

function MemberFormFields({
  data,
  errors,
  isManila,
  onFieldChange,
  onManilaChange,
  idPrefix,
}: {
  data: FormData;
  errors: FormErrors;
  isManila: boolean;
  onFieldChange: (field: keyof FormData, value: string) => void;
  onManilaChange: (val: boolean) => void;
  idPrefix: string;
}) {
  return (
    <div className="space-y-5">
      {/* Name */}
      <div className="space-y-2">
        <label htmlFor={`${idPrefix}-name`} className="text-[13px] font-semibold text-[#111827]">
          Full Name
        </label>
        <Input
          id={`${idPrefix}-name`}
          placeholder="Alex Johnson"
          value={data.name}
          onChange={(e) => onFieldChange("name", e.target.value)}
          aria-invalid={!!errors.name}
          className="rounded-xl border-[#E5E7EB] focus-visible:ring-[#F59E0B]/30 focus-visible:border-[#F59E0B]"
        />
        <FieldError message={errors.name} />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label htmlFor={`${idPrefix}-email`} className="text-[13px] font-semibold text-[#111827]">
          Email Address
        </label>
        <Input
          id={`${idPrefix}-email`}
          type="email"
          placeholder="alex@email.com"
          value={data.email}
          onChange={(e) => onFieldChange("email", e.target.value)}
          aria-invalid={!!errors.email}
          className="rounded-xl border-[#E5E7EB] focus-visible:ring-[#F59E0B]/30 focus-visible:border-[#F59E0B]"
        />
        <FieldError message={errors.email} />
      </div>

      {/* Location */}
      <div className="space-y-3">
        <label className="text-[13px] font-semibold text-[#111827]">Location</label>
        <label className="flex items-center gap-3 cursor-pointer">
          <span
            className={`flex h-5 w-5 items-center justify-center rounded-md border-2 transition-colors duration-200 ${
              isManila ? "border-[#F59E0B] bg-[#F59E0B]" : "border-[#D1D5DB] bg-white"
            }`}
            onClick={() => {
              onManilaChange(!isManila);
              if (!isManila) onFieldChange("location", "");
            }}
          >
            {isManila && (
              <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </span>
          <span className="text-[14px] text-[#111827]">I&apos;m based in Manila, Philippines</span>
        </label>
        {!isManila && (
          <Input
            id={`${idPrefix}-location`}
            placeholder="e.g., Cebu, Philippines / Singapore / Remote"
            value={data.location}
            onChange={(e) => onFieldChange("location", e.target.value)}
            aria-invalid={!!errors.location}
            className="rounded-xl border-[#E5E7EB] focus-visible:ring-[#F59E0B]/30 focus-visible:border-[#F59E0B]"
          />
        )}
        <FieldError message={errors.location} />
      </div>

      {/* LinkedIn */}
      <div className="space-y-2">
        <label htmlFor={`${idPrefix}-linkedin`} className="text-[13px] font-semibold text-[#111827]">
          LinkedIn Profile
        </label>
        <Input
          id={`${idPrefix}-linkedin`}
          type="url"
          placeholder="https://linkedin.com/in/yourname"
          value={data.linkedinUrl}
          onChange={(e) => onFieldChange("linkedinUrl", e.target.value)}
          aria-invalid={!!errors.linkedinUrl}
          className="rounded-xl border-[#E5E7EB] focus-visible:ring-[#F59E0B]/30 focus-visible:border-[#F59E0B]"
        />
        <FieldError message={errors.linkedinUrl} />
      </div>

      {/* Resume / CV */}
      <div className="space-y-2">
        <label htmlFor={`${idPrefix}-resume`} className="text-[13px] font-semibold text-[#111827]">
          Resume / CV Link <span className="font-normal text-[#9CA3AF]">(optional)</span>
        </label>
        <Input
          id={`${idPrefix}-resume`}
          type="url"
          placeholder="https://drive.google.com/your-resume"
          value={data.resumeUrl}
          onChange={(e) => onFieldChange("resumeUrl", e.target.value)}
          aria-invalid={!!errors.resumeUrl}
          className="rounded-xl border-[#E5E7EB] focus-visible:ring-[#F59E0B]/30 focus-visible:border-[#F59E0B]"
        />
        <p className="text-xs text-[#9CA3AF]">Google Drive, Dropbox, or any shareable link.</p>
        <FieldError message={errors.resumeUrl} />
      </div>

      {/* Portfolio */}
      <div className="space-y-2">
        <label htmlFor={`${idPrefix}-portfolio`} className="text-[13px] font-semibold text-[#111827]">
          Portfolio / Website <span className="font-normal text-[#9CA3AF]">(optional)</span>
        </label>
        <Input
          id={`${idPrefix}-portfolio`}
          type="url"
          placeholder="https://yourwebsite.com"
          value={data.portfolioUrl}
          onChange={(e) => onFieldChange("portfolioUrl", e.target.value)}
          aria-invalid={!!errors.portfolioUrl}
          className="rounded-xl border-[#E5E7EB] focus-visible:ring-[#F59E0B]/30 focus-visible:border-[#F59E0B]"
        />
        <p className="text-xs text-[#9CA3AF]">GitHub, Behance, Dribbble, personal site, etc.</p>
        <FieldError message={errors.portfolioUrl} />
      </div>

      {/* Preferred Role */}
      <div className="space-y-2">
        <label className="text-[13px] font-semibold text-[#111827]">Preferred Role</label>
        <Select value={data.preferredRole} onValueChange={(value) => onFieldChange("preferredRole", value)}>
          <SelectTrigger
            className="w-full rounded-xl border-[#E5E7EB] focus-visible:ring-[#F59E0B]/30 focus-visible:border-[#F59E0B]"
            aria-invalid={!!errors.preferredRole}
          >
            <SelectValue placeholder="Select your role..." />
          </SelectTrigger>
          <SelectContent>
            {roles.map((role) => (
              <SelectItem key={role.value} value={role.value}>
                <span className="flex items-center gap-2">
                  <span
                    className="inline-flex items-center justify-center w-5 h-5 rounded text-[9px] font-bold"
                    style={{ backgroundColor: "#F59E0B", color: "#000", fontFamily: "var(--font-heading)" }}
                  >
                    {role.code}
                  </span>
                  <span>{role.label}</span>
                  <span className="text-[#9CA3AF]">— {role.description}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FieldError message={errors.preferredRole} />
      </div>

      {/* Skills */}
      <div className="space-y-2">
        <label htmlFor={`${idPrefix}-skills`} className="text-[13px] font-semibold text-[#111827]">
          Key Skills
        </label>
        <Textarea
          id={`${idPrefix}-skills`}
          placeholder="e.g., React, Node.js, Figma, Market Research, Sales, Data Analysis..."
          value={data.skills}
          onChange={(e) => onFieldChange("skills", e.target.value)}
          aria-invalid={!!errors.skills}
          rows={3}
          className="rounded-xl border-[#E5E7EB] focus-visible:ring-[#F59E0B]/30 focus-visible:border-[#F59E0B]"
        />
        <p className="text-xs text-[#9CA3AF]">List your top skills relevant to your chosen role.</p>
        <FieldError message={errors.skills} />
      </div>

      {/* Experience */}
      <div className="space-y-2">
        <label htmlFor={`${idPrefix}-experience`} className="text-[13px] font-semibold text-[#111827]">
          Experience
        </label>
        <Textarea
          id={`${idPrefix}-experience`}
          placeholder="Tell us about your relevant experience — roles, projects, tools you've used, and what you've built or shipped."
          value={data.experience}
          onChange={(e) => onFieldChange("experience", e.target.value)}
          aria-invalid={!!errors.experience}
          rows={4}
          className="rounded-xl border-[#E5E7EB] focus-visible:ring-[#F59E0B]/30 focus-visible:border-[#F59E0B]"
        />
        <p className="text-xs text-[#9CA3AF]">Minimum 30 characters.</p>
        <FieldError message={errors.experience} />
      </div>

      {/* Motivation */}
      <div className="space-y-2">
        <label htmlFor={`${idPrefix}-motivation`} className="text-[13px] font-semibold text-[#111827]">
          Why do you want to join Z1 Forge?
        </label>
        <Textarea
          id={`${idPrefix}-motivation`}
          placeholder="Tell us why you want to join the Forge. What problem do you want to solve? What drives you? (Minimum 50 characters)"
          value={data.motivation}
          onChange={(e) => onFieldChange("motivation", e.target.value)}
          aria-invalid={!!errors.motivation}
          rows={5}
          className="rounded-xl border-[#E5E7EB] focus-visible:ring-[#F59E0B]/30 focus-visible:border-[#F59E0B]"
        />
        <div className="flex items-center justify-between">
          <p className="text-xs text-[#9CA3AF]">Minimum 50 characters.</p>
          <p className={`text-xs ${data.motivation.length >= 50 ? "text-[#D97706]" : "text-[#9CA3AF]"}`}>
            {data.motivation.length}/50+
          </p>
        </div>
        <FieldError message={errors.motivation} />
      </div>
    </div>
  );
}

// ============================================================================
// Validation helpers
// ============================================================================

function validateMemberData(data: FormData, isManila: boolean): FormErrors {
  const newErrors: FormErrors = {};

  if (!data.name.trim()) newErrors.name = "Full name is required.";
  if (!data.email.trim()) {
    newErrors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    newErrors.email = "Please enter a valid email address.";
  }

  const resolvedLocation = isManila ? "Manila, Philippines" : data.location;
  if (!resolvedLocation.trim()) newErrors.location = "Please enter your location.";

  if (!data.linkedinUrl.trim()) {
    newErrors.linkedinUrl = "LinkedIn profile URL is required.";
  } else if (!/^https?:\/\/(www\.)?linkedin\.com\/in\/.+/i.test(data.linkedinUrl.trim())) {
    newErrors.linkedinUrl = "Please enter a valid LinkedIn URL (e.g., https://linkedin.com/in/yourname).";
  }

  if (data.resumeUrl.trim() && !/^https?:\/\/.+/i.test(data.resumeUrl.trim())) {
    newErrors.resumeUrl = "Please enter a valid URL starting with http:// or https://.";
  }
  if (data.portfolioUrl.trim() && !/^https?:\/\/.+/i.test(data.portfolioUrl.trim())) {
    newErrors.portfolioUrl = "Please enter a valid URL starting with http:// or https://.";
  }

  if (!data.preferredRole) newErrors.preferredRole = "Please select your preferred role.";
  if (!data.skills.trim()) newErrors.skills = "Please list your key skills.";

  if (!data.experience.trim()) {
    newErrors.experience = "Please describe your experience.";
  } else if (data.experience.trim().length < 30) {
    newErrors.experience = "Please write at least 30 characters about your experience.";
  }

  if (!data.motivation.trim()) {
    newErrors.motivation = "Please tell us your motivation.";
  } else if (data.motivation.trim().length < 50) {
    newErrors.motivation = "Please write at least 50 characters about your motivation.";
  }

  return newErrors;
}

// ============================================================================
// Main Page Component
// ============================================================================

export default function ApplyPage() {
  const [mode, setMode] = useState<ApplicationMode>("solo");

  // --- Solo state ---
  const [formData, setFormData] = useState<FormData>({ ...EMPTY_FORM });
  const [isManila, setIsManila] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [step, setStep] = useState(0);

  // --- Team state ---
  const [teamName, setTeamName] = useState("");
  const [teamNameError, setTeamNameError] = useState("");
  const [teamMembers, setTeamMembers] = useState<FormData[]>([{ ...EMPTY_FORM }, { ...EMPTY_FORM }]);
  const [teamManilaFlags, setTeamManilaFlags] = useState<boolean[]>([false, false]);
  const [teamErrors, setTeamErrors] = useState<FormErrors[]>([{}, {}]);
  const [activeTeamMember, setActiveTeamMember] = useState(0);

  // --- Shared state ---
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const steps = [
    { label: "About You", fields: ["name", "email", "location"] as const },
    { label: "Your Profile", fields: ["linkedinUrl", "resumeUrl", "portfolioUrl", "preferredRole"] as const },
    { label: "Your Story", fields: ["skills", "experience", "motivation"] as const },
  ];

  // ---- Solo step validation ----
  function validateStep(stepIndex: number): FormErrors {
    const newErrors: FormErrors = {};
    const fieldsToValidate = steps[stepIndex].fields;

    for (const field of fieldsToValidate) {
      if (field === "name" && !formData.name.trim()) {
        newErrors.name = "Full name is required.";
      }
      if (field === "email") {
        if (!formData.email.trim()) {
          newErrors.email = "Email address is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = "Please enter a valid email address.";
        }
      }
      if (field === "location") {
        const resolvedLocation = isManila ? "Manila, Philippines" : formData.location;
        if (!resolvedLocation.trim()) {
          newErrors.location = "Please enter your location.";
        }
      }
      if (field === "linkedinUrl") {
        if (!formData.linkedinUrl.trim()) {
          newErrors.linkedinUrl = "LinkedIn profile URL is required.";
        } else if (!/^https?:\/\/(www\.)?linkedin\.com\/in\/.+/i.test(formData.linkedinUrl.trim())) {
          newErrors.linkedinUrl = "Please enter a valid LinkedIn URL (e.g., https://linkedin.com/in/yourname).";
        }
      }
      if (field === "resumeUrl" && formData.resumeUrl.trim() && !/^https?:\/\/.+/i.test(formData.resumeUrl.trim())) {
        newErrors.resumeUrl = "Please enter a valid URL starting with http:// or https://.";
      }
      if (field === "portfolioUrl" && formData.portfolioUrl.trim() && !/^https?:\/\/.+/i.test(formData.portfolioUrl.trim())) {
        newErrors.portfolioUrl = "Please enter a valid URL starting with http:// or https://.";
      }
      if (field === "preferredRole" && !formData.preferredRole) {
        newErrors.preferredRole = "Please select your preferred role.";
      }
      if (field === "skills" && !formData.skills.trim()) {
        newErrors.skills = "Please list your key skills.";
      }
      if (field === "experience") {
        if (!formData.experience.trim()) {
          newErrors.experience = "Please describe your experience.";
        } else if (formData.experience.trim().length < 30) {
          newErrors.experience = "Please write at least 30 characters about your experience.";
        }
      }
      if (field === "motivation") {
        if (!formData.motivation.trim()) {
          newErrors.motivation = "Please tell us your motivation.";
        } else if (formData.motivation.trim().length < 50) {
          newErrors.motivation = "Please write at least 50 characters about your motivation.";
        }
      }
    }
    return newErrors;
  }

  function handleNext() {
    const stepErrors = validateStep(step);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length === 0) {
      setStep((s) => Math.min(s + 1, steps.length - 1));
      posthog.capture("apply_step_completed", { step: step + 1, label: steps[step].label });
    }
  }

  function handleBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function validate(): FormErrors {
    return validateMemberData(formData, isManila);
  }

  // ---- Solo submit ----
  async function handleSoloSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      const submitData = {
        ...formData,
        location: isManila ? "Manila, Philippines" : formData.location,
      };
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });
      if (!res.ok) {
        const data = await res.json();
        if (data.error) {
          const field = data.field || "motivation";
          setErrors({ [field]: data.error });
        }
        setIsSubmitting(false);
        return;
      }
      setIsSubmitting(false);
      setSubmitted(true);
      posthog.capture("application_submitted", { mode: "solo", role: formData.preferredRole, location: isManila ? "Manila, Philippines" : formData.location });
    } catch {
      setErrors({ name: "Something went wrong. Please try again." });
      setIsSubmitting(false);
    }
  }

  // ---- Team helpers ----
  function addTeamMember() {
    if (teamMembers.length >= 4) return;
    setTeamMembers([...teamMembers, { ...EMPTY_FORM }]);
    setTeamManilaFlags([...teamManilaFlags, false]);
    setTeamErrors([...teamErrors, {}]);
    setActiveTeamMember(teamMembers.length);
  }

  function removeTeamMember(index: number) {
    if (teamMembers.length <= 2) return;
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
    setTeamManilaFlags(teamManilaFlags.filter((_, i) => i !== index));
    setTeamErrors(teamErrors.filter((_, i) => i !== index));
    if (activeTeamMember >= index && activeTeamMember > 0) {
      setActiveTeamMember(activeTeamMember - 1);
    }
  }

  function updateTeamMemberField(memberIndex: number, field: keyof FormData, value: string) {
    setTeamMembers((prev) => prev.map((m, i) => (i === memberIndex ? { ...m, [field]: value } : m)));
    if (teamErrors[memberIndex]?.[field]) {
      setTeamErrors((prev) => prev.map((e, i) => (i === memberIndex ? { ...e, [field]: undefined } : e)));
    }
  }

  function updateTeamManilaFlag(memberIndex: number, val: boolean) {
    setTeamManilaFlags((prev) => prev.map((f, i) => (i === memberIndex ? val : f)));
  }

  // ---- Team submit ----
  async function handleTeamSubmit(e: React.FormEvent) {
    e.preventDefault();

    let hasError = false;

    // Validate team name
    if (!teamName.trim()) {
      setTeamNameError("Team name is required.");
      hasError = true;
    } else {
      setTeamNameError("");
    }

    // Validate each member
    const newTeamErrors = teamMembers.map((member, i) =>
      validateMemberData(member, teamManilaFlags[i])
    );
    setTeamErrors(newTeamErrors);

    for (let i = 0; i < newTeamErrors.length; i++) {
      if (Object.keys(newTeamErrors[i]).length > 0) {
        hasError = true;
        setActiveTeamMember(i);
        break;
      }
    }

    if (hasError) return;

    setIsSubmitting(true);
    try {
      const submitData = {
        teamName: teamName.trim(),
        members: teamMembers.map((m, i) => ({
          ...m,
          location: teamManilaFlags[i] ? "Manila, Philippines" : m.location,
        })),
      };

      const res = await fetch("/api/apply/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      if (!res.ok) {
        const data = await res.json();
        if (data.error) {
          if (data.memberIndex !== undefined) {
            setActiveTeamMember(data.memberIndex);
            setTeamErrors((prev) =>
              prev.map((e, i) => (i === data.memberIndex ? { ...e, motivation: data.error } : e))
            );
          } else {
            setTeamNameError(data.error);
          }
        }
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      setSubmitted(true);
      posthog.capture("application_submitted", {
        mode: "team",
        teamName: teamName,
        memberCount: teamMembers.length,
      });
    } catch {
      setTeamNameError("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  }

  function updateField(field: keyof FormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  // ======================================================================
  // Success State
  // ======================================================================
  if (submitted) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-lg text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#FEF3C7]">
                <svg className="h-10 w-10 text-[#D97706]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="font-heading mb-4 text-3xl font-bold text-[#111827]">
                Application Submitted!
              </h1>
              {mode === "solo" ? (
                <>
                  <p className="mb-2 text-lg text-[#6B7280]">
                    Thank you, {formData.name}! Your application to the Z1 Forge has been received.
                  </p>
                  <p className="mb-8 text-[#9CA3AF]">
                    We will review your application and get back to you at{" "}
                    <strong className="text-[#111827]">{formData.email}</strong> on or before {RESPONSE_DEADLINE}.
                  </p>

                  {/* Solo Application Summary Card */}
                  <div className="mb-8 rounded-2xl border border-[#E5E7EB] bg-white p-7 text-left">
                    <h2 className="font-heading mb-4 text-base font-semibold text-[#111827]">
                      Application Summary
                    </h2>
                    <div className="space-y-0 text-sm">
                      <div className="flex justify-between py-3">
                        <span className="text-[#9CA3AF]">Name</span>
                        <span className="font-medium text-[#111827]">{formData.name}</span>
                      </div>
                      <div className="h-px w-full bg-[#E5E7EB]" />
                      <div className="flex justify-between py-3">
                        <span className="text-[#9CA3AF]">Email</span>
                        <span className="font-medium text-[#111827]">{formData.email}</span>
                      </div>
                      <div className="h-px w-full bg-[#E5E7EB]" />
                      <div className="flex justify-between py-3">
                        <span className="text-[#9CA3AF]">Role</span>
                        <span className="flex items-center gap-2 font-medium text-[#111827]">
                          <span
                            className="flex items-center justify-center w-6 h-6 rounded-md text-[10px] font-bold"
                            style={{ backgroundColor: "#F59E0B", color: "#000", fontFamily: "var(--font-heading)" }}
                          >
                            {roles.find((r) => r.value === formData.preferredRole)?.code}
                          </span>
                          {roles.find((r) => r.value === formData.preferredRole)?.label}
                        </span>
                      </div>
                      <div className="h-px w-full bg-[#E5E7EB]" />
                      <div className="flex justify-between py-3">
                        <span className="text-[#9CA3AF]">Location</span>
                        <span className="font-medium text-[#111827]">
                          {isManila ? "Manila, Philippines" : formData.location}
                        </span>
                      </div>
                      <div className="h-px w-full bg-[#E5E7EB]" />
                      <div className="py-3">
                        <span className="text-[#9CA3AF]">Experience</span>
                        <p className="mt-1 font-medium leading-relaxed text-[#111827]">{formData.experience}</p>
                      </div>
                      <div className="h-px w-full bg-[#E5E7EB]" />
                      <div className="flex justify-between py-3">
                        <span className="text-[#9CA3AF]">Skills</span>
                        <span className="max-w-[200px] text-right font-medium text-[#111827]">{formData.skills}</span>
                      </div>
                      <div className="h-px w-full bg-[#E5E7EB]" />
                      <div className="flex justify-between py-3">
                        <span className="text-[#9CA3AF]">LinkedIn</span>
                        <span className="max-w-[200px] truncate text-right font-medium text-[#111827]">{formData.linkedinUrl}</span>
                      </div>
                      {formData.resumeUrl && (
                        <>
                          <div className="h-px w-full bg-[#E5E7EB]" />
                          <div className="flex justify-between py-3">
                            <span className="text-[#9CA3AF]">Resume / CV</span>
                            <span className="max-w-[200px] truncate text-right font-medium text-[#111827]">{formData.resumeUrl}</span>
                          </div>
                        </>
                      )}
                      {formData.portfolioUrl && (
                        <>
                          <div className="h-px w-full bg-[#E5E7EB]" />
                          <div className="flex justify-between py-3">
                            <span className="text-[#9CA3AF]">Portfolio</span>
                            <span className="max-w-[200px] truncate text-right font-medium text-[#111827]">{formData.portfolioUrl}</span>
                          </div>
                        </>
                      )}
                      <div className="h-px w-full bg-[#E5E7EB]" />
                      <div className="py-3">
                        <span className="text-[#9CA3AF]">Motivation</span>
                        <p className="mt-1 font-medium leading-relaxed text-[#111827]">{formData.motivation}</p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <p className="mb-2 text-lg text-[#6B7280]">
                    Thank you! Your team application for <strong className="text-[#111827]">{teamName}</strong> has been received.
                  </p>
                  <p className="mb-8 text-[#9CA3AF]">
                    We will review your team application and get back to all members on or before {RESPONSE_DEADLINE}.
                  </p>

                  {/* Team Application Summary */}
                  <div className="mb-8 rounded-2xl border border-[#E5E7EB] bg-white p-7 text-left">
                    <h2 className="font-heading mb-4 text-base font-semibold text-[#111827]">
                      Team Application Summary
                    </h2>
                    <div className="space-y-0 text-sm">
                      <div className="flex justify-between py-3">
                        <span className="text-[#9CA3AF]">Team Name</span>
                        <span className="font-medium text-[#111827]">{teamName}</span>
                      </div>
                      <div className="h-px w-full bg-[#E5E7EB]" />
                      <div className="flex justify-between py-3">
                        <span className="text-[#9CA3AF]">Members</span>
                        <span className="font-medium text-[#111827]">{teamMembers.length}</span>
                      </div>
                      {teamMembers.map((m, i) => (
                        <div key={i}>
                          <div className="h-px w-full bg-[#E5E7EB]" />
                          <div className="py-3">
                            <div className="flex justify-between">
                              <span className="text-[#9CA3AF]">Member {i + 1}</span>
                              <span className="flex items-center gap-2 font-medium text-[#111827]">
                                <span
                                  className="flex items-center justify-center w-5 h-5 rounded text-[9px] font-bold"
                                  style={{ backgroundColor: "#F59E0B", color: "#000", fontFamily: "var(--font-heading)" }}
                                >
                                  {roles.find((r) => r.value === m.preferredRole)?.code}
                                </span>
                                {m.name}
                              </span>
                            </div>
                            <p className="text-[#9CA3AF] text-xs mt-1">{m.email}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-full border border-[#E5E7EB] bg-white px-8 py-3 text-[15px] font-semibold text-[#111827] transition-all hover:border-[#F59E0B]/30 hover:shadow-sm"
                >
                  Back to Home
                </Link>
                <Link
                  href="/program"
                  className="btn-glow inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 text-[15px] font-semibold text-black"
                >
                  View Program
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

  // ======================================================================
  // Main Form
  // ======================================================================
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ——— Hero header ——— */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(circle, #F59E0B 1px, transparent 1px)",
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
                  Cohort 1 — Applications Open
                </span>
              </span>
            </div>

            <h1 className="font-heading text-[clamp(32px,5vw,56px)] font-bold tracking-tight text-[#111827] mb-5">
              Apply to <span className="gradient-text-orange">Z1</span>
            </h1>
            <p className="text-[clamp(16px,1.5vw,20px)] text-[#6B7280] leading-relaxed max-w-2xl mx-auto">
              Build, ship, and launch a real product in 12 weeks with a team
              that has your back. The forge is open.
            </p>
            <p className="mt-4 text-[14px] font-medium text-[#D97706]">
              Apply solo and we&apos;ll match you with a team, or apply together as a team.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#F9FAFB] py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-5">
            {/* Left Column — Info */}
            <div className="space-y-8 lg:col-span-2">
              <div>
                <h2 className="font-heading mb-4 text-xl font-bold text-[#111827]">
                  What to Expect
                </h2>
                <div className="space-y-3">
                  {expectations.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: "#F59E0B" }} />
                      <span className="text-sm text-[#6B7280]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-px w-full bg-[#E5E7EB]" />

              <div>
                <h2 className="font-heading mb-4 text-xl font-bold text-[#111827]">
                  Key Details
                </h2>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: "#F59E0B" }} />
                    <span className="text-[#6B7280]"><strong className="text-[#111827]">Duration:</strong> 12 weeks</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: "#F59E0B" }} />
                    <span className="text-[#6B7280]"><strong className="text-[#111827]">Team Size:</strong> 4 members per team</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: "#F59E0B" }} />
                    <span className="text-[#6B7280]"><strong className="text-[#111827]">Format:</strong> Remote-first + coworking hubs + weekly Friday ships</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: "#F59E0B" }} />
                    <span className="text-[#6B7280]"><strong className="text-[#111827]">Cost:</strong> Free for Cohort 1</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column — Application Form */}
            <div className="lg:col-span-3">
              {/* Mode Toggle */}
              <div className="mb-6 flex rounded-2xl border border-[#E5E7EB] bg-white p-1.5">
                <button
                  type="button"
                  onClick={() => setMode("solo")}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-[14px] font-semibold transition-all duration-200 ${
                    mode === "solo"
                      ? "bg-[#111827] text-white shadow-sm"
                      : "text-[#6B7280] hover:text-[#111827]"
                  }`}
                >
                  <User className="h-4 w-4" />
                  Solo Application
                </button>
                <button
                  type="button"
                  onClick={() => setMode("team")}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-[14px] font-semibold transition-all duration-200 ${
                    mode === "team"
                      ? "bg-[#111827] text-white shadow-sm"
                      : "text-[#6B7280] hover:text-[#111827]"
                  }`}
                >
                  <Users className="h-4 w-4" />
                  Team Application
                </button>
              </div>

              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-7">
                {/* ============================================================ */}
                {/* SOLO MODE */}
                {/* ============================================================ */}
                {mode === "solo" && (
                  <>
                    {/* Progress bar */}
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-3">
                        {steps.map((s, i) => (
                          <button
                            key={s.label}
                            type="button"
                            onClick={() => { if (i < step) setStep(i); }}
                            className={`flex items-center gap-2 text-[13px] font-semibold transition-colors duration-300 ${
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
                        {step === 0 && `. We will respond on or before ${RESPONSE_DEADLINE}.`}
                      </p>
                    </div>

                    <form onSubmit={handleSoloSubmit} className="space-y-6">
                      {/* Step 1: About You */}
                      {step === 0 && (
                        <>
                          <div className="space-y-2">
                            <label htmlFor="name" className="text-[13px] font-semibold text-[#111827]">Full Name</label>
                            <Input id="name" placeholder="Alex Johnson" value={formData.name} onChange={(e) => updateField("name", e.target.value)} aria-invalid={!!errors.name} className="rounded-xl border-[#E5E7EB] focus-visible:ring-[#F59E0B]/30 focus-visible:border-[#F59E0B]" />
                            <FieldError message={errors.name} />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="email" className="text-[13px] font-semibold text-[#111827]">Email Address</label>
                            <Input id="email" type="email" placeholder="alex@email.com" value={formData.email} onChange={(e) => updateField("email", e.target.value)} aria-invalid={!!errors.email} className="rounded-xl border-[#E5E7EB] focus-visible:ring-[#F59E0B]/30 focus-visible:border-[#F59E0B]" />
                            <FieldError message={errors.email} />
                          </div>
                          <div className="space-y-3">
                            <label className="text-[13px] font-semibold text-[#111827]">Location</label>
                            <label className="flex items-center gap-3 cursor-pointer">
                              <span
                                className={`flex h-5 w-5 items-center justify-center rounded-md border-2 transition-colors duration-200 ${isManila ? "border-[#F59E0B] bg-[#F59E0B]" : "border-[#D1D5DB] bg-white"}`}
                                onClick={() => { setIsManila(!isManila); if (!isManila) updateField("location", ""); if (errors.location) setErrors((prev) => ({ ...prev, location: undefined })); }}
                              >
                                {isManila && (
                                  <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </span>
                              <span className="text-[14px] text-[#111827]">I&apos;m based in Manila, Philippines</span>
                            </label>
                            {!isManila && (
                              <Input id="location" placeholder="e.g., Cebu, Philippines / Singapore / Remote" value={formData.location} onChange={(e) => updateField("location", e.target.value)} aria-invalid={!!errors.location} className="rounded-xl border-[#E5E7EB] focus-visible:ring-[#F59E0B]/30 focus-visible:border-[#F59E0B]" />
                            )}
                            <FieldError message={errors.location} />
                          </div>
                        </>
                      )}

                      {/* Step 2: Your Profile */}
                      {step === 1 && (
                        <>
                          <div className="space-y-2">
                            <label htmlFor="linkedinUrl" className="text-[13px] font-semibold text-[#111827]">LinkedIn Profile</label>
                            <Input id="linkedinUrl" type="url" placeholder="https://linkedin.com/in/yourname" value={formData.linkedinUrl} onChange={(e) => updateField("linkedinUrl", e.target.value)} aria-invalid={!!errors.linkedinUrl} className="rounded-xl border-[#E5E7EB] focus-visible:ring-[#F59E0B]/30 focus-visible:border-[#F59E0B]" />
                            <FieldError message={errors.linkedinUrl} />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="resumeUrl" className="text-[13px] font-semibold text-[#111827]">Resume / CV Link <span className="font-normal text-[#9CA3AF]">(optional)</span></label>
                            <Input id="resumeUrl" type="url" placeholder="https://drive.google.com/your-resume" value={formData.resumeUrl} onChange={(e) => updateField("resumeUrl", e.target.value)} aria-invalid={!!errors.resumeUrl} className="rounded-xl border-[#E5E7EB] focus-visible:ring-[#F59E0B]/30 focus-visible:border-[#F59E0B]" />
                            <p className="text-xs text-[#9CA3AF]">Google Drive, Dropbox, or any shareable link.</p>
                            <FieldError message={errors.resumeUrl} />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="portfolioUrl" className="text-[13px] font-semibold text-[#111827]">Portfolio / Website <span className="font-normal text-[#9CA3AF]">(optional)</span></label>
                            <Input id="portfolioUrl" type="url" placeholder="https://yourwebsite.com" value={formData.portfolioUrl} onChange={(e) => updateField("portfolioUrl", e.target.value)} aria-invalid={!!errors.portfolioUrl} className="rounded-xl border-[#E5E7EB] focus-visible:ring-[#F59E0B]/30 focus-visible:border-[#F59E0B]" />
                            <p className="text-xs text-[#9CA3AF]">GitHub, Behance, Dribbble, personal site, etc.</p>
                            <FieldError message={errors.portfolioUrl} />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[13px] font-semibold text-[#111827]">Preferred Role</label>
                            <Select value={formData.preferredRole} onValueChange={(value) => updateField("preferredRole", value)}>
                              <SelectTrigger className="w-full rounded-xl border-[#E5E7EB] focus-visible:ring-[#F59E0B]/30 focus-visible:border-[#F59E0B]" aria-invalid={!!errors.preferredRole}>
                                <SelectValue placeholder="Select your role..." />
                              </SelectTrigger>
                              <SelectContent>
                                {roles.map((role) => (
                                  <SelectItem key={role.value} value={role.value}>
                                    <span className="flex items-center gap-2">
                                      <span className="inline-flex items-center justify-center w-5 h-5 rounded text-[9px] font-bold" style={{ backgroundColor: "#F59E0B", color: "#000", fontFamily: "var(--font-heading)" }}>{role.code}</span>
                                      <span>{role.label}</span>
                                      <span className="text-[#9CA3AF]">— {role.description}</span>
                                    </span>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FieldError message={errors.preferredRole} />
                          </div>
                        </>
                      )}

                      {/* Step 3: Your Story */}
                      {step === 2 && (
                        <>
                          <div className="space-y-2">
                            <label htmlFor="skills" className="text-[13px] font-semibold text-[#111827]">Key Skills</label>
                            <Textarea id="skills" placeholder="e.g., React, Node.js, Figma, Market Research, Sales, Data Analysis..." value={formData.skills} onChange={(e) => updateField("skills", e.target.value)} aria-invalid={!!errors.skills} rows={3} className="rounded-xl border-[#E5E7EB] focus-visible:ring-[#F59E0B]/30 focus-visible:border-[#F59E0B]" />
                            <p className="text-xs text-[#9CA3AF]">List your top skills relevant to your chosen role.</p>
                            <FieldError message={errors.skills} />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="experience" className="text-[13px] font-semibold text-[#111827]">Experience</label>
                            <Textarea id="experience" placeholder="Tell us about your relevant experience — roles, projects, tools you've used, and what you've built or shipped." value={formData.experience} onChange={(e) => updateField("experience", e.target.value)} aria-invalid={!!errors.experience} rows={4} className="rounded-xl border-[#E5E7EB] focus-visible:ring-[#F59E0B]/30 focus-visible:border-[#F59E0B]" />
                            <p className="text-xs text-[#9CA3AF]">Minimum 30 characters.</p>
                            <FieldError message={errors.experience} />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="motivation" className="text-[13px] font-semibold text-[#111827]">Why do you want to join Z1 Forge?</label>
                            <Textarea id="motivation" placeholder="Tell us why you want to join the Forge. What problem do you want to solve? What drives you? (Minimum 50 characters)" value={formData.motivation} onChange={(e) => updateField("motivation", e.target.value)} aria-invalid={!!errors.motivation} rows={5} className="rounded-xl border-[#E5E7EB] focus-visible:ring-[#F59E0B]/30 focus-visible:border-[#F59E0B]" />
                            <div className="flex items-center justify-between">
                              <p className="text-xs text-[#9CA3AF]">Minimum 50 characters.</p>
                              <p className={`text-xs ${formData.motivation.length >= 50 ? "text-[#D97706]" : "text-[#9CA3AF]"}`}>{formData.motivation.length}/50+</p>
                            </div>
                            <FieldError message={errors.motivation} />
                          </div>
                        </>
                      )}

                      <div className="h-px w-full bg-[#E5E7EB]" />

                      <div className="flex items-center gap-3">
                        {step > 0 && (
                          <button type="button" onClick={handleBack} className="rounded-full border border-[#E5E7EB] bg-white px-6 py-3.5 text-[14px] font-semibold text-[#6B7280] transition-all hover:border-[#F59E0B]/30 hover:text-[#111827]">
                            Back
                          </button>
                        )}
                        {step < steps.length - 1 ? (
                          <button type="button" onClick={handleNext} className="btn-glow flex-1 rounded-full px-8 py-3.5 text-[15px] font-semibold text-black transition-all">
                            <span className="flex items-center justify-center gap-2">Continue<ArrowRight className="h-4 w-4" /></span>
                          </button>
                        ) : (
                          <button type="submit" disabled={isSubmitting} className="btn-glow flex-1 rounded-full px-8 py-3.5 text-[15px] font-semibold text-black transition-all disabled:opacity-60 disabled:pointer-events-none">
                            {isSubmitting ? (
                              <span className="flex items-center justify-center gap-2"><span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />Submitting...</span>
                            ) : (
                              <span className="flex items-center justify-center gap-2"><Send className="h-4 w-4" />Submit Application</span>
                            )}
                          </button>
                        )}
                      </div>

                      {step === steps.length - 1 && (
                        <p className="text-center text-xs text-[#9CA3AF]">
                          By submitting, you agree to our{" "}
                          <Link href="/terms" className="text-[#D97706] hover:underline">Terms of Service</Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="text-[#D97706] hover:underline">Privacy Policy</Link>
                          , and commit to 20-25 hours per week for 12 weeks.
                          Applications are reviewed on a rolling basis.
                        </p>
                      )}
                    </form>
                  </>
                )}

                {/* ============================================================ */}
                {/* TEAM MODE */}
                {/* ============================================================ */}
                {mode === "team" && (
                  <form onSubmit={handleTeamSubmit} className="space-y-6">
                    <div className="mb-2">
                      <p className="text-sm text-[#6B7280]">
                        Apply as a team of 2–4 members. Each member fills out their details below.
                        We will respond on or before {RESPONSE_DEADLINE}.
                      </p>
                    </div>

                    {/* Team Name */}
                    <div className="space-y-2">
                      <label htmlFor="teamName" className="text-[13px] font-semibold text-[#111827]">
                        Team Name
                      </label>
                      <Input
                        id="teamName"
                        placeholder="e.g., Tindahan Tech, Project Phoenix..."
                        value={teamName}
                        onChange={(e) => { setTeamName(e.target.value); if (teamNameError) setTeamNameError(""); }}
                        aria-invalid={!!teamNameError}
                        className="rounded-xl border-[#E5E7EB] focus-visible:ring-[#F59E0B]/30 focus-visible:border-[#F59E0B]"
                      />
                      <FieldError message={teamNameError} />
                    </div>

                    <div className="h-px w-full bg-[#E5E7EB]" />

                    {/* Member Tabs */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-[14px] font-semibold text-[#111827]">Team Members</h3>
                        {teamMembers.length < 4 && (
                          <button
                            type="button"
                            onClick={addTeamMember}
                            className="flex items-center gap-1.5 text-[13px] font-semibold text-[#D97706] hover:text-[#B45309] transition-colors"
                          >
                            <Plus className="h-3.5 w-3.5" />
                            Add Member
                          </button>
                        )}
                      </div>

                      {/* Member tab bar */}
                      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
                        {teamMembers.map((member, i) => {
                          const hasError = Object.keys(teamErrors[i] || {}).length > 0;
                          const isFilled = member.name.trim().length > 0;
                          return (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setActiveTeamMember(i)}
                              className={`relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-semibold transition-all duration-200 whitespace-nowrap ${
                                activeTeamMember === i
                                  ? "bg-[#111827] text-white shadow-sm"
                                  : hasError
                                    ? "bg-red-50 text-red-600 border border-red-200"
                                    : "bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]"
                              }`}
                            >
                              {isFilled && member.preferredRole ? (
                                <span
                                  className="inline-flex items-center justify-center w-5 h-5 rounded text-[9px] font-bold"
                                  style={{
                                    backgroundColor: activeTeamMember === i ? "#F59E0B" : "#E5E7EB",
                                    color: activeTeamMember === i ? "#000" : "#6B7280",
                                    fontFamily: "var(--font-heading)",
                                  }}
                                >
                                  {roles.find((r) => r.value === member.preferredRole)?.code}
                                </span>
                              ) : (
                                <span className={`flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold ${
                                  activeTeamMember === i ? "bg-white/20 text-white" : "bg-[#D1D5DB] text-[#9CA3AF]"
                                }`}>
                                  {i + 1}
                                </span>
                              )}
                              {isFilled ? member.name.split(" ")[0] : `Member ${i + 1}`}
                              {teamMembers.length > 2 && (
                                <span
                                  onClick={(e) => { e.stopPropagation(); removeTeamMember(i); }}
                                  className={`ml-1 rounded-full p-0.5 transition-colors ${
                                    activeTeamMember === i
                                      ? "hover:bg-white/20 text-white/60 hover:text-white"
                                      : "hover:bg-[#D1D5DB] text-[#9CA3AF] hover:text-[#6B7280]"
                                  }`}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Active member form */}
                      {teamMembers.map((member, i) => (
                        <div key={i} className={activeTeamMember === i ? "block" : "hidden"}>
                          <MemberFormFields
                            data={member}
                            errors={teamErrors[i] || {}}
                            isManila={teamManilaFlags[i]}
                            onFieldChange={(field, value) => updateTeamMemberField(i, field, value)}
                            onManilaChange={(val) => updateTeamManilaFlag(i, val)}
                            idPrefix={`team-member-${i}`}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="h-px w-full bg-[#E5E7EB]" />

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-glow w-full rounded-full px-8 py-3.5 text-[15px] font-semibold text-black transition-all disabled:opacity-60 disabled:pointer-events-none"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          Submitting...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <Send className="h-4 w-4" />
                          Submit Team Application
                        </span>
                      )}
                    </button>

                    <p className="text-center text-xs text-[#9CA3AF]">
                      By submitting, you agree to our{" "}
                      <Link href="/terms" className="text-[#D97706] hover:underline">Terms of Service</Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-[#D97706] hover:underline">Privacy Policy</Link>
                      . All team members commit to 20-25 hours per week for 12 weeks.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ——— FAQ section ——— */}
      <section className="bg-white py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-heading text-[clamp(24px,3vw,36px)] font-bold tracking-tight text-[#111827] mb-3 text-center">
              Common Questions
            </h2>
            <p className="text-[15px] text-[#6B7280] text-center mb-10">
              Have more questions?{" "}
              <Link href="/contact" className="text-[#D97706] hover:underline">Get in touch</Link>
            </p>
            <div className="space-y-3">
              {applyFaqs.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={faq.question} className="rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] overflow-hidden transition-all duration-300">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <span className="text-[15px] font-semibold text-[#111827]">{faq.question}</span>
                      <ChevronDown className={`h-4 w-4 shrink-0 text-[#9CA3AF] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5">
                        <p className="text-[14px] leading-relaxed text-[#6B7280]">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Footer hideCta />
    </div>
  );
}
