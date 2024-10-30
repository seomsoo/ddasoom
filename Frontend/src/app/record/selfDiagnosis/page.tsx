'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

import Ddasomi from '@/asset/Svg/shadowDdasomi.svg';
import Button from '@/components/Button';
export default function SelfDiagnosisPage() {
  const router = useRouter();
  const handleStartCheck = () => {
    router.push('/record/selfDiagnosis/check');
  };
  return (
    <div className="flex flex-col justify-center items-center gap-5 mt-14">
      <p className="font-hakgyoansimR text-2xl text-center">
        보건복지부 국립건강센터 <br />
        공황장애 진단 기준에 따른 <br /> 자가진단입니다.
      </p>
      <p className="text-xs">총 13문항으로, 다음 중 나타난 증상을 모두 골라주세요.</p>
      <Ddasomi className="mt-4" />
      <Button label="시작하기" className="mt-12" onClick={handleStartCheck} />
    </div>
  );
}
