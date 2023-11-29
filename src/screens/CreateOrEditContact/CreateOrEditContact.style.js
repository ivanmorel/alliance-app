import { scale, ScaledSheet } from "react-native-size-matters/extend";

import { APP_BACKGROUND_COLOR } from "@styles/styleConstants";

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_BACKGROUND_COLOR,
  },
  innerContainer: {
    marginHorizontal: "16@s",
    flex: 1,
  },
  errorText: {
    fontSize: "10@s",
  },
  notesInput: {
    fontSize: scale(16),
    backgroundColor: "white",
    width: "100%",
  },
});

export default styles;
