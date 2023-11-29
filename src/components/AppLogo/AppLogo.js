import React from "react";
import { Image, View } from "react-native";

import styles from "./AppLogo.style";

// eslint-disable-next-line react/prop-types
const AppLogo = ({ style, horizontal }) => {
  return (
    <View style={[styles.logoContainer, style]}>
      <Image
        resizeMode="contain"
        style={horizontal ? styles.logoImageHorizontal : styles.logoImage}
        source={
          horizontal
            ? require("@assets/alliance-logo-full-horizontal.png")
            : require("@assets/alliance-logo-full.png")
        }
      />
    </View>
  );
};

export default AppLogo;
