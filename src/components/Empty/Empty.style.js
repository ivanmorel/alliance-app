import { ScaledSheet } from "react-native-size-matters/extend";

import { APP_BACKGROUND_COLOR } from "@styles/styleConstants";

const styles = ScaledSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: APP_BACKGROUND_COLOR,
  },
  image: {
    maxHeight: "280@vs",
  },
  title: {
    marginVertical: "32@vs",
    fontSize: "32@s",
    lineHeight: "36@s",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    fontSize: "15@s",
    lineHeight: "20@s",
  },
  actionContainer: {
    alignItems: "center",
    marginBottom: "32@vs",
  },
  actionHeading: {
    marginBottom: "16@vs",
  },
});

export default styles;
