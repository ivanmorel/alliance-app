import { ScaledSheet } from "react-native-size-matters/extend";

import { PRIMARY_COLOR } from "@styles/styleConstants";
import { theme } from "@styles/theme";

const style = ScaledSheet.create({
  wrapper: {
    flex: 1,
    position: "absolute",
    top: "16@vs",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
    paddingHorizontal: "16@s",
    paddingVertical: "8@s",
    backgroundColor: "white",
    borderRadius: "4@s",
  },
  iconContainer: {
    borderRadius: "3@s",
    width: "30@s",
    height: "30@s",
    backgroundColor: PRIMARY_COLOR,
  },
  itemContainer: {
    flexDirection: "row",
    paddingHorizontal: "8@s",
    alignItems: "center",
    justifyContent: "center",
  },
  itemText: {
    ...theme.fonts.medium,
    fontSize: "20@vs",
    textAlign: "center",
    marginLeft: "5@s",
  },
});

export default style;
