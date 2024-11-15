interface AuthStore {
  token: Token;
  userEmail: Email;
  userName: Name;
  userId: UserId;
  setToken: (token: Token) => void;
  setUserEmail: (email: Email) => void;
  setUserName: (name: Name) => void;
  setUserId: (id: UserId) => void;
  clearToken: () => void;
}

interface BreathStore {
  breathType: BreathType;
  breathTime: number;
  setBreathType: (breathType: BreathType) => void;
  setBreathTime: (time: number) => void;
}

interface ContactStore {
  phoneNumbers: EmergencyPhoneNumber[];
  setPhoneNumbers: (phoneNumber: EmergencyPhoneNumber) => void;
}

interface NotificationState {
  expoPushToken: string | null;
  notification: Notifications.Notification | null;
  setExpoPushToken: (token: string | null) => void;
  setNotification: (notification: Notifications.Notification | null) => void;
}

interface VoiceKeyStore {
  voiceKey: VoiceKey;
  setVoiceKey: (voiceKey: VoiceKey) => void;
}
