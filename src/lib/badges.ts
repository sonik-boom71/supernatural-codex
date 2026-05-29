import type { EpisodeTag } from '@/types';

export const episodeTagMeta: Record<
  EpisodeTag,
  { label: string; className: string }
> = {
  premiere: { label: 'Премьера', className: 'border-impala/50 text-impala' },
  finale: { label: 'Финал', className: 'border-impala/60 text-impala bg-impala/10' },
  death: { label: 'Смерть', className: 'border-blood/60 text-hell bg-blood/10' },
  return: { label: 'Возвращение', className: 'border-grace/50 text-grace' },
  crossover: { label: 'Кроссовер', className: 'border-flame/50 text-flame' },
  'fan-favorite': { label: 'Любимое фанатами', className: 'border-flame/40 text-flame' },
  musical: { label: 'Музыкальный', className: 'border-grace/40 text-grace' },
  meta: { label: 'Мета', className: 'border-parchment/40 text-parchment' },
};

export const threatLabels: Record<number, string> = {
  1: 'Незначительная',
  2: 'Низкая',
  3: 'Серьёзная',
  4: 'Высокая',
  5: 'Экстремальная',
};
