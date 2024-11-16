// BreathCircle.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, Vibration } from "react-native";
import {
  Container,
  HeaderContainer,
  FooterContainer,
  ContentContainer,
  TimerContainer,
  PreparationContainer,
  DotContainer,
  Dot,
  TextContainer,
  DescriptionText,
  TimerText,
  AnimationBackground,
  StopButton,
  StopButtonText,
} from "./BreathHeart.styles"; // 스타일 임포트
import FooterSVG from "@/assets/svgs/breathfooter.svg";
import StartBasic from "@/assets/videos/start478.gif";
import StartLong from "@/assets/videos/start573.gif";
import StartShort from "@/assets/videos/start4444.gif";
import readyImg from "@/assets/videos/ready.gif";
import BreathCircleAnimation from "./BreathCircleAnimation";
import breathData from "@/constant/BreathData";
import Header from "./Header";
import { Image } from "expo-image";
import { router } from "expo-router";
import useVoiceKeyStore from "@/zustand/voiceKeyStore";
import { Audio } from "expo-av";
import * as Network from "expo-network";

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
  const [stageStartTime, setStageStartTime] = useState<number | null>(null); // 스테이지 시작 시간 초기화
  const [sound, setSound] = useState();
  const { voiceKey } = useVoiceKeyStore();

  const sequence = useMemo(() => breathData[breathType].stages, [breathType]);

  const preparationIntervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const countdownIntervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const progressIntervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const totalTimerIntervalRef = useRef<NodeJS.Timeout | undefined>(undefined); // 총 타이머 기록용 ref

  // 종료 버튼 누르면 타이머 및 누적 시간 종료
  const handleStop = () => {
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    if (totalTimerIntervalRef.current) clearInterval(totalTimerIntervalRef.current); // 누적 시간 기록 종료

    Vibration.cancel();
    setIsAnimating(false);
    console.log(`총 누적 시간: ${totalTimer}초`);
    router.push(`/breath/breathEndModal?totalTime=${totalTimer}`);
  };

  useEffect(() => {
    // breathType에 따라 초기 GIF 소스를 설정합니다.
    switch (breathType) {
      case "basicTime":
        setAnimationGIF(StartBasic);
        break;
      case "longTime":
        setAnimationGIF(StartLong);
        break;
      case "shortTime":
        setAnimationGIF(StartShort);
        break;
      default:
        setAnimationGIF(StartBasic); // 기본값 설정
        break;
    }
  }, [breathType]);

  // 초기화 및 준비 단계
  useEffect(() => {
    setIsPreparing(true);
    setPreparationIndex(0);

    preparationIntervalRef.current = setInterval(() => {
      setPreparationIndex(prev => prev + 1);
    }, 1000);

    const preparationTimeout = setTimeout(() => {
      if (preparationIntervalRef.current) clearInterval(preparationIntervalRef.current);
      setIsPreparing(false);
      setIsAnimating(true);
      setDescription(sequence[0].description);
      setTimer(Math.ceil(sequence[0].duration / 1000));
      setCurrentStage(0);
      setStageStartTime(Date.now()); // 스테이지 시작 시간 설정

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
      clearTimeout(preparationTimeout);
    };
  }, [sequence]);

  const settingSound = async (fileId: number) => {
    // 네트워크 상태 확인
    const networkState = await Network.getNetworkStateAsync();

    // 네트워크가 연결되지 않은 경우 로컬 파일 사용
    // if (!networkState.isConnected) {
    //   let soundFile;

    //   // fileId에 따라 로컬 파일을 설정합니다.
    //   switch (fileId) {
    //     case 1:
    //       soundFile = require("@/assets/sounds/BREATHING_001.mp3"); // 실제 경로로 수정
    //       break;
    //     case 2:
    //       soundFile = require("@/assets/sounds/BREATHING_002.mp3"); // 실제 경로로 수정
    //       break;
    //     case 3:
    //       soundFile = require("@/assets/sounds/BREATHING_003.mp3"); // 실제 경로로 수정
    //       break;
    //     default:
    //       console.error("Invalid fileId:", fileId);
    //       return;
    //   }

    //   try {
    //     // 로컬 파일을 불러와 재생합니다.
    //     const { sound } = await Audio.Sound.createAsync(soundFile, { shouldPlay: true });
    //     await sound.playAsync();
    //   } catch (error) {
    //     console.error("Error loading local sound:", error);
    //   }

    //   return;
    // }

    // 네트워크가 연결된 경우 원격 파일 사용
    const soundUrl = `https://ddasoom.s3.ap-southeast-2.amazonaws.com/${voiceKey}-BREATHING_00${fileId}.mp3`;
    try {
      // URL을 uri로 전달하여 네트워크에서 사운드를 로드합니다.
      const { sound } = await Audio.Sound.createAsync(
        { uri: soundUrl },
        { shouldPlay: true }, // 로드와 동시에 재생
      );
      await sound.playAsync();
    } catch (error) {
      console.log("네트워크 파일 로딩 에러:", error);
    }
  };

  // 메인 애니메이션 로직
  useEffect(() => {
    if (!isAnimating || isPreparing || stageStartTime === null) return;

    const { duration, fileId } = sequence[currentStage];
    setTimer(Math.ceil(duration / 1000));

    settingSound(fileId);

    // 각 스테이지의 고정 구간 길이 계산
    const segmentLength = circumference / sequence.length - gapLength;

    // 프로그레스 업데이트 간격 (ms)
    const updateInterval = 50;

    countdownIntervalRef.current = setInterval(() => {
      const elapsedTime = Date.now() - stageStartTime;
      const remainingTime = Math.max(Math.ceil((duration - elapsedTime) / 1000), 0);
      setTimer(remainingTime);
    }, 1000);

    progressIntervalRef.current = setInterval(() => {
      const elapsedTime = Date.now() - stageStartTime;
      const progress = Math.min((elapsedTime / duration) * segmentLength, segmentLength);

      setStageProgress(prevProgress => {
        const newProgress = [...prevProgress];
        newProgress[currentStage] = progress;
        return newProgress;
      });

      if (elapsedTime >= duration) {
        if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);

        // 다음 스테이지로 이동
        setCurrentStage(prevStage => {
          const nextStage = (prevStage + 1) % sequence.length;
          setDescription(sequence[nextStage].description);
          setTimer(Math.ceil(sequence[nextStage].duration / 1000));
          setStageStartTime(Date.now()); // 다음 스테이지 시작 시간 설정

          if (sequence[nextStage].description === "들이마시기" || sequence[nextStage].description === "내쉬기") {
            Vibration.vibrate(sequence[nextStage].duration);
          }

          // 한 사이클이 끝나면 프로그레스 초기화
          if (nextStage === 0) {
            setStageProgress(Array(sequence.length).fill(0));
          }

          return nextStage;
        });
      }
    }, updateInterval);

    return () => {
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isAnimating, isPreparing, currentStage, sequence, stageStartTime]);

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
        <View
          style={{
            position: "absolute",
            bottom: 200,
            justifyContent: "center",
            alignItems: "center",
          }}>
          <AnimationBackground>
            <Image
              source={isPreparing ? readyImg : animationGIF} // 이미지 소스 변경
              style={{ zIndex: 2, width: 230, height: 230, borderRadius: 115 }}
            />
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

export default BreathCircle;
