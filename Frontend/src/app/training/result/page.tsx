'use client';
import { useRouter } from 'next/navigation';

import Button from '@/components/Button';
import Ddasom from '@/svgs/ddasomi.svg';
export default function TrainingResultPage() {
  const router = useRouter();
  const handleMoveTraining = () => {
    router.push('/training');
  };

  return (
    <>
      <main className=" font-hakgyoansimR inset-0 h-screen flex flex-col items-center">
        <div className="flex flex-col items-center mt-20">
          <span className="text-4xl">잘했어요!</span>
          <Ddasom className="w-72 h-72 mt-14" />
        </div>
        <article className="text-2xl flex flex-col mt-12 ml-4">
          <span>지금의 연습이 당신을</span>
          <span className="ml-9">더 강하게 만들어 줄 거에요.</span>
        </article>
        <Button label="완료" onClick={handleMoveTraining} className="w-64 mt-32 " />
      </main>
    </>
  );
}
