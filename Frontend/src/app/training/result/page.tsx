import { RandomPraise } from '@/components/Training/Result/RandomPraise';
import ResultButton from '@/components/Training/Result/ResultButton';

interface TrainingResultPageProps {
  searchParams: { trainingType: string };
}

export default function TrainingResultPage({ searchParams }: TrainingResultPageProps) {
  const trainingType = searchParams.trainingType;

  return (
    <main className="font-hakgyoansimR flex flex-col items-center gap-10">
      <div className="flex flex-col items-center mt-16">
        <RandomPraise />
      </div>
      <ResultButton trainingType={trainingType} />
    </main>
  );
}
