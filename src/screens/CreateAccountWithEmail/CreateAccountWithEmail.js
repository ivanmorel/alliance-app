import React, { useState } from "react";
import { View } from "react-native";

import { useFormik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import * as yup from "yup";

import { useDispatch } from "react-redux";
import { snackbarAddMessageToQueue, userSignUp } from "@actions";

import { navigate } from "@routes/navigator";
import { SCREENS } from "@routes/routes.constants";

import { SNACKBAR_TYPES, TEST_IDS } from "@utils/constants";

import {
  AppLogo,
  Button,
  ConfirmationModal,
  Input,
  LegalFooter,
  LinkTo,
  TopBar,
} from "@components";

import style from "./CreateAccountWithEmail.style";

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().trim().required("Last name is required"),
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
  passwordConfirmation: yup
    .string()
    .required("Password confirmation is required")
    .oneOf([yup.ref("password")], "Passwords does not match"),
});

const CreateAccountWithEmail = () => {
  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  const dispatch = useDispatch();
  const lastNameRef = React.useRef(null);
  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  const passwordConfirmationRef = React.useRef(null);
  const [modalVisible, setVisible] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = async ({ email, password, firstName, lastName }) => {
    setSubmitting(true);
    const response = await dispatch(
      userSignUp({ email, password, firstName, lastName })
    );

    if (response) {
      setVisible(true);
    } else {
      dispatch(
        snackbarAddMessageToQueue({
          message:
            "Something went wrong while creating your account, please try again later",
          duration: 5000,
          type: SNACKBAR_TYPES.error,
        })
      );
    }
    setSubmitting(false);
  };

  const handleOk = () => {
    setVisible(false);
    navigate(SCREENS.authStack.welcome);
  };

  return (
    <SafeAreaView style={style.container}>
      <TopBar
        title="Create account with email"
        titleLeftAligned
        iconLeft="back"
      />
      <KeyboardAwareScrollView extraScrollHeight={80} extraHeight={120}>
        <AppLogo horizontal />
        <View style={style.formContainer}>
          <Input.Text
            label="First Name"
            inputId="firstName"
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            errors={formik.errors}
            touched={formik.touched}
            values={formik.values}
            onSubmitEditing={() => lastNameRef.current.focus()}
            disabled={submitting}
            returnKeyType="next"
            testID={TEST_IDS.createAccountWithEmail.firstNameInput}
            errorTestID={TEST_IDS.createAccountWithEmail.firstNameInputError}
          />
          <Input.Text
            label="Last Name"
            inputId="lastName"
            ref={lastNameRef}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            errors={formik.errors}
            touched={formik.touched}
            values={formik.values}
            onSubmitEditing={() => emailRef.current.focus()}
            disabled={submitting}
            returnKeyType="next"
            testID={TEST_IDS.createAccountWithEmail.lastNameInput}
            errorTestID={TEST_IDS.createAccountWithEmail.lastNameInputError}
          />
          <Input.Text
            label="Email"
            inputId="email"
            ref={emailRef}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            errors={formik.errors}
            touched={formik.touched}
            values={formik.values}
            onSubmitEditing={() => passwordRef.current.focus()}
            onBlur={() =>
              formik.setFieldValue("email", formik.values.email.trim())
            }
            disabled={submitting}
            returnKeyType="next"
            autoCompleteType="email"
            testID={TEST_IDS.createAccountWithEmail.emailInput}
            errorTestID={TEST_IDS.createAccountWithEmail.emailInputError}
          />
          <Input.Text
            label="Password"
            inputId="password"
            ref={passwordRef}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            errors={formik.errors}
            touched={formik.touched}
            values={formik.values}
            onSubmitEditing={() => passwordConfirmationRef.current.focus()}
            disabled={submitting}
            secureTextEntry
            returnKeyType="next"
            testID={TEST_IDS.createAccountWithEmail.passwordInput}
            errorTestID={TEST_IDS.createAccountWithEmail.passwordInputError}
            autoCompleteType="password"
            revealIcon
          />
          <Input.Text
            label="Password confirmation"
            inputId="passwordConfirmation"
            ref={passwordConfirmationRef}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            errors={formik.errors}
            touched={formik.touched}
            values={formik.values}
            disabled={submitting}
            onSubmitEditing={formik.submitForm}
            secureTextEntry
            testID={TEST_IDS.createAccountWithEmail.passwordConfirmInput}
            errorTestID={
              TEST_IDS.createAccountWithEmail.passwordConfirmInputError
            }
            autoCompleteType="password"
            revealIcon
          />
          <Button
            color="secondary"
            text="create my account"
            onPress={formik.submitForm}
            disabled={submitting}
            testID={TEST_IDS.createAccountWithEmail.submitButton}
          />
        </View>
        <LinkTo
          text="Already have an account?"
          linkText="Log in"
          onPress={() => navigate(SCREENS.authStack.login)}
        />
        <LegalFooter />
      </KeyboardAwareScrollView>
      <ConfirmationModal
        visible={modalVisible}
        title="Account created"
        descriptionText="Your account has been created. Check your e-mail for activation."
        okIcon={null}
        okButtonColor="primary"
        showCancelButton={false}
        onOk={handleOk}
      />
    </SafeAreaView>
  );
};

export default CreateAccountWithEmail;
