import { TouchableOpacity, Text, Image, ImageSourcePropType } from "react-native";
import React from "react";
import styled from "styled-components/native";

type ButtonProps = {
  children: React.ReactNode;
  color?: string;
  textColor?: string;
  onPress: () => void;
  icon?: ImageSourcePropType;
  iconPosition?: "left16" | "bottomLeft";
};

const Button: React.FC<ButtonProps> = ({
  children,
  color = "white",
  textColor = "black",
  onPress,
  icon,
  iconPosition = "left16",
}) => {
  return (
    <ButtonWrapper onPress={onPress}>
      <ButtonContainer color={color}>
        {icon && <Icon source={icon} iconPosition={iconPosition} />}
        <ButtonText textColor={textColor}>{children}</ButtonText>
      </ButtonContainer>
    </ButtonWrapper>
  );
};

export default Button;

const ButtonWrapper = styled(TouchableOpacity)`
  width: 100%;
`;

const ButtonContainer = styled.View<{ color: string }>`
  background-color: ${({ color }: any) => color};
  padding: 18px;
  border-radius: 12px;
  width: 100%;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Icon = styled(Image)<{ iconPosition: string }>`
  position: absolute;
  left: ${({ iconPosition }: any) => (iconPosition === "bottomLeft" ? "28px" : "16px")};
  bottom: ${({ iconPosition }: any) => (iconPosition === "bottomLeft" ? "0px" : "auto")};
`;

const ButtonText = styled(Text)<{ textColor: string }>`
  color: ${({ textColor }: any) => textColor};
  font-size: 18px;
  text-align: center;
  margin-bottom: 3px;
  font-family: nanumSquareNeoRegular;
`;
