import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import * as Contacts from "expo-contacts";
import { Checkbox, Divider, TextInput } from "react-native-paper";

import { debounce, mapUsersToArray } from "@utils/utils";

import { Button, ListItemCard, PermissionError, Text } from "@components";

import { PRIMARY_COLOR } from "@styles/styleConstants";

import styles from "./ContactList.style";

// eslint-disable-next-line react/prop-types
const ContactList = ({ onSubmit, isOpportunity }) => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");
  const [checkedUsers, setCheckedUsers] = useState({});
  const [error, setError] = useState(null);

  const length = mapUsersToArray(checkedUsers).length;
  const handlePress = () => {
    onSubmit(mapUsersToArray(checkedUsers));
  };

  useEffect(() => {
    const getPermissions = async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access contacts was denied");
      }
    };

    getPermissions();
  }, []);

  useEffect(() => {
    const getContacts = async () => {
      const config = filter ? { name: filter } : {};
      const { data } = await Contacts.getContactsAsync(config);

      setContacts(data);
    };

    if (!error) getContacts();
  }, [filter, error]);

  const renderContact = ({ item }) => {
    const {
      firstName = "",
      lastName = "",
      id,
      jobTitle = "",
      company = "",
    } = item;

    return (
      <ListItemCard
        onPress={() => {
          setCheckedUsers((val) => ({
            ...val,
            [id]: !val[id] ? item : null,
          }));
        }}
        avatarText={`${firstName.charAt(0).toUpperCase()}${lastName
          .charAt(0)
          .toUpperCase()}`}
        title={`${firstName} ${lastName}`}
        titleStyle={styles.titleStyle}
        subtitle={jobTitle}
        extraSubtitle={company}
        caption={
          <Checkbox.Android
            color={PRIMARY_COLOR}
            status={checkedUsers[id] ? "checked" : "unchecked"}
          />
        }
      />
    );
  };

  if (error) {
    return <PermissionError permissions={["Contact"]} />;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.filterInput}
        mode="outlined"
        onChangeText={debounce(setFilter)}
        label="Search for a contact"
        outlineColor="rgba(0, 0, 0, 0.12)"
        right={<MaterialIcons name="search" size={24} color="black" />}
      />
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>
          Select the contacts to add ({length} selected)
        </Text>
        <Divider style={styles.divider} />
      </View>
      <FlatList data={contacts} renderItem={renderContact} />
      <Button
        text={isOpportunity ? "import as contacts" : "import as leads"}
        color="secondary"
        onPress={handlePress}
        buttonStyle={styles.button}
        disabled={!length}
      />
    </View>
  );
};

export default ContactList;
