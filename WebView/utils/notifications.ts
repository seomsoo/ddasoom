// notifications.ts
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";
import * as Device from "expo-device";

export async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notifications!");
      return null;
    }

    const projectId = Constants.expoConfig?.extra?.eas?.projectId || Constants.easConfig?.projectId;
    if (!projectId) {
      throw new Error("Project ID not found");
    }

    const pushToken = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
    console.log("Expo Push Token:", pushToken);
    return pushToken;
  } else {
    alert("Must use a physical device for push notifications");
    return null;
  }
}

export async function sendPushNotification(expoPushToken: string, title: string, body: string) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title,
    body,
    data: { data: "custom data" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

/** 로컬 알림 */
export async function scheduleLocalNotification({ title, body, seconds, data }: LocalNotiDto) {
  const permissionGranted = await registerForPushNotificationsAsync();
  if (!permissionGranted) return;

  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data: { customData: "여기에 데이터를 포함할 수 있습니다." },
    },
    trigger: { seconds }, // 5초 후에 알림을 보냅니다
  });
}
