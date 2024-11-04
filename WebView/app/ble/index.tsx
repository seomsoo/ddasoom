import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, TouchableOpacity, PermissionsAndroid, Platform, Alert } from "react-native";
import { BleManager, Device } from "react-native-ble-plx";
import { requestPermissions } from "../../utils/ble"; // 권한 요청 함수 import

const bleManager = new BleManager();

const BleScreen = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  // 권한 요청 및 스캔 시작
  const startScan = async () => {
    const isGranted = await requestPermissions();
    if (!isGranted) {
      Alert.alert("Permissions Denied", "Please enable the necessary permissions.");
      return;
    }

    setIsScanning(true);
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log("Scan error:", error);
        return;
      }

      // 발견된 장치 중 이름이 있는 장치를 필터링하여 추가
      if (device && device.name) {
        setDevices(prevDevices => {
          const exists = prevDevices.some(d => d.id === device.id);
          return exists ? prevDevices : [...prevDevices, device];
        });
      }
    });
  };

  // 스캔 중지
  const stopScan = () => {
    bleManager.stopDeviceScan();
    setIsScanning(false);
  };

  // 장치에 연결
  const connectToDevice = async (device: Device) => {
    try {
      const connectedDevice = await bleManager.connectToDevice(device.id);
      await connectedDevice.discoverAllServicesAndCharacteristics();
      setConnectedDevice(connectedDevice);
      Alert.alert("Connected", `Connected to ${connectedDevice.name}`);
    } catch (error) {
      console.log("Connection error:", error);
      Alert.alert("Connection Failed", "Failed to connect to device.");
    }
  };

  // 장치에서 연결 해제
  const disconnectFromDevice = async () => {
    if (connectedDevice) {
      await connectedDevice.cancelConnection();
      setConnectedDevice(null);
      Alert.alert("Disconnected", "Device has been disconnected.");
    }
  };

  useEffect(() => {
    return () => {
      bleManager.destroy(); // 컴포넌트가 언마운트될 때 BLE 매니저 정리
    };
  }, []);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 16 }}>BLE Devices</Text>
      {connectedDevice ? (
        <View>
          <Text>Connected to: {connectedDevice.name}</Text>
          <Button title="Disconnect" onPress={disconnectFromDevice} />
        </View>
      ) : (
        <View>
          <Button title={isScanning ? "Stop Scanning" : "Start Scanning"} onPress={isScanning ? stopScan : startScan} />
          <FlatList
            data={devices}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => connectToDevice(item)} style={{ padding: 10, borderBottomWidth: 1 }}>
                <Text>{item.name}</Text>
                <Text>ID: {item.id}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default BleScreen;
