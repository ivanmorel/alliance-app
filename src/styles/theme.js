import { configureFonts, DefaultTheme } from "react-native-paper";

import { isIOS } from "@utils/utils";

import { ACCENT_COLOR, PRIMARY_COLOR } from "./styleConstants";

const fonts = {
  thin: {
    fontFamily: isIOS() ? "Poppins-ExtraLight" : "Poppins_200ExtraLight",
  },
  light: {
    fontFamily: isIOS() ? "Poppins-Light" : "Poppins_300Light",
  },
  regular: {
    fontFamily: isIOS() ? "Poppins-Regular" : "Poppins_400Regular",
  },
  medium: {
    fontFamily: isIOS() ? "Poppins-Medium" : "Poppins_500Medium",
  },
  semiBold: {
    fontFamily: isIOS() ? "Poppins-SemiBold" : "Poppins_600SemiBold",
  },
  bold: {
    fontFamily: isIOS() ? "Poppins-Bold" : "Poppins_700Bold",
  },
};

const fontConfig = {
  ios: fonts,
  android: fonts,
};

export const theme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: PRIMARY_COLOR,
    accent: ACCENT_COLOR,
    placeholder: "rgba(0, 0, 0, 0.6)",
  },
  fonts: configureFonts(fontConfig),
};
