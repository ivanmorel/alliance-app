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
  cardContainer: {
    marginBottom: "24@vs",
    padding: "8@s",
  },
  cardTitle: {
    marginTop: "16@vs",
    fontSize: "28@s",
  },
  cardSubtitle: {
    marginTop: "8@vs",
    fontSize: "16@s",
  },
  cardContent: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  starContainer: {
    marginVertical: "24@vs",
  },
  buttonContainer: {
    marginVertical: "16@vs",
  },
  button: {
    marginVertical: 0,
    marginRight: 0,
  },
  buttonText: {
    alignSelf: "flex-start",
    justifyContent: "flex-start",
  },
  notesContainer: {
    marginTop: "24@vs",
  },
  noteText: {
    letterSpacing: 1,
    fontSize: "12@s",
  },
  footerContainer: {
    flexShrink: 1,
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-evenly",
    padding: "16@s",
    backgroundColor: APP_BACKGROUND_COLOR,
  },
  messageButton: {
    flexGrow: 1,
    marginRight: 24,
  },
  callButton: {
    flexGrow: 1,
  },
  opportunitiesIcon: {
    marginLeft: "8@s",
    marginRight: "8@s",
    width: "24@s",
    height: "24@vs",
  },
});

export default styles;
