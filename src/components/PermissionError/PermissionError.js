import React from "react";
import { Image, Text, View } from "react-native";

import * as Linking from "expo-linking";
import PropTypes from "prop-types";
import { SafeAreaView } from "react-native-safe-area-context";
import Entypo from "react-native-vector-icons/Entypo";

import { Button, TopBar } from "@components";

import style from "./PermissionError.style";

const PermissionError = ({ permissions }) => {
  return (
    <SafeAreaView style={style.container}>
      <TopBar title="Permission Error" iconLeft="back" titleLeftAligned />
      <View flex={1}>
        <Image
          source={require("@assets/permission-error.png")}
          style={style.image}
        />
        <Text style={style.description}>
          This feature requires the following permissions:
        </Text>
        <View style={style.contentContainer}>
          {permissions.map((permission) => (
            <View style={style.permissionTextContainer} key={permission}>
              <Entypo name="dot-single" size={24} color="black" />
              <Text>{permission}</Text>
            </View>
          ))}
          <Button
            text="review my permissions"
            onPress={() => Linking.openSettings()}
            color="secondary"
            buttonStyle={style.button}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

PermissionError.propTypes = {
  permissions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PermissionError;
