'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import Header from '@/components/Common/Header';
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
  const BREATH = 'BREATH';
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

  // 타이머와 인터벌을 추적하는 ref
  const preparationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const stepTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
      if (preparationIntervalRef.current) clearInterval(preparationIntervalRef.current);
      setIsPreparing(false);
      setIsAnimating(true);
      setDescription(sequence[0].description);
      setStageProgress(Array(sequence.length).fill(0));
      setTimer(1);
      setCurrentStage(0);

      if (sequence[0].description === '들이마시기' || sequence[0].description === '내쉬기') {
        sendVibrateRequest(sequence[0].duration);
      }
    }, 3000);

    return () => {
      if (preparationIntervalRef.current) clearInterval(preparationIntervalRef.current);
      if (stepTimeoutRef.current) clearTimeout(stepTimeoutRef.current);
    };
  }, [sequence]);

  useEffect(() => {
    if (!isAnimating || isPreparing) return;

    const { duration } = sequence[currentStage];
    const segmentProgress = (circumference - gapLength * sequence.length) / sequence.length;

    countdownIntervalRef.current = setInterval(() => {
      setTimer(prevTime => prevTime + 1);
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
        setTimer(1);

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
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      if (stepTimeoutRef.current) clearTimeout(stepTimeoutRef.current);
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

  useEffect(() => {
    return () => {
      if (preparationIntervalRef.current) clearInterval(preparationIntervalRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      if (stepTimeoutRef.current) clearTimeout(stepTimeoutRef.current);

      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          title: 'VIBRATEOFF',
          content: null,
        }),
      );
    };
  }, []);

  return (
    <div className="flex flex-col relative">
      <div className="flex mt-5 -left-2 absolute">
        <Header label="" />
      </div>

      <div className="flex flex-col items-center justify-center gap-5 mt-24">
        <div className="h-20">
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

        <div className="mt-4 text-center font-hakgyoansimR text-3xl">{`${currentCycle} / ${totalCycles}`}</div>

        <BreathStageDisplay sequence={sequence} currentStage={currentStage} />
      </div>
    </div>
  );
}
