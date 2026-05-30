import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { isDbConfigured } from '@/lib/db';

export async function POST(req: Request) {
  if (!isDbConfigured()) {
    return NextResponse.json(
      { error: 'Бэкенд не настроен (нет DATABASE_URL).' },
      { status: 503 },
    );
  }

  try {
    const { email, username, password } = await req.json();

    if (!email || !username || !password) {
      return NextResponse.json({ error: 'Заполните все поля.' }, { status: 400 });
    }
    if (typeof password !== 'string' || password.length < 6) {
      return NextResponse.json(
        { error: 'Пароль должен быть не короче 6 символов.' },
        { status: 400 },
      );
    }
    if (!/^[A-Za-z0-9_.-]{3,24}$/.test(username)) {
      return NextResponse.json(
        { error: 'Ник: 3–24 символа, латиница/цифры/._-' },
        { status: 400 },
      );
    }

    const existing = await prisma.user.findFirst({
      where: { OR: [{ email: email.toLowerCase() }, { username }] },
    });
    if (existing) {
      return NextResponse.json(
        { error: 'Пользователь с таким email или ником уже есть.' },
        { status: 409 },
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { email: email.toLowerCase(), username, passwordHash },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Ошибка сервера.' }, { status: 500 });
  }
}
