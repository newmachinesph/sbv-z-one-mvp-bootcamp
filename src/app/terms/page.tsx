import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Terms of Service | Z1 Forge",
};

const sections = [
  {
    title: "Acceptance of Terms",
    content: (
      <p>
        By accessing or using the Z1 Forge platform (&quot;z1.sbv.one&quot;),
        operated by Starting Block Ventures (&quot;SBV,&quot; &quot;we,&quot;
        &quot;us&quot;), you agree to be bound by these Terms of Service. If you
        do not agree, please do not use the platform.
      </p>
    ),
  },
  {
    title: "Eligibility",
    content: (
      <p>
        You must be at least 18 years of age to apply to or participate in the
        Z1 Forge. By submitting an application, you represent that all
        information provided is accurate and complete.
      </p>
    ),
  },
  {
    title: "Forge Participation",
    content: (
      <ul>
        <li>
          Accepted participants commit to approximately 20–25 hours per week for
          the 12-week program duration.
        </li>
        <li>
          Teams are formed at SBV&apos;s discretion based on skills, role
          preferences, and overall cohort balance.
        </li>
        <li>
          Weekly deliverables (&quot;ships&quot;) are expected every Friday.
          Consistent failure to deliver may result in removal from the program.
        </li>
        <li>
          SBV reserves the right to modify the curriculum, schedule, or program
          structure at any time.
        </li>
      </ul>
    ),
  },
  {
    title: "Intellectual Property",
    content: (
      <p>
        All products, code, designs, and content created by participants during
        the Forge remain the intellectual property of the respective team
        members. SBV does not claim ownership of participant work. However, by
        participating, you grant SBV a non-exclusive license to feature your
        team name, product name, and screenshots for promotional and educational
        purposes.
      </p>
    ),
  },
  {
    title: "Code of Conduct",
    content: (
      <>
        <p>Participants agree to:</p>
        <ul>
          <li>
            Treat all team members, mentors, and staff with respect and
            professionalism.
          </li>
          <li>
            Refrain from harassment, discrimination, or any form of abusive
            behavior.
          </li>
          <li>
            Not submit plagiarized work or misrepresent AI-generated output as
            solely human-created where disclosure is required.
          </li>
          <li>Collaborate in good faith with assigned team members.</li>
        </ul>
        <p>
          Violations may result in immediate removal from the program without
          prior notice.
        </p>
      </>
    ),
  },
  {
    title: "Mentorship and Scoring",
    content: (
      <p>
        Mentor feedback and weekly scores are provided at the mentor&apos;s
        discretion and are final. Mentor scores are used for internal program
        assessment and do not constitute a formal academic evaluation. SBV does not guarantee
        mentor availability at specific times.
      </p>
    ),
  },
  {
    title: "Platform Accounts",
    content: (
      <p>
        You are responsible for maintaining the confidentiality of your account
        credentials. You agree not to share login information or access another
        participant&apos;s account without authorization.
      </p>
    ),
  },
  {
    title: "Limitation of Liability",
    content: (
      <p>
        The Z1 Forge and all related platforms are provided &quot;as is&quot;
        without warranty of any kind. SBV shall not be liable for any indirect,
        incidental, or consequential damages arising from your participation in
        the program or use of the platform.
      </p>
    ),
  },
  {
    title: "Termination",
    content: (
      <p>
        SBV may terminate or suspend your access to the platform at any time for
        violation of these terms or any other reason at our sole discretion. You
        may voluntarily withdraw from the program by notifying your team and the
        program administrators.
      </p>
    ),
  },
  {
    title: "Changes to These Terms",
    content: (
      <p>
        We may update these Terms of Service from time to time. Continued use of
        the platform after changes constitutes acceptance of the revised terms.
        Material changes will be communicated via email or platform
        notification.
      </p>
    ),
  },
  {
    title: "Contact",
    content: (
      <p>
        For questions about these terms, contact us at{" "}
        <a
          href="mailto:hello@sbv.one"
          className="font-semibold text-[#D97706] hover:text-[#F59E0B] underline underline-offset-2 transition-colors duration-300"
        >
          hello@sbv.one
        </a>
        .
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ——— Hero header ——— */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #F59E0B 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="relative container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#F59E0B] mb-4">
              Legal
            </p>
            <h1
              className="font-heading text-[clamp(32px,5vw,56px)] font-bold tracking-tight text-[#111827] mb-5"
            >
              Terms of <span className="gradient-text-orange">Service</span>
            </h1>
            <p className="text-[15px] text-[#6B7280]">
              Last updated: February 13, 2026
            </p>
          </div>
        </div>
      </section>

      {/* ——— Content sections ——— */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl space-y-5">
            {sections.map((section, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-7 md:p-8 transition-all duration-500 hover:shadow-[0_12px_40px_rgba(0,0,0,0.04),0_0_0_2px_rgba(245,158,11,0.12)]"
              >
                {/* Ghost index */}
                <span
                  className="absolute top-3 right-5 font-heading text-[56px] md:text-[72px] font-extrabold leading-none text-[#F59E0B]/[0.06] select-none"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Hover accent line */}
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  {/* Section title */}
                  <div className="flex items-center gap-4 mb-4">
                    <span
                      className="font-heading shrink-0 flex items-center justify-center w-9 h-9 rounded-xl bg-[#FEF3C7] text-[12px] font-bold text-[#D97706]"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2
                      className="font-heading text-[17px] md:text-[19px] font-bold text-[#111827]"
                    >
                      {section.title}
                    </h2>
                  </div>

                  {/* Divider */}
                  <div className="h-px w-full bg-[#E5E7EB] mb-4" />

                  {/* Content */}
                  <div className="legal-content text-[14px] md:text-[15px] text-[#6B7280] leading-relaxed [&_p]:mb-3 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_ul]:mb-3 [&_li]:text-[14px] [&_li]:md:text-[15px] [&_li]:text-[#6B7280] [&_li]:leading-relaxed [&_strong]:text-[#111827] [&_strong]:font-semibold">
                    {section.content}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Back to home link */}
          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#111827] transition-colors duration-300 hover:text-[#F59E0B]"
            >
              Back to Home
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
