import { Colors, ColorsType } from "@/constant/Colors";

const theme = {
  color: { ...Colors },
};

export default theme;

export type ThemeType = {
  color: ColorsType;
};
