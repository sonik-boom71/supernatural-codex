'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { Ghost, Send, Trash2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface Story {
  id: string;
  nickname: string;
  content: string;
  date: string;
}

const STORAGE_KEY = 'hc-ghost-stories';

export function SubmitStory() {
  const [nickname, setNickname] = useState('');
  const [content, setContent] = useState('');
  const [stories, setStories] = useState<Story[]>([]);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setStories(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const persist = (next: Story[]) => {
    setStories(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    const story: Story = {
      id: crypto.randomUUID(),
      nickname: nickname.trim() || 'Аноним',
      content: content.trim(),
      date: new Date().toISOString(),
    };
    persist([story, ...stories]);
    setContent('');
    setNickname('');
    setSent(true);
    setTimeout(() => setSent(false), 2500);
  };

  const remove = (id: string) => persist(stories.filter((s) => s.id !== id));

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form onSubmit={submit} className="card-paper p-6">
        <h2 className="flex items-center gap-2 font-title text-xl text-bone">
          <Ghost className="h-5 w-5 text-impala" /> Расскажи свою страшилку
        </h2>
        <p className="mt-2 text-sm text-parchment">
          Анонимно или под ником. Истории сохраняются локально в твоём браузере —
          это демонстрация формы (в полной версии — отправка на модерацию через API).
        </p>

        <div className="mt-5 space-y-4">
          <div>
            <label className="font-mono text-[11px] uppercase tracking-widest text-ash">
              Ник (необязательно)
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Аноним"
              maxLength={40}
              className="mt-1.5 w-full rounded-sm border border-impala/20 bg-asphalt px-4 py-2.5 text-sm text-bone placeholder:text-ash focus:border-impala/50 focus:outline-none"
            />
          </div>
          <div>
            <label className="font-mono text-[11px] uppercase tracking-widest text-ash">
              История
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              maxLength={2000}
              placeholder="Однажды ночью на трассе 666…"
              className="mt-1.5 w-full resize-none rounded-sm border border-impala/20 bg-asphalt px-4 py-2.5 text-sm text-bone placeholder:text-ash focus:border-impala/50 focus:outline-none"
            />
            <p className="mt-1 text-right font-mono text-[10px] text-ash">
              {content.length}/2000
            </p>
          </div>
          <button type="submit" className="btn-ember w-full justify-center text-sm">
            <Send className="h-4 w-4" /> {sent ? 'Отправлено!' : 'Отправить историю'}
          </button>
        </div>
      </form>

      <div>
        <h2 className="font-title text-xl text-bone">
          Архив историй ({stories.length})
        </h2>
        {stories.length === 0 ? (
          <p className="mt-4 text-sm text-parchment">
            Пока пусто. Стань первым, кто поделится страшилкой.
          </p>
        ) : (
          <ul className="mt-4 space-y-4">
            {stories.map((s) => (
              <li key={s.id} className="card-paper p-5">
                <div className="flex items-center justify-between">
                  <span className="font-title text-base text-impala">{s.nickname}</span>
                  <button
                    type="button"
                    onClick={() => remove(s.id)}
                    aria-label="Удалить"
                    className="text-ash transition-colors hover:text-hell"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-parchment">
                  {s.content}
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-ash">
                  {formatDate(s.date)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
