import { View, Text, TouchableOpacity, Animated, Easing } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { router } from "expo-router";
import BreathWatch from "@/components/breath/BreathWatch";
import { useHeartRate } from "@/hooks/useHeartRate";

const MeasureBpm = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [seconds, setSeconds] = useState(20);
  const [isCompleted, setIsCompleted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [bpm, setBpm] = useState(0);

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useHeartRate(heartRate => {
    setBpm(Number(heartRate));
  });

  useEffect(() => {
    if (seconds > 0 && !isCompleted) {
      intervalRef.current = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
    }

    if (seconds === 1) {
      setIsCompleted(true);
      stopTimer();
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.ease),
      }).start();
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [seconds, isCompleted]);

  return (
    <Container>
      <InnerContainer isCompleted={isCompleted}>
        <Header>
          <HeaderText>심박수 측정</HeaderText>
        </Header>
        {!isCompleted && (
          <Content>
            <ContentText>편안한 상태를 유지해주세요.</ContentText>
            <ContentText2>{seconds}초</ContentText2>
          </Content>
        )}
        <BpmContainer>
          {!isCompleted ? (
            <BreathWatch bpm={bpm} />
          ) : (
            <Animated.View style={{ opacity: fadeAnim }}>
              <Text style={{ fontSize: 20, color: "black" }}>측정 완료!</Text>
              <Text style={{ fontSize: 20, color: "black" }}>이제 로그인 후 이용하실 수 있어요!</Text>
            </Animated.View>
          )}
        </BpmContainer>
        <ButtonBox>
          <SmallButton
            onPress={() => {
              if (isCompleted) {
                router.push("/");
              } else {
                stopTimer();
                router.back();
              }
            }}>
            <Text style={{ fontSize: 20, color: "white" }}>{isCompleted ? "완료" : "취소"}</Text>
          </SmallButton>
        </ButtonBox>
      </InnerContainer>
    </Container>
  );
};

export default MeasureBpm;

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

interface InnerContainerProps {
  isCompleted: boolean;
}

const InnerContainer = styled(View)<InnerContainerProps>`
  width: 320px;
  height: ${props => (props.isCompleted ? "300px" : "420px")};
  background-color: ${props => props.theme.color.BACKGROUND};
  border-radius: 16px;
  align-items: center;
  justify-content: space-evenly;
`;

const Header = styled(View)`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Content = styled(View)`
  margin-bottom: 20px;
  width: 280px;
  gap: 5px;
  justify-content: center;
  align-items: center;
`;

const HeaderText = styled(Text)`
  font-size: 24px;
  font-weight: 600;
`;

const BpmContainer = styled(View)`
  margin-bottom: 10px;
`;

const ContentText = styled(Text)`
  font-size: 20px;
`;

const ContentText2 = styled(Text)`
  font-size: 30px;
  font-weight: 500;
`;

const ButtonBox = styled(View)`
  flex-direction: row;
  width: 100%;
  margin-top: 25px;
  justify-content: center;
`;

const SmallButton = styled(TouchableOpacity)`
  background-color: ${props => props.theme.color.MAIN1};
  padding: 10px 24px 13px 24px;
  border-radius: 8px;
`;
