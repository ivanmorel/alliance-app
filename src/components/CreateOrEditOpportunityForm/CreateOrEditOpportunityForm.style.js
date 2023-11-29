import { ScaledSheet } from "react-native-size-matters/extend";

const styles = ScaledSheet.create({
  innerContainer: {
    flex: 1,
    paddingTop: "24@vs",
    paddingBottom: "80@vs",
  },
  buttonContainer: {
    marginTop: "24@vs",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    alignSelf: "center",
  },
  saveButton: {
    flex: 1,
  },
  editButton: {
    flex: 1,
    marginLeft: "48@s",
  },
});

export default styles;
