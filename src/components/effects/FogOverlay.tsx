'use client';

/**
 * Слой тумана на основе SVG feTurbulence.
 * Два слоя с разной скоростью создают эффект клубящейся мглы.
 */
export function FogOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 opacity-[0.07] mix-blend-screen"
    >
      <svg className="h-full w-full">
        <defs>
          <filter id="fog-noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.008 0.012"
              numOctaves={3}
              seed={7}
            >
              <animate
                attributeName="baseFrequency"
                dur="40s"
                values="0.008 0.012;0.012 0.008;0.008 0.012"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.83
                      0 0 0 0 0.69
                      0 0 0 0 0.22
                      0 0 0 0.6 0"
            />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#fog-noise)" />
      </svg>
    </div>
  );
}
