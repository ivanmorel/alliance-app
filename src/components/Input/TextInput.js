import React, { forwardRef, useState } from "react";

import PropTypes from "prop-types";
import { HelperText, TextInput as UITextInput } from "react-native-paper";

import { Label } from "@components";

import { SUBTITLE_STRONG_GRAY_COLOR } from "@styles/styleConstants";

import styles from "./Input.style";

/**
 * @type React.FC<TextInputProps>
 */
const TextInput = forwardRef(
  (
    {
      errors,
      inputId,
      touched,
      handleBlur,
      handleChange,
      hideError,
      multiline,
      onBlur,
      label,
      values,
      onSubmitEditing,
      style,
      errorTestID,
      revealIcon,
      secureTextEntry,
      errorStyle,
      ...props
    },
    ref
  ) => {
    const [revealVisible, setRevealVisible] = useState(false);
    const hasError = errors[inputId] && touched[inputId];

    const blurFunction = () => {
      handleBlur(inputId);
      if (onBlur) {
        onBlur();
      }
    };

    const handleRevealVisible = () => {
      setRevealVisible((prev) => !prev);
    };

    return (
      <React.Fragment>
        <UITextInput
          {...props}
          ref={ref}
          style={[styles.textInput, style]}
          mode="outlined"
          label={label && <Label label={label} />}
          multiline={multiline}
          onChangeText={handleChange(inputId)}
          onBlur={blurFunction}
          error={hasError}
          value={values[inputId]}
          autoCapitalize="none"
          onSubmitEditing={onSubmitEditing}
          secureTextEntry={secureTextEntry && !revealVisible}
          outlineColor="rgba(0, 0, 0, 0.12)"
          right={
            revealIcon ? (
              <UITextInput.Icon
                color={SUBTITLE_STRONG_GRAY_COLOR}
                name={revealVisible ? "eye-off" : "eye"}
                onPress={handleRevealVisible}
              />
            ) : null
          }
        />
        {!hideError ? (
          <HelperText
            style={[styles.errorText, errorStyle]}
            type="error"
            visible={hasError}
            testID={errorTestID}
          >
            {errors[inputId]}
          </HelperText>
        ) : null}
      </React.Fragment>
    );
  }
);

export const TextInputProps = {
  dense: PropTypes.bool,
  disabled: PropTypes.bool,
  errors: PropTypes.object,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  inputId: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  touched: PropTypes.object,
  values: PropTypes.object,
  secureTextEntry: PropTypes.bool,
  textContentType: PropTypes.string,
  maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  returnKeyType: PropTypes.string,
  onSubmitEditing: PropTypes.func,
  enablesReturnKeyAutomatically: PropTypes.bool,
  autoCompleteType: PropTypes.string,
  keyboardType: PropTypes.string,
  render: PropTypes.elementType,
  multiline: PropTypes.bool,
  blurOnSubmit: PropTypes.bool,
  hideError: PropTypes.bool,
  onBlur: PropTypes.func,
  errorTestID: PropTypes.string,
  style: PropTypes.any,
  revealIcon: PropTypes.bool,
  errorStyle: PropTypes.object,
};

TextInput.propTypes = TextInputProps;

TextInput.defaultProps = {
  handleChange: () => {},
  handleBlur: () => {},
  onBlur: () => {},
  errors: {},
  values: {},
  touched: {},
  autoCompleteType: "off",
  textContentType: "none",
  keyboardType: "default",
  blurOnSubmit: false,
  hideError: false,
  errorTestID: null,
  revealIcon: false,
};

export default TextInput;
