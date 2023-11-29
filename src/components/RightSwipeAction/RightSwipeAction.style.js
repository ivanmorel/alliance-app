import { ScaledSheet } from "react-native-size-matters/extend";

import { WARNING_COLOR } from "@styles/styleConstants";

const styles = ScaledSheet.create({
  container: {
    backgroundColor: WARNING_COLOR,
    justifyContent: "center",
    width: "50%",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    marginBottom: "8@vs",
  },
  icon: {
    marginRight: "8@s",
  },
  text: {
    color: "white",
    fontSize: "14@s",
  },
});

export default styles;
