import peopleRaw from '@/data/generated/tmdb-people.json';
import showRaw from '@/data/generated/tmdb-show.json';

const TMDB_IMG = 'https://image.tmdb.org/t/p';

export type TmdbSize = 'w200' | 'w300' | 'w500' | 'w780' | 'original';

/** Полный URL картинки TMDB по относительному пути. */
export function tmdbImage(
  path?: string | null,
  size: TmdbSize = 'w500',
): string | null {
  return path ? `${TMDB_IMG}/${size}${path}` : null;
}

interface Person {
  name: string;
  character: string;
  profilePath: string;
}

const norm = (s: string) => s.toLowerCase().replace(/[^a-zа-яё0-9]/gi, '');

const peopleByName = new Map(
  (peopleRaw as Person[]).map((p) => [norm(p.name), p.profilePath]),
);
const peopleByCharacter = new Map(
  (peopleRaw as Person[]).map((p) => [norm(p.character), p.profilePath]),
);

/** Фото актёра по англ. имени (или по имени персонажа), если есть в выгрузке TMDB. */
export function actorPhoto(actorEn?: string, characterEn?: string): string | null {
  if (actorEn) {
    const byName = peopleByName.get(norm(actorEn));
    if (byName) return tmdbImage(byName, 'w300');
  }
  if (characterEn) {
    const byChar = peopleByCharacter.get(norm(characterEn));
    if (byChar) return tmdbImage(byChar, 'w300');
  }
  return null;
}

const show = showRaw as {
  posterPath: string | null;
  backdropPath: string | null;
  seasonPosters?: Record<string, string>;
};

/** Постер сезона из TMDB. */
export function seasonPoster(season: number, size: TmdbSize = 'w300'): string | null {
  const p = show.seasonPosters?.[String(season)];
  return p ? tmdbImage(p, size) : null;
}

export const showPoster = (size: TmdbSize = 'w500') => tmdbImage(show.posterPath, size);
export const showBackdrop = (size: TmdbSize = 'w780') =>
  tmdbImage(show.backdropPath, size);
