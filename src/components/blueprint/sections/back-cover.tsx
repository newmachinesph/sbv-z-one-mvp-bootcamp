import { PageWrapper } from "../page-wrapper";
import { contactInfo } from "../blueprint-data";

export function BackCover() {
  return (
    <PageWrapper pageNumber={13} bg="black" noPadding backgroundImage="/blueprint/13.jpg">
      <div className="relative flex h-full flex-col items-center justify-center px-16 py-20">
        {/* Z1 Logo */}
        <svg
          width="100"
          height="100"
          viewBox="0 0 874 1021"
          fill="none"
          className="mb-10"
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

        {/* Title */}
        <h2
          className="text-[28px] font-bold text-white tracking-tight mb-2 text-center"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          <span className="gradient-text-orange">Z1 Forge</span>
        </h2>
        <p
          className="text-[14px] text-white/50 mb-8 text-center"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {contactInfo.tagline}
        </p>

        {/* Contact */}
        <div className="flex items-center gap-6 mb-10">
          <div className="text-center">
            <span
              className="block text-[11px] font-bold uppercase tracking-[0.1em] text-[#F59E0B] mb-1"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Website
            </span>
            <span
              className="text-[14px] text-white/80"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {contactInfo.website}
            </span>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="text-center">
            <span
              className="block text-[11px] font-bold uppercase tracking-[0.1em] text-[#F59E0B] mb-1"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Email
            </span>
            <span
              className="text-[14px] text-white/80"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {contactInfo.email}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-48 bg-gradient-to-r from-transparent via-[#F59E0B]/30 to-transparent" />

        {/* Copyright — pushed to bottom, centered */}
        <p
          className="absolute bottom-10 left-0 right-0 text-center text-[11px] text-white/20"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {contactInfo.copyright}
        </p>
      </div>
    </PageWrapper>
  );
}
