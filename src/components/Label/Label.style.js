import { ScaledSheet } from "react-native-size-matters/extend";

import { theme } from "@styles/theme";

const style = ScaledSheet.create({
  label: {
    ...theme.fonts.regular,
  },
});

export default style;
