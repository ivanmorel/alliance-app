import React from "react";
import { View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Modal as RNModal, Text } from "react-native-paper";
import { scale } from "react-native-size-matters/extend";

import { wrapWithPortal } from "../../hocs";
import styles from "./Modal.style";

const Modal = wrapWithPortal((props) => (
  <RNModal contentContainerStyle={styles.container} {...props} />
));

// eslint-disable-next-line react/prop-types
const Header = ({ title, icon, ...rest }) => (
  <View style={styles.header} {...rest}>
    {typeof icon === "string" ? (
      <MaterialCommunityIcons
        name={icon}
        size={scale(20)}
        color="black"
        style={styles.iconTitle}
      />
    ) : (
      icon
    )}
    <Text style={styles.title}>{title}</Text>
  </View>
);

const Body = (props) => <View style={styles.body} {...props} />;

const Footer = (props) => <View style={styles.footer} {...props} />;

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
