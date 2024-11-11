import React, { useEffect, useRef } from "react";
import { Animated, ImageSourcePropType } from "react-native";
import styled from "styled-components/native";
import heartImage from "@/assets/images/heart.png";
import watchImage from "@/assets/images/watch.png";

interface BreathWatchProps {
  bpm: number;
}

const BreathWatch: React.FC<BreathWatchProps> = ({ bpm }) => {
  const heartScale = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    // Heart Beat Animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(heartScale, {
          toValue: 1.4,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(heartScale, {
          toValue: 1.1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(heartScale, {
          toValue: 1.3,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.timing(heartScale, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <Background>
      <Screen>
        <WatchImage source={watchImage as ImageSourcePropType} />

        <AnimatedHeart source={heartImage as ImageSourcePropType} style={{ transform: [{ scale: heartScale }] }} />

        {/* Tick 요소들 */}
        {[...Array(12)].map((_, index) => {
          const angle = (index / 12) * (2 * Math.PI); // 각도 계산
          const radius = 45; // 반지름 (Screen 크기와 반지름을 맞춰 조정)
          const top = 50 + radius * Math.sin(angle) - 4; // 정확한 원형 배치
          const left = 50 + radius * Math.cos(angle) - 4;

          // 12시, 3시, 6시, 9시 tick을 더 크게 설정
          const isMainTick = index % 3 === 0;
          const size = isMainTick ? 9 : 4;

          return (
            <Tick
              key={index}
              style={{
                width: size,
                height: size,
                top: `${top}%`, // 퍼센트로 위치 설정
                left: `${left}%`,
              }}
            />
          );
        })}

        <BPM>{bpm} BPM</BPM>
      </Screen>
    </Background>
  );
};

export default BreathWatch;

const Background = styled.View``;

const Screen = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 90px;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const AnimatedHeart = styled(Animated.Image)`
  width: 40px;
  height: 40px;
  position: absolute;
  top: 45px;
  opacity: 0.95;
`;

const Tick = styled.View`
  background-color: #e24b4b;
  position: absolute;
  border-radius: 18px;
`;

const BPM = styled.Text`
  font-size: 18px;
  font-family: nanumSquareNeoRegular;
  color: #ffecec;
  position: absolute;
  top: 20px;
  text-align: center;
`;

const WatchImage = styled.Image`
  width: 120px;
  height: 150px;
  position: absolute;
`;
