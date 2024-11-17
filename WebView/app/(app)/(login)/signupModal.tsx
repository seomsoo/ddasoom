import { View, Text, Image, TextInput, ToastAndroid, ActivityIndicator, Pressable } from "react-native";
import React, { useState } from "react";
import styled from "styled-components";
import closeButton from "assets/images/octicon_x-12.png";
import Button from "@/components/common/Button";
import theme from "@/styles/Theme";
import useAuthStore from "@/zustand/authStore";
import { signUp } from "@/services/auth";
import { router } from "expo-router";
import { unlink } from "@react-native-kakao/user";

const SignupModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { userName, userEmail } = useAuthStore();

  const handleSignup = async () => {
    try {
      setIsLoading(true);
      await signUp({ name: userName, email: userEmail });
      console.log("회원가입 성공");
      router.push("(app)/(login)");
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
          <HeaderText>회원가입</HeaderText>
          <Pressable onPress={() => router.back()} style={{ position: "absolute", right: 1 }}>
            <CloseBtn source={closeButton} width={10} height={10}></CloseBtn>
          </Pressable>
        </Header>
        <Content>
          <ContentText>아직 등록되지 않은 회원입니다.{"\n"}가입하시겠습니까?</ContentText>
        </Content>
        <Button onPress={handleSignup} color={theme.color.MAIN1}>
          <Text style={{ fontSize: 20, color: "white" }}>가입하기</Text>
        </Button>
      </InnerContainer>
    </Container>
  );
};

export default SignupModal;

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
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
  font-weight: 600;
`;

const CloseBtn = styled(Image)`
  width: 40px;
  height: 40px;
`;

const ContentText = styled(Text)`
  font-size: 20px;
  text-align: center;
  margin-bottom: 20px;
`;
