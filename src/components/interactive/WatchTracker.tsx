'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Check, RotateCcw } from 'lucide-react';
import { episodes } from '@/data/episodes';
import { seasons } from '@/data/seasons';
import { routes } from '@/lib/routes';
import { formatEpisodeCode, cn } from '@/lib/utils';

const STORAGE_KEY = 'hc-watched-episodes';

export function WatchTracker() {
  const [watched, setWatched] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setWatched(new Set(JSON.parse(raw)));
    } catch {
      /* ignore */
    }
  }, []);

  const persist = (set: Set<string>) => {
    setWatched(new Set(set));
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
  };

  const toggle = (id: string) => {
    const next = new Set(watched);
    next.has(id) ? next.delete(id) : next.add(id);
    persist(next);
  };

  const reset = () => persist(new Set());

  const total = episodes.length;
  const done = mounted ? watched.size : 0;
  const percent = total ? Math.round((done / total) * 100) : 0;

  return (
    <div>
      {/* Статистика */}
      <div className="card-paper mb-8 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="section-eyebrow">Прогресс просмотра</p>
            <p className="mt-2 font-brand text-5xl tracking-wider text-impala">
              {done}
              <span className="text-2xl text-ash"> / {total}</span>
            </p>
            <p className="mt-1 text-sm text-parchment">
              серий из архива отмечено просмотренными
            </p>
          </div>
          <div className="text-right">
            <div className="font-brand text-6xl text-bone">{percent}%</div>
            <button
              type="button"
              onClick={reset}
              className="mt-2 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-ash transition-colors hover:text-hell"
            >
              <RotateCcw className="h-3 w-3" /> Сбросить
            </button>
          </div>
        </div>
        <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-mortar">
          <div
            className="h-full bg-gradient-to-r from-blood via-flame to-impala transition-all duration-700"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* Список по сезонам */}
      <div className="space-y-8">
        {seasons.map((season) => {
          const eps = episodes
            .filter((e) => e.season === season.number)
            .sort((a, b) => a.number - b.number);
          if (eps.length === 0) return null;
          const seasonDone = eps.filter((e) => watched.has(e.id)).length;

          return (
            <section key={season.number}>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-title text-xl text-bone">
                  Сезон {season.number} · {season.title}
                </h2>
                <span className="font-mono text-xs text-ash">
                  {mounted ? seasonDone : 0}/{eps.length}
                </span>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {eps.map((e) => {
                  const isWatched = mounted && watched.has(e.id);
                  return (
                    <div
                      key={e.id}
                      className={cn(
                        'flex items-center gap-3 rounded-sm border px-3 py-2.5 transition-colors',
                        isWatched
                          ? 'border-impala/40 bg-impala/5'
                          : 'border-impala/15 bg-asphalt',
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => toggle(e.id)}
                        aria-label={isWatched ? 'Снять отметку' : 'Отметить просмотр'}
                        aria-pressed={isWatched}
                        className={cn(
                          'flex h-6 w-6 shrink-0 items-center justify-center rounded-sm border transition-colors',
                          isWatched
                            ? 'border-impala bg-impala text-void'
                            : 'border-ash/50 text-transparent hover:border-impala',
                        )}
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <span className="shrink-0 font-mono text-xs text-impala/80">
                        {formatEpisodeCode(e.season, e.number)}
                      </span>
                      <Link
                        href={routes.episode(e.id)}
                        className={cn(
                          'flex-1 truncate text-sm transition-colors hover:text-impala',
                          isWatched ? 'text-parchment line-through' : 'text-bone',
                        )}
                        title={e.titleRu}
                      >
                        {e.titleRu}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
