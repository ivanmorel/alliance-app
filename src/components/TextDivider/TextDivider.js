import React from "react";
import { View } from "react-native";

import { Divider } from "react-native-paper";

import { Text } from "@components";

import styles from "./TextDivider.style";

// eslint-disable-next-line react/prop-types
const TextDivider = ({ text }) => {
  return (
    <View style={styles.container}>
      <Divider style={styles.divider} />
      <Text style={styles.dividerText}>{text}</Text>
      <Divider style={styles.divider} />
    </View>
  );
};

export default TextDivider;
