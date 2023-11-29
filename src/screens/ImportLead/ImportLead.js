import React, { useState } from "react";
import { View } from "react-native";

import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useDispatch, useSelector } from "react-redux";
import { leadCreate, snackbarAddMessageToQueue } from "@actions";

import { navigate } from "@routes/navigator";
import { SCREENS } from "@routes/routes.constants";

import { SNACKBAR_TYPES } from "@utils/constants";
import { abbrState, parsePhone } from "@utils/utils";

import { CreateOrEditLeadForm, TopBar } from "@components";

import styles from "./ImportLead.style";

const ImportLead = () => {
  const { leads = [] } = useRoute().params;
  const groupId = useSelector((state) => state.group.selectedGroup.groupId);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleGoToNext = () => {
    if (currentIndex === leads.length - 1) {
      navigate(SCREENS.appStack.group);
    } else {
      setCurrentIndex((curr) => curr + 1);
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    const {
      address,
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
      group_id: groupId,
      lead: {
        lead_id: 20,
        first_name: firstName,
        last_name: lastName,
        email,
        phone: parsePhone(phone),
        company,
        title,
        linkedin,
        address: {
          street_one: address.home || "",
          street_two: address.street || "",
          postal: address.postal_code || 0,
          longitude: address.lng || 0.0,
          latitude: address.lat || 0.0,
          city: address.city || "",
          state_abbrv: abbrState(address.region, "abbr") || "",
          place_id: address.place_id || "",
        },
        notes,
      },
    };

    const response = await dispatch(leadCreate(payload));

    if (response) {
      handleGoToNext();
      dispatch(
        snackbarAddMessageToQueue({
          message: "New Lead added",
          type: SNACKBAR_TYPES.success,
        })
      );
    } else {
      snackbarAddMessageToQueue({
        message: "There was an error creating the lead",
        type: SNACKBAR_TYPES.error,
      });
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopBar iconLeft="back" title="Edit before importing" titleLeftAligned />
      <View style={styles.content}>
        <CreateOrEditLeadForm
          onSubmit={handleSubmit}
          initialValues={leads[currentIndex]}
          isLoading={isLoading}
          onCancel={handleGoToNext}
          okText={`Create contact ${
            leads.length > 1
              ? `(${leads.length - (currentIndex + 1)} left)`
              : ""
          }`}
          hideCancelButton={leads.length === 1}
        />
      </View>
    </SafeAreaView>
  );
};

export default ImportLead;
