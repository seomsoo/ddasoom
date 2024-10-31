'use client';
import React, { useEffect, useMemo, useState } from 'react';

import Button from '@/components/Button';

interface BreathCircleProps {
  timing: 'shortTime' | 'basicTime' | 'longTime';
}
// 컴포넌트 외부에 상수로 정의
const circleRadius = 100; // 반지름
const circumference = 2 * Math.PI * circleRadius; // 전체 원 둘레
const gapLength = 20; // 각 구간 사이의 간격

export default function BreathCircle({ timing }: BreathCircleProps) {
  const [description, setDescription] = useState(''); // 호흡 단계
  const [timer, setTimer] = useState(1); // 현재 단계의 시간
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStage, setCurrentStage] = useState(0); // 현재 단계 인덱스
  const [stageProgress, setStageProgress] = useState<number[]>([]); // 각 단계별 초록색 구간 저장

  // 호흡 단계 설정
  const sequence = useMemo(() => {
    if (timing === 'shortTime') {
      return [
        { duration: 4000, description: '숨 들이마시기' },
        { duration: 4000, description: '숨 참기' },
        { duration: 4000, description: '숨 내쉬기' },
        { duration: 4000, description: '숨 참기' },
      ];
    } else if (timing === 'basicTime') {
      return [
        { duration: 4000, description: '숨 들이마시기' },
        { duration: 7000, description: '숨 참기' },
        { duration: 8000, description: '숨 내쉬기' },
      ];
    } else {
      return [
        { duration: 5000, description: '숨 들이마시기' },
        { duration: 7000, description: '숨 내쉬기' },
        { duration: 3000, description: '숨 참기' },
      ];
    }
  }, [timing]);

  const handleStartStop = () => {
    if (isAnimating) {
      setIsAnimating(false); // 종료하기 버튼을 누르면 애니메이션 중지
      setTimer(1); // 타이머를 초기화
      setStageProgress([]); // 진행률을 빈 배열로 설정하여 숨김
      setCurrentStage(0); // 현재 단계를 초기화
      setDescription(''); // 단계 설명 초기화
    } else {
      setIsAnimating(true);
      setCurrentStage(0);
      setTimer(1); // 타이머를 1초부터 시작
      setDescription(sequence[0].description);
      setStageProgress(Array(sequence.length).fill(0)); // 각 단계별 진행률 초기화
    }
  };

  useEffect(() => {
    if (!isAnimating) return;

    const { duration } = sequence[currentStage];
    const segmentProgress = (circumference - gapLength * sequence.length) / sequence.length;

    const countdownInterval = setInterval(() => {
      setTimer(prevTime => prevTime + 1); // 1초마다 타이머 증가
    }, 1000);

    const progressInterval = setInterval(() => {
      setStageProgress(prevStageProgress => {
        const newProgress = [...prevStageProgress];
        newProgress[currentStage] += segmentProgress / (duration / 50);
        return newProgress;
      });
    }, 50); // 각 단계에서 점진적으로 채워짐

    const stepTimeout = setTimeout(() => {
      setCurrentStage(prevStage => {
        const nextStage = (prevStage + 1) % sequence.length;
        setDescription(sequence[nextStage].description);
        setTimer(1); // 다음 단계 시작 시 타이머를 1초로 리셋

        if (nextStage === 0) {
          setStageProgress(Array(sequence.length).fill(0)); // 한 바퀴가 끝나면 진행률 초기화
        }
        return nextStage;
      });
    }, duration);

    return () => {
      clearInterval(countdownInterval);
      clearInterval(progressInterval);
      clearTimeout(stepTimeout);
    };
  }, [isAnimating, currentStage, sequence]); // circumference가 의존성에서 제거됨

  return (
    <div className="flex flex-col items-center">
      <p className="font-hakgyoansimR text-[40px]">{description}</p>
      {isAnimating ? <div className="text-2xl font-semibold">{`${timer}초`}</div> : ''}

      <svg width="350" height="350" viewBox="0 0 250 100" style={{ transform: 'rotate(-90deg)' }}>
        {/* 전체 회색 원 구간을 나누어 그리기 */}
        {Array(sequence.length)
          .fill(0)
          .map((_, index) => (
            <circle
              key={`gray-${index}`}
              cx="130"
              cy="50"
              r={circleRadius}
              fill="none"
              stroke="#f8fcf6"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${circumference / sequence.length - gapLength} ${gapLength}`}
              strokeDashoffset={-((circumference / sequence.length) * index) + circumference / 4} // 시작 위치를 12시 방향으로 조정
            />
          ))}

        {/* 현재 및 이전 단계에 맞춰 초록색 원 구간을 표시 */}
        {isAnimating &&
          stageProgress.map(
            (progress, index) =>
              index <= currentStage ? ( // 현재 단계와 이전 단계만 표시
                <circle
                  key={`green-${index}`}
                  cx="130"
                  cy="50"
                  r={circleRadius}
                  fill="none"
                  stroke="#6fae4d"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${progress} ${circumference - progress}`} // 구간별 진행률 반영
                  strokeDashoffset={-((circumference / sequence.length) * index) + circumference / 4} // 단계별로 시작 위치 조정
                />
              ) : null, // 이후 단계는 표시 안 함
          )}
      </svg>
      <Button onClick={handleStartStop} className="mt-4" label={`${isAnimating ? '종료하기' : '시작하기'}`} />
    </div>
  );
}
