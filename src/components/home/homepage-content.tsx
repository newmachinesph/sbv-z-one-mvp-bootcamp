"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { NoiseOverlay } from "./noise-overlay";
import { ScrollProgress } from "./scroll-progress";
import HeroSection from "./hero-section";
import StatsSection from "./stats-section";
import IntersectionsSection from "./intersections-section";
import RhythmSection from "./rhythm-section";
import JourneySection from "./journey-section";
import InSpaceSection from "./inspace-section";
import AISection from "./ai-section";
import BuildersSection from "./builders-section";
import { BackToTop } from "./back-to-top";

export default function HomepageContent() {
  // Initialize Lenis smooth scrolling (homepage only)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <>
      <NoiseOverlay />
      <ScrollProgress />
      <Navbar />
      <main className="bg-white">
        <HeroSection />
        <StatsSection />
        <IntersectionsSection />
        <RhythmSection />
        <JourneySection />
        <InSpaceSection />
        <AISection />
        <BuildersSection />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
