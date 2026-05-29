import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Star, ArrowLeft, Calendar } from 'lucide-react';
import { episodes, getEpisode } from '@/data/episodes';
import { getCharacter } from '@/data/characters';
import { getMonster } from '@/data/bestiary';
import { getLocation } from '@/data/locations';
import { getSeason } from '@/data/seasons';
import { routes } from '@/lib/routes';
import { formatEpisodeCode, formatDate, cn } from '@/lib/utils';
import { episodeTagMeta } from '@/lib/badges';

export function generateStaticParams() {
  return episodes.map((e) => ({ id: e.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const ep = getEpisode(params.id);
  if (!ep) return { title: 'Серия не найдена' };
  return {
    title: `${ep.titleRu} (${formatEpisodeCode(ep.season, ep.number)})`,
    description: ep.summary,
  };
}

export default function EpisodePage({ params }: { params: { id: string } }) {
  const ep = getEpisode(params.id);
  if (!ep) notFound();

  const season = getSeason(ep.season);
  const monsters = ep.monsters.map(getMonster).filter(Boolean);
  const chars = ep.characters.map(getCharacter).filter(Boolean);
  const location = ep.locationSlug ? getLocation(ep.locationSlug) : undefined;

  return (
    <article className="container-page py-12">
      <Link
        href={routes.episodes}
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ash transition-colors hover:text-impala"
      >
        <ArrowLeft className="h-4 w-4" /> К списку серий
      </Link>

      <header className="mt-8 max-w-3xl">
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-brand text-3xl tracking-widest text-impala">
            {formatEpisodeCode(ep.season, ep.number)}
          </span>
          <span className="flex items-center gap-1.5 font-mono text-sm text-parchment">
            <Star className="h-4 w-4 fill-impala text-impala" /> {ep.rating.toFixed(1)}
          </span>
          <span className="flex items-center gap-1.5 font-mono text-sm text-ash">
            <Calendar className="h-4 w-4" /> {formatDate(ep.airDate)}
          </span>
        </div>

        <h1 className="mt-4 font-display text-4xl uppercase tracking-wide text-bone sm:text-5xl">
          {ep.titleRu}
        </h1>
        <p className="mt-1 font-mono text-sm uppercase tracking-widest text-ash">
          {ep.title}
        </p>

        {ep.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {ep.tags.map((t) => (
              <span key={t} className={cn('tag-chip', episodeTagMeta[t].className)}>
                {episodeTagMeta[t].label}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="mt-8 grid gap-10 lg:grid-cols-[2fr,1fr]">
        <div>
          <h2 className="font-title text-xl text-impala">Описание</h2>
          <p className="mt-3 text-lg leading-relaxed text-parchment">{ep.summary}</p>

          {season && (
            <div className="card-paper mt-8 p-6">
              <p className="section-eyebrow">Сезон {season.number} · {season.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-parchment">
                {season.synopsis}
              </p>
              <p className="mt-3 font-mono text-xs uppercase tracking-wider text-impala/80">
                Главный антагонист: {season.bigBad}
              </p>
            </div>
          )}
        </div>

        <aside className="space-y-6">
          {chars.length > 0 && (
            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-impala/80">
                Персонажи
              </h3>
              <ul className="mt-3 space-y-1.5">
                {chars.map((c) => (
                  <li key={c!.slug}>
                    <Link href={routes.character(c!.slug)} className="link-spark text-sm">
                      {c!.nameRu}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {monsters.length > 0 && (
            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-impala/80">
                Монстры
              </h3>
              <ul className="mt-3 space-y-1.5">
                {monsters.map((m) => (
                  <li key={m!.slug}>
                    <Link href={routes.monster(m!.slug)} className="link-spark text-sm">
                      {m!.nameRu}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {location && (
            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-impala/80">
                Локация
              </h3>
              <p className="mt-3 text-sm text-bone">{location.nameRu}</p>
              <Link href={routes.map} className="link-spark text-xs">
                Показать на карте →
              </Link>
            </div>
          )}
        </aside>
      </div>
    </article>
  );
}
