import React from "react";
import { Image, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Button, Text } from "react-native-paper";
import { ScaledSheet, verticalScale } from "react-native-size-matters/extend";

import { PRIMARY_COLOR } from "@styles/styleConstants";
import { theme } from "@styles/theme";

const LocationError = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        source={require("@assets/alliance-logo-white.png")}
        style={styles.image}
      />
      <MaterialCommunityIcons
        name="map-marker"
        size={verticalScale(60)}
        color="white"
      />
      <Text style={styles.text}>
        Location services must be enabled to use this feature
      </Text>
      <Text style={styles.subText}>
        In order to access this you must enable your location settings
      </Text>
      <Button
        color="white"
        labelStyle={{ color: PRIMARY_COLOR }}
        mode="contained"
        onPress={() => navigation.goBack()}
      >
        Back
      </Button>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: PRIMARY_COLOR,
  },
  text: {
    fontSize: "16@s",
    color: "#fff",
    textAlign: "center",
    marginBottom: "45@vs",
    ...theme.fonts.semiBold,
    marginHorizontal: "60@vs",
    marginTop: "5@vs",
  },
  subText: {
    fontSize: "14@s",
    textAlign: "center",
    color: "#fff",
    marginBottom: "50@vs",
    marginHorizontal: "36@vs",
  },
  image: {
    marginTop: "80@vs",
    marginBottom: "70@vs",
    width: "156@s",
    height: "180@vs",
  },
});

export default LocationError;
