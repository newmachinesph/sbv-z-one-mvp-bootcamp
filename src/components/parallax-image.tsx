"use client";

import { useRef, useEffect, useCallback } from "react";
import Image from "next/image";

interface ParallaxImageProps {
  src: string;
  alt: string;
  overlay?: React.ReactNode;
  className?: string;
  speed?: number;
}

export function ParallaxImage({ src, alt, overlay, className = "", speed = 0.3 }: ParallaxImageProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const section = sectionRef.current;
    const img = imgRef.current;
    if (!section || !img) return;

    const rect = section.getBoundingClientRect();
    const windowH = window.innerHeight;

    // 0 when section enters viewport bottom, 1 when it leaves viewport top
    const progress = (windowH - rect.top) / (windowH + rect.height);
    const clamped = Math.max(0, Math.min(1, progress));

    // Map progress to offset: centered at 0, range = ±maxShift
    const maxShift = rect.height * speed;
    const offset = (clamped - 0.5) * 2 * maxShift;

    img.style.transform = `translate3d(0, ${offset}px, 0)`;
  }, [speed]);

  useEffect(() => {
    // Check reduced motion preference
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    handleScroll(); // initial position

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [handleScroll]);

  return (
    <section ref={sectionRef} className={`relative overflow-hidden ${className}`}>
      <div ref={imgRef} className="absolute inset-[-20%] z-0 will-change-transform">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>
      {overlay}
    </section>
  );
}
