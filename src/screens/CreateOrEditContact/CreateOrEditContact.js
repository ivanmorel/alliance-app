import React, { useEffect } from "react";
import { View } from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import * as Contacts from "expo-contacts";
import RNContacts from "react-native-contacts";
import { SafeAreaView } from "react-native-safe-area-context";

import { useDispatch, useSelector } from "react-redux";
import {
  opportunityContactCreate,
  opportunityContactCreateFail,
  opportunityContactCreateReset,
  opportunityContactEdit,
  snackbarAddMessageToQueue,
} from "@actions";

import { navigationRef } from "@routes/navigator";
import { LeadTabTopBarRightIcon } from "@routes/navigatorUtils";
import { SCREENS } from "@routes/routes.constants";

import { SNACKBAR_TYPES } from "@utils/constants";
import { mapLeadToContact, parsePhone } from "@utils/utils";

import { CreateOrEditLeadForm, TopBar } from "@components";

import styles from "./CreateOrEditContact.style";

const CreateOrEditContact = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    contactCreateLoading,
    contactCreateSuccess,
    contactEditLoading,
    contactEditSuccess,
  } = useSelector(({ opportunity }) => opportunity);
  const route = useRoute();
  const { opportunityId, opportunityName, contact } = route?.params || {};
  const isLoading = contactCreateLoading || contactEditLoading;
  const isEditing = contact?.contactId;
  const initialValues = isEditing
    ? contact
    : {
        firstName: "",
        lastName: "",
        company: "",
        title: "",
        email: "",
        phone: "",
        linkedin: "",
        notes: "",
        address: {},
      };

  const handleSubmit = async (values) => {
    const {
      firstName,
      lastName,
      email,
      company,
      title,
      linkedin,
      notes,
      phone,
    } = values;

    const payload = {
      opportunity_id: opportunityId || contact?.opportunityId,
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: email.trim(),
      phone: parsePhone(phone),
      company: company.trim(),
      title: title.trim(),
      linkedin: linkedin.trim(),
      notes: notes.trim(),
    };

    if (isEditing) {
      payload.contact_id = contact.contactId;
      dispatch(opportunityContactEdit(payload));
    } else {
      dispatch(opportunityContactCreate(payload));
    }
  };

  useEffect(() => {
    if (contactCreateSuccess || contactEditSuccess) {
      navigation.navigate(SCREENS.appStack.opportunityDetail, {
        opportunityId,
        opportunityName,
        screen: SCREENS.opportunityDetailTabs.contacts,
      });

      dispatch(
        snackbarAddMessageToQueue({
          message: isEditing ? "Contact saved" : "New contact added",
          type: SNACKBAR_TYPES.success,
        })
      );
    }
  }, [contactCreateSuccess, contactEditSuccess]);

  useEffect(() => {
    return () => {
      dispatch(opportunityContactCreateReset());
    };
  }, []);

  useEffect(() => {
    if (opportunityId && opportunityName) return;
    navigationRef.goBack();
    dispatch(
      opportunityContactCreateFail(
        "Unable to create contact due to no provided opportunityId or opportunityName"
      )
    );
  }, [opportunityId, opportunityName]);

  return (
    <SafeAreaView style={styles.container}>
      <TopBar
        titleLeftAligned
        iconLeft="back"
        title={`${isEditing ? "Edit" : "Add new"} contact`}
        headerRight={
          isEditing ? (
            <LeadTabTopBarRightIcon
              onPress={async () => {
                const { status } = await Contacts.requestPermissionsAsync();
                if (status === "granted") {
                  const phoneContact = mapLeadToContact(contact);
                  const response = await RNContacts.openContactForm(
                    phoneContact
                  );
                  if (response) {
                    dispatch(
                      snackbarAddMessageToQueue({
                        message: "Contact was exported successfully",
                      })
                    );
                  }
                } else {
                  dispatch(
                    snackbarAddMessageToQueue({
                      message: "Please enable contacts permissions",
                    })
                  );
                }
              }}
            />
          ) : null
        }
      />
      <View style={styles.innerContainer}>
        <CreateOrEditLeadForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          initialValues={initialValues}
          okText={isEditing ? "Save" : "Create contact"}
          hideCancelButton
        />
      </View>
    </SafeAreaView>
  );
};

export default CreateOrEditContact;
