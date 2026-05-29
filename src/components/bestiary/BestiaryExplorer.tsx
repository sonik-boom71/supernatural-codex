'use client';

import { useMemo, useState } from 'react';
import type { Monster, MonsterType } from '@/types';
import { monsterTypes } from '@/data/bestiary';
import { BestiaryCard } from '@/components/bestiary/BestiaryCard';
import { cn } from '@/lib/utils';

export function BestiaryExplorer({ monsters }: { monsters: Monster[] }) {
  const [type, setType] = useState<MonsterType | 'all'>('all');
  const [sortByThreat, setSortByThreat] = useState(false);

  const filtered = useMemo(() => {
    const list =
      type === 'all' ? monsters : monsters.filter((m) => m.type === type);
    return sortByThreat
      ? [...list].sort((a, b) => b.threatLevel - a.threatLevel)
      : list;
  }, [monsters, type, sortByThreat]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        <Pill active={type === 'all'} onClick={() => setType('all')}>
          Все ({monsters.length})
        </Pill>
        {monsterTypes.map((t) => {
          const count = monsters.filter((m) => m.type === t.id).length;
          if (count === 0) return null;
          return (
            <Pill key={t.id} active={type === t.id} onClick={() => setType(t.id)}>
              {t.icon} {t.label} ({count})
            </Pill>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => setSortByThreat((s) => !s)}
        className={cn(
          'mb-8 rounded-sm border px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors',
          sortByThreat
            ? 'border-flame bg-flame/10 text-flame'
            : 'border-impala/20 text-parchment hover:border-impala/50',
        )}
      >
        🔥 Сортировать по угрозе
      </button>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((m) => (
          <BestiaryCard key={m.slug} monster={m} />
        ))}
      </div>
    </div>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-sm border px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors',
        active
          ? 'border-impala bg-impala/15 text-impala'
          : 'border-impala/20 text-parchment hover:border-impala/50 hover:text-impala',
      )}
    >
      {children}
    </button>
  );
}
