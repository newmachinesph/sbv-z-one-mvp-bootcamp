import { TeamStatus, MemberRole, ApplicantStatus } from "@prisma/client";

const teamStatusValues = new Set(Object.values(TeamStatus));
const memberRoleValues = new Set(Object.values(MemberRole));
const applicantStatusValues = new Set(Object.values(ApplicantStatus));

export function parseTeamStatus(value: string): TeamStatus | null {
  const upper = value.toUpperCase();
  return teamStatusValues.has(upper as TeamStatus) ? (upper as TeamStatus) : null;
}

export function parseMemberRole(value: string): MemberRole | null {
  const upper = value.toUpperCase();
  return memberRoleValues.has(upper as MemberRole) ? (upper as MemberRole) : null;
}

export function parseApplicantStatus(value: string): ApplicantStatus | null {
  const upper = value.toUpperCase();
  return applicantStatusValues.has(upper as ApplicantStatus)
    ? (upper as ApplicantStatus)
    : null;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return typeof email === "string" && EMAIL_RE.test(email) && email.length <= 254;
}
