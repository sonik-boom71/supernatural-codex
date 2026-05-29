'use client';

import { useState } from 'react';
import Link from 'next/link';
import { RotateCcw } from 'lucide-react';
import { quizQuestions, quizResults } from '@/data/quiz';
import { routes } from '@/lib/routes';
import { cn } from '@/lib/utils';

export function Quiz() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});

  const total = quizQuestions.length;
  const finished = step >= total;

  const choose = (answerScores: Record<string, number>) => {
    setScores((prev) => {
      const next = { ...prev };
      for (const [k, v] of Object.entries(answerScores)) {
        next[k] = (next[k] ?? 0) + v;
      }
      return next;
    });
    setStep((s) => s + 1);
  };

  const reset = () => {
    setStep(0);
    setScores({});
  };

  if (finished) {
    const winnerSlug =
      Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'dean';
    const result =
      quizResults.find((r) => r.slug === winnerSlug) ?? quizResults[0];

    return (
      <div className="card-paper relative overflow-hidden p-8 text-center sm:p-12">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${result.accent}55, transparent 60%)`,
          }}
        />
        <div className="relative">
          <p className="section-eyebrow">Ты —</p>
          <h2
            className="mt-3 font-display text-5xl uppercase tracking-wide sm:text-6xl"
            style={{ color: result.accent }}
          >
            {result.name}
          </h2>
          <p className="mt-2 font-serif text-xl italic text-parchment">
            {result.tagline}
          </p>
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-bone">
            {result.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button type="button" onClick={reset} className="btn-ember text-sm">
              <RotateCcw className="h-4 w-4" /> Пройти заново
            </button>
            <Link href={routes.character(result.slug)} className="link-spark text-sm">
              Открыть профиль персонажа →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const q = quizQuestions[step];

  return (
    <div className="card-paper p-8 sm:p-10">
      {/* Прогресс */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-widest text-impala/80">
            Вопрос {step + 1} / {total}
          </span>
          <span className="font-mono text-xs text-ash">
            {Math.round((step / total) * 100)}%
          </span>
        </div>
        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-mortar">
          <div
            className="h-full bg-gradient-to-r from-blood to-impala transition-all duration-500"
            style={{ width: `${(step / total) * 100}%` }}
          />
        </div>
      </div>

      <h2 className="font-title text-2xl text-bone sm:text-3xl">{q.question}</h2>

      <div className="mt-6 grid gap-3">
        {q.answers.map((a, i) => (
          <button
            key={i}
            type="button"
            onClick={() => choose(a.scores)}
            className={cn(
              'rounded-sm border border-impala/20 bg-asphalt px-5 py-4 text-left text-bone transition-all duration-200',
              'hover:border-impala hover:bg-impala/10 hover:translate-x-1',
            )}
          >
            {a.text}
          </button>
        ))}
      </div>
    </div>
  );
}
