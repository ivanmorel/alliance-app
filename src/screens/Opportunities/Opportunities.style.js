import { ScaledSheet } from "react-native-size-matters/extend";

import { APP_BACKGROUND_COLOR } from "@styles/styleConstants";

export const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_BACKGROUND_COLOR,
  },
  listContainer: {
    paddingHorizontal: "16@s",
    paddingTop: "16@s",
    paddingBottom: "24@vs",
  },
  opportunitiesIcon: {
    width: "24@s",
    height: "24@vs",
    opacity: 0.5,
  },
  moderatorIcon: {
    alignSelf: "center",
    marginRight: "8@s",
  },
});
