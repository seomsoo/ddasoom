import { View, Text, Image, TouchableOpacity, StatusBar, Alert, ImageBackground } from "react-native";
import React from "react";
import backGroundImg from "@/assets/images/first.png";
import logoImage from "@/assets/images/logo.png";
import styled from "styled-components/native";
import Button from "@/components/common/Button";
import { login, me } from "@react-native-kakao/user";
import { router } from "expo-router";
import { signIn, signUp } from "@/services/auth";
import useAuthStore from "@/zustand/authStore";
import { AxiosError } from "axios";

const Main = () => {
  const { setToken, setUserEmail, setUserName, setUserId } = useAuthStore();

  const handleKaKaoLogin = async () => {
    router.push("authorized");

    // const { accessToken, refreshToken } = await login();

    // if (!accessToken || !refreshToken) {
    //   Alert.alert("로그인 오류1");
    //   return;
    // }

    // const { email } = await me();

    // if (!email || email === "") {
    //   Alert.alert("로그인 오류");
    //   return;
    // }

    // console.log("여기까진 잘됨");
    // try {
    //   const { userId, name, token } = await signIn(email);
    //   setToken(token);
    //   setUserEmail(email);
    //   setUserName(name);
    //   setUserId(userId);

    //   router.push("authorized");
    // } catch (e: unknown) {
    //   const error = e as DdasoomError;
    //   const errorCode = error.response?.data.error.status;

    //   if (errorCode === 404) {
    //     router.push("signupModal");
    //   } else {
    //     Alert.alert("로그인 오류");
    //   }
    // }
  };

  const handleUnauthorized = () => {
    router.push("breath");
  };

  return (
    <Container>
      <ImageBackground source={backGroundImg} style={{ width: "100%", height: "100%" }}>
        <FloatingView>
          <LogoView>
            <Image source={logoImage} style={{ width: 200 }} resizeMode="contain" />
          </LogoView>
          <Button color="yellow" textColor="black" onPress={handleKaKaoLogin}>
            카카오 로그인
          </Button>
          <Button color="white" textColor="black" onPress={handleUnauthorized}>
            따숨 둘러보기
          </Button>
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

const LogoView = styled.View``;
