import { ScaledSheet } from "react-native-size-matters/extend";

import { APP_BACKGROUND_COLOR } from "@styles/styleConstants";

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: "8@vs",
    backgroundColor: APP_BACKGROUND_COLOR,
    alignItems: "center",
  },
  title: {
    fontSize: "14@s",
    color: "rgba(51, 51, 51, 0.75)",
  },
  divider: {
    height: 1,
    flex: 1,
    marginLeft: 10,
  },
});

export default styles;
