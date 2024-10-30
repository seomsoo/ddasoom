import { View, Text, Image, TouchableOpacity, StatusBar } from "react-native";
import React from "react";
import backGroundImg from "@/assets/images/first.png";
import logoImage from "@/assets/images/logo.png";
import styled from "styled-components/native";
import Button from "@/components/common/Button";
import { login, me } from "@react-native-kakao/user";
import { router } from "expo-router";

const Main = () => {
  console.log("login");

  const handleKaKaoLogin = async () => {
    // const { accessToken, refreshToken } = await login();
    // if (accessToken && refreshToken) {
    router.push("authorized");
    // }
  };

  const handleUnauthorized = () => {
    router.push("breath");
  };

  return (
    <Container>
      <Image source={backGroundImg} style={{ width: "100%", height: "100%" }} />
      <FloatingView>
        <LogoView>
          <Image
            source={logoImage}
            style={{ width: 200 }}
            resizeMode="contain"
          />
        </LogoView>
        <Button color="yellow" textColor="black" onPress={handleKaKaoLogin}>
          카카오 로그인
        </Button>
        <Button color="white" textColor="black" onPress={handleUnauthorized}>
          따숨 둘러보기
        </Button>
      </FloatingView>
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
