'use client';

import { useMemo } from 'react';

/**
 * Лёгкие частицы пепла/угольков на CSS — без внешних зависимостей.
 * Уважает prefers-reduced-motion (анимации глушатся в globals.css).
 */
export function ParticlesAsh({ count = 28 }: { count?: number }) {
  const embers = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 6,
        duration: 5 + Math.random() * 5,
        size: 1 + Math.random() * 2.5,
        opacity: 0.3 + Math.random() * 0.5,
      })),
    [count],
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {embers.map((e) => (
        <span
          key={e.id}
          className="absolute bottom-0 rounded-full bg-flame animate-ember"
          style={{
            left: `${e.left}%`,
            width: `${e.size}px`,
            height: `${e.size}px`,
            opacity: e.opacity,
            animationDelay: `${e.delay}s`,
            animationDuration: `${e.duration}s`,
            boxShadow: '0 0 6px rgba(255, 107, 26, 0.8)',
          }}
        />
      ))}
    </div>
  );
}
