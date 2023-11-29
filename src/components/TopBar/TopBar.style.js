import { ScaledSheet } from "react-native-size-matters/extend";

import { APP_BACKGROUND_COLOR, TITLE_FONT_COLOR } from "@styles/styleConstants";
import { theme } from "@styles/theme";

const styles = ScaledSheet.create({
  container: {
    height: "72@vs",
    backgroundColor: APP_BACKGROUND_COLOR,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "16@ms",
  },
  icon: {
    position: "absolute",
    left: "16@s",
    zIndex: 1,
  },
  androidIcon: {
    paddingBottom: "4@vs",
  },
  text: {
    fontSize: "24@ms",
    ...theme.fonts.regular,
    maxWidth: "90%",
    alignSelf: "center",
    color: TITLE_FONT_COLOR,
  },
  leftAlignedTitle: {
    alignSelf: "flex-start",
    marginLeft: "40@s",
    maxWidth: "80%",
  },
  rightIconContainer: {
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    right: "12@s",
  },
});

export default styles;
