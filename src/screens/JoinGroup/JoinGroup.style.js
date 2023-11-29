import { ScaledSheet } from "react-native-size-matters/extend";

import {
  APP_BACKGROUND_COLOR,
  SUBTITLE_GRAY_COLOR,
} from "@styles/styleConstants";

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    marginHorizontal: "16@s",
    marginTop: "60@vs",
  },
  safeArea: {
    backgroundColor: APP_BACKGROUND_COLOR,
    flex: 1,
  },
  groupLabel: {
    alignSelf: "center",
    color: SUBTITLE_GRAY_COLOR,
    fontSize: "17@s",
    height: "29@vs",
  },
  groupName: {
    fontSize: "32@s",
    lineHeight: "36@vs",
    height: "80@vs",
    textAlign: "center",
    paddingTop: "10@vs",
    marginBottom: "10@vs",
    color: "rgba(51, 51, 51, 0.9)",
  },
  image: {
    width: "350@s",
    height: "260@vs",
    marginBottom: "20@vs",
  },
  topErrorText: {
    paddingHorizontal: 0,
    paddingTop: 0,
    fontSize: "18@vs",
    color: "#B00020",
  },
  labelText: {
    fontSize: "18@vs",
    color: SUBTITLE_GRAY_COLOR,
    marginBottom: "17@vs",
  },
});

export default styles;
