import { Text, ImageBackground, ToastAndroid, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import backGroundImg from "@/assets/images/first.png";
import mini from "@/assets/images/mini_Ddasom.png";
import kakaoIcon from "@/assets/images/kakao_icon.png";
import styled from "styled-components/native";
import Button from "@/components/common/Button";
import { login, me, unlink } from "@react-native-kakao/user";
import { router } from "expo-router";
import { signIn } from "@/services/auth";
import useAuthStore from "@/zustand/authStore";
import { loadBreathTypeFromStorage } from "@/storage/breath";

const Main = () => {
  const { setToken, setUserEmail, setUserName, setUserId } = useAuthStore();
  const [breathType, setBreathType] = useState<BreathType>("basicTime");

  const handleKaKaoLogin = async () => {
    const { accessToken, refreshToken } = await login();

    if (!accessToken || !refreshToken) {
      ToastAndroid.show("로그인 오류가 발생했습니다.", 3000);
      return;
    }

    const { email, nickname } = await me();

    if (!email || email === "") {
      ToastAndroid.show("로그인 오류가 발생했습니다.", 3000);
      return;
    }

    setUserEmail(email);
    setUserName(nickname);

    try {
      const { userId, name, token } = await signIn(email);
      setToken(token);
      setUserEmail(email);
      setUserName(name);
      setUserId(userId);
      console.log("로그인 성공. 토큰 : ", token);

      router.push("authorized");
    } catch (e: unknown) {
      const error = e as DdasoomError;
      const errorCode = error.response?.data.error.status;

      if (errorCode === 404) {
        router.push("signupModal");
        // router.push("authorized");
      } else {
        ToastAndroid.show("로그인 오류가 발생했습니다.", 3000);
      }
    }
  };

  const handleUnauthorized = () => {
    router.push(`/breath?breathType=${breathType}`);
  };

  useEffect(() => {
    const fetchBreathType = async () => {
      const breathTypeFromStorage = await loadBreathTypeFromStorage();
      setBreathType(breathTypeFromStorage);
    };

    fetchBreathType();
  }, []);

  return (
    <Container>
      <ImageBackground source={backGroundImg} style={{ width: "100%", height: "100%" }}>
        <FloatingView>
          <Header>
            <HeaderText>따 숨</HeaderText>
          </Header>
          <LogoView>{/* <Image source={logoImage} style={{ width: 200 }} resizeMode="contain" /> */}</LogoView>

          <Button color="yellow" textColor="black" onPress={handleKaKaoLogin} icon={kakaoIcon} iconPosition="left16">
            카카오 로그인
          </Button>
          <Button color="white" textColor="black" onPress={handleUnauthorized} icon={mini} iconPosition="bottomLeft">
            따숨 둘러보기
          </Button>
          <Pressable
            style={{ width: 100, height: 50, position: "absolute", top: 20, right: 0 }}
            onPress={() => unlink()}></Pressable>
        </FloatingView>
      </ImageBackground>
    </Container>
  );
};

export default Main;

const Container = styled.View`
  flex: 1;
`;

const FloatingView = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  justify-content: flex-end;
  align-items: center;
  padding: 20px;
  gap: 14px;
  padding-bottom: 30px;
`;

const Header = styled.View`
  position: absolute;
  top: 150px;
`;
const HeaderText = styled(Text)`
  font-size: 72px;
  font-family: hakgyoansimRegular;
`;
const LogoView = styled.View``;
