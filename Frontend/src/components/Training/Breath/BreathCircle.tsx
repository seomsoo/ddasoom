'use client';
import React, { useEffect, useMemo, useState } from 'react';

import Button from '@/components/Button';

import BreathCircleAnimation from './BreathCircleAnimation';
import BreathStageDisplay from './BreathStageDisplay';

interface BreathCircleProps {
  timing: 'shortTime' | 'basicTime' | 'longTime';
}

const circleRadius = 100;
const circumference = 2 * Math.PI * circleRadius;
const gapLength = 20;

export default function BreathCircle({ timing }: BreathCircleProps) {
  const [description, setDescription] = useState('');
  const [timer, setTimer] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [stageProgress, setStageProgress] = useState<number[]>([]);

  const sequence = useMemo(() => {
    if (timing === 'shortTime') {
      return [
        { duration: 4000, description: '들이마시기' },
        { duration: 4000, description: '참기' },
        { duration: 4000, description: '내쉬기' },
        { duration: 4000, description: '참기' },
      ];
    } else if (timing === 'basicTime') {
      return [
        { duration: 4000, description: '들이마시기' },
        { duration: 7000, description: '참기' },
        { duration: 8000, description: '내쉬기' },
      ];
    } else {
      return [
        { duration: 5000, description: '들이마시기' },
        { duration: 7000, description: '내쉬기' },
        { duration: 3000, description: '참기' },
      ];
    }
  }, [timing]);

  const handleStartStop = () => {
    if (isAnimating) {
      setIsAnimating(false);
      setTimer(1);
      setStageProgress([]);
      setCurrentStage(0);
      setDescription('');
    } else {
      setIsAnimating(true);
      setCurrentStage(0);
      setTimer(1);
      setDescription(sequence[0].description);
      setStageProgress(Array(sequence.length).fill(0));
    }
  };

  useEffect(() => {
    if (!isAnimating) return;

    const { duration } = sequence[currentStage];
    const segmentProgress = (circumference - gapLength * sequence.length) / sequence.length;

    const countdownInterval = setInterval(() => {
      setTimer(prevTime => prevTime + 1);
    }, 1000);

    const progressInterval = setInterval(() => {
      setStageProgress(prevStageProgress => {
        const newProgress = [...prevStageProgress];
        newProgress[currentStage] += segmentProgress / (duration / 50);
        return newProgress;
      });
    }, 50);

    const stepTimeout = setTimeout(() => {
      setCurrentStage(prevStage => {
        const nextStage = (prevStage + 1) % sequence.length;
        setDescription(sequence[nextStage].description);
        setTimer(1);

        if (nextStage === 0) {
          setStageProgress(Array(sequence.length).fill(0));
        }
        return nextStage;
      });
    }, duration);

    return () => {
      clearInterval(countdownInterval);
      clearInterval(progressInterval);
      clearTimeout(stepTimeout);
    };
  }, [isAnimating, currentStage, sequence]);

  return (
    <div className="flex flex-col items-center">
      {isAnimating && (
        <div className="text-center">
          <p className="font-hakgyoansimR text-[40px]">숨 {description}</p>
          <p className="text-2xl font-semibold">{`${timer}초`}</p>
        </div>
      )}
      <BreathCircleAnimation
        sequenceLength={sequence.length}
        circumference={circumference}
        gapLength={gapLength}
        circleRadius={circleRadius}
        stageProgress={stageProgress}
        currentStage={currentStage}
      />
      {isAnimating && <BreathStageDisplay sequence={sequence} currentStage={currentStage} />}
      <Button onClick={handleStartStop} className="mt-4" label={`${isAnimating ? '종료하기' : '시작하기'}`} />
    </div>
  );
}
