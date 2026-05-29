'use client';

import { useMemo, useState } from 'react';
import type { Character, Faction } from '@/types';
import { factions } from '@/data/characters';
import { CharacterCard } from '@/components/characters/CharacterCard';
import { cn } from '@/lib/utils';

export function CharactersExplorer({ characters }: { characters: Character[] }) {
  const [faction, setFaction] = useState<Faction | 'all'>('all');

  const filtered = useMemo(
    () =>
      faction === 'all'
        ? characters
        : characters.filter((c) => c.faction === faction),
    [characters, faction],
  );

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setFaction('all')}
          className={cn(
            'rounded-sm border px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors',
            faction === 'all'
              ? 'border-impala bg-impala/15 text-impala'
              : 'border-impala/20 text-parchment hover:border-impala/50',
          )}
        >
          Все ({characters.length})
        </button>
        {factions.map((f) => {
          const count = characters.filter((c) => c.faction === f.id).length;
          if (count === 0) return null;
          const active = faction === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setFaction(f.id)}
              className={cn(
                'rounded-sm border px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors',
                !active && 'border-impala/20 text-parchment hover:border-impala/50',
              )}
              style={
                active
                  ? { borderColor: f.color, color: f.color, background: `${f.color}1a` }
                  : undefined
              }
            >
              {f.label} ({count})
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((c) => (
          <CharacterCard key={c.slug} character={c} />
        ))}
      </div>
    </div>
  );
}
