'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import type { Episode, EpisodeTag } from '@/types';
import { seasons } from '@/data/seasons';
import { EpisodeCard } from '@/components/episodes/EpisodeCard';
import { episodeTagMeta } from '@/lib/badges';
import { cn } from '@/lib/utils';

const filterTags: EpisodeTag[] = ['death', 'return', 'crossover', 'finale', 'fan-favorite'];

export function EpisodesExplorer({ episodes }: { episodes: Episode[] }) {
  const [season, setSeason] = useState<number | 'all'>('all');
  const [tag, setTag] = useState<EpisodeTag | 'all'>('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return episodes
      .filter((e) => (season === 'all' ? true : e.season === season))
      .filter((e) => (tag === 'all' ? true : e.tags.includes(tag)))
      .filter((e) => {
        if (!query.trim()) return true;
        const q = query.toLowerCase();
        return (
          e.title.toLowerCase().includes(q) ||
          e.titleRu.toLowerCase().includes(q) ||
          e.summary.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => a.season - b.season || a.number - b.number);
  }, [episodes, season, tag, query]);

  return (
    <div>
      {/* Поиск */}
      <div className="relative mb-6 max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ash" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск по названию или сюжету…"
          className="w-full rounded-sm border border-impala/20 bg-asphalt py-2.5 pl-10 pr-4 text-sm text-bone placeholder:text-ash focus:border-impala/50 focus:outline-none"
        />
      </div>

      {/* Фильтр по тегам */}
      <div className="mb-4 flex flex-wrap gap-2">
        <FilterPill active={tag === 'all'} onClick={() => setTag('all')}>
          Все события
        </FilterPill>
        {filterTags.map((t) => (
          <FilterPill key={t} active={tag === t} onClick={() => setTag(t)}>
            {episodeTagMeta[t].label}
          </FilterPill>
        ))}
      </div>

      {/* Фильтр по сезонам */}
      <div className="mb-8 flex flex-wrap gap-2">
        <FilterPill active={season === 'all'} onClick={() => setSeason('all')}>
          Все сезоны
        </FilterPill>
        {seasons.map((s) => (
          <FilterPill
            key={s.number}
            active={season === s.number}
            onClick={() => setSeason(s.number)}
          >
            S{String(s.number).padStart(2, '0')}
          </FilterPill>
        ))}
      </div>

      <p className="mb-4 font-mono text-xs uppercase tracking-widest text-ash">
        Найдено серий: {filtered.length}
      </p>

      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((ep) => (
            <EpisodeCard key={ep.id} episode={ep} />
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-parchment">
          Ничего не найдено. Попробуйте изменить фильтры.
        </p>
      )}
    </div>
  );
}

function FilterPill({
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
