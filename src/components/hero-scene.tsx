"use client";

export default function HeroScene() {
  return (
    <div className="relative mx-auto h-full w-full max-w-md">
      {/* Ambient glow */}
      <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 blur-[80px]" />

      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        <defs>
          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-lg" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Gradients */}
          <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ring1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#1F1A0B" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FBBF24" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="ring2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FCD34D" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#1F1A0B" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#FCD34D" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="orb-fill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF3C7" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FBBF24" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Center glow */}
        <circle cx="200" cy="200" r="80" fill="url(#core-glow)" />

        {/* Orbital ellipses */}
        <g style={{ transformOrigin: "200px 200px" }}>
          <ellipse
            cx="200" cy="200" rx="140" ry="55"
            stroke="url(#ring1)" strokeWidth="1.5" fill="none"
            transform="rotate(-15 200 200)"
            opacity="0.6"
          />
          <ellipse
            cx="200" cy="200" rx="130" ry="60"
            stroke="url(#ring2)" strokeWidth="1.5" fill="none"
            transform="rotate(25 200 200)"
            opacity="0.5"
          />
          <ellipse
            cx="200" cy="200" rx="120" ry="50"
            stroke="#FBBF24" strokeWidth="1" fill="none"
            transform="rotate(-45 200 200)"
            opacity="0.2"
          />
        </g>

        {/* Central core rings */}
        <g filter="url(#glow)">
          <circle cx="200" cy="200" r="32" stroke="#FBBF24" strokeWidth="2.5" fill="none" opacity="0.8">
            <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="20s" repeatCount="indefinite" />
          </circle>
          <circle cx="200" cy="200" r="24" stroke="#FCD34D" strokeWidth="2" fill="none" opacity="0.6">
            <animateTransform attributeName="transform" type="rotate" from="360 200 200" to="0 200 200" dur="15s" repeatCount="indefinite" />
          </circle>
          <circle cx="200" cy="200" r="16" fill="#FBBF24" opacity="0.5" />
          <circle cx="200" cy="200" r="8" fill="#FEF3C7" opacity="0.8" />
        </g>

        {/* Orbiting orb 1 — top-left */}
        <g filter="url(#glow)">
          <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="24s" repeatCount="indefinite" />
          <circle cx="70" cy="175" r="28" fill="url(#orb-fill)" stroke="#FBBF24" strokeWidth="1.5" strokeOpacity="0.4" />
          <circle cx="70" cy="175" r="18" fill="#FBBF24" opacity="0.1" />
        </g>

        {/* Orbiting orb 2 — top-right */}
        <g filter="url(#glow)">
          <animateTransform attributeName="transform" type="rotate" from="90 200 200" to="450 200 200" dur="28s" repeatCount="indefinite" />
          <circle cx="330" cy="165" r="24" fill="url(#orb-fill)" stroke="#FCD34D" strokeWidth="1.5" strokeOpacity="0.4" />
          <circle cx="330" cy="165" r="15" fill="#FCD34D" opacity="0.1" />
        </g>

        {/* Orbiting orb 3 — bottom-left */}
        <g filter="url(#glow)">
          <animateTransform attributeName="transform" type="rotate" from="180 200 200" to="540 200 200" dur="22s" repeatCount="indefinite" />
          <circle cx="95" cy="280" r="22" fill="url(#orb-fill)" stroke="#FBBF24" strokeWidth="1.5" strokeOpacity="0.4" />
          <circle cx="95" cy="280" r="14" fill="#FBBF24" opacity="0.1" />
        </g>

        {/* Orbiting orb 4 — bottom-right */}
        <g filter="url(#glow)">
          <animateTransform attributeName="transform" type="rotate" from="270 200 200" to="630 200 200" dur="26s" repeatCount="indefinite" />
          <circle cx="310" cy="260" r="26" fill="url(#orb-fill)" stroke="#FDE68A" strokeWidth="1.5" strokeOpacity="0.4" />
          <circle cx="310" cy="260" r="16" fill="#FDE68A" opacity="0.1" />
        </g>

        {/* Scattered dots / particles */}
        <g opacity="0.4">
          <circle cx="140" cy="120" r="2" fill="#FBBF24">
            <animate attributeName="opacity" values="0.2;0.8;0.2" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="280" cy="100" r="1.5" fill="#FCD34D">
            <animate attributeName="opacity" values="0.3;0.9;0.3" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="300" cy="320" r="2" fill="#FBBF24">
            <animate attributeName="opacity" values="0.2;0.7;0.2" dur="3.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="110" cy="330" r="1.5" fill="#FDE68A">
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="200" cy="80" r="1.5" fill="#FEF3C7">
            <animate attributeName="opacity" values="0.2;0.6;0.2" dur="5s" repeatCount="indefinite" />
          </circle>
          <circle cx="350" cy="200" r="2" fill="#FBBF24">
            <animate attributeName="opacity" values="0.1;0.7;0.1" dur="4.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="55" cy="220" r="1.5" fill="#FCD34D">
            <animate attributeName="opacity" values="0.2;0.8;0.2" dur="3.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="240" cy="350" r="2" fill="#FEF3C7">
            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="4s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
    </div>
  );
}
