"use client";

/**
 * Pixel-grid role illustrations for the 4H Framework.
 * Small squares form together into distinct geometric shapes.
 * Black #111827 + orange #FFB74D on soft orange #FFF3E0.
 */

interface IllustrationProps {
  className?: string;
  size?: number;
}

const BLK = "#111827";
const ORG = "#FFB74D";
const BG = "#FFF3E0";

type Cell = 0 | 1 | 2;
type Grid = Cell[][];

const CELL = 12;
const GAP = 2.5;
const STEP = CELL + GAP;

function PixelIcon({
  grid,
  label,
  className,
  size = 80,
}: { grid: Grid; label: string } & IllustrationProps) {
  const cols = grid[0].length;
  const rows = grid.length;
  const gridW = cols * STEP - GAP;
  const gridH = rows * STEP - GAP;
  const ox = (96 - gridW) / 2;
  const oy = (96 - gridH) / 2;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 96"
      fill="none"
      className={className}
      aria-label={label}
    >
      <rect width="96" height="96" rx="20" fill={BG} />
      {grid.flatMap((row, r) =>
        row.map((cell, c) =>
          cell === 0 ? null : (
            <rect
              key={`${r}-${c}`}
              x={ox + c * STEP}
              y={oy + r * STEP}
              width={CELL}
              height={CELL}
              rx={2}
              fill={cell === 1 ? BLK : ORG}
            />
          )
        )
      )}
    </svg>
  );
}

/* ── HACKER ── diagonal staircase — building blocks ascending */
const hackerGrid: Grid = [
  [1, 1, 0, 0, 0],
  [1, 2, 1, 0, 0],
  [0, 1, 2, 1, 0],
  [0, 0, 1, 2, 1],
  [0, 0, 0, 1, 1],
];

/* ── HUSTLER ── upward arrow — energy and direction */
const hustlerGrid: Grid = [
  [0, 0, 1, 0, 0],
  [0, 1, 2, 1, 0],
  [1, 0, 2, 0, 1],
  [0, 0, 2, 0, 0],
  [0, 0, 1, 0, 0],
];

/* ── HIPSTER ── filled diamond — design and composition */
const hipsterGrid: Grid = [
  [0, 0, 1, 0, 0],
  [0, 1, 2, 1, 0],
  [1, 2, 2, 2, 1],
  [0, 1, 2, 1, 0],
  [0, 0, 1, 0, 0],
];

/* ── HOUND ── corner nodes converging — focus and research */
const houndGrid: Grid = [
  [1, 0, 0, 0, 1],
  [0, 1, 0, 1, 0],
  [0, 0, 2, 0, 0],
  [0, 1, 0, 1, 0],
  [1, 0, 0, 0, 1],
];

export function HackerIllustration(props: IllustrationProps) {
  return <PixelIcon grid={hackerGrid} label="Hacker" {...props} />;
}

export function HustlerIllustration(props: IllustrationProps) {
  return <PixelIcon grid={hustlerGrid} label="Hustler" {...props} />;
}

export function HipsterIllustration(props: IllustrationProps) {
  return <PixelIcon grid={hipsterGrid} label="Hipster" {...props} />;
}

export function HoundIllustration(props: IllustrationProps) {
  return <PixelIcon grid={houndGrid} label="Hound" {...props} />;
}

/* ══════════════════════════════════════════
   Platform Ecosystem Icons
   ══════════════════════════════════════════ */

/* ── FORGE ── hammer — head on top, handle below */
const forgeGrid: Grid = [
  [1, 2, 2, 2, 1],
  [0, 0, 1, 0, 0],
  [0, 0, 2, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 2, 0, 0],
];

/* ── MENTOR ── megaphone — projecting right */
const mentorGrid: Grid = [
  [0, 0, 0, 0, 1],
  [0, 0, 1, 2, 1],
  [1, 1, 2, 2, 1],
  [0, 0, 1, 2, 1],
  [0, 0, 0, 0, 1],
];

/* ── PITCH ── target — concentric ring with bullseye */
const pitchGrid: Grid = [
  [0, 1, 1, 1, 0],
  [1, 0, 0, 0, 1],
  [1, 0, 2, 0, 1],
  [1, 0, 0, 0, 1],
  [0, 1, 1, 1, 0],
];

/* ── INSPACE ── rocket — pointing up with fins and exhaust */
const inSpaceGrid: Grid = [
  [0, 0, 2, 0, 0],
  [0, 1, 2, 1, 0],
  [0, 1, 1, 1, 0],
  [1, 0, 1, 0, 1],
  [0, 0, 2, 0, 0],
];

export function ForgeIllustration(props: IllustrationProps) {
  return <PixelIcon grid={forgeGrid} label="Forge" {...props} />;
}

export function MentorIllustration(props: IllustrationProps) {
  return <PixelIcon grid={mentorGrid} label="Mentor" {...props} />;
}

export function PitchIllustration(props: IllustrationProps) {
  return <PixelIcon grid={pitchGrid} label="Pitch" {...props} />;
}

export function InSpaceIllustration(props: IllustrationProps) {
  return <PixelIcon grid={inSpaceGrid} label="InSpace" {...props} />;
}
