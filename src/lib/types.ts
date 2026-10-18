// =============================================================================
// SBV Z1 Forge — Shared TypeScript Types
// z1.sbv.one — 12-Week Forge Platform
// =============================================================================

/** The 4H framework roles used throughout the Forge */
export type Role = "hacker" | "hustler" | "hipster" | "hound";

/** Team status within the Forge lifecycle */
export type TeamStatus = "active" | "graduated" | "pending";

/** Applicant review status */
export type ApplicantStatus = "pending" | "accepted" | "rejected" | "waitlisted";

// -----------------------------------------------------------------------------
// Core Entities
// -----------------------------------------------------------------------------

export interface Team {
  id: string;
  slug: string;
  name: string;
  productName: string;
  description: string;
  niche: string;
  members: TeamMember[];
  currentWeek: number;
  weeklyProgress: WeekProgress[];
  totalPoints: number;
  status: TeamStatus;
  avatarUrl?: string | null;
}

export interface TeamMember {
  id: string;
  name: string;
  role: Role;
  avatar: string;
  skills: string[];
  bio: string;
}

export interface WeekProgress {
  week: number;
  shipTarget: string;
  completed: boolean;
  score: number;
  feedback: string;
}

export interface Applicant {
  id: string;
  name: string;
  email: string;
  preferredRole: Role;
  skills: string[];
  experience: string;
  motivation: string;
  status: ApplicantStatus;
  appliedAt: string;
}

export interface Challenge {
  week: number;
  name: string;
  description: string;
  tests: string;
  winner?: string;
}


export interface LeaderboardTeam {
  id: string;
  rank: number;
  name: string;
  productName: string;
  niche: string;
  currentWeek: number;
  totalPoints: number;
  maxPossiblePoints: number;
  status: TeamStatus;
  streak: number;
  avgScore: number;
}
