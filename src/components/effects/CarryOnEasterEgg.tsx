'use client';

import { useEffect, useState } from 'react';
import { Music, X } from 'lucide-react';

/**
 * Слушает событие 'hc:carry-on' (7 кликов по логотипу или по «67» в подвале)
 * и показывает баннер с гимном сериала.
 */
export function CarryOnEasterEgg() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handler = () => {
      setActive(true);
      setTimeout(() => setActive(false), 12000);
    };
    window.addEventListener('hc:carry-on', handler);
    return () => window.removeEventListener('hc:carry-on', handler);
  }, []);

  if (!active) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] animate-fade-up">
      <div className="container-page pb-6">
        <div className="mx-auto flex max-w-2xl items-center gap-4 rounded-sm border border-impala/40 bg-void/95 p-4 shadow-glow-lg backdrop-blur">
          <Music className="h-8 w-8 shrink-0 animate-flicker text-impala" />
          <div className="flex-1">
            <p className="font-display text-lg uppercase tracking-wider text-bone">
              Carry on, my wayward son
            </p>
            <p className="font-serif text-sm italic text-parchment">
              There&apos;ll be peace when you are done…
            </p>
            <a
              href="https://www.youtube.com/watch?v=2X_2IdybTV0"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block font-mono text-[11px] uppercase tracking-widest text-impala underline-offset-4 hover:underline"
            >
              ▶ Включить гимн — Kansas
            </a>
          </div>
          <button
            type="button"
            onClick={() => setActive(false)}
            aria-label="Закрыть"
            className="text-ash transition-colors hover:text-impala"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
