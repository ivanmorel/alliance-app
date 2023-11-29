import { scale, ScaledSheet } from "react-native-size-matters/extend";

import { APP_BACKGROUND_COLOR } from "@styles/styleConstants";

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_BACKGROUND_COLOR,
  },
  content: { marginHorizontal: "16@s", flex: 1 },
  innerContainer: {
    flex: 1,
    paddingHorizontal: "16.5@s",
    padding: "24@vs",
    paddingBottom: "120@vs",
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
