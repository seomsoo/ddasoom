import React from 'react';

interface BreathCircleAnimationProps {
  sequenceLength: number;
  circumference: number;
  gapLength: number;
  circleRadius: number;
  stageProgress: number[];
  currentStage: number;
}

const BreathCircleAnimation: React.FC<BreathCircleAnimationProps> = ({
  sequenceLength,
  circumference,
  gapLength,
  circleRadius,
  stageProgress,
  currentStage,
}) => (
  <svg width="350" height="350" viewBox="3 0 250 100" style={{ transform: 'rotate(5deg)' }}>
    {Array(sequenceLength)
      .fill(0)
      .map((_, index) => (
        <circle
          key={`gray-${index}`}
          cx="130"
          cy="50"
          r={circleRadius}
          fill="none"
          stroke="#f8fcf6"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${circumference / sequenceLength - gapLength} ${gapLength}`}
          strokeDashoffset={-((circumference / sequenceLength) * index) + circumference / 4}
        />
      ))}

    {stageProgress.map((progress, index) =>
      index <= currentStage ? (
        <circle
          key={`green-${index}`}
          cx="130"
          cy="50"
          r={circleRadius}
          fill="none"
          stroke="#6fae4d"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${progress} ${circumference - progress}`}
          strokeDashoffset={-((circumference / sequenceLength) * index) + circumference / 4}
        />
      ) : null,
    )}
  </svg>
);

export default BreathCircleAnimation;
