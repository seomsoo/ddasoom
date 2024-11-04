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
  const { userName, userEmail } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    // 회원가입
    console.log(`회원가입 시도. 이름 : ${userName}, 이메일 : ${userEmail}`);
    router.push("/initBreathModal");

    // try {
    //   setIsLoading(true);
    //   await signUp({ name: userName, email: userEmail });
    //   router.push("/");
    // } catch (e: unknown) {
    //   ToastAndroid.show("로그인 오류가 발생했습니다.", 3000);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <Container>
      <InnerContainer>
        <Header>
          <HeaderText>회원가입</HeaderText>
          <Pressable onPress={() => router.back()} style={{ position: "absolute", right: 10 }}>
            <CloseBtn source={closeButton} width={10} height={10}></CloseBtn>
          </Pressable>
        </Header>
        <Content>
          <ContentText>아직 등록되지 않은 회원입니다.{"\n"}가입하시겠습니까?</ContentText>
        </Content>
        <Button onPress={handleSignup} color={theme.color.MAIN1}>
          {!isLoading ? (
            <Text style={{ fontSize: 20, color: "white" }}>가입하기</Text>
          ) : (
            <ActivityIndicator size={"large"} />
          )}
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
`;

const CloseBtn = styled(Image)`
  width: 40px;
  height: 40px;
`;

const ContentText = styled(Text)`
  font-size: 20px;
`;
