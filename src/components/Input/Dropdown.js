import React, { useMemo, useState } from "react";

import PropTypes from "prop-types";
import { HelperText, useTheme } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";

import { Label } from "@components";

import styles from "./Input.style";

const Dropdown = ({
  values,
  label,
  handleChange,
  items,
  inputId,
  errors,
  touched,
}) => {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const hasError = useMemo(() => {
    return !!(errors[inputId] && touched[inputId]);
  }, [errors, inputId, touched]);

  return (
    <React.Fragment>
      <DropDown
        label={label && <Label label={label} />}
        mode="outlined"
        value={values[inputId]}
        setValue={handleChange(inputId)}
        list={items}
        visible={visible}
        showDropDown={() => setVisible(true)}
        onDismiss={() => setVisible(false)}
        theme={theme}
        inputProps={{
          style: styles.textInput,
          outlineColor: "rgba(0, 0, 0, 0.12)",
        }}
        dropDownItemSelectedStyle={styles.dropdownItem}
        dropDownItemSelectedTextStyle={styles.dropdownItemText}
        dropDownItemTextStyle={styles.dropdownItemText}
      />
      <HelperText style={styles.errorText} type="error" visible={hasError}>
        {errors[inputId]}
      </HelperText>
    </React.Fragment>
  );
};

export default Dropdown;

Dropdown.propTypes = {
  errors: PropTypes.object,
  handleChange: PropTypes.func,
  inputId: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, value: PropTypes.string })
  ),
  label: PropTypes.string,
  touched: PropTypes.object,
  values: PropTypes.object,
};

Dropdown.defaultProps = {
  errors: {},
  handleChange: () => {},
  touched: {},
  values: {},
};
