"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Pixel-grid upward arrow (matches role-illustrations.tsx style) ── */
const BLK = "#111827";
const ORG = "#FFB74D";

type Cell = 0 | 1 | 2;

// Upward arrow — chevron tip + shaft
const arrowGrid: Cell[][] = [
  [0, 0, 2, 0, 0],
  [0, 2, 0, 2, 0],
  [2, 0, 0, 0, 2],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
];

const CELL = 5;
const GAP = 1.5;
const STEP = CELL + GAP;

function PixelArrow() {
  const cols = arrowGrid[0].length;
  const rows = arrowGrid.length;
  const gridW = cols * STEP - GAP;
  const gridH = rows * STEP - GAP;
  const vb = 40;
  const ox = (vb - gridW) / 2;
  const oy = (vb - gridH) / 2;

  return (
    <svg
      width={22}
      height={22}
      viewBox={`0 0 ${vb} ${vb}`}
      fill="none"
      aria-hidden="true"
      className="transition-transform duration-300 group-hover:-translate-y-0.5"
    >
      {arrowGrid.flatMap((row, r) =>
        row.map((cell, c) =>
          cell === 0 ? null : (
            <rect
              key={`${r}-${c}`}
              x={ox + c * STEP}
              y={oy + r * STEP}
              width={CELL}
              height={CELL}
              rx={1}
              fill={cell === 1 ? BLK : ORG}
            />
          ),
        ),
      )}
    </svg>
  );
}

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 600);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 24, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.8 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="group fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF3E0] shadow-[0_8px_30px_rgba(245,158,11,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(245,158,11,0.25)]"
        >
          <PixelArrow />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
