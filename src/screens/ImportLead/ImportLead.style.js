import { ScaledSheet } from "react-native-size-matters/extend";

import {
  APP_BACKGROUND_COLOR,
  SUBTITLE_STRONG_GRAY_COLOR,
  TITLE_FONT_COLOR,
} from "@styles/styleConstants";
import { theme } from "@styles/theme";

const styles = ScaledSheet.create({
  container: {
    backgroundColor: APP_BACKGROUND_COLOR,
    flex: 1,
  },
  content: { marginHorizontal: "16@s", flex: 1 },
  label: {
    paddingTop: "32@vs",
    fontSize: "11@s",
    lineHeight: "16@s",
    letterSpacing: "1.5@s",
    color: SUBTITLE_STRONG_GRAY_COLOR,
  },
  text: {
    paddingTop: "14@vs",
    fontSize: "16@s",
    lineHeight: "24@s",
    letterSpacing: "0.15@s",
    color: TITLE_FONT_COLOR,
    ...theme.fonts.medium,
  },
});

export default styles;
