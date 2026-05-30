'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { PenLine, Loader2 } from 'lucide-react';
import { routes } from '@/lib/routes';

export function NewThreadForm() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (status === 'loading') return null;

  if (!session?.user) {
    return (
      <div className="card-paper p-5 text-sm text-parchment">
        Чтобы создать тему,{' '}
        <Link href={routes.login} className="link-spark text-impala">
          войдите
        </Link>{' '}
        или{' '}
        <Link href={routes.register} className="link-spark text-impala">
          зарегистрируйтесь
        </Link>
        .
      </div>
    );
  }

  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)} className="btn-ember text-sm">
        <PenLine className="h-4 w-4" /> Новая тема
      </button>
    );
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/forum/threads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, category, body }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Ошибка.');
        setLoading(false);
        return;
      }
      router.push(routes.thread(data.id));
      router.refresh();
    } catch {
      setError('Сеть недоступна.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="card-paper space-y-4 p-6">
      <h3 className="font-title text-lg text-bone">Новая тема</h3>
      <div className="grid gap-4 sm:grid-cols-[2fr,1fr]">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Заголовок темы"
          maxLength={160}
          required
          className="w-full rounded-sm border border-impala/20 bg-asphalt px-4 py-2.5 text-sm text-bone placeholder:text-ash focus:border-impala/50 focus:outline-none"
        />
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Категория (необяз.)"
          maxLength={40}
          className="w-full rounded-sm border border-impala/20 bg-asphalt px-4 py-2.5 text-sm text-bone placeholder:text-ash focus:border-impala/50 focus:outline-none"
        />
      </div>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={5}
        placeholder="Первое сообщение…"
        maxLength={5000}
        required
        className="w-full resize-none rounded-sm border border-impala/20 bg-asphalt px-4 py-2.5 text-sm text-bone placeholder:text-ash focus:border-impala/50 focus:outline-none"
      />
      {error && <p className="text-sm text-hell">{error}</p>}
      <div className="flex items-center gap-3">
        <button type="submit" disabled={loading} className="btn-ember text-sm disabled:opacity-60">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <PenLine className="h-4 w-4" />}
          Опубликовать
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="font-mono text-xs uppercase tracking-widest text-ash hover:text-impala"
        >
          Отмена
        </button>
      </div>
    </form>
  );
}
