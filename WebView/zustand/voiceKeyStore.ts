import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useVoiceKeyStore = create<VoiceKeyStore>()(
  persist(
    set => ({
      voiceKey: "4YfrbQK40Ch5hslvU2Fs",
      setVoiceKey: (voiceKey: VoiceKey) =>
        set(() => ({
          voiceKey: voiceKey, // 전달받은 voiceKey 값을 설정
        })),
    }),
    {
      name: "voiceKey-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        voiceKey: state.voiceKey,
      }),
    },
  ),
);

export default useVoiceKeyStore;
