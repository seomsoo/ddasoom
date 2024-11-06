import useSendToken from "@/hooks/useSendToken";
import useVoiceRecord from "@/hooks/useVoiceRecord";
import { vibrate, vibrateOff } from "@/utils/vibrate";
import useAuthStore from "@/zustand/authStore";
import { router } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BackHandler, Platform, StatusBar, ToastAndroid, Vibration } from "react-native";
// import {
//   Button,
//   NativeEventEmitter,
//   NativeModules,
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   Text,
//   View,
// } from "react-native";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import type { WebView as WebViewType } from "react-native-webview";

const AuthedScreen = () => {
  const { startRecording, stopRecording, sendRecording } = useVoiceRecord();
  const { userName } = useAuthStore();
  const statusBarHeight = Platform.OS === "android" ? StatusBar.currentHeight : 0;
  const webViewRef = useRef<WebViewType | null>(null);
  const sendTokenToWeb = useSendToken(webViewRef);

  // 웹에서 메시지 받기
  const handleMessage = (event: WebViewMessageEvent) => {
    const data = event.nativeEvent.data;
    const { title, content }: WebMessageDto = JSON.parse(data);

    switch (title) {
      // 로그인 & 회원가입 & 로그아웃
      case "GETTOKEN":
        console.log("웹에서 토큰 요청함");
        sendTokenToWeb(); // 토큰 보내기
        return;
      case "LOGOUT":
        console.log("로그아웃 됨");
        return;

      // 음성 녹음
      case "RECORD":
        if (content === "ONAIR" && userName) {
          startRecording();
        } else if (content === "STOPAIR" && userName) {
          stopRecording();
        } else if (content === "OFFAIR" && userName) {
          stopRecording();
          sendRecording(userName);
        }
        return;

      // 진동
      case "VIBRATE":
        vibrate(content as string);
        return;
      case "VIBRATEOFF":
        vibrateOff();
        return;

      // 아두이노
      case "ARDSETTING":
        router.push("ble");
      case "ARD":
        if (content === "ON") {
          console.log("아두이노 작동");
        } else {
          console.log("아두이노 끄기");
        }
        return;
    }
  };

  // 웹으로 메시지 보내기
  const sendMessageToWeb = () => {
    const data = {
      title: "Sample Title",
      content: "Sample Content",
    };
    const message = JSON.stringify(data);

    webViewRef?.current?.injectJavaScript(`
    window.postMessage(${JSON.stringify(message)}, "*");
  `);
  };

  // 웹뷰 뒤로가기
  const backPress = useCallback(() => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
      return true; // prevent default behavior (exit app)
    }
    return false;
  }, []);

  // 뒤로가기 이벤트리스너 붙이기
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backPress);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backPress);
    };
  }, [backPress]);

  return (
    <>
      <StatusBar />
      <WebView
        ref={webViewRef}
        style={{ paddingTop: statusBarHeight, flex: 1 }}
        source={{ uri: `${process.env.EXPO_PUBLIC_BASEURL}` }}
        onMessage={handleMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        mediaPlaybackRequiresUserAction={false} // 미디어 자동 재생 허용
        startInLoadingState={true}
      />
    </>
  );
};

export default AuthedScreen;
