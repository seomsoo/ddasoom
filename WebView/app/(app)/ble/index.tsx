import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, TouchableOpacity, Alert } from "react-native";
import { BleManager, Device } from "react-native-ble-plx";
import { requestPermissions } from "@/utils/ble";
import { Buffer } from "buffer";

const bleManager = new BleManager();

const BleScreen = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isLedOn, setIsLedOn] = useState(false);

  // 아두이노와 동일한 UUID 사용
  const ledServiceUUID = "9c73e86c-0837-49c0-9a26-ed299e12caf1";
  const ledCharacteristicUUID = "4ed65ae1-31dc-4a36-8164-0fd01cb015de";

  const startScan = async () => {
    const isGranted = await requestPermissions();
    if (!isGranted) {
      Alert.alert("권한 거부", "BLE 사용을 위해 필요한 권한을 허용해주세요.");
      return;
    }

    setIsScanning(true);
    // ledServiceUUID를 필터로 추가
    bleManager.startDeviceScan([ledServiceUUID], null, (error, device) => {
      if (error) {
        console.log("스캔 에러:", error);
        return;
      }

      if (device && device.name) {
        setDevices(prevDevices => {
          const exists = prevDevices.some(d => d.id === device.id);
          return exists ? prevDevices : [...prevDevices, device];
        });
      }
    });
  };

  const stopScan = () => {
    bleManager.stopDeviceScan();
    setIsScanning(false);
  };

  const connectToDevice = async (device: Device) => {
    try {
      const connectedDevice = await bleManager.connectToDevice(device.id);
      await connectedDevice.discoverAllServicesAndCharacteristics();

      // 서비스와 특성을 로그로 출력
      const services = await connectedDevice.services();
      for (const service of services) {
        console.log("Service:", service.uuid);
        const characteristics = await service.characteristics();
        for (const characteristic of characteristics) {
          console.log("Characteristic:", characteristic.uuid);
        }
      }

      setConnectedDevice(connectedDevice);
      Alert.alert("연결 성공", `${connectedDevice.name}에 연결되었습니다.`);
    } catch (error) {
      console.log("연결 에러:", error);
      Alert.alert("연결 실패", "기기 연결에 실패했습니다.");
    }
  };

  const disconnectFromDevice = async () => {
    if (connectedDevice) {
      await connectedDevice.cancelConnection();
      setConnectedDevice(null);
      setIsLedOn(false);
      Alert.alert("연결 해제", "기기 연결이 해제되었습니다.");
    }
  };

  const toggleLED = async () => {
    if (connectedDevice) {
      try {
        const value = isLedOn ? 0 : 1; // Toggle between 0 and 1
        const buffer = Buffer.from([value]); // Create a buffer with a single byte
        const base64Value = buffer.toString("base64"); // Convert buffer to base64

        console.log("Sending value to characteristic:", value, base64Value);

        await bleManager.writeCharacteristicWithResponseForDevice(
          connectedDevice.id,
          ledServiceUUID,
          ledCharacteristicUUID,
          base64Value,
        );

        console.log("Write successful");

        setIsLedOn(!isLedOn);
        Alert.alert("LED 상태 변경", isLedOn ? "LED OFF" : "LED ON");
      } catch (error) {
        console.log("LED 제어 에러:", error);
        Alert.alert("LED 제어 실패", "LED 상태를 변경할 수 없습니다.");
      }
    } else {
      console.log("No connected device");
    }
  };

  useEffect(() => {
    return () => {
      bleManager.destroy();
    };
  }, []);

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 16 }}>BLE 디바이스</Text>

      {connectedDevice ? (
        <View>
          <Text style={{ marginBottom: 10 }}>연결된 기기: {connectedDevice.name}</Text>
          <Button title={isLedOn ? "LED 끄기" : "LED 켜기"} onPress={toggleLED} />
          <View style={{ marginTop: 10 }}>
            <Button title="연결 해제" onPress={disconnectFromDevice} />
          </View>
        </View>
      ) : (
        <View>
          <Button title={isScanning ? "스캔 중지" : "스캔 시작"} onPress={isScanning ? stopScan : startScan} />
          <FlatList
            data={devices}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => connectToDevice(item)}
                style={{
                  padding: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                }}>
                <Text style={{ fontSize: 16 }}>{item.name}</Text>
                <Text style={{ fontSize: 12, color: "#666" }}>ID: {item.id}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default BleScreen;
