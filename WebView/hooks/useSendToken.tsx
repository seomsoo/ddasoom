import { ToastAndroid } from "react-native";
import React from "react";
import useAuthStore from "@/zustand/authStore";
import { router } from "expo-router";
import type { WebView as WebViewType } from "react-native-webview";

const useSendToken = (webViewRef: React.RefObject<WebViewType>) => {
  const { token } = useAuthStore();

  const sendMessageToWeb = () => {
    if (!token || token === "") {
      ToastAndroid.show("로그인 오류. 다시 로그인해주세요.", ToastAndroid.LONG);
      router.push("/");
      return;
    }

    const data = JSON.stringify({ title: "TOKEN", content: token });
    webViewRef.current?.injectJavaScript(`
      window.postMessage(${data}, "*");
    `);
    console.log("앱->웹 토큰 전송 완료");
  };

  return sendMessageToWeb;
};

export default useSendToken;
