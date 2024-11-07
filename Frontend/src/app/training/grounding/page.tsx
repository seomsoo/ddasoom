'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Button from '@/components/Common/Button';
import Header from '@/components/Common/Header';
import AppleSvg from '@/svgs/apple.svg';
import EarSound from '@/svgs/earSound.svg';
import Footprint from '@/svgs/footPrint.svg';
import Mic from '@/svgs/groundingMic.svg';

export default function GroundingTrainingPage() {
  const GROUNDING = 'GROUNDING ';
  const [step, setStep] = useState(1);
  const router = useRouter();

  const stepContent = [
    {
      title: '지금 보이는\n이미지는 무엇인가요?',
      image: <AppleSvg className="absolute mt-7 z-0" />,
      label: '사과',
    },
    {
      title: '지금 들리는\n소리는 무엇인가요?',
      image: <EarSound className="absolute mt-12 z-0" />,
      label: '귀 소리',
    },
    {
      title: '지금 발에 닿는\n촉감은 무엇인가요?',
      image: <Footprint className="absolute mt-10 z-0" />,
      label: '발자국',
    },
  ];

  const progress = (step / stepContent.length) * 100;

  const handleNextStep = () => {
    if (step < stepContent.length) {
      setStep(step + 1);
    } else {
      router.push(`/training/result?trainingType=${GROUNDING}`);
    }
  };

  return (
    <div>
      <Header label="그라운딩" />
      <main className="px-4 mt-10 flex flex-col items-center">
        <div className="w-full flex justify-center mb-4">
          <div className="w-52 bg-gray2 rounded-full h-1.5">
            <div
              className="bg-main2 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <span className="font-hakgyoansimR text-3xl text-center">
          {stepContent[step - 1].title.split('\n').map((line, index) => (
            <span key={index}>
              {line} <br />
            </span>
          ))}
        </span>
        <div className="flex flex-col items-center mt-10">
          <div className="py-12 w-64 h-64 items-center border-[12px] border-[#9AD27D] bg-white rounded-full" />
          {stepContent[step - 1].image}
          <article className="my-6">
            <span className="text-3xl font-nanumBold text-gray5">{stepContent[step - 1].label}</span>
          </article>
          <Mic className="mb-4" />
          <div className="mt-4 w-[328px]">
            <Button label={step < stepContent.length ? '다음' : '완료'} onClick={handleNextStep} />
          </div>
        </div>
      </main>
    </div>
  );
}
