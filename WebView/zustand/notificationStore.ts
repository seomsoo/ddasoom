import { create } from "zustand";
import * as Notifications from "expo-notifications";

const useNotificationStore = create<NotificationState>(set => ({
  expoPushToken: null,
  notification: null,
  setExpoPushToken: token => set({ expoPushToken: token }),
  setNotification: notification => set({ notification }),
}));

export default useNotificationStore;
