import "styled-components";

import type GlobalStyle from "@/styles/Theme";

type GlobalStyleType = typeof GlobalStyle;

declare module "styled-components" {
  export interface DefaultTheme extends ThemeType<string, any> {}
}
