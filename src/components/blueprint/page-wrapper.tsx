/**
 * Reusable A4-proportioned section wrapper for blueprint pages.
 * Renders with correct aspect ratio, page number, accent line, and Z1 watermark.
 */

interface PageWrapperProps {
  children: React.ReactNode;
  pageNumber: number;
  bg?: "white" | "black" | "gray";
  noPadding?: boolean;
  backgroundImage?: string;
}

export function PageWrapper({
  children,
  pageNumber,
  bg = "white",
  noPadding = false,
  backgroundImage,
}: PageWrapperProps) {
  const isDark = backgroundImage || bg === "black";

  return (
    <div
      data-blueprint-page={pageNumber}
      className={`relative mx-auto w-full max-w-[960px] overflow-hidden ${
        backgroundImage ? "bg-black" : bg === "black" ? "bg-black" : bg === "gray" ? "bg-[#F9FAFB]" : "bg-white"
      }`}
      style={{ aspectRatio: "210 / 297" }}
    >
      {/* Background image + overlay for text contrast */}
      {backgroundImage && (
        <>
          <img
            src={backgroundImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </>
      )}

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 z-10 h-1 bg-gradient-to-r from-[#FBBF24] via-[#F59E0B] to-[#D97706]" />

      {/* Z1 watermark */}
      <svg
        className="absolute bottom-8 right-8 z-10 opacity-[0.03] pointer-events-none"
        width="120"
        height="120"
        viewBox="0 0 874 1021"
        fill="none"
      >
        <path
          d="M54.3067 0.42528C69.8 -0.441387 85.4267 0.318619 100.973 0.118619C295.173 0.345285 489.413 0.451959 683.64 0.625292C686.693 0.518625 689.76 0.891954 692.813 0.411954C685.88 9.85195 680.253 20.3986 673.84 30.2786C552.347 226.665 430.48 423.372 308.813 619.905L309.253 620.719C428.52 620.532 547.827 621.052 667.08 620.692C667.107 672.332 666.907 723.985 667.173 775.625C444.787 775.519 222.4 776.025 0 776.039C11.68 755.745 24.5867 736.079 36.7467 716.012C152.28 529.172 267.92 342.332 383.44 155.439C274.587 155.505 165.747 155.559 56.8933 155.639C56.24 155.585 54.9467 155.465 54.2933 155.399C54.28 103.745 54.24 52.0919 54.3067 0.42528Z"
          fill={isDark ? "#F59E0B" : "#111827"}
        />
        <path
          d="M638.76 342.999C689.307 310.359 739.867 277.719 790.413 245.079C818.253 244.759 846.12 245.239 873.973 244.905C873.96 503.399 873.987 761.879 873.96 1020.37C815.267 1020.24 756.573 1020.33 697.893 1020.43L697.453 1019.81C697.467 839.879 697.4 659.945 697.48 480.012C654.787 507.479 612.4 535.465 569.547 562.652C569.52 504.412 569.453 446.159 569.587 387.919C592.36 372.665 615.747 358.025 638.76 342.999Z"
          fill={isDark ? "#F59E0B" : "#111827"}
        />
      </svg>

      {/* Page number */}
      <span
        className={`absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[11px] font-medium tracking-[0.15em] ${
          isDark ? "text-white/30" : "text-[#9CA3AF]"
        }`}
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {String(pageNumber).padStart(2, "0")}
      </span>

      {/* Content */}
      <div className={`relative z-10 ${noPadding ? "h-full" : "h-full px-16 py-20"}`}>
        {children}
      </div>
    </div>
  );
}
