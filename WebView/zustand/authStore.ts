import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useAuthStore = create<AuthStore>()(
  persist(
    set => ({
      token: "",
      userEmail: "",
      userName: "",
      userId: 0,
      setToken: (token: Token) => set({ token: token }),
      setUserEmail: (email: Email) => set({ userEmail: email }),
      setUserName: (name: Name) => set({ userName: name }),
      setUserId: (id: UserId) => set({ userId: id }),
      clearToken: () => set({ token: "" }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        token: state.token,
        userEmail: state.userEmail,
        userName: state.userName,
        userId: state.userId,
      }),
    },
  ),
);

export default useAuthStore;
