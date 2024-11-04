import Link from 'next/link';

import { RandomPraise } from '@/components/Training/RandomPraise';

export default function TrainingResultPage() {
  return (
    <>
      <main className="font-hakgyoansimR flex flex-col items-center gap-10">
        <div className="flex flex-col items-center mt-16">
          <RandomPraise />
        </div>
        <Link
          href="/training"
          className="font-nanumBold text-xl text-center w-full py-3 rounded-3xl text-main3 bg-button1">
          완료
        </Link>
      </main>
    </>
  );
}
