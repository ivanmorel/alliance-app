import React, { useRef } from "react";
import { Image, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { hasNotch } from "react-native-device-info";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import * as yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import {
  groupCreateForm as groupCreateFormAction,
  groupCreatePrivate,
} from "@actions";

import { wait } from "@utils/utils";

import { Button, Input, TopBar } from "@components";

import styles from "./CreateGroup.style";

const schema = yup.object().shape({
  product: yup
    .string()
    .trim()
    .required("Product is required")
    .min(3, "Must be at least 3 characters long")
    .max(100, "Must be less than 100 characters long"),
  target: yup
    .string()
    .trim()
    .required("Target is required")
    .min(3, "Must be at least 3 characters long")
    .max(100, "Must be less than 100 characters long"),
});

const CreateGroup = () => {
  const { goBack } = useNavigation();
  const dispatch = useDispatch();
  const { groupCreateForm } = useSelector((state) => state.group);
  const { product, target } = groupCreateForm;
  const targetRef = useRef();

  const handleSubmitForm = async (values) => {
    // Adding a slight delay here to give the user preception of something
    // happening. Specifically, to give the form/inputs a chance to show
    // disabled and loading states and to be consistent with the first step.
    await wait(1000);
    dispatch(groupCreateFormAction(values));
    dispatch(groupCreatePrivate({ ...groupCreateForm, ...values }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopBar iconLeft="back" titleLeftAligned title="Create New Group" />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.contentContainer}
        extraScrollHeight={hasNotch() ? 110 : 40}
        enableOnAndroid={true}
        keyboardOpeningTime={0}
        enableResetScrollToCoords={false}
        keyboardShouldPersistTaps="always"
      >
        <Formik
          validationSchema={schema}
          initialValues={{ product, target }}
          onSubmit={handleSubmitForm}
        >
          {({
            handleBlur,
            touched,
            handleChange,
            handleSubmit,
            isSubmitting,
            values,
            errors,
            isValid,
          }) => {
            return (
              <View flex={1}>
                <Image
                  resizeMode="contain"
                  style={styles.secondScreenImage}
                  source={require("@assets/create-group-product-info.png")}
                />
                <View style={styles.formAndButtonContainer}>
                  <View style={styles.formContainer}>
                    <Text style={styles.subtitleText}>
                      What are you selling?
                    </Text>
                    <Input.Text
                      inputId="product"
                      placeholder="Enter your product name"
                      handleChange={handleChange}
                      errors={errors}
                      values={values}
                      handleBlur={handleBlur}
                      touched={touched}
                      returnKeyType="next"
                      onSubmitEditing={() => targetRef?.current?.focus()}
                      maxLength={100}
                      disabled={isSubmitting}
                    />
                    <Text style={styles.subtitleText}>
                      Who are you targeting?
                    </Text>
                    <Input.Text
                      inputId="target"
                      ref={targetRef}
                      placeholder="Enter your audience"
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      errors={errors}
                      values={values}
                      returnKeyType="go"
                      onSubmitEditing={handleSubmit}
                      blurOnSubmit
                      maxLength={100}
                      disabled={isSubmitting}
                    />
                  </View>
                  <View style={styles.buttonContainer}>
                    <Button
                      text="previous"
                      variant
                      textStyle={[
                        styles.buttonStyle,
                        styles.onCancelButtonText,
                      ]}
                      onPress={goBack}
                    />
                    <Button
                      buttonStyle={styles.buttonStyle}
                      color="secondary"
                      text="Create"
                      onPress={handleSubmit}
                      disabled={isSubmitting || !isValid}
                    />
                  </View>
                </View>
              </View>
            );
          }}
        </Formik>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default CreateGroup;
