import { Colors } from "react-native-paper";
import { ScaledSheet } from "react-native-size-matters/extend";

import {
  APP_BACKGROUND_COLOR,
  SUBTITLE_GRAY_COLOR,
  WARNING_COLOR,
} from "@styles/styleConstants";
import { theme } from "@styles/theme";

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: APP_BACKGROUND_COLOR,
    paddingHorizontal: "16@s",
  },
  listContainer: {
    flexGrow: 1,
  },
  itemContainer: {
    paddingHorizontal: "16@s",
  },
  borderContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: "32@vs",
  },
  itemDateContainer: {
    position: "absolute",
    right: "16@s",
    top: "12@vs",
  },
  itemDate: {
    fontSize: "12@s",
    color: SUBTITLE_GRAY_COLOR,
  },
  itemIcon: {
    marginRight: "16@s",
  },
  textContainer: {
    flexGrow: 1,
    marginBottom: "2@vs",
  },
  divider: {
    marginHorizontal: "24@s",
    backgroundColor: Colors.grey500,
  },
  cancelStyle: {
    marginTop: "8%",
  },
  textDelete: {
    color: WARNING_COLOR,
  },
  textCancel: {
    color: WARNING_COLOR,
    ...theme.fonts.bold,
  },
  textBold: {
    ...theme.fonts.bold,
  },
  textTitle: {
    fontSize: "16@s",
    paddingBottom: "5@vs",
    paddingRight: "5@vs",
  },
  loaderStyle: {
    marginVertical: "16@s",
    alignItems: "center",
  },
  iconStyle: {
    alignSelf: "center",
    marginRight: "16@s",
  },
});

export default styles;
