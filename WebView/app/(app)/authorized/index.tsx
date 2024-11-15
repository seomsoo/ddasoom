import useSendToken from "@/hooks/useSendToken";
import useVoiceRecord from "@/hooks/useVoiceRecord";
import { postPanicAtFirst } from "@/services/panic";
import { deletePanicInfoFromStorage, loadPanicInfoFromStorage } from "@/storage/panic";
import { vibrate, vibrateOff } from "@/utils/vibrate";
import useAuthStore from "@/zustand/authStore";
import { logout } from "@react-native-kakao/user";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
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
import useSendLocation from "@/hooks/useSendLocation";
import { loadBreathTypeFromStorage, saveBreathTypeToStorage } from "@/storage/breath";
import { sendMessageToWeb } from "@/utils/sendMessageToWeb";
import useVoiceKeyStore from "@/zustand/voiceKeyStore";

const AuthedScreen = () => {
  const webViewRef = useRef<WebViewType | null>(null);
  const { recordUri, startRecording, stopRecording, sendRecording } = useVoiceRecord();
  const { token, userName, userId, userEmail } = useAuthStore();
  const { voiceKey, setVoiceKey } = useVoiceKeyStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [breathType, setBreathType] = useState<BreathType>("basicTime");
  const [panicData, setPanicData] = useState<PanicFirstForm | null>(null);
  const [inputText, setInputText] = useState(""); // 모달 입력 상태 추가
  const sendLocationToWebView = useSendLocation(webViewRef);

  const statusBarHeight = Platform.OS === "android" ? StatusBar.currentHeight : 0;
  const sendTokenToWeb = useSendToken(webViewRef);

  // 웹에서 메시지 받기
  const handleMessage = async (event: WebViewMessageEvent) => {
    const data = event.nativeEvent.data;
    const { title, content }: WebMessageDto = JSON.parse(data);
    switch (title) {
      case "GETTOKEN":
        console.log("웹에서 토큰 요청함");
        sendTokenToWeb();
        return;
      case "LOGOUT":
        await logout();
        console.log("로그아웃 됨");
        BackHandler.removeEventListener("hardwareBackPress", backPress);
        router.push("(app)/(login)");
        return;
      case "RECORD":
        // content가 RecordMessage 타입인지 확인
        if (typeof content === "object" && "state" in content) {
          const recordContent = content as RecordMessgae;
          if (recordContent.state === "ONAIR" && recordContent.name) {
            await startRecording();
            return;
          }
          if (recordContent.state === "STOPAIR" && recordContent.name) {
            await stopRecording();
            return;
          }
          if (recordContent.state === "OFFAIR" && recordContent.name) {
            const uri = await stopRecording();
            if (uri) {
              await sendRecording(uri, recordContent.name);
            } else {
              console.log("녹음 파일이 저장되지 않았습니다.");
            }
            return;
          }
        } else {
          console.error("잘못된 RECORD 메시지 형식:", content);
        }
        return;

      case "VIBRATE":
        vibrate(content as string);
        return;
      case "VIBRATEOFF":
        vibrateOff();
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
        router.push("(app)/ble");
        return;
      case "ARD":
        console.log(content === "ON" ? "아두이노 작동" : "아두이노 끄기");
        return;
      case "SOS":
        BackHandler.removeEventListener("hardwareBackPress", backPress);
        const storedBreathType = await loadBreathTypeFromStorage();
        router.push(`(app)/breath?breathType=${storedBreathType ?? "basicTime"}`);
        return;
      case "GPS":
        sendLocationToWebView();
        return;
      case "BREATH":
        if (!content) {
          // 설정된 목소리 요청
          const storedBreathType = await loadBreathTypeFromStorage();
          sendMessageToWeb({ webViewRef, title: "BREATH", content: storedBreathType });
          return;
        }
        // 목소리 설정
        saveBreathTypeToStorage(content as string);
        return;
      case "AIVOICE":
        if (!content) {
          console.log("웹에서 목소리 요청함. 보내줄 목소리는 ", voiceKey);
          sendMessageToWeb({ webViewRef, title: "AIVOICE", content: voiceKey });
          return;
        }
        setVoiceKey(content as string);
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
    if (token) {
      sendTokenToWeb();
    }

    const fetchBreathType = async () => {
      const breathTypeFromStorage = await loadBreathTypeFromStorage();
      setBreathType(breathTypeFromStorage);
    };

    fetchBreathType();

    BackHandler.addEventListener("hardwareBackPress", backPress);
    fetchPanicData();
    checkPushPermission(); // 푸시 알림 설정 여부
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backPress);
    };
  }, [backPress, token]);

  return (
    <>
      <StatusBar />
      {token && (
        <WebView
          ref={webViewRef}
          style={{ paddingTop: statusBarHeight, flex: 1 }}
          source={{ uri: "https://k11c103.p.ssafy.io" }}
          onMessage={handleMessage}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          mediaPlaybackRequiresUserAction={false}
          startInLoadingState={true}
          mixedContentMode="always"
        />
      )}
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
