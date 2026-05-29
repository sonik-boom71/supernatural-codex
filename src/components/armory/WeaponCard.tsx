import Link from 'next/link';
import type { Weapon } from '@/types';
import { weaponTypes } from '@/data/weapons';
import { routes } from '@/lib/routes';

export function WeaponCard({ weapon }: { weapon: Weapon }) {
  const type = weaponTypes.find((t) => t.id === weapon.type);

  return (
    <Link
      href={`${routes.armory}/${weapon.slug}`}
      className="card-paper group flex flex-col p-5"
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl" aria-hidden>
          {type?.icon}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wider text-ash">
          {type?.label}
        </span>
      </div>

      <h3 className="mt-3 font-title text-xl leading-tight text-bone transition-colors group-hover:text-impala">
        {weapon.nameRu}
      </h3>
      <p className="font-mono text-[11px] uppercase tracking-wider text-ash">
        {weapon.name}
      </p>

      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-parchment">
        {weapon.description}
      </p>

      <p className="mt-4 border-t border-impala/15 pt-3 text-xs text-impala/80">
        ⚡ {weapon.power}
      </p>
    </Link>
  );
}
