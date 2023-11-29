import React from "react";
import { View } from "react-native";

import PropTypes from "prop-types";
import { Switch as PaperSwitch, Text } from "react-native-paper";

import { PRIMARY_COLOR, SUBTITLE_GRAY_COLOR } from "@styles/styleConstants";

import style from "./Switch.style";

const Switch = ({ value, setValue, title, containerStyle }) => {
  return (
    <View style={[style.container, containerStyle]}>
      <PaperSwitch
        value={value}
        onValueChange={setValue}
        color={PRIMARY_COLOR}
      />
      <Text
        style={[
          style.text,
          { color: value ? PRIMARY_COLOR : SUBTITLE_GRAY_COLOR },
        ]}
      >
        {title}
      </Text>
    </View>
  );
};

export default Switch;

Switch.propTypes = {
  containerStyle: PropTypes.object,
  setValue: PropTypes.func,
  title: PropTypes.string,
  value: PropTypes.bool,
};

Switch.defaultProps = {
  setValue: () => {},
};
