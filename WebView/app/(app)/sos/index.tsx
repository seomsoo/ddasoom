import { View, Text, Pressable, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { router } from "expo-router";
import { Image } from "react-native";
import SOS from "@/assets/svgs/SosButton.svg";
import { loadBreathTypeFromStorage } from "@/storage/breath";

const SosScreen = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current; // 초기 스케일을 1로 설정

  const handleEmergency = async () => {
    const storedBreathType = await loadBreathTypeFromStorage();
    console.log(storedBreathType);
    router.push(`(app)/breath?breathType=${storedBreathType ?? "basicTime"}`);
  };

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1, // 커지는 크기
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1, // 원래 크기
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [scaleAnim]);

  return (
    <Container>
      <InnerContainer>
        <Header>
          <HeaderText>공황을 감지했어요.</HeaderText>
          <View style={{ justifyContent: "center", alignItems: "center", gap: 6, marginBottom: 20 }}>
            <Text style={{ fontSize: 16, color: "gray", fontFamily: "nanumSquareNeoRegular" }}>호흡을 다잡고</Text>
            <Text style={{ fontSize: 16, color: "gray", fontFamily: "nanumSquareNeoRegular" }}>
              따솜이를 꼭 쥐어주세요.
            </Text>
          </View>
        </Header>
        <Pressable style={{ justifyContent: "center", alignItems: "center" }} onPress={handleEmergency}>
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <SOS width={120} height={120} />
          </Animated.View>
        </Pressable>
        <Pressable onPress={() => router.push("(app)/authorized")}>
          <Text style={{ fontSize: 20, color: "gray", fontFamily: "nanumSquareNeoRegular" }}>괜찮아요</Text>
        </Pressable>
      </InnerContainer>
    </Container>
  );
};

export default SosScreen;

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const InnerContainer = styled(View)`
  width: 320px;
  height: 350px;
  background-color: ${props => props.theme.color.BACKGROUND};
  border-radius: 16px;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  padding-bottom: 30px;
  padding-top: 40px;
`;

const Header = styled(View)`
  width: 100%;
  align-items: center;
  height: 60px;
  justify-content: center;
  gap: 20px;
`;

const HeaderText = styled(Text)`
  font-size: 24px;
  font-family: hakgyoansimRegular;
`;

const CloseBtn = styled(Image)`
  width: 40px;
  height: 40px;
`;
