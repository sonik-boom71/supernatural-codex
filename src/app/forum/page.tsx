import type { Metadata } from 'next';
import Link from 'next/link';
import { MessageSquare } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { NewThreadForm } from '@/components/forum/NewThreadForm';
import { ForumNotConfigured } from '@/components/forum/ForumNotConfigured';
import { isDbConfigured } from '@/lib/db';
import { prisma } from '@/lib/prisma';
import { routes } from '@/lib/routes';
import { formatDate } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Форум',
  description: 'Обсуждения охотников: теории, рейтинги, любимые серии.',
};

export default async function ForumPage() {
  if (!isDbConfigured()) {
    return (
      <>
        <PageHeader eyebrow="Комьюнити" title="Форум" />
        <div className="container-page py-10">
          <ForumNotConfigured />
        </div>
      </>
    );
  }

  let threads: Awaited<ReturnType<typeof loadThreads>> = [];
  let dbError = false;
  try {
    threads = await loadThreads();
  } catch {
    dbError = true;
  }

  return (
    <>
      <PageHeader
        eyebrow="Комьюнити"
        title="Форум"
        description="Теории, рейтинги, любимые серии. Создавай темы и отвечай — нужен аккаунт."
      />
      <div className="container-page py-10">
        <div className="mb-8">
          <NewThreadForm />
        </div>

        {dbError ? (
          <p className="card-paper p-6 text-sm text-hell">
            Не удалось подключиться к базе данных. Проверьте DATABASE_URL и доступность Neon.
          </p>
        ) : threads.length === 0 ? (
          <p className="card-paper p-8 text-center text-parchment">
            Пока нет ни одной темы. Будь первым охотником!
          </p>
        ) : (
          <ul className="divide-y divide-impala/10 overflow-hidden rounded-sm border border-impala/15">
            {threads.map((t) => (
              <li key={t.id}>
                <Link
                  href={routes.thread(t.id)}
                  className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-mortar"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="tag-chip border-impala/30 text-impala">
                        {t.category}
                      </span>
                      <span className="truncate text-bone">{t.title}</span>
                    </div>
                    <p className="mt-1 font-mono text-[11px] text-ash">
                      {t.author.username} · {formatDate(t.createdAt.toISOString())}
                    </p>
                  </div>
                  <span className="flex shrink-0 items-center gap-1.5 font-mono text-xs text-parchment">
                    <MessageSquare className="h-4 w-4" /> {t._count.posts}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

function loadThreads() {
  return prisma.forumThread.findMany({
    include: {
      author: { select: { username: true } },
      _count: { select: { posts: true } },
    },
    orderBy: { updatedAt: 'desc' },
    take: 50,
  });
}
