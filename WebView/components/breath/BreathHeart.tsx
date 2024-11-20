import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, Vibration, ImageBackground } from "react-native";
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
} from "./BreathHeart.styles";
import FooterSVG from "@/assets/svgs/breathfooter.svg";
import StartBasic from "@/assets/videos/start478.gif";
import StartLong from "@/assets/videos/start573.gif";
import StartShort from "@/assets/videos/start4444.gif";
import readyImg from "@/assets/videos/ready.gif";
import backGroundImg from "@/assets/images/gradient.png";
import BreathCircleAnimation from "./BreathCircleAnimation";
import breathData from "@/constant/BreathData";
import Header from "./Header";
import { Image } from "expo-image";
import { router } from "expo-router";
import useVoiceKeyStore from "@/zustand/voiceKeyStore";
import { Audio } from "expo-av";

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
  const [animationGIF, setAnimationGIF] = useState(StartBasic);
  const [stageStartTime, setStageStartTime] = useState<number | null>(null);
  const { voiceKey } = useVoiceKeyStore();

  const sequence = useMemo(() => breathData[breathType].stages, [breathType]);

  const preparationIntervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const countdownIntervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const progressIntervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const totalTimerIntervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const voiceIntervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const currentSoundRef = useRef<Audio.Sound | null>(null); // 현재 재생 중인 소리 객체 저장

  // 종료 버튼 누르면 타이머 및 누적 시간 종료
  const handleStop = () => {
    clearAllIntervals();
    setIsAnimating(false);
    Vibration.cancel();

    if (currentSoundRef.current) {
      currentSoundRef.current.stopAsync();
      currentSoundRef.current.unloadAsync();
      currentSoundRef.current = null;
    }

    console.log(`총 누적 시간: ${totalTimer}초`);
    router.push(`/breath/breathEndModal?totalTime=${totalTimer}`);
  };

  // 모든 인터벌을 정리하는 함수
  const clearAllIntervals = () => {
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    if (totalTimerIntervalRef.current) clearInterval(totalTimerIntervalRef.current);
    if (preparationIntervalRef.current) clearInterval(preparationIntervalRef.current);
    if (voiceIntervalRef.current) clearInterval(voiceIntervalRef.current);
  };

  const playSound = async (voiceKey: string, fileId: number) => {
    const sound = new Audio.Sound();
    const soundUrl = `https://ddasoom.s3.ap-southeast-2.amazonaws.com/${voiceKey}-EMERGENCY_${String(fileId).padStart(3, "0")}.mp3`;

    try {
      // 현재 재생 중인 소리 중지 및 해제
      // if (currentSoundRef.current) {
      //   await currentSoundRef.current.stopAsync();
      //   await currentSoundRef.current.unloadAsync();
      // }

      // 새 소리를 로드 및 재생
      await sound.loadAsync({ uri: soundUrl });
      await sound.playAsync();
      currentSoundRef.current = sound; // 현재 소리 객체 저장
    } catch (error) {
      console.log("소리 재생 오류:", error);
    }
  };

  useEffect(() => {
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
        setAnimationGIF(StartBasic);
        break;
    }
  }, [breathType]);

  useEffect(() => {
    // 랜덤 ID의 소리 재생
    setTimeout(() => {
      const randomId = Math.floor(Math.random() * 18) + 1; // 1부터 18까지의 랜덤 숫자 생성
      playSound(voiceKey, randomId);
    }, 8000);

    // 인터벌 제거하고 처음 한번만 재생
    // voiceIntervalRef.current = setInterval(async () => {
    //   const randomId = Math.floor(Math.random() * 18) + 1; // 1부터 18까지의 랜덤 숫자 생성
    //   await playSound(voiceKey, randomId);
    // }, 10000);

    // 컴포넌트가 언마운트될 때 인터벌 해제 및 소리 정리
    return () => {
      clearAllIntervals();
      Vibration.cancel();
      if (currentSoundRef.current) {
        currentSoundRef.current.stopAsync();
        currentSoundRef.current.unloadAsync();
        currentSoundRef.current = null;
      }
    };
  }, [voiceKey]);

  useEffect(() => {
    setIsPreparing(true);
    setPreparationIndex(0);

    preparationIntervalRef.current = setInterval(() => {
      setPreparationIndex(prev => prev + 1);
    }, 1000);

    const preparationTimeout = setTimeout(async () => {
      if (preparationIntervalRef.current) clearInterval(preparationIntervalRef.current);
      setIsPreparing(false);
      setIsAnimating(true);
      setDescription(sequence[0].description);
      setTimer(Math.ceil(sequence[0].duration / 1000));
      setCurrentStage(0);
      setStageStartTime(Date.now());

      totalTimerIntervalRef.current = setInterval(() => {
        setTotalTimer(prev => prev + 1);
      }, 1000);

      if (sequence[0].description === "들이마시기" || sequence[0].description === "내쉬기") {
        Vibration.vibrate(sequence[0].duration);
      }
    }, 3000);

    return () => {
      clearAllIntervals();
      clearTimeout(preparationTimeout);
    };
  }, [sequence]);

  useEffect(() => {
    if (!isAnimating || isPreparing || stageStartTime === null) return;

    const { duration } = sequence[currentStage];
    setTimer(Math.ceil(duration / 1000));

    const segmentLength = circumference / sequence.length - gapLength;
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
        clearInterval(countdownIntervalRef.current!);
        clearInterval(progressIntervalRef.current!);

        setCurrentStage(prevStage => {
          const nextStage = (prevStage + 1) % sequence.length;
          setDescription(sequence[nextStage].description);
          setTimer(Math.ceil(sequence[nextStage].duration / 1000));
          setStageStartTime(Date.now());

          if (sequence[nextStage].description === "들이마시기" || sequence[nextStage].description === "내쉬기") {
            Vibration.vibrate(sequence[nextStage].duration);
          }

          if (nextStage === 0) {
            setStageProgress(Array(sequence.length).fill(0));
          }

          return nextStage;
        });
      }
    }, updateInterval);

    return () => {
      clearInterval(countdownIntervalRef.current!);
      clearInterval(progressIntervalRef.current!);
    };
  }, [isAnimating, isPreparing, currentStage, sequence, stageStartTime]);

  return (
    <Container>
      <ImageBackground source={backGroundImg} style={{ width: "100%", height: "100%" }}>
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
                source={isPreparing ? readyImg : animationGIF}
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
      </ImageBackground>
    </Container>
  );
};

export default BreathCircle;
