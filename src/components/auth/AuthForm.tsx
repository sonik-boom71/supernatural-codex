'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { LogIn, UserPlus, Loader2 } from 'lucide-react';
import { routes } from '@/lib/routes';

export function AuthForm({ mode }: { mode: 'login' | 'register' }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isRegister = mode === 'register';

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isRegister) {
        const res = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, username, password }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error ?? 'Не удалось зарегистрироваться.');
          setLoading(false);
          return;
        }
      }

      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      if (result?.error) {
        setError(
          isRegister
            ? 'Аккаунт создан, но войти не вышло. Попробуйте на странице входа.'
            : 'Неверный email или пароль.',
        );
        setLoading(false);
        return;
      }
      router.push(routes.forum);
      router.refresh();
    } catch {
      setError('Сеть недоступна или бэкенд не настроен.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="card-paper mx-auto max-w-md p-8">
      <h1 className="font-display text-3xl uppercase tracking-wide text-bone">
        {isRegister ? 'Регистрация' : 'Вход'}
      </h1>
      <p className="mt-2 text-sm text-parchment">
        {isRegister
          ? 'Создай аккаунт охотника, чтобы писать на форуме.'
          : 'Войди, чтобы участвовать в обсуждениях.'}
      </p>

      <div className="mt-6 space-y-4">
        <Field
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="hunter@roadhouse.com"
          autoComplete="email"
        />
        {isRegister && (
          <Field
            label="Ник"
            type="text"
            value={username}
            onChange={setUsername}
            placeholder="wayward_son"
            autoComplete="username"
          />
        )}
        <Field
          label="Пароль"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="••••••••"
          autoComplete={isRegister ? 'new-password' : 'current-password'}
        />
      </div>

      {error && (
        <p className="mt-4 rounded-sm border border-hell/40 bg-blood/10 px-3 py-2 text-sm text-hell">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-ember mt-6 w-full justify-center text-sm disabled:opacity-60"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : isRegister ? (
          <UserPlus className="h-4 w-4" />
        ) : (
          <LogIn className="h-4 w-4" />
        )}
        {isRegister ? 'Создать аккаунт' : 'Войти'}
      </button>

      <p className="mt-5 text-center text-sm text-ash">
        {isRegister ? 'Уже есть аккаунт? ' : 'Ещё нет аккаунта? '}
        <Link
          href={isRegister ? routes.login : routes.register}
          className="link-spark text-impala"
        >
          {isRegister ? 'Войти' : 'Зарегистрироваться'}
        </Link>
      </p>
    </form>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[11px] uppercase tracking-widest text-ash">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required
        className="mt-1.5 w-full rounded-sm border border-impala/20 bg-asphalt px-4 py-2.5 text-sm text-bone placeholder:text-ash focus:border-impala/50 focus:outline-none"
      />
    </label>
  );
}
