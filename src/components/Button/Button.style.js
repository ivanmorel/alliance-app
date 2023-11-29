import { ScaledSheet } from "react-native-size-matters/extend";

import { theme } from "@styles/theme";

export const styles = ScaledSheet.create({
  largePadding: {
    paddingVertical: "12@s",
    paddingHorizontal: "12@s",
  },
  densePadding: {
    paddingVertical: "4@s",
    paddingHorizontal: "4@s",
  },
  noPadding: {
    alignSelf: "center",
    paddingVertical: 0,
    paddingHorizontal: 0,
    padding: 0,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    letterSpacing: "1.25@s",
    fontSize: "14@s",
    ...theme.fonts.medium,
  },
});
