import { ScaledSheet } from "react-native-size-matters/extend";

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingTop: "24@vs",
    paddingHorizontal: "16@s",
  },
  helpText: {
    fontSize: "16@s",
    color: "#666",
    marginBottom: "16@vs",
  },
  submitBtn: {
    marginLeft: "20@ms",
  },
  buttonStyle: {
    marginTop: "30@ms",
  },
  multilineText: {
    fontSize: "16@s",
    backgroundColor: "white",
    marginTop: "24@s",
  },
  errorBorder: {
    borderColor: "#B00020",
  },
  errorText: {
    fontSize: "10@s",
    paddingLeft: 10,
    color: "#B00020",
  },
});

export default styles;
