import * as React from "react";
import { Text, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { scale } from "react-native-size-matters/extend";

import { PRIMARY_COLOR, WARNING_COLOR } from "@styles/styleConstants";

import styles from "./MapLegend.style";

const MapLegend = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.itemContainer}>
          <MaterialCommunityIcons
            name="circle-slice-8"
            size={scale(24)}
            color={PRIMARY_COLOR}
          />
          <Text style={[styles.itemText, { color: PRIMARY_COLOR }]}>You</Text>
        </View>
        <View style={styles.itemContainer}>
          <MaterialCommunityIcons
            name="map-marker"
            size={scale(24)}
            color={WARNING_COLOR}
          />
          <Text style={[styles.itemText, { color: WARNING_COLOR }]}>Leads</Text>
        </View>
      </View>
    </View>
  );
};

export default MapLegend;
