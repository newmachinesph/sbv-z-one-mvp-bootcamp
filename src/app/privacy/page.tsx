import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Z1 Forge",
};

const sections = [
  {
    title: "Information We Collect",
    content: (
      <>
        <p>
          When you apply to or participate in the Z1 Forge, we collect the
          following information:
        </p>
        <ul>
          <li>
            <strong>Account information:</strong> name, email address, and login
            credentials.
          </li>
          <li>
            <strong>Application data:</strong> preferred role, skills, experience
            level, and motivation statement.
          </li>
          <li>
            <strong>Program activity:</strong> weekly submissions, scores, team
            assignments, and progress data.
          </li>
          <li>
            <strong>Usage data:</strong> pages visited, browser type, and device
            information collected automatically through standard web
            technologies.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "How We Use Your Information",
    content: (
      <>
        <p>We use collected information to:</p>
        <ul>
          <li>Process and evaluate your application.</li>
          <li>
            Match you with a team based on your role preference and skills.
          </li>
          <li>
            Operate the Forge platform, including team pages,
            and dashboard.
          </li>
          <li>
            Communicate program updates, schedule changes, and important
            announcements.
          </li>
          <li>Improve the platform experience and program quality.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Information Sharing",
    content: (
      <>
        <p>
          We do not sell your personal information. We may share limited
          information in the following cases:
        </p>
        <ul>
          <li>
            <strong>Within the program:</strong> your name, role, and team
            assignment are visible to other Forge participants on the platform.
          </li>
          <li>
            <strong>Mentors:</strong> mentors have access to your team profile
            and weekly submissions to provide feedback and scoring.
          </li>
          <li>
            <strong>Public team pages:</strong> team names, product names, and
            progress status are displayed publicly on team pages.
          </li>
          <li>
            <strong>Legal requirements:</strong> we may disclose information if
            required by law or to protect the rights and safety of SBV and its
            participants.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "Data Storage and Security",
    content: (
      <p>
        Your data is stored on secure, cloud-hosted infrastructure. We use
        industry-standard measures including encrypted connections (HTTPS),
        hashed passwords, and access controls to protect your information.
        However, no method of electronic storage is 100% secure, and we cannot
        guarantee absolute security.
      </p>
    ),
  },
  {
    title: "Cookies and Tracking",
    content: (
      <p>
        We use essential cookies for authentication and session management. We
        do not use third-party advertising trackers. Analytics data, if
        collected, is used solely to improve platform performance and user
        experience.
      </p>
    ),
  },
  {
    title: "Your Rights",
    content: (
      <>
        <p>You have the right to:</p>
        <ul>
          <li>
            Access the personal information we hold about you by contacting us.
          </li>
          <li>
            Request correction of inaccurate information in your profile.
          </li>
          <li>
            Request deletion of your account and associated data. Note that some
            data (e.g., program history) may be retained in anonymized form.
          </li>
          <li>
            Withdraw from the program at any time, after which your active data
            will be archived.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "Data Retention",
    content: (
      <p>
        Application data for non-accepted applicants is retained for up to 12
        months, after which it is deleted. Participant data is retained for the
        duration of the program and up to 24 months after completion for alumni
        community purposes. You may request earlier deletion by contacting us.
      </p>
    ),
  },
  {
    title: "Third-Party Services",
    content: (
      <p>
        The platform may integrate with third-party services (e.g.,
        authentication providers, file storage). These services have their own
        privacy policies, and we encourage you to review them. We only share the
        minimum information necessary for these integrations to function.
      </p>
    ),
  },
  {
    title: "Children's Privacy",
    content: (
      <p>
        The Z1 Forge is not intended for individuals under 18 years of age.
        We do not knowingly collect personal information from minors. If we
        become aware that we have collected data from a minor, we will delete it
        promptly.
      </p>
    ),
  },
  {
    title: "Changes to This Policy",
    content: (
      <p>
        We may update this Privacy Policy from time to time. Changes will be
        posted on this page with an updated revision date. Continued use of the
        platform after changes constitutes acceptance of the revised policy.
      </p>
    ),
  },
  {
    title: "Contact",
    content: (
      <p>
        For privacy-related questions or requests, contact us at{" "}
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

export default function PrivacyPage() {
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
              Privacy <span className="gradient-text-orange">Policy</span>
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
