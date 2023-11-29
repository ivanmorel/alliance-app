import { ScaledSheet } from "react-native-size-matters/extend";

import {
  PRIMARY_DARK_COLOR,
  SUBTITLE_GRAY_COLOR,
} from "@styles/styleConstants";

const styles = ScaledSheet.create({
  container: {
    alignItems: "center",
    marginVertical: "64@vs",
  },
  termsAndConditionsText: {
    flexDirection: "row",
    marginBottom: "16@vs",
  },
  linkText: {
    textDecorationLine: "underline",
    color: PRIMARY_DARK_COLOR,
    fontSize: "10@s",
    letterSpacing: "1@vs",
    marginHorizontal: "16@s",
  },
  footerText: {
    textAlign: "center",
    color: SUBTITLE_GRAY_COLOR,
    fontSize: "10@s",
    letterSpacing: "1@vs",
    textTransform: "uppercase",
  },
  version: {
    color: "black",
    marginTop: "4@vs",
    opacity: 0.4,
  },
});

export default styles;
