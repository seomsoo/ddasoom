import React, { useEffect, useState } from "react";
import {
  Button,
  NativeEventEmitter,
  NativeModules,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import WebView from "react-native-webview";

const AuthedScreen = () => {
  // return <WebView style={{ flex: 1 }} source={{ uri: "https://expo.dev" }} />;
  const [receivedMessage, setReceivedMessage] = useState("");
  const { ModuleTest } = NativeModules;
  const eventEmitter = new NativeEventEmitter(ModuleTest);

  useEffect(() => {
    // 네이티브 이벤트 수신 및 처리
    const subscription = eventEmitter.addListener(
      "onMessageReceived",
      (message) => {
        console.log("Message received from native:", message);
        setReceivedMessage(message);
      }
    );

    // 1초마다 메시지 가져오기 (필요한 경우)
    const interval = setInterval(() => {
      ModuleTest.getCurrentMessage()
        .then((message: string) => {
          console.log("Current Message:", message);
          setReceivedMessage(message);
        })
        .catch((error: string) => {
          console.error("Error getting message:", error);
        });
    }, 1000);

    // 컴포넌트 언마운트 시 리스너 및 인터벌 제거
    return () => {
      subscription.remove();
      clearInterval(interval);
    };
  }, []);

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text style={{ textAlign: "center" }}>
            Received Message: {receivedMessage}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AuthedScreen;
