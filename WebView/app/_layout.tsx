import React, { useEffect } from "react";
import { Slot, Stack, router } from "expo-router";
import { ThemeProvider } from "styled-components/native";
import theme from "@/styles/Theme";
import { getKeyHashAndroid, initializeKakaoSDK } from "@react-native-kakao/core";
import { Platform, StatusBar, View } from "react-native";
import useNotification from "@/hooks/useNotification";
import useNotificationStore from "@/zustand/notificationStore";
import { useGlobalFonts } from "@/hooks/useGlobalFonts"; // useGlobalFonts 파일의 경로에 맞게 설정
import useAuthStore from "@/zustand/authStore";
import { signIn } from "@/services/auth";
import * as Network from "expo-network";

const Root = () => {
  const { token, setToken, userEmail } = useAuthStore();
  const fontsLoaded = useGlobalFonts();
  useNotification();
  const { expoPushToken, notification } = useNotificationStore();

  const statusBarHeight = Platform.OS === "android" ? StatusBar.currentHeight : 0;

  useEffect(() => {
    // getKeyHashAndroid().then(console.log);
    initializeKakaoSDK(`${process.env.EXPO_PUBLIC_KAKAO_NATIVE_KEY}`);
    console.log("엑스포 푸시 토큰 : ", expoPushToken);

    const getLogin = async () => {
      const networkState = await Network.getNetworkStateAsync();
      if (networkState.isConnected && token && token !== "") {
        try {
          const { token } = await signIn(userEmail);
          setToken(token);
          router.push("(app)/authorized");
        } catch (e) {
          console.log(e);
        }
      }
    };
    getLogin();
  }, [expoPushToken]);

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
