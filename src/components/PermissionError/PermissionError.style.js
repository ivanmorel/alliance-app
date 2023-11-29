import { ScaledSheet } from "react-native-size-matters/extend";

import { APP_BACKGROUND_COLOR, TITLE_FONT_COLOR } from "@styles/styleConstants";
import { theme } from "@styles/theme";

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_BACKGROUND_COLOR,
  },
  image: {
    marginTop: "94@vs",
    marginBottom: "24@vs",
  },
  permissionTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: "21@s",
    fontSize: "20@s",
    color: TITLE_FONT_COLOR,
    ...theme.fonts.medium,
  },
  description: {
    marginHorizontal: "21@s",
    fontSize: "14@s",
    color: TITLE_FONT_COLOR,
    paddingBottom: "6@vs",
  },
  button: {
    marginBottom: "51@vs",
    marginHorizontal: "17@s",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
});

export default styles;
