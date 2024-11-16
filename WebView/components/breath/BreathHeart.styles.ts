// BreathCircle.styles.ts
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
`;

export const HeaderContainer = styled.View`
  margin-top: 20px;
  left: -8px;
  position: absolute;
`;

export const FooterContainer = styled.View`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: -4px;
`;

export const ContentContainer = styled.View`
  flex: 1;
  align-items: center;
  margin-top: 16px;
`;

export const TimerContainer = styled.View`
  height: 80px;
  align-items: center;
`;

export const PreparationContainer = styled.View`
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;

export const DotContainer = styled.View`
  flex-direction: row;
  margin-top: 5px;
`;

export const Dot = styled.View<{ active: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-color: ${(props: any) => (props.active ? "#34c449" : "#ccc")};
  margin: 0 5px;
`;

export const TextContainer = styled.View`
  position: absolute;
  margin-top: 100px;
  align-items: center;
`;

export const DescriptionText = styled.Text`
  font-size: 40px;
  font-family: "hakgyoansimRegular";
`;

export const TimerText = styled.Text`
  font-size: 24px;
  margin-top: 5px;
  font-family: "nanumSquareNeoRegular";
`;

export const AnimationBackground = styled.View`
  background-color: #b0e4b7;
  border-radius: 115px;
  width: 230px;
  height: 230px;
  position: absolute;
`;

export const StopButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 20px;
  right: 18px;
  align-self: center;
  background-color: #82e090;
  padding: 10px 20px;
  border-radius: 30px;
`;

export const StopButtonText = styled.Text`
  font-size: 16px;
  color: #fff;
  font-family: "nanumSquareNeoRegular";
`;
