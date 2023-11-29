import { Dimensions } from "react-native";

import { ScaledSheet } from "react-native-size-matters/extend";

const styles = ScaledSheet.create({
  container: {
    maxWidth: Dimensions.get("screen").width * 0.8,
    maxHeight: Dimensions.get("screen").height * 0.5,
    width: "100%",
    backgroundColor: "white",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: "24@s",
    paddingBottom: "24@vs",
    paddingTop: "28@vs",
    borderRadius: "5@s",
  },
  title: {
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: "24@s",
  },
  header: {
    alignItems: "center",
    width: "100%",
  },
  body: {
    marginTop: "16@s",
    paddingBottom: "32@s",
  },
  footer: {
    alignSelf: "flex-end",
    flexDirection: "row",
  },
  iconTitle: {
    paddingBottom: "20@vs",
  },
});

export default styles;
