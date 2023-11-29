import { ScaledSheet } from "react-native-size-matters/extend";

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingLeft: "16@s",
    paddingBottom: "20@vs",
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: "16@s",
  },
  text: {
    color: "rgba(51, 51, 51, 0.9)",
    fontSize: "15@s",
  },
});

export default styles;
