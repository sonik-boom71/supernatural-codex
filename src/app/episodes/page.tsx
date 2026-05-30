import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHeader } from '@/components/ui/PageHeader';
import { EpisodesExplorer } from '@/components/episodes/EpisodesExplorer';
import { episodes } from '@/data/episodes';
import { seasons } from '@/data/seasons';
import { seasonPoster } from '@/lib/images';

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
          {seasons.map((s) => {
            const poster = seasonPoster(s.number, 'w300');
            return (
              <div
                key={s.number}
                className="card-paper overflow-hidden"
                style={{ borderColor: `${s.accent}33` }}
              >
                <div className="relative aspect-[2/3] bg-night">
                  {poster ? (
                    <Image
                      src={poster}
                      alt={`Постер ${s.number} сезона`}
                      fill
                      sizes="(max-width: 1024px) 33vw, 20vw"
                      className="object-cover"
                    />
                  ) : (
                    <div
                      className="flex h-full items-center justify-center"
                      style={{
                        background: `radial-gradient(circle at 50% 30%, ${s.accent}22, #0d0d0d 75%)`,
                      }}
                    >
                      <span className="font-brand text-5xl text-impala/40">
                        S{String(s.number).padStart(2, '0')}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-transparent to-transparent" />
                  <span className="absolute left-2 top-2 rounded-sm bg-void/80 px-2 py-0.5 font-brand text-lg tracking-widest text-impala backdrop-blur">
                    S{String(s.number).padStart(2, '0')}
                  </span>
                </div>
                <div className="p-3">
                  <p className="font-title text-sm text-bone">{s.title}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-ash">
                    {s.episodeCount} серий · {s.years}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <EpisodesExplorer episodes={episodes} />
      </div>
    </>
  );
}
