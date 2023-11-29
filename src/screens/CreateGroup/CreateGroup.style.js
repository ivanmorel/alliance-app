import { ScaledSheet } from "react-native-size-matters/extend";

import {
  APP_BACKGROUND_COLOR,
  SUBTITLE_GRAY_COLOR,
} from "@styles/styleConstants";
import { theme } from "@styles/theme";

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_BACKGROUND_COLOR,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    width: "100%",
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: "20@ms",
  },
  formAndButtonContainer: {
    justifyContent: "space-between",
    flex: 1,
    marginTop: "24@vs",
  },
  formContainer: {
    paddingTop: "16@s",
  },
  subtitleText: {
    fontSize: "16@s",
    color: "rgba(51, 51, 51, 0.9)",
    textAlign: "justify",
    paddingBottom: "8@s",
    ...theme.fonts.semiBold,
  },
  textInput: {
    fontSize: "16@s",
    backgroundColor: "white",
    textAlign: "auto",
  },
  errorText: {
    fontSize: "12@s",
  },
  buttonStyle: {
    width: "160@s",
    marginBottom: "20@vs",
  },
  onCancelButtonText: {
    color: SUBTITLE_GRAY_COLOR,
    flexGrow: 1,
  },
  firstScreenImage: {
    width: "322@s",
    height: "240@vs",
    alignSelf: "center",
  },
  secondScreenImage: {
    width: "338@s",
    height: "252@vs",
    alignSelf: "center",
  },
  helpText: {
    fontSize: "15@s",
    color: SUBTITLE_GRAY_COLOR,
    marginTop: "4@vs",
    marginLeft: "14@s",
  },
});

export default styles;
