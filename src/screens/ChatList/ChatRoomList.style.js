import { ScaledSheet } from "react-native-size-matters/extend";

import { APP_BACKGROUND_COLOR } from "@styles/styleConstants";

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_BACKGROUND_COLOR,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(51, 51, 51, 0.75)",
    height: "48@vs",
    width: "48@s",
    borderRadius: 25,
    marginRight: "16@s",
  },
  icon: {
    width: "20@s",
    height: "20@vs",
  },
});

export default styles;
