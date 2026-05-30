import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Shield } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { ReplyForm } from '@/components/forum/ReplyForm';
import { ForumNotConfigured } from '@/components/forum/ForumNotConfigured';
import { isDbConfigured } from '@/lib/db';
import { prisma } from '@/lib/prisma';
import { routes } from '@/lib/routes';
import { formatDate, cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function ThreadPage({ params }: { params: { id: string } }) {
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

  const thread = await prisma.forumThread
    .findUnique({
      where: { id: params.id },
      include: {
        author: { select: { username: true, role: true } },
        posts: {
          include: { author: { select: { username: true, role: true } } },
          orderBy: { createdAt: 'asc' },
        },
      },
    })
    .catch(() => null);

  if (!thread) notFound();

  return (
    <article className="container-page py-12">
      <Link
        href={routes.forum}
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ash transition-colors hover:text-impala"
      >
        <ArrowLeft className="h-4 w-4" /> К форуму
      </Link>

      <header className="mt-6">
        <span className="tag-chip border-impala/30 text-impala">{thread.category}</span>
        <h1 className="mt-3 font-display text-3xl uppercase tracking-wide text-bone sm:text-4xl">
          {thread.title}
        </h1>
        <p className="mt-1 font-mono text-xs text-ash">
          Открыл {thread.author.username} · {formatDate(thread.createdAt.toISOString())}
        </p>
      </header>

      <div className="mt-8 space-y-4">
        {thread.posts.map((post, i) => (
          <div key={post.id} className="card-paper p-5">
            <div className="mb-3 flex items-center justify-between border-b border-impala/10 pb-2">
              <span className="flex items-center gap-2 font-title text-base text-impala">
                {post.author.role !== 'USER' && (
                  <Shield className="h-3.5 w-3.5 text-grace" />
                )}
                {post.author.username}
                {i === 0 && (
                  <span className="tag-chip border-impala/30 text-ash">автор</span>
                )}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-ash">
                {formatDate(post.createdAt.toISOString())}
              </span>
            </div>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-parchment">
              {post.body}
            </p>
          </div>
        ))}
      </div>

      <div className={cn('mt-8')}>
        <ReplyForm threadId={thread.id} />
      </div>
    </article>
  );
}
