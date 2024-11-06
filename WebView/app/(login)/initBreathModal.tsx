import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import styled from "styled-components";
import Button from "@/components/common/Button";
import { router } from "expo-router";
import theme from "@/styles/Theme";

const InitBreathModal = () => {
  return (
    <Container>
      <InnerContainer>
        <Header>
          <HeaderText>심박수 측정</HeaderText>
        </Header>
        <Content>
          <ContentText>평균 심박수 측정을 진행합니다.</ContentText>
          <ContentText2>1분 간 편안한 상태를 유지해주세요.</ContentText2>
        </Content>
        <ButtonBox>
          <SmallButton onPress={() => router.push("measureBpm")} style={{}}>
            <Text style={{ fontSize: 20, color: "white" }}>측정하기</Text>
          </SmallButton>
          <SmallButton
            onPress={() => {
              router.push("/");
            }}
            style={{}}>
            <Text style={{ fontSize: 20, color: "white" }}>건너뛰기</Text>
          </SmallButton>
        </ButtonBox>
      </InnerContainer>
    </Container>
  );
};

export default InitBreathModal;

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

const InnerContainer = styled(View)`
  width: 320px;
  height: 300px;
  background-color: ${props => props.theme.color.BACKGROUND};
  border-radius: 16px;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  padding-bottom: 30px;
`;

const Header = styled(View)`
  width: 100%;
  align-items: center;
  height: 60px;
  justify-content: center;
`;

const Content = styled(View)`
  width: 280px;
  gap: 6px;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const HeaderText = styled(Text)`
  font-size: 24px;
  font-weight: 600;
`;

const ContentText = styled(Text)`
  font-size: 20px;
`;

const ContentText2 = styled(Text)`
  font-size: 16px;
`;

const ButtonBox = styled(View)`
  flex-direction: row;
  width: 100%;
  gap: 10px;
  justify-content: center;
`;

const SmallButton = styled(TouchableOpacity)`
  background-color: ${props => props.theme.color.MAIN1};
  padding: 10px 24px 13px 24px;
  border-radius: 8px;
`;
