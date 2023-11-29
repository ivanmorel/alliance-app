import { ScaledSheet } from "react-native-size-matters/extend";

import { APP_BACKGROUND_COLOR } from "@styles/styleConstants";

const styles = ScaledSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: APP_BACKGROUND_COLOR,
  },
  form: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: "48@s",
    paddingBottom: "14@vs",
  },
  snackbar: {
    textAlign: "center",
    fontSize: "16@s",
    lineHeight: "24@s",
  },
  goBackButton: {
    marginVertical: "24@vs",
  },
});

export default styles;
