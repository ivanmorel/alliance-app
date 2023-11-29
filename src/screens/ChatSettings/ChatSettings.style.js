import { ScaledSheet } from "react-native-size-matters/extend";

import { APP_BACKGROUND_COLOR } from "@styles/styleConstants";

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    height: "100%",
    marginHorizontal: "16@s",
    backgroundColor: APP_BACKGROUND_COLOR,
  },
  iconStyle: {
    alignItems: "center",
    justifyContent: "center",
    height: "48@vs",
    width: "48@s",
    borderRadius: 25,
    marginRight: "16@s",
    backgroundColor: "rgba(247, 247, 247, 1)",
  },
  attachmentTitleContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  chevronContainer: {
    flexDirection: "row",
  },
  divider: {
    flex: 1,
    alignSelf: "center",
    height: "1@vs",
    marginHorizontal: "5@s",
  },
  buttonContainer: {
    alignSelf: "flex-end",
  },
  attachmentContainer: {
    flex: 1,
    marginBottom: "40@vs",
    marginTop: "24@vs",
  },
  buttonStyle: {
    marginBottom: "32@vs",
  },
  text: {
    fontSize: "14@s",
    lineHeight: "24@s",
    letterSpacing: "0.1@s",
    color: "rgba(51, 51, 51, 0.75)",
  },
  leaveButton: {
    marginBottom: "12@vs",
  },
  chatNameContainer: {
    marginTop: "24@vs",
  },
});

export default styles;
