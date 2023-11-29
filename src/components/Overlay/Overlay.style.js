import { ScaledSheet } from "react-native-size-matters/extend";

import { isIOS } from "@utils/utils";

const styles = ScaledSheet.create({
  overlay: {
    position: "absolute",
    width: "100%",
    height: "110%",
    zIndex: 500,
    backgroundColor: `rgba(0,0,0,0.${isIOS() ? 1 : 5})`,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  overlaySpinner: {
    marginTop: "240@vs",
  },
});

export default styles;
