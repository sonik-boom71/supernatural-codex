'use client';

import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PollOption {
  id: string;
  label: string;
  base: number; // стартовые «голоса» для наглядности
}

const POLL = {
  id: 'best-villain-2026-22',
  question: 'Лучший антагонист сериала?',
  options: [
    { id: 'lucifer', label: 'Люцифер', base: 412 },
    { id: 'crowley', label: 'Кроули', base: 587 },
    { id: 'azazel', label: 'Азазель', base: 233 },
    { id: 'amara', label: 'Амара (Тьма)', base: 198 },
    { id: 'chuck', label: 'Чак / Бог', base: 321 },
  ] satisfies PollOption[],
};

export function WeeklyPoll() {
  const [voted, setVoted] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setVoted(window.localStorage.getItem(`hc-poll-${POLL.id}`));
  }, []);

  const vote = (optionId: string) => {
    if (voted) return;
    setVoted(optionId);
    window.localStorage.setItem(`hc-poll-${POLL.id}`, optionId);
  };

  const totals = POLL.options.map((o) => o.base + (voted === o.id ? 1 : 0));
  const sum = totals.reduce((a, b) => a + b, 0);

  return (
    <div className="card-paper p-6">
      <p className="section-eyebrow">Опрос недели</p>
      <h3 className="mt-2 font-title text-xl text-bone">{POLL.question}</h3>

      <div className="mt-5 space-y-2.5">
        {POLL.options.map((opt, i) => {
          const pct = sum ? Math.round((totals[i] / sum) * 100) : 0;
          const isVoted = voted === opt.id;
          const reveal = Boolean(voted);
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => vote(opt.id)}
              disabled={reveal}
              className={cn(
                'relative w-full overflow-hidden rounded-sm border px-4 py-3 text-left transition-colors',
                isVoted ? 'border-impala' : 'border-impala/20',
                !reveal && 'hover:border-impala/60',
              )}
            >
              {reveal && (
                <span
                  className="absolute inset-y-0 left-0 bg-impala/15 transition-all duration-700"
                  style={{ width: `${pct}%` }}
                />
              )}
              <span className="relative flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm text-bone">
                  {isVoted && <Check className="h-4 w-4 text-impala" />}
                  {opt.label}
                </span>
                {reveal && mounted && (
                  <span className="font-mono text-xs text-impala">{pct}%</span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-ash">
        {voted
          ? `Спасибо за голос · всего ${sum.toLocaleString('ru-RU')} голосов`
          : 'Выберите вариант, чтобы увидеть результаты'}
      </p>
    </div>
  );
}
