"use client";

import { useState, useEffect } from "react";
import posthog from "posthog-js";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArrowRight, RotateCcw } from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Role = "hacker" | "hustler" | "hipster" | "hound";
type QuizPhase = "intro" | "questions" | "result";

interface QuizQuestion {
  id: number;
  scenario: string;
  options: { text: string; role: Role }[];
}

// ---------------------------------------------------------------------------
// Static Data — Role Details
// ---------------------------------------------------------------------------

const roleCodes: Record<Role, string> = {
  hacker: "Hk",
  hustler: "Hu",
  hipster: "Hp",
  hound: "Hd",
};

const roleDetails: Record<
  Role,
  {
    code: string;
    name: string;
    title: string;
    description: string;
  }
> = {
  hacker: {
    code: "Hk",
    name: "HACKER",
    title: "The Builder + Code Owner",
    description:
      "You are the engine of the team. When others are still talking about ideas, you are already building them. You think in systems, APIs, and deployment pipelines. You don\u2019t just write code \u2014 you architect solutions. In a startup team, you are the one who turns vision into a working product that real users can touch.",
  },
  hustler: {
    code: "Hu",
    name: "HUSTLER",
    title: "The Seller + Business Lead",
    description:
      "You are the voice of the team. You can walk into a room of strangers and walk out with three paying customers. You see opportunities where others see obstacles. Negotiation, persuasion, and storytelling are your superpowers. In a startup team, you are the one who gets the product in front of the right people.",
  },
  hipster: {
    code: "Hp",
    name: "HIPSTER",
    title: "The Brand + Growth Marketer",
    description:
      "You are the soul of the team. You obsess over every pixel, every word, every interaction. You know that a product without a brand is just software, and software without soul doesn\u2019t spread. You create experiences that make people feel something. In a startup team, you are the one who makes people fall in love with the product.",
  },
  hound: {
    code: "Hd",
    name: "HOUND",
    title: "The Researcher + Data Lead",
    description:
      "You are the compass of the team. While others rely on gut feeling, you rely on evidence. You dig into data, interview users, and surface the truths that nobody else sees. You prevent the team from building the wrong thing. In a startup team, you are the one who makes sure every decision is grounded in reality.",
  },
};

const rolePreview: { role: Role; code: string; name: string; title: string }[] = [
  { role: "hacker", ...roleDetails.hacker },
  { role: "hustler", ...roleDetails.hustler },
  { role: "hipster", ...roleDetails.hipster },
  { role: "hound", ...roleDetails.hound },
];

// ---------------------------------------------------------------------------
// Static Data — Quiz Questions (8 scenarios, 1 option per role each)
// ---------------------------------------------------------------------------

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    scenario:
      "Your team just got a brilliant startup idea at 2 AM. What do you do first?",
    options: [
      {
        text: "Open your laptop and start building a prototype right away",
        role: "hacker",
      },
      {
        text: "Text everyone you know who might be a potential customer",
        role: "hustler",
      },
      {
        text: "Sketch out the logo, brand name, and how the landing page should feel",
        role: "hipster",
      },
      {
        text: "Search for data on market size and existing competitors before anyone gets too excited",
        role: "hound",
      },
    ],
  },
  {
    id: 2,
    scenario:
      "Your product just launched but only 5 people signed up in the first week. What\u2019s your reaction?",
    options: [
      {
        text: "Check the server logs and optimize the sign-up flow for speed and fewer clicks",
        role: "hacker",
      },
      {
        text: "Call every one of those 5 users, learn their story, and ask them to refer friends",
        role: "hustler",
      },
      {
        text: "Redesign the landing page \u2014 the messaging and visuals clearly need work",
        role: "hipster",
      },
      {
        text: "Set up analytics to understand exactly where users drop off and why",
        role: "hound",
      },
    ],
  },
  {
    id: 3,
    scenario:
      "You\u2019re at a hackathon with 24 hours left. Your team is stuck. What role do you naturally take?",
    options: [
      {
        text: "Debug the broken feature and get the demo working no matter what",
        role: "hacker",
      },
      {
        text: "Rework the pitch and practice delivering it until it gives people chills",
        role: "hustler",
      },
      {
        text: "Polish the UI so the demo looks professional and the judges are impressed",
        role: "hipster",
      },
      {
        text: "Do a quick round of user tests with other teams to validate the concept",
        role: "hound",
      },
    ],
  },
  {
    id: 4,
    scenario:
      "A competitor just launched a similar product. How do you respond?",
    options: [
      {
        text: "Ship a better version faster \u2014 outbuild them with superior technology",
        role: "hacker",
      },
      {
        text: "Reach out to their unhappy customers and offer a better deal",
        role: "hustler",
      },
      {
        text: "Differentiate with a stronger brand identity they can\u2019t replicate",
        role: "hipster",
      },
      {
        text: "Analyze their product, reviews, and pricing to find the gaps they\u2019re missing",
        role: "hound",
      },
    ],
  },
  {
    id: 5,
    scenario:
      "Your team has a big disagreement about what feature to build next. How do you settle it?",
    options: [
      {
        text: "Build a quick proof-of-concept for each option and let the code decide",
        role: "hacker",
      },
      {
        text: "Ask which feature the top 3 paying customers are asking for",
        role: "hustler",
      },
      {
        text: "Create mockups of both and test which one resonates more with users",
        role: "hipster",
      },
      {
        text: "Pull up usage data and run a survey to see which problem is more painful",
        role: "hound",
      },
    ],
  },
  {
    id: 6,
    scenario:
      "You just got invited to speak at a startup event. What topic would you present?",
    options: [
      {
        text: "\u201CHow We Built Our Product in 48 Hours with Next.js and Supabase\u201D",
        role: "hacker",
      },
      {
        text: "\u201CFrom Zero to 1,000 Users: The Exact Playbook We Used\u201D",
        role: "hustler",
      },
      {
        text: "\u201CWhy Brand Is Your Moat: Designing Products People Fall in Love With\u201D",
        role: "hipster",
      },
      {
        text: "\u201CData-Driven Decisions: How User Research Saved Us from Building the Wrong Thing\u201D",
        role: "hound",
      },
    ],
  },
  {
    id: 7,
    scenario:
      "It\u2019s Friday ship day. Your team needs to decide what to demo to mentors. You advocate for showing\u2026",
    options: [
      {
        text: "The new API integration \u2014 technically complex and works flawlessly",
        role: "hacker",
      },
      {
        text: "The partnership deal you closed with a local business this week",
        role: "hustler",
      },
      {
        text: "The redesigned onboarding flow with new micro-animations",
        role: "hipster",
      },
      {
        text: "The customer interview findings that changed your product roadmap",
        role: "hound",
      },
    ],
  },
  {
    id: 8,
    scenario:
      "You have one free weekend to level up. How do you spend it?",
    options: [
      {
        text: "Deep-dive into a new framework or tool and build something with it",
        role: "hacker",
      },
      {
        text: "Network at a startup meetup and practice your elevator pitch on strangers",
        role: "hustler",
      },
      {
        text: "Redesign your portfolio, write a blog post, and grow your social media presence",
        role: "hipster",
      },
      {
        text: "Read research papers, take an analytics course, and update your spreadsheets",
        role: "hound",
      },
    ],
  },
];

const TOTAL_QUESTIONS = quizQuestions.length;
const optionLetters = ["A", "B", "C", "D"];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getResult(scores: Record<Role, number>) {
  const sorted = (Object.entries(scores) as [Role, number][]).sort(
    (a, b) => b[1] - a[1]
  );
  return { primary: sorted[0][0], secondary: sorted[1][0] };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function QuizPage() {
  const [phase, setPhase] = useState<QuizPhase>("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<Role, number>>({
    hacker: 0,
    hustler: 0,
    hipster: 0,
    hound: 0,
  });
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [displayScores, setDisplayScores] = useState<Record<Role, number>>({
    hacker: 0,
    hustler: 0,
    hipster: 0,
    hound: 0,
  });

  // Animate score bars on result phase
  useEffect(() => {
    if (phase === "result") {
      const timer = setTimeout(() => setDisplayScores(scores), 300);
      return () => clearTimeout(timer);
    }
  }, [phase, scores]);

  function handleStart() {
    posthog.capture("quiz_started");
    setPhase("questions");
  }

  function handleAnswer(optionIndex: number, role: Role) {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(optionIndex);
    const newScores = { ...scores, [role]: scores[role] + 1 };
    setScores(newScores);
    posthog.capture("quiz_answer", { question: currentQuestion + 1, selected_role: role });

    setTimeout(() => {
      setSelectedAnswer(null);
      if (currentQuestion < TOTAL_QUESTIONS - 1) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        const sorted = (Object.entries(newScores) as [Role, number][]).sort((a, b) => b[1] - a[1]);
        posthog.capture("quiz_completed", { primary_role: sorted[0][0], secondary_role: sorted[1][0], scores: newScores });
        setPhase("result");
      }
    }, 600);
  }

  function handleRetake() {
    posthog.capture("quiz_retake");
    setPhase("intro");
    setCurrentQuestion(0);
    setScores({ hacker: 0, hustler: 0, hipster: 0, hound: 0 });
    setDisplayScores({ hacker: 0, hustler: 0, hipster: 0, hound: 0 });
    setSelectedAnswer(null);
  }

  // ==========================================================================
  // INTRO PHASE
  // ==========================================================================
  if (phase === "intro") {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />

        {/* Hero */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
          {/* Dot grid background */}
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
              {/* Section label */}
              <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#F59E0B] mb-4">
                Find Your Role
              </p>

              {/* Heading */}
              <h1
                className="font-heading text-[clamp(32px,5vw,56px)] font-bold tracking-tight text-[#111827] mb-5"
              >
                What 4H Role{" "}
                <span className="gradient-text-orange">Suits You?</span>
              </h1>

              {/* Subtitle */}
              <p className="text-[clamp(16px,1.5vw,20px)] text-[#6B7280] leading-relaxed max-w-2xl mx-auto mb-8">
                Answer 8 quick scenarios to discover whether you&apos;re a
                Hacker, Hustler, Hipster, or Hound — and find your place in a
                startup team.
              </p>

              {/* 2x2 role preview cards */}
              <div className="mx-auto mb-12 grid max-w-xl gap-4 grid-cols-2">
                {rolePreview.map((r) => (
                  <div
                    key={r.name}
                    className="group relative rounded-2xl border border-[#E5E7EB] bg-white p-5 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    {/* Hover accent line */}
                    <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Role code badge */}
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#FEF3C7] mb-3">
                      <span
                        className="font-heading text-[15px] font-bold text-[#D97706]"
                      >
                        {r.code}
                      </span>
                    </div>

                    <p
                      className="font-heading text-sm font-semibold text-[#111827]"
                    >
                      {r.name}
                    </p>
                    <p className="mt-1 text-xs text-[#9CA3AF]">{r.title}</p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={handleStart}
                className="btn-glow inline-flex items-center justify-center rounded-full px-8 py-4 text-[15px] font-semibold text-black transition-all"
              >
                Take the Quiz
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>

              <p className="mt-4 text-sm text-[#9CA3AF]">
                Takes about 2 minutes. No sign-up required.
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  // ==========================================================================
  // QUESTIONS PHASE
  // ==========================================================================
  if (phase === "questions") {
    const question = quizQuestions[currentQuestion];
    const progressValue = (currentQuestion / TOTAL_QUESTIONS) * 100;

    return (
      <div className="min-h-screen bg-white">
        <Navbar />

        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-2xl">
              {/* Progress */}
              <div className="mb-8">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-[#9CA3AF]">
                    Question {currentQuestion + 1} of {TOTAL_QUESTIONS}
                  </span>
                  <span className="font-medium text-[#111827]">
                    {Math.round(progressValue)}%
                  </span>
                </div>
                {/* Custom progress bar */}
                <div className="h-2 w-full rounded-full bg-[#F3F4F6]">
                  <div
                    className="h-2 rounded-full bg-[#F59E0B] transition-all duration-500 ease-out"
                    style={{ width: `${progressValue}%` }}
                  />
                </div>
              </div>

              {/* Question Card — key triggers remount animation */}
              <div
                key={currentQuestion}
                className="animate-in fade-in slide-in-from-right-4 duration-300"
              >
                <div className="rounded-2xl border border-[#E5E7EB] bg-white p-7">
                  {/* Scenario label */}
                  <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#F59E0B] mb-3">
                    Scenario {currentQuestion + 1}
                  </p>

                  {/* Question text */}
                  <h2
                    className="font-heading text-lg font-bold leading-relaxed text-[#111827] mb-6"
                  >
                    {question.scenario}
                  </h2>

                  {/* Answer options */}
                  <div className="space-y-3">
                    {question.options.map((option, i) => (
                      <button
                        key={i}
                        onClick={() => handleAnswer(i, option.role)}
                        disabled={selectedAnswer !== null}
                        className={`
                          flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-all duration-200
                          ${
                            selectedAnswer === i
                              ? "bg-[#F59E0B]/10 border-[#F59E0B] scale-[1.02]"
                              : selectedAnswer !== null && selectedAnswer !== i
                                ? "border-[#E5E7EB] opacity-50"
                                : "border-[#E5E7EB] hover:bg-[#F9FAFB] hover:border-[#F59E0B]/50"
                          }
                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]
                        `}
                      >
                        <span
                          className={`
                            flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors duration-200
                            ${
                              selectedAnswer === i
                                ? "bg-[#F59E0B] text-white"
                                : "bg-[#F3F4F6] text-[#111827]"
                            }
                          `}
                        >
                          {optionLetters[i]}
                        </span>
                        <span className="text-sm text-[#111827] pt-1">
                          {option.text}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  // ==========================================================================
  // RESULT PHASE
  // ==========================================================================
  const result = getResult(scores);
  const primary = roleDetails[result.primary];
  const secondary = roleDetails[result.secondary];
  const allRoles: Role[] = ["hacker", "hustler", "hipster", "hound"];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Result */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Dot grid background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #F59E0B 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative container mx-auto px-6">
          <div className="mx-auto max-w-2xl text-center">
            {/* Large role code badge */}
            <div className="animate-in zoom-in-50 duration-500 mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FEF3C7]">
              <span
                className="font-heading text-2xl font-bold text-[#D97706]"
              >
                {primary.code}
              </span>
            </div>

            {/* Section label */}
            <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#F59E0B] mb-4">
              Your Result
            </p>

            {/* Heading */}
            <h1
              className="font-heading text-[clamp(32px,5vw,56px)] font-bold tracking-tight text-[#111827] mb-5"
            >
              You&apos;re a{" "}
              <span className="gradient-text-orange">{primary.name}!</span>
            </h1>

            {/* Title */}
            <p className="mb-4 text-lg font-medium text-[#6B7280]">
              {primary.title}
            </p>

            {/* Description */}
            <p className="mx-auto max-w-lg text-[#6B7280] leading-relaxed">
              {primary.description}
            </p>
          </div>
        </div>
      </section>

      {/* Score Breakdown */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-lg">
            <h3
              className="font-heading mb-6 text-center text-xl font-bold text-[#111827]"
            >
              Your Role Breakdown
            </h3>

            <div className="space-y-4">
              {allRoles.map((role) => {
                const detail = roleDetails[role];
                const score = displayScores[role];
                const pct = Math.round((score / TOTAL_QUESTIONS) * 100);
                return (
                  <div key={role} className="flex items-center gap-3">
                    {/* Role code badge */}
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FEF3C7] text-[12px] font-bold text-[#D97706] shrink-0">
                      {roleCodes[role]}
                    </span>
                    <span className="w-20 text-sm font-medium text-[#111827]">
                      {detail.name}
                    </span>
                    {/* Custom progress bar */}
                    <div className="h-2 flex-1 rounded-full bg-[#F3F4F6]">
                      <div
                        className="h-2 rounded-full bg-[#F59E0B] transition-all duration-700 ease-out"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="w-10 text-right text-sm text-[#9CA3AF]">
                      {score}/{TOTAL_QUESTIONS}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Secondary strength card */}
            {result.primary !== result.secondary && (
              <div className="mt-8 rounded-2xl border border-[#F59E0B]/20 bg-[#FEF3C7]/30 p-6">
                <p className="text-center text-sm text-[#6B7280]">
                  Your secondary strength is{" "}
                  <span className="font-semibold text-[#111827]">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#FEF3C7] text-[10px] font-bold text-[#D97706] align-middle mr-1">
                      {secondary.code}
                    </span>
                    {secondary.name}
                  </span>
                  . You&apos;d make a great backup {secondary.title.toLowerCase()}
                  !
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-[#F9FAFB]">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2
              className="font-heading mb-4 text-2xl font-bold text-[#111827] md:text-3xl"
            >
              Ready to Put Your {primary.name} Skills to Work?
            </h2>
            <p className="mb-8 text-[#6B7280]">
              Join the Z1 Forge and build a real product with a team
              that needs your strengths.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/apply"
                onClick={() => posthog.capture("cta_click", { cta: "apply_now", source: "quiz_result", role: result.primary })}
                className="btn-glow inline-flex items-center justify-center rounded-full px-8 py-4 text-[15px] font-semibold text-black transition-all"
              >
                Apply Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <button
                onClick={handleRetake}
                className="btn-glow-dark inline-flex items-center justify-center rounded-full px-8 py-4 text-[15px] font-semibold text-[#111827]"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Retake Quiz
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
