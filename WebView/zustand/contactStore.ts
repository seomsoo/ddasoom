import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useContractStore = create<ContactStore>()(
  persist(
    set => ({
      phoneNumbers: [],
      setPhoneNumbers: (phone: EmergencyPhoneNumber) =>
        set(state => ({
          phoneNumbers: [...state.phoneNumbers, phone],
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

export default useContractStore;
