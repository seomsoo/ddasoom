import React from "react";
import BreathHeart from "@/components/breath/BreathHeart";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useHeartRate } from "@/hooks/useHeartRate";

const BreathScreen = () => {
  const { breathType } = useLocalSearchParams();

  useHeartRate(message => {
    console.log(message);
  });

  // breathType이 유효한 값인지 확인하는 타입 가드 함수
  const isValidBreathType = (type: any): type is "shortTime" | "basicTime" | "longTime" => {
    return ["shortTime", "basicTime", "longTime"].includes(type);
  };

  return (
    <>
      {breathType ? (
        <BreathHeart breathType={isValidBreathType(breathType) ? breathType : "basicTime"} />
      ) : (
        <View style={{ flex: 1 }}>
          <ActivityIndicator
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: [{ translateX: -15 }, { translateY: -25 }],
            }}
            size={"large"}
          />
        </View>
      )}
    </>
  );
};

export default BreathScreen;
