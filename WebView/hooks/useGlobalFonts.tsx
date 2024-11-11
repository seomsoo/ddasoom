// useGlobalFonts.js
import * as Font from "expo-font";
import { useState, useEffect } from "react";

export const useGlobalFonts = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        hakgyoansimBold: require("../assets/fonts/Hakgyoansim-Dunggeunmiso-OTF-B.otf"),
        hakgyoansimRegular: require("../assets/fonts/Hakgyoansim-Dunggeunmiso-OTF-R.otf"),
        nanumSquareNeoBold: require("../assets/fonts/NanumSquareNeoOTF-Bd.otf"),
        nanumSquareNeoExtraBold: require("../assets/fonts/NanumSquareNeoOTF-Eb.otf"),
        nanumSquareNeoHeavy: require("../assets/fonts/NanumSquareNeoOTF-Hv.otf"),
        nanumSquareNeoLight: require("../assets/fonts/NanumSquareNeoOTF-Lt.otf"),
        nanumSquareNeoRegular: require("../assets/fonts/NanumSquareNeoOTF-Rg.otf"),
      });

      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  return fontsLoaded;
};
