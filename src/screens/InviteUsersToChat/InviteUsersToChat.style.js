import { ScaledSheet } from "react-native-size-matters/extend";

import { APP_BACKGROUND_COLOR } from "@styles/styleConstants";

const style = ScaledSheet.create({
  safeArea: {
    backgroundColor: APP_BACKGROUND_COLOR,
    flex: 1,
  },
  container: {
    flex: 1,
    marginHorizontal: "16@s",
    justifyContent: "space-between",
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
  shareInviteLinkManually: {
    paddingTop: "17@vs",
    paddingBottom: "17@vs",
  },
  button: {
    marginBottom: "24@vs",
  },
});

export default style;
