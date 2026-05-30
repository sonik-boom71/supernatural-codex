import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { isDbConfigured } from '@/lib/db';

export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  if (!isDbConfigured()) {
    return NextResponse.json({ error: 'Бэкенд не настроен.' }, { status: 503 });
  }

  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Требуется вход.' }, { status: 401 });
  }

  try {
    const { body } = await req.json();
    if (!body?.trim()) {
      return NextResponse.json({ error: 'Пустой ответ.' }, { status: 400 });
    }

    const thread = await prisma.forumThread.findUnique({ where: { id: params.id } });
    if (!thread) {
      return NextResponse.json({ error: 'Тема не найдена.' }, { status: 404 });
    }

    await prisma.forumPost.create({
      data: {
        body: String(body).trim().slice(0, 5000),
        threadId: params.id,
        authorId: session.user.id,
      },
    });
    await prisma.forumThread.update({
      where: { id: params.id },
      data: { updatedAt: new Date() },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Не удалось отправить ответ.' }, { status: 500 });
  }
}
