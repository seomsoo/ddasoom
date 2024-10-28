'use client';

import { useSearchParams } from 'next/navigation';
import React from 'react';
import DdasomiSvg from '@/asset/Svg/ddasomi.svg';
import Image from 'next/image';
export default function SelfDiagnosisResultPage() {
  const searchParams = useSearchParams();
  const yesCount = parseInt(searchParams.get('yesCount') || '0', 10); // 쿼리 파라미터에서 yesCount 값을 가져옵니다.
  console.log(yesCount);
  const isPanicSuspected = yesCount >= 4;

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-lg font-bold mb-6">자가진단</h2>
      <div className="w-full max-w-md p-6 text-center">
        <h3 className="text-2xl font-semibold mb-4">{isPanicSuspected ? '공황 증상이 의심됩니다.' : '괜찮습니다!'}</h3>
        <Image src={DdasomiSvg} alt="ddasomi" />
        <p className="text-base mb-4">
          {isPanicSuspected
            ? '가까운 병원이나 전문가와 상담을 받아보는 것을 권유드립니다. 혼자 고민하지 말고 전문가의 도움을 받아보세요.'
            : '자가진단 결과 공황 증상이 크지 않아요. 하지만 걱정된다면, 호흡 연습이나 그라운딩 훈련을 꾸준히 해보세요. 평소에 연습하는 것만으로도 큰 도움이 됩니다.'}
        </p>
      </div>
    </div>
  );
}
