import React from "react";
import styled from "styled-components/native";
import { Svg, Circle, G } from "react-native-svg";

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
}) => {
  const segmentLength = circumference / sequenceLength - gapLength;

  return (
    <Svg width="350" height="350" viewBox="5 -75 250 250">
      <G transform="rotate(5, 130, 50)">
        {/* 배경 원 */}
        {Array(sequenceLength)
          .fill(0)
          .map((_, index) => (
            <StyledCircle
              key={`gray-${index}`}
              cx="130"
              cy="50"
              r={circleRadius}
              fill="none"
              stroke="#f8fcf6"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${segmentLength} ${gapLength}`}
              strokeDashoffset={-(segmentLength + gapLength) * index + circumference / 4}
            />
          ))}

        {/* 프로그레스 원 */}
        {stageProgress.map((progress, index) =>
          index <= currentStage ? (
            <StyledCircle
              key={`green-${index}`}
              cx="130"
              cy="50"
              r={circleRadius}
              fill="none"
              stroke="#3fdb92"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${progress} ${circumference - progress}`}
              strokeDashoffset={-(segmentLength + gapLength) * index + circumference / 4}
            />
          ) : null,
        )}
      </G>
    </Svg>
  );
};

export default BreathCircleAnimation;

const StyledCircle = styled(Circle).attrs({
  fill: "none",
})``;
