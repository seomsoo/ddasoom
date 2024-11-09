'use client';
import 'react-step-progress-bar/styles.css';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ProgressBar, Step } from 'react-step-progress-bar';

import Ddasom from '/public/images/breathddasom.png';
import Header from '@/components/Common/Header';
import breathData from '@/constants/BreathData';
import Footer from '@/svgs/breathfooter.svg';

import BreathCircleAnimation from './BreathCircleAnimation';
// import BreathStageDisplay from './BreathStageDisplay';

interface BreathCircleProps {
  breathType: 'shortTime' | 'basicTime' | 'longTime';
}

const circleRadius = 100;
const circumference = 2 * Math.PI * circleRadius;
const gapLength = 20;
const totalCycles = 4;

export default function BreathCircle({ breathType }: BreathCircleProps) {
  const BREATH = 'BREATH';
  const router = useRouter();
  const [description, setDescription] = useState('');
  const [timer, setTimer] = useState(1); // timer 초기값
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPreparing, setIsPreparing] = useState(true);
  const [currentStage, setCurrentStage] = useState(0);
  const [currentCycle, setCurrentCycle] = useState(1); // 첫 단계에서 시작
  const [isCycleComplete, setIsCycleComplete] = useState(false);
  const [stageProgress, setStageProgress] = useState<number[]>([]);
  const [preparationIndex, setPreparationIndex] = useState(0);

  const sequence = useMemo(() => breathData[breathType].stages, [breathType]);
  // 진행률(%) 계산
  const stepProgress = 100 / (totalCycles - 1);
  const progressPercent = Math.min((currentCycle - 1) * stepProgress, 100);

  // 완료된 단계마다 체크 표시를 렌더링
  const renderStepIcon = (index: number) => (
    <div
      style={{
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: index < currentCycle ? '#64e277' : '#d7dad5',
        color: index < currentCycle ? '#fdf9f9' : '#000',
      }}>
      {index < currentCycle ? '✓' : ''}
    </div>
  );

  // 타이머와 인터벌을 추적하는 ref (기본값을 undefined로 설정)
  const preparationIntervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const countdownIntervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const progressIntervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const stepTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // 진동 요청 함수
  const sendVibrateRequest = (duration: number) => {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        title: 'VIBRATE',
        content: duration,
      }),
    );
  };

  useEffect(() => {
    setIsPreparing(true);
    setPreparationIndex(0);

    preparationIntervalRef.current = setInterval(() => {
      setPreparationIndex(prev => prev + 1);
    }, 1000);

    stepTimeoutRef.current = setTimeout(() => {
      if (preparationIntervalRef.current !== undefined) clearInterval(preparationIntervalRef.current);
      setIsPreparing(false);
      setIsAnimating(true);
      setDescription(sequence[0].description);
      setStageProgress(Array(sequence.length).fill(0));
      setTimer(sequence[0].duration); // 첫 단계의 duration으로 timer 설정
      setCurrentStage(0);
      setCurrentCycle(1);

      if (sequence[0].description === '들이마시기' || sequence[0].description === '내쉬기') {
        sendVibrateRequest(sequence[0].duration);
      }
    }, 3000);

    return () => {
      if (preparationIntervalRef.current !== undefined) clearInterval(preparationIntervalRef.current);
      if (stepTimeoutRef.current !== undefined) clearTimeout(stepTimeoutRef.current);
    };
  }, [sequence]);

  useEffect(() => {
    if (!isAnimating || isPreparing) return;

    const { duration } = sequence[currentStage];
    setTimer(duration / 1000); // 각 단계의 duration으로 timer 설정
    const segmentProgress = (circumference - gapLength * sequence.length) / sequence.length;

    countdownIntervalRef.current = setInterval(() => {
      setTimer(prevTime => {
        if (prevTime <= 1) {
          if (countdownIntervalRef.current !== undefined) clearInterval(countdownIntervalRef.current);
          return 0;
        }
        return prevTime - 1; // 매 초마다 1씩 감소
      });
    }, 1000);

    progressIntervalRef.current = setInterval(() => {
      setStageProgress(prevStageProgress => {
        const newProgress = [...prevStageProgress];
        newProgress[currentStage] += segmentProgress / (duration / 50);
        return newProgress;
      });
    }, 50);

    stepTimeoutRef.current = setTimeout(() => {
      setCurrentStage(prevStage => {
        const nextStage = (prevStage + 1) % sequence.length;
        setDescription(sequence[nextStage].description);
        setTimer(sequence[nextStage].duration); // 다음 단계의 duration으로 timer 재설정

        if (sequence[nextStage].description === '들이마시기' || sequence[nextStage].description === '내쉬기') {
          sendVibrateRequest(sequence[nextStage].duration);
        }

        if (nextStage === 0) {
          setStageProgress(Array(sequence.length).fill(0));
          setIsCycleComplete(true);
        }

        return nextStage;
      });
    }, duration);

    return () => {
      if (countdownIntervalRef.current !== undefined) clearInterval(countdownIntervalRef.current);
      if (progressIntervalRef.current !== undefined) clearInterval(progressIntervalRef.current);
      if (stepTimeoutRef.current !== undefined) clearTimeout(stepTimeoutRef.current);
    };
  }, [isAnimating, isPreparing, currentStage, sequence]);

  useEffect(() => {
    if (isCycleComplete) {
      setCurrentCycle(prevCycle => {
        const newCycle = prevCycle + 1;
        if (newCycle > totalCycles) {
          router.push(`/training/result?trainingType=${BREATH}`);
          return prevCycle;
        }
        return newCycle;
      });
      setIsCycleComplete(false);
    }
  }, [isCycleComplete, router]);

  return (
    <div className="flex flex-col relative">
      <div className=" w-full fixed bottom-0 -left-1">
        <Footer />
      </div>
      <div className="flex mt-5 -left-2 absolute">
        <Header label="" />
      </div>
      <div className="mt-20 flex justify-center w-full mx-auto">
        <div className="w-72">
          <ProgressBar percent={progressPercent} filledBackground="#82e090" unfilledBackground="#e0e0e0">
            {Array.from({ length: totalCycles }).map((_, index) => (
              <Step key={index}>{() => renderStepIcon(index)}</Step>
            ))}
          </ProgressBar>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-5 mt-10">
        <div className="h-20 ">
          {isPreparing && (
            <div className="flex flex-col items-center space-y-2 mt-3">
              <span className="text-center text-lg font-hakgyoansimR">곧 호흡이 시작돼요!</span>
              <div className="flex space-x-3">
                {[...Array(3)].map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-4 h-4 rounded-full ${
                      idx <= preparationIndex ? 'bg-[#34c449]' : 'bg-gray3'
                    } transition-opacity duration-300`}
                  />
                ))}
              </div>
            </div>
          )}

          {isAnimating && (
            <div className="text-center mt-4">
              <p className="font-hakgyoansimR text-5xl">숨 {description}</p>
              <p className="mt-2 font-hakgyoansimR text-3xl ">{`${timer}초`}</p>
            </div>
          )}
        </div>
        <div className="bg-[#b0e4b7]   rounded-full w-[240px] h-[240px] absolute bottom-14" />
        <article className="absolute bottom-12  ">
          <Image src={Ddasom} alt="Ddasom" width={205} height={170} className=" rounded-full " />
        </article>
        <BreathCircleAnimation
          sequenceLength={sequence.length}
          circumference={circumference}
          gapLength={gapLength}
          circleRadius={circleRadius}
          stageProgress={stageProgress}
          currentStage={currentStage}
        />

        {/* <BreathStageDisplay sequence={sequence} currentStage={currentStage} /> */}
      </div>
    </div>
  );
}
