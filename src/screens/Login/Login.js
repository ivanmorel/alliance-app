import React from "react";
import { ScrollView, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { navigate } from "@routes/navigator";
import { SCREENS } from "@routes/routes.constants";

import { TEST_IDS } from "@utils/constants";

import { AppLogo, LegalFooter, LinkTo, SSOButtons, TopBar } from "@components";

import styles from "./Login.style";

const Login = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TopBar title="Sign in" titleLeftAligned iconLeft="back" />
      <ScrollView
        style={styles.scrollContainer}
        testID={TEST_IDS.login.screenContainer}
      >
        <AppLogo horizontal style={styles.appLogo} />
        <View style={styles.buttonContainer}>
          <SSOButtons context="login" />
        </View>
        <LinkTo
          text="Don't have an account yet?"
          linkText="Create an account"
          onPress={() => navigate(SCREENS.authStack.createAccount)}
        />
        <LegalFooter />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
