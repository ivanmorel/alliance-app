import React from "react";
import { ScrollView } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { navigate } from "@routes/navigator";
import { SCREENS } from "@routes/routes.constants";

import { TEST_IDS } from "@utils/constants";

import { AppLogo, LegalFooter, LinkTo, SSOButtons, TopBar } from "@components";

import styles from "./CreateAccount.style";

const Login = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TopBar title="Create account" titleLeftAligned iconLeft="back" />
      <ScrollView
        style={styles.scrollContainer}
        testID={TEST_IDS.createAccount.screenContainer}
      >
        <AppLogo horizontal style={styles.appLogo} />
        <SSOButtons />
        <LinkTo
          text="Already have an account?"
          linkText="Sign in"
          onPress={() => navigate(SCREENS.authStack.login)}
        />
        <LegalFooter />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
