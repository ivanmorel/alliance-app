import React, { useRef } from "react";
import { Image, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import { hasNotch } from "react-native-device-info";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import * as yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import { groupCreateForm } from "@actions";

import { SCREENS } from "@routes/routes.constants";

import { Button, Input, TopBar } from "@components";

import styles from "./CreateGroup.style";

const schema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Group name is required")
    .min(3, "Must be at least 3 characters long")
    .max(40, "Must be less than 40 characters long"),
  description: yup
    .string()
    .trim()
    .required("Description is required")
    .min(3, "Must be at least 3 characters long")
    .max(200, "Must be less than 200 characters long"),
});

const CreateGroup = () => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const { groupCreateForm: groupCreateFormState } = useSelector(
    ({ group }) => group
  );
  const { name, description } = groupCreateFormState;
  const descriptionRef = useRef();

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    touched,
    isValid,
    isSubmitting,
  } = useFormik({
    validationSchema: schema,
    initialValues: {
      name,
      description,
    },
    onSubmit: (values) => handleSubmitForm(values),
  });

  const handleSubmitForm = async (values) => {
    const trimmedValues = Object.keys(values).reduce((acc, key) => {
      acc[key] = values[key].trim();
      return acc;
    }, {});
    dispatch(groupCreateForm(trimmedValues));
    navigate(SCREENS.appStack.createGroupProductInfo);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopBar
        iconLeft="back"
        titleLeftAligned
        title="Create New Group"
        onPressLeftIcon={() => navigate(SCREENS.appStack.groups)}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.contentContainer}
        extraScrollHeight={hasNotch() ? 110 : 40}
        enableOnAndroid={true}
        keyboardOpeningTime={0}
        enableResetScrollToCoords={false}
        keyboardShouldPersistTaps="always"
      >
        <View flex={1}>
          <Image
            resizeMode="contain"
            style={styles.firstScreenImage}
            source={require("@assets/messages-group-empty.png")}
          />
          <View style={styles.formAndButtonContainer}>
            <View style={styles.formContainer}>
              <Text style={styles.subtitleText}>Select group name</Text>
              <Input.Text
                placeholder="Enter your group name"
                handleChange={handleChange}
                inputId="name"
                errors={errors}
                values={values}
                touched={touched}
                handleBlur={handleBlur}
                returnKeyType="next"
                onSubmitEditing={() => descriptionRef?.current?.focus()}
                maxLength={40}
                disabled={isSubmitting}
              />
              <Text style={styles.subtitleText}>Group description</Text>
              <Input.Text
                ref={descriptionRef}
                placeholder="Enter a brief description"
                handleChange={handleChange}
                touched={touched}
                errors={errors}
                values={values}
                handleBlur={handleBlur}
                inputId="description"
                returnKeyType="go"
                onSubmitEditing={() => isValid && handleSubmit()}
                maxLength={200}
                blurOnSubmit
                hideError
                disabled={isSubmitting}
              />
              <Text style={styles.helpText}>
                At least 6 characters, numbers or letters
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                text="cancel"
                variant
                textStyle={[styles.buttonStyle, styles.onCancelButtonText]}
                onPress={() => navigate(SCREENS.appStack.groups)}
              />
              <Button
                buttonStyle={styles.buttonStyle}
                color="secondary"
                text="next"
                disabled={isSubmitting || !isValid}
                onPress={handleSubmit}
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default CreateGroup;
