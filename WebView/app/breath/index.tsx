import { View } from "react-native";
import React, { useState } from "react";
import styled from "styled-components";
import BreathHeart from "@/components/breath/BreathHeart";
import BreathToggle from "@/components/breath/BreathToggle";

export type BreathType = "breath" | "focus";

const BreathScreen = () => {
  const [toggleState, setToggleState] = useState<BreathType>("breath");

  return (
    <Container>
      <BreathToggle toggleState={toggleState} setToggleState={setToggleState} />
      {toggleState === "breath" && <BreathHeart timing="basicTime" />}
      {toggleState === "focus" && <></>}
    </Container>
  );
};

export default BreathScreen;

const Container = styled(View)`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.color.BACKGROUND};
`;
