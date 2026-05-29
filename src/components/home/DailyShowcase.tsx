'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { monsters } from '@/data/bestiary';
import { quotes } from '@/data/quotes';
import { getCharacter } from '@/data/characters';
import { routes } from '@/lib/routes';
import { ThreatMeter } from '@/components/ui/ThreatMeter';
import { pickRandom } from '@/lib/utils';

export function DailyShowcase() {
  const [monster, setMonster] = useState(monsters[0]);
  const [quote, setQuote] = useState(quotes[0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setMonster(pickRandom(monsters));
    setQuote(pickRandom(quotes));
  }, []);

  const character = getCharacter(quote.characterSlug);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Монстр дня */}
      <div className="card-paper flex flex-col p-6">
        <div className="flex items-center justify-between">
          <span className="section-eyebrow">Монстр дня</span>
          <button
            type="button"
            onClick={() => setMonster(pickRandom(monsters))}
            aria-label="Другой монстр"
            className="text-impala/70 transition-colors hover:text-impala"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
        <h3 className="mt-3 font-title text-2xl text-bone">
          {mounted ? monster.nameRu : '—'}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm text-parchment">
          {mounted ? monster.description : 'Загрузка досье…'}
        </p>
        <div className="mt-4">
          {mounted && <ThreatMeter level={monster.threatLevel} />}
        </div>
        <Link
          href={mounted ? routes.monster(monster.slug) : routes.bestiary}
          className="mt-4 font-mono text-[11px] uppercase tracking-widest text-impala hover:underline"
        >
          Открыть досье →
        </Link>
      </div>

      {/* Цитата дня */}
      <div className="card-paper flex flex-col justify-center p-6">
        <span className="section-eyebrow">Цитата дня</span>
        <blockquote className="mt-4 border-l-2 border-impala/40 pl-5">
          <p className="font-serif text-xl italic leading-relaxed text-bone">
            «{mounted ? quote.textRu : '…'}»
          </p>
          <footer className="mt-3 text-sm text-ash">
            — {character?.nameRu ?? ''}, {quote.episode.toUpperCase()}
          </footer>
        </blockquote>
        <Link
          href={routes.quotes}
          className="mt-5 font-mono text-[11px] uppercase tracking-widest text-impala hover:underline"
        >
          Все цитаты →
        </Link>
      </div>
    </div>
  );
}
