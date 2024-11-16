import styled from "styled-components/native";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from "react-native";

export const KeyboardAvoidingContainer = styled(KeyboardAvoidingView)`
  flex: 1;
`;

export const InnerContainer = styled(View)`
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 10px;
  flex: 1;
`;

export const Title = styled(Text)`
  font-size: 40px;
  color: #333;
  margin: 0px 0px 20px 0px;
  font-family: hakgyoansimRegular;
`;

export const InfoBox = styled(View)`
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

export const InfoContent = styled(Text)`
  width: 100%;
  justify-content: center;
  flex-direction: row;
  gap: 40px;
  font-family: nanumSquareNeoRegular;
`;

export const InfoTextLeft = styled(Text)`
  font-size: 18px;
  color: #333;
  font-weight: 600;
  font-family: nanumSquareNeoRegular;
`;

export const InfoTextRight = styled(Text)`
  font-size: 18px;
  color: #333;
  font-weight: 400;
  font-family: nanumSquareNeoRegular;
`;

export const InputContainer = styled(View)`
  width: 100%;
  margin-bottom: 20px;
`;

export const LabelContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  padding: 4px;
  justify-content: flex-start;
  gap: 10px;
  margin-bottom: 8px;
`;

export const InputLabel = styled(Text)`
  font-size: 18px;
  font-family: nanumSquareNeoRegular;
`;

export const OptionalText = styled(Text)`
  color: #a8a8a8;
  font-size: 18px;
  font-family: nanumSquareNeoRegular;
`;

export const TextInputBox = styled(TextInput)`
  background-color: #f8fcf6;
  padding: 10px;
  border-radius: 10px;
  border: 1.5px solid ${(props: any) => props.theme.color.MAIN1};
  font-size: 16px;
  color: #333;
  font-family: nanumSquareNeoRegular;
`;

export const ButtonBox = styled(View)`
  width: 100%;
  gap: 10px;
  justify-content: center;
`;

export const Button = styled(TouchableOpacity)`
  width: 100%;
  background-color: ${(props: any) => props.theme.color.MAIN1};
  padding: 15px;
  border-radius: 10px;
  align-items: center;
`;

export const ButtonText = styled(Text)`
  color: white;
  font-size: 20px;
  font-family: nanumSquareNeoRegular;
`;

export const CancelBox = styled(TouchableOpacity)`
  align-items: center;
`;

export const CancelText = styled(Text)`
  color: #9c9c9c;
  font-size: 16px;
  font-family: nanumSquareNeoRegular;
`;
