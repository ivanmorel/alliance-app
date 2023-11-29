import React from "react";
import { Animated } from "react-native";

import PropTypes from "prop-types";

import styles from "./Label.style";

const Label = ({ label }) => {
  return <Animated.Text style={styles.label}>{label}</Animated.Text>;
};

export default Label;

Label.propTypes = {
  label: PropTypes.string,
};
