'use client';

import { useCallback, useEffect, useState } from 'react';
import { RefreshCw, Copy, X, Check } from 'lucide-react';
import { quotes } from '@/data/quotes';
import { getCharacter } from '@/data/characters';
import { Pentagram } from '@/components/icons/Pentagram';
import { pickRandom } from '@/lib/utils';

export function RandomQuoteWidget() {
  const [quote, setQuote] = useState(quotes[0]);
  const [open, setOpen] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
    setQuote(pickRandom(quotes));
    const stored = window.localStorage.getItem('hc-quote-widget');
    if (stored === 'closed') setOpen(false);
  }, []);

  const shuffle = useCallback(() => setQuote(pickRandom(quotes)), []);

  const setOpenPersist = (value: boolean) => {
    setOpen(value);
    window.localStorage.setItem('hc-quote-widget', value ? 'open' : 'closed');
  };

  const copy = () => {
    const character = getCharacter(quote.characterSlug);
    navigator.clipboard
      ?.writeText(`«${quote.textRu}» — ${character?.nameRu ?? ''}`)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      })
      .catch(() => {});
  };

  if (!mounted) return null;

  const character = getCharacter(quote.characterSlug);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpenPersist(true)}
        aria-label="Показать цитату"
        className="fixed bottom-5 right-5 z-40 rounded-full border border-impala/40 bg-void/90 p-3 text-impala shadow-glow backdrop-blur transition-transform hover:scale-110"
      >
        <Pentagram className="h-6 w-6 animate-spin-slow" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 w-[320px] max-w-[calc(100vw-2.5rem)] card-paper p-4 shadow-glow-lg">
      <div className="mb-2 flex items-center justify-between">
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-impala/80">
          <Pentagram className="h-3 w-3" /> Цитата
        </span>
        <button
          type="button"
          onClick={() => setOpenPersist(false)}
          aria-label="Свернуть"
          className="text-ash transition-colors hover:text-impala"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <blockquote className="font-serif text-sm italic leading-relaxed text-bone">
        «{quote.textRu}»
      </blockquote>
      <p className="mt-2 text-xs text-ash">
        — {character?.nameRu ?? 'Неизвестно'}, {quote.episode.toUpperCase()}
      </p>

      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={shuffle}
          className="flex items-center gap-1.5 rounded-sm border border-impala/30 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-impala transition-colors hover:bg-impala/10"
        >
          <RefreshCw className="h-3 w-3" /> Другая
        </button>
        <button
          type="button"
          onClick={copy}
          className="flex items-center gap-1.5 rounded-sm border border-impala/30 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-impala transition-colors hover:bg-impala/10"
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          {copied ? 'Готово' : 'Копировать'}
        </button>
      </div>
    </div>
  );
}
