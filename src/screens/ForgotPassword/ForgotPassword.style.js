import { ScaledSheet } from "react-native-size-matters/extend";

import {
  APP_BACKGROUND_COLOR,
  SUBTITLE_STRONG_GRAY_COLOR,
} from "@styles/styleConstants";

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_BACKGROUND_COLOR,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: "24@s",
    paddingBottom: "24@vs",
  },
  form: {
    paddingTop: "21@vs",
    paddingBottom: "16@vs",
    paddingHorizontal: "24@s",
  },
  guideText: {
    textAlign: "center",
    color: SUBTITLE_STRONG_GRAY_COLOR,
    fontSize: "14@s",
    letterSpacing: "1@vs",
  },
  emailInput: {
    marginTop: "24@vs",
  },
  goBackButton: {
    marginVertical: "24@vs",
  },
  returnToSocialButton: {
    marginBottom: "24@vs",
  },
  snackbar: {
    textAlign: "center",
    fontSize: "16@s",
    lineHeight: "24@s",
  },
});

export default styles;
