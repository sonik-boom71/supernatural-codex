import Link from 'next/link';
import Image from 'next/image';
import { Star, Tv } from 'lucide-react';
import type { Episode } from '@/types';
import { routes } from '@/lib/routes';
import { formatEpisodeCode, cn } from '@/lib/utils';
import { episodeTagMeta } from '@/lib/badges';
import { tmdbImage } from '@/lib/images';

export function EpisodeCard({ episode }: { episode: Episode }) {
  const still = tmdbImage(episode.stillPath, 'w500');

  return (
    <Link
      href={routes.episode(episode.id)}
      className="card-paper group flex flex-col overflow-hidden"
    >
      {/* Кадр серии (TMDB) или стилизованная заглушка */}
      <div className="relative aspect-video overflow-hidden bg-night">
        {still ? (
          <Image
            src={still}
            alt={episode.titleRu}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-fog-radial">
            <Tv className="h-8 w-8 text-impala/30" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-transparent to-transparent" />
        <span className="absolute left-3 top-3 rounded-sm bg-void/80 px-2 py-0.5 font-brand text-base tracking-widest text-impala backdrop-blur">
          {formatEpisodeCode(episode.season, episode.number)}
        </span>
        {episode.rating > 0 && (
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-sm bg-void/80 px-2 py-0.5 font-mono text-xs text-parchment backdrop-blur">
            <Star className="h-3.5 w-3.5 fill-impala text-impala" />
            {episode.rating.toFixed(1)}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-title text-lg leading-tight text-bone transition-colors group-hover:text-impala">
          {episode.titleRu}
        </h3>
        <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-ash">
          {episode.title}
        </p>

        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-parchment">
          {episode.summary}
        </p>

        {episode.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {episode.tags.map((tag) => (
              <span key={tag} className={cn('tag-chip', episodeTagMeta[tag].className)}>
                {episodeTagMeta[tag].label}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
