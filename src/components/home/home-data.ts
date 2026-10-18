import type { ComponentType } from "react";
import {
  HackerIllustration,
  HustlerIllustration,
  HipsterIllustration,
  HoundIllustration,
} from "@/components/role-illustrations";

/* ============================================
   Interfaces
   ============================================ */

export interface Role {
  illustration: ComponentType<{ size?: number; className?: string }>;
  name: string;
  emoji: string;
  description: string;
  detail: string;
}

export interface CollaborativePair {
  emojis: string;
  name: string;
  nickname: string;
  description: string;
  weeks: string;
}

export interface WeeklyRhythmItem {
  day: string;
  emoji: string;
  activity: string;
}

export interface WeekHighlight {
  week: string;
  label: string;
  desc: string;
}

export interface InSpaceFormat {
  name: string;
  description: string;
  frequency?: string;
}

export interface InSpaceMoment {
  week: string;
  label: string;
}

export interface AIDevelopmentStage {
  stage: string;
  aiRole: string;
  humanRole: string;
}

export interface BuilderBlock {
  title: string;
  description: string;
}

export interface PartnerLogo {
  name: string;
  href: string;
  src: string;
  alt: string;
  height: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface PlatformCard {
  icon: string;
  title: string;
  subtitle: string;
  href: string;
  description: string;
  isPrimary?: boolean;
}

/* ============================================
   Data
   ============================================ */

export const roles: Role[] = [
  {
    illustration: HackerIllustration,
    name: "HACKER",
    emoji: "🔨",
    description: "The Builder + Code Owner",
    detail: "Writes the code. Owns architecture, APIs, deployment.",
  },
  {
    illustration: HustlerIllustration,
    name: "HUSTLER",
    emoji: "📣",
    description: "The Seller + Business Lead",
    detail: "Gets users, closes deals, tells the story.",
  },
  {
    illustration: HipsterIllustration,
    name: "HIPSTER",
    emoji: "🎨",
    description: "The Brand + Growth Marketer",
    detail: "Builds the brand and grows the audience.",
  },
  {
    illustration: HoundIllustration,
    name: "HOUND",
    emoji: "🔍",
    description: "The Researcher + Data Lead",
    detail: "Finds the truth. Owns user research and analytics.",
  },
];

export const collaborativePairs: CollaborativePair[] = [
  {
    emojis: "🔨 × 🎨",
    name: "Hacker × Hipster",
    nickname: "The Product Pair",
    description:
      "UI/UX lives here. Hipster designs, Hacker codes. They co-own the look, feel, and usability.",
    weeks: "1, 3, 4, 7, 8",
  },
  {
    emojis: "🔨 × 🔍",
    name: "Hacker × Hound",
    nickname: "The Quality Pair",
    description:
      "Hound finds friction and bugs. Hacker fixes them. Together they eliminate gaps.",
    weeks: "3, 4, 5, 7, 8, 10",
  },
  {
    emojis: "🔨 × 📣",
    name: "Hacker × Hustler",
    nickname: "The Ship Pair",
    description:
      "Deployment meets distribution. Hacker pushes to production. Hustler announces it.",
    weeks: "1, 6, 9, 10",
  },
  {
    emojis: "📣 × 🎨",
    name: "Hustler × Hipster",
    nickname: "The Growth Pair",
    description:
      "Hustler writes the story. Hipster makes it beautiful. Brand meets business.",
    weeks: "2, 6, 7, 9, 11-12",
  },
  {
    emojis: "📣 × 🔍",
    name: "Hustler × Hound",
    nickname: "The Strategy Pair",
    description:
      "Hound delivers data. Hustler turns it into pricing, positioning, and investor narratives.",
    weeks: "4, 8, 10, 11-12",
  },
  {
    emojis: "🎨 × 🔍",
    name: "Hipster × Hound",
    nickname: "The Empathy Pair",
    description:
      "Hound knows what users said. Hipster knows how to say it back. Content that resonates.",
    weeks: "2, 5, 6, 9",
  },
];

export const weeklyRhythm: WeeklyRhythmItem[] = [
  {
    day: "Monday",
    emoji: "🚀",
    activity: "Sprint Kickoff",
  },
  {
    day: "Tuesday\u2013Thursday",
    emoji: "🔨",
    activity: "Build, ship, collaborate",
  },
  {
    day: "Wednesday",
    emoji: "🎮",
    activity:
      "Mid-week Team Challenge",
  },
  {
    day: "Friday",
    emoji: "🚢",
    activity:
      "Ship, Share, Learn",
  },
  {
    day: "Saturday",
    emoji: "📝",
    activity: "Weekly retrospective",
  },
];

export const weekHighlights: WeekHighlight[] = [
  { week: "1", label: "Go Live", desc: "Launch your landing page, collect your first 50 waitlist signups, and start talking to real users." },
  { week: "2", label: "First Experience", desc: "Build your sign-up flow and dashboard so users can actually interact with your product." },
  { week: "3", label: "Core Feature", desc: "Ship the main feature that solves your user's #1 problem — end to end, fully working." },
  { week: "4", label: "Deepen the Product", desc: "Add your second feature and start tracking how users behave inside your product." },
  { week: "5-6", label: "Expand & Retain", desc: "Connect to external services, add notifications, and build the systems that keep users coming back." },
  { week: "7-8", label: "Launch-Ready", desc: "Perfect your onboarding, lock down security, and set up payments so you're ready for the world." },
  { week: "9", label: "Public Launch", desc: "Go public. Get 50+ real signups, 10+ active users, and earn your first revenue." },
  { week: "10", label: "Grow & Monetize", desc: "Double down on what's working. Optimize revenue and start preparing your investor pitch." },
  { week: "11", label: "Pitch Ready", desc: "Lock in your product, rehearse your pitch, and get final mentor feedback before the big day." },
  { week: "12", label: "Demo Day", desc: "Take the stage. Pitch to investors, mentors, and the community. Graduate from Z1 Forge." },
];

export const outcomes: string[] = [
  "Live production-deployed product",
  "50+ real signups and 10+ active users",
  "2+ third-party integrations",
  "Payment billing with free + paid tiers",
  "Investor-ready pitch deck",
  "90-day product roadmap",
  "Brand identity and social presence",
  "First revenue or validated pricing",
];

export const inSpaceFormats: InSpaceFormat[] = [
  {
    name: "Grit Chronicles",
    description:
      "Intimate fireside chats with successful founders sharing their raw, unfiltered journeys \u2014 the struggles, pivots, and breakthroughs that shaped their companies.",
    frequency: "Monthly",
  },
  {
    name: "Breakpoints.live",
    description:
      "Broadcast layer for challenges and community moments \u2014 mid-week challenges livestreamed so the broader SBV community watches, engages, and participates.",
  },
  {
    name: "InSpace Pitch",
    description:
      "Powers Week 12 Demo Day and the Week 6 mid-program soft pitch checkpoint \u2014 real panel, real feedback, real pressure.",
  },
];

export const inSpaceMoments: InSpaceMoment[] = [
  { week: "1", label: "First Grit Chronicles (monthly)" },
  { week: "3", label: "First Breakpoints.live stream" },
  { week: "6", label: "InSpace Pitch (Mid-Program)" },
  { week: "9", label: "Launch week Breakpoints.live" },
  { week: "12", label: "InSpace Pitch (Demo Day)" },
];

export const aiDevelopmentStages: AIDevelopmentStage[] = [
  {
    stage: "Scaffolding",
    aiRole: "AI generates project structure, configs, boilerplate",
    humanRole: "Team defines architecture decisions and tech choices",
  },
  {
    stage: "Feature Building",
    aiRole: "AI pair-programs CRUD, API routes, UI components",
    humanRole: "Hacker reviews, tests, and owns the merge",
  },
  {
    stage: "Design",
    aiRole: "AI generates UI layouts, color palettes, component variations",
    humanRole: "Hipster directs brand vision, selects final designs",
  },
  {
    stage: "Content",
    aiRole: "AI drafts copy, social posts, email templates",
    humanRole: "Hustler edits voice, approves messaging",
  },
  {
    stage: "Research",
    aiRole: "AI synthesizes competitor data, market trends",
    humanRole: "Hound interprets insights, runs real interviews",
  },
  {
    stage: "Testing",
    aiRole: "AI generates test suites, identifies edge cases",
    humanRole: "Hound + Hacker verify real-world behavior",
  },
  {
    stage: "Polish",
    aiRole: "AI handles responsive fixes, accessibility, SEO",
    humanRole: "Team makes final UX decisions",
  },
];

export const builderBlocks: BuilderBlock[] = [
  {
    title: "Every niche. Every market.",
    description:
      "Fintech, edtech, healthtech, logistics, AI tools, marketplaces, creator platforms, SaaS, hardware + software combos \u2014 if you can build it and ship it to real users, it belongs here.",
  },
  {
    title: "Your problem. Your market. Global reach.",
    description:
      "Build for the community you know best. Solve local pain points or go after a worldwide audience from day one \u2014 the framework works either way.",
  },
  {
    title: "Nobody builds alone.",
    description:
      "The 4H framework means every team has a builder, a seller, a designer, and a researcher. The weekly challenges create camaraderie. The rhythm builds discipline. You ship together or you don\u2019t ship at all.",
  },
  {
    title: "A network that lasts beyond 12 weeks.",
    description:
      "Z1 alumni stay connected through the SBV community \u2014 mentor access, investor introductions, peer accountability, and co-building opportunities long after Demo Day.",
  },
];

export const partnerLogos: PartnerLogo[] = [
  {
    name: "Starting Block Ventures",
    href: "https://sbv.one",
    src: "/sbv_logo_dark.svg",
    alt: "Starting Block Ventures",
    height: "h-7 sm:h-8 md:h-10",
  },
  {
    name: "Bull Run Consulting",
    href: "https://bullrun.one",
    src: "/bullrun_logo.png",
    alt: "Bull Run Consulting",
    height: "h-8 sm:h-9 md:h-11",
  },
  {
    name: "Breakpoints.live",
    href: "https://breakpoints.live",
    src: "/breakpointslive_logo.jpg",
    alt: "Breakpoints.live",
    height: "h-8 sm:h-9 md:h-11",
  },
  {
    name: "Incub8space",
    href: "https://incub8space.com",
    src: "/incub8space_logo.svg",
    alt: "Incub8space",
    height: "h-8 sm:h-9 md:h-11",
  },
  {
    name: "RealBoss",
    href: "https://realboss.ai",
    src: "/realboss-logo.svg",
    alt: "RealBoss",
    height: "h-8 sm:h-9 md:h-11",
  },
];

export const stats: Stat[] = [
  { value: "12", label: "Weeks" },
  { value: "4H", label: "Team Framework" },
  { value: "1", label: "Live Product" },
  { value: "4", label: "Platforms" },
];

export const platformCards: PlatformCard[] = [
  {
    icon: "Rocket",
    title: "Forge",
    subtitle: "z1.sbv.one",
    href: "https://z1.sbv.one",
    description: "Intake, vetting, team matching, and progress tracking.",
    isPrimary: true,
  },
  {
    icon: "Users",
    title: "Mentor",
    subtitle: "mentor.sbv.one",
    href: "https://mentor.sbv.one",
    description: "Expert mentors on demand. Browse, book, and learn from the best.",
  },
  {
    icon: "Trophy",
    title: "Pitch",
    subtitle: "pitch.sbv.one",
    href: "https://pitch.sbv.one",
    description: "Pitch deck submission, investor visibility, and co-founder matching.",
  },
  {
    icon: "Radio",
    title: "InSpace",
    subtitle: "inspace.sbv.one",
    href: "https://inspace.sbv.one",
    description:
      "Community events — monthly Grit Chronicles, pitch nights, Breakpoints.live streams, and Demo Day.",
  },
];
