import React, { useEffect } from "react";
import { Slot, Stack, router } from "expo-router";
import { ThemeProvider } from "styled-components/native";
import theme from "@/styles/Theme";
import { getKeyHashAndroid, initializeKakaoSDK } from "@react-native-kakao/core";
import { Platform, StatusBar, View } from "react-native";
import useNotification from "@/hooks/useNotification";
import useNotificationStore from "@/zustand/notificationStore";
import { useGlobalFonts } from "@/hooks/useGlobalFonts";
import useAuthStore from "@/zustand/authStore";
import { signIn } from "@/services/auth";
import * as Network from "expo-network";
import { useBleStore } from "@/zustand/bleStore"; // BLE 스토어 가져오기

const Root = () => {
  const { token, setToken, userEmail } = useAuthStore();
  const fontsLoaded = useGlobalFonts();
  useNotification();
  const { expoPushToken, notification } = useNotificationStore();

  // BLE 상태 및 함수 가져오기
  const { isScanning, connectedDevice, startScan, stopScan, disconnectFromDevice } = useBleStore();

  const statusBarHeight = Platform.OS === "android" ? StatusBar.currentHeight : 0;

  useEffect(() => {
    // Kakao SDK 초기화
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

  // 앱 실행 시 BLE 초기화 및 스캔 시작
  useEffect(() => {
    // 컴포넌트 언마운트 시 BLE 정리
    return () => {
      stopScan();
      if (connectedDevice) {
        disconnectFromDevice();
      }
    };
  }, []);

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
