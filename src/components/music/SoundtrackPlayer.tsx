'use client';

import { useMemo, useState } from 'react';
import { Play, ExternalLink, Music2 } from 'lucide-react';
import type { SoundtrackEntry } from '@/types';
import { cn } from '@/lib/utils';

export function SoundtrackPlayer({ tracks }: { tracks: SoundtrackEntry[] }) {
  const [season, setSeason] = useState<number | 'all'>('all');
  const [current, setCurrent] = useState<SoundtrackEntry | null>(null);

  const seasonsAvailable = useMemo(() => {
    const set = new Set<number>();
    tracks.forEach((t) => t.seasons.forEach((s) => set.add(s)));
    return Array.from(set).sort((a, b) => a - b);
  }, [tracks]);

  const filtered =
    season === 'all' ? tracks : tracks.filter((t) => t.seasons.includes(season));

  return (
    <div>
      {/* Плеер «сейчас играет» */}
      <div className="card-paper mb-8 overflow-hidden">
        {current?.youtubeId ? (
          <div className="aspect-video w-full">
            <iframe
              key={current.id}
              src={`https://www.youtube.com/embed/${current.youtubeId}`}
              title={current.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        ) : (
          <div className="flex aspect-video w-full flex-col items-center justify-center bg-fog-radial p-8 text-center">
            <Equalizer playing={Boolean(current)} />
            <p className="mt-5 font-title text-2xl text-bone">
              {current ? current.title : 'Магнитола Импалы'}
            </p>
            <p className="mt-1 text-sm text-parchment">
              {current
                ? `${current.artist}${current.year ? ` · ${current.year}` : ''}`
                : 'Выберите трек из плейлиста ниже'}
            </p>
            {current?.spotifyUrl && (
              <a
                href={current.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-impala hover:underline"
              >
                <ExternalLink className="h-3.5 w-3.5" /> Открыть в Spotify
              </a>
            )}
          </div>
        )}
      </div>

      {/* Фильтр по сезонам */}
      <div className="mb-6 flex flex-wrap gap-2">
        <Pill active={season === 'all'} onClick={() => setSeason('all')}>
          Весь плейлист
        </Pill>
        {seasonsAvailable.map((s) => (
          <Pill key={s} active={season === s} onClick={() => setSeason(s)}>
            S{String(s).padStart(2, '0')}
          </Pill>
        ))}
      </div>

      {/* Список треков */}
      <ul className="divide-y divide-impala/10 overflow-hidden rounded-sm border border-impala/15">
        {filtered.map((track, i) => {
          const active = current?.id === track.id;
          return (
            <li key={track.id}>
              <button
                type="button"
                onClick={() => setCurrent(track)}
                className={cn(
                  'flex w-full items-center gap-4 px-4 py-3 text-left transition-colors hover:bg-mortar',
                  active && 'bg-mortar',
                )}
              >
                <span className="w-6 shrink-0 text-center font-mono text-xs text-ash">
                  {active ? (
                    <Music2 className="mx-auto h-4 w-4 animate-flicker text-impala" />
                  ) : (
                    String(i + 1).padStart(2, '0')
                  )}
                </span>
                <span className="flex-1">
                  <span
                    className={cn(
                      'block font-title text-base',
                      active ? 'text-impala' : 'text-bone',
                    )}
                  >
                    {track.title}
                  </span>
                  <span className="block text-xs text-ash">
                    {track.artist}
                    {track.year ? ` · ${track.year}` : ''} · {track.note}
                  </span>
                </span>
                <span className="hidden shrink-0 gap-1 sm:flex">
                  {track.seasons.slice(0, 4).map((s) => (
                    <span
                      key={s}
                      className="rounded-sm border border-impala/20 px-1.5 py-0.5 font-mono text-[9px] text-ash"
                    >
                      S{String(s).padStart(2, '0')}
                    </span>
                  ))}
                </span>
                <Play className="h-4 w-4 shrink-0 text-impala" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Equalizer({ playing }: { playing: boolean }) {
  return (
    <div className="flex h-12 items-end gap-1" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className={cn('w-2 rounded-sm bg-impala', playing && 'animate-flicker')}
          style={{
            height: playing ? `${30 + ((i * 17) % 70)}%` : '20%',
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-sm border px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors',
        active
          ? 'border-impala bg-impala/15 text-impala'
          : 'border-impala/20 text-parchment hover:border-impala/50 hover:text-impala',
      )}
    >
      {children}
    </button>
  );
}
