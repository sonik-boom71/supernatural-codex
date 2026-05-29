'use client';

import { useState, useCallback } from 'react';
import { Check, X, ArrowRight } from 'lucide-react';
import { episodes } from '@/data/episodes';
import { getSeason } from '@/data/seasons';
import { formatEpisodeCode, pickRandom, cn } from '@/lib/utils';
import type { Episode } from '@/types';

interface Round {
  episode: Episode;
  options: Episode[];
}

function buildRound(): Round {
  const episode = pickRandom(episodes);
  const distractors = episodes
    .filter((e) => e.id !== episode.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  const options = [...distractors, episode].sort(() => Math.random() - 0.5);
  return { episode, options };
}

export function GuessEpisode() {
  const [round, setRound] = useState<Round>(() => buildRound());
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const answer = (id: string) => {
    if (picked) return;
    setPicked(id);
    setScore((s) => ({
      correct: s.correct + (id === round.episode.id ? 1 : 0),
      total: s.total + 1,
    }));
  };

  const next = useCallback(() => {
    setRound(buildRound());
    setPicked(null);
  }, []);

  const season = getSeason(round.episode.season);

  return (
    <div className="card-paper p-8 sm:p-10">
      <div className="mb-6 flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-widest text-impala/80">
          Угадай серию по сюжету
        </span>
        <span className="font-mono text-xs text-ash">
          Счёт: {score.correct}/{score.total}
        </span>
      </div>

      {/* «Кадр»: стилизованная карточка-улика */}
      <div className="relative overflow-hidden rounded-sm border border-impala/20 bg-night p-6">
        <div className="absolute inset-0 bg-fog-radial" />
        <div className="relative">
          <p className="font-mono text-[11px] uppercase tracking-widest text-ash">
            Дело № {round.episode.season}-{round.episode.number} · {season?.years}
          </p>
          <p className="mt-3 font-serif text-lg italic leading-relaxed text-bone">
            «{round.episode.summary}»
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {round.options.map((opt) => {
          const isCorrect = opt.id === round.episode.id;
          const isPicked = picked === opt.id;
          const reveal = picked !== null;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => answer(opt.id)}
              disabled={reveal}
              className={cn(
                'flex items-center justify-between gap-3 rounded-sm border px-4 py-3 text-left transition-all',
                !reveal && 'border-impala/20 bg-asphalt hover:border-impala hover:bg-impala/10',
                reveal && isCorrect && 'border-grace bg-grace/10 text-grace',
                reveal && isPicked && !isCorrect && 'border-hell bg-blood/10 text-hell',
                reveal && !isCorrect && !isPicked && 'border-impala/10 opacity-50',
              )}
            >
              <span className="text-sm text-bone">{opt.titleRu}</span>
              {reveal && isCorrect && <Check className="h-4 w-4 shrink-0 text-grace" />}
              {reveal && isPicked && !isCorrect && (
                <X className="h-4 w-4 shrink-0 text-hell" />
              )}
            </button>
          );
        })}
      </div>

      {picked && (
        <div className="mt-6 flex items-center justify-between animate-fade-up">
          <p className="text-sm text-parchment">
            {picked === round.episode.id ? '✓ Верно!' : '✗ Правильный ответ:'}{' '}
            <span className="text-impala">
              {formatEpisodeCode(round.episode.season, round.episode.number)} —{' '}
              {round.episode.titleRu}
            </span>
          </p>
          <button type="button" onClick={next} className="btn-ember text-sm">
            Дальше <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
