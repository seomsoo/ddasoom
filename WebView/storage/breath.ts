import { BreathData } from "@/types/ddasoom";
import AsyncStorage from "@react-native-async-storage/async-storage";

/** 기기 메모리에 호흡 타입 저장 */
export const saveBreathTypeToStorage = async (breathType: string) => {
  try {
    await AsyncStorage.setItem("breathType", JSON.stringify(breathType));
    console.log("breath Type saved to AsyncStorage.");
  } catch (error) {
    console.error("Failed to save breathType to AsyncStorage:", error);
  }
};

/** 기기 메모리에서 호흡 타입 조회(없으면 기본 호흡) */
export const loadBreathTypeFromStorage = async () => {
  try {
    const breathInfoString = await AsyncStorage.getItem("breathType");
    if (breathInfoString) {
      const breathType = JSON.parse(breathInfoString);
      console.log("Loaded breath Type from AsyncStorage:", breathType);
      return breathType;
    }
  } catch (error) {
    console.error("Failed to load panic info from AsyncStorage:", error);
  }
  return "basicTime"; // 없으면 무조건 기본 호흡 반환
};
