import { ScaledSheet } from "react-native-size-matters/extend";

import { SUBTITLE_GRAY_COLOR, WARNING_COLOR } from "@styles/styleConstants";
import { theme } from "@styles/theme";

const styles = ScaledSheet.create({
  description: {
    fontSize: "15@s",
    textAlign: "left",
    color: SUBTITLE_GRAY_COLOR,
  },
  descriptionBold: {
    fontSize: "15@s",
    color: "rgba(0, 0, 0, 0.6)",
    textAlign: "left",
    ...theme.fonts.bold,
  },
  buttonText: {
    letterSpacing: 0.1,
  },
  warningText: {
    fontSize: "14@s",
    textAlign: "left",
    color: WARNING_COLOR,
    paddingTop: "10@vs",
  },
  footer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    color: "rgba(103, 80, 164, 1)",
    alignSelf: "center",
  },
  footerWithoutCancelButton: {
    alignItems: "flex-end",
    width: "100%",
  },
});

export default styles;
