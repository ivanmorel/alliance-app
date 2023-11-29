import React, { useEffect } from "react";
import { View } from "react-native";

import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useDispatch, useSelector } from "react-redux";
import {
  leadCreate,
  leadCreateReset,
  snackbarAddMessageToQueue,
} from "@actions";

import { navigate } from "@routes/navigator";
import { SCREENS } from "@routes/routes.constants";

import { SNACKBAR_TYPES } from "@utils/constants";
import { abbrState, parsePhone } from "@utils/utils";

import { CreateOrEditLeadForm, TopBar } from "@components";

import styles from "./CreateLead.style";

const CreateLead = () => {
  const dispatch = useDispatch();
  const { createLoading: isLoading, createSuccess } = useSelector(
    ({ lead }) => lead
  );
  const route = useRoute();
  const { groupId, groupName } = route.params;

  const handleSubmit = async (values) => {
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

    dispatch(leadCreate(payload));
  };

  useEffect(() => {
    if (createSuccess) {
      navigate(SCREENS.appStack.group, {
        groupId,
        groupName,
        screen: SCREENS.groupTabs.leads,
      });
      dispatch(
        snackbarAddMessageToQueue({
          message: "New Lead added",
          type: SNACKBAR_TYPES.success,
        })
      );
    }
  }, [createSuccess, groupId, groupName]);

  useEffect(() => {
    return () => {
      dispatch(leadCreateReset());
    };
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <TopBar titleLeftAligned iconLeft="back" title="Add New Lead" />
      <View style={styles.content}>
        <CreateOrEditLeadForm
          isLoading={isLoading}
          onSubmit={handleSubmit}
          hideCancelButton
        />
      </View>
    </SafeAreaView>
  );
};

export default CreateLead;
