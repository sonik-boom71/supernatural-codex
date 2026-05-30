'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { routes } from '@/lib/routes';
import { ParticlesAsh } from '@/components/effects/ParticlesAsh';

export function ImpalaHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const carY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[92vh] items-center justify-center overflow-hidden"
    >
      {/* Небо */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#05070f] via-[#0a0a0a] to-black" />

      {/* Звёзды */}
      <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(1px_1px_at_20%_30%,#fff,transparent),radial-gradient(1px_1px_at_60%_20%,#fff,transparent),radial-gradient(1px_1px_at_80%_40%,#fff,transparent),radial-gradient(1px_1px_at_40%_15%,#fff,transparent)]" />

      {/* Дорога в перспективе */}
      <div className="absolute bottom-0 left-1/2 h-[55%] w-full -translate-x-1/2 [perspective:380px]">
        <div className="absolute inset-0 origin-bottom [transform:rotateX(62deg)] bg-gradient-to-b from-transparent via-[#111] to-[#1c1c1c]">
          <div className="road-line absolute left-1/2 top-0 h-[200%] w-2 -translate-x-1/2 animate-road-dash opacity-70" />
        </div>
      </div>

      {/* Импала из сериала — кадр в кинематографичной рамке */}
      <motion.div
        style={{ y: carY, x: '-50%' }}
        className="absolute bottom-[22%] left-1/2"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.3 }}
          className="relative"
        >
          {/* Свет фар/дороги под клипом */}
          <div className="absolute -bottom-8 left-1/2 h-44 w-[130%] -translate-x-1/2 rounded-[50%] bg-impala/25 blur-3xl" />
          <div className="relative w-[280px] overflow-hidden rounded-md border border-impala/40 shadow-glow-lg sm:w-[400px] md:w-[500px]">
            <Image
              src="/media/impala-drive.gif"
              alt="Сэм и Дин в Импале на ночной дороге"
              width={540}
              height={256}
              unoptimized
              priority
              className="h-auto w-full"
            />
            {/* Виньетка + лёгкая «плёнка» */}
            <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_70px_rgba(0,0,0,0.75)]" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/50 via-transparent to-transparent" />
            <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:repeating-linear-gradient(0deg,rgba(0,0,0,0.5)_0px,rgba(0,0,0,0.5)_1px,transparent_1px,transparent_3px)]" />
            <span className="absolute bottom-2 right-3 font-mono text-[9px] uppercase tracking-[0.3em] text-impala/70">
              Impala · &apos;67
            </span>
          </div>
        </motion.div>
      </motion.div>

      <ParticlesAsh count={24} />

      {/* Заголовок */}
      <motion.div
        style={{ y: titleY, opacity: fade }}
        className="container-page relative z-10 mb-32 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="section-eyebrow"
        >
          Архив Хранителей Знания · Men of Letters
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.15 }}
          className="mt-4 font-brand text-6xl uppercase leading-[0.9] tracking-wider text-bone sm:text-7xl md:text-8xl lg:text-9xl"
        >
          Hunter&apos;s <span className="text-impala drop-shadow-[0_0_25px_rgba(212,175,55,0.4)]">Codex</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mx-auto mt-6 max-w-xl font-serif text-lg italic text-parchment"
        >
          «Спасать людей, охотиться на тварей. Семейное дело.»
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link href={routes.episodes} className="btn-ember">
            Открыть архив
          </Link>
          <Link
            href={routes.bestiary}
            className="font-mono text-xs uppercase tracking-widest text-parchment underline-offset-8 transition-colors hover:text-impala hover:underline"
          >
            Заглянуть в бестиарий →
          </Link>
        </motion.div>
      </motion.div>

      {/* Индикатор скролла */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-impala/60"
      >
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </motion.div>
    </section>
  );
}
