import React from "react";

import PropTypes from "prop-types";
import { Button as UIButton, Colors } from "react-native-paper";

import { Text } from "@components";

import {
  ACCENT_COLOR,
  MORE_INFO_COLOR,
  PRIMARY_COLOR,
  SUBTITLE_GRAY_COLOR,
  WARNING_COLOR,
} from "@styles/styleConstants";

import { styles } from "./Button.style";

const availableColors = {
  primary: PRIMARY_COLOR,
  primaryDark: ACCENT_COLOR,
  secondary: MORE_INFO_COLOR,
  subtitle: SUBTITLE_GRAY_COLOR,
  error: WARNING_COLOR,
  dark: Colors.grey600,
};

const Button = ({
  text = "",
  color = "primary",
  variant = false,
  icon,
  onPress = () => {},
  loading,
  disabled,
  uppercase = true,
  textStyle,
  textContainerStyle,
  buttonStyle,
  contentStyle,
  rightIcon,
  dense = false,
  inverted = false,
  testID,
  mode = "contained",
}) => {
  const buttonColor = availableColors[color] || PRIMARY_COLOR;
  const buttonMode = variant ? "text" : mode;
  let contentStyles = [styles.largePadding];
  contentStyles.push({ flexDirection: rightIcon ? "row-reverse" : "row" });
  if (dense) {
    if (variant) contentStyles.push(styles.noPadding);
    else contentStyles.push(styles.densePadding);
  }

  return (
    <UIButton
      icon={icon}
      color={inverted ? Colors.white : buttonColor}
      onPress={onPress}
      mode={buttonMode}
      uppercase={uppercase}
      style={buttonStyle}
      loading={loading}
      disabled={disabled || loading}
      contentStyle={[contentStyles, contentStyle]}
      labelStyle={textContainerStyle}
      testID={testID}
    >
      {typeof text === "string" ? (
        <Text
          style={[
            styles.buttonText,
            variant ? { color: buttonColor } : {},
            textStyle,
            inverted ? { color: availableColors[color] } : {},
          ]}
        >
          {text}
        </Text>
      ) : (
        text
      )}
    </UIButton>
  );
};

export default Button;

Button.propTypes = {
  children: PropTypes.element,
  color: PropTypes.oneOf([
    "primary",
    "primaryDark",
    "secondary",
    "error",
    "dark",
    "subtitle",
  ]),
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  variant: PropTypes.bool,
  onPress: PropTypes.func,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  uppercase: PropTypes.bool,
  textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  textContainerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  buttonStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  contentStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  rightIcon: PropTypes.bool,
  dense: PropTypes.bool,
  inverted: PropTypes.bool,
  testID: PropTypes.string,
  mode: PropTypes.string,
};
