import React, { useEffect, useState } from "react";
import { View } from "react-native";

import PropTypes from "prop-types";
import { ActivityIndicator } from "react-native-paper";

import styles from "./Overlay.style";

const Overlay = ({ active, showSpinner = false }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (active) setVisible(true);
    else setTimeout(() => setVisible(false), 100);
  }, [active]);

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      {showSpinner ? (
        <ActivityIndicator
          animating
          color="white"
          size="large"
          style={styles.overlaySpinner}
        />
      ) : null}
    </View>
  );
};

Overlay.propTypes = {
  active: PropTypes.bool.isRequired,
  showSpinner: PropTypes.bool,
};

export default Overlay;
