import useSendToken from "@/hooks/useSendToken";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BackHandler, Platform, StatusBar, ToastAndroid } from "react-native";
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
  const statusBarHeight = Platform.OS === "android" ? StatusBar.currentHeight : 0;
  const webViewRef = useRef<WebViewType | null>(null);
  const sendTokenToWeb = useSendToken(webViewRef);

  // 웹에서 메시지 받기
  const handleMessage = (event: WebViewMessageEvent) => {
    const data = event.nativeEvent.data;
    const { title, content }: WebMessageDto = JSON.parse(data);

    switch (title) {
      case "GETTOKEN":
        console.log("웹에서 토큰 요청함");
        sendTokenToWeb(); // 토큰 보내기
        return;

      case "LOGOUT":
        console.log("로그아웃 됨");
        return;

      case "RECORD":
        console.log(content);
        return;

      case "VIBRATE":
        console.log(content, " 로 진동");
        return;

      case "RECORD":
        if (content === "ONAIR") {
          console.log("녹음 시작");
        } else {
          console.log("녹음 중지");
        }
        return;

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

  // const [receivedMessage, setReceivedMessage] = useState("");
  // const { ModuleTest } = NativeModules;
  // const eventEmitter = new NativeEventEmitter(ModuleTest);

  // useEffect(() => {
  //   // 네이티브 이벤트 수신 및 처리
  //   const subscription = eventEmitter.addListener(
  //     "onMessageReceived",
  //     (message) => {
  //       console.log("Message received from native:", message);
  //       setReceivedMessage(message);
  //     }
  //   );

  //   // 1초마다 메시지 가져오기 (필요한 경우)
  //   const interval = setInterval(() => {
  //     ModuleTest.getCurrentMessage()
  //       .then((message: string) => {
  //         console.log("Current Message:", message);
  //         setReceivedMessage(message);
  //       })
  //       .catch((error: string) => {
  //         console.error("Error getting message:", error);
  //       });
  //   }, 1000);

  //   // 컴포넌트 언마운트 시 리스너 및 인터벌 제거
  //   return () => {
  //     subscription.remove();
  //     clearInterval(interval);
  //   };
  // }, []);

  // return (
  //   <SafeAreaView>
  //     <StatusBar />
  //     <ScrollView contentInsetAdjustmentBehavior="automatic">
  //       <View>
  //         <Text style={{ textAlign: "center" }}>
  //           Received Message: {receivedMessage}
  //         </Text>
  //       </View>
  //     </ScrollView>
  //   </SafeAreaView>
  // );
};

export default AuthedScreen;
