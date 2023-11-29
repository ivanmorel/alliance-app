import { ScaledSheet } from "react-native-size-matters/extend";

import { APP_BACKGROUND_COLOR } from "@styles/styleConstants";

export const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_BACKGROUND_COLOR,
  },
  listContainer: {
    justifyContent: "flex-start",
    paddingHorizontal: "16@s",
  },
  removeIcon: {
    marginTop: "-16@vs",
  },
});
