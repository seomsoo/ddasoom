// useBleStore.ts
import { create } from "zustand";
import { BleManager, Device } from "react-native-ble-plx";
import { Buffer } from "buffer";
import { requestPermissions } from "@/utils/ble";
import { Alert, ToastAndroid } from "react-native";

const bleManager = new BleManager();

interface BleStore {
  ledServiceUUID: string;
  ledCharacteristicUUID: string;
  devices: Device[];
  connectedDevice: Device | null;
  isScanning: boolean;
  isLedOn: boolean;
  startScan: () => Promise<void>;
  stopScan: () => void;
  connectToDevice: (device: Device) => Promise<void>;
  disconnectFromDevice: () => Promise<void>;
  toggleLED: () => Promise<void>;
}

export const useBleStore = create<BleStore>((set, get) => ({
  devices: [],
  connectedDevice: null,
  isScanning: false,
  isLedOn: false,

  // UUID 설정
  ledServiceUUID: "9c73e86c-0837-49c0-9a26-ed299e12caf1",
  ledCharacteristicUUID: "4ed65ae1-31dc-4a36-8164-0fd01cb015de",

  startScan: async () => {
    const isGranted = await requestPermissions();
    if (!isGranted) {
      Alert.alert("권한 거부", "BLE 사용을 위해 필요한 권한을 허용해주세요.");
      return;
    }

    set({ isScanning: true, devices: [] }); // 스캔 시작 시 devices 초기화
    bleManager.startDeviceScan([get().ledServiceUUID], null, (error, device) => {
      if (error) {
        console.log("스캔 에러:", error);
        set({ isScanning: false }); // 에러 발생 시 스캔 중지
        return;
      }

      if (device && device.name) {
        set(state => {
          const exists = state.devices.some(d => d.id === device.id);
          return { devices: exists ? state.devices : [...state.devices, device] };
        });
      }
    });

    // 5초 후 스캔 중지
    setTimeout(() => {
      get().stopScan();
    }, 5000);
  },

  stopScan: () => {
    bleManager.stopDeviceScan();
    set({ isScanning: false });
  },

  connectToDevice: async (device: Device) => {
    try {
      const connectedDevice = await bleManager.connectToDevice(device.id);
      await connectedDevice.discoverAllServicesAndCharacteristics();
      set({ connectedDevice });
      get().stopScan(); // 연결 성공 시 스캔 중지
      ToastAndroid.show(`${connectedDevice.name}에 연결했어요.`, 3000);
    } catch (error) {
      console.log("연결 에러:", error);
      ToastAndroid.show("따솜이 연결에 실패했어요.", 3000);
    }
  },

  disconnectFromDevice: async () => {
    const { connectedDevice } = get();
    if (connectedDevice) {
      await connectedDevice.cancelConnection();
      set({ connectedDevice: null, isLedOn: false });
      ToastAndroid.show("따솜이 연결이 해제됐어요.", 3000);
    }
  },

  toggleLED: async () => {
    const { connectedDevice, isLedOn, ledServiceUUID, ledCharacteristicUUID } = get();
    if (connectedDevice) {
      try {
        const value = isLedOn ? 0 : 1; // Toggle between 0 and 1
        const buffer = Buffer.from([value]);
        const base64Value = buffer.toString("base64");

        await bleManager.writeCharacteristicWithResponseForDevice(
          connectedDevice.id,
          ledServiceUUID,
          ledCharacteristicUUID,
          base64Value,
        );

        set({ isLedOn: !isLedOn });
        ToastAndroid.show(isLedOn ? "다시 차가운 따솜이가 됐어요." : "따뜻한 따솜이가 되었어요.", 3000);
      } catch (error) {
        console.log("LED 제어 에러:", error);
        ToastAndroid.show("따솜이가 따뜻해질 수 없어요...", 3000);
      }
    }
  },
}));
