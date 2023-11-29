import React, { useRef, useState } from "react";
import { Text } from "react-native";

import { useFormik } from "formik";
import { hasNotch } from "react-native-device-info";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import * as yup from "yup";

import { useDispatch } from "react-redux";
import { snackbarAddMessageToQueue } from "@actions";

import { navigate } from "@routes/navigator";
import { SCREENS } from "@routes/routes.constants";

import { authorizedPost, feedbackURL } from "@utils/api";

import { Button, Input, TopBar } from "@components";

import { APP_BACKGROUND_COLOR } from "@styles/styleConstants";

import styles from "./SendFeedback.style";

const schema = yup.object().shape({
  message: yup.string().required("Message is required"),
  category: yup.string().required("Category is required"),
});

const SendFeedback = () => {
  const formik = useFormik({
    validationSchema: schema,
    initialValues: { category: "", message: "" },
    onSubmit: (values) => handleSubmit(values),
  });

  const dispatch = useDispatch();
  const messageRef = useRef(null);
  const [isLoading, setLoading] = useState(false);
  const [items] = useState([
    { label: "Suggestion", value: "Suggestion" },
    { label: "Bug", value: "Bug" },
    { label: "Feature Request", value: "Feature Request" },
    { label: "Other", value: "Other" },
  ]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await authorizedPost(`${feedbackURL()}/submit`, {
        subject: values.category,
        content: values.message,
      });
      navigate(SCREENS.appStack.activities);
      dispatch(
        snackbarAddMessageToQueue({ message: "Thank you for your feedback!" })
      );
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView flex={1} style={{ backgroundColor: APP_BACKGROUND_COLOR }}>
      <TopBar title="Send Feedback" />
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        extraScrollHeight={hasNotch() ? 110 : 40}
        enableOnAndroid={true}
        keyboardOpeningTime={0}
        enableResetScrollToCoords={false}
      >
        <Text style={styles.helpText}>
          Please enter the category and message below:
        </Text>
        <Input.Dropdown
          label="Select a Category"
          inputId="category"
          values={formik.values}
          handleChange={formik.handleChange}
          items={items}
          errors={formik.errors}
          touched={formik.touched}
        />
        <Input.TextArea
          inputId="message"
          numberOfLines={15}
          placeholder="Type your message here"
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          errors={formik.errors}
          touched={formik.touched}
          values={formik.values}
          disabled={isLoading}
          ref={messageRef}
        />
        <Button
          onPress={formik.submitForm}
          loading={isLoading}
          text="Send feedback"
          buttonStyle={styles.buttonStyle}
          disabled={!formik.isValid || !formik.dirty}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SendFeedback;
