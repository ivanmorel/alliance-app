import React, { useEffect } from "react";
import { Keyboard, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import * as yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import {
  snackbarAddMessageToQueue,
  userResetPassword,
  userResetPasswordStatusReset,
} from "@actions";

import { SNACKBAR_TYPES } from "@utils/constants";

import { AppLogo, Button, Input, LegalFooter, Text, TopBar } from "@components";

import styles from "./ForgotPassword.style";

const schema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email("Must be a valid email address")
    .required("Email is required"),
});

const ForgotPassword = () => {
  const {
    loading: sending,
    sendResetEmailSuccess,
    error,
  } = useSelector(({ user }) => user);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const formik = useFormik({
    validationSchema: schema,
    validateOnMount: false,
    initialValues: {
      email: "",
    },
    onSubmit: ({ email }) => {
      Keyboard.dismiss();
      dispatch(userResetPassword({ email }));
    },
  });

  useEffect(() => {
    if (sendResetEmailSuccess) {
      navigation.goBack();
    } else if (error) {
      let message;
      if (error.message === "user not found") {
        message =
          "The email " +
          formik.values.email +
          " does not exist. If this is in error, please contact support at support@allianceapp.com";
      } else {
        message =
          "There was an error sending email. If the problem persists, please contact support at: support@allianceapp.com";
      }
      dispatch(
        snackbarAddMessageToQueue({
          message,
          type: SNACKBAR_TYPES.error,
          duration: 5000,
        })
      );
      dispatch(userResetPasswordStatusReset());
    }
  }, [sendResetEmailSuccess, error]);

  return (
    <SafeAreaView style={styles.container}>
      <TopBar title="Forgot password" titleLeftAligned iconLeft="back" />
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="always"
      >
        <AppLogo horizontal />
        <View style={styles.form}>
          <Text style={styles.guideText}>
            Enter your email address and we will send you the instructions to
            reset your password
          </Text>
          <Input.Text
            label="E-mail Address"
            inputId="email"
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            autoCompleteType="email"
            errors={formik.errors}
            touched={formik.touched}
            values={formik.values}
            returnKeyType="go"
            keyboardType="email-address"
            textContentType="emailAddress"
            style={styles.emailInput}
          />
          <Button
            mode="contained"
            disabled={sending || !formik?.isValid}
            onPress={formik.submitForm}
            dense
            text="SEND E-MAIL"
          />
        </View>
        <LegalFooter />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
