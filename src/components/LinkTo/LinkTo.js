import React from "react";
import { Pressable, View } from "react-native";

import PropTypes from "prop-types";

import { Text } from "@components";

import styles from "./LinkTo.style";

const LinkTo = ({ text, linkText, onPress, containerStyles }) => {
  return (
    <View style={[styles.container, containerStyles]}>
      {text ? <Text style={styles.text}>{text}</Text> : null}
      <Pressable onPress={onPress} hitSlop={8}>
        <Text style={styles.linkText}>{linkText}</Text>
      </Pressable>
    </View>
  );
};

LinkTo.propTypes = {
  text: PropTypes.string,
  linkText: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  containerStyles: PropTypes.any,
};

export default LinkTo;
