import { ScaledSheet } from "react-native-size-matters/extend";

import { APP_BACKGROUND_COLOR } from "@styles/styleConstants";

const styles = ScaledSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: APP_BACKGROUND_COLOR,
  },
  scrollViewContainer: {
    backgroundColor: APP_BACKGROUND_COLOR,
    flex: 1,
    flexGrow: 1,
  },
  scrollViewContentContainer: {
    backgroundColor: APP_BACKGROUND_COLOR,
    paddingHorizontal: "16@s",
    paddingBottom: "48@s",
  },
  notesContainer: {
    marginTop: "24@vs",
  },
  text: {
    letterSpacing: 1,
  },
  editButton: {
    flexGrow: 1,
    marginVertical: "48@vs",
  },
  sharedWithContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "baseline",
  },
  sharedWithTextContainer: {
    flexGrow: 1,
    flexDirection: "row",
  },
  expandIcon: {
    marginLeft: "16@s",
  },
  listItemContainer: {
    marginTop: "24@vs",
  },
});

export default styles;
