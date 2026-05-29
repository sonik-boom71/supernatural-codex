'use client';

import { useMemo, useState, useEffect } from 'react';
import { RefreshCw, Copy, Check } from 'lucide-react';
import type { Quote } from '@/types';
import { getCharacter } from '@/data/characters';
import { pickRandom, cn } from '@/lib/utils';

export function QuotesExplorer({ quotes }: { quotes: Quote[] }) {
  const [filterChar, setFilterChar] = useState<string | 'all'>('all');
  const [featured, setFeatured] = useState<Quote>(quotes[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setFeatured(pickRandom(quotes));
  }, [quotes]);

  // Уникальные персонажи, у которых есть цитаты
  const charOptions = useMemo(() => {
    const slugs = Array.from(new Set(quotes.map((q) => q.characterSlug)));
    return slugs
      .map((s) => getCharacter(s))
      .filter((c): c is NonNullable<typeof c> => Boolean(c));
  }, [quotes]);

  const filtered = useMemo(
    () =>
      filterChar === 'all'
        ? quotes
        : quotes.filter((q) => q.characterSlug === filterChar),
    [quotes, filterChar],
  );

  const shuffle = () => {
    const pool = filtered.length > 0 ? filtered : quotes;
    setFeatured(pickRandom(pool));
  };

  const copy = (q: Quote) => {
    const c = getCharacter(q.characterSlug);
    navigator.clipboard
      ?.writeText(`«${q.textRu}» — ${c?.nameRu ?? ''}`)
      .then(() => {
        setCopiedId(q.id);
        setTimeout(() => setCopiedId(null), 1500);
      })
      .catch(() => {});
  };

  const featuredChar = getCharacter(featured.characterSlug);

  return (
    <div>
      {/* Генератор */}
      <div className="card-paper relative overflow-hidden p-8 sm:p-12">
        <div className="absolute inset-0 bg-fog-radial" />
        <div className="relative text-center">
          <p className="section-eyebrow">Генератор случайной цитаты</p>
          <blockquote className="mx-auto mt-6 max-w-3xl">
            <p className="font-serif text-2xl italic leading-relaxed text-bone sm:text-3xl">
              «{mounted ? featured.textRu : featured.textRu}»
            </p>
            <footer className="mt-4 text-sm text-parchment">
              — {featuredChar?.nameRu ?? ''} · {featured.episode.toUpperCase()}
            </footer>
            <p className="mt-1 font-mono text-xs italic text-ash">«{featured.text}»</p>
          </blockquote>
          <div className="mt-8 flex items-center justify-center gap-3">
            <button type="button" onClick={shuffle} className="btn-ember text-sm">
              <RefreshCw className="h-4 w-4" /> Другая цитата
            </button>
            <button
              type="button"
              onClick={() => copy(featured)}
              className="rounded-sm border border-impala/40 px-4 py-3 font-mono text-xs uppercase tracking-widest text-impala transition-colors hover:bg-impala/10"
            >
              {copiedId === featured.id ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Фильтр по персонажу */}
      <div className="mt-10 mb-6 flex flex-wrap gap-2">
        <Pill active={filterChar === 'all'} onClick={() => setFilterChar('all')}>
          Все ({quotes.length})
        </Pill>
        {charOptions.map((c) => {
          const count = quotes.filter((q) => q.characterSlug === c.slug).length;
          return (
            <Pill
              key={c.slug}
              active={filterChar === c.slug}
              onClick={() => setFilterChar(c.slug)}
            >
              {c.nameRu} ({count})
            </Pill>
          );
        })}
      </div>

      {/* Сетка цитат */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((q) => {
          const c = getCharacter(q.characterSlug);
          return (
            <figure key={q.id} className="card-paper group flex flex-col p-5">
              <blockquote className="flex-1">
                <p className="font-serif text-lg italic leading-relaxed text-bone">
                  «{q.textRu}»
                </p>
              </blockquote>
              <figcaption className="mt-4 flex items-center justify-between border-t border-impala/15 pt-3">
                <span className="text-xs text-ash">
                  {c?.nameRu ?? ''} · {q.episode.toUpperCase()}
                </span>
                <button
                  type="button"
                  onClick={() => copy(q)}
                  aria-label="Скопировать"
                  className="text-ash transition-colors hover:text-impala"
                >
                  {copiedId === q.id ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </figcaption>
            </figure>
          );
        })}
      </div>
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
