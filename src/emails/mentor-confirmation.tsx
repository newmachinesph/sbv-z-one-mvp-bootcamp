import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Hr,
  Preview,
  Link,
} from "@react-email/components";

interface MentorConfirmationEmailProps {
  name: string;
  email: string;
  phone: string;
  linkedinUrl: string;
  resumeUrl: string;
  portfolioUrl?: string | null;
  whatBuilt: string;
  whatFailed: string;
  whatShipped: string;
  whyMentor: string;
  weeklyAvailability: string;
  contactSlot1: string;
  contactSlot2: string;
  contactSlot3: string;
  isAdminCopy?: boolean;
}

const availabilityLabels: Record<string, string> = {
  "1-2": "1\u20132 hours per week",
  "3-4": "3\u20134 hours per week",
  "5+": "5+ hours per week",
  flexible: "Flexible \u2014 depends on the week",
};

function formatSlot(value: string) {
  if (!value) return "\u2014";
  try {
    const d = new Date(value);
    return d.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return value;
  }
}

export default function MentorConfirmationEmail({
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
  isAdminCopy,
}: MentorConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        {isAdminCopy
          ? `New mentor application from ${name}`
          : "Your Z1 Forge mentor application has been received!"}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={brandName}>Z1</Text>
            <Text style={brandLabel}>Forge</Text>
            <Text style={brandTagline}>by Starting Block Ventures</Text>
          </Section>

          {/* Body */}
          <Section style={body}>
            {isAdminCopy ? (
              <>
                <Text style={heading}>New Mentor Application</Text>
                <Text style={paragraph}>
                  A new mentor application has been submitted. Details below.
                </Text>
              </>
            ) : (
              <>
                <Text style={heading}>Application Received</Text>
                <Text style={paragraph}>
                  Thank you, {name}!
                </Text>
                <Text style={paragraph}>
                  We&apos;ve received your mentor application for Z1 Forge.
                  Our team will review it and reach out to schedule a brief
                  conversation.
                </Text>
                <Text style={paragraph}>
                  In the meantime, learn more about the program on our{" "}
                  <Link href="https://z1.sbv.one/about" style={link}>
                    About page
                  </Link>
                  .
                </Text>
              </>
            )}
          </Section>

          <Hr style={divider} />

          {/* Contact details */}
          <Section style={body}>
            <Text style={sectionLabel}>Contact Information</Text>

            <Section style={detailsCard}>
              <Section style={detailRow}>
                <Text style={detailLabel}>Name</Text>
                <Text style={detailValue}>{name}</Text>
              </Section>

              <Section style={detailRow}>
                <Text style={detailLabel}>Email</Text>
                <Text style={detailValue}>
                  <Link href={`mailto:${email}`} style={link}>
                    {email}
                  </Link>
                </Text>
              </Section>

              <Section style={detailRow}>
                <Text style={detailLabel}>Phone</Text>
                <Text style={detailValue}>{phone}</Text>
              </Section>

              <Section style={detailRow}>
                <Text style={detailLabel}>LinkedIn</Text>
                <Text style={detailValue}>
                  <Link href={linkedinUrl} style={link}>
                    {linkedinUrl}
                  </Link>
                </Text>
              </Section>

              <Section style={detailRow}>
                <Text style={detailLabel}>Resume / CV</Text>
                <Text style={detailValue}>
                  <Link href={resumeUrl} style={link}>
                    {resumeUrl}
                  </Link>
                </Text>
              </Section>

              {portfolioUrl && (
                <Section style={{ marginBottom: "0" }}>
                  <Text style={detailLabel}>Portfolio</Text>
                  <Text style={detailValue}>
                    <Link href={portfolioUrl} style={link}>
                      {portfolioUrl}
                    </Link>
                  </Text>
                </Section>
              )}
            </Section>
          </Section>

          <Hr style={divider} />

          {/* Builder questions */}
          <Section style={body}>
            <Text style={sectionLabel}>Builder Questions</Text>

            <Section style={detailsCard}>
              <Section style={detailRow}>
                <Text style={detailLabel}>
                  Most meaningful thing built or led
                </Text>
                <Text style={detailValueLong}>{whatBuilt}</Text>
              </Section>

              <Section style={detailRow}>
                <Text style={detailLabel}>
                  Something that didn&apos;t work out
                </Text>
                <Text style={detailValueLong}>{whatFailed}</Text>
              </Section>

              <Section style={detailRow}>
                <Text style={detailLabel}>Shipped in the last 2 years</Text>
                <Text style={detailValueLong}>{whatShipped}</Text>
              </Section>

              <Section style={{ marginBottom: "0" }}>
                <Text style={detailLabel}>Why mentor at Z1 Forge</Text>
                <Text style={detailValueLong}>{whyMentor}</Text>
              </Section>
            </Section>
          </Section>

          <Hr style={divider} />

          {/* Availability */}
          <Section style={body}>
            <Text style={sectionLabel}>Availability</Text>

            <Section style={detailsCard}>
              <Section style={detailRow}>
                <Text style={detailLabel}>Weekly Availability</Text>
                <Text style={detailValue}>
                  {availabilityLabels[weeklyAvailability] ??
                    weeklyAvailability}
                </Text>
              </Section>

              <Section style={detailRow}>
                <Text style={detailLabel}>Preferred Contact Slot 1</Text>
                <Text style={detailValue}>{formatSlot(contactSlot1)}</Text>
              </Section>

              <Section style={detailRow}>
                <Text style={detailLabel}>Preferred Contact Slot 2</Text>
                <Text style={detailValue}>{formatSlot(contactSlot2)}</Text>
              </Section>

              <Section style={{ marginBottom: "0" }}>
                <Text style={detailLabel}>Preferred Contact Slot 3</Text>
                <Text style={detailValue}>{formatSlot(contactSlot3)}</Text>
              </Section>
            </Section>
          </Section>

          <Hr style={divider} />

          {/* Sign-off */}
          <Section style={body}>
            {isAdminCopy ? (
              <Text style={paragraph}>
                Reply directly to{" "}
                <Link href={`mailto:${email}`} style={link}>
                  {email}
                </Link>{" "}
                to respond.
              </Text>
            ) : (
              <>
                <Text style={paragraph}>Best regards,</Text>
                <Text style={signoff}>The Z1 Forge Team</Text>
              </>
            )}
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Z1 Forge &bull;{" "}
              <Link href="https://z1.sbv.one" style={footerLink}>
                z1.sbv.one
              </Link>
            </Text>
            <Text style={footerMuted}>
              The collaborative forge for startup founders, everywhere.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

/* ——— Styles aligned to the Z1 website design system ——— */

const main: React.CSSProperties = {
  backgroundColor: "#F9FAFB",
  fontFamily:
    "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

const container: React.CSSProperties = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  maxWidth: "600px",
  borderRadius: "12px",
  border: "1px solid #E5E7EB",
  overflow: "hidden",
};

const header: React.CSSProperties = {
  backgroundColor: "#111827",
  padding: "32px 40px",
  textAlign: "center" as const,
};

const brandName: React.CSSProperties = {
  color: "#F59E0B",
  fontSize: "36px",
  fontWeight: "800",
  letterSpacing: "-0.02em",
  margin: "0",
  lineHeight: "1",
};

const brandLabel: React.CSSProperties = {
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "600",
  textTransform: "uppercase" as const,
  letterSpacing: "0.2em",
  margin: "6px 0 0",
};

const brandTagline: React.CSSProperties = {
  color: "rgba(255,255,255,0.4)",
  fontSize: "12px",
  margin: "4px 0 0",
};

const body: React.CSSProperties = {
  padding: "28px 40px",
};

const heading: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#111827",
  margin: "0 0 16px",
  lineHeight: "1.2",
};

const paragraph: React.CSSProperties = {
  fontSize: "15px",
  lineHeight: "1.7",
  color: "#374151",
  margin: "0 0 12px",
};

const sectionLabel: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: "700",
  color: "#F59E0B",
  textTransform: "uppercase" as const,
  letterSpacing: "0.2em",
  margin: "0 0 16px",
};

const detailsCard: React.CSSProperties = {
  backgroundColor: "#F9FAFB",
  padding: "20px 24px",
  borderRadius: "12px",
  border: "1px solid #E5E7EB",
};

const detailRow: React.CSSProperties = {
  marginBottom: "14px",
};

const detailLabel: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: "600",
  color: "#6B7280",
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
  margin: "0 0 2px",
};

const detailValue: React.CSSProperties = {
  fontSize: "15px",
  color: "#111827",
  margin: "0",
  lineHeight: "1.5",
};

const detailValueLong: React.CSSProperties = {
  fontSize: "15px",
  color: "#111827",
  margin: "0",
  lineHeight: "1.7",
  whiteSpace: "pre-wrap" as const,
};

const signoff: React.CSSProperties = {
  fontSize: "15px",
  fontWeight: "700",
  color: "#111827",
  margin: "0",
};

const divider: React.CSSProperties = {
  borderColor: "#E5E7EB",
  margin: "0",
};

const link: React.CSSProperties = {
  color: "#F59E0B",
  textDecoration: "underline",
};

const footer: React.CSSProperties = {
  backgroundColor: "#111827",
  padding: "24px 40px",
  textAlign: "center" as const,
};

const footerText: React.CSSProperties = {
  fontSize: "13px",
  color: "rgba(255,255,255,0.5)",
  margin: "0 0 4px",
};

const footerLink: React.CSSProperties = {
  color: "#F59E0B",
  textDecoration: "none",
};

const footerMuted: React.CSSProperties = {
  fontSize: "12px",
  color: "rgba(255,255,255,0.25)",
  margin: "0",
};
