import React, { useEffect } from "react";
import { Slot, Stack, router } from "expo-router";
import { ThemeProvider } from "styled-components/native";
import theme from "@/styles/Theme";
import { getKeyHashAndroid, initializeKakaoSDK } from "@react-native-kakao/core";
import { Platform, StatusBar, View, AppState } from "react-native";
import useNotification from "@/hooks/useNotification";
import useNotificationStore from "@/zustand/notificationStore";
import { useGlobalFonts } from "@/hooks/useGlobalFonts";
import useAuthStore from "@/zustand/authStore";
import { signIn } from "@/services/auth";
import * as Network from "expo-network";
import { useBleStore } from "@/zustand/bleStore";
import { useHeartRate } from "@/hooks/useHeartRate";

const Root = () => {
  const { token, setToken, userEmail } = useAuthStore();
  const fontsLoaded = useGlobalFonts();
  useNotification();
  const { expoPushToken, notification } = useNotificationStore();

  const {
    isScanning,
    connectedDevice,
    startScan,
    stopScan,
    disconnectFromDevice,
    initializeBleManager,
    destroyBleManager,
  } = useBleStore();

  const statusBarHeight = Platform.OS === "android" ? StatusBar.currentHeight : 0;

  useHeartRate(() => {
    console.log("긴급 상황 호출됨");
  });

  useEffect(() => {
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

  // 앱 상태에 따른 BLE 매니저 초기화 및 해제
  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === "active") {
        initializeBleManager();
        startScan();
      } else if (nextAppState === "background") {
        stopScan();
        if (connectedDevice) {
          disconnectFromDevice();
        }
      }
    };

    const subscription = AppState.addEventListener("change", handleAppStateChange);
    return () => {
      subscription.remove();
      destroyBleManager(); // 앱이 종료될 때 BleManager 파괴
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
