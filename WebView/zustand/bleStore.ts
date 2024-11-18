import { create } from "zustand";
import { BleManager, Device, State } from "react-native-ble-plx";
import { Buffer } from "buffer";
import { requestPermissions } from "@/utils/ble";
import { Alert, ToastAndroid } from "react-native";

let bleManager: BleManager | null = new BleManager();
let timerId: NodeJS.Timeout | null = null; // 타이머 ID 저장 변수

interface BleStore {
  ledServiceUUID: string;
  ledCharacteristicUUID: string;
  devices: Device[];
  connectedDevice: Device | null;
  isScanning: boolean;
  isLedOn: boolean;
  initializeBleManager: () => void;
  destroyBleManager: () => void;
  startScan: () => Promise<void>;
  stopScan: () => void;
  connectToDevice: (device: Device) => Promise<void>;
  disconnectFromDevice: () => Promise<void>;
  toggleLED: () => Promise<void>;
  turnOnLED: () => Promise<void>;
  turnOffLED: () => Promise<void>;
  turnOnWithTimer: () => Promise<void>;
}

export const useBleStore = create<BleStore>((set, get) => ({
  devices: [],
  connectedDevice: null,
  isScanning: false,
  isLedOn: false,

  ledServiceUUID: "9c73e86c-0837-49c0-9a26-ed299e12caf1",
  ledCharacteristicUUID: "4ed65ae1-31dc-4a36-8164-0fd01cb015de",

  initializeBleManager: () => {
    if (!bleManager) {
      bleManager = new BleManager();
      console.log("BleManager initialized");
    }

    bleManager.onDeviceDisconnected(get().ledServiceUUID, (error, device) => {
      if (error) {
        console.log("연결 해제 에러:", error);
        return;
      }
      console.log("기기 연결이 해제되었습니다:", device?.name);
      set({ connectedDevice: null, isLedOn: false });
      ToastAndroid.show("따솜이 연결이 해제되었습니다.", 1500);
    });
  },

  destroyBleManager: () => {
    if (bleManager) {
      bleManager.destroy();
      bleManager = null;
      console.log("BleManager destroyed");
    }
  },

  startScan: async () => {
    const isGranted = await requestPermissions();
    if (!isGranted) {
      Alert.alert("권한 거부", "BLE 사용을 위해 필요한 권한을 허용해주세요.");
      return;
    }

    set({ isScanning: true, devices: [] });
    bleManager?.startDeviceScan([get().ledServiceUUID], null, (error, device) => {
      if (error) {
        console.log("스캔 에러:", error);
        set({ isScanning: false });
        return;
      }

      if (device && device.name) {
        set(state => {
          const exists = state.devices.some(d => d.id === device.id);
          return { devices: exists ? state.devices : [...state.devices, device] };
        });
      }
    });

    setTimeout(() => {
      get().stopScan();
    }, 5000);
  },

  stopScan: () => {
    bleManager?.stopDeviceScan();
    set({ isScanning: false });
  },

  connectToDevice: async (device: Device) => {
    try {
      const connectedDevice = await bleManager?.connectToDevice(device.id);
      if (!connectedDevice) return;

      await connectedDevice.discoverAllServicesAndCharacteristics();
      set({ connectedDevice });
      get().stopScan();
      ToastAndroid.show(`${connectedDevice.name}에 연결했어요.`, 1500);
    } catch (error) {
      console.log("연결 에러:", error);
      set({ connectedDevice: null });
      ToastAndroid.show("따솜이 연결에 실패했어요.", 1500);
    }
  },

  disconnectFromDevice: async () => {
    const { connectedDevice } = get();
    if (connectedDevice) {
      await connectedDevice.cancelConnection();
      set({ connectedDevice: null, isLedOn: false });
      ToastAndroid.show("따솜이 연결이 해제됐어요.", 1500);
    }
  },

  toggleLED: async () => {
    const { connectedDevice, isLedOn, ledServiceUUID, ledCharacteristicUUID } = get();
    if (connectedDevice) {
      try {
        const value = isLedOn ? 0 : 1;
        const buffer = Buffer.from([value]);
        const base64Value = buffer.toString("base64");

        await bleManager?.writeCharacteristicWithResponseForDevice(
          connectedDevice.id,
          ledServiceUUID,
          ledCharacteristicUUID,
          base64Value,
        );

        set({ isLedOn: !isLedOn });
        ToastAndroid.show(isLedOn ? "다시 차가운 따솜이가 됐어요." : "따뜻한 따솜이가 되었어요.", 3000);
      } catch (error) {
        console.log("LED 제어 에러:", error);
        ToastAndroid.show("따솜이가 따뜻해질 수 없어요...", 1500);
      }
    }
  },

  turnOnLED: async () => {
    const { connectedDevice, isLedOn, ledServiceUUID, ledCharacteristicUUID } = get();
    if (connectedDevice && !isLedOn) {
      try {
        const buffer = Buffer.from([1]); // Turn on LED
        const base64Value = buffer.toString("base64");

        await bleManager?.writeCharacteristicWithResponseForDevice(
          connectedDevice.id,
          ledServiceUUID,
          ledCharacteristicUUID,
          base64Value,
        );

        set({ isLedOn: true });
        ToastAndroid.show("따소미가 따듯해졌어요", 1500);
      } catch (error) {
        console.log("LED 켜기 에러:", error);
        ToastAndroid.show("따소미를 따듯하게 할 수 없어요..", 1500);
      }
    }
  },

  turnOffLED: async () => {
    const { connectedDevice, isLedOn, ledServiceUUID, ledCharacteristicUUID } = get();
    if (connectedDevice && isLedOn) {
      try {
        const buffer = Buffer.from([0]); // Turn off LED
        const base64Value = buffer.toString("base64");

        await bleManager?.writeCharacteristicWithResponseForDevice(
          connectedDevice.id,
          ledServiceUUID,
          ledCharacteristicUUID,
          base64Value,
        );

        set({ isLedOn: false });
        ToastAndroid.show("따소미가 차가워졌어요.", 1500);
      } catch (error) {
        console.log("LED 끄기 에러:", error);
        ToastAndroid.show("따소미를 다시 차갑게 할 수 없어요..", 1500);
      }
    }
  },

  turnOnWithTimer: async () => {
    const { connectedDevice, isLedOn, ledServiceUUID, ledCharacteristicUUID } = get();
    if (connectedDevice && !isLedOn) {
      try {
        // 2의 값을 전달하여 LED를 켭니다.
        const buffer = Buffer.from([2]);
        const base64Value = buffer.toString("base64");

        await bleManager?.writeCharacteristicWithResponseForDevice(
          connectedDevice.id,
          ledServiceUUID,
          ledCharacteristicUUID,
          base64Value,
        );

        set({ isLedOn: true });
        ToastAndroid.show(`따소미가 5분간 따듯해져요.`, 1500);
      } catch (error) {
        console.log("타이머로 LED 켜기 에러:", error);
        ToastAndroid.show("따소미를 따듯하게 할 수 없어요...", 1500);
      }
    }
  },
}));
