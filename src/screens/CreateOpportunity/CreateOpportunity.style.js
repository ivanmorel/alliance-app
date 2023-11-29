import { ScaledSheet } from "react-native-size-matters/extend";

import {
  APP_BACKGROUND_COLOR,
  SUBTITLE_GRAY_COLOR,
} from "@styles/styleConstants";

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_BACKGROUND_COLOR,
  },
  scrollView: {
    paddingHorizontal: "16@s",
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    width: "100%",
  },
  buttonStyle: {
    width: "160@s",
    marginBottom: "20@vs",
  },
  onCancelButtonText: {
    color: SUBTITLE_GRAY_COLOR,
    flexGrow: 1,
  },
});

export default styles;
