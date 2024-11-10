import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Alert, Linking, Platform } from "react-native";

/** 푸시 알림 권한 여부 확인 함수 */
export async function checkPushNotificationPermission(): Promise<boolean> {
  if (!Device.isDevice) {
    console.log("푸시 알림은 실제 기기에서만 작동합니다.");
    return false;
  }

  const { status } = await Notifications.getPermissionsAsync();
  return status === "granted";
}

/** 푸시 알림 권한 요청 함수 */
export async function requestPushNotificationPermission(): Promise<boolean> {
  if (!Device.isDevice) {
    console.log("푸시 알림은 실제 기기에서만 작동합니다.");
    return false;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  return finalStatus === "granted";
}

/** 푸시 알림 권한 해제 함수 */
export async function promptDisablePushNotification() {
  if (Platform.OS === "ios" || Platform.OS === "android") {
    Alert.alert(
      "알림 권한 해제",
      "설정에서 푸시 알림 권한을 해제할 수 있습니다.",
      [
        {
          text: "설정 열기",
          onPress: () => Linking.openSettings(),
        },
        { text: "취소", style: "cancel" },
      ],
      { cancelable: true },
    );
  } else {
    console.log("설정에서 푸시 알림 권한을 해제할 수 있습니다.");
  }
}
