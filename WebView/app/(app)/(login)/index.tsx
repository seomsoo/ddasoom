import { Text, ImageBackground, ToastAndroid, Pressable, Alert } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import header from "@/assets/images/header.png";
import mini from "@/assets/videos/mini.gif";
import kakaoIcon from "@/assets/images/kakao_icon.png";
import styled from "styled-components/native";
import Button from "@/components/common/Button";
import { login, me, unlink } from "@react-native-kakao/user";
import { router } from "expo-router";
import { signIn } from "@/services/auth";
import useAuthStore from "@/zustand/authStore";
import { loadBreathTypeFromStorage } from "@/storage/breath";
import * as Network from "expo-network";
import backGround from "@/assets/videos/back.gif";
import logoImage from "@/assets/videos/eye.gif";
const Main = () => {
  const { token, userId, setToken, setUserEmail, setUserName, setUserId } = useAuthStore();
  const [breathType, setBreathType] = useState<BreathType>("basicTime");

  const handleKaKaoLogin = async () => {
    // 네트워크 상태 확인
    const networkState = await Network.getNetworkStateAsync();
    if (!networkState.isConnected) {
      ToastAndroid.show("네트워크 연결이 불안정합니다.", 3000);
      return;
    }

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
      // Alert.alert("로그인 성공");
      router.push("(app)/authorized");
    } catch (e: unknown) {
      const error = e as DdasoomError;
      const errorCode = error.response?.data.error.status;

      if (errorCode === 404) {
        // Alert.alert("회원가입 필요");
        router.push("(app)/(login)/signupModal");
        // router.push("authorized");
      } else {
        console.error(errorCode);
        ToastAndroid.show("로그인 오류가 발생했습니다.", 3000);
      }
    }
  };

  const handleUnauthorized = () => {
    router.push(`(app)/breath?breathType=${breathType}`);
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
      <ImageBackground source={backGround} style={{ width: "100%", height: "100%" }}>
        <Overlay />
        <FloatingView>
          <Header>
            <HeaderText source={header} />
          </Header>
          <LogoView>
            <StyledImage source={logoImage} />
          </LogoView>
          <Button color="#FEE500" textColor="black" onPress={handleKaKaoLogin} icon={kakaoIcon} iconPosition="left16">
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
const Overlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 230, 0, 0.171);
`;
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
const HeaderText = styled.Image`
  width: 160px;
  height: 100px;
  resize-mode: contain;
`;
const LogoView = styled.View`
  position: absolute;
  top: 35%;
`;
const StyledImage = styled.Image`
  width: 250px;
  height: 250px;
  resize-mode: contain;
`;
