"use client";

import { useMemo } from "react";

const COLS = 80;
const ROWS = 40;
const CELL = 12;
const GAP = 3;
const UNIT = CELL + GAP;

/** Sharp triangle peak — returns height 0-1 at normalised x */
function triangle(
  x: number,
  left: number,
  center: number,
  right: number,
  height: number,
): number {
  if (x <= left || x >= right) return 0;
  if (x <= center) return height * ((x - left) / (center - left));
  return height * ((right - x) / (right - center));
}

/** Two-peak mountain profile matching the reference silhouette */
function mountainHeight(col: number): number {
  const x = col / (COLS - 1);

  // Smaller left peak
  const left = triangle(x, 0.02, 0.24, 0.42, 0.48);
  // Larger right peak
  const right = triangle(x, 0.22, 0.54, 0.82, 0.78);

  return Math.max(left, right, 0.0);
}

/** Deterministic pseudo-random (integer-only — avoids Math.sin hydration drift) */
function hash(a: number, b: number): number {
  let h = (a * 374761393 + b * 668265263 + 1013904223) | 0;
  h = (((h ^ (h >>> 13)) * 1274126177) | 0) >>> 0;
  return (h & 0xffff) / 0x10000;
}

export function MountainGrid() {
  const cells = useMemo(() => {
    const filled: { x: number; y: number; o: number }[] = [];

    for (let c = 0; c < COLS; c++) {
      const peak = Math.round(mountainHeight(c) * ROWS);

      // Solid mountain body — bottom-up to peak
      for (let r = 0; r < peak; r++) {
        const ratio = r / ROWS;
        filled.push({
          x: c * UNIT,
          y: (ROWS - 1 - r) * UNIT,
          o: Math.round((0.025 + ratio * 0.085) * 1e4) / 1e4,
        });
      }

      // Dissolving scatter above the peak
      for (let s = 0; s < 5; s++) {
        const r = peak + s;
        if (r >= ROWS) break;
        if (hash(c, r) < 0.22 / (s + 1)) {
          filled.push({
            x: c * UNIT,
            y: (ROWS - 1 - r) * UNIT,
            o: Math.round((0.015 + hash(c + 50, r) * 0.025) * 1e4) / 1e4,
          });
        }
      }
    }

    return filled;
  }, []);

  const w = COLS * UNIT;
  const h = ROWS * UNIT;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="absolute bottom-0 left-0 w-[110%] max-w-none"
        preserveAspectRatio="xMinYMax slice"
        aria-hidden="true"
      >
        {/* Faint square-grid backdrop (single <pattern> — very efficient) */}
        <defs>
          <pattern
            id="hero-grid"
            width={UNIT}
            height={UNIT}
            patternUnits="userSpaceOnUse"
          >
            <rect
              width={CELL}
              height={CELL}
              rx={1.5}
              fill="none"
              stroke="rgba(0,0,0,0.04)"
              strokeWidth={0.5}
            />
          </pattern>
        </defs>
        <rect width={w} height={h} fill="url(#hero-grid)" />

        {/* Orange mountain cells */}
        {cells.map((cell, i) => (
          <rect
            key={i}
            x={cell.x}
            y={cell.y}
            width={CELL}
            height={CELL}
            rx={1.5}
            fill="#F59E0B"
            opacity={cell.o}
          />
        ))}
      </svg>
    </div>
  );
}
