import { NextResponse } from "next/server";
import { isValidEmail } from "@/lib/validations";
import { sendEmail } from "@/lib/mail";
import { render } from "@react-email/components";
import ContactInquiryEmail from "@/emails/contact-inquiry";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getRateLimitKey } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const rateLimitKey = `contact:${getRateLimitKey(request)}`;
  const { allowed, retryAfterMs } = checkRateLimit(rateLimitKey, { windowMs: 60_000, maxRequests: 5 });
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(retryAfterMs / 1000)) } }
    );
  }

  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 },
      );
    }

    if (typeof name !== "string" || name.length > 200) {
      return NextResponse.json({ error: "Invalid name." }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 },
      );
    }

    if (typeof subject !== "string" || subject.length > 300) {
      return NextResponse.json({ error: "Invalid subject." }, { status: 400 });
    }

    if (typeof message !== "string" || message.trim().length < 20) {
      return NextResponse.json(
        { error: "Message must be at least 20 characters." },
        { status: 400 },
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { error: "Message is too long." },
        { status: 400 },
      );
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedSubject = subject.trim();
    const trimmedMessage = message.trim();

    // Send confirmation email to the sender
    try {
      await sendEmail({
        to: trimmedEmail,
        replyTo: "hello@sbv.one",
        subject: `Re: ${trimmedSubject} — Z1 Forge`,
        html: await render(
          ContactInquiryEmail({
            name: trimmedName,
            email: trimmedEmail,
            subject: trimmedSubject,
            message: trimmedMessage,
          }),
        ),
      });
    } catch (err) {
      console.error("Failed to send confirmation email to sender:", err);
    }

    // Send admin notification email
    try {
      const admins = await prisma.admin.findMany({ select: { email: true } });
      const adminEmails = admins.map((a) => a.email);
      const toAddress = adminEmails.length > 0 ? adminEmails[0] : "hello@sbv.one";
      const bccAddresses = adminEmails.length > 1 ? adminEmails.slice(1) : undefined;

      await sendEmail({
        to: toAddress,
        bcc: bccAddresses,
        replyTo: trimmedEmail,
        subject: `[Contact] ${trimmedSubject} — from ${trimmedName}`,
        html: await render(
          ContactInquiryEmail({
            name: trimmedName,
            email: trimmedEmail,
            subject: trimmedSubject,
            message: trimmedMessage,
            isAdminCopy: true,
          }),
        ),
      });
    } catch (err) {
      console.error("Failed to send admin notification email:", err);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
