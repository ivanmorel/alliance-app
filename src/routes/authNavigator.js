import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { SCREENS } from "@routes/routes.constants";

import {
  CreateAccount,
  CreateAccountWithEmail,
  ForgotPassword,
  Login,
  LoginWithEmail,
  PrivacyPolicy,
  ResetPassword,
  UserAgreement,
  Welcome,
} from "@screens";

const AuthStack = createStackNavigator();

export const AuthNav = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name={SCREENS.authStack.welcome} component={Welcome} />
    <AuthStack.Screen
      name={SCREENS.authStack.createAccount}
      component={CreateAccount}
    />
    <AuthStack.Screen
      name={SCREENS.authStack.createAccountWithEmail}
      component={CreateAccountWithEmail}
    />
    <AuthStack.Screen name={SCREENS.authStack.login} component={Login} />
    <AuthStack.Screen
      name={SCREENS.authStack.loginWithEmail}
      component={LoginWithEmail}
    />
    <AuthStack.Screen
      name={SCREENS.authStack.forgotPassword}
      component={ForgotPassword}
    />
    <AuthStack.Screen
      name={SCREENS.authStack.resetPassword}
      component={ResetPassword}
    />
    <AuthStack.Screen
      name={SCREENS.authStack.userAgreement}
      component={UserAgreement}
    />
    <AuthStack.Screen
      name={SCREENS.authStack.privacyPolicy}
      component={PrivacyPolicy}
    />
  </AuthStack.Navigator>
);
