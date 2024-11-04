'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import Button from '@/components/Button';
interface ResultContextProps {
  isPanicSuspected: boolean;
}

export default function ResultButton({ isPanicSuspected }: ResultContextProps) {
  const router = useRouter();
  const handleMoveMain = () => {
    router.push('/main');
  };
  const handleMoveTraining = () => {
    router.push('/training');
  };

  return (
    <div className="felx flex-col text-center w-full">
      {isPanicSuspected ? (
        <Button label="근처 병원 보기" className="mt-8" />
      ) : (
        <Button label="훈련하기" className="mt-3" onClick={handleMoveTraining} />
      )}
      <button className="underline underline-offset-4 mt-2 text-gray5" onClick={handleMoveMain}>
        건너뛰기
      </button>
    </div>
  );
}
