import { Flame } from 'lucide-react';
import { cn } from '@/lib/utils';
import { threatLabels } from '@/lib/badges';

export function ThreatMeter({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5" aria-hidden>
        {[1, 2, 3, 4, 5].map((i) => (
          <Flame
            key={i}
            className={cn(
              'h-4 w-4',
              i <= level
                ? 'fill-flame text-flame drop-shadow-[0_0_4px_rgba(255,107,26,0.6)]'
                : 'text-ash/40',
            )}
          />
        ))}
      </div>
      <span className="font-mono text-[10px] uppercase tracking-wider text-ash">
        {threatLabels[level]}
      </span>
    </div>
  );
}
