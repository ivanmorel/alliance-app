import { ScaledSheet } from "react-native-size-matters/extend";

import { SUBTITLE_GRAY_COLOR, TITLE_FONT_COLOR } from "@styles/styleConstants";
import { theme } from "@styles/theme";

const styles = ScaledSheet.create({
  menuItem: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  menuHeader: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  menu: {
    paddingHorizontal: "20@s",
  },
  menuHeaderTitle: {
    paddingHorizontal: 0,
    paddingVertical: "12@vs",
    color: "rgba(51, 51, 51, 1)",
    fontSize: "20@vs",
    ...theme.fonts.medium,
  },
  menuItemContainer: {
    paddingVertical: "16@vs",
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemTitle: {
    color: TITLE_FONT_COLOR,
    fontSize: "17@s",
    ...theme.fonts.regular,
    alignSelf: "flex-start",
  },
  opportunitiesIcon: {
    marginLeft: "8@s",
    marginRight: "16@s",
    width: "24@s",
    height: "24@vs",
    opacity: 0.5,
  },
  iconStyle: {
    paddingLeft: "8@s",
    paddingRight: "16@s",
  },
  avatarStyle: {
    alignSelf: "center",
    marginRight: "6@s",
    backgroundColor: "rgba(247, 247, 247, 1)",
  },
  divider: {
    height: "1@vs",
    marginVertical: "12@vs",
    color: "#C4C4C4",
  },
  logoutButton: {
    position: "absolute",
    width: "100%",
    bottom: "24@vs",
    left: "36@s",
    justifyContent: "center",
  },
  logoutIcon: {
    alignSelf: "center",
    paddingRight: "4@s",
  },
  appVersion: {
    color: SUBTITLE_GRAY_COLOR,
    fontSize: "10@s",
    alignSelf: "center",
    letterSpacing: "1.5@s",
    ...theme.fonts.regular,
    paddingRight: "18@s",
  },
  avatarLabel: {
    ...theme.fonts.medium,
  },
  logoutButtonTitle: {
    fontSize: "14@s",
    color: SUBTITLE_GRAY_COLOR,
    ...theme.fonts.regular,
  },
});

export default styles;
