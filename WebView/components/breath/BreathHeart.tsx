import { View, Text, Animated, TouchableOpacity, Image, Vibration } from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import HeartSvg from "@/assets/svgs/heart.svg";
import HeartLineSvg from "@/assets/svgs/heartLine.svg";
import Ddasomi from "@/assets/svgs/ddasomi.svg";
import Button from "../common/Button";
import theme from "@/styles/Theme";
import { router } from "expo-router";

interface BreathHeartProps {
  timing: "shortTime" | "basicTime" | "longTime";
}

const BreathHeart = ({ timing }: BreathHeartProps) => {
  const [description, setDescription] = useState(""); // 호흡 단계
  const [timer, setTimer] = useState(0); // 시간 초
  const [, setElapsedTime] = useState(0); // 전체 경과 시간
  const [isAnimating, setIsAnimating] = useState(false);
  const [goalTime, setGoalTime] = useState(0); // 목표 시간
  const scale = useRef(new Animated.Value(1)).current; // Animated 값으로 하트 크기 설정

  const sequence = useMemo(() => {
    if (timing === "shortTime") {
      return [
        { duration: 4000, scale: 3, description: "숨 들이마시기" },
        { duration: 4000, scale: 3, description: "숨 참기" },
        { duration: 4000, scale: 1, description: "숨 내쉬기" },
        { duration: 4000, scale: 1, description: "숨 참기" },
      ];
    } else if (timing === "basicTime") {
      return [
        { duration: 4000, scale: 3, description: "숨 들이마시기" },
        { duration: 7000, scale: 3, description: "숨 참기" },
        { duration: 8000, scale: 1, description: "숨 내쉬기" },
        { duration: 1000, scale: 1, description: "숨 참기" },
      ];
    } else {
      return [
        { duration: 5000, scale: 3, description: "숨 들이마시기" },
        { duration: 4000, scale: 1, description: "숨 참기" },
        { duration: 7000, scale: 1, description: "숨 내쉬기" },
        { duration: 1000, scale: 1, description: "숨 참기" },
      ];
    }
  }, [timing]);

  const [currentStage, setCurrentStage] = useState(0);

  const handleStart = () => {
    setIsAnimating(true);
    setElapsedTime(0);
    setCurrentStage(0);
  };

  const handleEnd = () => {
    scale.setValue(1); // 초기 크기로 설정
    setTimer(0);
    setIsAnimating(false);
    Vibration.cancel(); // 진동 취소

    router.push("breath/breathEndModal");
  };

  useEffect(() => {
    if (!isAnimating) return;

    const { duration, scale: targetScale, description } = sequence[currentStage];

    setDescription(description);
    setTimer(1);
    setGoalTime(duration / 1000);

    // Inhale and Exhale 단계에서만 진동 시작
    if (description === "숨 들이마시기" || description === "숨 내쉬기") {
      Vibration.vibrate(duration); // 해당 단계의 duration 동안 진동
    } else {
      Vibration.cancel(); // 숨 참기 단계에서는 진동을 멈춤
    }

    // scale 애니메이션 시작
    Animated.timing(scale, {
      toValue: targetScale,
      duration: duration,
      useNativeDriver: true,
    }).start();

    const stepTimeout = setTimeout(() => {
      setCurrentStage(prevStage => (prevStage + 1) % sequence.length);
    }, duration);

    return () => clearTimeout(stepTimeout);
  }, [isAnimating, currentStage, sequence, scale]);

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
    <Container>
      {isAnimating && (
        <>
          <TimerText>{goalTime}초 간</TimerText>
          <DescriptionText>{description}</DescriptionText>
          <TimerText>{timer > 0 ? `${timer}초` : ""}</TimerText>
        </>
      )}
      <HeartContainer>
        <HeartHeader></HeartHeader>
        <HeartInnerContainer>
          <HeartLineWrapper>
            <HeartLineSvg width={360} height={360} />
          </HeartLineWrapper>
          <AnimatedHeartWrapper
            style={{
              transform: [{ scale: scale }, { translateY: Animated.multiply(scale, -14) }],
            }}>
            <HeartSvg width={120} height={120} />
          </AnimatedHeartWrapper>
          <DdasomiWrapper>
            <Ddasomi width={120} height={120} />
          </DdasomiWrapper>
        </HeartInnerContainer>
        <HeartFooter></HeartFooter>
      </HeartContainer>

      {!isAnimating ? (
        <Button color={theme.color.MAIN1} onPress={handleStart}>
          <ButtonText>시작하기</ButtonText>
        </Button>
      ) : (
        <Button color={theme.color.MAIN1} onPress={handleEnd}>
          <ButtonText>종료하기</ButtonText>
        </Button>
      )}
    </Container>
  );
};

export default BreathHeart;

const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  width: 100%;
`;

const DescriptionText = styled(Text)`
  font-family: "hakgyoansimR";
  font-size: 40px;
`;

const TimerText = styled(Text)`
  font-size: 24px;
  font-weight: bold;
`;

const HeartContainer = styled(View)`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const HeartHeader = styled(View)`
  width: 100%;
  height: 120px;
`;

const HeartInnerContainer = styled(View)`
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100%;
  position: relative;
`;

const HeartLineWrapper = styled(View)`
  position: absolute;
  bottom: 10px;
  z-index: 2;
`;

const AnimatedHeartWrapper = styled(Animated.View)`
  position: absolute;
  bottom: 10px;
  z-index: 3;
`;

const DdasomiWrapper = styled(View)`
  position: absolute;
  bottom: 50px;
  z-index: 4;
`;

const HeartFooter = styled(View)`
  width: 100%;
  height: 100px;
`;

const ButtonText = styled(Text)`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;
