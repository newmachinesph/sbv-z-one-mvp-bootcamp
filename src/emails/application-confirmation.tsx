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

interface ApplicationConfirmationEmailProps {
  applicantName: string;
  email: string;
  preferredRole: string;
  skills: string[];
  experience: string;
  linkedinUrl: string;
  resumeUrl?: string | null;
  portfolioUrl?: string | null;
  location: string;
  motivation: string;
}

const roleLabels: Record<string, { label: string; emoji: string }> = {
  HACKER: { label: "Hacker", emoji: "🔨" },
  HUSTLER: { label: "Hustler", emoji: "📣" },
  HIPSTER: { label: "Hipster", emoji: "🎨" },
  HOUND: { label: "Hound", emoji: "🔍" },
};

export default function ApplicationConfirmationEmail({
  applicantName,
  email,
  preferredRole,
  skills,
  experience,
  linkedinUrl,
  resumeUrl,
  portfolioUrl,
  location,
  motivation,
}: ApplicationConfirmationEmailProps) {
  const role = roleLabels[preferredRole] || {
    label: preferredRole,
    emoji: "",
  };

  return (
    <Html>
      <Head />
      <Preview>
        Your Z1 Forge application has been received!
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header — text-only branding */}
          <Section style={header}>
            <Text style={brandName}>Z1</Text>
            <Text style={brandLabel}>Forge</Text>
            <Text style={brandTagline}>by Starting Block Ventures</Text>
          </Section>

          {/* Body */}
          <Section style={body}>
            <Text style={heading}>Application Received</Text>
            <Text style={paragraph}>
              Thank you, {applicantName}!
            </Text>
            <Text style={paragraph}>
              We&apos;ve successfully received your application for the Z1
              Forge. It is now in our review queue.
            </Text>

            <Text style={subheading}>What happens next?</Text>
            <Text style={paragraph}>
              Our team will carefully evaluate all submissions and get back to
              you between March 23–27, 2026. You&apos;ll receive an email
              update regarding the status of your application along with next
              steps.
            </Text>
            <Text style={paragraph}>
              While you wait, explore our{" "}
              <Link href="https://z1.sbv.one/program" style={link}>
                12-week program
              </Link>{" "}
              to see what you&apos;ll be building, shipping, and validating
              throughout the program.
            </Text>
            <Text style={paragraph}>
              We truly appreciate your interest and are excited about the
              possibility of helping you turn your idea into a real,
              market-ready product.
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Application details card */}
          <Section style={body}>
            <Text style={sectionLabel}>Your Application Details</Text>

            <Section style={detailsCard}>
              <Section style={detailRow}>
                <Text style={detailLabel}>Name</Text>
                <Text style={detailValue}>{applicantName}</Text>
              </Section>

              <Section style={detailRow}>
                <Text style={detailLabel}>Email</Text>
                <Text style={detailValue}>{email}</Text>
              </Section>

              <Section style={detailRow}>
                <Text style={detailLabel}>Preferred Role</Text>
                <Text style={detailValue}>
                  {role.emoji} {role.label}
                </Text>
              </Section>

              <Section style={detailRow}>
                <Text style={detailLabel}>Skills</Text>
                <Text style={detailValue}>{skills.join(", ")}</Text>
              </Section>

              <Section style={detailRow}>
                <Text style={detailLabel}>Experience</Text>
                <Text style={detailValue}>{experience}</Text>
              </Section>

              <Section style={detailRow}>
                <Text style={detailLabel}>Location</Text>
                <Text style={detailValue}>{location}</Text>
              </Section>

              <Section style={detailRow}>
                <Text style={detailLabel}>LinkedIn</Text>
                <Text style={detailValue}>
                  <Link href={linkedinUrl} style={link}>{linkedinUrl}</Link>
                </Text>
              </Section>

              {resumeUrl && (
                <Section style={detailRow}>
                  <Text style={detailLabel}>Resume / CV</Text>
                  <Text style={detailValue}>
                    <Link href={resumeUrl} style={link}>{resumeUrl}</Link>
                  </Text>
                </Section>
              )}

              {portfolioUrl && (
                <Section style={detailRow}>
                  <Text style={detailLabel}>Portfolio</Text>
                  <Text style={detailValue}>
                    <Link href={portfolioUrl} style={link}>{portfolioUrl}</Link>
                  </Text>
                </Section>
              )}

              <Section style={{ marginBottom: "0" }}>
                <Text style={detailLabel}>Motivation</Text>
                <Text style={detailValue}>{motivation}</Text>
              </Section>
            </Section>
          </Section>

          <Hr style={divider} />

          {/* Sign-off */}
          <Section style={body}>
            <Text style={paragraph}>Best regards,</Text>
            <Text style={signoff}>The Z1 Forge Team</Text>
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

const subheading: React.CSSProperties = {
  fontSize: "16px",
  fontWeight: "700",
  color: "#111827",
  margin: "20px 0 8px",
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
