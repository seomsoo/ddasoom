import React from 'react';

import DdasomiSvg from '@/svgs/shadowDdasomi.svg';
interface ResultContextProps {
  isPanicSuspected: boolean;
}

export default function ResultContext({ isPanicSuspected }: ResultContextProps) {
  return (
    <div className="w-full max-w-md mt-20 text-center">
      <h3 className="text-3xl font-hakgyoansimR mb-6">{isPanicSuspected ? '괜찮으신가요?' : '괜찮습니다!'}</h3>
      <DdasomiSvg className="w-full my-10" width={200} height={200} />
      <article className="my-6 text-sm">
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
  );
}
