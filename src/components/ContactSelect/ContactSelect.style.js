import { ScaledSheet } from "react-native-size-matters/extend";

import { theme } from "@styles/theme";

const styles = ScaledSheet.create({
  componentContainer: {
    flexDirection: "row",
    paddingBottom: "20@vs",
    width: "100%",
    flex: 1,
  },
  dropdownItemText: {
    fontSize: "16@s",
    ...theme.fonts.bold,
  },
  dropdownItem: {
    padding: 0,
    margin: 0,
    height: "45@vs",
  },
  error: {
    position: "absolute",
    bottom: "-10@vs",
  },
  icon: { alignSelf: "center", paddingLeft: "10@s" },
  button: { marginTop: 10, marginBottom: 20 },
});

export default styles;
