import { ScaledSheet } from "react-native-size-matters/extend";

import { APP_BACKGROUND_COLOR } from "@styles/styleConstants";
import { theme } from "@styles/theme";

const styles = ScaledSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: APP_BACKGROUND_COLOR,
  },
  form: {
    paddingHorizontal: "48@s",
  },
  emailText: {
    letterSpacing: "1.5@vs",
    ...theme.fonts.bold,
    fontSize: "14@s",
    lineHeight: "16@vs",
    color: "#333333E5",
    textAlign: "center",
  },
  ssoErrorContainer: {
    paddingHorizontal: "30@s",
    marginTop: "-35@vs",
    paddingBottom: "20@vs",
  },
  ssoErrorText: {
    color: "#333333E5",
    fontSize: "14@s",
    lineHeight: "24@vs",
    marginTop: "20@vs",
    textAlign: "center",
  },
});

export default styles;
