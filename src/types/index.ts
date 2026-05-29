// ─────────────────────────────────────────────────────────────
// HUNTER'S CODEX — доменные типы
// ─────────────────────────────────────────────────────────────

export type Faction =
  | 'hunter'
  | 'angel'
  | 'demon'
  | 'god'
  | 'human'
  | 'monster';

export type MonsterType =
  | 'ghost'
  | 'shapeshifter'
  | 'werewolf'
  | 'vampire'
  | 'demon'
  | 'angel'
  | 'leviathan'
  | 'pagan'
  | 'special';

export type WeaponType = 'firearm' | 'blade' | 'artifact' | 'ritual';

export type EpisodeTag =
  | 'premiere'
  | 'finale'
  | 'death'
  | 'return'
  | 'crossover'
  | 'fan-favorite'
  | 'musical'
  | 'meta';

export type LocationKind = 'city' | 'bunker' | 'realm';

export interface Season {
  number: number;
  title: string;
  years: string;
  episodeCount: number;
  synopsis: string;
  bigBad: string;
  accent: string; // hex для тематической подсветки сезона
}

export interface Episode {
  id: string; // "s01e01"
  season: number;
  number: number;
  title: string;
  titleRu: string;
  airDate: string;
  rating: number;
  summary: string;
  monsters: string[]; // slugs
  characters: string[]; // slugs
  tags: EpisodeTag[];
  locationSlug?: string;
}

export interface Character {
  slug: string;
  name: string;
  nameRu: string;
  faction: Faction;
  role: string;
  description: string;
  fate: string;
  firstSeen: string;
  lastSeen?: string;
  actor: string;
  quote?: string;
  accent?: string;
}

export interface Monster {
  slug: string;
  nameRu: string;
  nameEn: string;
  type: MonsterType;
  threatLevel: 1 | 2 | 3 | 4 | 5;
  description: string;
  weakness: string;
  killMethod: string;
  firstSeen: string;
}

export interface Weapon {
  slug: string;
  name: string;
  nameRu: string;
  type: WeaponType;
  owner: string;
  power: string;
  description: string;
  firstSeen: string;
}

export interface Quote {
  id: string;
  text: string;
  textRu: string;
  characterSlug: string;
  episode: string;
}

export interface SoundtrackEntry {
  id: string;
  title: string;
  artist: string;
  year?: number;
  seasons: number[];
  note: string;
  youtubeId?: string;
  spotifyUrl?: string;
}

export interface MapLocation {
  slug: string;
  name: string;
  nameRu: string;
  kind: LocationKind;
  x: number; // % по горизонтали на карте
  y: number; // % по вертикали
  description: string;
  episode?: string;
}

export interface NewsItem {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  body: string;
}

export interface EasterEgg {
  season: number;
  title: string;
  description: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  answers: { text: string; scores: Record<string, number> }[];
}

export interface QuizResult {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  accent: string;
}
