import React, { useEffect } from "react";
import { View, Text, Modal, Image, TouchableOpacity, Alert } from "react-native";
import { useBleStore } from "@/zustand/bleStore";
import styled from "styled-components";
import cancelImg from "@/assets/images/octicon_x-12.png";
import logoImg from "@/assets/images/logo.png";

interface BleModalProps {
  bleModalVisible: boolean;
  setBleModalVisible: (visible: boolean) => void;
}

const BleModal = ({ bleModalVisible, setBleModalVisible }: BleModalProps) => {
  const { devices, connectedDevice, isScanning, isLedOn, startScan, connectToDevice, disconnectFromDevice, toggleLED } =
    useBleStore();

  // 버튼 텍스트를 상태에 따라 설정
  const getButtonText = () => {
    if (connectedDevice) return isLedOn ? "차가워지기" : "따듯해지기";
    return "";
  };

  // 버튼 클릭 핸들러
  const handleButtonPress = () => {
    if (connectedDevice) {
      toggleLED(); // LED 토글
    } else {
      startScan();
    }
  };

  useEffect(() => {
    startScan();
  }, []);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={bleModalVisible}
      onRequestClose={() => setBleModalVisible(false)}>
      <ModalOverlay>
        <ModalContent>
          <ModalText>키링 연결하기</ModalText>
          <CloseButton onPress={() => setBleModalVisible(false)}>
            <Image source={cancelImg} style={{ width: 36, height: 36 }} />
          </CloseButton>
          <InputContainer>
            <View style={{ padding: 20, justifyContent: "center", alignItems: "center" }}>
              <Image
                source={logoImg}
                style={{ width: 200, height: 200, opacity: connectedDevice ? 1 : 0.2 }}
                resizeMode="contain"
              />
            </View>
            <LabelContainer>
              {connectedDevice ? (
                <View style={{ gap: 30, alignItems: "center" }}>
                  <InputLabel>{connectedDevice.name || "따솜"}과 연결되었어요.</InputLabel>
                </View>
              ) : isScanning ? (
                <View style={{ gap: 10, alignItems: "center" }}>
                  <InputLabel>주변 따솜이 검색 중</InputLabel>
                </View>
              ) : devices.length > 0 ? (
                <View style={{ gap: 30, alignItems: "center" }}>
                  <InputLabel>연결 가능한 따솜이가 있어요.</InputLabel>
                  {devices.map(device => (
                    <DeviceButton key={device.id} onPress={() => connectToDevice(device)}>
                      <InputLabel>{device.name || "따솜"} 연결하기</InputLabel>
                    </DeviceButton>
                  ))}
                </View>
              ) : (
                <View style={{ gap: 10, alignItems: "center", justifyContent: "center" }}>
                  <InputLabel>주변에 따솜이가 없어요...</InputLabel>
                  <ModalButton onPress={startScan}>
                    <ButtonText>따솜이 찾기</ButtonText>
                  </ModalButton>
                </View>
              )}
            </LabelContainer>
          </InputContainer>
          <ButtonContainer>
            {connectedDevice ? (
              <>
                <ModalButton onPress={handleButtonPress}>
                  <ButtonText>{getButtonText()}</ButtonText>
                </ModalButton>
                <ModalButton onPress={disconnectFromDevice}>
                  <ButtonText>연결 해제</ButtonText>
                </ModalButton>
              </>
            ) : null}
          </ButtonContainer>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default BleModal;

const ModalOverlay = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled(View)`
  width: 340px;
  height: 560px;
  padding: 20px;
  background-color: ${props => props.theme.color.MAIN4};
  border-radius: 24px;
  align-items: center;
  justify-content: space-between;
`;

const ModalText = styled(Text)`
  font-size: 24px;
  padding-top: 8px;
  margin-bottom: 15px;
  text-align: center;
  font-family: hakgyoansimRegular;
`;

const CloseButton = styled(TouchableOpacity)`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const ButtonContainer = styled(View)`
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;

const ModalButton = styled(TouchableOpacity)`
  padding: 10px;
  margin: 5px;
  height: 50px;
  background-color: ${props => props.theme.color.MAIN1};
  border-radius: 12px;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled(Text)`
  color: white;
  font-size: 16px;
  font-family: nanumSquareNeoRegular;
`;

const InputContainer = styled(View)`
  width: 100%;
  gap: 30px;
  margin-bottom: 20px;
`;

const LabelContainer = styled(View)`
  align-items: center;
  padding: 4px;
  justify-content: center;
  gap: 10px;
`;

const InputLabel = styled(Text)`
  font-size: 16px;
  font-family: nanumSquareNeoRegular;
`;

const DeviceButton = styled(TouchableOpacity)`
  background-color: ${props => props.theme.color.MAIN1};
  padding: 12px;
  border-radius: 20px;
  margin-top: 10px;
`;
