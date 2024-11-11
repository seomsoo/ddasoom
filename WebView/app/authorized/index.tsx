import useSendToken from "@/hooks/useSendToken";
import useVoiceRecord from "@/hooks/useVoiceRecord";
import { postPanicAtFirst } from "@/services/panic";
import { deletePanicInfoFromStorage, loadPanicInfoFromStorage } from "@/services/storage";
import { vibrate, vibrateOff } from "@/utils/vibrate";
import useAuthStore from "@/zustand/authStore";
import { logout } from "@react-native-kakao/user";
import { router } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BackHandler, Platform, StatusBar } from "react-native";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import type { WebView as WebViewType } from "react-native-webview";
import PanicDataModal from "@/components/authorized/PanicDataModal"; // 모달 컴포넌트 가져오기
import {
  checkPushNotificationPermission,
  promptDisablePushNotification,
  requestPushNotificationPermission,
} from "@/utils/permissions";
import useLocation from "@/hooks/useLocation";

const AuthedScreen = () => {
  const { startRecording, stopRecording, sendRecording } = useVoiceRecord();
  const { userName } = useAuthStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [panicData, setPanicData] = useState<PanicFirstForm | null>(null);
  const [inputText, setInputText] = useState(""); // 모달 입력 상태 추가
  const { location } = useLocation();

  const statusBarHeight = Platform.OS === "android" ? StatusBar.currentHeight : 0;
  const webViewRef = useRef<WebViewType | null>(null);
  const sendTokenToWeb = useSendToken(webViewRef);

  // 웹에서 메시지 받기
  const handleMessage = async (event: WebViewMessageEvent) => {
    const data = event.nativeEvent.data;
    const { title, content }: WebMessageDto = JSON.parse(data);
    switch (title) {
      case "GETTOKEN":
        console.log("웹에서 토큰 요청함");
        await sendTokenToWeb();
        return;
      case "LOGOUT":
        await logout();
        console.log("로그아웃 됨");
        BackHandler.removeEventListener("hardwareBackPress", backPress);
        router.push("/");
        return;
      case "RECORD":
        if (content === "ONAIR" && userName) {
          await startRecording();
        } else if (content === "STOPAIR" && userName) {
          await stopRecording();
        } else if (content === "OFFAIR" && userName) {
          await stopRecording();
          await sendRecording(userName);
        }
        return;
      case "VIBRATE":
        await vibrate(content as string);
        return;
      case "VIBRATEOFF":
        await vibrateOff();
        return;
      case "NOTI":
        checkPushPermission(); // 푸시 권한 여부 전송
        if (content === "yes") {
          requestPushNotificationPermission();
        } else if (content === "no") {
          promptDisablePushNotification();
        }
        return;
      case "ARDSETTING":
        BackHandler.removeEventListener("hardwareBackPress", backPress);
        await router.push("authorized/ble");
        return;
      case "ARD":
        console.log(content === "ON" ? "아두이노 작동" : "아두이노 끄기");
        return;
      case "SOS":
        BackHandler.removeEventListener("hardwareBackPress", backPress);
        router.push("breath");
        return;
      case "GPS":
        if (!location) {
          return;
        }
        const data = JSON.stringify({
          title: "CURRENTLOCATION",
          longitude: location.longitude,
          latitude: location.latitude,
        });
        webViewRef.current?.injectJavaScript(`window.postMessage(${data});`);
        return;
      default:
        console.log(title, " : ", content);
    }
  };

  const backPress = useCallback(() => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
      return true;
    }
    return false;
  }, []);

  const fetchPanicData = async () => {
    const data = await loadPanicInfoFromStorage();
    if (!data) {
      console.log("저장된 패닉 데이터 없음");
      return;
    }
    setPanicData(data);
    if (!data.description || data.description === "") {
      setModalVisible(true);
    } else {
      try {
        await postPanicAtFirst(data);
        console.log("저장되어 있던 패닉 데이터 저장 함");
        await deletePanicInfoFromStorage();
      } catch (e) {
        console.log("패닉 데이터 저장 요청 실패");
      }
    }
  };

  const handleSave = async () => {
    if (panicData) {
      try {
        // 기존 panicData에 inputText로 description 업데이트
        const updatedPanicData = { ...panicData, description: inputText };

        // 업데이트된 데이터로 요청 보내기
        await postPanicAtFirst(updatedPanicData);
        console.log("패닉 데이터 저장 완료");
        console.log(updatedPanicData);

        // 저장 후, 데이터 삭제 및 모달 닫기
        await deletePanicInfoFromStorage();
        setModalVisible(false);
      } catch (error) {
        console.log("패닉 데이터 저장 실패", error);
      }
    }
  };

  const handleCancel = async () => {
    setModalVisible(false);
    await deletePanicInfoFromStorage();
  };

  const checkPushPermission = async () => {
    const isPermission = await checkPushNotificationPermission();
    const data = JSON.stringify({ title: "ISPUSH", content: isPermission });
    webViewRef.current?.injectJavaScript(`
      window.postMessage(${data});
    `);
    console.log("앱->웹 [푸시 알림 여부] 전송 완료");
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backPress);
    fetchPanicData();
    checkPushPermission(); // 푸시 알림 설정 여부
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
        mediaPlaybackRequiresUserAction={false}
        startInLoadingState={true}
        mixedContentMode="always"
      />
      <PanicDataModal
        panicData={panicData}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        inputText={inputText}
        setInputText={setInputText}
        handleSave={handleSave}
        handleCancel={handleCancel}
      />
    </>
  );
};

export default AuthedScreen;
