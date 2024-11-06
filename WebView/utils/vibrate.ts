import { Vibration } from "react-native";

export const vibrate = (timeString: string) => {
  const time = Number(timeString);

  Vibration.vibrate(time);
};
