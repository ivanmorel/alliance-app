import { ScaledSheet } from "react-native-size-matters/extend";

import { APP_BACKGROUND_COLOR } from "@styles/styleConstants";

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_BACKGROUND_COLOR,
  },
  webView: {
    flex: 1,
    paddingTop: "24@vs",
    backgroundColor: "white",
    paddingHorizontal: "16.5@vs",
    marginTop: -97,
    marginBottom: -640,
  },
  webViewContainer: {
    marginTop: "16@vs",
  },
});

export default styles;
