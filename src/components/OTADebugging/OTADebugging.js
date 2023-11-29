import React from "react";
import { View } from "react-native";

// eslint-disable-next-line no-unused-vars
import * as Updates from "expo-updates";
import moment from "moment";
import { Text } from "react-native-paper";
import { ScaledSheet } from "react-native-size-matters/extend";

import { useSelector } from "react-redux";

const OTADebugging = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { checkStatus, lastChecked, lastEvent } = useSelector(
    (state) => state.otaUpdates
  );

  return (
    <View {...props}>
      <Text style={styles.text}>Update Status: {checkStatus}</Text>
      <Text style={styles.text}>
        Last Checked:{" "}
        {lastChecked && moment(lastChecked).format("MMMM Do YYYY, h:mm:ss a")}
      </Text>
    </View>
  );
};

const styles = ScaledSheet.create({
  text: {
    color: "white",
    fontSize: "12@s",
    textAlign: "center",
    letterSpacing: "1.2@vs",
    textTransform: "uppercase",
  },
});

export default OTADebugging;
