import React, { useEffect, useState } from "react";
import { View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import * as ExpoLocation from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { scale } from "react-native-size-matters/extend";

import { useDispatch, useSelector } from "react-redux";
import { activityGroupGet } from "@actions";

import { MapLegend } from "@components";

import { PRIMARY_COLOR, WARNING_COLOR } from "@styles/styleConstants";

import styles from "./LeadLocation.style";

const LeadLocation = () => {
  const { address, groupId } = useSelector(({ lead }) => lead.currentLead);
  const [location, setLocation] = useState(null);
  const { longitude, latitude } = address;
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isFocused || !groupId) return;
    dispatch(activityGroupGet(groupId));
  }, [isFocused, groupId]);

  useEffect(() => {
    (async () => {
      let { status } = await ExpoLocation.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      const location = await ExpoLocation.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <View style={styles.mapContainer}>
      <MapView
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        style={styles.map}
      >
        {location ? (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          >
            <MaterialCommunityIcons
              name="circle-slice-8"
              size={scale(32)}
              color={PRIMARY_COLOR}
            />
          </Marker>
        ) : null}
        <Marker coordinate={{ latitude, longitude }}>
          <MaterialCommunityIcons
            name="map-marker"
            size={scale(40)}
            color={WARNING_COLOR}
          />
        </Marker>
      </MapView>
      <MapLegend />
    </View>
  );
};

export default LeadLocation;
