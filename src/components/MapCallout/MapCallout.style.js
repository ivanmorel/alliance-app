import { ScaledSheet } from "react-native-size-matters/extend";

import {
  APP_BACKGROUND_COLOR,
  SUBTITLE_GRAY_COLOR,
} from "@styles/styleConstants";
import { theme } from "@styles/theme";

const styles = ScaledSheet.create({
  container: {
    backgroundColor: APP_BACKGROUND_COLOR,
    paddingVertical: "16@vs",
    alignSelf: "center",
    paddingHorizontal: "16@s",
    borderRadius: "4@s",
    width: "382@s",
    marginBottom: "16@vs",
  },
  button: {
    backgroundColor: "white",
  },
  rightButton: {
    marginLeft: "11@s",
    flexGrow: 10,
  },
  leftButton: {
    marginRight: "11@s",
    flexGrow: 1,
  },
  buttonText: {
    color: SUBTITLE_GRAY_COLOR,
  },
  titleContainer: {
    paddingBottom: "8@vs",
  },
  title: {
    color: "rgba(51, 51, 51, 0.9)",
    ...theme.fonts.medium,
    fontSize: "20@s",
  },
  subtitle: {
    color: SUBTITLE_GRAY_COLOR,
    fontSize: "12@s",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: "16@vs",
  },
  buttonContainer: {
    paddingTop: "16@vs",
  },
});

export default styles;
