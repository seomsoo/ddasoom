import React from "react";
import styled from "styled-components/native";
import BackIcon from "@/assets/svgs/backIcon.svg";
import { router } from "expo-router";
import { Pressable, Text, Vibration } from "react-native";

interface HeaderProps {
  label: string;
  color?: string;
}

export default function Header({ label, color = "#262626" }: HeaderProps) {
  return (
    <Container>
      <BackButton
        onPress={() => {
          router.back();
          Vibration.cancel();
        }}>
        <BackIcon color={color} />
      </BackButton>
      <Title>{label}</Title>
    </Container>
  );
}

const Container = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  margin-left: 12px;
`;

const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 8px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-family: "hakgyoansimR";
  text-align: center;
  color: #262626;
`;
