import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { news, getNews } from '@/data/news';
import { routes } from '@/lib/routes';
import { formatDate } from '@/lib/utils';

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const item = getNews(params.slug);
  if (!item) return { title: 'Новость не найдена' };
  return { title: item.title, description: item.excerpt };
}

export default function NewsItemPage({ params }: { params: { slug: string } }) {
  const item = getNews(params.slug);
  if (!item) notFound();

  return (
    <article className="container-page py-12">
      <Link
        href={routes.news}
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ash transition-colors hover:text-impala"
      >
        <ArrowLeft className="h-4 w-4" /> К новостям
      </Link>

      <div className="mx-auto mt-8 max-w-2xl">
        <div className="flex items-center gap-3">
          <span className="tag-chip border-impala/40 text-impala">{item.category}</span>
          <span className="font-mono text-[11px] uppercase tracking-wider text-ash">
            {formatDate(item.date)}
          </span>
        </div>
        <h1 className="mt-4 font-display text-4xl uppercase tracking-wide text-bone sm:text-5xl">
          {item.title}
        </h1>
        <p className="mt-4 font-serif text-lg italic text-parchment">{item.excerpt}</p>
        <div className="mt-6 h-px w-full bg-gradient-to-r from-impala/40 to-transparent" />
        <p className="mt-6 text-lg leading-relaxed text-parchment">{item.body}</p>
      </div>
    </article>
  );
}
