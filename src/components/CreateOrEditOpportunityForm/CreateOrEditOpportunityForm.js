import React, { useEffect, useRef } from "react";
import { View } from "react-native";

import { Formik } from "formik";
import * as yup from "yup";

import { getAddressFromGoogleObject } from "@utils/utils";

import { Button, Input } from "@components";

import styles from "./CreateOrEditOpportunityForm.style";

const validationSchena = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(5, "Must be at least 5 characters")
    .max(500, "Must be less than 50 characters")
    .required("Name is required"),
  notes: yup
    .string()
    .trim()
    .min(5, "must be at least 5 characters")
    .max(500, "Must be less than 300 characters")
    .required("Description is required"),
  address: yup.object().required("Location is required"),
});

/* eslint-disable react/prop-types */
const CreateOrEditOpportunityForm = ({
  initialValues,
  isLoading,
  onCancel,
  onSubmit,
  onLocationSelect,
  submitButtonText,
}) => {
  const descriptionRef = useRef(null);
  const addressRef = useRef(null);
  const isEditing = !!initialValues;

  useEffect(() => {
    if (isEditing && addressRef?.current && !isLoading) {
      const address = getAddressFromGoogleObject(initialValues?.address);
      addressRef?.current?.setAddressText(address);
    }
  }, [isEditing, addressRef?.current, isLoading]);

  return (
    <Formik
      validationSchema={validationSchena}
      initialValues={{
        name: initialValues?.name || "",
        notes: initialValues?.notes || "",
        address: initialValues?.address || "",
      }}
      onSubmit={onSubmit}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        errors,
        touched,
        setFieldValue,
        isValid,
        dirty,
      }) => (
        <View style={styles.innerContainer}>
          <Input.Text
            label="Name"
            inputId="name"
            handleChange={handleChange}
            handleBlur={handleBlur}
            values={values}
            errors={errors}
            touched={touched}
            disabled={isLoading}
            returnKeyType="next"
            onSubmitEditing={() => descriptionRef?.current?.focus()}
            enablesReturnKeyAutomatically={true}
            maxLength={100}
          />
          <Input.Text
            ref={descriptionRef}
            label="Description"
            inputId="notes"
            handleChange={handleChange}
            handleBlur={handleBlur}
            values={values}
            errors={errors}
            touched={touched}
            disabled={isLoading}
            returnKeyType="next"
            onSubmitEditing={() => addressRef?.current?.focus()}
            enablesReturnKeyAutomatically={false}
            maxLength={500}
            multiline
          />
          <Input.AddressSearch
            ref={addressRef}
            handleSelect={setFieldValue}
            inputId="address"
            label="Location"
            values={values}
            errors={errors}
            touched={touched}
            handleBlur={handleBlur}
            disabled={isLoading}
            onLocationSelect={onLocationSelect}
          />
          <View style={styles.buttonContainer}>
            <Button
              buttonStyle={styles.button}
              text="Cancel"
              color="subtitle"
              onPress={onCancel}
              disabled={isLoading}
              variant
            />
            <Button
              buttonStyle={[
                styles.button,
                isEditing ? styles.editButton : styles.saveButton,
              ]}
              text={submitButtonText}
              color="secondary"
              onPress={handleSubmit}
              loading={isLoading}
              disabled={!isValid || !dirty}
            />
          </View>
        </View>
      )}
    </Formik>
  );
};

export default CreateOrEditOpportunityForm;
