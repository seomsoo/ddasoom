import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import useGeocoding from "@/hooks/useGeocoding";
import useLocation from "@/hooks/useLocation";
import { router, useLocalSearchParams } from "expo-router";
import { timeFormat } from "@/utils/timeFormat";
import useNotificationStore from "@/zustand/notificationStore";
import { scheduleLocalNotification, sendPushNotification } from "@/utils/notifications";
import { savePanicInfoToStorage } from "@/storage/panic";

const BreathEndModal = () => {
  const { expoPushToken } = useNotificationStore();
  const { totalTime } = useLocalSearchParams();
  const { location } = useLocation();
  const { reverseGeocode, address } = useGeocoding();
  const [panicSpot, setPanicSpot] = useState("");
  const [inputText, setInputText] = useState("");

  const nowTime = new Date().toTimeString().split(" ")[0].split(":").splice(0, 2);

  const handleSave = async () => {
    const panicInfo: PanicFirstForm = {
      duration: +totalTime,
      address: panicSpot,
      description: inputText,
      latitude: location?.latitude ?? 0,
      longitude: location?.longitude ?? 0,
      startDate: new Date().toISOString(), // 한국 시간으로 변환
    };

    // panicInfo를 기기의 메모리에 저장
    await savePanicInfoToStorage(panicInfo);
    router.push("/");
  };

  const handleSkip = async () => {
    // 10분 뒤 다시 작성할 수 있게 하는 로컬 알림

    const panicInfo: PanicFirstForm = {
      duration: +totalTime,
      address: panicSpot,
      description: inputText,
      latitude: location?.latitude ?? 0,
      longitude: location?.longitude ?? 0,
      startDate: new Date().toISOString(),
    };

    // panicInfo를 기기의 메모리에 저장 + 로컬 푸시 알림 예약
    await savePanicInfoToStorage(panicInfo);

    if (expoPushToken) {
      scheduleLocalNotification({ title: "따 숨", body: "진정이 됐나요? 오늘 상황을 기록해보세요.", seconds: 5 });
    }

    router.push("/");
  };

  useEffect(() => {
    if (location) {
      reverseGeocode(location?.latitude, location?.longitude);
    }
  }, [location]);

  useEffect(() => {
    if (address) {
      setPanicSpot(address?.split(" ").splice(1).join(" "));
    } else {
      setPanicSpot("위치를 받아오는 중 입니다...");
    }
  }, [address]);

  return (
    <KeyboardAvoidingContainer behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={20}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          padding: 20,
          justifyContent: "space-between",
          backgroundColor: "#ebf4e3",
        }}>
        <InnerContainer>
          <Title>괜찮아졌나요?</Title>
          <InfoBox>
            <InfoContent>
              <InfoTextLeft>{"발생 시각   :   "}</InfoTextLeft>
              <InfoTextRight>
                {nowTime[0]}시 {nowTime[1]}분
              </InfoTextRight>
            </InfoContent>
            <InfoContent>
              <InfoTextLeft>{"경과 시간   :   "}</InfoTextLeft>
              <InfoTextRight>{timeFormat(+totalTime)}</InfoTextRight>
            </InfoContent>
            <InfoContent>
              <InfoTextLeft>{"장       소    :   "}</InfoTextLeft>
              <InfoTextRight>{panicSpot}</InfoTextRight>
            </InfoContent>
          </InfoBox>
          <InputContainer>
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
        </InnerContainer>
        <ButtonBox>
          <Button onPress={handleSave}>
            <ButtonText>저장</ButtonText>
          </Button>
          <CancelBox onPress={handleSkip}>
            <CancelText>건너뛰기</CancelText>
            <CancelText>(30분 뒤 다시 작성할 수 있어요.)</CancelText>
          </CancelBox>
        </ButtonBox>
      </ScrollView>
    </KeyboardAvoidingContainer>
  );
};

export default BreathEndModal;

const KeyboardAvoidingContainer = styled(KeyboardAvoidingView)`
  flex: 1;
`;
const InnerContainer = styled(View)`
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 10px;
  flex: 1;
`;

const Title = styled(Text)`
  font-size: 40px;
  color: #333;
  margin: 0px 0px 20px 0px;
  font-family: hakgyoansimRegular;
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

const ButtonBox = styled(View)`
  width: 100%;
  gap: 10px;
  justify-content: center;
`;

const Button = styled(TouchableOpacity)`
  width: 100%;
  background-color: ${(props: any) => props.theme.color.MAIN1};
  padding: 15px;
  border-radius: 10px;
  align-items: center;
`;

const ButtonText = styled(Text)`
  color: white;
  font-size: 20px;
  font-family: nanumSquareNeoRegular;
`;

const CancelBox = styled(TouchableOpacity)`
  align-items: center;
`;

const CancelText = styled(Text)`
  color: #9c9c9c;
  font-size: 16px;
  font-family: nanumSquareNeoRegular;
`;
