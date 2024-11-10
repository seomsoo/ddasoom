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
  const [currentQA, setCurrentQA] = useState<{ question: string; answer: React.ReactNode } | null>(null);
  const [inputValue, setInputValue] = useState('');

  const getRandomQA = (category: { questions: string[]; answers: React.ReactNode[] }) => {
    const randomQuestion = category.questions[Math.floor(Math.random() * category.questions.length)];
    const randomAnswer = category.answers[Math.floor(Math.random() * category.answers.length)];
    return { question: randomQuestion, answer: randomAnswer };
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
    <div className="px-4 mt-10 flex flex-col items-center">
      <ProgressBar progress={progress} />
      {currentQA && (
        <>
          <Question question={currentQA.question} answer={currentQA.answer} />
          <AnswerInput value={inputValue} onChange={e => setInputValue(e.target.value)} />
        </>
      )}
      <Mic className="mb-4" />
      <div className="mt-4 w-[328px]">
        <Button label={step < totalSteps ? '다음' : '완료'} onClick={handleNextStep} disabled={!inputValue.trim()} />
      </div>
    </div>
  );
}
