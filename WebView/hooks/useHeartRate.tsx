import { NativeEventEmitter, NativeModules } from "react-native";
import { useEffect } from "react";

const { HeartRateModule } = NativeModules;
const eventEmitter = new NativeEventEmitter(HeartRateModule);

export const useHeartRate = (callback: (heartRate: string) => void) => {
  useEffect(() => {
    const subscription = eventEmitter.addListener("onHeartRateReceived", (heartRate: string) => {
      console.log("Received heart rate:", heartRate);
      callback(heartRate);
    });

    // Cleanup subscription
    return () => {
      subscription.remove();
    };
  }, [callback]);
};
