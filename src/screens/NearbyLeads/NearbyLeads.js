import React, { useEffect, useState } from "react";
import { View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, ScaledSheet } from "react-native-size-matters/extend";

import { useDispatch, useSelector } from "react-redux";
import { leadGet, leadListNearby } from "@actions";

import { navigate } from "@routes/navigator";
import { SCREENS } from "@routes/routes.constants";

import { wait } from "@utils/utils";

import {
  Loader,
  LocationError,
  MapCallout,
  MapLegend,
  TopBar,
} from "@components";

import {
  APP_BACKGROUND_COLOR,
  PRIMARY_COLOR,
  WARNING_COLOR,
} from "@styles/styleConstants";

const mapLeadToMarker =
  (onPress) =>
  // eslint-disable-next-line react/prop-types
  ({ latitude, longitude, leadId }) =>
    (
      <Marker
        key={leadId}
        coordinate={{ latitude, longitude }}
        onPress={() => onPress(leadId)}
      >
        <MaterialCommunityIcons
          name="map-marker"
          size={scale(40)}
          color={WARNING_COLOR}
        />
      </Marker>
    );

const NearbyLeads = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const [nearbyLeadsItem, setNearbyLeadsItem] = useState([]);
  const [currentLead, setCurrentLead] = useState(null);
  const [loading, setLoading] = useState(false);
  const { nearbyLeads, currentLead: modalLead } = useSelector(
    ({ lead }) => lead
  );
  const [modalVisible, setVisible] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    const onPress = (leadId) => {
      dispatch(leadGet({ lead_id: leadId }));
      setCurrentLead(leadId);
      setVisible(true);
    };

    const currMap = mapLeadToMarker(onPress);
    setNearbyLeadsItem(nearbyLeads.map(currMap));
  }, [nearbyLeads]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError(true);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const navigateToLead = (leadId, leadName) => {
    navigate(SCREENS.appStack.leadDetail, {
      leadId,
      leadName,
      shouldFetch: false,
    });
  };

  const handleRegionChange = async ({
    latitude,
    latitudeDelta,
    longitude,
    longitudeDelta,
  }) => {
    setLoading(true);
    const latitudeNE = latitude + latitudeDelta;
    const longitudeNE = longitude + longitudeDelta;
    const latitudeSW = latitude - latitudeDelta;
    const longitudeSW = longitude - longitudeDelta;
    const payload = {
      latitudeNE,
      longitudeSW,
      latitudeSW,
      longitudeNE,
    };

    await dispatch(leadListNearby(payload));
    await wait(400);
    setLoading(false);
  };

  if (error) {
    return <LocationError />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <TopBar title="Leads Nearby" />
      {!location ? (
        <Loader />
      ) : (
        <View style={{ flex: 1 }}>
          <MapView
            onRegionChangeComplete={handleRegionChange}
            style={styles.mapView}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
          >
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
            {nearbyLeadsItem}
          </MapView>
          {loading && (
            <View style={styles.loaderStyle}>
              <ActivityIndicator size="small" color="black" />
            </View>
          )}
          <MapLegend />
          {isFocused &&
          modalVisible &&
          !loading &&
          modalLead.leadId !== currentLead?.leadId ? (
            <MapCallout
              navigateToLead={navigateToLead}
              leadId={currentLead}
              onDismiss={() => {
                setVisible(false);
              }}
            />
          ) : null}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_BACKGROUND_COLOR,
  },
  mapView: {
    flex: 1,
  },
  loaderStyle: {
    position: "absolute",
    top: "24@vs",
    left: "36@s",
  },
});

export default NearbyLeads;
