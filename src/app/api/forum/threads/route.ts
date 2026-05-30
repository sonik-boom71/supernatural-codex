import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { isDbConfigured } from '@/lib/db';

export async function POST(req: Request) {
  if (!isDbConfigured()) {
    return NextResponse.json({ error: 'Бэкенд не настроен.' }, { status: 503 });
  }

  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Требуется вход.' }, { status: 401 });
  }

  try {
    const { title, category, body } = await req.json();
    if (!title?.trim() || !body?.trim()) {
      return NextResponse.json(
        { error: 'Заголовок и текст обязательны.' },
        { status: 400 },
      );
    }

    const thread = await prisma.forumThread.create({
      data: {
        title: String(title).trim().slice(0, 160),
        category: (category?.trim() || 'Общее').slice(0, 40),
        authorId: session.user.id,
        posts: {
          create: {
            body: String(body).trim().slice(0, 5000),
            authorId: session.user.id,
          },
        },
      },
    });

    return NextResponse.json({ id: thread.id });
  } catch {
    return NextResponse.json({ error: 'Не удалось создать тему.' }, { status: 500 });
  }
}
