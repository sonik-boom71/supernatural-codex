import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ShieldAlert, Swords, MapPin } from 'lucide-react';
import { monsters, getMonster, monsterTypes } from '@/data/bestiary';
import { episodes } from '@/data/episodes';
import { routes } from '@/lib/routes';
import { formatEpisodeCode } from '@/lib/utils';
import { ThreatMeter } from '@/components/ui/ThreatMeter';

export function generateStaticParams() {
  return monsters.map((m) => ({ slug: m.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const m = getMonster(params.slug);
  if (!m) return { title: 'Существо не найдено' };
  return { title: `${m.nameRu} (${m.nameEn})`, description: m.description };
}

export default function MonsterPage({ params }: { params: { slug: string } }) {
  const monster = getMonster(params.slug);
  if (!monster) notFound();

  const type = monsterTypes.find((t) => t.id === monster.type);
  const appearances = episodes
    .filter((e) => e.monsters.includes(monster.slug))
    .sort((a, b) => a.season - b.season || a.number - b.number);

  return (
    <article className="container-page py-12">
      <Link
        href={routes.bestiary}
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ash transition-colors hover:text-impala"
      >
        <ArrowLeft className="h-4 w-4" /> К бестиарию
      </Link>

      <header className="mt-8 max-w-3xl">
        <div className="flex items-center gap-4">
          <span className="text-5xl" aria-hidden>
            {type?.icon}
          </span>
          <div>
            <h1 className="font-display text-4xl uppercase tracking-wide text-bone sm:text-5xl">
              {monster.nameRu}
            </h1>
            <p className="font-mono text-sm uppercase tracking-widest text-ash">
              {monster.nameEn} · {type?.label}
            </p>
          </div>
        </div>
        <div className="mt-5">
          <ThreatMeter level={monster.threatLevel} />
        </div>
      </header>

      <div className="mt-8 grid max-w-4xl gap-6">
        <section className="card-paper p-6">
          <h2 className="font-title text-xl text-impala">Описание</h2>
          <p className="mt-3 leading-relaxed text-parchment">{monster.description}</p>
        </section>

        <div className="grid gap-6 sm:grid-cols-2">
          <section className="card-paper p-6">
            <h2 className="flex items-center gap-2 font-title text-lg text-grace">
              <ShieldAlert className="h-5 w-5" /> Слабое место
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-parchment">
              {monster.weakness}
            </p>
          </section>
          <section className="card-paper p-6" style={{ borderColor: 'rgba(139,0,0,0.4)' }}>
            <h2 className="flex items-center gap-2 font-title text-lg text-hell">
              <Swords className="h-5 w-5" /> Способ убийства
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-parchment">
              {monster.killMethod}
            </p>
          </section>
        </div>

        <section className="card-paper p-6">
          <h2 className="flex items-center gap-2 font-title text-lg text-impala">
            <MapPin className="h-5 w-5" /> Где встречается
          </h2>
          {appearances.length > 0 ? (
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
          ) : (
            <p className="mt-3 text-sm text-ash">
              Впервые появляется в {monster.firstSeen.toUpperCase()}.
            </p>
          )}
        </section>
      </div>
    </article>
  );
}
