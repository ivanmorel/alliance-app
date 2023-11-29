import { ScaledSheet } from "react-native-size-matters/extend";

import {
  APP_BACKGROUND_COLOR,
  SUBTITLE_GRAY_COLOR,
} from "@styles/styleConstants";
import { theme } from "@styles/theme";

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: APP_BACKGROUND_COLOR,
    marginHorizontal: "16@s",
  },
  iconsDiv: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  moderatorIcon: {
    alignSelf: "center",
    marginRight: "8@s",
  },
  text: {
    fontSize: "15@s",
    ...theme.fonts.regular,
    textAlign: "center",
    color: SUBTITLE_GRAY_COLOR,
  },
  filterInput: {
    marginBottom: "8@vs",
    backgroundColor: "white",
    fontSize: "18@s",
  },
  button: {
    marginTop: "8@vs",
  },
  subtitleContainer: {
    paddingBottom: "8@vs",
    flexDirection: "row",
    alignItems: "center",
  },
  divider: {
    marginLeft: "3@s",
    marginRight: "20@s",
    height: "1@vs",
    flex: 1,
  },
  subtitle: {
    fontSize: "14@s",
    lineHeight: "24@s",
    letterSpacing: "0.1@s",
    color: "rgba(51, 51, 51, 0.75)",
  },
  titleStyle: { marginTop: 8 },
});

export default styles;
