/* ──────────────────────────────────────────────
   Z1 Forge Program Data
   All 12 weeks + 3 alumni months
   ────────────────────────────────────────────── */

// ── Types ──

export interface RoleTask {
  task: string;
}

export interface RoleChecklist {
  role: "Hacker" | "Hustler" | "Hipster" | "Hound";
  code: "Hk" | "Hu" | "Hp" | "Hd";
  tasks: RoleTask[];
  estimatedHours: number;
}

export interface Collaboration {
  roles: string;
  description: string;
}

export interface WeekData {
  week: number;
  slug: string;
  title: string;
  phase: number;
  phaseName: string;
  phaseGoal: string;
  shipTarget: string;
  principle: {
    name: string;
    quote: string;
  };
  challenge: {
    name: string;
    description: string;
    successCriteria: string;
  };
  webinar: string;
  collaborations: Collaboration[];
  mentorBooking: string;
  roles: RoleChecklist[];
  milestone: string;
}

export interface AlumniMonth {
  month: number;
  weeksRange: string;
  title: string;
  focus: string;
  objectives: string[];
  activities: { role: string; tasks: string[] }[];
  phSpecific: string[];
  milestone: string;
}

export interface PhaseInfo {
  phase: number;
  name: string;
  subtitle: string;
  goal: string;
  weeks: number[];
}

// ── Phases ──

export const phases: PhaseInfo[] = [
  {
    phase: 1,
    name: "Foundation",
    subtitle: "Clarity, Validation, First Code",
    goal: "Clarity, Problem Validation, Founder Positioning",
    weeks: [1, 2, 3],
  },
  {
    phase: 2,
    name: "Build",
    subtitle: "Ship Fast, Integrate Deep",
    goal: "Ship MVP Fast with Deep Integrations",
    weeks: [4, 5, 6, 7],
  },
  {
    phase: 3,
    name: "Traction",
    subtitle: "Prove Demand & Revenue",
    goal: "Prove Demand & Revenue Potential",
    weeks: [8, 9, 10],
  },
  {
    phase: 4,
    name: "Demo Day",
    subtitle: "Investment-Ready Narrative",
    goal: "Investment-Ready Narrative & Graduation",
    weeks: [11, 12],
  },
];

// ── Weekly Principles ──

export const weeklyPrinciples = [
  { week: 1, name: "Zero to One", short: "The hardest leap is from idea to something real." },
  { week: 2, name: "4H > Solo", short: "No one person can hack, hustle, market, and research." },
  { week: 3, name: "Ship > Plan", short: "A working feature beats a wireframe." },
  { week: 4, name: "Ship, Share, Learn", short: "Push to production, share with users, collect feedback." },
  { week: 5, name: "Stack Once, Scale Forever", short: "Production-grade integrations from Day 1." },
  { week: 6, name: "Build in Public", short: "Social proof compounds. Every post builds trust." },
  { week: 7, name: "Focus on the User", short: "Every great product earns trust in the first 60 seconds." },
  { week: 8, name: "Consistency > Intensity", short: "3 focused hours daily beats a 14-hour weekend binge." },
  { week: 9, name: "Mentors on Demand", short: "Book every SBV Mentor you can. Launch is a team sport." },
  { week: 10, name: "Everyone Ships", short: "Every role contributes to pricing, pitch, and final polish." },
  { week: 11, name: "Ready > Perfect", short: "The last 20% of polish kills more startups than a missing feature." },
  { week: 12, name: "Beyond Zero to One", short: "You've made the leap. Now the real work begins." },
];

// ── Weeks ──

export const weeks: WeekData[] = [
  // ═══════════════════════════════════════════
  // WEEK 1
  // ═══════════════════════════════════════════
  {
    week: 1,
    slug: "week-1",
    title: "Go Live, Collect Interest, Start Building",
    phase: 1,
    phaseName: "Foundation",
    phaseGoal: "Clarity, Validation, First Code",
    shipTarget:
      "A live landing page collecting emails + working signup backend + first 50 waitlist signups from real people.",
    principle: {
      name: "Zero to One",
      quote:
        "The hardest leap is from idea to something real. With AI-assisted engineering, \"something real\" means a deployed product with a database on Day 1. Spec-Driven Development is the practice: teams create structured specifications in Markdown, feed them to AI agents alongside architectural guidelines, and iterate on working code. No more vibe coding. No more 50-slide decks before a single line ships.",
    },
    challenge: {
      name: "The 50-Email Sprint",
      description:
        "First team to collect 50 real waitlist signups wins. No fake emails. No team members signing up for each other. Real humans, real interest. For Philippine-focused products: at least 30 must come from Filipino users.",
      successCriteria: "50 verified unique emails from non-team sources.",
    },
    webinar: "Zero to One Thinking — The Z1 Framework | Founder-Market Fit | Problem Selection Matrix",
    collaborations: [
      {
        roles: "Hacker \u00d7 Hipster",
        description:
          "Co-build the landing page. Hipster defines visual direction and copy (in English, Taglish, or Filipino depending on target market), Hacker implements using AI-assisted tools. With agentic engineering, the handoff between design intent and working code happens in hours.",
      },
    ],
    mentorBooking:
      "Product mentor (validate problem) or Growth mentor (launch channels). Philippine founders: consider mentors familiar with local distribution \u2014 Facebook Groups, Viber communities, and the GCash ecosystem.",
    roles: [
      {
        role: "Hacker",
        code: "Hk",
        estimatedHours: 25,
        tasks: [
          { task: "Scaffold full project using AI-assisted engineering (Cursor, Claude Code, Windsurf, or similar)" },
          { task: "Use Spec-Driven Development: write a structured spec in Markdown before prompting AI agents" },
          { task: "Deploy to production hosting on Day 1 (Vercel, Railway, or similar)" },
          { task: "Set up database with user/waitlist tables" },
          { task: "Build email capture form with validation + auto welcome email" },
          { task: "Install analytics (PostHog, Mixpanel, or similar)" },
          { task: "Begin auth scaffolding for Week 2" },
        ],
      },
      {
        role: "Hustler",
        code: "Hu",
        estimatedHours: 18,
        tasks: [
          { task: "Share landing page in 10+ communities: Facebook Groups (PH tech, startup, and industry-specific), X, Reddit, Indie Hackers, Discord servers, Viber groups, local tech communities" },
          { task: "Personal outreach to 30+ potential users" },
          { task: "Track signups by source" },
          { task: "Begin scheduling customer discovery interviews" },
          { task: "Start documenting BIR/SEC compliance requirements" },
        ],
      },
      {
        role: "Hipster",
        code: "Hp",
        estimatedHours: 15,
        tasks: [
          { task: "Design brand identity: logo, color palette, typography, voice" },
          { task: "Write headline, subheadline, and benefit statements \u2014 localize if targeting Filipino consumers" },
          { task: "Create social media accounts (Facebook, Instagram, X, TikTok) and first 5 posts" },
          { task: "Design Open Graph image for social sharing" },
          { task: "Build content calendar for Weeks 1\u20134" },
        ],
      },
      {
        role: "Hound",
        code: "Hd",
        estimatedHours: 16,
        tasks: [
          { task: "Conduct 8\u201310 user discovery interviews (30 min each) \u2014 prioritize in-person or video calls with target users" },
          { task: "Document pain points, verbatim quotes, and patterns" },
          { task: "Validate problem statement with real data" },
          { task: "Competitor analysis: 5\u201310 alternatives mapped with gaps (include both global and Philippine-specific competitors)" },
        ],
      },
    ],
    milestone:
      "Live deployed product collecting real interest, validated problem with evidence.",
  },

  // ═══════════════════════════════════════════
  // WEEK 2
  // ═══════════════════════════════════════════
  {
    week: 2,
    slug: "week-2",
    title: "Sign-Up Flow, Dashboard & First User Experience",
    phase: 1,
    phaseName: "Foundation",
    phaseGoal: "Clarity, Validation, First Code",
    shipTarget:
      "Users can sign up, log in, see a personalized dashboard, and complete one meaningful action.",
    principle: {
      name: "4H > Solo",
      quote:
        "No one person can hack, hustle, market, and research. This week we learn to trust each other\u2019s lanes \u2014 and when to cross them.",
    },
    challenge: {
      name: "The Persona Slam",
      description:
        "Each Hound presents their top user persona to all teams. For PH-focused products, personas must include socioeconomic context, digital behavior patterns, and payment preferences. Teams vote on the most vivid, research-backed persona.",
      successCriteria: "Present persona with research backing.",
    },
    webinar: "How to Conduct Non-Biased User Interviews | Extracting Buying Signals from Discovery Calls | Building in Public from Day One — Your First 10 Posts",
    collaborations: [
      {
        roles: "Hustler \u00d7 Hipster",
        description:
          "Co-create the \u201cBuilding in Public\u201d series. Hustler writes the narrative, Hipster designs the visuals.",
      },
      {
        roles: "Hipster \u00d7 Hound",
        description:
          "Hound shares user language and pain points, Hipster weaves them into brand messaging.",
      },
    ],
    mentorBooking:
      "Technical mentor (auth architecture, AI tooling setup) or Product mentor (value proposition review).",
    roles: [
      {
        role: "Hacker",
        code: "Hk",
        estimatedHours: 28,
        tasks: [
          { task: "Implement full authentication (signup, login, password reset, session management)" },
          { task: "Build protected dashboard layout" },
          { task: "Database schema for core entities + migrations" },
          { task: "Settings page with profile update" },
          { task: "Begin core feature backend \u2014 use agent-first workflow for scaffolding auth + dashboard + core feature in the same week" },
        ],
      },
      {
        role: "Hustler",
        code: "Hu",
        estimatedHours: 14,
        tasks: [
          { task: "Email waitlist with product screenshot + community invite" },
          { task: "Launch community channel (Discord, Viber group, or Facebook Group depending on market)" },
          { task: "Draft 30-second elevator pitch in English and Taglish" },
          { task: "Start tracking user acquisition sources" },
          { task: "Begin outreach to potential launch partners" },
        ],
      },
      {
        role: "Hipster",
        code: "Hp",
        estimatedHours: 14,
        tasks: [
          { task: "Create \u201cBuilding in public\u201d social media series" },
          { task: "Design email template for waitlist updates" },
          { task: "Product screenshots styled for social sharing" },
          { task: "Community welcome message and channel graphics" },
        ],
      },
      {
        role: "Hound",
        code: "Hd",
        estimatedHours: 16,
        tasks: [
          { task: "Create 1\u20132 detailed user personas from interview data \u2014 include digital payment preferences (GCash, Maya, bank transfer, cash)" },
          { task: "Map current user journey (how they solve the problem today)" },
          { task: "Draft Value Proposition Canvas" },
          { task: "Define the \u201caha moment\u201d" },
        ],
      },
    ],
    milestone:
      "Authenticated product with dashboard, core feature in development, growing community.",
  },

  // ═══════════════════════════════════════════
  // WEEK 3
  // ═══════════════════════════════════════════
  {
    week: 3,
    slug: "week-3",
    title: "Core Feature Complete, End-to-End Working",
    phase: 1,
    phaseName: "Foundation",
    phaseGoal: "Clarity, Validation, First Code",
    shipTarget:
      "The primary action users came for is working end-to-end. First 10+ beta users are actively using it.",
    principle: {
      name: "Ship > Plan",
      quote:
        "A working feature beats a wireframe. Ship every Friday, no exceptions.",
    },
    challenge: {
      name: "The 3-Minute Demo Duel",
      description:
        "Each team\u2019s Hustler demos the core feature in under 3 minutes. Other teams rate clarity, excitement, and \u201cwould I use this?\u201d score.",
      successCriteria: "Live demo under 3 minutes.",
    },
    webinar: "Spec-Driven Development: Specify → Plan → Tasks → Implement | Value Proposition Framework | Outcome-Based Positioning",
    collaborations: [
      {
        roles: "Hacker \u00d7 Hipster",
        description:
          "Hipster writes empty states, tooltip microcopy, and button labels. Hacker implements them. The product starts to feel human.",
      },
      {
        roles: "Hacker \u00d7 Hound",
        description:
          "Hound runs usability tests, Hacker watches and prioritizes fixes.",
      },
    ],
    mentorBooking:
      "Technical mentor (API design, AI-assisted code review) or Product mentor (feature scoping).",
    roles: [
      {
        role: "Hacker",
        code: "Hk",
        estimatedHours: 30,
        tasks: [
          { task: "Build complete backend: API routes for core feature with full CRUD, validation, and error handling" },
          { task: "Connect frontend to backend with loading and error states" },
          { task: "Deploy to staging, test end-to-end" },
          { task: "Use AI-assisted tools to generate tests for critical paths" },
          { task: "Deploy to production with beta users accessing real functionality" },
          { task: "Begin evaluating payment integration options (PayMongo, Xendit) for Week 8" },
        ],
      },
      {
        role: "Hustler",
        code: "Hu",
        estimatedHours: 16,
        tasks: [
          { task: "Record demo of the feature in action" },
          { task: "Share demo with beta users, collect 10+ feedback responses" },
          { task: "Start feature request backlog" },
          { task: "Identify 5 potential launch partners or communities" },
          { task: "For PH: identify relevant Facebook Groups, Viber communities, and local tech events" },
        ],
      },
      {
        role: "Hipster",
        code: "Hp",
        estimatedHours: 14,
        tasks: [
          { task: "Create social content showing the feature being built (time-lapse, screenshots, short video)" },
          { task: "Write product copy: feature description, tooltip text, empty states" },
          { task: "Design marketing page section" },
          { task: "Post 5+ social updates this week" },
        ],
      },
      {
        role: "Hound",
        code: "Hd",
        estimatedHours: 16,
        tasks: [
          { task: "Run 5 usability tests on core feature with target users" },
          { task: "Create friction log: where users hesitate, get confused, drop off" },
          { task: "Measure time-to-complete for the core action" },
          { task: "Synthesize into top 3 improvement priorities" },
        ],
      },
    ],
    milestone:
      "Working core product with real users, validated usability, active feedback loop.",
  },

  // ═══════════════════════════════════════════
  // WEEK 4
  // ═══════════════════════════════════════════
  {
    week: 4,
    slug: "week-4",
    title: "Second Feature + Analytics Instrumentation",
    phase: 2,
    phaseName: "Build",
    phaseGoal: "Ship Fast, Integrate Deep",
    shipTarget:
      "Second key feature working and connected to Feature #1. Analytics events firing on all core actions.",
    principle: {
      name: "Ship, Share, Learn",
      quote:
        "Every Friday: push to production, share with users, collect feedback. One loop at a time.",
    },
    challenge: {
      name: "The Feedback Bingo",
      description:
        "Each team creates a bingo card of feedback types (feature request, bug report, compliment, confusion, \u201cI\u2019d pay for this\u201d). First team to fill a row from real user feedback wins.",
      successCriteria: "Complete bingo row with real feedback.",
    },
    webinar: "Orchestrating AI Agents: Claude Code, Cursor, and Windsurf in Practice | Avoiding Feature Creep with Agentic Workflows | Analytics That Matter: Instrumenting PostHog from Day One",
    collaborations: [
      {
        roles: "Hacker \u00d7 Hound",
        description:
          "Hound defines which analytics events matter. Hacker instruments them. Data starts flowing.",
      },
      {
        roles: "Hustler \u00d7 Hound",
        description:
          "Hound synthesizes feedback data. Hustler uses it to refine positioning.",
      },
    ],
    mentorBooking:
      "Product mentor (data model review) or Growth mentor (community strategy).",
    roles: [
      {
        role: "Hacker",
        code: "Hk",
        estimatedHours: 28,
        tasks: [
          { task: "Build Feature #2 backend + database migrations" },
          { task: "Integration logic between Features #1 and #2" },
          { task: "Add analytics events for all core user actions" },
          { task: "Performance check and optimization" },
          { task: "Use AI-assisted tooling to accelerate integration testing" },
        ],
      },
      {
        role: "Hustler",
        code: "Hu",
        estimatedHours: 14,
        tasks: [
          { task: "Push update to production, announce to community" },
          { task: "Create \u201cWhat\u2019s New\u201d changelog post" },
          { task: "Collect feedback on Feature #2 from beta testers" },
          { task: "Begin outreach to 5 potential launch partners" },
        ],
      },
      {
        role: "Hipster",
        code: "Hp",
        estimatedHours: 14,
        tasks: [
          { task: "Create product update graphics for social media" },
          { task: "Write changelog blog post or social thread" },
          { task: "Design consistent visual style across all screens (screenshot audit)" },
          { task: "Grow social following: engage with target communities daily" },
        ],
      },
      {
        role: "Hound",
        code: "Hd",
        estimatedHours: 16,
        tasks: [
          { task: "Define and verify analytics events are firing correctly" },
          { task: "Run 3 usability tests covering both features together" },
          { task: "Analyze early usage patterns from analytics data" },
          { task: "Updated feedback synthesis: what\u2019s working vs. what\u2019s not" },
        ],
      },
    ],
    milestone:
      "Multi-feature product with data flowing, active user feedback loop.",
  },

  // ═══════════════════════════════════════════
  // WEEK 5
  // ═══════════════════════════════════════════
  {
    week: 5,
    slug: "week-5",
    title: "First Integration + Partner Ecosystem",
    phase: 2,
    phaseName: "Build",
    phaseGoal: "Ship Fast, Integrate Deep",
    shipTarget:
      "First third-party integration live and working for users.",
    principle: {
      name: "Stack Once, Scale Forever",
      quote:
        "Production-grade integrations from Day 1. Build to last, not for a demo.",
    },
    challenge: {
      name: "The Integration Relay",
      description:
        "Teams race to get their integration working end-to-end. Hound writes test cases, Hacker builds it, Hipster writes user-facing docs, Hustler announces it. All four must finish.",
      successCriteria: "All 4 roles complete their relay leg.",
    },
    webinar: "Stack Once, Scale Forever: Production-Grade API Integration | The Philippine Integration Stack: GCash, Maya, Xendit, PayMongo | Background Agents: Managing Multiple AI Dev Streams in Parallel",
    collaborations: [
      {
        roles: "Hipster \u00d7 Hound",
        description:
          "Hound documents failure modes and edge cases. Hipster turns them into clear, friendly error messages and help documentation.",
      },
    ],
    mentorBooking:
      "Technical mentor (API architecture, security) or Business mentor (partnership strategy).",
    roles: [
      {
        role: "Hacker",
        code: "Hk",
        estimatedHours: 28,
        tasks: [
          { task: "Set up API keys, build integration service layer as separate module" },
          { task: "Main integration logic + webhook handling" },
          { task: "Error handling: rate limits, timeouts, API failures" },
          { task: "Deploy with live keys, test on production" },
          { task: "For PH consumer products: begin GCash or Maya API exploration for payment integration in Week 8" },
        ],
      },
      {
        role: "Hustler",
        code: "Hu",
        estimatedHours: 14,
        tasks: [
          { task: "Communicate new capability to beta users with use-case examples" },
          { task: "Reach out to integration partner for co-marketing" },
          { task: "Update elevator pitch to include integration value" },
          { task: "Track integration adoption rate" },
        ],
      },
      {
        role: "Hipster",
        code: "Hp",
        estimatedHours: 14,
        tasks: [
          { task: "Create \u201cNow integrated with [X]\u201d announcement content" },
          { task: "Design integration status UI elements" },
          { task: "Write help docs or FAQ for the integration" },
          { task: "Social media campaign around the integration" },
        ],
      },
      {
        role: "Hound",
        code: "Hd",
        estimatedHours: 16,
        tasks: [
          { task: "Test edge cases: API down, invalid input, timeout scenarios" },
          { task: "Document all failure modes and user-facing error messages" },
          { task: "Collect integration feedback from 5+ beta users" },
          { task: "Benchmark: does integration improve core engagement metric?" },
        ],
      },
    ],
    milestone:
      "Product with partner integration live, expanding value proposition.",
  },

  // ═══════════════════════════════════════════
  // WEEK 6
  // ═══════════════════════════════════════════
  {
    week: 6,
    slug: "week-6",
    title: "Notifications, Second Integration & Retention Systems",
    phase: 2,
    phaseName: "Build",
    phaseGoal: "Ship Fast, Integrate Deep",
    shipTarget:
      "Second integration + automated email and in-app notifications. Users are coming back without being asked.",
    principle: {
      name: "Build in Public",
      quote:
        "Social proof compounds. Every post, every update, every behind-the-scenes moment builds trust before launch day.",
    },
    challenge: {
      name: "The Notification Showdown",
      description:
        "Teams design and send their best transactional email. All participants vote: which email would you actually open? Which would make you come back?",
      successCriteria: "Submit transactional email design.",
    },
    webinar: "Retention Loops | Automated Notifications: Email, Push, and In-App at Speed | Build in Public: Turning Your Build Log into a Growth Engine",
    collaborations: [
      {
        roles: "Hacker \u00d7 Hustler",
        description:
          "Hustler maps notification strategy (what triggers what). Hacker builds the system.",
      },
      {
        roles: "Hipster \u00d7 Hound",
        description:
          "Hound provides walkthrough insights. Hipster uses real friction points to refine pre-launch messaging.",
      },
    ],
    mentorBooking:
      "Growth mentor (launch prep) or Technical mentor (notification architecture).",
    roles: [
      {
        role: "Hacker",
        code: "Hk",
        estimatedHours: 30,
        tasks: [
          { task: "Build second integration following same service-layer pattern" },
          { task: "Email notification system: 3\u20134 transactional templates (welcome, activity digest, milestone, re-engagement)" },
          { task: "In-app notification center or activity feed" },
          { task: "Notification preferences in user settings" },
        ],
      },
      {
        role: "Hustler",
        code: "Hu",
        estimatedHours: 16,
        tasks: [
          { task: "Schedule 5 screen-share sessions with beta users" },
          { task: "Write case study or testimonial from most active beta user" },
          { task: "Draft launch timeline and channel strategy for Week 9" },
          { task: "Pre-launch buzz: teaser posts, countdown content" },
        ],
      },
      {
        role: "Hipster",
        code: "Hp",
        estimatedHours: 16,
        tasks: [
          { task: "Design branded email templates (mobile-friendly \u2014 80%+ of Philippine internet access is mobile)" },
          { task: "Notification center UI" },
          { task: "Teaser/countdown content for upcoming launch" },
          { task: "Daily posting cadence established" },
        ],
      },
      {
        role: "Hound",
        code: "Hd",
        estimatedHours: 16,
        tasks: [
          { task: "5 full user walkthroughs" },
          { task: "Compile comprehensive feedback report across all 6 weeks" },
          { task: "Measure activation rate: % of signups completing core action" },
          { task: "Define success metrics for launch week" },
        ],
      },
    ],
    milestone:
      "Retention systems active, pre-launch momentum building, comprehensive user data.",
  },

  // ═══════════════════════════════════════════
  // WEEK 7
  // ═══════════════════════════════════════════
  {
    week: 7,
    slug: "week-7",
    title: "Onboarding Perfection & Launch Readiness",
    phase: 2,
    phaseName: "Build",
    phaseGoal: "Ship Fast, Integrate Deep",
    shipTarget:
      "New users reach \u201caha moment\u201d in under 2 minutes. Product is launch-ready.",
    principle: {
      name: "Focus on the User",
      quote:
        "Every great product earns trust in the first 60 seconds. Obsess over onboarding.",
    },
    challenge: {
      name: "The Cold User Test",
      description:
        "Each team recruits someone who has never seen the product. Screen-share and time how long they take to reach the aha moment. Shortest time wins.",
      successCriteria: "Screen-share recording with timing.",
    },
    webinar: "Focus on the User — Designing the First 60 Seconds | Feedback Systems | Metrics That Matter",
    collaborations: [
      {
        roles: "Hacker \u00d7 Hipster",
        description:
          "Hipster designs the entire onboarding experience. Hacker implements every pixel.",
      },
      {
        roles: "Hacker \u00d7 Hound",
        description:
          "Hound identifies friction points from cold tests. Hacker fixes them same-day.",
      },
    ],
    mentorBooking:
      "Product mentor (onboarding review) or Growth mentor (launch readiness check).",
    roles: [
      {
        role: "Hacker",
        code: "Hk",
        estimatedHours: 26,
        tasks: [
          { task: "Build guided onboarding flow (tooltips, checklist, or welcome modal)" },
          { task: "Performance optimization: lazy loading, caching, image optimization" },
          { task: "SEO: meta tags, OG images, favicon, sitemap" },
          { task: "Target page load under 2 seconds (critical for PH mobile networks)" },
          { task: "AI-assisted code review for security and performance" },
        ],
      },
      {
        role: "Hustler",
        code: "Hu",
        estimatedHours: 14,
        tasks: [
          { task: "Write all onboarding copy, CTAs, and welcome email sequence" },
          { task: "SEO keyword research and meta descriptions" },
          { task: "Finalize launch asset checklist for Week 9" },
          { task: "Confirm cross-promotion partners" },
        ],
      },
      {
        role: "Hipster",
        code: "Hp",
        estimatedHours: 16,
        tasks: [
          { task: "Design onboarding visuals and animations" },
          { task: "Full mobile responsiveness audit (mobile-first for PH market)" },
          { task: "Create product demo GIF or short video for social" },
          { task: "Launch graphics package: social cards, banners, email header" },
        ],
      },
      {
        role: "Hound",
        code: "Hd",
        estimatedHours: 14,
        tasks: [
          { task: "Run 5 \u201ccold\u201d usability tests" },
          { task: "Time each person to aha moment" },
          { task: "Identify remaining friction points" },
          { task: "Pre-launch NPS survey with existing beta users" },
        ],
      },
    ],
    milestone:
      "Launch-ready product with optimized onboarding, sub-2-minute time-to-value.",
  },

  // ═══════════════════════════════════════════
  // WEEK 8
  // ═══════════════════════════════════════════
  {
    week: 8,
    slug: "week-8",
    title: "Bulletproof for Launch + Payment Infrastructure",
    phase: 3,
    phaseName: "Traction",
    phaseGoal: "Prove Demand & Revenue",
    shipTarget:
      "Production-grade app: monitored, secure, zero critical bugs. Payment infrastructure live.",
    principle: {
      name: "Consistency > Intensity",
      quote:
        "3 focused hours daily beats a 14-hour weekend binge. Polish and testing separate shipped products from abandoned projects.",
    },
    challenge: {
      name: "The Bug Bounty Blitz",
      description:
        "Teams swap products and try to break each other\u2019s apps. Every real bug = 1 point. Every critical bug = 3 points.",
      successCriteria: "Bug report submissions.",
    },
    webinar: "Founder-Led Growth | Organic Traction Playbook in the Philippine Context | Security, Monitoring, and Going Live: Sentry, Uptime, and NPC Compliance",
    collaborations: [
      {
        roles: "Hacker \u00d7 Hound",
        description:
          "The QA pair. Hound runs full regression. Hacker triages and fixes in real-time.",
      },
      {
        roles: "Hustler \u00d7 Hound",
        description:
          "Hound provides metrics baseline. Hustler sets realistic launch targets.",
      },
    ],
    mentorBooking:
      "Technical mentor (security review) or Business mentor (legal checklist, pricing strategy).",
    roles: [
      {
        role: "Hacker",
        code: "Hk",
        estimatedHours: 35,
        tasks: [
          { task: "Write tests for critical paths (auth, CRUD, integrations, payments)" },
          { task: "Security audit: SQL injection, XSS, CSRF, env vars, rate limiting" },
          { task: "Production infrastructure: domain, SSL, CDN, prod database" },
          { task: "Error monitoring + health check" },
          { task: "Implement payment infrastructure: for PH consumer products, integrate PayMongo or Xendit (supports GCash, Maya, cards, bank transfers); for B2B/SaaS, Stripe or PayMongo" },
          { task: "Build pricing page, free/paid tiers, checkout flow" },
          { task: "AI-assisted security scanning" },
        ],
      },
      {
        role: "Hustler",
        code: "Hu",
        estimatedHours: 18,
        tasks: [
          { task: "Purchase and configure domain" },
          { task: "Legal pages: Terms of Service, Privacy Policy (compliant with Philippine Data Privacy Act of 2012)" },
          { task: "Register with SEC/BIR if not already done" },
          { task: "Set up support email and feedback channel" },
          { task: "Final launch plan: day-by-day schedule for Week 9" },
          { task: "Pricing strategy finalized" },
        ],
      },
      {
        role: "Hipster",
        code: "Hp",
        estimatedHours: 14,
        tasks: [
          { task: "Final UI audit on production URL" },
          { task: "OG images, favicon, app icons finalized" },
          { task: "404 page and maintenance page" },
          { task: "All launch visuals and social content queued" },
          { task: "Pricing page design" },
        ],
      },
      {
        role: "Hound",
        code: "Hd",
        estimatedHours: 18,
        tasks: [
          { task: "Full QA: every screen, button, flow, edge case" },
          { task: "Bug triage: blockers vs. nice-to-fix" },
          { task: "Security checklist verified" },
          { task: "Pre-launch metrics baseline" },
          { task: "Willingness-to-pay analysis from user interviews" },
        ],
      },
    ],
    milestone:
      "Production-grade, secure, payment-ready product. Zero critical bugs. Launch plan locked.",
  },

  // ═══════════════════════════════════════════
  // WEEK 9
  // ═══════════════════════════════════════════
  {
    week: 9,
    slug: "week-9",
    title: "Public Launch + First Revenue",
    phase: 3,
    phaseName: "Traction",
    phaseGoal: "Prove Demand & Revenue",
    shipTarget:
      "100+ real signups, 20+ active users, first paying customers (or 20+ qualified leads for B2B), structured feedback data.",
    principle: {
      name: "Mentors on Demand",
      quote:
        "Book every SBV Mentor you can. Launch is a team sport.",
    },
    challenge: {
      name: "Launch Day Leaderboard",
      description:
        "Real-time leaderboard tracking signups, active users, revenue, social shares, and feedback calls. Updated hourly.",
      successCriteria: "Live metrics dashboard.",
    },
    webinar: "Pricing Psychology | Early Revenue Tactics | Closing Your First Paying Customer — The Conversation Nobody Prepares For",
    collaborations: [
      {
        roles: "Hacker \u00d7 Hustler",
        description:
          "The war room. Hacker monitors systems, Hustler monitors channels. Same call all day.",
      },
      {
        roles: "Hipster \u00d7 Hound",
        description:
          "Hound captures real user reactions from feedback calls. Hipster turns them into social proof in real-time.",
      },
    ],
    mentorBooking:
      "Growth mentor (launch tactics) or any mentor for crisis support.",
    roles: [
      {
        role: "Hacker",
        code: "Hk",
        estimatedHours: 30,
        tasks: [
          { task: "Monitor errors and performance in real-time" },
          { task: "Hotfix critical bugs same-day" },
          { task: "Scale infrastructure if needed" },
          { task: "Ship top 3 quick fixes from Day 1\u20132 feedback" },
          { task: "Monitor payment flow" },
        ],
      },
      {
        role: "Hustler",
        code: "Hu",
        estimatedHours: 25,
        tasks: [
          { task: "Send launch email to full waitlist" },
          { task: "Post on X, LinkedIn, Reddit, Indie Hackers, Facebook Groups, Discord, Product Hunt, Philippine startup communities" },
          { task: "Personal DMs to 30+ target users" },
          { task: "Respond to every comment within 1 hour" },
          { task: "Close first paying customers" },
        ],
      },
      {
        role: "Hipster",
        code: "Hp",
        estimatedHours: 20,
        tasks: [
          { task: "Launch day social media blitz: posts, stories, reels across all platforms (prioritize Facebook and TikTok for PH reach)" },
          { task: "Record and publish 60-second product demo video" },
          { task: "Platform-specific launch graphics" },
          { task: "Live behind-the-scenes content" },
        ],
      },
      {
        role: "Hound",
        code: "Hd",
        estimatedHours: 16,
        tasks: [
          { task: "Conduct 5+ feedback calls (15\u201320 min each)" },
          { task: "Ask: What made you sign up? What\u2019s confusing? What\u2019s missing? Would you pay? How much?" },
          { task: "Log willingness-to-pay signals" },
          { task: "Compile launch metrics: signups, activation, retention, revenue, NPS" },
        ],
      },
    ],
    milestone:
      "Product launched with real users, real revenue, real data.",
  },

  // ═══════════════════════════════════════════
  // WEEK 10
  // ═══════════════════════════════════════════
  {
    week: 10,
    slug: "week-10",
    title: "Growth, Revenue Optimization & Pitch Prep",
    phase: 3,
    phaseName: "Traction",
    phaseGoal: "Prove Demand & Revenue",
    shipTarget:
      "Revenue growing, most-requested feature shipped, pitch deck v1 complete, 90-day roadmap drafted.",
    principle: {
      name: "Everyone Ships",
      quote:
        "Every role contributes to pricing, pitch deck, and final polish. Shipping is a team sport.",
    },
    challenge: {
      name: "The Pitch Draft Roast",
      description:
        "Each Hustler presents pitch deck v1 to all teams. Constructive roasting only. 3 things that work, 3 that don\u2019t.",
      successCriteria: "Pitch deck + peer feedback.",
    },
    webinar: "North Star Metric | Data-Informed Iteration | Pitching Traction: What Philippine Investors Actually Look For",
    collaborations: [
      {
        roles: "Hacker \u00d7 Hound",
        description:
          "Hound delivers final metrics and PMF report. Hacker prioritizes 90-day technical roadmap.",
      },
      {
        roles: "Hustler \u00d7 Hipster",
        description:
          "The pitch pair. Hustler writes narrative and numbers. Hipster designs every slide.",
      },
    ],
    mentorBooking:
      "Fundraising mentor (pitch deck review) or Business mentor (pricing optimization). Leverage SBV\u2019s Pitch platform and network across ASEAN and Greater China for investor intro strategy.",
    roles: [
      {
        role: "Hacker",
        code: "Hk",
        estimatedHours: 28,
        tasks: [
          { task: "Ship #1 most-requested feature + top 3 quick wins" },
          { task: "Optimize payment/billing based on conversion data" },
          { task: "Technical documentation for codebase" },
          { task: "Handoff-ready: README, env setup guide, architecture doc" },
        ],
      },
      {
        role: "Hustler",
        code: "Hu",
        estimatedHours: 22,
        tasks: [
          { task: "Create 10\u201312 slide pitch deck (problem, solution, traction, market, team, ask)" },
          { task: "Research and apply to relevant programs: Antler Philippines, Founders Launchpad, QBO programs, DOST grants, DTI Startup Venture Fund" },
          { task: "Submit early draft to pitch.sbv.one" },
          { task: "Optimize pricing based on data" },
          { task: "Go-to-market strategy for post-bootcamp" },
        ],
      },
      {
        role: "Hipster",
        code: "Hp",
        estimatedHours: 18,
        tasks: [
          { task: "Pitch deck design: clean, branded, investor-ready" },
          { task: "Polished 2-minute product demo video" },
          { task: "Brand guidelines document" },
          { task: "Pricing page iterations based on conversion data" },
        ],
      },
      {
        role: "Hound",
        code: "Hd",
        estimatedHours: 18,
        tasks: [
          { task: "Analyze metrics: activation rate, Day 1/3/7 retention, feature usage, revenue per user" },
          { task: "Run Sean Ellis test (\u201cHow disappointed if this disappeared?\u201d)" },
          { task: "Build 90-day product roadmap from data + feedback" },
          { task: "Final PMF report" },
        ],
      },
    ],
    milestone:
      "Revenue validated, pitch deck in progress, clear PMF trajectory.",
  },

  // ═══════════════════════════════════════════
  // WEEK 11
  // ═══════════════════════════════════════════
  {
    week: 11,
    slug: "week-11",
    title: "Lock It In & Rehearse Your Pitch",
    phase: 4,
    phaseName: "Demo Day",
    phaseGoal: "Investment-Ready Narrative",
    shipTarget:
      "Product freeze \u2014 all features locked, fully documented, production-ready. Pitch rehearsal completed.",
    principle: {
      name: "Ready > Perfect",
      quote:
        "The last 20% of polish kills more startups than a missing feature. Lock the product. Rehearse the pitch. Trust what you\u2019ve built.",
    },
    challenge: {
      name: "The Pitch Rehearsal",
      description:
        "Full dress rehearsal in front of all teams. Full timer. Real Q&A. 3 pieces of constructive feedback per team.",
      successCriteria: "Timed presentation with Q&A.",
    },
    webinar: "Demo Day Deck Framework | Traction Storytelling | Objection Handling — The 20 Questions Investors Will Ask",
    collaborations: [
      {
        roles: "Hustler \u00d7 Hipster",
        description:
          "Final deck polish, timing, delivery.",
      },
      {
        roles: "Hustler \u00d7 Hound",
        description:
          "Data backing every claim. Align on which metrics to highlight.",
      },
    ],
    mentorBooking:
      "Fundraising mentor (pitch deck review) or any mentor for final rehearsal.",
    roles: [
      {
        role: "Hacker",
        code: "Hk",
        estimatedHours: 22,
        tasks: [
          { task: "Final production deploy: all bugs resolved, monitoring green" },
          { task: "Live demo environment prepared and tested (backup plan ready)" },
          { task: "Technical documentation complete" },
          { task: "Performance and security final check" },
        ],
      },
      {
        role: "Hustler",
        code: "Hu",
        estimatedHours: 20,
        tasks: [
          { task: "Rehearse pitch 5+ times with full team" },
          { task: "Submit final pitch deck to pitch.sbv.one" },
          { task: "Finalize investor intro requests via SBV Mentor network" },
          { task: "Post-bootcamp growth plan: 30/60/90-day milestones" },
        ],
      },
      {
        role: "Hipster",
        code: "Hp",
        estimatedHours: 16,
        tasks: [
          { task: "Demo Day slide design and visual polish" },
          { task: "Final 2-minute product demo video (polished, captioned)" },
          { task: "Graduation social media campaign prep" },
          { task: "All marketing assets finalized" },
        ],
      },
      {
        role: "Hound",
        code: "Hd",
        estimatedHours: 16,
        tasks: [
          { task: "Final metrics report: all KPIs from Week 1 to Week 11" },
          { task: "PMF scorecard with Sean Ellis results" },
          { task: "90-day product roadmap (final version)" },
          { task: "Post-bootcamp measurement plan" },
        ],
      },
    ],
    milestone:
      "Demo-ready. Product locked. Pitch rehearsed. Team aligned.",
  },

  // ═══════════════════════════════════════════
  // WEEK 12
  // ═══════════════════════════════════════════
  {
    week: 12,
    slug: "week-12",
    title: "Demo Day \u2014 InSpace Pitch",
    phase: 4,
    phaseName: "Demo Day",
    phaseGoal: "Investment-Ready Narrative",
    shipTarget:
      "Demo Day: polished pitch, live demo, investor-ready package, graduation from Z1 Forge.",
    principle: {
      name: "Beyond Zero to One",
      quote:
        "You\u2019ve made the leap. Now the real work begins.",
    },
    challenge: {
      name: "Demo Day",
      description:
        "Every team presents to mentors, investors, and the full Z1 community via InSpace Pitch. 5 minutes to pitch. 3 minutes of live demo. 2 minutes of Q&A. Awards for Best Product, Best Pitch, Best Growth, Best Revenue, and Community Choice.",
      successCriteria: "Complete Demo Day presentation.",
    },
    webinar: "Beyond Zero to One — Your 90-Day Post-Demo Day Roadmap | Live Demo Day: Investor & Partner Showcase on InSpace",
    collaborations: [
      {
        roles: "All 4H Together",
        description:
          "The Hacker runs the demo. The Hustler delivers the pitch. The Hipster designed the deck. The Hound\u2019s data backs every claim. The team stands together.",
      },
    ],
    mentorBooking:
      "Graduation review. Fundraising mentor for investor intro strategy.",
    roles: [
      {
        role: "Hacker",
        code: "Hk",
        estimatedHours: 18,
        tasks: [
          { task: "Live demo execution with backup plan" },
          { task: "Archive codebase with full documentation and deployment guide" },
          { task: "Technical handoff package" },
          { task: "Support Q&A with technical answers" },
        ],
      },
      {
        role: "Hustler",
        code: "Hu",
        estimatedHours: 16,
        tasks: [
          { task: "Deliver pitch to investors and mentors via InSpace Pitch" },
          { task: "Field Q&A with confidence" },
          { task: "Investor intro requests queued via SBV Pitch platform" },
          { task: "Announce post-bootcamp plans" },
        ],
      },
      {
        role: "Hipster",
        code: "Hp",
        estimatedHours: 14,
        tasks: [
          { task: "Demo Day visuals live" },
          { task: "Record event for content" },
          { task: "Graduation social media campaign: the journey recap" },
          { task: "Brand guidelines and asset library packaged" },
        ],
      },
      {
        role: "Hound",
        code: "Hd",
        estimatedHours: 12,
        tasks: [
          { task: "Present key metrics to back every claim" },
          { task: "Support data-backed Q&A" },
          { task: "Archive all research, analytics, and feedback" },
          { task: "Share post-bootcamp measurement plan" },
        ],
      },
    ],
    milestone: "Official Z1 Forge Graduate.",
  },
];

// ── Alumni Track ──

export const alumniMonths: AlumniMonth[] = [
  {
    month: 1,
    weeksRange: "13\u201316",
    title: "Double Down",
    focus: "Scale what\u2019s working. Kill what isn\u2019t.",
    objectives: [
      "Double active users and MRR from Demo Day baseline",
      "Ship 2\u20133 features based on highest-signal user feedback",
      "Establish repeatable acquisition channel",
      "Begin investor conversations or grant applications",
    ],
    activities: [
      { role: "Hacker", tasks: ["Optimize for scale \u2014 caching, performance, infrastructure"] },
      { role: "Hustler", tasks: ["Run channel experiments, track CAC, begin investor/grant outreach via SBV Pitch network"] },
      { role: "Hipster", tasks: ["Run content engine: case studies, social proof, product updates"] },
      { role: "Hound", tasks: ["Track retention cohorts and feature adoption"] },
    ],
    phSpecific: [
      "Apply for DTI Startup Venture Fund and DOST grants",
      "Explore DICT\u2019s SPARK program for staff upskilling",
      "Treat grants as a bonus, not a lifeline \u2014 disbursement cycles can take six to twelve months",
      "Ensure BIR/SEC compliance is airtight before applying",
      "Document the social impact of your business \u2014 Philippine grant bodies heavily incentivize projects aligned with job creation and poverty reduction",
    ],
    milestone: "2x growth from Demo Day baseline on primary metric.",
  },
  {
    month: 2,
    weeksRange: "17\u201320",
    title: "Systematize",
    focus: "Turn manual processes into systems. Build the machine, not just the product.",
    objectives: [
      "Automate onboarding, support, and key workflows",
      "Establish content marketing or growth flywheel",
      "Formalize pricing and billing",
      "If fundraising: pitch 10+ investors, refine based on feedback",
    ],
    activities: [
      { role: "Hacker", tasks: ["Build automation: onboarding sequences, admin dashboards, internal tools using AI-assisted engineering"] },
      { role: "Hustler", tasks: ["Refine pitch with real post-launch traction, leverage SBV Pitch for investor intros across ASEAN and Greater China"] },
      { role: "Hipster", tasks: ["Establish brand voice at scale"] },
      { role: "Hound", tasks: ["Run cohort analysis, churn analysis, LTV projections"] },
    ],
    phSpecific: [
      "Explore partnerships with local conglomerates (Globe, PLDT/Smart, Ayala, SM) through their innovation arms",
      "Connect with QBO Innovation Hub and IdeaSpace for ecosystem support",
      "Tap into SBV\u2019s network for warm intros to regional investors",
    ],
    milestone: "Repeatable growth system. Product running without daily firefighting.",
  },
  {
    month: 3,
    weeksRange: "21\u201324",
    title: "Accelerate or Sustain",
    focus: "Choose your path \u2014 raise capital, join another accelerator, or build toward profitability.",
    objectives: [
      "For fundraising: close pre-seed or get into a top accelerator (Antler, 500 Global, Y Combinator)",
      "For revenue: reach ramen profitability or clear path to it",
      "For all: 90-day roadmap for next phase",
      "Complete Alumni Demo Day on InSpace",
    ],
    activities: [
      { role: "Hacker", tasks: ["Lead technical roadmap execution, begin hiring planning"] },
      { role: "Hustler", tasks: ["Close fundraise or scale revenue"] },
      { role: "Hipster", tasks: ["Produce investor update template and brand playbook"] },
      { role: "Hound", tasks: ["Deliver final 90-day report: what worked, what didn\u2019t, PMF status"] },
    ],
    phSpecific: [
      "Leverage English fluency to pitch regional and global investors",
      "Explore Singapore-based VCs with SEA focus",
      "Use SBV\u2019s Greater China network for expansion-minded founders",
    ],
    milestone: "Fundraise in progress or revenue sustaining. Clear path forward. Z1 Alumni network activated.",
  },
];

// ── Helpers ──

export function getWeekBySlug(slug: string): WeekData | undefined {
  return weeks.find((w) => w.slug === slug);
}

export function getWeeksByPhase(phase: number): WeekData[] {
  return weeks.filter((w) => w.phase === phase);
}

export function getTotalHours(week: WeekData): number {
  return week.roles.reduce((sum, r) => sum + r.estimatedHours, 0);
}
