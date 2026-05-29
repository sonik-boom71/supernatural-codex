import Link from 'next/link';
import { Star } from 'lucide-react';
import type { Episode } from '@/types';
import { routes } from '@/lib/routes';
import { formatEpisodeCode, cn } from '@/lib/utils';
import { episodeTagMeta } from '@/lib/badges';

export function EpisodeCard({ episode }: { episode: Episode }) {
  return (
    <Link
      href={routes.episode(episode.id)}
      className="card-paper group flex flex-col p-5"
    >
      <div className="flex items-center justify-between">
        <span className="font-brand text-lg tracking-widest text-impala">
          {formatEpisodeCode(episode.season, episode.number)}
        </span>
        <span className="flex items-center gap-1 font-mono text-xs text-parchment">
          <Star className="h-3.5 w-3.5 fill-impala text-impala" />
          {episode.rating.toFixed(1)}
        </span>
      </div>

      <div className="my-3 h-px w-full bg-gradient-to-r from-impala/40 to-transparent" />

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
            <span
              key={tag}
              className={cn('tag-chip', episodeTagMeta[tag].className)}
            >
              {episodeTagMeta[tag].label}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
