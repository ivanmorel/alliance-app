import React, { useEffect, useRef } from "react";

import { useFormik } from "formik";
import PropTypes from "prop-types";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as yup from "yup";

import { getAddressFromGoogleObject } from "@utils/utils";

import { Button, ContactSelect, Input } from "@components";

import styles from "../../screens/CreateLead/CreateLead.style";

const phoneRegExp =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
const oneOfPhoneEmailLinkedIn = "You must have one of phone, email or linkedin";
const validationSchema = yup.object().shape(
  {
    firstName: yup
      .string()
      .max(50, "Must be less than 50 characters")
      .required("First name is required"),
    lastName: yup
      .string()
      .max(50, "Must be less than 50 characters")
      .required("Last name is required"),
    company: yup.string().max(50, "Must be less than 50 characters"),
    title: yup.string().max(50, "Must be less than 50 characters"),
    email: yup
      .string()
      .max(300, "Must be less than 300 characters")
      .when(["phone", "linkedin"], {
        is: (phone, linkedin) => !phone && !linkedin,
        then: yup.string().required(oneOfPhoneEmailLinkedIn),
      })
      .email(),
    phone: yup
      .string()
      .when(["email", "linkedin"], {
        is: (email, linkedin) => !email && !linkedin,
        then: yup.string().required(oneOfPhoneEmailLinkedIn),
      })
      .test("ValidPhone", "Must be a valid phone number", (value) =>
        value && value.length > 0 ? phoneRegExp.test(value) : true
      ),
    linkedin: yup
      .string()
      .max(50)
      .when(["phone", "email"], {
        is: (phone, email) => !phone && !email,
        then: yup.string().required(oneOfPhoneEmailLinkedIn),
      })
      .test(
        "LinkedInProfile",
        "LinkedIn profile should be in 'linkedin.com/in/profile' format",
        (value) =>
          value && value?.length > 0
            ? value?.includes("linkedin.com/in/")
            : true
      ),
    address: yup.object(),
    notes: yup.string().max(1000, "Must be less than 1000 characters"),
  },
  [
    ["email", "phone"],
    ["email", "linkedin"],
    ["phone", "linkedin"],
  ]
);

const CreateOrEditLeadForm = ({
  onSubmit,
  isLoading,
  initialValues,
  hideCancelButton,
  onCancel = () => {},
  okText,
}) => {
  const lastNameRef = useRef(null);
  const companyRef = useRef(null);
  const positionRef = useRef(null);
  const contactRef = useRef(null);
  const addressRef = useRef(null);
  const scrollViewRef = useRef(null);
  const formik = useFormik({
    validationSchema,
    initialValues: {
      firstName: initialValues?.firstName || "",
      lastName: initialValues?.lastName || "",
      company: initialValues?.company || "",
      title: initialValues?.title || "",
      email: initialValues?.email || "",
      phone: initialValues?.phone || "",
      linkedin: initialValues?.linkedin || "",
      address: initialValues?.address || "",
      notes: initialValues?.notes || "",
    },
    onSubmit,
  });
  const isEditing = !!initialValues;

  useEffect(() => {
    if (isEditing && addressRef?.current && !isLoading) {
      const address = getAddressFromGoogleObject(initialValues?.address || {});
      addressRef?.current?.setAddressText(address);
    }
  }, [isEditing, addressRef?.current, isLoading]);

  useEffect(() => {
    scrollViewRef?.current?.scrollTo({ y: 0 });
    formik.resetForm({
      values: {
        firstName: initialValues?.firstName || "",
        lastName: initialValues?.lastName || "",
        company: initialValues?.company || "",
        title: initialValues?.title || "",
        email: initialValues?.email || "",
        phone: initialValues?.phone || "",
        linkedin: initialValues?.linkedin || "",
        address: initialValues?.address || "",
        notes: initialValues?.notes || "",
      },
    });
  }, [initialValues]);

  const extraProps = {
    handleChange: formik.handleChange,
    values: formik.values,
    handleBlur: formik.handleBlur,
    errors: formik.errors,
    touched: formik.touched,
    disabled: isLoading,
  };

  return (
    <KeyboardAwareScrollView
      extraScrollHeight={80}
      extraHeight={120}
      keyboardShouldPersistTaps="handled"
      innerRef={(ref) => (scrollViewRef.current = ref)}
    >
      <Input.Text
        label="First Name"
        inputId="firstName"
        returnKeyType="next"
        onSubmitEditing={() => lastNameRef?.current?.focus()}
        enablesReturnKeyAutomatically={true}
        maxLength={50}
        {...extraProps}
      />
      <Input.Text
        ref={lastNameRef}
        label="Last Name"
        inputId="lastName"
        returnKeyType="next"
        onSubmitEditing={() => companyRef?.current?.focus()}
        enablesReturnKeyAutomatically
        maxLength={50}
        {...extraProps}
      />
      <Input.Text
        ref={companyRef}
        label="Company"
        inputId="company"
        returnKeyType="next"
        onSubmitEditing={() => positionRef?.current?.focus()}
        enablesReturnKeyAutomatically
        maxLength={50}
        {...extraProps}
      />
      <Input.Text
        ref={positionRef}
        label="Position"
        inputId="title"
        returnKeyType="next"
        onSubmitEditing={() => contactRef?.current?.focus()}
        enablesReturnKeyAutomatically
        maxLength={50}
        {...extraProps}
      />
      <ContactSelect
        ref={contactRef}
        focusNextInput={() => addressRef.current?.focus()}
        {...extraProps}
      />
      <Input.AddressSearch
        ref={addressRef}
        handleSelect={formik.handleChange}
        inputId="address"
        label="Location"
        onLocationSelect={() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }}
        {...extraProps}
      />
      <Input.TextArea
        ref={null}
        inputId="notes"
        label="Notes"
        style={styles.notesInput}
        multiline
        numberOfLines={10}
        onChangeText={formik.handleChange}
        maxLength={1000}
        {...extraProps}
      />
      {!hideCancelButton ? (
        <Button variant text="skip this contact" onPress={onCancel} />
      ) : null}
      <Button
        text={okText || "Create Lead"}
        color="secondary"
        onPress={formik.handleSubmit}
        loading={isLoading}
        disabled={!formik.isValid}
      />
    </KeyboardAwareScrollView>
  );
};

export default CreateOrEditLeadForm;

CreateOrEditLeadForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  initialValues: PropTypes.object,
  hideCancelButton: PropTypes.bool,
  okText: PropTypes.string,
  isLoading: PropTypes.bool,
};
