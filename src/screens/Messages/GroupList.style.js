import { ScaledSheet } from "react-native-size-matters/extend";

import {
  APP_BACKGROUND_COLOR,
  SUBTITLE_GRAY_COLOR,
} from "@styles/styleConstants";
import { theme } from "@styles/theme";

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: APP_BACKGROUND_COLOR,
  },
  listContainer: {
    paddingHorizontal: "16@s",
  },
  iconsDiv: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  moderatorIcon: {
    alignSelf: "center",
    marginRight: "8@s",
  },
  text: {
    fontSize: "15@s",
    ...theme.fonts.regular,
    textAlign: "center",
    color: SUBTITLE_GRAY_COLOR,
  },
});

export default styles;
