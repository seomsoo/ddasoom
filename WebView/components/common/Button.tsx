import { TouchableOpacity, Text } from "react-native";
import React from "react";
import styled from "styled-components/native";

type ButtonProps = {
  children?: React.ReactNode;
  color?: string;
  textColor?: string;
  onPress: () => void;
};

const Button = ({
  children,
  color = "white",
  textColor = "black",
  onPress,
}: ButtonProps) => {
  return (
    <ButtonWrapper onPress={onPress}>
      <ButtonContainer color={color}>
        {typeof children === "string" ? (
          <ButtonText textColor={textColor}>{children}</ButtonText>
        ) : (
          children
        )}
      </ButtonContainer>
    </ButtonWrapper>
  );
};

export default Button;

// 버튼 스타일
const ButtonWrapper = styled(TouchableOpacity)`
  width: 100%;
`;

const ButtonContainer = styled.View<{ color: string }>`
  background-color: ${({ color }: any) => color};
  padding: 12px;
  border-radius: 12px;
  width: 100%;
  height: 60px;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled(Text)<{ textColor: string }>`
  text-align: center;
  color: ${({ textColor }: any) => textColor};
  font-size: 18px;
`;
