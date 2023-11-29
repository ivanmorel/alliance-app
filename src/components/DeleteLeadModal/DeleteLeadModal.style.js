import { ScaledSheet } from "react-native-size-matters/extend";

import { SUBTITLE_GRAY_COLOR } from "@styles/styleConstants";
import { theme } from "@styles/theme";

const styles = ScaledSheet.create({
  description: {
    fontSize: "15@s",
    textAlign: "left",
    color: SUBTITLE_GRAY_COLOR,
  },
  descriptionBold: {
    fontSize: "15@s",
    color: "rgba(0, 0, 0, 0.6)",
    textAlign: "left",
    ...theme.fonts.bold,
  },
});

export default styles;
