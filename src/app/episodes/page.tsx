import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { EpisodesExplorer } from '@/components/episodes/EpisodesExplorer';
import { episodes } from '@/data/episodes';
import { seasons } from '@/data/seasons';

export const metadata: Metadata = {
  title: 'База серий',
  description: 'Полный список серий «Сверхъестественного» по сезонам с фильтрами.',
};

export default function EpisodesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Архив дел · S01–S15"
        title="База серий"
        description="15 сезонов охоты. Фильтруйте по сезону или ключевым событиям — смерти, возвращения, кроссоверы и финалы. Представлен полный первый сезон и знаковые серии остальных."
      />
      <div className="container-page py-10">
        {/* Краткая сетка сезонов */}
        <div className="mb-12 grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {seasons.map((s) => (
            <div
              key={s.number}
              className="card-paper p-4"
              style={{ borderColor: `${s.accent}33` }}
            >
              <div className="flex items-baseline justify-between">
                <span className="font-brand text-2xl text-impala">
                  S{String(s.number).padStart(2, '0')}
                </span>
                <span className="font-mono text-[10px] text-ash">{s.years}</span>
              </div>
              <p className="mt-1 font-title text-sm text-bone">{s.title}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-ash">
                {s.episodeCount} серий · {s.bigBad}
              </p>
            </div>
          ))}
        </div>

        <EpisodesExplorer episodes={episodes} />
      </div>
    </>
  );
}
