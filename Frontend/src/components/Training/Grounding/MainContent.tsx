'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Button from '@/components/Common/Button';
import { groundingData } from '@/constants/GroundingData';
import Mic from '@/svgs/groundingMic.svg';

import AnswerInput from './AnserInput';
import ProgressBar from './ProgressBar';
import Question from './Question';

export default function GroundingTraining() {
  const GROUNDING = 'GROUNDING';
  const router = useRouter();

  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const [currentQA, setCurrentQA] = useState<{ question: string; gif: string; sound?: string } | null>(null);
  const [inputValue, setInputValue] = useState('');

  const getRandomQA = (category: { question: string; gif: string; sound?: string }[]) => {
    const randomItem = category[Math.floor(Math.random() * category.length)];
    return { question: randomItem.question, gif: randomItem.gif, sound: randomItem.sound };
  };

  useEffect(() => {
    if (step === 1) {
      setCurrentQA(getRandomQA(groundingData.imageQA));
    } else if (step === 2) {
      setCurrentQA(getRandomQA(groundingData.soundQA));
    } else {
      setCurrentQA(getRandomQA(groundingData.nothingQA));
    }
  }, [step]);

  useEffect(() => {
    let audio: HTMLAudioElement | undefined;
    if (currentQA?.sound) {
      audio = new Audio(currentQA.sound);
      audio.play();
    }

    // 언마운트 또는 단계 변경 시 사운드 정지
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [currentQA]);

  const progress = (step / totalSteps) * 100;

  const handleNextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      setInputValue('');
    } else {
      router.push(`/training/result?trainingType=${GROUNDING}`);
    }
  };

  return (
    <div className="px-4 flex flex-col items-center">
      <ProgressBar progress={progress} />
      {currentQA && (
        <>
          <Question question={currentQA.question} gif={currentQA.gif} />
          <AnswerInput value={inputValue} onChange={e => setInputValue(e.target.value)} />
        </>
      )}
      <Mic className="my-4" />
      <div className="w-[328px] mt-4">
        <Button label={step < totalSteps ? '다음' : '완료'} onClick={handleNextStep} disabled={!inputValue.trim()} />
      </div>
    </div>
  );
}
