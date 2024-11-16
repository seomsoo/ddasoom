import { NativeEventEmitter, NativeModules } from "react-native";
import { useEffect } from "react";

const { HeartRateModule } = NativeModules;
const eventEmitter = new NativeEventEmitter(HeartRateModule);

export const useHeartRate = (callback: (heartRate: string) => void) => {
  useEffect(() => {
    const subscriptionHeartRate = eventEmitter.addListener("onHeartRateReceived", (heartRate: string) => {
      callback(heartRate);
    });
    const subscriptionEmergency = eventEmitter.addListener("onEmergencyReceived", (message: string) => {
      callback(message);
    });

    // Cleanup subscription
    return () => {
      subscriptionHeartRate.remove();
      subscriptionEmergency.remove();
    };
  }, [callback]);
};
