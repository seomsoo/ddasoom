import { View, Text, Pressable, TouchableOpacity, ActivityIndicator, ToastAndroid } from "react-native";
import React, { useState } from "react";
import styled from "styled-components";
import Button from "@/components/common/Button";
import { router } from "expo-router";
import theme from "@/styles/Theme";
import useAuthStore from "@/zustand/authStore";
import { signUp } from "@/services/auth";

const InitBreathModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { userName, userEmail } = useAuthStore();

  const handleSkip = async () => {
    router.push("/");
    try {
      setIsLoading(true);
      await signUp({ name: userName, email: userEmail });
      console.log("회원가입 성공");
      router.push("/");
    } catch (e: unknown) {
      ToastAndroid.show("회원가입 오류가 발생했습니다.", 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <InnerContainer>
        <Header>
          <HeaderText>심박수 측정</HeaderText>
        </Header>
        <Content>
          <ContentText>평균 심박수 측정을 진행합니다.</ContentText>
          <ContentText>1분 간 편안한 상태를 유지해주세요.</ContentText>
        </Content>
        <ButtonBox>
          <SmallButton onPress={() => router.push("measureBpm")} style={{}}>
            <Text style={{ fontSize: 20, color: "white" }}>측정하기</Text>
          </SmallButton>
          <SmallButton onPress={handleSkip} style={{}}>
            {!isLoading ? (
              <Text style={{ fontSize: 20, color: "white" }}>건너뛰기</Text>
            ) : (
              <ActivityIndicator size={"large"} />
            )}
          </SmallButton>
        </ButtonBox>
      </InnerContainer>
    </Container>
  );
};

export default InitBreathModal;

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

const InnerContainer = styled(View)`
  width: 320px;
  height: 300px;
  background-color: ${props => props.theme.color.BACKGROUND};
  border-radius: 16px;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  padding-bottom: 30px;
`;

const Header = styled(View)`
  width: 100%;
  align-items: center;
  height: 60px;
  justify-content: center;
`;

const Content = styled(View)`
  width: 280px;
  gap: 40px;
  justify-content: center;
  align-items: center;
`;

const HeaderText = styled(Text)`
  font-size: 24px;
`;

const ContentText = styled(Text)`
  font-size: 20px;
`;

const ButtonBox = styled(View)`
  flex-direction: row;
  width: 100%;
  gap: 10px;
  justify-content: center;
`;

const SmallButton = styled(TouchableOpacity)`
  background-color: ${props => props.theme.color.MAIN1};
  padding: 10px 24px 10px 24px;
  border-radius: 8px;
`;
