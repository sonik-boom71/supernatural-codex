import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { WeeklyPoll } from '@/components/community/WeeklyPoll';
import { MessageSquare, BookOpen, Image as ImageIcon, Heart } from 'lucide-react';
import { routes } from '@/lib/routes';

export const metadata: Metadata = {
  title: 'Комьюнити',
  description: 'Форум, фанфики, фан-арт и опросы сообщества SPN Family.',
};

const threads = [
  { title: 'Теория: Чак знал о Джеке с самого начала?', author: 'wayward_son', rank: 'Хранитель Знания', replies: 142 },
  { title: 'Лучший фильтр для пересмотра: только мифология', author: 'saltandburn', rank: 'Старший охотник', replies: 89 },
  { title: 'Почему амулет (самулет) — самая грустная деталь', author: 'team_free_will', rank: 'Хантер', replies: 211 },
  { title: 'Рейтинг всех 15 финалов сезонов', author: 'impala67', rank: 'Винчестер', replies: 376 },
];

const fanfics = [
  { title: 'Дорога без конца', author: 'castiel_grace', rating: 'PG-13', tags: ['джен', 'ангст', 'постканон'], likes: 324 },
  { title: 'Бункер, 3 часа ночи', author: 'pie_lover', rating: 'G', tags: ['флафф', 'броманс'], likes: 198 },
  { title: 'То, что осталось в Чистилище', author: 'purgatory_blues', rating: 'R', tags: ['hurt/comfort', 'дин'], likes: 451 },
];

const ranks = ['Новичок', 'Хантер', 'Старший охотник', 'Хранитель Знания', 'Винчестер'];

export default function CommunityPage() {
  return (
    <>
      <PageHeader
        eyebrow="SPN Family"
        title="Комьюнити"
        description="Форум, фанфики, фан-арт и еженедельные опросы. Прототип разделов сообщества — в полной версии подключается бэкенд с авторизацией и модерацией."
      />
      <div className="container-page py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr,340px]">
          <div className="space-y-12">
            {/* Форум */}
            <section>
              <div className="mb-5 flex items-center justify-between gap-4">
                <h2 className="flex items-center gap-2 font-title text-2xl text-bone">
                  <MessageSquare className="h-6 w-6 text-impala" /> Форум
                </h2>
                <Link
                  href={routes.forum}
                  className="shrink-0 rounded-sm border border-impala/40 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-impala transition-colors hover:bg-impala/10"
                >
                  Открыть форум →
                </Link>
              </div>
              <ul className="divide-y divide-impala/10 overflow-hidden rounded-sm border border-impala/15">
                {threads.map((t) => (
                  <li
                    key={t.title}
                    className="flex items-center justify-between gap-4 px-4 py-3.5 transition-colors hover:bg-mortar"
                  >
                    <div>
                      <p className="text-sm text-bone">{t.title}</p>
                      <p className="mt-0.5 font-mono text-[11px] text-ash">
                        {t.author} · <span className="text-impala/70">{t.rank}</span>
                      </p>
                    </div>
                    <span className="shrink-0 font-mono text-xs text-ash">
                      {t.replies} 💬
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Фанфики */}
            <section>
              <h2 className="mb-5 flex items-center gap-2 font-title text-2xl text-bone">
                <BookOpen className="h-6 w-6 text-impala" /> Фанфики
              </h2>
              <div className="grid gap-5 sm:grid-cols-3">
                {fanfics.map((f) => (
                  <article key={f.title} className="card-paper flex flex-col p-5">
                    <div className="flex items-center justify-between">
                      <span className="tag-chip border-blood/50 text-hell">{f.rating}</span>
                      <span className="flex items-center gap-1 font-mono text-xs text-ash">
                        <Heart className="h-3 w-3 fill-hell text-hell" /> {f.likes}
                      </span>
                    </div>
                    <h3 className="mt-3 font-title text-lg text-bone">{f.title}</h3>
                    <p className="mt-1 font-mono text-[11px] text-ash">by {f.author}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {f.tags.map((tag) => (
                        <span key={tag} className="tag-chip border-impala/30 text-parchment">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Фан-арт */}
            <section>
              <h2 className="mb-5 flex items-center gap-2 font-title text-2xl text-bone">
                <ImageIcon className="h-6 w-6 text-impala" /> Фан-арт галерея
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {['Импала', 'Anti-Possession', 'Team Free Will', 'Бункер', 'Кас', 'Адские псы', 'Кольт', 'Дорога'].map(
                  (label, i) => (
                    <div
                      key={label}
                      className="card-paper flex aspect-square items-center justify-center bg-fog-radial p-3 text-center"
                      style={{ borderColor: i % 2 ? 'rgba(212,175,55,0.25)' : 'rgba(139,0,0,0.25)' }}
                    >
                      <span className="font-mono text-[11px] uppercase tracking-widest text-parchment">
                        {label}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </section>
          </div>

          {/* Сайдбар */}
          <aside className="space-y-6">
            <WeeklyPoll />
            <div className="card-paper p-6">
              <p className="section-eyebrow">Ранги охотников</p>
              <ol className="mt-4 space-y-2">
                {ranks.map((r, i) => (
                  <li key={r} className="flex items-center gap-3">
                    <span className="font-brand text-lg text-impala/60">{i + 1}</span>
                    <span className="text-sm text-bone">{r}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-xs text-ash">
                Ранг растёт с числом сообщений — от Новичка до самого Винчестера.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
