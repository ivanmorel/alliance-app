import { ScaledSheet } from "react-native-size-matters/extend";

import { APP_BACKGROUND_COLOR } from "@styles/styleConstants";

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_BACKGROUND_COLOR,
    paddingHorizontal: "16@vs",
  },
});

export default styles;
