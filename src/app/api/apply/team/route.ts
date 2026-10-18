import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseMemberRole, isValidEmail } from "@/lib/validations";
import { checkRateLimit, getRateLimitKey } from "@/lib/rate-limit";
import { sendEmail } from "@/lib/mail";
import { render } from "@react-email/components";
import TeamApplicationConfirmationEmail from "@/emails/team-application-confirmation";

interface MemberInput {
  name: string;
  email: string;
  preferredRole: string;
  skills: string;
  experience: string;
  motivation: string;
  linkedinUrl: string;
  resumeUrl?: string;
  portfolioUrl?: string;
  location: string;
}

function validateMember(member: MemberInput, index: number): string | null {
  if (!member.name || typeof member.name !== "string" || !member.name.trim()) {
    return `Member ${index + 1}: Name is required.`;
  }
  if (member.name.length > 200) {
    return `Member ${index + 1}: Name is too long.`;
  }
  if (!member.email || !isValidEmail(member.email)) {
    return `Member ${index + 1}: Valid email is required.`;
  }
  if (!parseMemberRole(member.preferredRole)) {
    return `Member ${index + 1}: Invalid preferred role.`;
  }
  if (!member.linkedinUrl || !/^https?:\/\/(www\.)?linkedin\.com\/in\/.+/i.test(member.linkedinUrl.trim())) {
    return `Member ${index + 1}: Valid LinkedIn URL is required.`;
  }
  if (member.resumeUrl && !/^https?:\/\/.+/i.test(member.resumeUrl.trim())) {
    return `Member ${index + 1}: Invalid resume URL.`;
  }
  if (member.portfolioUrl && !/^https?:\/\/.+/i.test(member.portfolioUrl.trim())) {
    return `Member ${index + 1}: Invalid portfolio URL.`;
  }
  if (!member.skills || typeof member.skills !== "string" || !member.skills.trim()) {
    return `Member ${index + 1}: Skills are required.`;
  }
  if (!member.experience || typeof member.experience !== "string" || member.experience.trim().length < 30) {
    return `Member ${index + 1}: Experience must be at least 30 characters.`;
  }
  if (!member.motivation || typeof member.motivation !== "string" || member.motivation.trim().length < 50) {
    return `Member ${index + 1}: Motivation must be at least 50 characters.`;
  }
  if (!member.location || typeof member.location !== "string" || !member.location.trim()) {
    return `Member ${index + 1}: Location is required.`;
  }
  if (member.location.length > 300) {
    return `Member ${index + 1}: Location is too long.`;
  }
  return null;
}

export async function POST(request: Request) {
  const rateLimitKey = `apply-team:${getRateLimitKey(request)}`;
  const { allowed, retryAfterMs } = checkRateLimit(rateLimitKey, { windowMs: 60_000, maxRequests: 3 });
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(retryAfterMs / 1000)) } }
    );
  }

  try {
    const body = await request.json();
    const { teamName, members } = body;

    if (!teamName || typeof teamName !== "string" || !teamName.trim()) {
      return NextResponse.json({ error: "Team name is required." }, { status: 400 });
    }
    if (teamName.length > 200) {
      return NextResponse.json({ error: "Team name is too long." }, { status: 400 });
    }

    if (!Array.isArray(members) || members.length < 2 || members.length > 4) {
      return NextResponse.json(
        { error: "A team application requires 2 to 4 members." },
        { status: 400 }
      );
    }

    // Validate each member
    for (let i = 0; i < members.length; i++) {
      const err = validateMember(members[i], i);
      if (err) {
        return NextResponse.json({ error: err, memberIndex: i }, { status: 400 });
      }
    }

    // Check for duplicate emails within the team
    const emails = members.map((m: MemberInput) => m.email.trim().toLowerCase());
    const uniqueEmails = new Set(emails);
    if (uniqueEmails.size !== emails.length) {
      return NextResponse.json(
        { error: "Each team member must have a unique email address." },
        { status: 400 }
      );
    }

    // Check if any email already has a solo application
    for (const email of emails) {
      const existing = await prisma.applicant.findUnique({ where: { email } });
      if (existing) {
        return NextResponse.json(
          { error: `${email} already has an individual application.`, field: "email" },
          { status: 409 }
        );
      }
    }

    // Check if any email already exists in another team application
    for (const email of emails) {
      const existingMember = await prisma.teamApplicationMember.findFirst({
        where: { email },
      });
      if (existingMember) {
        return NextResponse.json(
          { error: `${email} is already part of another team application.`, field: "email" },
          { status: 409 }
        );
      }
    }

    // Create team application with members in a transaction
    const teamApplication = await prisma.teamApplication.create({
      data: {
        teamName: teamName.trim(),
        members: {
          create: members.map((m: MemberInput) => {
            const skillsArray = typeof m.skills === "string"
              ? m.skills.split(",").map((s: string) => s.trim()).filter(Boolean)
              : m.skills;
            return {
              name: m.name.trim(),
              email: m.email.trim().toLowerCase(),
              preferredRole: parseMemberRole(m.preferredRole)!,
              skills: skillsArray,
              experience: m.experience,
              motivation: m.motivation,
              linkedinUrl: m.linkedinUrl.trim(),
              resumeUrl: m.resumeUrl ? m.resumeUrl.trim() : null,
              portfolioUrl: m.portfolioUrl ? m.portfolioUrl.trim() : null,
              location: m.location.trim(),
            };
          }),
        },
      },
      include: { members: true },
    });

    // Send confirmation email to first member, CC rest, BCC admins
    try {
      const admins = await prisma.admin.findMany({ select: { email: true } });
      const adminEmails = admins.map((a) => a.email);
      const createdMembers = teamApplication.members;
      const firstMember = createdMembers[0];
      const otherMemberEmails = createdMembers.slice(1).map((m) => m.email);

      await sendEmail({
        to: firstMember.email,
        cc: otherMemberEmails,
        bcc: adminEmails,
        replyTo: "info@sbv.one",
        subject: `Team Application Received — ${teamApplication.teamName} — Z1 Forge`,
        html: await render(
          TeamApplicationConfirmationEmail({
            teamName: teamApplication.teamName,
            recipientName: firstMember.name,
            members: createdMembers.map((m) => ({
              name: m.name,
              email: m.email,
              preferredRole: m.preferredRole,
              skills: m.skills,
              location: m.location,
              linkedinUrl: m.linkedinUrl,
            })),
          })
        ),
      });
    } catch (err) {
      console.error("Failed to send team confirmation email:", err);
    }

    return NextResponse.json(
      { message: "Team application submitted successfully.", id: teamApplication.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/apply/team error:", error);
    return NextResponse.json(
      { error: "Failed to submit team application." },
      { status: 500 }
    );
  }
}
