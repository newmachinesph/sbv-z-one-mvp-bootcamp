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

interface ContactInquiryEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
  isAdminCopy?: boolean;
}

export default function ContactInquiryEmail({
  name,
  email,
  subject,
  message,
  isAdminCopy,
}: ContactInquiryEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        {isAdminCopy
          ? `New contact inquiry from ${name}: ${subject}`
          : `We received your message — ${subject}`}
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
            {isAdminCopy ? (
              <>
                <Text style={heading}>New Contact Inquiry</Text>
                <Text style={paragraph}>
                  A new inquiry has been submitted via the contact form.
                </Text>
              </>
            ) : (
              <>
                <Text style={heading}>We Received Your Message</Text>
                <Text style={paragraph}>
                  Hi {name}, thank you for reaching out!
                </Text>
                <Text style={paragraph}>
                  We&apos;ve received your inquiry and will get back to you
                  within 48 hours. Here&apos;s a copy of what you sent:
                </Text>
              </>
            )}
          </Section>

          <Hr style={divider} />

          {/* Inquiry details card */}
          <Section style={body}>
            <Text style={sectionLabel}>Inquiry Details</Text>

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
                <Text style={detailLabel}>Subject</Text>
                <Text style={detailValue}>{subject}</Text>
              </Section>

              <Section style={{ marginBottom: "0" }}>
                <Text style={detailLabel}>Message</Text>
                <Text style={detailValueMessage}>{message}</Text>
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

const detailValueMessage: React.CSSProperties = {
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
