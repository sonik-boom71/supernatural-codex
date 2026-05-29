import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatEpisodeCode(season: number, number: number): string {
  const s = String(season).padStart(2, '0');
  const e = String(number).padStart(2, '0');
  return `S${s}·E${e}`;
}

export function parseEpisodeId(id: string): { season: number; number: number } | null {
  const match = id.match(/^s(\d{2})e(\d{2})$/i);
  if (!match) return null;
  return { season: parseInt(match[1], 10), number: parseInt(match[2], 10) };
}

export function formatDate(dateStr: string): string {
  try {
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}

export function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
