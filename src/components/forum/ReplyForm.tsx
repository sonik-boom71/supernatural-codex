'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Send, Loader2 } from 'lucide-react';
import { routes } from '@/lib/routes';

export function ReplyForm({ threadId }: { threadId: string }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (status === 'loading') return null;

  if (!session?.user) {
    return (
      <div className="card-paper p-5 text-sm text-parchment">
        Чтобы ответить,{' '}
        <Link href={routes.login} className="link-spark text-impala">
          войдите
        </Link>
        .
      </div>
    );
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`/api/forum/threads/${threadId}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Ошибка.');
        setLoading(false);
        return;
      }
      setBody('');
      setLoading(false);
      router.refresh();
    } catch {
      setError('Сеть недоступна.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="card-paper space-y-3 p-5">
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={4}
        placeholder="Ваш ответ…"
        maxLength={5000}
        required
        className="w-full resize-none rounded-sm border border-impala/20 bg-asphalt px-4 py-2.5 text-sm text-bone placeholder:text-ash focus:border-impala/50 focus:outline-none"
      />
      {error && <p className="text-sm text-hell">{error}</p>}
      <button type="submit" disabled={loading} className="btn-ember text-sm disabled:opacity-60">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        Ответить
      </button>
    </form>
  );
}
