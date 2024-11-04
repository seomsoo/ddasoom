'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';

import Header from '@/components/Header';
import breathData from '@/constants/BreathData';

import BreathCircleAnimation from './BreathCircleAnimation';
import BreathStageDisplay from './BreathStageDisplay';

interface BreathCircleProps {
  breathType: 'shortTime' | 'basicTime' | 'longTime';
}

const circleRadius = 100;
const circumference = 2 * Math.PI * circleRadius;
const gapLength = 20;
const totalCycles = 4;

export default function BreathCircle({ breathType }: BreathCircleProps) {
  const router = useRouter();
  const [description, setDescription] = useState('');
  const [timer, setTimer] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPreparing, setIsPreparing] = useState(true);
  const [currentStage, setCurrentStage] = useState(0);
  const [currentCycle, setCurrentCycle] = useState(1);
  const [isCycleComplete, setIsCycleComplete] = useState(false);
  const [stageProgress, setStageProgress] = useState<number[]>([]);
  const [preparationIndex, setPreparationIndex] = useState(0);

  const sequence = useMemo(() => breathData[breathType].stages, [breathType]);

  useEffect(() => {
    setIsPreparing(true);
    setPreparationIndex(0);

    const interval = setInterval(() => {
      setPreparationIndex((prev) => prev + 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      setIsPreparing(false);
      setIsAnimating(true);
      setDescription(sequence[0].description);
      setStageProgress(Array(sequence.length).fill(0));
      setTimer(1);
      setCurrentStage(0);
    }, 3000);

    return () => clearInterval(interval);
  }, [sequence]);

  useEffect(() => {
    if (!isAnimating || isPreparing) return;

    const { duration } = sequence[currentStage];
    const segmentProgress = (circumference - gapLength * sequence.length) / sequence.length;

    const countdownInterval = setInterval(() => {
      setTimer((prevTime) => prevTime + 1);
    }, 1000);

    const progressInterval = setInterval(() => {
      setStageProgress((prevStageProgress) => {
        const newProgress = [...prevStageProgress];
        newProgress[currentStage] += segmentProgress / (duration / 50);
        return newProgress;
      });
    }, 50);

    const stepTimeout = setTimeout(() => {
      setCurrentStage((prevStage) => {
        const nextStage = (prevStage + 1) % sequence.length;
        setDescription(sequence[nextStage].description);
        setTimer(1);

        // 다음 단계가 첫 번째 단계로 돌아갈 때 stageProgress 초기화
        if (nextStage === 0) {
          setStageProgress(Array(sequence.length).fill(0));
          setIsCycleComplete(true); // 사이클 완료 표시
        }

        return nextStage;
      });
    }, duration);

    return () => {
      clearInterval(countdownInterval);
      clearInterval(progressInterval);
      clearTimeout(stepTimeout);
    };
  }, [isAnimating, isPreparing, currentStage, sequence]);

  useEffect(() => {
    if (isCycleComplete) {
      setCurrentCycle((prevCycle) => {
        const newCycle = prevCycle + 1;
        if (newCycle > totalCycles) {
          router.push('/training/result');
          return prevCycle;
        }
        return newCycle;
      });
      setIsCycleComplete(false); // 사이클 완료 표시 초기화
    }
  }, [isCycleComplete, router]);

  return (
    <div className='flex flex-col relative'>
      <div className='flex mt-5 -left-2 absolute'>
        <Header label=""/>
      </div>


      <div className="flex flex-col items-center justify-center gap-5 mt-24">
        <div className='h-20'>
          {isPreparing && (
            <div className="flex space-x-3 mt-3">
              {[...Array(3)].map((_, idx) => (
                <div
                  key={idx}
                  className={`w-4 h-4 rounded-full ${
                    idx <= preparationIndex ? 'bg-[#443423]' : 'bg-gray3'
                  } transition-opacity duration-300`}
                />
              ))}
            </div>
          )}

          {isAnimating && (
            <div className="text-center">
              <p className="font-hakgyoansimR text-[40px]">숨 {description}</p>
              <p className="text-2xl">{`${timer}초`}</p>
            </div>
          )}          
        </div>


        <BreathCircleAnimation
          sequenceLength={sequence.length}
          circumference={circumference}
          gapLength={gapLength}
          circleRadius={circleRadius}
          stageProgress={stageProgress}
          currentStage={currentStage}
        />

        {/* 현재 반복 횟수 표시 */}
        <div className="mt-4 text-center font-hakgyoansimR text-3xl">{`${currentCycle} / ${totalCycles}`}</div>

        <BreathStageDisplay sequence={sequence} currentStage={currentStage} />
      </div>
    </div>
  );
}
