import React, { useEffect } from "react";
import { Image, View } from "react-native";

import { useRoute } from "@react-navigation/native";
import { useFormik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text, Title } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import * as yup from "yup";

import { useDispatch } from "react-redux";
import { branchReset, groupAddInvited } from "@actions";

import { Button, Input, TopBar } from "@components";

import styles from "./JoinGroup.style";

const schema = yup.object().shape({
  product: yup
    .string()
    .min(3, "Must be at least 3 characters long")
    .max(100, "Must be at most 100 characters long")
    .required("Product is required"),
});

const JoinGroup = () => {
  const dispatch = useDispatch();
  const { groupName = "", inviteCode = "", groupId } = useRoute().params || {};
  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      groupName,
      product: "",
    },
    onSubmit: (values) => handleSubmit(values),
  });

  useEffect(() => {
    return () => {
      dispatch(branchReset());
    };
  }, []);

  const handleSubmit = async (values) => {
    dispatch(
      groupAddInvited({
        groupId,
        groupName,
        inviteCode,
        product: values.product,
      })
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TopBar titleLeftAligned iconLeft="back" title="Join a group" />
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <Image
            resizeMode="contain"
            source={require("@assets/join-group.png")}
            style={styles.image}
          />
          <Text style={styles.groupLabel}>You are joining the group:</Text>
          <Title style={styles.groupName}>{groupName}</Title>
          {/* <CustomTextInput
            dense
            label="Invite Code"
            placeholder="Enter invite code"
            inputId="inviteCode"
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            values={formik.values}
            errors={formik.errors}
            touched={formik.touched}
            maxLength={40}
            disabled={isGroupInvite}
          /> */}

          <Text style={styles.labelText}>What product do you sell?</Text>
          <Input.Text
            inputId="product"
            label="Product"
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            values={formik.values}
            errors={formik.errors}
            touched={formik.touched}
            maxLength={100}
            onSubmitEditing={() => formik.isValid && formik.handleSubmit()}
            blurOnSubmit
            returnKeyType="go"
          />
          <Button
            disabled={!formik.isValid || !formik.dirty}
            color="secondary"
            onPress={formik.submitForm}
            text="join group"
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default JoinGroup;
