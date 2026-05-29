import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { SoundtrackPlayer } from '@/components/music/SoundtrackPlayer';
import { soundtrack } from '@/data/soundtrack';

export const metadata: Metadata = {
  title: 'Саундтрек',
  description: 'Плейлист Импалы: классический рок, звучавший в «Сверхъестественном».',
};

export default function SoundtrackPage() {
  return (
    <>
      <PageHeader
        eyebrow="Driver picks the music"
        title="Саундтрек"
        description="Кассеты из бардачка Импалы: Kansas, AC/DC, Bon Jovi, Styx и другие. Выберите трек — включится встроенный плеер. Фильтруйте по сезонам, где песня звучала."
      />
      <div className="container-page py-10">
        <SoundtrackPlayer tracks={soundtrack} />
      </div>
    </>
  );
}
