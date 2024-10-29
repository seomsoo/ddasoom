'use client';
import { useRouter } from 'next/navigation';

import Ddasom from '@/asset/Svg/ddasomi.svg';
import Button from '@/components/Button';
export default function TrainingResultPage() {
  const router = useRouter();
  const handleMoveTraining = () => {
    router.push('/training');
  };

  return (
    <>
      <main className=" font-hakgyoansimR flex flex-col items-center">
        <div className="flex flex-col items-center mt-20">
          <span className="text-4xl">잘했어요!</span>
          <Ddasom className="w-52 h-44 mt-14" />
        </div>
        <article className="text-2xl flex flex-col mt-8 ml-4">
          <span>지금의 연습이 당신을</span>
          <span className="ml-12">더 강하게 만들어 줄 거에요.</span>
        </article>
        <Button label="완료" onClick={handleMoveTraining} className="w-64 mt-24 " />
      </main>
    </>
  );
}
