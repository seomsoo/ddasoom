import useSendToken from "@/hooks/useSendToken";
import useVoiceRecord from "@/hooks/useVoiceRecord";
import { postPanicAtFirst } from "@/services/panic";
import { deletePanicInfoFromStorage, loadPanicInfoFromStorage } from "@/storage/panic";
import useAuthStore from "@/zustand/authStore";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BackHandler, Platform, StatusBar } from "react-native";
import WebView from "react-native-webview";
import type { WebView as WebViewType } from "react-native-webview";
import PanicDataModal from "@/components/authorized/PanicDataModal"; // 모달 컴포넌트 가져오기
import { checkPushNotificationPermission } from "@/utils/permissions";
import useSendLocation from "@/hooks/useSendLocation";
import { loadBreathTypeFromStorage } from "@/storage/breath";
import useVoiceKeyStore from "@/zustand/voiceKeyStore";
import usePhoneStore from "@/zustand/contactStore";
import BleModal from "@/components/authorized/BleModal";
import { createMessageHandler } from "@/utils/messageHandler";

const AuthedScreen = () => {
  const webViewRef = useRef<WebViewType | null>(null);
  const { startRecording, stopRecording, sendRecording } = useVoiceRecord();
  const { token, userName, userEmail } = useAuthStore();
  const { voiceKey, setVoiceKey } = useVoiceKeyStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [bleModalVisible, setBleModalVisible] = useState(false);
  const [breathType, setBreathType] = useState<BreathType>("basicTime");
  const [panicData, setPanicData] = useState<PanicFirstForm | null>(null);
  const [inputText, setInputText] = useState(""); // 모달 입력 상태 추가
  const { phoneNumbers, setPhoneNumbers } = usePhoneStore();
  const sendLocationToWebView = useSendLocation(webViewRef);

  const statusBarHeight = Platform.OS === "android" ? StatusBar.currentHeight : 0;
  const sendTokenToWeb = useSendToken(webViewRef);

  const backPress = useCallback(() => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
      return true;
    }
    return false;
  }, []);

  const handleMessage = createMessageHandler({
    webViewRef,
    sendTokenToWeb,
    startRecording,
    stopRecording,
    sendRecording,
    sendLocationToWebView,
    setVoiceKey,
    voiceKey,
    setPhoneNumbers,
    phoneNumbers,
    setBleModalVisible,
    backPress,
  });

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
    if (token) {
      sendTokenToWeb();
    }

    const fetchBreathType = async () => {
      const breathTypeFromStorage = await loadBreathTypeFromStorage();
      setBreathType(breathTypeFromStorage);
    };

    fetchBreathType();

    fetchPanicData();
    checkPushPermission(); // 푸시 알림 설정 여부
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backPress);
    };
  }, [backPress, token]);

  return (
    <>
      <StatusBar />
      {token && userName && userEmail && (
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
      <BleModal bleModalVisible={bleModalVisible} setBleModalVisible={setBleModalVisible} />
    </>
  );
};

export default AuthedScreen;
