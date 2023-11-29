import { ScaledSheet } from "react-native-size-matters/extend";

import { SNACKBAR_TYPES } from "@utils/constants";

import { CONFIRM_COLOR, WARNING_COLOR } from "@styles/styleConstants";

const styles = ScaledSheet.create({
  snackbarText: {
    textAlign: "center",
    fontSize: "16@s",
    lineHeight: "24@s",
    color: "white",
  },
  [SNACKBAR_TYPES.info]: {},
  [SNACKBAR_TYPES.warning]: {},
  [SNACKBAR_TYPES.success]: {
    backgroundColor: CONFIRM_COLOR,
  },
  [SNACKBAR_TYPES.error]: {
    backgroundColor: WARNING_COLOR,
  },
});

export default styles;
