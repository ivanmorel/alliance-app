import { ScaledSheet } from "react-native-size-matters/extend";

import { SUBTITLE_GRAY_COLOR } from "@styles/styleConstants";

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: "24@vs",
  },
  divider: {
    height: "1@vs",
    flex: 1,
  },
  dividerText: {
    color: SUBTITLE_GRAY_COLOR,
    marginHorizontal: "20@s",
  },
});

export default styles;
