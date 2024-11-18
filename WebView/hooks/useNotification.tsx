import { useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";
import * as Network from "expo-network";
import useNotificationStore from "@/zustand/notificationStore";
import { registerForPushNotificationsAsync } from "@/utils/notifications";
import { router } from "expo-router";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// 알림 채널 설정 함수 (Android)
const setNotificationChannelAsync = async () => {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "Default",
      importance: Notifications.AndroidImportance.HIGH, // 중요도 높게 설정
      vibrationPattern: [0, 250, 250, 250], // 진동 패턴 설정
      lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC, // 잠금 화면에 표시
    });
  }
};

const useNotification = () => {
  const setExpoPushToken = useNotificationStore(state => state.setExpoPushToken);
  const setNotification = useNotificationStore(state => state.setNotification);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    const setupNotifications = async () => {
      // Android 알림 채널 설정
      await setNotificationChannelAsync();

      const networkState = await Network.getNetworkStateAsync();
      if (!networkState.isConnected) {
        console.log("No network connection, skipping push notification registration.");
        return;
      }

      try {
        const token = await registerForPushNotificationsAsync();
        setExpoPushToken(token ?? "");
      } catch (error) {
        console.error("Push notification registration failed", error);
      }

      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });

      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        const route = response.notification.request.content.data.route;
        if (route) {
          router.push(route); // 경로로 이동
        }
      });
    };

    setupNotifications();

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);
};

export default useNotification;
