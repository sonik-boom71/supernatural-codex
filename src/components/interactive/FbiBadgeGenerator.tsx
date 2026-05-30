'use client';

import { useCallback, useEffect, useRef, useState, type ChangeEvent } from 'react';
import { Upload, Download, Shuffle, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Agency {
  id: string;
  dept: string;
  org: string;
  short: string;
  title: string;
}

const AGENCIES: Agency[] = [
  {
    id: 'fbi',
    dept: 'U.S. DEPARTMENT OF JUSTICE',
    org: 'FEDERAL BUREAU OF INVESTIGATION',
    short: 'FBI',
    title: 'SPECIAL AGENT',
  },
  {
    id: 'cdc',
    dept: 'U.S. DEPARTMENT OF HEALTH',
    org: 'CENTERS FOR DISEASE CONTROL',
    short: 'CDC',
    title: 'FIELD OFFICER',
  },
  {
    id: 'marshal',
    dept: 'U.S. DEPARTMENT OF JUSTICE',
    org: 'UNITED STATES MARSHALS',
    short: 'USMS',
    title: 'DEPUTY MARSHAL',
  },
];

// Псевдонимы Винчестеров — фамилии и имена рок-музыкантов
const ROCK_ALIASES = [
  'Robert Plant', 'Jimmy Page', 'John Bonham', 'James Hetfield', 'Lars Ulrich',
  'Dennis DeYoung', 'Freddie Mercury', 'Brian May', 'Roger Taylor', 'Angus Young',
  'Ozzy Osbourne', 'Steven Tyler', 'Joe Perry', 'Geddy Lee', 'Neil Peart',
  'David Gilmour', 'Roger Waters', 'Eddie Van Halen', 'Jon Bon Jovi', 'Tom Petty',
];

const OFFICES = [
  'Quantico, VA', 'Kansas City, MO', 'Sioux Falls, SD',
  'Austin, TX', 'Lebanon, KS', 'Lawrence, KS',
];

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number, y: number, w: number, h: number,
) {
  const ir = img.width / img.height;
  const r = w / h;
  let sw: number, sh: number, sx: number, sy: number;
  if (ir > r) {
    sh = img.height; sw = sh * r; sx = (img.width - sw) / 2; sy = 0;
  } else {
    sw = img.width; sh = sw / r; sx = 0; sy = (img.height - sh) / 2;
  }
  ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
}

function drawFilledStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, R: number) {
  const r = R * 0.46;
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const ang = -Math.PI / 2 + (i * Math.PI) / 5;
    const rad = i % 2 ? r : R;
    const x = cx + rad * Math.cos(ang);
    const y = cy + rad * Math.sin(ang);
    if (i) ctx.lineTo(x, y);
    else ctx.moveTo(x, y);
  }
  ctx.closePath();
}

function strokePentagram(ctx: CanvasRenderingContext2D, cx: number, cy: number, R: number) {
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.stroke();
  const pts: [number, number][] = [];
  for (let i = 0; i < 5; i++) {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
    pts.push([cx + R * 0.8 * Math.cos(a), cy + R * 0.8 * Math.sin(a)]);
  }
  const order = [0, 2, 4, 1, 3];
  ctx.beginPath();
  ctx.moveTo(pts[order[0]][0], pts[order[0]][1]);
  for (let i = 1; i < 5; i++) ctx.lineTo(pts[order[i]][0], pts[order[i]][1]);
  ctx.closePath();
  ctx.stroke();
}

export function FbiBadgeGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [name, setName] = useState('Dean Winchester');
  const [agency, setAgency] = useState<Agency>(AGENCIES[0]);
  const [img, setImg] = useState<HTMLImageElement | null>(null);

  const onFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => setImg(image);
      image.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = 680, H = 430, DPR = 2;
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    ctx.save();
    ctx.scale(DPR, DPR);
    ctx.clearRect(0, 0, W, H);

    // Карта-фон
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#1b1710');
    g.addColorStop(1, '#0b0906');
    roundRect(ctx, 6, 6, W - 12, H - 12, 18);
    ctx.fillStyle = g;
    ctx.fill();

    // Водяной знак — пентаграмма
    ctx.save();
    ctx.globalAlpha = 0.05;
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 5;
    strokePentagram(ctx, W / 2, H / 2 + 6, 150);
    ctx.restore();

    // Рамки
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#d4af37';
    roundRect(ctx, 6, 6, W - 12, H - 12, 18);
    ctx.stroke();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(212,175,55,0.35)';
    roundRect(ctx, 16, 16, W - 32, H - 32, 12);
    ctx.stroke();

    // Шапка
    ctx.textAlign = 'center';
    ctx.fillStyle = '#b8ad96';
    ctx.font = '13px Georgia';
    ctx.fillText(agency.dept, W / 2, 46);
    ctx.fillStyle = '#d4af37';
    ctx.font = 'bold 22px Georgia';
    ctx.fillText(agency.org, W / 2, 72);
    ctx.strokeStyle = 'rgba(212,175,55,0.35)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(40, 86);
    ctx.lineTo(W - 40, 86);
    ctx.stroke();

    // Фото
    const px = 40, py = 104, pw = 176, ph = 212;
    ctx.fillStyle = '#0a0a0a';
    roundRect(ctx, px, py, pw, ph, 6);
    ctx.fill();
    if (img) {
      ctx.save();
      roundRect(ctx, px + 4, py + 4, pw - 8, ph - 8, 4);
      ctx.clip();
      drawCover(ctx, img, px + 4, py + 4, pw - 8, ph - 8);
      ctx.restore();
    } else {
      ctx.fillStyle = '#211c14';
      roundRect(ctx, px + 4, py + 4, pw - 8, ph - 8, 4);
      ctx.fill();
      ctx.fillStyle = '#3a3326';
      ctx.beginPath();
      ctx.arc(px + pw / 2, py + 78, 32, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(px + pw / 2, py + 188, 56, 62, 0, Math.PI, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#6b6358';
      ctx.font = '11px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('ЗАГРУЗИ ФОТО', px + pw / 2, py + ph - 14);
    }
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#d4af37';
    roundRect(ctx, px, py, pw, ph, 6);
    ctx.stroke();

    // Правая колонка
    const rx = 244;
    const h = hashStr((name || 'agent') + agency.id);
    ctx.textAlign = 'left';
    ctx.fillStyle = '#d4af37';
    ctx.font = 'bold 58px Arial';
    ctx.fillText(agency.short, rx, 152);

    ctx.fillStyle = '#6b6358';
    ctx.font = '11px Arial';
    ctx.fillText('NAME', rx, 184);
    ctx.fillStyle = '#f5f1e8';
    ctx.font = 'bold 25px Arial';
    ctx.fillText(name || '—', rx, 210);

    ctx.fillStyle = '#6b6358';
    ctx.font = '11px Arial';
    ctx.fillText('TITLE', rx, 238);
    ctx.fillStyle = '#d4af37';
    ctx.font = 'bold 15px Arial';
    ctx.fillText(agency.title, rx, 257);

    const idno = `${1000 + (h % 9000)}-${10 + (h % 89)}`;
    const office = OFFICES[h % OFFICES.length];
    ctx.fillStyle = '#6b6358';
    ctx.font = '11px Arial';
    ctx.fillText('ID NO.', rx, 288);
    ctx.fillText('FIELD OFFICE', rx + 150, 288);
    ctx.fillStyle = '#e8e0c8';
    ctx.font = '14px "Courier New", monospace';
    ctx.fillText(idno, rx, 306);
    ctx.fillText(office, rx + 150, 306);

    // Подпись
    ctx.fillStyle = '#6b6358';
    ctx.font = '11px Arial';
    ctx.fillText('SIGNATURE', rx, 338);
    ctx.fillStyle = '#e8e0c8';
    ctx.font = 'italic 23px Georgia';
    ctx.fillText(name || '—', rx, 364);
    ctx.strokeStyle = 'rgba(212,175,55,0.4)';
    ctx.beginPath();
    ctx.moveTo(rx, 372);
    ctx.lineTo(rx + 210, 372);
    ctx.stroke();

    // Печать-звезда
    ctx.save();
    ctx.translate(W - 78, 250);
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 2.5;
    ctx.fillStyle = 'rgba(212,175,55,0.1)';
    ctx.beginPath();
    ctx.arc(0, 0, 42, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 2;
    strokePentagram(ctx, 0, 0, 42);
    drawFilledStar(ctx, 0, 0, 22);
    ctx.fillStyle = 'rgba(212,175,55,0.85)';
    ctx.fill();
    ctx.restore();

    // MRZ-полоса
    ctx.fillStyle = '#0a0a0a';
    roundRect(ctx, 40, H - 46, W - 80, 22, 3);
    ctx.fill();
    const mrz = ('SPN<<' + (name || 'AGENT').toUpperCase().replace(/[^A-Z]/g, '<'))
      .padEnd(44, '<')
      .slice(0, 44);
    ctx.fillStyle = '#6b6358';
    ctx.font = '12px "Courier New", monospace';
    ctx.fillText(mrz, 50, H - 31);

    ctx.restore();
  }, [name, agency, img]);

  useEffect(() => {
    draw();
  }, [draw]);

  const randomAlias = () => {
    setName(ROCK_ALIASES[Math.floor(Math.random() * ROCK_ALIASES.length)]);
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `hunters-codex-badge-${(name || 'agent').toLowerCase().replace(/\s+/g, '-')}.png`;
    a.click();
  };

  const share = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], 'hunter-badge.png', { type: 'image/png' });
      const nav = navigator as Navigator & {
        canShare?: (d: { files: File[] }) => boolean;
      };
      if (nav.canShare?.({ files: [file] }) && nav.share) {
        nav
          .share({ files: [file], title: 'Моё удостоверение охотника' })
          .catch(() => {});
      } else {
        download();
      }
    }, 'image/png');
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr,360px]">
      {/* Превью-удостоверение */}
      <div className="card-paper flex items-center justify-center bg-fog-radial p-5 sm:p-8">
        <canvas
          ref={canvasRef}
          aria-label="Удостоверение охотника"
          className="h-auto w-full max-w-[680px] rounded-md shadow-glow-lg"
        />
      </div>

      {/* Управление */}
      <div className="space-y-6">
        <div>
          <label className="font-mono text-[11px] uppercase tracking-widest text-ash">
            Имя агента
          </label>
          <div className="mt-1.5 flex gap-2">
            <input
              type="text"
              value={name}
              maxLength={28}
              onChange={(e) => setName(e.target.value)}
              placeholder="Dean Winchester"
              className="w-full rounded-sm border border-impala/20 bg-asphalt px-4 py-2.5 text-sm text-bone placeholder:text-ash focus:border-impala/50 focus:outline-none"
            />
            <button
              type="button"
              onClick={randomAlias}
              title="Случайный рок-псевдоним"
              className="shrink-0 rounded-sm border border-impala/30 px-3 text-impala transition-colors hover:bg-impala/10"
            >
              <Shuffle className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-1 text-[11px] text-ash">
            Кнопка ⤬ — псевдоним рок-музыканта, как у Винчестеров.
          </p>
        </div>

        <div>
          <label className="font-mono text-[11px] uppercase tracking-widest text-ash">
            Ведомство
          </label>
          <div className="mt-1.5 grid grid-cols-3 gap-2">
            {AGENCIES.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => setAgency(a)}
                className={cn(
                  'rounded-sm border px-2 py-2 font-display text-sm uppercase tracking-wider transition-colors',
                  agency.id === a.id
                    ? 'border-impala bg-impala/15 text-impala'
                    : 'border-impala/20 text-parchment hover:border-impala/50',
                )}
              >
                {a.short}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="font-mono text-[11px] uppercase tracking-widest text-ash">
            Фото
          </label>
          <label className="mt-1.5 flex cursor-pointer items-center justify-center gap-2 rounded-sm border border-dashed border-impala/40 bg-asphalt px-4 py-4 text-sm text-parchment transition-colors hover:border-impala/70 hover:text-impala">
            <Upload className="h-4 w-4" />
            {img ? 'Заменить фото' : 'Загрузить фото'}
            <input type="file" accept="image/*" onChange={onFile} className="hidden" />
          </label>
          <p className="mt-1 text-[11px] text-ash">
            Фото обрабатывается прямо в браузере и никуда не отправляется.
          </p>
        </div>

        <div className="flex gap-3 pt-2">
          <button type="button" onClick={download} className="btn-ember flex-1 justify-center text-sm">
            <Download className="h-4 w-4" /> Скачать
          </button>
          <button
            type="button"
            onClick={share}
            className="flex items-center justify-center gap-2 rounded-sm border border-impala/40 px-4 py-3 font-display uppercase tracking-widest text-impala transition-colors hover:bg-impala/10"
          >
            <Share2 className="h-4 w-4" /> Поделиться
          </button>
        </div>

        <p className="border-t border-impala/15 pt-4 text-[11px] leading-relaxed text-ash">
          Шуточный документ для фанатов. Не является настоящим удостоверением и
          не имеет юридической силы — «Saving people, hunting things».
        </p>
      </div>
    </div>
  );
}
