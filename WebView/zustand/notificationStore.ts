import { create } from "zustand";
import * as Notifications from "expo-notifications";

interface NotificationState {
  expoPushToken: string | null;
  notification: Notifications.Notification | null;
  setExpoPushToken: (token: string | null) => void;
  setNotification: (notification: Notifications.Notification | null) => void;
}

const useNotificationStore = create<NotificationState>(set => ({
  expoPushToken: null,
  notification: null,
  setExpoPushToken: token => set({ expoPushToken: token }),
  setNotification: notification => set({ notification }),
}));

export default useNotificationStore;
