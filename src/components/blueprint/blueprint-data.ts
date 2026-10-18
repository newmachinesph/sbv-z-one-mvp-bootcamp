/**
 * Blueprint-specific content data.
 * Re-exports shared data from home-data.ts and adds partner/mentor-focused content.
 */

export {
  roles,
  collaborativePairs,
  weeklyRhythm,
  weekHighlights,
  outcomes,
  aiDevelopmentStages,
  partnerLogos,
  stats,
  platformCards,
} from "@/components/home/home-data";

/* ============================================
   Executive Summary (Partner/Mentor framing)
   ============================================ */

export const executiveSummary = {
  paragraphs: [
    "Z1 Forge is a 12-week startup collaborative forge operated by Starting Block Ventures (SBV) that transforms early-stage ideas into live, revenue-capable products. Unlike traditional accelerators that focus on pitch decks and theory, Forge is a build-first program — every team ships working software to real users every single week.",
    "Our proprietary 4H Framework assigns each team four specialized roles — Hacker (builder), Hustler (seller), Hipster (designer), and Hound (researcher) — creating balanced founding teams that cover every function a startup needs from day one.",
    "For partners and mentors, Z1 Forge represents a unique opportunity to engage with pre-vetted, high-potential teams at the earliest stages of product development. Mentors are matched to teams based on domain expertise and receive structured touchpoints — weekly office hours, workshop slots, and judging panels — ensuring their knowledge directly accelerates product decisions. Corporate partners gain early access to a curated pipeline of emerging startups building across verticals like fintech, healthtech, edtech, and SaaS, with opportunities to sponsor challenges, recruit talent, and integrate their platforms. Investors benefit from front-row access starting at Week 1, watching teams evolve from prototypes to live products with real users — culminating in Demo Day, where polished products and validated metrics are presented to a global audience.",
    "The program is AI-augmented but human-directed: AI tools handle scaffolding, content drafts, and routine code — freeing teams to focus on strategy, user research, and the creative decisions that matter most.",
  ],
  pullQuote:
    "We don't teach startups. We build them — live, in public, every week for 12 weeks.",
  statsStrip: ["12 Weeks", "4 Roles", "1 Live Product", "4 Platforms"],
};

/* ============================================
   About SBV — Origin, Values, Purpose
   ============================================ */

export const aboutSbv = {
  origin: [
    "Starting Block Ventures (SBV) is a venture studio based in Makati, Philippines. Founded in 2024, SBV champions companies bold enough to reinvent how we live — across Fintech, Healthtech, SaaS, Climatetech, AI, and Consumer.",
    "We evolved from being service providers to becoming ecosystem architects — building the infrastructure that helps founders thrive. Our reach extends across ASEAN and Greater China, connecting founders with global opportunities.",
    "Z1 Forge is where that ecosystem starts. It's SBV's 12-week program where teams of four go from zero to one — a live, deployed product with real users and real revenue. Forge is the entry point into the broader SBV ecosystem: Mentors for guidance, Pitch for investor visibility, and InSpace for community.",
  ],
  values: [
    {
      title: "Merit-Driven",
      description:
        "The best ideas win, regardless of background. Our selection focuses purely on potential and execution capability — ensuring partners engage with top-tier talent.",
    },
    {
      title: "Co-Building",
      description:
        "We don't just invest — we roll up our sleeves and build alongside founders. Partners and mentors become active collaborators, not passive observers.",
    },
    {
      title: "Long-Term Partnership",
      description:
        "Building great companies takes time. Relationships forged during the program extend into the alumni network, deal flow pipeline, and ongoing co-building.",
    },
    {
      title: "Global Mindset",
      description:
        "Rooted in the Philippines, thinking globally. Our network spans ASEAN, Greater China, and beyond — opening doors for partners seeking regional reach.",
    },
  ],
  purposeQuote:
    "The world has enough pitch decks. We build live products with real users, real revenue, and real teams — every cohort.",
};

/* ============================================
   Why Forge — Purpose, North Star, Market Scope
   ============================================ */

export const whyForge = {
  pillars: [
    {
      label: "Purpose",
      title: "Builders deserve better than a pitch competition.",
      body: "Most programs celebrate decks. We celebrate deploys. Z1 Forge exists because the best way to build a startup is to actually build one — with a real team, real users, and real deadlines. For mentors and partners, this means every team you engage with is actively building and shipping, not just theorizing.",
    },
    {
      label: "North Star",
      title: "Every builder in the Philippines ships their first product.",
      body: "We're building the infrastructure for a generation of product-led founders. Not ideas on whiteboards — live products with paying users, launched by teams who learned by doing. Partners and investors gain access to a pipeline of founders who have already proven they can execute.",
    },
    {
      label: "Impact",
      title: "From \"someday\" to shipped.",
      body: "Twelve weeks. One team. One product. By the end, teams have revenue, users, and a roadmap — not a certificate. The gap between 'I have an idea' and 'I have a company' shrinks every cohort, creating compounding value for every partner in the ecosystem.",
    },
  ],
  marketScope: [
    {
      title: "Every niche. Every market.",
      description:
        "Fintech, edtech, healthtech, logistics, AI tools, marketplaces, creator platforms, SaaS — partners access diverse deal flow across verticals.",
    },
    {
      title: "Local problems. Global reach.",
      description:
        "Teams solve local Philippine pain points or pursue worldwide audiences — partners tap into both emerging and global market opportunities.",
    },
    {
      title: "Nobody builds alone.",
      description:
        "The 4H framework means every team has builder, seller, designer, and researcher — giving partners confidence in team completeness.",
    },
    {
      title: "A network beyond 12 weeks.",
      description:
        "Z1 alumni stay connected — mentor access, investor introductions, and co-building opportunities continue long after Demo Day.",
    },
  ],
};

/* ============================================
   Vision, Mission & Goals
   ============================================ */

export const visionMission = {
  vision:
    "To become Southeast Asia's premier startup forge — where the next generation of Filipino and ASEAN founders transform bold ideas into scalable, revenue-generating products that compete on the global stage.",
  mission:
    "To equip aspiring founders with the structured framework, hands-on mentorship, AI-augmented tools, and collaborative environment they need to build, launch, and scale real products in 12 weeks — bridging the gap between raw potential and market-ready startups.",
  goals: [
    {
      title: "Build Market-Ready Products",
      objectives: [
        "Every team ships a live product with 50+ real users by Week 9",
        "Achieve first revenue or validated pricing before Demo Day",
        "Deliver investor-ready pitch decks with proven traction metrics",
      ],
    },
    {
      title: "Develop Founder Talent",
      objectives: [
        "Train 100+ founders per year through the 4H role specialization",
        "Build cross-functional skills: technical, commercial, design, and research",
        "Create a lifelong alumni network of builders across ASEAN",
      ],
    },
    {
      title: "Strengthen the Ecosystem",
      objectives: [
        "Connect 50+ mentors and industry experts to founding teams annually",
        "Establish corporate partnerships that generate deal flow and talent pipelines",
        "Position the Philippines as a launchpad for globally competitive startups",
      ],
    },
    {
      title: "Scale Through Technology",
      objectives: [
        "Integrate AI across every phase of the build cycle to 10x team output",
        "Build proprietary platforms (Forge, Mentor, Pitch, InSpace) that serve the full lifecycle",
        "Create reusable playbooks and toolkits that compound value across cohorts",
      ],
    },
  ],
};

/* ============================================
   InSpace & Community
   ============================================ */

export const inSpaceContent = {
  subtitle:
    "Founder firesides, live pitch nights, and streamed challenges that turn a remote build sprint into a shared experience — and give partners direct visibility into the community.",
  formats: [
    {
      name: "Grit Chronicles",
      icon: "GC",
      description:
        "Intimate fireside chats with successful founders sharing their raw, unfiltered journeys — the struggles, pivots, and breakthroughs that shaped their companies.",
      frequency: "Monthly",
      partnerAngle:
        "Partner opportunity: Guest speaker slots, brand visibility, and direct access to the founder community.",
    },
    {
      name: "Breakpoints.live",
      icon: "BP",
      description:
        "Broadcast layer for challenges and community moments — mid-week challenges livestreamed so the broader SBV community watches, engages, and participates.",
      partnerAngle:
        "Partner opportunity: Sponsor weekly challenges, showcase your platform, and engage with the wider SBV audience.",
    },
    {
      name: "InSpace Pitch",
      icon: "IP",
      description:
        "Powers Week 12 Demo Day and the Week 6 mid-program soft pitch checkpoint — real panel, real feedback, real pressure.",
      partnerAngle:
        "Partner opportunity: Judge panels, investor access, and front-row seats to the most polished products of the cohort.",
    },
  ],
  moments: [
    { week: "1", label: "First Grit Chronicles" },
    { week: "3", label: "First Breakpoints.live" },
    { week: "6", label: "Mid-Program Pitch" },
    { week: "9", label: "Launch Broadcast" },
    { week: "12", label: "Demo Day" },
  ],
};

/* ============================================
   Program Phases
   ============================================ */

export const programPhases = [
  {
    name: "Foundation",
    weeks: "1–2",
    milestones: [
      "Landing page live",
      "Auth & dashboard scaffolded",
      "Team roles assigned",
    ],
  },
  {
    name: "Core Build",
    weeks: "3–4",
    milestones: [
      "Feature #1 & #2 shipped",
      "Data flow established",
      "First user feedback",
    ],
  },
  {
    name: "Integration",
    weeks: "5–6",
    milestones: [
      "3rd-party APIs connected",
      "Notifications live",
      "Mid-program soft pitch",
    ],
  },
  {
    name: "Polish",
    weeks: "7–8",
    milestones: [
      "UX overhaul",
      "Security hardened",
      "Production deployment",
    ],
  },
  {
    name: "Launch",
    weeks: "9",
    milestones: [
      "50+ real signups",
      "10+ active users",
      "Public launch event",
    ],
  },
  {
    name: "Scale",
    weeks: "10–11",
    milestones: [
      "First revenue or validated pricing",
      "Pitch deck finalized",
      "Final feature ship",
    ],
  },
  {
    name: "Demo Day",
    weeks: "12",
    milestones: [
      "InSpace Pitch to global investors",
      "Graduation ceremony",
      "Alumni network onboarding",
    ],
  },
];

/* ============================================
   Partnership Types
   ============================================ */

export const partnershipTypes = [
  {
    title: "Mentors",
    description:
      "Share your expertise directly with founding teams through structured office hours, workshops, and judging panels.",
    benefits: [
      "Weekly 1-on-1 office hours with matched teams",
      "Lead workshops on your domain expertise",
      "Judge mid-program and Demo Day pitches",
      "Access to the SBV mentor network",
    ],
  },
  {
    title: "Corporate Partners",
    description:
      "Tap into a curated pipeline of innovation and emerging talent across multiple industries.",
    benefits: [
      "Sponsor cohort challenges aligned to your industry",
      "Early access to teams building in your vertical",
      "Talent pipeline for internships and hires",
      "Brand visibility across all SBV platforms",
    ],
  },
  {
    title: "Investors",
    description:
      "Get front-row access to pre-vetted, product-ready startups before they hit the broader market.",
    benefits: [
      "Demo Day access with live product demos",
      "Portfolio scouting from Week 1",
      "Pitch platform visibility for deal flow",
      "Co-invest opportunities with SBV",
    ],
  },
];

/* ============================================
   Contact Info
   ============================================ */

export const contactInfo = {
  website: "z1.sbv.one",
  email: "hello@sbv.one",
  tagline: "Z1 Forge by Starting Block Ventures",
  copyright: `© ${new Date().getFullYear()} Starting Block Ventures. All rights reserved.`,
};
