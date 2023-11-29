import React, { forwardRef } from "react";
import { TextInput as RNInput } from "react-native";

import PropTypes from "prop-types";
import { verticalScale } from "react-native-size-matters";

import { Input } from "@components";

const MultiLineTextInput = forwardRef(
  // eslint-disable-next-line react/prop-types
  ({ style, multiline, height, ...props }, ref) => (
    <RNInput
      ref={ref}
      multiline={multiline}
      {...props}
      style={[
        style,
        multiline
          ? {
              paddingTop: 8,
              paddingBottom: 8,
              height: height,
              textAlignVertical: "top",
            }
          : null,
      ]}
    />
  )
);

/**
 * @type React.FC<TextAreaProps>
 */
const TextArea = forwardRef(({ height = 240, ...restProps }, ref) => {
  return (
    <Input.Text
      ref={ref}
      multiline={true}
      {...restProps}
      render={(props) => (
        <MultiLineTextInput height={verticalScale(height)} {...props} />
      )}
    />
  );
});

export const TextAreaProps = {
  handleChange: PropTypes.func,
  inputId: PropTypes.string,
  handleBlur: PropTypes.func,
  errors: PropTypes.object,
  values: PropTypes.object,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  touched: PropTypes.object,
  disabled: PropTypes.bool,
  maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  textContentType: PropTypes.string,
  returnKeyType: PropTypes.string,
  onSubmitEditing: PropTypes.func,
  enablesReturnKeyAutomatically: PropTypes.bool,
  autoCompleteType: PropTypes.string,
  keyboardType: PropTypes.string,
  render: PropTypes.elementType,
  multiline: PropTypes.bool,
  height: PropTypes.number,
};

TextArea.propTypes = TextAreaProps;

TextArea.defaultProps = {
  handleChange: () => {},
  inputId: "",
  handleBlur: () => {},
  errors: {},
  values: {},
  touched: {},
  disabled: false,
  autoCompleteType: "off",
  textContentType: "none",
  keyboardType: "default",
};

export default TextArea;
