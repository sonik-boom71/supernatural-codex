'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { mainNav, routes } from '@/lib/routes';
import { quotes } from '@/data/quotes';
import { getCharacter } from '@/data/characters';
import { Pentagram } from '@/components/icons/Pentagram';
import { pickRandom } from '@/lib/utils';

export function Footer() {
  const [quote, setQuote] = useState(quotes[1]);
  const [chevyClicks, setChevyClicks] = useState(0);

  useEffect(() => {
    setQuote(pickRandom(quotes));
  }, []);

  const character = getCharacter(quote.characterSlug);

  const handleChevyClick = () => {
    const next = chevyClicks + 1;
    setChevyClicks(next);
    if (next >= 7) {
      setChevyClicks(0);
      window.dispatchEvent(new CustomEvent('hc:carry-on'));
    }
  };

  return (
    <footer className="relative mt-24 border-t border-impala/20 bg-night">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2">
            <Pentagram className="h-7 w-7 text-impala" />
            <span className="font-brand text-xl uppercase tracking-[0.2em] text-bone">
              Hunter&apos;s Codex
            </span>
          </div>
          <p className="mt-4 font-serif text-sm italic text-parchment">
            «Non timebo mala» — не убоюсь зла.
          </p>
          <p className="mt-2 text-xs leading-relaxed text-ash">
            Архив Хранителей Знания. Фанатский некоммерческий проект по сериалу
            «Сверхъестественное».
          </p>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-[0.3em] text-impala/80">
            Разделы
          </h4>
          <ul className="mt-4 space-y-2">
            {mainNav.slice(0, 5).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-spark text-sm">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-[0.3em] text-impala/80">
            Ещё
          </h4>
          <ul className="mt-4 space-y-2">
            {mainNav.slice(5).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-spark text-sm">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={routes.easterEggs} className="link-spark text-sm">
                Пасхалки
              </Link>
            </li>
            <li>
              <Link href={routes.about} className="link-spark text-sm">
                О проекте
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-[0.3em] text-impala/80">
            Цитата дня
          </h4>
          <blockquote className="mt-4 border-l-2 border-impala/40 pl-4">
            <p className="font-serif text-sm italic leading-relaxed text-bone">
              «{quote.textRu}»
            </p>
            <footer className="mt-2 text-xs text-ash">
              — {character?.nameRu ?? 'Неизвестно'}
            </footer>
          </blockquote>
        </div>
      </div>

      <div className="border-t border-impala/10 py-5">
        <div className="container-page flex flex-col items-center justify-between gap-2 text-xs text-ash sm:flex-row">
          <p>
            © {new Date().getFullYear()} Hunter&apos;s Codex · KAZ{' '}
            <button
              type="button"
              onClick={handleChevyClick}
              className="font-mono text-impala/70 transition-colors hover:text-impala"
              aria-label="Шевроле Импала, 1967"
              title="'67"
            >
              67
            </button>{' '}
            Impala
          </p>
          <p>Сделано с ❤ и святой водой.</p>
        </div>
      </div>
    </footer>
  );
}
