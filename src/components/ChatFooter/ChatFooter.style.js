import { ScaledSheet } from "react-native-size-matters/extend";

const styles = ScaledSheet.create({
  chatInput: {
    marginBottom: "8@vs",
    flex: 1,
    backgroundColor: "white",
    fontSize: "18@s",
    marginHorizontal: "18@s",
  },
  chatAttachFile: {
    alignSelf: "center",
    marginTop: "12@mvs",
  },
  chatSendBtn: {
    marginTop: "10@mvs",
    alignSelf: "center",
  },
});

export default styles;
