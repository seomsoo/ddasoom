import { ScrollView, Platform, ToastAndroid } from "react-native";
import React, { useEffect, useState } from "react";
import useGeocoding from "@/hooks/useGeocoding";
import useLocation from "@/hooks/useLocation";
import { router, useLocalSearchParams } from "expo-router";
import { getLocalISOString, timeFormat } from "@/utils/timeFormat";
import useNotificationStore from "@/zustand/notificationStore";
import { scheduleLocalNotification } from "@/utils/notifications";
import { savePanicInfoToStorage } from "@/storage/panic";
import useAuthStore from "@/zustand/authStore";
import * as Network from "expo-network";
import usePhoneStore from "@/zustand/contactStore";
import { postPhoneMessageToList } from "@/services/phone";
import { postPanicAtFirst } from "@/services/panic";
import {
  KeyboardAvoidingContainer,
  InnerContainer,
  Title,
  InfoBox,
  InfoContent,
  InfoTextLeft,
  InfoTextRight,
  InputContainer,
  LabelContainer,
  InputLabel,
  OptionalText,
  TextInputBox,
  ButtonBox,
  Button,
  ButtonText,
  CancelBox,
  CancelText,
} from "./_breathEndModal.styles";

const PANIC_TIME = 5;

const BreathEndModal = () => {
  const { token, userName } = useAuthStore();
  const { expoPushToken } = useNotificationStore();
  const { totalTime } = useLocalSearchParams();
  const { location } = useLocation();
  const { reverseGeocode, address } = useGeocoding();
  const [panicSpot, setPanicSpot] = useState("");
  const [inputText, setInputText] = useState("");
  const { phoneNumbers } = usePhoneStore();

  const nowTime = getLocalISOString();
  const nowTimeArr = nowTime.split("T")[1].split(":");

  const handleSave = async () => {
    const panicInfo: PanicFirstForm = {
      duration: +totalTime,
      address: panicSpot,
      description: inputText,
      latitude: location?.latitude ?? 0,
      longitude: location?.longitude ?? 0,
      startDate: nowTime, // 한국 시간으로 변환
    };

    const networkState = await Network.getNetworkStateAsync();
    if (networkState.isConnected) {
      // 시간이 PANIC_TIME 이상 되면 긴급 상황 문자 보내기
      if (Number(totalTime) >= PANIC_TIME) {
        //문자
        console.log("전송 시도", userName, phoneNumbers);
        const newList = phoneNumbers.map(numberItem => numberItem.PhoneNumber);
        await postPhoneMessageToList({ name: userName, phoneNumbers: newList });
      }

      // 네트워크 있으니 서버로 바로 저장하기
      await postPanicAtFirst(panicInfo);
      router.push("(app)/authorized");
      return;
    } else {
      // 네트워크 없으면 임시 저장
      await savePanicInfoToStorage(panicInfo);
      ToastAndroid.show("로그인 후 다시 확인할 수 있어요.", 3000);
      router.push("(app)/(login)");
    }
  };

  // handleSkip 함수
  const handleSkip = async () => {
    // 10분 뒤 다시 작성할 수 있게 하는 로컬 알림

    const panicInfo: PanicFirstForm = {
      duration: +totalTime,
      address: panicSpot,
      description: inputText,
      latitude: location?.latitude ?? 0,
      longitude: location?.longitude ?? 0,
      startDate: nowTime,
    };

    // panicInfo를 기기의 메모리에 저장 + 로컬 푸시 알림 예약
    await savePanicInfoToStorage(panicInfo);

    if (expoPushToken) {
      scheduleLocalNotification({ title: "따 숨", body: "진정이 됐나요? 오늘 상황을 기록해보세요.", seconds: 10 });
    }

    // 네트워크 상태 확인 후 조건에 따라 페이지 이동
    const networkState = await Network.getNetworkStateAsync();
    if (networkState.isConnected) {
      // 시간이 PANIC_TIME 이상 되면 긴급 상황 문자 보내기
      if (Number(totalTime) >= PANIC_TIME) {
        //문자
        const numberArray = phoneNumbers.map(entry => entry.PhoneNumber);
        await postPhoneMessageToList({ name: userName, phoneNumbers: numberArray });
      }
      router.push("(app)/authorized");
      return;
    }

    router.push("(app)/(login)");
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
      setPanicSpot("주소 불러오는 중...");
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
                {nowTimeArr[0]}시 {nowTimeArr[1]}분
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
            <CancelText>(이후에 다시 작성할 수 있어요.)</CancelText>
          </CancelBox>
        </ButtonBox>
      </ScrollView>
    </KeyboardAvoidingContainer>
  );
};

export default BreathEndModal;
