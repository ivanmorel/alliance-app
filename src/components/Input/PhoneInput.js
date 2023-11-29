import React, { forwardRef } from "react";

import PropTypes from "prop-types";
import { TextInputMask } from "react-native-masked-text";

import { Input } from "@components";

/**
 * @type React.FC<CustomPhoneInputProps>
 */
const PhoneInput = forwardRef((restProps, ref) => {
  return (
    <Input.Text
      keyboardType="phone-pad"
      {...restProps}
      render={(props) => (
        <TextInputMask
          {...props}
          ref={ref}
          type={"custom"}
          options={{
            mask: "+1 (***) ***-****",
          }}
        />
      )}
    />
  );
});

const CustomPhoneInputProps = {
  errors: PropTypes.object,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  inputId: PropTypes.string,
  label: PropTypes.string,
  touched: PropTypes.object,
  disabled: PropTypes.bool,
  returnKeyType: PropTypes.string,
  onSubmitEditing: PropTypes.func,
  enablesReturnKeyAutomatically: PropTypes.bool,
  dense: PropTypes.bool,
};

PhoneInput.propTypes = CustomPhoneInputProps;

PhoneInput.defaultProps = {
  errors: {},
  handleBlur: () => {},
  handleChange: () => {},
  touched: {},
  type: "normal",
  disabled: false,
};

export default PhoneInput;
