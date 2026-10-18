import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/logo";

const platformLinks = [
  { href: "/about", label: "About" },
  { href: "/teams", label: "Teams" },
  { href: "/collaborate", label: "Collaborate" },
  { href: "/apply", label: "Apply" },
  { href: "/quiz", label: "Quiz" },
];

const ecosystemLinks = [
  { href: "/", label: "Forge" },
  { href: "/mentor", label: "Mentor" },
  { href: "https://pitch.sbv.one", label: "Pitch", external: true },
  { href: "https://sbv.one/inspace", label: "InSpace", external: true },
];

const socialLinks = [
  {
    href: "https://www.facebook.com/startingblockventures",
    label: "Facebook",
  },
  {
    href: "https://www.linkedin.com/company/starting-block-ventures",
    label: "LinkedIn",
  },
];

/** Inline SVG watermark — the Z1 logo paths at very low opacity */
function LogoWatermark() {
  return (
    <svg
      viewBox="0 0 874 1021"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none absolute -left-16 -top-8 h-[130%] w-auto opacity-[0.04]"
      aria-hidden="true"
    >
      <path
        d="M54.3067 0.42528C69.8 -0.441387 85.4267 0.318619 100.973 0.118619C295.173 0.345285 489.413 0.451959 683.64 0.625292C686.693 0.518625 689.76 0.891954 692.813 0.411954C685.88 9.85195 680.253 20.3986 673.84 30.2786C552.347 226.665 430.48 423.372 308.813 619.905L309.253 620.719C428.52 620.532 547.827 621.052 667.08 620.692C667.107 672.332 666.907 723.985 667.173 775.625C444.787 775.519 222.4 776.025 0 776.039C11.68 755.745 24.5867 736.079 36.7467 716.012C152.28 529.172 267.92 342.332 383.44 155.439C274.587 155.505 165.747 155.559 56.8933 155.639C56.24 155.585 54.9467 155.465 54.2933 155.399C54.28 103.745 54.24 52.0919 54.3067 0.42528Z"
        fill="#F59E0B"
      />
      <path
        d="M638.76 342.999C689.307 310.359 739.867 277.719 790.413 245.079C818.253 244.759 846.12 245.239 873.973 244.905C873.96 503.399 873.987 761.879 873.96 1020.37C815.267 1020.24 756.573 1020.33 697.893 1020.43L697.453 1019.81C697.467 839.879 697.4 659.945 697.48 480.012C654.787 507.479 612.4 535.465 569.547 562.652C569.52 504.412 569.453 446.159 569.587 387.919C592.36 372.665 615.747 358.025 638.76 342.999Z"
        fill="#F59E0B"
      />
    </svg>
  );
}

export function Footer({ hideCta = false }: { hideCta?: boolean } = {}) {
  return (
    <footer className="relative bg-[#000] text-white overflow-hidden">
      {/* Subtle logo watermark */}
      <LogoWatermark />

      {/* ——— CTA strip ——— */}
      {!hideCta && (
      <div className="relative border-b border-white/[0.06]">
        <div className="container mx-auto px-6 py-16 md:py-24 text-center">
          <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#F59E0B] mb-4">
            Ready to build?
          </p>
          <h2 className="font-heading text-[clamp(28px,4vw,48px)] font-bold leading-[1.1] tracking-tight text-white mb-8">
            Start your journey
            <br />
            from zero to one.
          </h2>
          <Link
            href="/apply"
            className="btn-glow group inline-flex items-center gap-3 rounded-full px-8 py-4 text-[15px] font-semibold text-black"
          >
            Apply for Cohort 1
            <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
      )}

      {/* ——— Links grid ——— */}
      <div className="relative container mx-auto px-6 pt-12 pb-12">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-4 space-y-4">
            <Link href="/">
              <Logo variant="md" />
            </Link>
            <p className="text-[14px] leading-relaxed text-white/40 max-w-[260px]">
              The collaborative forge where small teams build, ship, and launch
              real products.
            </p>
          </div>

          {/* Platform */}
          <div className="md:col-span-2">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/30 mb-5">
              Platform
            </h4>
            <nav className="flex flex-col gap-3">
              {platformLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[14px] text-white/50 transition-colors duration-200 hover:text-[#F59E0B]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Ecosystem */}
          <div className="md:col-span-2">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/30 mb-5">
              Ecosystem
            </h4>
            <nav className="flex flex-col gap-3">
              {ecosystemLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] text-white/50 transition-colors duration-200 hover:text-[#F59E0B]"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[14px] text-white/50 transition-colors duration-200 hover:text-[#F59E0B]"
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </nav>
          </div>

          {/* Social */}
          <div className="md:col-span-2">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/30 mb-5">
              Connect
            </h4>
            <nav className="flex flex-col gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] text-white/50 transition-colors duration-200 hover:text-[#F59E0B]"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="mailto:hello@sbv.one"
                className="text-[14px] text-white/50 transition-colors duration-200 hover:text-[#F59E0B]"
              >
                hello@sbv.one
              </a>
            </nav>
          </div>

          {/* Contact CTA */}
          <div className="md:col-span-2">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/30 mb-5">
              Contact
            </h4>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-[13px] font-medium text-white/60 transition-all duration-300 hover:border-[#F59E0B]/40 hover:text-[#F59E0B] hover:bg-[#F59E0B]/5"
            >
              Get in Touch
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* ——— Bottom bar ——— */}
      <div className="relative border-t border-white/[0.06]">
        <div className="container mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-white/25">
            &copy; {new Date().getFullYear()} Z1 Forge. Built for startup
            founders. Designed for global impact.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/terms"
              className="text-[12px] text-white/25 transition-colors hover:text-white/50"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-[12px] text-white/25 transition-colors hover:text-white/50"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
