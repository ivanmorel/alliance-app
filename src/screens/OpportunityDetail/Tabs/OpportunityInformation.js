import React, { useEffect, useRef, useState } from "react";
import { Pressable, View } from "react-native";

import { useIsFocused } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Caption, Text } from "react-native-paper";
import { scale } from "react-native-size-matters/extend";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useDispatch, useSelector } from "react-redux";
import {
  activityGlobalGet,
  opportunityConvertLeadReset,
  opportunityGet,
  opportunityShareLink,
  opportunityUpdate,
  opportunityUpdateReset,
  resetDeleteLead,
  snackbarAddMessageToQueue,
} from "@actions";

import { getUser } from "@services/UserService";

import { SNACKBAR_TYPES } from "@utils/constants";
import { abbrState, getAddressFromGoogleObject } from "@utils/utils";

import {
  Button,
  CreateOrEditOpportunityForm,
  ListItemCard,
  Loader,
} from "@components";

import { SUBTITLE_GRAY_COLOR } from "@styles/styleConstants";

import styles from "./OpportunityInformation.style";

const OpportunityInformation = () => {
  const dispatch = useDispatch();
  const userId = useSelector(({ user }) => user.userId);
  const {
    currentOpportunity,
    error,
    updateLoading,
    updateSuccess,
    convertLeadSuccess,
  } = useSelector(({ opportunity }) => opportunity);
  const {
    opportunityId,
    createdBy,
    name,
    address,
    notes,
    users: opportunityUsers,
  } = currentOpportunity;
  const isModerator = createdBy === userId;
  const [isEditing, setIsEditing] = useState(false);
  const [users, setUsers] = useState([]);
  const [isUserListExpanded, setUserListExpanded] = useState(false);
  const isFocused = useIsFocused();
  const scrollViewRef = useRef(null);

  useEffect(() => {
    if (isFocused) {
      dispatch(activityGlobalGet());
    } else {
      // Reset the form when navigating away from the screen
      dispatch(opportunityUpdateReset());
    }
  }, [isFocused]);

  useEffect(() => {
    if (opportunityUsers?.length) {
      setUsers([]);
      opportunityUsers.forEach((oUser) => {
        if (oUser?.userId === createdBy) return;
        return getUser(oUser.userId).then((user) =>
          setUsers((users) => [...users, user])
        );
      });
    }
  }, [opportunityUsers]);

  useEffect(() => {
    if (!convertLeadSuccess) return;
    setIsEditing(true);
    dispatch(opportunityConvertLeadReset());
  }, [convertLeadSuccess]);

  useEffect(() => {
    if (error) {
      dispatch(
        snackbarAddMessageToQueue({
          message: error,
          type: SNACKBAR_TYPES.error,
        })
      );
      dispatch(resetDeleteLead());
    }
  }, [error]);

  useEffect(() => {
    if (!updateLoading && updateSuccess) {
      dispatch(opportunityGet({ opportunity_id: opportunityId }));
      dispatch(opportunityUpdateReset());
      setIsEditing(false);
    }
  }, [updateLoading, updateSuccess]);

  const handleEditPressed = () => {
    setIsEditing(true);
  };

  const handleToggleSharedWithList = () => {
    setUserListExpanded(!isUserListExpanded);
  };

  const handleSharePressed = () => {
    dispatch(
      opportunityShareLink({
        opportunityId,
        opportunityName: name,
      })
    );
  };

  const handleEditOpportunitySubmission = (values) => {
    // The address object will be different depending on if the initial value
    // remains the same or if the user changes it. This is a bit hacky for now
    // and later we'll want to make this uniform, but ignoring for now and
    // simply handling both cases.
    const {
      // Values when the address is updated
      home,
      street,
      postal_code,
      lng,
      lat,
      region,
      place_id,

      // Values when address is not changed
      streetOne,
      streetTwo,
      postal,
      longitude,
      latitude,
      stateAbbrv,
      placeId,

      // Values for both cases
      city,
    } = values.address || {};

    dispatch(
      opportunityUpdate({
        opportunityId,
        name: values.name.trim(),
        notes: values.notes.trim(),
        address: {
          street_one: home || streetOne || "",
          street_two: street || streetTwo || "",
          postal: postal_code || postal || 0,
          longitude: lng || longitude || 0.0,
          latitude: lat || latitude || 0.0,
          city: city || "",
          state_abbrv:
            stateAbbrv || (region && abbrState(region, "abbr")) || "",
          place_id: place_id || placeId || "",
        },
      })
    );
  };

  if (!currentOpportunity || !Object.keys(currentOpportunity).length) {
    return <Loader containerStyle={styles.loader} />;
  }

  return (
    <React.Fragment>
      <KeyboardAwareScrollView
        style={styles.scrollViewContainer}
        contentContainerStyle={styles.scrollViewContentContainer}
        keyboardShouldPersistTaps="always"
        extraScrollHeight={80}
        extraHeight={180}
        innerRef={(ref) => (scrollViewRef.current = ref)}
        enableOnAndroid
      >
        {isEditing ? (
          <CreateOrEditOpportunityForm
            initialValues={currentOpportunity}
            isLoading={updateLoading}
            onCancel={() => setIsEditing(false)}
            onSubmit={handleEditOpportunitySubmission}
            submitButtonText="Save"
          />
        ) : (
          <>
            <View style={styles.notesContainer}>
              <Caption>Description</Caption>
              <Text style={styles.text}>{notes}</Text>
            </View>
            <View style={styles.notesContainer}>
              <Caption>Location</Caption>
              <Text style={styles.text}>
                {getAddressFromGoogleObject(address)}
              </Text>
            </View>
          </>
        )}
        {isModerator && !isEditing ? (
          <Button
            color="primary"
            icon="message-text"
            onPress={handleEditPressed}
            text="Edit Opportunity"
            buttonStyle={styles.editButton}
          />
        ) : null}
        {isModerator ? (
          <>
            <View style={styles.sharedWithContainer}>
              {users?.length ? (
                <Pressable
                  onPress={handleToggleSharedWithList}
                  style={styles.sharedWithTextContainer}
                >
                  <Text>Shared with ({users?.length})</Text>
                  <MaterialCommunityIcons
                    name={isUserListExpanded ? "chevron-up" : "chevron-down"}
                    size={scale(24)}
                    style={styles.expandIcon}
                    color={SUBTITLE_GRAY_COLOR}
                  />
                </Pressable>
              ) : null}
              <Button
                dense
                color="primary"
                icon="share-variant"
                onPress={handleSharePressed}
                text="Share"
              />
            </View>
            {isUserListExpanded ? (
              <View style={styles.listItemContainer}>
                {users?.map((user) => (
                  <ListItemCard
                    title={`${user?.firstName} ${user?.lastName}`}
                    subtitle={user?.email || user?.phone || user?.linkedIn}
                    key={user?.userId}
                    avatarText={`${user?.firstName[0]}${user?.lastName[0]}`}
                  />
                ))}
              </View>
            ) : null}
          </>
        ) : null}
      </KeyboardAwareScrollView>
    </React.Fragment>
  );
};

export default OpportunityInformation;
