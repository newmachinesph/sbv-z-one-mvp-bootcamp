import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseMemberRole, isValidEmail } from "@/lib/validations";
import { sendEmail } from "@/lib/mail";
import { render } from "@react-email/components";
import ApplicationConfirmationEmail from "@/emails/application-confirmation";
import { checkRateLimit, getRateLimitKey } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const rateLimitKey = `apply:${getRateLimitKey(request)}`;
  const { allowed, retryAfterMs } = checkRateLimit(rateLimitKey, { windowMs: 60_000, maxRequests: 5 });
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(retryAfterMs / 1000)) } }
    );
  }

  try {
    const body = await request.json();
    const { name, email, linkedinUrl, resumeUrl, portfolioUrl, preferredRole, skills, experience, motivation, location } = body;

    if (!name || !email || !linkedinUrl || !preferredRole || !skills || !experience || !motivation) {
      return NextResponse.json(
        { error: "All required fields must be filled." },
        { status: 400 }
      );
    }

    if (typeof name !== "string" || name.length > 200) {
      return NextResponse.json(
        { error: "Invalid name." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email address.", field: "email" },
        { status: 400 }
      );
    }

    const parsedRole = parseMemberRole(preferredRole);
    if (!parsedRole) {
      return NextResponse.json(
        { error: "Invalid preferred role.", field: "preferredRole" },
        { status: 400 }
      );
    }

    if (
      typeof linkedinUrl !== "string" ||
      !/^https?:\/\/(www\.)?linkedin\.com\/in\/.+/i.test(linkedinUrl.trim())
    ) {
      return NextResponse.json(
        { error: "Please provide a valid LinkedIn profile URL.", field: "linkedinUrl" },
        { status: 400 }
      );
    }

    if (resumeUrl && (typeof resumeUrl !== "string" || !/^https?:\/\/.+/i.test(resumeUrl.trim()))) {
      return NextResponse.json(
        { error: "Please provide a valid resume URL.", field: "resumeUrl" },
        { status: 400 }
      );
    }

    if (portfolioUrl && (typeof portfolioUrl !== "string" || !/^https?:\/\/.+/i.test(portfolioUrl.trim()))) {
      return NextResponse.json(
        { error: "Please provide a valid portfolio URL.", field: "portfolioUrl" },
        { status: 400 }
      );
    }

    if (!location || typeof location !== "string" || location.trim().length === 0) {
      return NextResponse.json(
        { error: "Location is required.", field: "location" },
        { status: 400 }
      );
    }

    if (location.length > 300) {
      return NextResponse.json(
        { error: "Location is too long.", field: "location" },
        { status: 400 }
      );
    }

    if (typeof motivation !== "string" || motivation.length < 50 || motivation.length > 5000) {
      return NextResponse.json(
        { error: "Motivation must be between 50 and 5000 characters.", field: "motivation" },
        { status: 400 }
      );
    }

    const existing = await prisma.applicant.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "An application with this email already exists.", field: "email" },
        { status: 409 }
      );
    }

    const skillsArray = typeof skills === "string"
      ? skills.split(",").map((s: string) => s.trim()).filter(Boolean)
      : skills;

    const applicant = await prisma.applicant.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        preferredRole: parsedRole,
        skills: skillsArray,
        experience,
        motivation,
        linkedinUrl: linkedinUrl.trim(),
        resumeUrl: resumeUrl ? resumeUrl.trim() : null,
        portfolioUrl: portfolioUrl ? portfolioUrl.trim() : null,
        location: location.trim(),
      },
    });

    // Send confirmation email — must await so Vercel doesn't kill the function mid-send
    try {
      const admins = await prisma.admin.findMany({ select: { email: true } });
      const adminEmails = admins.map((a) => a.email);

      await sendEmail({
        to: applicant.email,
        bcc: adminEmails,
        replyTo: "info@sbv.one",
        subject: "Application Received — Z1 Forge",
        html: await render(
          ApplicationConfirmationEmail({
            applicantName: applicant.name,
            email: applicant.email,
            preferredRole: applicant.preferredRole,
            skills: applicant.skills,
            experience: applicant.experience,
            linkedinUrl: applicant.linkedinUrl,
            resumeUrl: applicant.resumeUrl,
            portfolioUrl: applicant.portfolioUrl,
            location: applicant.location,
            motivation: applicant.motivation,
          })
        ),
      });
    } catch (err) {
      console.error("Failed to send confirmation email:", err);
    }

    return NextResponse.json(
      { message: "Application submitted successfully.", id: applicant.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/apply error:", error);
    return NextResponse.json(
      { error: "Failed to submit application." },
      { status: 500 }
    );
  }
}
