import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { GuessEpisode } from '@/components/interactive/GuessEpisode';

export const metadata: Metadata = {
  title: 'Квиз: угадай серию',
  description: 'Определи эпизод «Сверхъестественного» по описанию дела.',
};

export default function GuessEpisodePage() {
  return (
    <>
      <PageHeader
        eyebrow="Квиз на память"
        title="Угадай серию"
        description="Перед тобой описание дела из архива. Выбери, какой это эпизод. Серия угадываний без ограничений — проверь, насколько хорошо ты знаешь канон."
      />
      <div className="container-page py-10">
        <div className="mx-auto max-w-3xl">
          <GuessEpisode />
        </div>
      </div>
    </>
  );
}
