import React, { forwardRef } from "react";
import { View } from "react-native";

import { GOOGLE_PLACES_API_KEY } from "@env";

import PropTypes from "prop-types";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { HelperText, TextInput } from "react-native-paper";

import { makeAddressFromGoogleComponent } from "@utils/utils";

import { Label, Text } from "@components";

import styles from "./Input.style";

/* eslint-disable react/prop-types */
const GooglePlacesTextInput = forwardRef(
  ({ touched, label, handleBlur, value, error, ...props }, ref) => {
    return (
      <View style={styles.googlePlacesTextInputContainer}>
        <TextInput
          {...props}
          onBlur={(e) => {
            props.onBlur(e);
            return handleBlur;
          }}
          value={value}
          style={[styles.textInput, styles.googlePlacesTextInput]}
          ref={ref}
          mode="outlined"
          label={label && <Label label={label} />}
          error={touched && error}
          autoCapitalize="none"
          autoCompleteType="off"
          outlineColor="rgba(0, 0, 0, 0.12)"
        />
        <HelperText
          style={styles.errorText}
          type="error"
          visible={!!touched && error}
        >
          {label} is required
        </HelperText>
      </View>
    );
  }
);

const AddressSearch = forwardRef(
  (
    {
      placeholder,
      handleSelect,
      inputId,
      handleBlur,
      touched,
      values,
      onLocationSelect,
      errors,
      ...props
    },
    ref
  ) => {
    return (
      <GooglePlacesAutocomplete
        ref={ref}
        enablePoweredByContainer={false}
        keepResultsAfterBlur={false}
        styles={styles.googlePlacesAutocomplete}
        numberOfLines={2}
        renderRow={({ structured_formatting }) => {
          const title = structured_formatting?.main_text;
          const address = structured_formatting?.secondary_text;

          if (!title || !address) return null;

          return (
            <View>
              <Text>{title}</Text>
              <Text>{address}</Text>
            </View>
          );
        }}
        keyboardShouldPersistTaps="always"
        placeholder={placeholder}
        fetchDetails
        onPress={({ place_id }, { address_components, geometry }) => {
          const { location } = geometry;
          const address = makeAddressFromGoogleComponent(address_components);
          handleSelect(inputId, { ...location, ...address, place_id }, true);
          onLocationSelect();
        }}
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: "en",
          components: "country:us",
          types: ["establishment"],
        }}
        textInputProps={{
          ...props,
          InputComp: GooglePlacesTextInput,
          returnKeyType: "next",
          enablesReturnKeyAutomatically: true,
          blurOnSubmit: false,
          handleBlur: handleBlur(inputId),
          touched: touched[inputId],
          error: errors[inputId],
          values: values[inputId],
          clearButtonMode: "never",
        }}
      />
    );
  }
);

export default AddressSearch;

AddressSearch.propTypes = {
  errors: PropTypes.object,
  handleBlur: PropTypes.func,
  handleSelect: PropTypes.func,
  inputId: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  touched: PropTypes.object,
  values: PropTypes.object,
  onSubmitEditing: PropTypes.func,
  onLocationSelect: PropTypes.func,
};

AddressSearch.defaultProps = {
  errors: {},
  handleBlur: () => {},
  handleSelect: () => {},
  touched: {},
  onSubmitEditing: () => {},
  onLocationSelect: () => {},
};
