import React, { useEffect, useRef } from "react";
import { Keyboard, View } from "react-native";

import { useRoute } from "@react-navigation/native";
import { useFormik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import * as yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import {
  snackbarAddMessageToQueue,
  userResetPasswordConfirmation,
} from "@actions";

import { SNACKBAR_TYPES } from "@utils/constants";

import { AppLogo, Button, Input, LegalFooter, TopBar } from "@components";

import styles from "./ResetPassword.style";

const schema = yup.object().shape({
  newPassword: yup
    .string()
    .trim()
    .min(8, "Must be at least 8 characters long")
    .max(50, "Must be less than 50 characters long")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Password confirmation is required")
    .oneOf([yup.ref("newPassword")], "Passwords does not match"),
});

const ResetPassword = () => {
  const {
    confirmResetPasswordError: error,
    confirmResetPasswordLoading: loading,
  } = useSelector(({ user }) => user);
  const route = useRoute();
  const dispatch = useDispatch();
  const confirmPasswordRef = useRef(null);

  const { token } = route?.params || {};

  const formik = useFormik({
    validationSchema: schema,
    validateOnMount: false,
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: ({ newPassword }) => {
      Keyboard.dismiss();
      if (token) {
        dispatch(
          userResetPasswordConfirmation({ token, password: newPassword })
        );
      }
    },
  });

  useEffect(() => {
    if (error) {
      dispatch(
        snackbarAddMessageToQueue({
          message:
            "There was an error resetting password. If the problem persists, please contact support at: support@allianceapp.com",
          type: SNACKBAR_TYPES.error,
        })
      );
    }
  }, [error]);

  return (
    <SafeAreaView style={styles.container}>
      <TopBar title="Reset password" titleLeftAligned iconLeft="back" />
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        keyboardShouldPersistTaps="always"
      >
        <AppLogo horizontal />
        <View style={styles.form}>
          <Input.Text
            label="New Password"
            inputId="newPassword"
            autoCompleteType="password"
            returnKeyType="next"
            textContentType="password"
            onSubmitEditing={() => confirmPasswordRef.current?.focus()}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            errors={formik.errors}
            touched={formik.touched}
            values={formik.values}
            secureTextEntry
            revealIcon
          />
          <Input.Text
            label="Confirm Password"
            inputId="confirmPassword"
            autoCompleteType="password"
            returnKeyType="go"
            textContentType="password"
            ref={confirmPasswordRef}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            errors={formik.errors}
            touched={formik.touched}
            values={formik.values}
            onSubmitEditing={() =>
              formik.dirty && formik.isValid && formik.submitForm()
            }
            blurOnSubmit
            secureTextEntry
            revealIcon
          />
          <Button
            disabled={loading || !formik?.isValid}
            onPress={formik.submitForm}
            text="CHANGE MY PASSWORD"
          />
        </View>
        <LegalFooter />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ResetPassword;
