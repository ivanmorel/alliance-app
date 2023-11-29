import { ScaledSheet } from "react-native-size-matters/extend";

import { theme } from "@styles/theme";

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingVertical: "24@vs",
    paddingHorizontal: "16@s",
  },
  accountEmailContainer: {
    flexDirection: "column",
    marginBottom: "48@vs",
  },
  textLabel: {
    fontSize: "14@s",
    ...theme.fonts.bold,
    color: "rgba(51, 51, 51, 0.5)",
  },
  text: {
    fontSize: "20@s",
    ...theme.fonts.bold,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "column",
  },
  otherActionsContainer: {
    flexGrow: 1,
    marginTop: "48@vs",
  },
  footerActionsContainer: {
    marginTop: "48@vs",
  },
  textButton: {
    alignSelf: "flex-start",
  },
  deleteAccountButtonText: {
    color: "white",
  },
  modalText: {
    fontSize: "15@s",
    textAlign: "center",
    color: "rgba(0, 0, 0, 0.6)",
    ...theme.fonts.regular,
  },
  modalErrorText: {
    fontSize: "15@s",
    textAlign: "center",
    color: "#B45454",
    ...theme.fonts.regular,
  },
  modalTextBold: {
    fontSize: "15@s",
    textAlign: "center",
    color: "rgba(0, 0, 0, 0.6)",
    ...theme.fonts.bold,
  },
  iconStyle: {
    paddingBottom: "20@vs",
  },
});

export default styles;
