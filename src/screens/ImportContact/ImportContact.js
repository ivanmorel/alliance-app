import React, { useState } from "react";
import { View } from "react-native";

import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useDispatch } from "react-redux";
import { opportunityContactCreate, snackbarAddMessageToQueue } from "@actions";

import { navigate } from "@routes/navigator";
import { SCREENS } from "@routes/routes.constants";

import { SNACKBAR_TYPES } from "@utils/constants";
import { parsePhone } from "@utils/utils";

import { CreateOrEditLeadForm, TopBar } from "@components";

import styles from "../ImportLead/ImportLead.style";

const ImportContact = () => {
  const { contacts = [], opportunityId } = useRoute().params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleGoToNext = () => {
    if (currentIndex === contacts.length - 1) {
      navigate(SCREENS.appStack.opportunityDetail);
    } else {
      setCurrentIndex((curr) => curr + 1);
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
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
      opportunity_id: opportunityId,
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: email.trim(),
      phone: parsePhone(phone),
      company: company.trim(),
      title: title.trim(),
      linkedin: linkedin.trim(),
      notes: notes.trim(),
    };

    const response = await dispatch(opportunityContactCreate(payload));

    if (response) {
      handleGoToNext();
      dispatch(
        snackbarAddMessageToQueue({
          message: "New contact added",
          type: SNACKBAR_TYPES.success,
        })
      );
    } else {
      snackbarAddMessageToQueue({
        message: "There was an error creating the contact",
        type: SNACKBAR_TYPES.error,
      });
    }

    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopBar iconLeft="back" title="Edit before asd" titleLeftAligned />
      <View style={styles.content}>
        <CreateOrEditLeadForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          okText={`Create contact ${
            contacts.length > 1
              ? `(${contacts.length - (currentIndex + 1)} left)`
              : ""
          }`}
          hideCancelButton={contacts.length === 1}
          initialValues={contacts[currentIndex]}
          onCancel={handleGoToNext}
        />
      </View>
    </SafeAreaView>
  );
};

export default ImportContact;
