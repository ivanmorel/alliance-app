import { ScaledSheet } from "react-native-size-matters/extend";

import { theme } from "@styles/theme";

const style = ScaledSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: "8@vs",
    paddingLeft: "16@s",
    paddingBottom: "27@vs",
  },
  text: {
    paddingLeft: "12@s",
    fontSize: "16@s",
    lineHeight: "24@vs",
    ...theme.fonts.semiBold,
  },
});

export default style;
