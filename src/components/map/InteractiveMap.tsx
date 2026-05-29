'use client';

import { useState } from 'react';
import Link from 'next/link';
import { X, MapPin, Flame, Sparkles } from 'lucide-react';
import type { MapLocation, LocationKind } from '@/types';
import { routes } from '@/lib/routes';
import { getEpisode } from '@/data/episodes';
import { cn } from '@/lib/utils';

const kindStyle: Record<LocationKind, { ring: string; dot: string; label: string }> = {
  city: { ring: 'ring-impala/40', dot: 'bg-impala', label: 'Город' },
  bunker: { ring: 'ring-grace/50', dot: 'bg-grace', label: 'Бункер' },
  realm: { ring: 'ring-hell/60', dot: 'bg-hell', label: 'Иной мир' },
};

export function InteractiveMap({ locations }: { locations: MapLocation[] }) {
  const [selected, setSelected] = useState<MapLocation | null>(null);
  const [filter, setFilter] = useState<LocationKind | 'all'>('all');

  const visible =
    filter === 'all' ? locations : locations.filter((l) => l.kind === filter);

  const episode = selected?.episode ? getEpisode(selected.episode) : undefined;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr,340px]">
      <div>
        {/* Фильтр */}
        <div className="mb-4 flex flex-wrap gap-2">
          {(['all', 'city', 'bunker', 'realm'] as const).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setFilter(k)}
              className={cn(
                'rounded-sm border px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors',
                filter === k
                  ? 'border-impala bg-impala/15 text-impala'
                  : 'border-impala/20 text-parchment hover:border-impala/50',
              )}
            >
              {k === 'all' ? 'Все' : kindStyle[k].label}
            </button>
          ))}
        </div>

        {/* Карта */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-impala/20 bg-night">
          {/* Топографический фон */}
          <div className="absolute inset-0 opacity-[0.15] [background-image:linear-gradient(rgba(212,175,55,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.4)_1px,transparent_1px)] [background-size:40px_40px]" />
          <div className="absolute inset-0 bg-fog-radial" />
          <span className="absolute left-4 top-3 font-brand text-2xl tracking-[0.3em] text-impala/30">
            U.S.A.
          </span>
          <span className="absolute bottom-3 right-4 font-mono text-[10px] uppercase tracking-widest text-ash">
            Архив маршрутов Импалы
          </span>

          {/* Маркеры */}
          {visible.map((loc) => {
            const style = kindStyle[loc.kind];
            const active = selected?.slug === loc.slug;
            return (
              <button
                key={loc.slug}
                type="button"
                onClick={() => setSelected(loc)}
                style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                className="group absolute -translate-x-1/2 -translate-y-1/2"
                aria-label={loc.nameRu}
              >
                <span
                  className={cn(
                    'block h-3 w-3 rounded-full ring-4 transition-all duration-300 group-hover:scale-150',
                    style.dot,
                    style.ring,
                    active && 'scale-150',
                    loc.kind === 'realm' && 'animate-flicker',
                  )}
                />
                <span
                  className={cn(
                    'pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap rounded-sm bg-void/90 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-bone opacity-0 transition-opacity group-hover:opacity-100',
                    active && 'opacity-100',
                  )}
                >
                  {loc.nameRu}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Панель деталей */}
      <aside className="card-paper p-6">
        {selected ? (
          <div>
            <div className="flex items-start justify-between">
              <span className="tag-chip border-impala/40 text-impala">
                {kindStyle[selected.kind].label}
              </span>
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Закрыть"
                className="text-ash hover:text-impala"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <h3 className="mt-3 flex items-center gap-2 font-title text-2xl text-bone">
              {selected.kind === 'realm' ? (
                selected.slug === 'heaven' ? (
                  <Sparkles className="h-5 w-5 text-grace" />
                ) : (
                  <Flame className="h-5 w-5 text-hell" />
                )
              ) : (
                <MapPin className="h-5 w-5 text-impala" />
              )}
              {selected.nameRu}
            </h3>
            <p className="font-mono text-[11px] uppercase tracking-wider text-ash">
              {selected.name}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-parchment">
              {selected.description}
            </p>
            {episode && (
              <Link
                href={routes.episode(episode.id)}
                className="mt-5 inline-block font-mono text-[11px] uppercase tracking-widest text-impala hover:underline"
              >
                Серия: {episode.titleRu} →
              </Link>
            )}
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <MapPin className="h-10 w-10 text-impala/40" />
            <p className="mt-4 text-sm text-parchment">
              Выберите метку на карте, чтобы открыть досье локации.
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-ash">
              {locations.length} локаций · от Лоренса до Чистилища
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
