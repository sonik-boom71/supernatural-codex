import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { news } from '@/data/news';
import { routes } from '@/lib/routes';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Новости вселенной',
  description: 'Спин-оффы, комиксы, конвенты и события вокруг «Сверхъестественного».',
};

export default function NewsPage() {
  const sorted = [...news].sort((a, b) => +new Date(b.date) - +new Date(a.date));

  return (
    <>
      <PageHeader
        eyebrow="Лента вселенной"
        title="Новости"
        description="Что происходит вокруг «Сверхъестественного»: спин-оффы, комиксы, конвенты SPN Family и проекты актёров."
      />
      <div className="container-page py-10">
        <div className="mx-auto max-w-3xl space-y-5">
          {sorted.map((item) => (
            <Link
              key={item.slug}
              href={routes.newsItem(item.slug)}
              className="card-paper group block p-6"
            >
              <div className="flex items-center gap-3">
                <span className="tag-chip border-impala/40 text-impala">
                  {item.category}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wider text-ash">
                  {formatDate(item.date)}
                </span>
              </div>
              <h2 className="mt-3 font-title text-2xl text-bone transition-colors group-hover:text-impala">
                {item.title}
              </h2>
              <p className="mt-2 text-parchment">{item.excerpt}</p>
              <span className="mt-3 inline-block font-mono text-[11px] uppercase tracking-widest text-impala">
                Читать →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
