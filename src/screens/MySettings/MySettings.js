import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";

import { useFormik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters/extend";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import {
  snackbarAddMessageToQueue,
  userDeleteAccount,
  userLogout,
  userUpdate,
  userUpdateReset,
} from "@actions";

import { SNACKBAR_TYPES } from "@utils";

import { Button, ConfirmationModal, Input, Loader, TopBar } from "@components";

import { APP_BACKGROUND_COLOR } from "@styles/styleConstants";

import styles from "./MySettings.style";

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required(" Last name is required"),
  company: yup.string(),
  title: yup.string(),
  // email: yup.string().email(),
  // password: yup.string(),
  // password2: yup.string(),
});

const MySettings = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { appUser, loading, error, userUpdated } = useSelector(
    ({ user }) => user
  );
  const { loading: feedbackLoading } = useSelector(({ feedback }) => feedback);
  const {
    firstName,
    lastName,
    userId,
    email,
    company = "",
    title = "",
  } = appUser;
  const [modalVisible, setModalVisible] = useState(false);
  const lastNameRef = useRef(null);
  const companyRef = useRef(null);
  const titleRef = useRef(null);

  const handleSubmit = async ({ firstName, lastName, company, title }) => {
    const result = await dispatch(
      userUpdate({ user: { firstName, lastName, company, title } })
    );

    if (result) {
      dispatch(
        snackbarAddMessageToQueue({
          message: "Settings updated!",
          type: SNACKBAR_TYPES.success,
        })
      );
    } else {
      dispatch(
        snackbarAddMessageToQueue({
          message: "There was an error while submitting your request",
          type: SNACKBAR_TYPES.error,
        })
      );
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName,
      lastName,
      company,
      title,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: handleSubmit,
  });

  const inputProps = {
    handleSubmit: formik.handleSubmit,
    handleChange: formik.handleChange,
    handleBlur: formik.handleBlur,
    values: formik.values,
    errors: formik.errors,
    touched: formik.touched,
    dirty: formik.dirty,
    isValid: formik.isValid,
    disabled: loading,
    blurOnSubmit: true,
    enablesReturnKeyAutomatically: true,
  };

  const handleDeleteAccount = async () => {
    const result = await dispatch(userDeleteAccount());

    if (result) {
      dispatch(userLogout());
      dispatch(
        snackbarAddMessageToQueue({
          message:
            "The deletion process has been initiated and your account is closed. Check your email for confirmation.",
          type: SNACKBAR_TYPES.error,
          duration: 10000,
        })
      );
    } else {
      dispatch(
        snackbarAddMessageToQueue({
          message: "There was an error while submitting your request",
          type: SNACKBAR_TYPES.error,
        })
      );
    }
  };

  useEffect(() => {
    if (!loading && !error && userUpdated) {
      dispatch(userUpdateReset());
    }
  }, [loading, error, userUpdated]);

  return (
    <SafeAreaView flex={1} style={{ backgroundColor: APP_BACKGROUND_COLOR }}>
      <TopBar title="My Settings" />
      {!userId ? (
        <Loader />
      ) : (
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.container}
          bounces={false}
          keyboardShouldPersistTaps="always"
        >
          <View style={styles.accountEmailContainer}>
            <Text style={styles.textLabel}>Account email:</Text>
            <Text style={[styles.text, theme.fonts.medium]}>{email}</Text>
          </View>
          <View flex={1} style={styles.contentContainer}>
            <View>
              <Input.Text
                label="First Name"
                inputId="firstName"
                returnKeyType="next"
                onSubmitEditing={() => lastNameRef?.current?.focus()}
                {...inputProps}
              />
              <Input.Text
                ref={lastNameRef}
                label="Last Name"
                inputId="lastName"
                returnKeyType="next"
                onSubmitEditing={() => companyRef?.current?.focus()}
                {...inputProps}
              />
              <Input.Text
                ref={companyRef}
                label="Company"
                inputId="company"
                returnKeyType="next"
                onSubmitEditing={() => titleRef?.current?.focus()}
                {...inputProps}
              />
              <Input.Text
                ref={titleRef}
                label="Title"
                inputId="title"
                returnKeyType="go"
                onSubmitEditing={() =>
                  formik.dirty && formik.isValid && formik.handleSubmit()
                }
                {...inputProps}
              />
              <Button
                color="secondary"
                onPress={handleSubmit}
                disabled={!formik.dirty && formik.isValid}
                loading={loading}
                text={loading ? "Saving..." : "Save"}
              />
            </View>
            <View style={styles.footerActionsContainer}>
              <Button
                onPress={() => setModalVisible(true)}
                icon="close"
                text="Request account deletion"
                buttonStyle={styles.textButton}
                color="dark"
                variant
                dense
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      )}
      <ConfirmationModal
        title="Request Deletion"
        visible={modalVisible}
        warningText="Are you sure you want to delete your account?
        This action can't be undone."
        okTitle="Request Deletion"
        titleIcon={
          <AntDesign
            name="exclamationcircleo"
            style={styles.iconStyle}
            size={scale(20)}
            color="black"
          />
        }
        onCancel={() => setModalVisible(false)}
        onOk={handleDeleteAccount}
        okButtonColor="error"
        okIcon="trash-can-outline"
        loading={feedbackLoading}
        disabled={feedbackLoading}
      />
    </SafeAreaView>
  );
};

export default MySettings;
