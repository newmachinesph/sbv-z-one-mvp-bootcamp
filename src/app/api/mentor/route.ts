import { NextResponse } from "next/server";
import { isValidEmail } from "@/lib/validations";
import { sendEmail } from "@/lib/mail";
import { render } from "@react-email/components";
import MentorConfirmationEmail from "@/emails/mentor-confirmation";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getRateLimitKey } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const rateLimitKey = `mentor:${getRateLimitKey(request)}`;
  const { allowed, retryAfterMs } = checkRateLimit(rateLimitKey, { windowMs: 60_000, maxRequests: 5 });
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(retryAfterMs / 1000)) } }
    );
  }

  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      linkedinUrl,
      resumeUrl,
      portfolioUrl,
      whatBuilt,
      whatFailed,
      whatShipped,
      whyMentor,
      weeklyAvailability,
      contactSlot1,
      contactSlot2,
      contactSlot3,
    } = body;

    // --- Validation ---
    if (!name || !email || !phone || !linkedinUrl || !resumeUrl) {
      return NextResponse.json(
        { error: "All required fields must be filled." },
        { status: 400 }
      );
    }

    if (typeof name !== "string" || name.length > 200) {
      return NextResponse.json(
        { error: "Invalid name.", field: "name" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email address.", field: "email" },
        { status: 400 }
      );
    }

    if (typeof phone !== "string" || phone.trim().length < 7 || phone.length > 30) {
      return NextResponse.json(
        { error: "Please enter a valid phone number.", field: "phone" },
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

    if (typeof resumeUrl !== "string" || !/^https?:\/\/.+/i.test(resumeUrl.trim())) {
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

    for (const [field, label] of [
      ["whatBuilt", "What you built"],
      ["whatFailed", "What failed"],
      ["whatShipped", "What you shipped"],
    ] as const) {
      const val = body[field];
      if (!val || typeof val !== "string" || val.trim().length < 20) {
        return NextResponse.json(
          { error: `${label} must be at least 20 characters.`, field },
          { status: 400 }
        );
      }
      if (val.length > 5000) {
        return NextResponse.json(
          { error: `${label} is too long.`, field },
          { status: 400 }
        );
      }
    }

    if (!whyMentor || typeof whyMentor !== "string" || whyMentor.trim().length < 50) {
      return NextResponse.json(
        { error: "Why mentor must be at least 50 characters.", field: "whyMentor" },
        { status: 400 }
      );
    }

    if (whyMentor.length > 5000) {
      return NextResponse.json(
        { error: "Response is too long.", field: "whyMentor" },
        { status: 400 }
      );
    }

    if (!weeklyAvailability || !["1-2", "3-4", "5+", "flexible"].includes(weeklyAvailability)) {
      return NextResponse.json(
        { error: "Please select a valid availability option.", field: "weeklyAvailability" },
        { status: 400 }
      );
    }

    if (!contactSlot1 || !contactSlot2 || !contactSlot3) {
      return NextResponse.json(
        { error: "Please provide all 3 preferred contact time slots.", field: "contactSlot1" },
        { status: 400 }
      );
    }

    const trimmed = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      linkedinUrl: linkedinUrl.trim(),
      resumeUrl: resumeUrl.trim(),
      portfolioUrl: portfolioUrl ? portfolioUrl.trim() : null,
      whatBuilt: whatBuilt.trim(),
      whatFailed: whatFailed.trim(),
      whatShipped: whatShipped.trim(),
      whyMentor: whyMentor.trim(),
      weeklyAvailability,
      contactSlot1,
      contactSlot2,
      contactSlot3,
    };

    // Check for duplicate email
    const existing = await prisma.mentorApplication.findUnique({
      where: { email: trimmed.email },
    });
    if (existing) {
      return NextResponse.json(
        { error: "A mentor application with this email already exists.", field: "email" },
        { status: 409 }
      );
    }

    // Save to database
    const mentor = await prisma.mentorApplication.create({
      data: trimmed,
    });

    // Send confirmation email to applicant
    try {
      await sendEmail({
        to: trimmed.email,
        replyTo: "info@sbv.one",
        subject: "Mentor Application Received \u2014 Z1 Forge",
        html: await render(
          MentorConfirmationEmail({
            name: trimmed.name,
            email: trimmed.email,
            phone: trimmed.phone,
            linkedinUrl: trimmed.linkedinUrl,
            resumeUrl: trimmed.resumeUrl,
            portfolioUrl: trimmed.portfolioUrl,
            whatBuilt: trimmed.whatBuilt,
            whatFailed: trimmed.whatFailed,
            whatShipped: trimmed.whatShipped,
            whyMentor: trimmed.whyMentor,
            weeklyAvailability: trimmed.weeklyAvailability,
            contactSlot1: trimmed.contactSlot1,
            contactSlot2: trimmed.contactSlot2,
            contactSlot3: trimmed.contactSlot3,
          })
        ),
      });
    } catch (err) {
      console.error("Failed to send mentor confirmation email:", err);
    }

    // Send admin notification
    try {
      const admins = await prisma.admin.findMany({ select: { email: true } });
      const adminEmails = admins.map((a) => a.email);
      const toAddress = adminEmails.length > 0 ? adminEmails[0] : "info@sbv.one";
      const bccAddresses = adminEmails.length > 1 ? adminEmails.slice(1) : undefined;

      await sendEmail({
        to: toAddress,
        bcc: bccAddresses,
        replyTo: trimmed.email,
        subject: `[Mentor Application] ${trimmed.name}`,
        html: await render(
          MentorConfirmationEmail({
            name: trimmed.name,
            email: trimmed.email,
            phone: trimmed.phone,
            linkedinUrl: trimmed.linkedinUrl,
            resumeUrl: trimmed.resumeUrl,
            portfolioUrl: trimmed.portfolioUrl,
            whatBuilt: trimmed.whatBuilt,
            whatFailed: trimmed.whatFailed,
            whatShipped: trimmed.whatShipped,
            whyMentor: trimmed.whyMentor,
            weeklyAvailability: trimmed.weeklyAvailability,
            contactSlot1: trimmed.contactSlot1,
            contactSlot2: trimmed.contactSlot2,
            contactSlot3: trimmed.contactSlot3,
            isAdminCopy: true,
          })
        ),
      });
    } catch (err) {
      console.error("Failed to send mentor admin notification:", err);
    }

    return NextResponse.json(
      { message: "Mentor application submitted successfully.", id: mentor.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/mentor error:", error);
    return NextResponse.json(
      { error: "Failed to submit application." },
      { status: 500 }
    );
  }
}
