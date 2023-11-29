import React from "react";
import { Image, View } from "react-native";

import PropTypes from "prop-types";
import { Headline, Text } from "react-native-paper";
import { verticalScale } from "react-native-size-matters/extend";

import { Button } from "@components";

import styles from "./Empty.style";

const Empty = ({ image, title, subtitle, actions }) => {
  const renderActions = () => {
    if (!actions?.length || !Array.isArray(actions)) return null;

    return actions.map(({ heading, ...buttonProps }, index) => (
      <View key={`action-${index}`} style={styles.actionContainer}>
        <Headline
          style={[
            styles.actionHeading,
            styles.subtitle,
            actions.length === 1 ? { marginBottom: verticalScale(80) } : {},
          ]}
        >
          {heading ? heading : null}
        </Headline>
        <Button color="primary" {...buttonProps} />
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      {image ? (
        <Image resizeMode="contain" source={image} style={styles.image} />
      ) : null}
      <Text style={styles.title}>{title}</Text>
      {subtitle?.trim() && !actions?.length ? (
        <Text style={styles.subtitle}>{subtitle}</Text>
      ) : null}
      {renderActions()}
    </View>
  );
};

Empty.propTypes = {
  image: PropTypes.oneOfType([
    PropTypes.shape({
      uri: PropTypes.string,
      headers: PropTypes.objectOf(PropTypes.string),
    }),
    PropTypes.number,
    PropTypes.arrayOf(
      PropTypes.shape({
        uri: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
        headers: PropTypes.objectOf(PropTypes.string),
      })
    ),
  ]),
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string,
      color: PropTypes.oneOf(["primary", "secondary"]),
      text: PropTypes.string,
      icon: PropTypes.string,
      onPress: PropTypes.func,
      loading: PropTypes.bool,
      disabled: PropTypes.bool,
    }).isRequired
  ),
};

export default Empty;
