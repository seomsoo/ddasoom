import { NativeEventEmitter, NativeModules } from "react-native";
import { useEffect } from "react";
import { scheduleLocalNotification } from "@/utils/notifications";

const { ModuleTest } = NativeModules; // ModuleTest 네이티브 모듈 가져오기
const eventEmitter = new NativeEventEmitter(ModuleTest);

export const useHeartRate = (callback: (message: string) => void) => {
  useEffect(() => {
    // startForegroundService 함수가 존재하는지 확인하고 호출
    if (ModuleTest && typeof ModuleTest.startForegroundService === "function") {
      ModuleTest.startForegroundService(); // 서비스 시작
    } else {
      console.error("startForegroundService is not a function or ModuleTest is null");
    }

    const subscriptionHeartRate = eventEmitter.addListener("onHeartRateReceived", heartRate => {
      callback(heartRate);
      scheduleLocalNotification({
        title: "Heart Rate",
        body: `Current heart rate: ${heartRate}`,
        seconds: 1,
      });
    });

    const subscriptionEmergency = eventEmitter.addListener("onEmergencyReceived", message => {
      callback(message);
      scheduleLocalNotification({
        title: "따 숨",
        body: "도움이 필요하신가요? 따숨에 접속해서 호흡을 바로 잡으세요!",
        seconds: 1,
        data: { route: "(app)/sos" }, // 경로 정보 추가
      });
    });

    return () => {
      subscriptionHeartRate.remove();
      subscriptionEmergency.remove();
    };
  }, [callback]);
};
