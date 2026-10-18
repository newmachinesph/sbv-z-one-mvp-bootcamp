"use client";

import { motion, useReducedMotion } from "framer-motion";

export function CharReveal({
  text,
  className,
  charDelay = 0.02,
  startDelay = 0,
}: {
  text: string;
  className?: string;
  charDelay?: number;
  startDelay?: number;
}) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return <span className={className}>{text}</span>;
  }

  return (
    <motion.span
      initial="hidden"
      animate="visible"
      className={className}
      aria-label={text}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                delay: startDelay + i * charDelay,
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              },
            },
          }}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}
