'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

import DdasomiSvg from '@/asset/Svg/shadowDdasomi.svg';
import Button from '@/components/Button';
export default function SelfDiagnosisResultPage() {
  const searchParams = useSearchParams();
  const yesCount = parseInt(searchParams.get('yesCount') || '0', 10); // 쿼리 파라미터에서 yesCount 값을 가져오기
  const isPanicSuspected = yesCount >= 4;
  const router = useRouter();
  const handleMoveMain = () => {
    router.push('/main');
  };
  const handleMoveTraining = () => {
    router.push('/training');
  };

  return (
    <main className="flex flex-col items-center">
      <div className="w-full max-w-md mt-5 text-center">
        <h3 className="text-3xl font-hakgyoansimR mb-2">{isPanicSuspected ? '괜찮으신가요?' : '괜찮습니다!'}</h3>
        <Image src={DdasomiSvg} alt="ddasomi" className="ml-16 my-6" width={200} height={200} />
        <article className="my-5 text-sm">
          {isPanicSuspected ? (
            <div>
              <p className="text-base font-nanumBold">자가진단 결과 공황 증상이 의심됩니다.</p>
              <p className="mt-4">
                가까운 병원이나 전문가와 상담을 <br />
                받아보는 것을 권유드립니다.
              </p>
              <p className="mt-4">
                혼자 고민하지 말고 <br />
                전문가의 도움을 받아보세요.
              </p>
            </div>
          ) : (
            <div>
              <p className="text-base font-nanumBold">자가진단 결과 공황 증상이 크지 않아요.</p>
              <p className="mt-4">
                하지만 걱정된다면, <br />
                호흡 연습이나 그라운딩 훈련을 <br /> 꾸준히 해보세요.
              </p>
              <p className="mt-4">
                평소에 연습하는 것만으로도 <br />큰 도움이 됩니다.
              </p>
            </div>
          )}
        </article>
      </div>
      {isPanicSuspected ? (
        <Button label="근처 병원 보기" className="mt-8" />
      ) : (
        <Button label="훈련하기" className="mt-3" onClick={handleMoveTraining} />
      )}
      <button className="underline underline-offset-4 mt-2 text-gray5" onClick={handleMoveMain}>
        건너뛰기
      </button>
    </main>
  );
}
