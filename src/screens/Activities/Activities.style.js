import { ScaledSheet } from "react-native-size-matters/extend";

import { APP_BACKGROUND_COLOR, CONFIRM_COLOR } from "@styles/styleConstants";

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_BACKGROUND_COLOR,
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    height: "48@vs",
    width: "48@s",
    borderRadius: 25,
    marginRight: "16@s",
  },
  newMessageContainer: {
    backgroundColor: CONFIRM_COLOR,
  },
  newMessageText: {
    color: "white",
  },
});

export default styles;
