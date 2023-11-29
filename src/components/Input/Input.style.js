import { ScaledSheet } from "react-native-size-matters/extend";

import { theme } from "@styles/theme";

const styles = ScaledSheet.create({
  textInput: {
    fontSize: "16@s",
    backgroundColor: "white",
    textAlign: "auto",
    width: "100%",
  },
  errorText: {
    marginBottom: "8@s",
    fontSize: "10@s",
  },
  dropdownItemText: {
    fontSize: "16@s",
    ...theme.fonts.bold,
  },
  dropdownItem: {
    padding: 0,
    margin: 0,
    height: "45@vs",
  },
  googlePlacesTextInputContainer: {
    width: "100%",
    marginBottom: "-28@vs",
  },
  googlePlacesTextInput: {
    flex: 1,
    flexWrap: "nowrap",
    flexShrink: 0,
    flexGrow: 0,
    backgroundColor: "white",
    color: "black",
  },
  googlePlacesAutocomplete: {
    marginTop: -80,
  },
});

export default styles;
