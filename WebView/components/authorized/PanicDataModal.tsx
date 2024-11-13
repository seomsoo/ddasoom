import React from "react";
import { Modal, View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import styled from "styled-components";
import cancelImg from "@/assets/images/octicon_x-12.png";
import { convertToKST, getLocalISOString, timeFormat } from "@/utils/timeFormat";

interface PanicDataModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  inputText: string;
  setInputText: (text: string) => void;
  handleSave: () => void;
  handleCancel: () => void;
  panicData: PanicFirstForm | null;
}

const PanicDataModal = ({
  panicData,
  modalVisible,
  setModalVisible,
  inputText,
  setInputText,
  handleSave,
  handleCancel,
}: PanicDataModalProps) => {
  const nowTime = getLocalISOString();
  const nowTimeArr = nowTime.split("T")[1].split(":");

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}>
      <ModalOverlay>
        <ModalContent>
          <ModalText>이전 공황 기록</ModalText>
          <CloseButton onPress={() => setModalVisible(false)}>
            <Image source={cancelImg} style={{ width: 36, height: 36 }} />
          </CloseButton>
          <InputContainer>
            <InfoBox>
              <InfoContent>
                <InfoTextLeft>{"발생 시각   :   "}</InfoTextLeft>
                <InfoTextRight>
                  {nowTimeArr[0]}시 {nowTimeArr[1]}분
                </InfoTextRight>
              </InfoContent>
              <InfoContent>
                <InfoTextLeft>{"경과 시간   :   "}</InfoTextLeft>
                <InfoTextRight>{timeFormat(panicData?.duration ?? 0)}</InfoTextRight>
              </InfoContent>
              <InfoContent>
                <InfoTextLeft>{"장       소    :   "}</InfoTextLeft>
                <InfoTextRight>{panicData?.address}</InfoTextRight>
              </InfoContent>
            </InfoBox>
            <LabelContainer>
              <InputLabel>한줄 기록</InputLabel>
              <OptionalText>*선택사항</OptionalText>
            </LabelContainer>
            <TextInputBox
              value={inputText}
              onChangeText={(text: string) => setInputText(text)}
              placeholder="기록을 입력하세요"
            />
          </InputContainer>
          <ButtonContainer>
            <ModalButton onPress={handleSave}>
              <ButtonText>저장</ButtonText>
            </ModalButton>
            <ModalButton onPress={handleCancel} style={{ backgroundColor: "#B6D89A" }}>
              <ButtonText>취소</ButtonText>
            </ModalButton>
          </ButtonContainer>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default PanicDataModal;

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
  background-color: white;
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
  justify-content: space-between;
  width: 100%;
`;

const ModalButton = styled(TouchableOpacity)`
  flex: 1;
  padding: 10px;
  margin: 0px 5px;
  height: 50px;
  background-color: ${props => props.theme.color.MAIN1};
  border-radius: 12px;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled(Text)`
  color: white;
  font-size: 18px;
  font-family: nanumSquareNeoRegular;
  padding-bottom: 2px;
`;
const InfoBox = styled(View)`
  width: 100%;
  min-height: 250px;
  justify-content: center;
  background-color: #f8fcf6;
  border-radius: 12px;
  padding: 45px 20px;
  border: 1.5px solid ${(props: any) => props.theme.color.MAIN1};
  margin-bottom: 20px;
  gap: 30px;
`;

const InfoContent = styled(Text)`
  width: 100%;
  justify-content: center;
  flex-direction: row;
  gap: 40px;
  font-family: nanumSquareNeoRegular;
`;

const InfoTextLeft = styled(Text)`
  font-size: 18px;
  color: #333;
  font-weight: 600;
  font-family: nanumSquareNeoRegular;
`;
const InfoTextRight = styled(Text)`
  font-size: 18px;
  color: #333;
  font-weight: 400;
  font-family: nanumSquareNeoRegular;
`;

const InputContainer = styled(View)`
  width: 100%;
  margin-bottom: 20px;
`;

const LabelContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  padding: 4px;
  justify-content: flex-start;
  gap: 10px;
  margin-bottom: 8px;
`;

const InputLabel = styled(Text)`
  font-size: 18px;
  font-family: nanumSquareNeoRegular;
`;

const OptionalText = styled(Text)`
  color: #a8a8a8;
  font-size: 18px;
  font-family: nanumSquareNeoRegular;
`;

const TextInputBox = styled(TextInput)`
  background-color: #f8fcf6;
  padding: 10px;
  border-radius: 10px;
  border: 1.5px solid ${(props: any) => props.theme.color.MAIN1};
  font-size: 16px;
  color: #333;
  font-family: nanumSquareNeoRegular;
`;
