"use client";

import type { ReactNode } from "react";
import { FadeInView } from "./fade-in-view";

export function SectionHeader({
  title,
  subtitle,
  className,
}: {
  title: ReactNode;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={`mx-auto mb-16 max-w-3xl text-center ${className ?? ""}`}>
      <FadeInView>
        <h2 className="font-heading mb-4 text-[clamp(32px,4vw,56px)] font-bold tracking-tight text-[#111827]">
          {title}
        </h2>
      </FadeInView>
      {subtitle && (
        <FadeInView delay={0.15}>
          <p className="text-[clamp(16px,1.5vw,20px)] text-[#6B7280] leading-relaxed">
            {subtitle}
          </p>
        </FadeInView>
      )}
    </div>
  );
}
