import React from "react";
import { View } from "react-native";

import PropTypes from "prop-types";
import { Divider } from "react-native-paper";

import { Text } from "@components";

import styles from "./SectionTitle.style";
import { getLabel } from "./SectionTitle.utils";

const SectionTitle = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{getLabel(title)}</Text>
      <Divider style={styles.divider} />
    </View>
  );
};

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SectionTitle;
