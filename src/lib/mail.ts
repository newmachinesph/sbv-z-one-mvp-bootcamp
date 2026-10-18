import nodemailer from "nodemailer";

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

function createTransporter() {
  const port = Number(process.env.MAIL_PORT) || 587;
  const useSSL = process.env.MAIL_SSL_TLS === "true";

  return nodemailer.createTransport({
    host: process.env.MAIL_SERVER,
    port,
    secure: useSSL,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: process.env.NODE_ENV === "production",
    },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 30_000,
  });
}

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  cc?: string | string[];
  bcc?: string | string[];
  replyTo?: string;
}

export async function sendEmail({ to, subject, html, cc, bcc, replyTo }: SendEmailOptions) {
  const fromName = process.env.MAIL_FROM_NAME || "SBV Z1";
  const fromAddress =
    process.env.MAIL_FROM || process.env.MAIL_USERNAME || "info@sbv.one";

  let lastError: unknown;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const transporter = createTransporter();

      // Build explicit envelope so BCC recipients are included in RCPT TO
      const toList = Array.isArray(to) ? to : [to];
      const ccList = cc ? (Array.isArray(cc) ? cc : [cc]) : [];
      const bccList = bcc ? (Array.isArray(bcc) ? bcc : [bcc]) : [];

      await transporter.sendMail({
        from: `${fromName} <${fromAddress}>`,
        to,
        cc,
        bcc,
        replyTo,
        subject,
        html,
        envelope: {
          from: fromAddress,
          to: [...toList, ...ccList, ...bccList],
        },
      });
      return;
    } catch (error) {
      lastError = error;
      console.error(
        `Email send attempt ${attempt}/${MAX_RETRIES} failed (to: ${to}):`,
        error
      );
      if (attempt < MAX_RETRIES) {
        await new Promise((r) => setTimeout(r, RETRY_DELAY_MS * attempt));
      }
    }
  }

  throw lastError;
}