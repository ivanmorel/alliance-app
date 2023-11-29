import { ScaledSheet } from "react-native-size-matters/extend";

import {
  PRIMARY_DARK_COLOR,
  SUBTITLE_GRAY_COLOR,
} from "@styles/styleConstants";

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "48@vs",
  },
  text: {
    color: SUBTITLE_GRAY_COLOR,
    fontSize: "12@s",
    letterSpacing: "1@vs",
  },
  linkText: {
    marginLeft: "8@s",
    textDecorationLine: "underline",
    color: PRIMARY_DARK_COLOR,
    fontSize: "12@s",
    letterSpacing: "1@vs",
  },
});

export default styles;
