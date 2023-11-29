import React from "react";
import { View } from "react-native";

import PropTypes from "prop-types";
import { ActivityIndicator } from "react-native-paper";

import { PRIMARY_COLOR } from "@styles/styleConstants";

const Loader = ({ containerStyle, size, color }) => {
  return (
    <View style={containerStyle}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

Loader.propTypes = {
  containerStyle: PropTypes.object,
  size: PropTypes.string,
  color: PropTypes.string,
};

Loader.defaultProps = {
  containerStyle: {
    justifyContent: "center",
    height: "100%",
    backgroundColor: "white",
  },
  size: "large",
  color: PRIMARY_COLOR,
};

export default Loader;
