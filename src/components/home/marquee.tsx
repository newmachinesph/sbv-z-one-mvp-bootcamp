"use client";

import type { ReactNode } from "react";

export function Marquee({
  children,
  speed = 30,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <div
        className="flex animate-marquee items-center"
        style={{ "--marquee-duration": `${speed}s` } as React.CSSProperties}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
