import React, { useEffect } from "react";
import { Slot, Stack } from "expo-router";
import { ThemeProvider } from "styled-components/native";
import theme from "@/styles/Theme";
import {
  getKeyHashAndroid,
  initializeKakaoSDK,
} from "@react-native-kakao/core";
import { Platform, StatusBar, View } from "react-native";

const Root = () => {
  const statusBarHeight =
    Platform.OS === "android" ? StatusBar.currentHeight : 0;

  useEffect(() => {
    // getKeyHashAndroid().then(console.log);
    initializeKakaoSDK(`${process.env.EXPO_PUBLIC_KAKAO_NATIVE_KEY}`);
  });

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      <View style={{ paddingTop: statusBarHeight, flex: 1 }}>
        <Slot />
      </View>
    </ThemeProvider>
  );
};

export default Root;
