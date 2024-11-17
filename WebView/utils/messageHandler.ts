// messageHandler.ts
import { WebViewMessageEvent, WebView } from "react-native-webview";
import { BackHandler } from "react-native";
import { router } from "expo-router";
import { logout } from "@react-native-kakao/user";
import { vibrate, vibrateOff } from "@/utils/vibrate";
import { loadBreathTypeFromStorage, saveBreathTypeToStorage } from "@/storage/breath";
import { sendMessageToWeb } from "@/utils/sendMessageToWeb";
import {
  checkPushNotificationPermission,
  promptDisablePushNotification,
  requestPushNotificationPermission,
} from "@/utils/permissions";

type MessageHandlerProps = {
  webViewRef: React.RefObject<WebView>;
  sendTokenToWeb: () => void;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<string | null>;
  sendRecording: (uri: string, name: string) => Promise<void>;
  sendLocationToWebView: () => void;
  setVoiceKey: (key: string) => void;
  voiceKey: string;
  setPhoneNumbers: (numbers: any) => void;
  phoneNumbers: any[];
  setBleModalVisible: (visible: boolean) => void;
  backPress: () => boolean;
};

export const createMessageHandler = ({
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
}: MessageHandlerProps) => {
  const checkPushPermission = async () => {
    const isPermission = await checkPushNotificationPermission();
    const data = JSON.stringify({ title: "ISPUSH", content: isPermission });
    webViewRef.current?.injectJavaScript(`
      window.postMessage(${data});
    `);
    console.log("앱->웹 [푸시 알림 여부] 전송 완료");
  };

  return async (event: WebViewMessageEvent) => {
    const data = event.nativeEvent.data;
    const { title, content }: WebMessageDto = JSON.parse(data);

    const handlers: Record<string, () => Promise<void> | void> = {
      GETTOKEN: () => {
        console.log("웹에서 토큰 요청함");
        sendTokenToWeb();
      },
      LOGOUT: async () => {
        await logout();
        console.log("로그아웃 됨");
        BackHandler.removeEventListener("hardwareBackPress", backPress);
        router.push("(app)/(login)");
      },
      RECORD: async () => {
        if (typeof content === "object" && "state" in content) {
          const recordContent = content as RecordMessage;
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
      },
      VIBRATE: () => vibrate(content as string),
      VIBRATEOFF: () => vibrateOff(),
      NOTI: () => {
        checkPushPermission();
        if (content === "yes") {
          requestPushNotificationPermission();
        } else if (content === "no") {
          promptDisablePushNotification();
        }
      },
      ARDSETTING: () => setBleModalVisible(true),
      SOS: async () => {
        BackHandler.removeEventListener("hardwareBackPress", backPress);
        const storedBreathType = await loadBreathTypeFromStorage();
        router.push(`(app)/breath?breathType=${storedBreathType ?? "basicTime"}`);
      },
      GPS: () => sendLocationToWebView(),
      BREATH: async () => {
        if (!content) {
          const storedBreathType = await loadBreathTypeFromStorage();
          sendMessageToWeb({ webViewRef, title: "BREATH", content: storedBreathType });
          return;
        }
        saveBreathTypeToStorage(content as string);
      },
      AIVOICE: () => {
        if (!content) {
          console.log("웹에서 목소리 요청함. 보내줄 목소리는 ", voiceKey);
          sendMessageToWeb({ webViewRef, title: "AIVOICE", content: voiceKey });
          return;
        }
        setVoiceKey(content as string);
      },
      PHONELIST: () => {
        sendMessageToWeb({ webViewRef, title: "PHONELIST", content: phoneNumbers });
      },
      SETPHONE: () => {
        console.log("리스트", content);
        setPhoneNumbers(content as any);
      },
    };

    const handler = handlers[title];
    if (handler) {
      await handler();
    } else {
      console.log(title, " : ", content);
    }
  };
};
