import React from "react";
import { Pressable } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import { Text } from "react-native-paper";
import { scale } from "react-native-size-matters/extend";

import styles from "./RightSwipeAction.style";

const RightSwipeAction = ({ icon = "close", text, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <MaterialCommunityIcons
        name={icon}
        size={scale(18)}
        color="white"
        style={styles.icon}
      />
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

export default RightSwipeAction;

RightSwipeAction.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.any.isRequired,
  onPress: PropTypes.func,
};

RightSwipeAction.defaultProps = {
  icon: "close",
  onPress: () => {},
};
