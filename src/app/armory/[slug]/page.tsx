import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Zap, User } from 'lucide-react';
import { weapons, getWeapon, weaponTypes } from '@/data/weapons';
import { episodes } from '@/data/episodes';
import { routes } from '@/lib/routes';
import { formatEpisodeCode } from '@/lib/utils';

export function generateStaticParams() {
  return weapons.map((w) => ({ slug: w.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const w = getWeapon(params.slug);
  if (!w) return { title: 'Оружие не найдено' };
  return { title: `${w.nameRu} (${w.name})`, description: w.description };
}

export default function WeaponPage({ params }: { params: { slug: string } }) {
  const weapon = getWeapon(params.slug);
  if (!weapon) notFound();

  const type = weaponTypes.find((t) => t.id === weapon.type);
  const firstEp = episodes.find((e) => e.id === weapon.firstSeen);

  return (
    <article className="container-page py-12">
      <Link
        href={routes.armory}
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ash transition-colors hover:text-impala"
      >
        <ArrowLeft className="h-4 w-4" /> В оружейную
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-[300px,1fr]">
        <div>
          <div className="card-paper flex aspect-square items-center justify-center bg-fog-radial">
            <span className="text-8xl opacity-60" aria-hidden>
              {type?.icon}
            </span>
          </div>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex items-center justify-between border-b border-impala/10 pb-2">
              <dt className="font-mono text-[11px] uppercase tracking-wider text-ash">
                Тип
              </dt>
              <dd className="text-bone">{type?.label}</dd>
            </div>
            <div className="border-b border-impala/10 pb-2">
              <dt className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-ash">
                <User className="h-3 w-3" /> Владелец
              </dt>
              <dd className="mt-1 text-bone">{weapon.owner}</dd>
            </div>
          </dl>
        </div>

        <div>
          <h1 className="font-display text-5xl uppercase tracking-wide text-bone">
            {weapon.nameRu}
          </h1>
          <p className="mt-1 font-mono text-sm uppercase tracking-widest text-ash">
            {weapon.name}
          </p>

          <div
            className="card-paper mt-6 flex items-start gap-3 p-5"
            style={{ borderColor: 'rgba(212,175,55,0.4)' }}
          >
            <Zap className="h-6 w-6 shrink-0 text-impala" />
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-impala/80">
                Сила / назначение
              </p>
              <p className="mt-1 text-lg text-bone">{weapon.power}</p>
            </div>
          </div>

          <section className="mt-8">
            <h2 className="font-title text-xl text-impala">Досье</h2>
            <p className="mt-3 leading-relaxed text-parchment">{weapon.description}</p>
          </section>

          {firstEp && (
            <section className="mt-6">
              <h2 className="font-title text-xl text-impala">Дебют</h2>
              <Link
                href={routes.episode(firstEp.id)}
                className="mt-3 inline-block rounded-sm border border-impala/20 px-3 py-1.5 font-mono text-xs text-parchment transition-colors hover:border-impala/50 hover:text-impala"
              >
                {formatEpisodeCode(firstEp.season, firstEp.number)} — {firstEp.titleRu}
              </Link>
            </section>
          )}
        </div>
      </div>
    </article>
  );
}
