#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────
// Генерация данных из TMDB для Hunter's Codex.
// Забирает ВСЕ серии «Сверхъестественного» (327 эпизодов, 15 сезонов),
// постеры сезонов и фото актёров — и пишет в src/data/generated/*.json.
//
// Запуск:
//   TMDB_API_KEY=xxxxxxxx npm run tmdb         (v3 api key)
//   TMDB_API_KEY=eyJ... TMDB_V4=1 npm run tmdb (v4 bearer token)
//
// Картинки потом отдаёт CDN image.tmdb.org без ключа.
// ─────────────────────────────────────────────────────────────

import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const KEY = process.env.TMDB_API_KEY;
const IS_V4 = process.env.TMDB_V4 === '1' || (KEY && KEY.startsWith('eyJ'));
const SHOW_ID = 1622; // Supernatural
const TOTAL_SEASONS = 15;
const OUT_DIR = path.join(process.cwd(), 'src', 'data', 'generated');

if (!KEY) {
  console.error('\n✗ Не задан TMDB_API_KEY.');
  console.error('  Получи бесплатный ключ: https://www.themoviedb.org/settings/api');
  console.error('  Затем: TMDB_API_KEY=твой_ключ npm run tmdb\n');
  process.exit(1);
}

const BASE = 'https://api.themoviedb.org/3';

async function tmdb(endpoint, params = {}) {
  const url = new URL(BASE + endpoint);
  url.searchParams.set('language', params.language ?? 'ru-RU');
  for (const [k, v] of Object.entries(params)) {
    if (k !== 'language') url.searchParams.set(k, v);
  }
  if (!IS_V4) url.searchParams.set('api_key', KEY);

  const res = await fetch(url, {
    headers: IS_V4 ? { Authorization: `Bearer ${KEY}` } : {},
  });
  if (!res.ok) {
    throw new Error(`TMDB ${res.status} ${res.statusText} на ${endpoint}`);
  }
  return res.json();
}

const pad = (n) => String(n).padStart(2, '0');
const epId = (s, e) => `s${pad(s)}e${pad(e)}`;

async function main() {
  console.log(`\n🜏 Тяну данные из TMDB (show ${SHOW_ID})${IS_V4 ? ' [v4]' : ''}…\n`);
  await mkdir(OUT_DIR, { recursive: true });

  // ── Серии ──
  const episodes = [];
  const seasonPosters = {};

  for (let s = 1; s <= TOTAL_SEASONS; s++) {
    const [ru, en] = await Promise.all([
      tmdb(`/tv/${SHOW_ID}/season/${s}`, { language: 'ru-RU' }),
      tmdb(`/tv/${SHOW_ID}/season/${s}`, { language: 'en-US' }),
    ]);
    if (ru.poster_path) seasonPosters[s] = ru.poster_path;

    const enById = Object.fromEntries(
      (en.episodes ?? []).map((e) => [e.episode_number, e]),
    );

    for (const ep of ru.episodes ?? []) {
      const e = enById[ep.episode_number] ?? {};
      episodes.push({
        id: epId(s, ep.episode_number),
        season: s,
        number: ep.episode_number,
        title: e.name || ep.name || `Episode ${ep.episode_number}`,
        titleRu: ep.name || e.name || `Серия ${ep.episode_number}`,
        airDate: ep.air_date || e.air_date || '',
        rating: ep.vote_average ? Math.round(ep.vote_average * 10) / 10 : 0,
        summary: (ep.overview || e.overview || '').trim(),
        stillPath: ep.still_path || e.still_path || null,
      });
    }
    console.log(`  S${pad(s)} — ${(ru.episodes ?? []).length} серий`);
  }

  // ── Актёры (фото для персонажей) ──
  let people = [];
  try {
    const credits = await tmdb(`/tv/${SHOW_ID}/aggregate_credits`, {
      language: 'en-US',
    });
    people = (credits.cast ?? [])
      .filter((c) => c.profile_path)
      .map((c) => ({
        name: c.name,
        character: c.roles?.[0]?.character ?? '',
        profilePath: c.profile_path,
      }));
  } catch (err) {
    console.warn('  ⚠ Не удалось получить состав:', err.message);
  }

  // ── Постер/бэкдроп шоу ──
  let show = {};
  try {
    const details = await tmdb(`/tv/${SHOW_ID}`, { language: 'ru-RU' });
    show = {
      posterPath: details.poster_path,
      backdropPath: details.backdrop_path,
      seasonPosters,
    };
  } catch (err) {
    console.warn('  ⚠ Не удалось получить детали шоу:', err.message);
  }

  episodes.sort((a, b) => a.season - b.season || a.number - b.number);

  await writeFile(
    path.join(OUT_DIR, 'tmdb-episodes.json'),
    JSON.stringify(episodes, null, 2) + '\n',
  );
  await writeFile(
    path.join(OUT_DIR, 'tmdb-people.json'),
    JSON.stringify(people, null, 2) + '\n',
  );
  await writeFile(
    path.join(OUT_DIR, 'tmdb-show.json'),
    JSON.stringify(show, null, 2) + '\n',
  );

  console.log(
    `\n✓ Готово: ${episodes.length} серий, ${people.length} актёров с фото.`,
  );
  console.log(`  Файлы записаны в src/data/generated/\n`);
}

main().catch((err) => {
  console.error('\n✗ Ошибка:', err.message, '\n');
  process.exit(1);
});
