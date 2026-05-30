import Link from 'next/link';
import Image from 'next/image';
import type { Character } from '@/types';
import { factions } from '@/data/characters';
import { routes } from '@/lib/routes';
import { actorPhoto } from '@/lib/images';

export function CharacterCard({ character }: { character: Character }) {
  const faction = factions.find((f) => f.id === character.faction);
  const photo = actorPhoto(character.actorEn);
  const initials = character.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('');

  return (
    <Link
      href={routes.character(character.slug)}
      className="card-paper group relative flex flex-col overflow-hidden"
    >
      <div
        className="relative flex aspect-[3/4] items-center justify-center overflow-hidden"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${character.accent ?? '#d4af37'}22, #0d0d0d 70%)`,
        }}
      >
        {photo ? (
          <Image
            src={photo}
            alt={character.nameRu}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <span
            className="font-brand text-7xl tracking-widest opacity-30 transition-all duration-500 group-hover:scale-110 group-hover:opacity-50"
            style={{ color: character.accent ?? '#d4af37' }}
          >
            {initials}
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-transparent to-transparent" />
        <span
          className="absolute right-2 top-2 tag-chip border bg-void/60 backdrop-blur"
          style={{ color: faction?.color, borderColor: `${faction?.color}66` }}
        >
          {faction?.label}
        </span>
      </div>

      <div className="p-4">
        <h3 className="font-title text-lg leading-tight text-bone transition-colors group-hover:text-impala">
          {character.nameRu}
        </h3>
        <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-ash">
          {character.name}
        </p>
        <p className="mt-2 line-clamp-2 text-sm text-parchment">{character.role}</p>
      </div>
    </Link>
  );
}
