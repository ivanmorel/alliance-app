import React, { useEffect } from "react";
import { Image, Linking, ScrollView, Text, View } from "react-native";

import { DateTime } from "luxon";
import PropTypes from "prop-types";
import { Button } from "react-native-paper";
import { scale, ScaledSheet } from "react-native-size-matters/extend";

import { useDispatch } from "react-redux";
import { userLogout } from "@actions";

import { bugsnagNotify } from "@services/bugsnag";

import { navigateReset } from "@routes/navigator";
import { SCREENS } from "@routes/routes.constants";

import { Loader } from "@components";

import { PRIMARY_COLOR } from "@styles/styleConstants";

// Using module varialbes to hold `attempted` state.
// `userLogout` will reset the redux store and cause a full unmount of this
// component (so no local state can be used for this either )
let attempts = 0;
let retryTimer = null;
const maxAttempts = 3;
const supportReferenceID = () =>
  `${DateTime.now()}-${parseInt(Math.random() * 10000)}`;

const RootFallbackError = ({ clearError, error }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const retryLogout = () => {
      retryTimer = setTimeout(() => {
        attempts = attempts + 1;
        dispatch(userLogout());
        clearError();
      }, 5000);
    };

    if (error && attempts < maxAttempts) {
      retryLogout();
    } else if (error) {
      const metadata = [
        {
          name: "Support Info",
          data: { ["Reference ID"]: `${supportReferenceID()}` },
        },
      ];
      bugsnagNotify(
        new Error("An error prevented the user from logging out."),
        metadata
      );
      clearTimeout(retryTimer);
      retryTimer = null;
    }

    return () => {
      clearTimeout(retryTimer);
      retryTimer = null;
    };
  }, [error]);

  const handleGoToLoginPressed = () => {
    clearError();
    dispatch(userLogout());
    navigateReset({
      index: 0,
      routes: [{ name: SCREENS.rootNavigator.authStack }],
    });
  };

  const handleSupportEmailPressed = () => {
    Linking.openURL(
      `mailto:support@allianceapp.com?subject=App crash report | Reference ID ${supportReferenceID()}&body=Hello. The app crashed and provided a Reference ID of ${supportReferenceID()}. Thanks`
    );
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 24 }}
        bounces={false}
      >
        <Image
          resizeMode="contain"
          style={styles.logoImage}
          source={require("@assets/alliance-logo-white.png")}
        />
        {attempts < maxAttempts ? (
          <View>
            <Text style={styles.heading}>
              Oh no! We&apos;ve encountered an error!
            </Text>
            <Text style={[styles.text, { marginBottom: scale(24) }]}>
              Hang tight while we attempt to reset things.
            </Text>
            <Loader color="white" />
          </View>
        ) : (
          <View>
            <Text style={styles.heading}>Well, this is embarrassing. 😦</Text>
            <Text style={styles.text}>
              We could not resolve the issue automatically. We&apos;ve sent a
              report of the problem to our engineering team for further
              investigation.
            </Text>
            <Text style={styles.text}>
              You can try to uninstall and re-install the Alliance app. Your
              data is stored remotely and will not be deleted upon re-install.
            </Text>
            <Text style={styles.text}>
              If this problem continues after re-installing, please contact
              support at support@allianceapp.com for further assistance.
            </Text>
            <Text style={styles.text}>
              Your Support Reference ID is: {`${supportReferenceID()}`}
            </Text>
            <Button
              mode="contained"
              color="white"
              onPress={handleSupportEmailPressed}
              style={styles.button}
            >
              Email Support
            </Button>
            <Button
              mode="outlined"
              color="white"
              onPress={handleGoToLoginPressed}
              style={styles.button}
            >
              Go to sign in
            </Button>
          </View>
        )}
      </ScrollView>
    </>
  );
};

RootFallbackError.propTypes = {
  clearError: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
  info: PropTypes.object.isRequired,
};

export default RootFallbackError;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: "24@s",
    paddingHorizontal: "16.5@s",
  },
  logoImage: {
    width: "144@s",
    height: "178@vs",
    marginTop: "88@vs",
    marginBottom: "64@vs",
    alignSelf: "center",
  },
  heading: {
    fontSize: "20@s",
    paddingVertical: "16@s",
    color: "white",
  },
  text: {
    paddingVertical: "16@s",
    color: "white",
  },
  button: {
    marginVertical: "12@s",
  },
});
