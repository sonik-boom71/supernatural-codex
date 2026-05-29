import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { Quiz } from '@/components/interactive/Quiz';

export const metadata: Metadata = {
  title: 'Тест: кто ты из охотников?',
  description: 'Пройди тест и узнай, на кого из персонажей «Сверхъестественного» ты похож.',
};

export default function QuizPage() {
  return (
    <>
      <PageHeader
        eyebrow="Тест личности"
        title="Кто ты из охотников?"
        description="Шесть вопросов о твоём характере и подходе к делу. В конце — твой персонаж из вселенной «Сверхъестественного»."
      />
      <div className="container-page py-10">
        <div className="mx-auto max-w-3xl">
          <Quiz />
        </div>
      </div>
    </>
  );
}
