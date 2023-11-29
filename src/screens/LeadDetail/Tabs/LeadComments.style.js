import { ScaledSheet } from "react-native-size-matters/extend";

import { APP_BACKGROUND_COLOR } from "@styles/styleConstants";

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_BACKGROUND_COLOR,
  },
  keyboardAvoidContainer: {
    flex: 1,
    paddingHorizontal: "8@s",
  },
  listContainer: {
    justifyContent: "flex-start",
    paddingHorizontal: "16@s",
  },
});

export default styles;
