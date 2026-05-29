import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Quote as QuoteIcon } from 'lucide-react';
import { characters, getCharacter, factions } from '@/data/characters';
import { episodes } from '@/data/episodes';
import { routes } from '@/lib/routes';
import { formatEpisodeCode } from '@/lib/utils';

export function generateStaticParams() {
  return characters.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = getCharacter(params.slug);
  if (!c) return { title: 'Персонаж не найден' };
  return { title: c.nameRu, description: c.description };
}

export default function CharacterPage({ params }: { params: { slug: string } }) {
  const character = getCharacter(params.slug);
  if (!character) notFound();

  const faction = factions.find((f) => f.id === character.faction);
  const accent = character.accent ?? '#d4af37';
  const appearances = episodes
    .filter((e) => e.characters.includes(character.slug))
    .sort((a, b) => a.season - b.season || a.number - b.number);
  const initials = character.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('');

  return (
    <article className="container-page py-12">
      <Link
        href={routes.characters}
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ash transition-colors hover:text-impala"
      >
        <ArrowLeft className="h-4 w-4" /> Ко всем персонажам
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-[320px,1fr]">
        {/* Портрет */}
        <div>
          <div
            className="card-paper flex aspect-[3/4] items-center justify-center overflow-hidden"
            style={{
              background: `radial-gradient(circle at 50% 30%, ${accent}33, #0d0d0d 70%)`,
            }}
          >
            <span
              className="font-brand text-8xl tracking-widest opacity-40"
              style={{ color: accent }}
            >
              {initials}
            </span>
          </div>
          <dl className="mt-5 space-y-3 text-sm">
            <Row label="Лагерь" value={faction?.label ?? ''} accent={faction?.color} />
            <Row label="Актёр" value={character.actor} />
            <Row label="Первое появление" value={character.firstSeen.toUpperCase()} />
            {character.lastSeen && (
              <Row label="Уход / финал" value={character.lastSeen.toUpperCase()} />
            )}
          </dl>
        </div>

        {/* Содержание */}
        <div>
          <span
            className="tag-chip border"
            style={{ color: faction?.color, borderColor: `${faction?.color}66` }}
          >
            {faction?.label}
          </span>
          <h1 className="mt-3 font-display text-5xl uppercase tracking-wide text-bone">
            {character.nameRu}
          </h1>
          <p className="mt-1 font-mono text-sm uppercase tracking-widest text-ash">
            {character.name} · {character.role}
          </p>

          {character.quote && (
            <blockquote
              className="card-paper mt-6 flex gap-4 p-5"
              style={{ borderColor: `${accent}40` }}
            >
              <QuoteIcon className="h-6 w-6 shrink-0" style={{ color: accent }} />
              <p className="font-serif text-lg italic text-bone">{character.quote}</p>
            </blockquote>
          )}

          <section className="mt-8">
            <h2 className="font-title text-xl text-impala">Биография</h2>
            <p className="mt-3 leading-relaxed text-parchment">{character.description}</p>
          </section>

          <section className="mt-6">
            <h2 className="font-title text-xl text-impala">Судьба в сериале</h2>
            <p className="mt-3 leading-relaxed text-parchment">{character.fate}</p>
          </section>

          {appearances.length > 0 && (
            <section className="mt-8">
              <h2 className="font-title text-xl text-impala">
                Появления в архиве ({appearances.length})
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {appearances.map((e) => (
                  <Link
                    key={e.id}
                    href={routes.episode(e.id)}
                    className="rounded-sm border border-impala/20 px-3 py-1.5 font-mono text-xs text-parchment transition-colors hover:border-impala/50 hover:text-impala"
                    title={e.titleRu}
                  >
                    {formatEpisodeCode(e.season, e.number)}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </article>
  );
}

function Row({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-impala/10 pb-2">
      <dt className="font-mono text-[11px] uppercase tracking-wider text-ash">{label}</dt>
      <dd className="text-right text-bone" style={accent ? { color: accent } : undefined}>
        {value}
      </dd>
    </div>
  );
}
