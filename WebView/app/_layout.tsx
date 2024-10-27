import React, { useEffect } from "react";
import { Slot } from "expo-router";
import { ThemeProvider } from "styled-components/native";
import theme from "@/styles/Theme";
import {
  getKeyHashAndroid,
  initializeKakaoSDK,
} from "@react-native-kakao/core";

const Root = () => {
  useEffect(() => {
    // getKeyHashAndroid().then(console.log);
    initializeKakaoSDK(`${process.env.EXPO_PUBLIC_KAKAO_NATIVE_KEY}`);
  });

  return (
    <ThemeProvider theme={theme}>
      <Slot />
    </ThemeProvider>
  );
};

export default Root;
