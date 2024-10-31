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

interface ContactStore {
  phoneNumbers: EmergencyPhoneNumber[];
  setPhoneNumbers: (phoneNumber: EmergencyPhoneNumber) => void;
}
