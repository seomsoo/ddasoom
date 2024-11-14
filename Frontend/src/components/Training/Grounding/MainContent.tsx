'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Button from '@/components/Common/Button';
import ErrorModal from '@/components/Common/ErrorModal';
import { groundingData } from '@/constants/GroundingData';
import Mic from '@/svgs/groundingMic.svg';

import AnswerInput from './AnserInput';
import ProgressBar from './ProgressBar';
import Question from './Question';

export default function GroundingTraining() {
  const GROUNDING = 'GROUNDING';
  const router = useRouter();

  const [voiceKey, setVoiceKey] = useState<string | null>('4NL5VVlkWgBvl5S82uIN');
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorContext, setErrorContext] = useState<string>('');
  const [step, setStep] = useState(1);
  const [currentQA, setCurrentQA] = useState<{ id: string; question: string; gif: string; sound?: string } | null>(
    null,
  );
  const [inputValue, setInputValue] = useState('');

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const getRandomQA = (category: { id: string; question: string; gif: string; sound?: string }[]) => {
    const randomItem = category[Math.floor(Math.random() * category.length)];
    return { id: randomItem.id, question: randomItem.question, gif: randomItem.gif, sound: randomItem.sound };
  };

  // 앱에서 VoiceKey 받아오기
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const parsedMessage = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        if (parsedMessage.title === 'AIVOICE') {
          setVoiceKey(parsedMessage.content);
        }
      } catch (error) {
        console.error('Failed to parse message:', error);
        setErrorContext('앱으로부터 데이터를 받는 데 실패했습니다.');
        setIsErrorModalOpen(true);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  // 단계에 따라 랜덤 QA 설정
  useEffect(() => {
    if (step === 1) {
      setCurrentQA(getRandomQA(groundingData.imageQA));
    } else if (step === 2) {
      setCurrentQA(getRandomQA(groundingData.soundQA));
    } else {
      setCurrentQA(getRandomQA(groundingData.nothingQA));
    }
  }, [step]);

  // groundingURL에 따라 한 번만 오디오 재생
  useEffect(() => {
    if (!voiceKey || !currentQA) return;
    const groundingURL = `https://ddasoom.s3.ap-southeast-2.amazonaws.com/${voiceKey}-GROUNDING_${currentQA.id}.mp3`;
    const groundingAudio = new Audio(groundingURL);

    groundingAudio.play().catch(error => {
      console.error('Failed to play grounding audio:', error);
      setErrorContext('기본 음성을 재생하는 데 문제가 발생했습니다.');
      setIsErrorModalOpen(true);
    });

    return () => {
      groundingAudio.pause();
      groundingAudio.currentTime = 0;
    };
  }, [voiceKey, currentQA]);

  // step2의 currentQA.sound를 반복 재생
  useEffect(() => {
    if (step === 2 && currentQA?.sound) {
      const step2Audio = new Audio(currentQA.sound);

      step2Audio.loop = true;
      step2Audio.play().catch(error => {
        console.error('Failed to play step2 audio:', error);
        setErrorContext('음성을 재생하는 데 문제가 발생했습니다.');
        setIsErrorModalOpen(true);
      });

      return () => {
        step2Audio.pause();
        step2Audio.currentTime = 0;
      };
    }
  }, [currentQA, step]);

  // 다음 단계로 이동
  const handleNextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      setInputValue('');
    } else {
      router.push(`/training/result?trainingType=${GROUNDING}`);
    }
  };

  // 에러 모달 재시도 핸들러
  const handleRetry = () => {
    setIsErrorModalOpen(false);
  };

  return (
    <div className="px-4 flex flex-col items-center">
      {isErrorModalOpen && (
        <ErrorModal onClose={() => setIsErrorModalOpen(false)} onRetry={handleRetry} context={errorContext} />
      )}
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
