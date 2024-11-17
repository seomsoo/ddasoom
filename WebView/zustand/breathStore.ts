import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useBreathStore = create<BreathStore>()(
  persist(
    set => ({
      breathType: "basicTime",
      breathTime: 0,
      setBreathType: (breathType: BreathType) => set({ breathType }),
      setBreathTime: (time: number) => set({ breathTime: time }),
    }),
    {
      name: "breath-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        breathType: state.breathType,
      }),
    },
  ),
);

export default useBreathStore;
