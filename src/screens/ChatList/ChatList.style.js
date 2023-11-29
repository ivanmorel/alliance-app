import { ScaledSheet } from "react-native-size-matters/extend";

import { APP_BACKGROUND_COLOR } from "@styles/styleConstants";
import { theme } from "@styles/theme";

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_BACKGROUND_COLOR,
  },
  listContainer: {
    paddingHorizontal: "16@s",
  },
  iconStyle: {
    alignItems: "center",
    justifyContent: "center",
    height: "48@vs",
    width: "48@s",
    borderRadius: 25,
    marginRight: "16@s",
    backgroundColor: "rgba(247, 247, 247, 1)",
  },
  avatar: {
    marginRight: "16@s",
    backgroundColor: "#F7F7F7",
    alignSelf: "center",
  },
  avatarLabel: {
    ...theme.fonts.medium,
    fontSize: "20@s",
    color: "rgba(51, 51, 51, 0.9)",
  },
});

export default styles;
