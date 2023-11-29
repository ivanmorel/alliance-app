import React, { useEffect, useRef } from "react";
import { Keyboard, View } from "react-native";

import { useFormik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import * as yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import {
  snackbarAddMessageToQueue,
  userLogin,
  userLoginMethodsReset,
  userResetPasswordStatusReset,
} from "@actions";

import { navigate } from "@routes/navigator";
import { SCREENS } from "@routes/routes.constants";

import { SNACKBAR_TYPES, TEST_IDS } from "@utils/constants";

import {
  AppLogo,
  Button,
  Input,
  LegalFooter,
  LinkTo,
  Text,
  TopBar,
} from "@components";

import styles from "./LoginWithEmail.style";

const schema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email("Must be a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .trim()
    .min(8, "Must be at least 8 characters long")
    .max(50, "Must be less than 50 characters long")
    .required("Password is required"),
});

const LoginWithEmail = () => {
  const { loading, loginWithEmailError, sendResetEmailSuccess, loginMethods } =
    useSelector((state) => state.user);
  const passwordRef = useRef(null);
  const dispatch = useDispatch();

  const formik = useFormik({
    validationSchema: schema,
    validateOnMount: false,
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: ({ email, password }) => {
      Keyboard.dismiss();
      // Leaving some nostalgia for our future selves (prior to refactor) -Cayce
      // ------------------------------------------------------
      // I hate the front-end sometimes... fucking unhandled promise rejection
      // bullshit. A fucking babbling 1 year old child makes more fucking sense
      // than javascript.
      // At least the child can fucking point to something and you fucking
      // understand context
      // endRant. - Jacob
      // ------------------------------------------------------
      dispatch(userLogin({ email, password }));
    },
  });

  const resetLoginMethods = () => {
    dispatch(userLoginMethodsReset());
  };

  useEffect(() => {
    resetLoginMethods();
  }, []);

  useEffect(() => {
    if (sendResetEmailSuccess) {
      dispatch(
        snackbarAddMessageToQueue({
          message:
            "The instructions to reset the password were sent to your e-mail",
          type: SNACKBAR_TYPES.success,
          duration: 5000,
        })
      );
      dispatch(userResetPasswordStatusReset());
    }
  }, [sendResetEmailSuccess]);

  // Show snackbar error
  useEffect(() => {
    if (loginWithEmailError) {
      dispatch(
        snackbarAddMessageToQueue({
          message: loginWithEmailError.message,
          type: SNACKBAR_TYPES.error,
          duration: 5000,
        })
      );

      formik.setFieldValue("password", "", false);
      formik.setFieldError("password", null);
    }
  }, [loginWithEmailError]);

  const renderSSOLoginError = () => {
    if (!loginMethods.length) return null;

    return (
      <View style={styles.ssoErrorContainer}>
        <Text style={styles.emailText}>{formik.values.email}</Text>
        <Text style={styles.ssoErrorText}>
          This account was created using an SSO provider.
        </Text>
        <Text style={styles.ssoErrorText}>
          Please sign in with an SSO provider on the previous page.
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopBar title="Sign in with email" titleLeftAligned iconLeft="back" />
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="always"
      >
        <AppLogo horizontal />
        <View style={styles.form} testID={TEST_IDS.login.screenContainer}>
          {renderSSOLoginError()}
          <Input.Text
            label="E-mail address"
            inputId="email"
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            autoCompleteType="email"
            errors={formik.errors}
            touched={formik.touched}
            values={formik.values}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            enablesReturnKeyAutomatically
            keyboardType="email-address"
            textContentType="emailAddress"
            onBlur={() => {
              formik.setFieldValue("email", formik.values.email.trim());
            }}
            testID={TEST_IDS.loginWithEmail.emailInput}
            errorTestID={TEST_IDS.loginWithEmail.emailInputError}
          />
          <Input.Text
            secureTextEntry
            label="Password"
            inputId="password"
            autoCompleteType="password"
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            errors={formik.errors}
            touched={formik.touched}
            values={formik.values}
            ref={passwordRef}
            returnKeyType="go"
            onSubmitEditing={() =>
              formik.dirty && formik.isValid && formik.submitForm()
            }
            textContentType="password"
            blurOnSubmit
            testID={TEST_IDS.loginWithEmail.passwordInput}
            errorTestID={TEST_IDS.loginWithEmail.passwordInputError}
            revealIcon
          />
          <Button
            mode="contained"
            disabled={loading || !formik?.isValid}
            onPress={formik.submitForm}
            dense
            text="SIGN IN"
            testID={TEST_IDS.loginWithEmail.submitButton}
          />

          <LinkTo
            text="Forget your password?"
            linkText="Reset password"
            onPress={() => navigate(SCREENS.authStack.forgotPassword)}
          />
          <LinkTo
            text="Don't have an account yet?"
            linkText="Create an account"
            onPress={() => navigate(SCREENS.authStack.createAccount)}
          />
        </View>
        <LegalFooter />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default LoginWithEmail;
