'use client';

import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react';

import DdasomiTest from '@/svgs/ddasomi.svg';
import HeartSvg from '@/svgs/heart.svg';
import HeartLineSvg from '@/svgs/heartLine.svg';

interface BreathHeartProps {
  timing: 'shortTime' | 'basicTime' | 'longTime';
}

export default function BreathHeart({ timing }: BreathHeartProps) {
  const [scale, setScale] = useState(1); // 하트 크기
  const [description, setDescription] = useState(''); // 호흡 단계
  const [timer, setTimer] = useState(0); // 시간 초
  const [, setElapsedTime] = useState(0); // 전체 경과 시간
  const [isAnimating, setIsAnimating] = useState(false);

  const sequence = useMemo(() => {
    if (timing === 'shortTime') {
      return [
        { duration: 4000, scale: 3.5, description: '숨 들이마시기' },
        { duration: 4000, scale: 3.5, description: '숨 참기' },
        { duration: 4000, scale: 1, description: '숨 내쉬기' },
        { duration: 4000, scale: 1, description: '숨 참기' },
      ];
    } else if (timing === 'basicTime') {
      return [
        { duration: 4000, scale: 3.5, description: '숨 들이마시기' },
        { duration: 7000, scale: 3.5, description: '숨 참기' },
        { duration: 8000, scale: 1, description: '숨 내쉬기' },
      ];
    } else {
      return [
        { duration: 5000, scale: 3.5, description: '숨 들이마시기' },
        { duration: 7000, scale: 1, description: '숨 내쉬기' },
        { duration: 3000, scale: 1, description: '숨 참기' },
      ];
    }
  }, [timing]);

  const [currentStage, setCurrentStage] = useState(0);

  const handleStart = () => {
    setIsAnimating(true);
    setElapsedTime(0);
    setCurrentStage(0);
  };

  useEffect(() => {
    if (!isAnimating) return;

    const { duration, scale, description } = sequence[currentStage];

    setScale(scale);
    setDescription(description);
    setTimer(1);

    const stepTimeout = setTimeout(() => {
      setCurrentStage(prevStage => (prevStage + 1) % sequence.length);
    }, duration);

    return () => clearTimeout(stepTimeout);
  }, [isAnimating, currentStage, sequence]);

  useEffect(() => {
    if (isAnimating) {
      const countdown = setInterval(() => {
        setTimer(prevTime => prevTime + 1);
        setElapsedTime(prevElapsed => prevElapsed + 1);
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [isAnimating]);

  return (
    <div className="flex flex-col items-center">
      <p className="font-hakgyoansimR text-[40px]">{description}</p>
      <div className="text-2xl font-semibold">{timer > 0 ? `${timer}초` : ''}</div>

      <div className="relative mt-14 overflow-hidden">
        <Image src={HeartLineSvg} alt="HeartLine" width={250} height={250} />

        <div
          className="absolute bottom-4 inset-x-0 flex justify-center"
          style={{
            transform: `scale(${scale})`,
            transitionDuration: `${sequence[currentStage]?.duration || 1000}ms`,
            transformOrigin: 'bottom',
          }}>
          <Image src={HeartSvg} alt="HeartSvg" width={64} height={64} />
        </div>

        <div className="absolute bottom-4 inset-x-0 flex justify-center z-2">
          <Image src={DdasomiTest} alt="ddasomi" width={64} height={64} />
        </div>
      </div>

      {!isAnimating && (
        <button onClick={handleStart} className="mt-4" disabled={isAnimating}>
          시작하기
        </button>
      )}
    </div>
  );
}
