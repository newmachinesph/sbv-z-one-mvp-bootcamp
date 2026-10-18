import { config } from "dotenv";
config({ path: ".env.local" });

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const shipTargets: Record<number, string> = {
  1: "Landing Page",
  2: "Auth + Dashboard Shell",
  3: "Core Feature #1",
  4: "Core Feature #2",
  5: "Third-Party Integrations",
  6: "Notifications + Alerts",
};

// ---------------------------------------------------------------------------
// Team seed data
// ---------------------------------------------------------------------------

interface MemberSeed {
  name: string;
  email: string;
  role: "HACKER" | "HUSTLER" | "HIPSTER" | "HOUND";
  skills: string[];
  bio: string;
}

interface ProgressSeed {
  week: number;
  completed: boolean;
  score: number;
  feedback: string;
}

interface TeamSeed {
  slug: string;
  name: string;
  productName: string;
  description: string;
  niche: string;
  currentWeek: number;
  totalPoints: number;
  members: MemberSeed[];
  progress: ProgressSeed[];
}

const teams: TeamSeed[] = [
  {
    slug: "team-tindahan",
    name: "Tindahan Tech",
    productName: "SariTrack",
    description:
      "AI-powered inventory management for neighborhood retail stores. Real-time stock tracking, automated reorder alerts, and supplier matching.",
    niche: "Logistics / Retail Tech",
    currentWeek: 6,
    totalPoints: 41,
    members: [
      {
        name: "Miguel Santos",
        email: "miguel@saritrack.ph",
        role: "HACKER",
        skills: ["Next.js", "Node.js", "PostgreSQL"],
        bio: "Full-stack dev from Cebu. Previously at Grab PH.",
      },
      {
        name: "Maria Clara Reyes",
        email: "maria@saritrack.ph",
        role: "HUSTLER",
        skills: ["Sales", "Partnerships", "Market Research"],
        bio: "Former FMCG brand manager. Deep knowledge of retail supply chains.",
      },
      {
        name: "Isko Bautista",
        email: "isko@saritrack.ph",
        role: "HIPSTER",
        skills: ["Figma", "Branding", "Social Media"],
        bio: "Creative director turned startup designer.",
      },
      {
        name: "Joy Dela Cruz",
        email: "joy@saritrack.ph",
        role: "HOUND",
        skills: ["Analytics", "User Research", "SQL"],
        bio: "Data analyst from Accenture PH.",
      },
    ],
    progress: [
      { week: 1, completed: true, score: 9, feedback: "Excellent landing page with clear value prop." },
      { week: 2, completed: true, score: 8, feedback: "Solid foundation. Dashboard looks clean." },
      { week: 3, completed: true, score: 9, feedback: "Inventory tracking works beautifully." },
      { week: 4, completed: true, score: 8, feedback: "Reorder alerts are smart." },
      { week: 5, completed: true, score: 7, feedback: "GCash integration done." },
      { week: 6, completed: false, score: 0, feedback: "" },
    ],
  },
  {
    slug: "team-kabayan",
    name: "Kabayan Connect",
    productName: "SendBridge",
    description:
      "Remittance comparison and financial planning platform for workers abroad. Compare rates, track transfers, and manage family budgets across borders.",
    niche: "FinTech / Remittance",
    currentWeek: 6,
    totalPoints: 46,
    members: [
      {
        name: "Rafael Aquino",
        email: "rafael@sendbridge.com",
        role: "HACKER",
        skills: ["React", "Python", "APIs"],
        bio: "Engineer and former expat worker in Dubai.",
      },
      {
        name: "Angelica Tan",
        email: "angelica@sendbridge.com",
        role: "HUSTLER",
        skills: ["Business Dev", "Community Building", "Fundraising"],
        bio: "Community organizer with deep ties to expat worker groups worldwide.",
      },
      {
        name: "Kim Villanueva",
        email: "kim@sendbridge.com",
        role: "HIPSTER",
        skills: ["UI/UX", "Motion Design", "Copywriting"],
        bio: "UX designer focused on making fintech accessible.",
      },
      {
        name: "Carlo Mendoza",
        email: "carlo@sendbridge.com",
        role: "HOUND",
        skills: ["Market Research", "Data Science", "Surveys"],
        bio: "Researcher from ADB. Studied remittance flows in Southeast Asia.",
      },
    ],
    progress: [
      { week: 1, completed: true, score: 10, feedback: "Perfect landing page. Emotional and clear." },
      { week: 2, completed: true, score: 9, feedback: "Great multi-currency dashboard." },
      { week: 3, completed: true, score: 9, feedback: "Rate comparison engine is impressive." },
      { week: 4, completed: true, score: 10, feedback: "Budget planner is the killer feature." },
      { week: 5, completed: true, score: 8, feedback: "Good API integrations with major providers." },
      { week: 6, completed: false, score: 0, feedback: "" },
    ],
  },
  {
    slug: "team-kain-na",
    name: "Kain Na!",
    productName: "TustosApp",
    description:
      "Hyperlocal food delivery connecting home cooks and carinderias to hungry customers. Supporting the informal food economy with tech.",
    niche: "FoodTech / Local Delivery",
    currentWeek: 6,
    totalPoints: 36,
    members: [
      {
        name: "Patricia Garcia",
        email: "pat@tustosapp.ph",
        role: "HACKER",
        skills: ["Flutter", "Firebase", "Maps API"],
        bio: "Mobile dev from Manila.",
      },
      {
        name: "Danilo Ramos",
        email: "danilo@tustosapp.ph",
        role: "HUSTLER",
        skills: ["Operations", "Vendor Management", "Growth"],
        bio: "Ex-Foodpanda PH ops lead.",
      },
      {
        name: "Bianca Lopez",
        email: "bianca@tustosapp.ph",
        role: "HIPSTER",
        skills: ["Photography", "Brand Identity", "TikTok"],
        bio: "Food content creator with 50K followers.",
      },
      {
        name: "Jerome Castillo",
        email: "jerome@tustosapp.ph",
        role: "HOUND",
        skills: ["GIS", "User Interviews", "A/B Testing"],
        bio: "UX researcher with geography background.",
      },
    ],
    progress: [
      { week: 1, completed: true, score: 8, feedback: "Fun branding. Landing page is appetizing." },
      { week: 2, completed: true, score: 7, feedback: "Basic dashboard. Needs more polish." },
      { week: 3, completed: true, score: 8, feedback: "Ordering flow works well on mobile." },
      { week: 4, completed: true, score: 7, feedback: "Delivery tracking is functional." },
      { week: 5, completed: true, score: 6, feedback: "Payment gateway connected. Needs testing." },
      { week: 6, completed: false, score: 0, feedback: "" },
    ],
  },
  {
    slug: "team-aral",
    name: "Aral Squad",
    productName: "EskwelaAI",
    description:
      "AI-powered adaptive learning platform for K-12 students. Personalized lesson plans, multilingual support, and teacher dashboards.",
    niche: "EdTech / AI",
    currentWeek: 6,
    totalPoints: 45,
    members: [
      {
        name: "Luis Panganiban",
        email: "luis@eskwelaai.ph",
        role: "HACKER",
        skills: ["Python", "ML/AI", "Next.js"],
        bio: "AI engineer from UP Diliman.",
      },
      {
        name: "Samantha Cruz",
        email: "sam@eskwelaai.ph",
        role: "HUSTLER",
        skills: ["EdTech Sales", "School Partnerships", "Pitching"],
        bio: "Former DepEd consultant.",
      },
      {
        name: "Marco Rivera",
        email: "marco@eskwelaai.ph",
        role: "HIPSTER",
        skills: ["Illustration", "Figma", "Animation"],
        bio: "Illustrator who makes learning visual and fun.",
      },
      {
        name: "Hannah Lim",
        email: "hannah@eskwelaai.ph",
        role: "HOUND",
        skills: ["Education Research", "Psychometrics", "Analytics"],
        bio: "Learning scientist studying adaptive education.",
      },
    ],
    progress: [
      { week: 1, completed: true, score: 9, feedback: "" },
      { week: 2, completed: true, score: 9, feedback: "" },
      { week: 3, completed: true, score: 10, feedback: "Adaptive quiz engine is outstanding." },
      { week: 4, completed: true, score: 9, feedback: "" },
      { week: 5, completed: true, score: 8, feedback: "" },
      { week: 6, completed: false, score: 0, feedback: "" },
    ],
  },
  {
    slug: "team-dagat",
    name: "Dagat Digital",
    productName: "AquaTrace",
    description: "Catch tracking and market access platform for small-scale fishermen.",
    niche: "AgriTech / Fisheries",
    currentWeek: 6,
    totalPoints: 38,
    members: [
      {
        name: "Rodel Magsaysay",
        email: "rodel@aquatrace.ph",
        role: "HACKER",
        skills: ["React Native", "Node.js", "MongoDB"],
        bio: "",
      },
      {
        name: "Cristina Soriano",
        email: "cristina@aquatrace.ph",
        role: "HUSTLER",
        skills: ["Agri Partnerships", "Government Relations", "Sales"],
        bio: "",
      },
      {
        name: "Alvin Torres",
        email: "alvin@aquatrace.ph",
        role: "HIPSTER",
        skills: ["Figma", "Prototyping", "Accessibility"],
        bio: "",
      },
      {
        name: "Lorna Pascual",
        email: "lorna@aquatrace.ph",
        role: "HOUND",
        skills: ["Field Research", "Data Collection", "GIS"],
        bio: "",
      },
    ],
    progress: [
      { week: 1, completed: true, score: 8, feedback: "" },
      { week: 2, completed: true, score: 8, feedback: "" },
      { week: 3, completed: true, score: 7, feedback: "" },
      { week: 4, completed: true, score: 8, feedback: "" },
      { week: 5, completed: true, score: 7, feedback: "" },
      { week: 6, completed: false, score: 0, feedback: "" },
    ],
  },
  {
    slug: "team-bahay",
    name: "Bahay Builders",
    productName: "RentMo",
    description: "Affordable rental marketplace for young professionals.",
    niche: "PropTech",
    currentWeek: 6,
    totalPoints: 42,
    members: [
      {
        name: "Jericho Navarro",
        email: "jericho@rentmo.ph",
        role: "HACKER",
        skills: ["Next.js", "Supabase", "Stripe"],
        bio: "",
      },
      {
        name: "Camille Enriquez",
        email: "camille@rentmo.ph",
        role: "HUSTLER",
        skills: ["Real Estate", "Partnerships", "Marketing"],
        bio: "",
      },
      {
        name: "Nathan De Leon",
        email: "nathan@rentmo.ph",
        role: "HIPSTER",
        skills: ["UI/UX", "Figma", "Brand Strategy"],
        bio: "",
      },
      {
        name: "Angela Dimaculangan",
        email: "angela@rentmo.ph",
        role: "HOUND",
        skills: ["Market Analysis", "User Research", "SQL"],
        bio: "",
      },
    ],
    progress: [
      { week: 1, completed: true, score: 9, feedback: "" },
      { week: 2, completed: true, score: 8, feedback: "" },
      { week: 3, completed: true, score: 8, feedback: "" },
      { week: 4, completed: true, score: 9, feedback: "" },
      { week: 5, completed: true, score: 8, feedback: "" },
      { week: 6, completed: false, score: 0, feedback: "" },
    ],
  },
  {
    slug: "team-lakbay",
    name: "Lakbay Labs",
    productName: "JeepNav",
    description: "Real-time transit tracking for urban commuters.",
    niche: "TransportTech",
    currentWeek: 6,
    totalPoints: 43,
    members: [
      {
        name: "Andrei Velasco",
        email: "andrei@jeepnav.ph",
        role: "HACKER",
        skills: ["React Native", "Go", "Redis"],
        bio: "",
      },
      {
        name: "Rica Mae Flores",
        email: "rica@jeepnav.ph",
        role: "HUSTLER",
        skills: ["Transport Policy", "BD", "Public Speaking"],
        bio: "",
      },
      {
        name: "Denise Aguilar",
        email: "denise@jeepnav.ph",
        role: "HIPSTER",
        skills: ["Mapbox", "Figma", "Illustration"],
        bio: "",
      },
      {
        name: "Paolo Bernardo",
        email: "paolo@jeepnav.ph",
        role: "HOUND",
        skills: ["Data Engineering", "GPS Analytics", "Python"],
        bio: "",
      },
    ],
    progress: [
      { week: 1, completed: true, score: 10, feedback: "" },
      { week: 2, completed: true, score: 9, feedback: "" },
      { week: 3, completed: true, score: 9, feedback: "" },
      { week: 4, completed: true, score: 8, feedback: "" },
      { week: 5, completed: true, score: 7, feedback: "" },
      { week: 6, completed: false, score: 0, feedback: "" },
    ],
  },
  {
    slug: "team-hanapbuhay",
    name: "Hanapbuhay",
    productName: "GigPinas",
    description:
      "Verified gig worker marketplace connecting skilled workers with local businesses.",
    niche: "HR / Gig Economy",
    currentWeek: 6,
    totalPoints: 38,
    members: [
      {
        name: "Dennis Ocampo",
        email: "dennis@gigpinas.ph",
        role: "HACKER",
        skills: ["Laravel", "Vue.js", "MySQL"],
        bio: "",
      },
      {
        name: "Rhea Santiago",
        email: "rhea@gigpinas.ph",
        role: "HUSTLER",
        skills: ["HR", "Recruitment", "Ops"],
        bio: "",
      },
      {
        name: "Tristan Manalo",
        email: "tristan@gigpinas.ph",
        role: "HIPSTER",
        skills: ["Figma", "Branding", "Web Design"],
        bio: "",
      },
      {
        name: "Grace Villareal",
        email: "grace@gigpinas.ph",
        role: "HOUND",
        skills: ["Labor Research", "Surveys", "Excel"],
        bio: "",
      },
    ],
    progress: [
      { week: 1, completed: true, score: 8, feedback: "" },
      { week: 2, completed: true, score: 7, feedback: "" },
      { week: 3, completed: true, score: 8, feedback: "" },
      { week: 4, completed: true, score: 8, feedback: "" },
      { week: 5, completed: true, score: 7, feedback: "" },
      { week: 6, completed: false, score: 0, feedback: "" },
    ],
  },
  {
    slug: "team-tipid",
    name: "Tipid Squad",
    productName: "PricePulse",
    description: "Grocery price comparison app across Philippine stores.",
    niche: "Consumer Tech",
    currentWeek: 6,
    totalPoints: 40,
    members: [
      {
        name: "Kevin Marquez",
        email: "kevin@pricepulse.ph",
        role: "HACKER",
        skills: ["Next.js", "Python", "Web Scraping"],
        bio: "",
      },
      {
        name: "April Salazar",
        email: "april@pricepulse.ph",
        role: "HUSTLER",
        skills: ["Retail Partnerships", "Growth Hacking", "Content"],
        bio: "",
      },
      {
        name: "Ramon Gutierrez",
        email: "ramon@pricepulse.ph",
        role: "HIPSTER",
        skills: ["Figma", "Mobile Design", "Micro-interactions"],
        bio: "",
      },
      {
        name: "Mia Concepcion",
        email: "mia@pricepulse.ph",
        role: "HOUND",
        skills: ["Price Analytics", "SQL", "Consumer Research"],
        bio: "",
      },
    ],
    progress: [
      { week: 1, completed: true, score: 7, feedback: "" },
      { week: 2, completed: true, score: 8, feedback: "" },
      { week: 3, completed: true, score: 9, feedback: "" },
      { week: 4, completed: true, score: 8, feedback: "" },
      { week: 5, completed: true, score: 8, feedback: "" },
      { week: 6, completed: false, score: 0, feedback: "" },
    ],
  },
  {
    slug: "team-kalusugan",
    name: "Kalusugan Tech",
    productName: "BarangayMD",
    description: "Telemedicine platform for barangay health centers.",
    niche: "HealthTech",
    currentWeek: 6,
    totalPoints: 44,
    members: [
      {
        name: "Dr. Emilio Reyes",
        email: "emilio@barangaymd.ph",
        role: "HACKER",
        skills: ["React", "Node.js", "WebRTC"],
        bio: "",
      },
      {
        name: "Karla Magbanua",
        email: "karla@barangaymd.ph",
        role: "HUSTLER",
        skills: ["Health Policy", "NGO Partnerships", "Fundraising"],
        bio: "",
      },
      {
        name: "Bea Tolentino",
        email: "bea@barangaymd.ph",
        role: "HIPSTER",
        skills: ["Figma", "Accessibility", "Illustration"],
        bio: "",
      },
      {
        name: "Ryan Policarpio",
        email: "ryan@barangaymd.ph",
        role: "HOUND",
        skills: ["Epidemiology", "Data Viz", "R"],
        bio: "",
      },
    ],
    progress: [
      { week: 1, completed: true, score: 9, feedback: "" },
      { week: 2, completed: true, score: 9, feedback: "" },
      { week: 3, completed: true, score: 8, feedback: "" },
      { week: 4, completed: true, score: 9, feedback: "" },
      { week: 5, completed: true, score: 9, feedback: "" },
      { week: 6, completed: false, score: 0, feedback: "" },
    ],
  },
  {
    slug: "team-kwento",
    name: "Kwento Studios",
    productName: "StoryCraft",
    description: "AI-powered comic and webtoon creation tool.",
    niche: "Creator Tools",
    currentWeek: 6,
    totalPoints: 42,
    members: [
      {
        name: "Gabrielle Sotto",
        email: "gab@storycraft.ph",
        role: "HACKER",
        skills: ["Python", "Stable Diffusion", "FastAPI"],
        bio: "",
      },
      {
        name: "Jaime Francisco",
        email: "jaime@storycraft.ph",
        role: "HUSTLER",
        skills: ["Creator Economy", "Partnerships", "Content Strategy"],
        bio: "",
      },
      {
        name: "Althea Dominguez",
        email: "althea@storycraft.ph",
        role: "HIPSTER",
        skills: ["Digital Art", "Figma", "Storytelling"],
        bio: "",
      },
      {
        name: "Benedict Tan",
        email: "ben@storycraft.ph",
        role: "HOUND",
        skills: ["Creator Research", "Analytics", "Trend Analysis"],
        bio: "",
      },
    ],
    progress: [
      { week: 1, completed: true, score: 8, feedback: "" },
      { week: 2, completed: true, score: 8, feedback: "" },
      { week: 3, completed: true, score: 10, feedback: "" },
      { week: 4, completed: true, score: 9, feedback: "" },
      { week: 5, completed: true, score: 7, feedback: "" },
      { week: 6, completed: false, score: 0, feedback: "" },
    ],
  },
  {
    slug: "team-greengo",
    name: "GreenGo PH",
    productName: "WasteWise",
    description:
      "Waste sorting guide and recycling marketplace for local communities.",
    niche: "CleanTech",
    currentWeek: 6,
    totalPoints: 37,
    members: [
      {
        name: "Darwin Abalos",
        email: "darwin@wastewise.ph",
        role: "HACKER",
        skills: ["React", "TensorFlow.js", "Firebase"],
        bio: "",
      },
      {
        name: "Precious Corpuz",
        email: "precious@wastewise.ph",
        role: "HUSTLER",
        skills: ["Sustainability", "LGU Relations", "Grants"],
        bio: "",
      },
      {
        name: "Raul Ignacio",
        email: "raul@wastewise.ph",
        role: "HIPSTER",
        skills: ["Figma", "Gamification", "Branding"],
        bio: "",
      },
      {
        name: "Diane Perez",
        email: "diane@wastewise.ph",
        role: "HOUND",
        skills: ["Environmental Data", "Surveys", "GIS"],
        bio: "",
      },
    ],
    progress: [
      { week: 1, completed: true, score: 7, feedback: "" },
      { week: 2, completed: true, score: 7, feedback: "" },
      { week: 3, completed: true, score: 8, feedback: "" },
      { week: 4, completed: true, score: 7, feedback: "" },
      { week: 5, completed: true, score: 8, feedback: "" },
      { week: 6, completed: false, score: 0, feedback: "" },
    ],
  },
];

// ---------------------------------------------------------------------------
// Challenge seed data
// ---------------------------------------------------------------------------

const challenges = [
  {
    week: 1,
    name: "The 50-Email Sprint",
    description: "First team to collect 50 real waitlist signups wins.",
    tests: "Verify 50 unique emails from non-team sources",
  },
  {
    week: 2,
    name: "The Persona Slam",
    description:
      "Each Hound presents their top user persona. Teams vote on the most vivid, research-backed persona.",
    tests: "Present persona with research backing",
  },
  {
    week: 3,
    name: "The 3-Minute Demo Duel",
    description:
      "Each Hustler demos the core feature in under 3 minutes. Teams rate clarity and excitement.",
    tests: "Live demo under 3 minutes",
  },
  {
    week: 4,
    name: "The Feedback Bingo",
    description:
      "Create a bingo card of feedback types. First team to fill a row from real user feedback wins.",
    tests: "Complete bingo row with real feedback",
  },
  {
    week: 5,
    name: "The Integration Relay",
    description:
      "Teams race to get their integration working end-to-end with all 4 roles contributing.",
    tests: "All 4 roles complete their relay leg",
  },
  {
    week: 6,
    name: "The Notification Showdown",
    description:
      "Teams design their best transactional email. All participants vote on which they'd open.",
    tests: "Submit transactional email design",
  },
  {
    week: 7,
    name: "The Cold User Test",
    description:
      "Recruit someone who never saw the product. Time how long to reach aha moment.",
    tests: "Screen-share recording with timing",
  },
  {
    week: 8,
    name: "The Bug Bounty Blitz",
    description: "Teams swap products and try to break each other's apps.",
    tests: "Bug report submissions",
  },
  {
    week: 9,
    name: "Launch Day Leaderboard",
    description:
      "Real-time leaderboard tracking signups, social shares, and feedback calls.",
    tests: "Live metrics dashboard",
  },
  {
    week: 10,
    name: "The Pitch Draft Roast",
    description:
      "Each Hustler presents pitch deck draft. Constructive roasting only.",
    tests: "Pitch deck + peer feedback",
  },
  {
    week: 11,
    name: "The Pitch Rehearsal",
    description: "Full dress rehearsal of Demo Day presentation.",
    tests: "Timed presentation with Q&A",
  },
  {
    week: 12,
    name: "Demo Day",
    description:
      "5 min pitch, 3 min demo, 2 min Q&A to investors and mentors.",
    tests: "Complete Demo Day presentation",
  },
];


// ---------------------------------------------------------------------------
// Applicant seed data
// ---------------------------------------------------------------------------

const applicants = [
  {
    email: "alex.johnson@gmail.com",
    name: "Alex Johnson",
    preferredRole: "HACKER" as const,
    skills: ["JavaScript", "React", "Node.js"],
    experience:
      "3 years as a frontend developer at a SaaS startup. Built dashboards and internal tools.",
    motivation:
      "I want to build something that solves a real problem for my community. The forge structure with 4H roles is exactly how I think great products should be built.",
    status: "ACCEPTED" as const,
  },
  {
    email: "anna.santos@outlook.com",
    name: "Anna Santos",
    preferredRole: "HUSTLER" as const,
    skills: ["Marketing", "Sales", "Public Speaking"],
    experience:
      "5 years in FMCG marketing. Led a team of 10 at Unilever PH. Launched 3 products from zero.",
    motivation:
      "I\u2019ve been on the corporate side long enough. I want to build my own thing and learn the startup way.",
    status: "PENDING" as const,
  },
  {
    email: "mark.reyes@yahoo.com",
    name: "Mark Reyes",
    preferredRole: "HIPSTER" as const,
    skills: ["Figma", "Branding", "Video Editing"],
    experience:
      "Freelance designer for 4 years. Clients include Globe, Smart, and several startups.",
    motivation:
      "Design is more than making things pretty. I want to be part of a team where design decisions are driven by real user needs.",
    status: "WAITLISTED" as const,
  },
  {
    email: "lisa.garcia@protonmail.com",
    name: "Lisa Garcia",
    preferredRole: "HOUND" as const,
    skills: ["Data Analysis", "Python", "User Interviews"],
    experience:
      "2 years as a junior data analyst at a fintech company. Comfortable with SQL, Python, and qualitative research.",
    motivation:
      "I believe data should drive product decisions, not gut feel. I want to be the voice of the user in a team.",
    status: "REJECTED" as const,
  },
  {
    email: "paolo.tan@icloud.com",
    name: "Paolo Tan",
    preferredRole: "HACKER" as const,
    skills: ["Python", "FastAPI", "PostgreSQL", "Docker"],
    experience:
      "Backend engineer at a logistics startup for 2 years. Built APIs serving 50K daily users.",
    motivation:
      "I\u2019ve always worked on other people\u2019s products. This is my chance to build something from scratch with a real team.",
    status: "ACCEPTED" as const,
  },
];

// ---------------------------------------------------------------------------
// Main seed function
// ---------------------------------------------------------------------------

async function main() {
  console.log("Seeding Z-One MVP Bootcamp database...\n");

  // 1. Admins ------------------------------------------------------------------
  const adminPassword = process.env.ADMIN_SEED_PASSWORD;
  if (!adminPassword) {
    throw new Error("ADMIN_SEED_PASSWORD environment variable is required for seeding.");
  }
  const hashedAdminPassword = hashSync(adminPassword, 10);

  const adminEmails = ["ryan@sbv.one", "llino@sbv.one"];
  for (const email of adminEmails) {
    const admin = await prisma.admin.upsert({
      where: { email },
      update: { password: hashedAdminPassword },
      create: { email, password: hashedAdminPassword },
    });
    console.log(`Admin: ${admin.email}`);
  }

  // 2. Challenges (structural content) ------------------------------------------
  await prisma.$transaction(
    challenges.map((c) =>
      prisma.challenge.upsert({
        where: { week: c.week },
        update: {
          name: c.name,
          description: c.description,
          tests: c.tests,
        },
        create: {
          week: c.week,
          name: c.name,
          description: c.description,
          tests: c.tests,
        },
      })
    )
  );
  console.log(`Challenges: ${challenges.length} weeks`);

  // 3. Teams + Members + Progress -----------------------------------------------
  const memberSeedPassword = process.env.MEMBER_SEED_PASSWORD;
  if (!memberSeedPassword) {
    throw new Error("MEMBER_SEED_PASSWORD environment variable is required for seeding.");
  }
  const memberPassword = hashSync(memberSeedPassword, 10);

  for (const teamData of teams) {
    const team = await prisma.team.upsert({
      where: { slug: teamData.slug },
      update: {
        name: teamData.name,
        productName: teamData.productName,
        description: teamData.description,
        niche: teamData.niche,
        currentWeek: teamData.currentWeek,
        totalPoints: teamData.totalPoints,
      },
      create: {
        slug: teamData.slug,
        name: teamData.name,
        productName: teamData.productName,
        description: teamData.description,
        niche: teamData.niche,
        currentWeek: teamData.currentWeek,
        totalPoints: teamData.totalPoints,
        status: "ACTIVE",
      },
    });

    // Upsert members with cute DiceBear avatars
    for (const m of teamData.members) {
      const seed = encodeURIComponent(m.name.toLowerCase().replace(/\s+/g, "-"));
      const avatar = `https://api.dicebear.com/9.x/adventurer/svg?seed=${seed}`;

      await prisma.teamMember.upsert({
        where: { email: m.email },
        update: {
          name: m.name,
          role: m.role,
          skills: m.skills,
          bio: m.bio,
          avatar,
        },
        create: {
          name: m.name,
          email: m.email,
          role: m.role,
          skills: m.skills,
          bio: m.bio,
          avatar,
          password: memberPassword,
          teamId: team.id,
        },
      });
    }

    // Upsert week progress
    for (const p of teamData.progress) {
      await prisma.weekProgress.upsert({
        where: { teamId_week: { teamId: team.id, week: p.week } },
        update: {
          shipTarget: shipTargets[p.week] || `Week ${p.week}`,
          completed: p.completed,
          score: p.score,
          feedback: p.feedback,
        },
        create: {
          teamId: team.id,
          week: p.week,
          shipTarget: shipTargets[p.week] || `Week ${p.week}`,
          completed: p.completed,
          score: p.score,
          feedback: p.feedback,
        },
      });
    }

    console.log(`Team: ${team.name} (${teamData.members.length} members, ${teamData.progress.length} weeks)`);
  }

  // 5. Applicants ---------------------------------------------------------------
  for (const a of applicants) {
    await prisma.applicant.upsert({
      where: { email: a.email },
      update: {
        name: a.name,
        preferredRole: a.preferredRole,
        skills: a.skills,
        experience: a.experience,
        motivation: a.motivation,
        status: a.status,
      },
      create: {
        name: a.name,
        email: a.email,
        preferredRole: a.preferredRole,
        skills: a.skills,
        experience: a.experience,
        motivation: a.motivation,
        status: a.status,
      },
    });
    console.log(`Applicant: ${a.name} (${a.status})`);
  }

  // Summary --------------------------------------------------------------------
  const [adminCount, challengeCount, teamCount, memberCount, applicantCount] =
    await prisma.$transaction([
      prisma.admin.count(),
      prisma.challenge.count(),
      prisma.team.count(),
      prisma.teamMember.count(),
      prisma.applicant.count(),
    ]);

  console.log(`\n--- Seed Summary ---`);
  console.log(`Admins:      ${adminCount}`);
  console.log(`Challenges:  ${challengeCount}`);
  console.log(`Teams:       ${teamCount}`);
  console.log(`Members:     ${memberCount}`);
  console.log(`Applicants:  ${applicantCount}`);
  console.log(`\nSeeding complete!`);
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
