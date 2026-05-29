import Link from 'next/link';
import type { Monster } from '@/types';
import { monsterTypes } from '@/data/bestiary';
import { routes } from '@/lib/routes';
import { ThreatMeter } from '@/components/ui/ThreatMeter';

export function BestiaryCard({ monster }: { monster: Monster }) {
  const type = monsterTypes.find((t) => t.id === monster.type);

  return (
    <Link
      href={routes.monster(monster.slug)}
      className="card-paper group flex flex-col p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-3xl" aria-hidden>
            {type?.icon}
          </span>
          <h3 className="mt-2 font-title text-xl leading-tight text-bone transition-colors group-hover:text-impala">
            {monster.nameRu}
          </h3>
          <p className="font-mono text-[11px] uppercase tracking-wider text-ash">
            {monster.nameEn}
          </p>
        </div>
      </div>

      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-parchment">
        {monster.description}
      </p>

      <div className="mt-4 border-t border-impala/15 pt-3">
        <ThreatMeter level={monster.threatLevel} />
      </div>
    </Link>
  );
}
