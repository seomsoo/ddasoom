import { PermissionsAndroid, Platform } from "react-native";

const requestAndroid31Permissions = async () => {
  // BLE 스캔 권한 요청
  const bluetoothScanPermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN, {
    title: "Location Permission",
    message: "Bluetooth Low Energy requires Location",
    buttonPositive: "OK",
  });

  // BLE 연결 권한 요청
  const bluetoothConnectPermission = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    {
      title: "Location Permission",
      message: "Bluetooth Low Energy requires Location",
      buttonPositive: "OK",
    },
  );

  // 위치 권한 요청
  const fineLocationPermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
    title: "Location Permission",
    message: "Bluetooth Low Energy requires Location",
    buttonPositive: "OK",
  });

  // 모든 권한이 부여되었는지 확인
  return (
    bluetoothScanPermission === PermissionsAndroid.RESULTS.GRANTED &&
    bluetoothConnectPermission === PermissionsAndroid.RESULTS.GRANTED &&
    fineLocationPermission === PermissionsAndroid.RESULTS.GRANTED
  );
};

export const requestPermissions = async () => {
  if (Platform.OS === "android") {
    // 기기의 API 레벨이 31 미만인 경우
    if (Platform.Version < 31) {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      });
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      // 기기의 API 레벨이 31 이상인 경우
      const isAndroid31PermissionsGranted = await requestAndroid31Permissions();
      return isAndroid31PermissionsGranted;
    }
  } else {
    return true; // iOS에서는 권한을 요청하지 않음
  }
};
