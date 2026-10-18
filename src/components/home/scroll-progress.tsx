"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[9999] h-[3px] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #F59E0B, #D97706)",
      }}
    />
  );
}
