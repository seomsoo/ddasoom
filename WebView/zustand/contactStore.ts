import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface PhoneStore {
  phoneNumbers: EmergencyPhoneNumberObject[];
  setPhoneNumbers: (phoneNumbers: EmergencyPhoneNumberObject[]) => void;
}

const usePhoneStore = create<PhoneStore>()(
  persist(
    set => ({
      phoneNumbers: [],
      setPhoneNumbers: (phoneNumbers: EmergencyPhoneNumberObject[]) =>
        set(() => ({
          phoneNumbers, // 전달받은 phoneNumbers 배열로 상태를 설정
        })),
    }),
    {
      name: "contract-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        phoneNumbers: state.phoneNumbers,
      }),
    },
  ),
);

export default usePhoneStore;
