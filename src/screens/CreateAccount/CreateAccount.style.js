import { ScaledSheet } from "react-native-size-matters/extend";

import { APP_BACKGROUND_COLOR } from "@styles/styleConstants";

const styles = ScaledSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: APP_BACKGROUND_COLOR,
  },
  scrollContainer: {
    flex: 1,
    marginHorizontal: "32@vs",
  },
  appLogo: {
    marginBottom: 24,
  },
});

export default styles;
