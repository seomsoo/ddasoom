import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, Vibration } from "react-native";
import styled from "styled-components/native";
import FooterSVG from "@/assets/svgs/breathfooter.svg";
import StartBasic from "@/assets/videos/start478.gif";
import StartLong from "@/assets/videos/start573.gif";
import StartShort from "@/assets/videos/start4444.gif";
import BreathCircleAnimation from "./BreathCircleAnimation";
import breathData from "@/constant/BreathData";
import Header from "./Header";
import { Image } from "expo-image";
import { router } from "expo-router";

interface BreathCircleProps {
  breathType: "shortTime" | "basicTime" | "longTime";
}

const circleRadius = 100;
const circumference = 2 * Math.PI * circleRadius;
const gapLength = 20;

const BreathCircle = ({ breathType }: BreathCircleProps) => {
  const [description, setDescription] = useState("");
  const [timer, setTimer] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPreparing, setIsPreparing] = useState(true);
  const [currentStage, setCurrentStage] = useState(0);
  const [stageProgress, setStageProgress] = useState<number[]>([]);
  const [preparationIndex, setPreparationIndex] = useState(0);
  const [totalTimer, setTotalTimer] = useState(0);
  const [animationGIF, setAnimationGIF] = useState(StartBasic); // GIF 소스 상태 관리

  const sequence = useMemo(() => breathData[breathType].stages, [breathType]);

  useEffect(() => {
    // breathType에 따라 초기 GIF 소스를 설정합니다.
    setAnimationGIF(breathType === "basicTime" ? StartBasic : breathType === "shortTime" ? StartShort : StartLong);
  }, [breathType]);

  const preparationIntervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const countdownIntervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const progressIntervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const stepTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const totalTimerIntervalRef = useRef<NodeJS.Timeout | undefined>(undefined); // 총 타이머 기록용 ref

  // 초기화 및 준비 단계
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
      setTimer(sequence[0].duration / 1000);
      setCurrentStage(0);

      // 호흡 시작과 동시에 누적 시간 기록 시작
      totalTimerIntervalRef.current = setInterval(() => {
        setTotalTimer(prev => prev + 1);
      }, 1000);

      if (sequence[0].description === "들이마시기" || sequence[0].description === "내쉬기") {
        Vibration.vibrate(sequence[0].duration);
      }
    }, 3000);

    return () => {
      if (preparationIntervalRef.current) clearInterval(preparationIntervalRef.current);
      if (stepTimeoutRef.current) clearTimeout(stepTimeoutRef.current);
    };
  }, [sequence]);

  // 메인 애니메이션 로직
  useEffect(() => {
    if (!isAnimating || isPreparing) return;

    const { duration } = sequence[currentStage];
    setTimer(duration / 1000);

    // 각 스테이지의 고정 구간 길이 계산
    const segmentLength = circumference / sequence.length - gapLength;

    // 초당 증가해야 하는 프로그레스 값 계산
    const progressPerSecond = segmentLength / (duration / 1000);

    // 프로그레스 업데이트 간격 (ms)
    const updateInterval = 50;

    // 각 업데이트마다 증가할 프로그레스 값
    const incrementPerUpdate = (progressPerSecond * updateInterval) / 1000;

    countdownIntervalRef.current = setInterval(() => {
      setTimer(prevTime => {
        if (prevTime <= 1) {
          if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    progressIntervalRef.current = setInterval(() => {
      setStageProgress(prevProgress => {
        const newProgress = [...prevProgress];
        const currentProgress = newProgress[currentStage];

        // 현재 스테이지의 구간 내에서만 프로그레스 증가
        if (currentProgress < segmentLength) {
          newProgress[currentStage] = Math.min(currentProgress + incrementPerUpdate, segmentLength);
        }

        return newProgress;
      });
    }, updateInterval);

    stepTimeoutRef.current = setTimeout(() => {
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);

      setCurrentStage(prevStage => {
        const nextStage = (prevStage + 1) % sequence.length;
        setDescription(sequence[nextStage].description);
        setTimer(sequence[nextStage].duration / 1000);

        if (sequence[nextStage].description === "들이마시기" || sequence[nextStage].description === "내쉬기") {
          Vibration.vibrate(sequence[nextStage].duration);
        }

        // 한 사이클이 끝나면 프로그레스 초기화
        if (nextStage === 0) {
          setStageProgress(Array(sequence.length).fill(0));
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

  // 종료 버튼 누르면 타이머 및 누적 시간 종료
  const handleStop = () => {
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    if (stepTimeoutRef.current) clearTimeout(stepTimeoutRef.current);
    if (totalTimerIntervalRef.current) clearInterval(totalTimerIntervalRef.current); // 누적 시간 기록 종료

    Vibration.cancel();
    setIsAnimating(false);
    console.log(`총 누적 시간: ${totalTimer}초`);
    router.push(`/breath/breathEndModal?totalTime=${totalTimer}`);
  };

  return (
    <Container>
      <HeaderContainer>
        <Header label="" />
      </HeaderContainer>
      <FooterContainer>
        <FooterSVG />
      </FooterContainer>
      <ContentContainer>
        <TimerContainer>
          {isPreparing ? (
            <PreparationContainer>
              <Text style={{ fontFamily: "hakgyoansimRegular", fontSize: 24 }}>곧 호흡이 시작돼요!</Text>
              <DotContainer>
                {[...Array(3)].map((_, idx) => (
                  <Dot key={idx} active={idx <= preparationIndex} />
                ))}
              </DotContainer>
            </PreparationContainer>
          ) : (
            <TextContainer>
              <DescriptionText>숨 {description}</DescriptionText>
              <TimerText>{`${timer}초`}</TimerText>
            </TextContainer>
          )}
        </TimerContainer>
        <View style={{ position: "absolute", bottom: 200, justifyContent: "center", alignItems: "center" }}>
          <AnimationBackground>
            <Image source={animationGIF} style={{ zIndex: 2, width: 230, height: 230, borderRadius: 115 }} />
          </AnimationBackground>
          <BreathCircleAnimation
            sequenceLength={sequence.length}
            circumference={circumference}
            gapLength={gapLength}
            circleRadius={circleRadius}
            stageProgress={stageProgress}
            currentStage={currentStage}
          />
        </View>
      </ContentContainer>
      <StopButton onPress={handleStop}>
        <StopButtonText>괜찮아요</StopButtonText>
      </StopButton>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const HeaderContainer = styled.View`
  margin-top: 20px;
  left: -8px;
  position: absolute;
`;

const FooterContainer = styled.View`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: -4px;
`;

const ContentContainer = styled.View`
  flex: 1;
  align-items: center;
  margin-top: 16px;
`;

const TimerContainer = styled.View`
  height: 80px;
  align-items: center;
`;

const PreparationContainer = styled.View`
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;

const DotContainer = styled.View`
  flex-direction: row;
  margin-top: 5px;
`;

const Dot = styled.View<{ active: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-color: ${({ active }: any) => (active ? "#34c449" : "#ccc")};
  margin: 0 5px;
`;

const TextContainer = styled.View`
  position: absolute;
  margin-top: 100px;
  align-items: center;
`;

const DescriptionText = styled.Text`
  font-size: 40px;
  font-family: "hakgyoansimRegular";
`;

const TimerText = styled.Text`
  font-size: 24px;
  margin-top: 5px;
  font-family: "nanumSquareNeoRegular";
`;

const AnimationBackground = styled.View`
  background-color: #b0e4b7;
  border-radius: 115px;
  width: 230px;
  height: 230px;
  position: absolute;
`;

const StopButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 20px;
  right: 18px;
  align-self: center;
  background-color: #82e090;
  padding: 10px 20px;
  border-radius: 30px;
`;

const StopButtonText = styled.Text`
  font-size: 16px;
  color: #fff;
  font-family: "nanumSquareNeoRegular";
`;

export default BreathCircle;
