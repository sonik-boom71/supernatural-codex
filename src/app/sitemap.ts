import type { MetadataRoute } from 'next';
import { episodes } from '@/data/episodes';
import { characters } from '@/data/characters';
import { monsters } from '@/data/bestiary';
import { weapons } from '@/data/weapons';
import { news } from '@/data/news';
import { routes } from '@/lib/routes';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hunters-codex.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    routes.home,
    routes.episodes,
    routes.characters,
    routes.bestiary,
    routes.armory,
    routes.map,
    routes.quotes,
    routes.soundtrack,
    routes.interactive,
    routes.quiz,
    routes.guessEpisode,
    routes.tracker,
    routes.submitStory,
    routes.community,
    routes.news,
    routes.easterEggs,
    routes.about,
  ].map((path) => ({ url: `${BASE}${path}`, lastModified: new Date() }));

  const dynamic = [
    ...episodes.map((e) => routes.episode(e.id)),
    ...characters.map((c) => routes.character(c.slug)),
    ...monsters.map((m) => routes.monster(m.slug)),
    ...weapons.map((w) => `${routes.armory}/${w.slug}`),
    ...news.map((n) => routes.newsItem(n.slug)),
  ].map((path) => ({ url: `${BASE}${path}`, lastModified: new Date() }));

  return [...staticPaths, ...dynamic];
}
