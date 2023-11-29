import React, { forwardRef, useEffect, useState } from "react";
import { View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import DropDown from "react-native-paper-dropdown";

import { Button, Input } from "@components";

import styles from "./ContactSelect.style";

const CONTACT_TYPES = {
  phone: "phone",
  email: "email",
  linkedin: "linkedin",
};

const ContactInfoInput = forwardRef(({ type, ...props }, ref) => {
  let input = null;
  switch (type) {
    case CONTACT_TYPES.phone:
      input = <Input.Phone ref={ref} {...props} />;
      break;
    case CONTACT_TYPES.email:
    case CONTACT_TYPES.linkedin:
      input = <Input.Text ref={ref} {...props} />;
      break;
  }

  return input;
});

const items = [
  { label: "Email", value: CONTACT_TYPES.email },
  { label: "LinkedIn", value: CONTACT_TYPES.linkedin },
  { label: "Phone", value: CONTACT_TYPES.phone },
];

const filterItems = (items, values, currentType) =>
  items.filter(
    (item) =>
      !values.find(
        (value) => value.type === item.value && value.type !== currentType
      )
  );

// eslint-disable-next-line react/prop-types
const ContactSelect = forwardRef(
  ({ values = {}, handleChange, focusNextInput, ...rest }, ref) => {
    const [fields, setFields] = useState([]);
    // Dev Note. there is a bug in the dropdown component that causes the dropdown to not update when the items changes.
    // because of the dropdown being set to not visible when you click the update
    // and so I decided to have 2 sources of truth for the items
    const [visible, setVisible] = useState(Array(3).fill(false));
    const secondRef = React.useRef(null);
    const thirdRef = React.useRef(null);
    useEffect(() => {
      const filteredFields = Object.entries(values).filter(
        ([type, val]) => CONTACT_TYPES[type] && val
      );

      if (!filteredFields.length) {
        setFields([
          {
            type: CONTACT_TYPES.email,
            onChange: updateInputValue.bind(null, CONTACT_TYPES.email),
          },
        ]);
      } else {
        const newFields = filteredFields.map(([type]) => ({
          type,
          onChange: updateInputValue.bind(null, type),
        }));

        setFields(newFields);
      }
    }, []);

    const addContactInfo = () => {
      if (fields.length >= 3) return;

      const newValues = [...fields];
      const [first] = filterItems(items, fields, null);
      newValues.push({
        type: first.value,
        onChange: updateInputValue.bind(null, first.value),
      });
      updateInputValue(first.value)("");
      setFields(newValues);
    };

    const updateDropdownValues = (index, newValue) => {
      setFields((prevValues) =>
        prevValues.map((value, i) =>
          i === index
            ? {
                type: newValue,
                onChange: updateInputValue.bind(null, newValue),
              }
            : value
        )
      );

      setVisible(Array(3).fill(false));
    };

    const removeSelect = (index, type) => {
      const newValues = fields.filter((_, i) => i !== index);
      updateInputValue(type)("");
      setFields(newValues);
    };

    const handleVisible = (index, newValue) => {
      const newVisible = visible.map((value, i) =>
        i === index ? newValue : value
      );

      setVisible(newVisible);
    };

    const updateInputValue = (inputId) => (newText) => {
      handleChange(inputId)(newText);
    };

    const getRef = (index) => {
      if (index === 0) return ref;
      if (index === 1) return secondRef;
      if (index === 2) return thirdRef;
    };

    const handleSubmitEditing = (index) => {
      if (index === fields.length - 1) {
        focusNextInput();
        return;
      }
      if (index === 0) secondRef?.current.focus();
      if (index === 1) thirdRef?.current.focus();
    };
    console.log("second");
    console.log(secondRef);
    console.log("third");
    console.log(thirdRef);
    return (
      <>
        {fields.map(({ type, onChange }, index) => {
          const finalRef = getRef(index);
          return (
            <View key={`${type}`} style={styles.componentContainer}>
              <ContactInfoInput
                ref={finalRef}
                inputId={type}
                type={type}
                label="Contact Info"
                values={values}
                returnKeyType="done"
                maxLength={100}
                handleChange={onChange}
                style={{ width: index === 0 ? "65%" : "50%", marginRight: 15 }}
                onSubmitEditing={() => handleSubmitEditing(index)}
                errorStyle={styles.error}
                {...rest}
              />
              <DropDown
                setValue={(newType) => {
                  updateDropdownValues(index, newType);
                }}
                onDismiss={() => handleVisible(index, false)}
                showDropDown={() => handleVisible(index, true)}
                visible={visible[index]}
                value={type}
                mode="outlined"
                list={filterItems(items, fields, type)}
                inputProps={{
                  style: { width: index === 0 ? "100%" : 125, flex: 1 },
                  outlineColor: "rgba(0, 0, 0, 0.12)",
                }}
                dropDownItemSelectedStyle={styles.dropdownItem}
                dropDownItemSelectedTextStyle={styles.dropdownItemText}
                dropDownItemTextStyle={styles.dropdownItemText}
              />
              {index !== 0 ? (
                <MaterialCommunityIcons
                  name="close-circle"
                  size={24}
                  color="black"
                  style={styles.icon}
                  onPress={() => removeSelect(index, type)}
                />
              ) : null}
            </View>
          );
        })}
        {fields.length < 3 ? (
          <Button
            text="add More contact info"
            variant
            color="subtitle"
            onPress={addContactInfo}
            buttonStyle={styles.button}
          />
        ) : null}
      </>
    );
  }
);

ContactSelect.propTypes = {
  values: PropTypes.object,
  handleChange: PropTypes.func,
  focusNextInput: PropTypes.func,
};

export default ContactSelect;
