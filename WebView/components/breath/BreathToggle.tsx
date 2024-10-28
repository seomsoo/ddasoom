import { View, Text, Pressable, Vibration } from "react-native";
import React from "react";
import styled from "styled-components";
import { BreathType } from "@/app/breath";

interface BreathToggleProps {
  toggleState: BreathType;
  setToggleState: (type: BreathType) => void;
}

const BreathToggle = ({ toggleState, setToggleState }: BreathToggleProps) => {
  const handleBreathTab = () => {
    if (toggleState === "breath") {
      return;
    }
    setToggleState("breath");
  };

  const handleFocusTab = () => {
    if (toggleState === "focus") {
      return;
    }
    Vibration.cancel();
    setToggleState("focus");
  };

  return (
    <BreathToggleBox>
      <ToggleTextBox
        active={toggleState === "breath"}
        onPress={handleBreathTab}
      >
        <ToggleText>호흡하기</ToggleText>
      </ToggleTextBox>
      <ToggleTextBox active={toggleState === "focus"} onPress={handleFocusTab}>
        <ToggleText>집중하기</ToggleText>
      </ToggleTextBox>
    </BreathToggleBox>
  );
};

export default BreathToggle;

const BreathToggleBox = styled(View)`
  flex-direction: row;
  background-color: ${(props) => props.theme.color.WHITE};
  border-radius: 24px;
  align-items: center;
  justify-content: center;
  padding: 6px;
  margin-top: 60px;
`;

const ToggleTextBox = styled(Pressable)<{ active: boolean }>`
  background-color: ${(props) =>
    props.active ? props.theme.color.MAIN3 : "transparent"};
  width: 88px;
  height: 32px;
  border: 2px solid
    ${(props) => (props.active ? props.theme.color.MAIN1 : "transparent")};
  border-radius: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ToggleText = styled(Text)`
  font-size: 14px;
`;
