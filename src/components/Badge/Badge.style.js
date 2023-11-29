import { ScaledSheet } from "react-native-size-matters/extend";

import { isAndroid } from "@utils/utils";

import { theme } from "@styles/theme";

const style = ScaledSheet.create({
  badge: {
    color: "#FFFFFF",
    textAlign: "center",
    paddingTop: isAndroid() ? 1 : 0,
    fontSize: "12@s",
    ...theme.fonts.medium,
  },
  newBadge: {
    borderRadius: 4,
    paddingHorizontal: "8@s",
  },
});

export default style;
