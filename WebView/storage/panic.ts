import AsyncStorage from "@react-native-async-storage/async-storage";

/** 기기 메모리에 패닉 데이터 저장 */
export const savePanicInfoToStorage = async (panicInfo: PanicFirstForm) => {
  try {
    await AsyncStorage.setItem("panicInfo", JSON.stringify(panicInfo));
    console.log("Panic info saved to AsyncStorage.");
  } catch (error) {
    console.error("Failed to save panic info to AsyncStorage:", error);
  }
};

/** 기기 메모리에서 패닉 데이터 조회 -> 있으면 로그인 후 모달 띄워서 입력하게 */
export const loadPanicInfoFromStorage = async () => {
  try {
    const panicInfoString = await AsyncStorage.getItem("panicInfo");
    if (panicInfoString) {
      const panicInfo = JSON.parse(panicInfoString);
      console.log("Loaded panic info from AsyncStorage:", panicInfo);
      return panicInfo;
    }
  } catch (error) {
    console.error("Failed to load panic info from AsyncStorage:", error);
  }
  return null;
};

/** 기기 메모리에 저장된 패닉 데이터 삭제 */
export const deletePanicInfoFromStorage = async () => {
  try {
    await AsyncStorage.removeItem("panicInfo");
    console.log("Panic info deleted from AsyncStorage.");
  } catch (error) {
    console.error("Failed to delete panic info from AsyncStorage:", error);
  }
};
