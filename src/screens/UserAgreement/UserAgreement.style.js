import { ScaledSheet } from "react-native-size-matters/extend";

import { APP_BACKGROUND_COLOR } from "@styles/styleConstants";

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_BACKGROUND_COLOR,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: "16.5@s",
  },
  scrollContentContainer: {
    paddingVertical: "24@vs",
  },
  paragraph: {
    paddingVertical: "16@vs",
    fontSize: "17@s",
    lineHeight: "24@s",
  },
});

export default styles;
