import React from "react";
import { View } from "react-native";

import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { navigate } from "@routes/navigator";
import { SCREENS } from "@routes/routes.constants";

import { TEST_IDS } from "@utils/constants";

import { AppLogo, Button, LegalFooter, TextDivider } from "@components";

import styles from "./Welcome.style";

const Welcome = () => {
  const insets = useSafeAreaInsets();

  return (
    <React.Fragment>
      <StatusBar style="dark" />
      <View testID={TEST_IDS.welcome.screenContainer}>
        <AppLogo style={{ paddingTop: insets.top * 2 }} />
        <View style={styles.buttonContainer}>
          <Button
            text="Create an account"
            color="primaryDark"
            onPress={() => navigate(SCREENS.authStack.createAccount)}
            testID={TEST_IDS.welcome.createAccountButton}
          />
          <TextDivider text="OR" />
          <Button
            text="Sign in"
            onPress={() => navigate(SCREENS.authStack.login)}
            testID={TEST_IDS.welcome.loginButton}
          />
        </View>
        <LegalFooter showAgreements={false} showVersion />
      </View>
    </React.Fragment>
  );
};

export default Welcome;
