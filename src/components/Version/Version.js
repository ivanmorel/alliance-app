import React from "react";

import Constants from "expo-constants";
import PropTypes from "prop-types";
import { Text } from "react-native-paper";

const Version = ({ style = {}, title = "Version" }) => {
  return (
    <Text style={style}>
      {title}: {Constants.manifest?.version}-
      {Constants.manifest?.runtimeVersion}
    </Text>
  );
};

export default Version;

Version.propTypes = {
  title: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
