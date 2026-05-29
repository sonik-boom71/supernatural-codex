'use client';

import Link from 'next/link';
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

      {/* Свечение фар на горизонте */}
      <motion.div
        style={{ y: carY }}
        className="absolute bottom-[28%] left-1/2 -translate-x-1/2"
      >
        <div className="relative">
          <ImpalaSilhouette />
          {/* Конусы света фар */}
          <div className="absolute -bottom-2 left-1/2 h-40 w-72 -translate-x-1/2 rounded-[50%] bg-impala/20 blur-3xl" />
        </div>
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

/** Стилизованный силуэт классического маслкара с горящими фарами. */
function ImpalaSilhouette() {
  return (
    <svg
      viewBox="0 0 320 130"
      className="h-auto w-[260px] sm:w-[340px] md:w-[420px]"
      aria-label="Chevrolet Impala 1967"
      role="img"
    >
      {/* Корпус */}
      <path
        d="M10 95 Q14 70 40 66 Q70 40 130 36 Q200 32 250 50 Q285 56 300 72 Q312 80 310 95 L300 95 A18 18 0 0 0 264 95 L120 95 A18 18 0 0 0 84 95 Z"
        fill="#0d0d0d"
        stroke="#2a2a2a"
        strokeWidth="1.5"
      />
      {/* Крыша/окна */}
      <path
        d="M78 64 Q120 44 175 44 Q220 46 244 60 Z"
        fill="#161616"
        stroke="#262626"
        strokeWidth="1"
      />
      {/* Фары */}
      <circle cx="300" cy="78" r="7" fill="#ffe9a8" />
      <circle cx="300" cy="78" r="14" fill="#d4af37" opacity="0.35" />
      {/* Колёса */}
      <circle cx="102" cy="95" r="18" fill="#080808" stroke="#333" strokeWidth="2" />
      <circle cx="102" cy="95" r="7" fill="#1a1a1a" />
      <circle cx="282" cy="95" r="18" fill="#080808" stroke="#333" strokeWidth="2" />
      <circle cx="282" cy="95" r="7" fill="#1a1a1a" />
      {/* Блик хрома */}
      <path d="M120 84 L250 80" stroke="#d4af37" strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}
