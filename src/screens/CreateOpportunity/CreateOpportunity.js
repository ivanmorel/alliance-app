import React, { useRef, useState } from "react";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

import { useDispatch, useSelector } from "react-redux";
import { opportunityCreate, opportunityCreateForm } from "@actions";

import { navigate } from "@routes/navigator";
import { SCREENS } from "@routes/routes.constants";

import { abbrState } from "@utils/utils";

import { CreateOrEditOpportunityForm, TopBar } from "@components";

import styles from "./CreateOpportunity.style";

const CreateOpportunity = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { createForm, createLoading } = useSelector(
    ({ opportunity }) => opportunity
  );
  const scrollViewRef = useRef(null);
  const isLoading = createLoading || loading;

  const handleSubmitForm = async (values) => {
    setLoading(true);
    const { name, notes, address } = values;
    const transformedValues = {
      name: name.trim(),
      notes: notes.trim(),
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
    };
    dispatch(opportunityCreateForm(transformedValues));
    dispatch(opportunityCreate({ ...createForm, ...transformedValues }));

    setLoading(false);
  };

  const handleCancel = () => {
    navigate(SCREENS.appStack.opportunities);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopBar titleLeftAligned iconLeft="back" title="Create an opportunity" />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollView}
        keyboardShouldPersistTaps="always"
        extraScrollHeight={80}
        extraHeight={120}
        innerRef={(ref) => (scrollViewRef.current = ref)}
      >
        <CreateOrEditOpportunityForm
          isLoading={isLoading}
          onSubmit={handleSubmitForm}
          onCancel={handleCancel}
          submitButtonText="Create"
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default CreateOpportunity;
