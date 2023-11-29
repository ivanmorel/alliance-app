import React, {
  useEffect,
  // useState
} from "react";
import {
  FlatList,
  // Pressable,
  View,
} from "react-native";

import { useIsFocused } from "@react-navigation/native";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import {
  activityGlobalGet,
  opportunityGet,
  // opportunityUpdate,
} from "@actions";

import { navigate } from "@routes/navigator";
import { SCREENS } from "@routes/routes.constants";

import {
  // ConfirmationModal,
  Empty,
  ListItemCard,
} from "@components";

import { styles } from "./OpportunityContacts.style";

const OpportunityContacts = ({ setAddLeadModalVisible }) => {
  const dispatch = useDispatch();
  const { loading, currentOpportunity } = useSelector(
    (state) => state.opportunity
  );
  const { name, opportunityId, contacts } = currentOpportunity;
  const isFocused = useIsFocused();

  const fetchOpportunity = () => {
    if (loading) return;
    dispatch(activityGlobalGet());
    dispatch(opportunityGet({ opportunity_id: opportunityId }));
  };

  useEffect(() => {
    if (!isFocused) return;
    fetchOpportunity();
  }, [isFocused]);

  const handleOpportunityContactPressed = (contact) => {
    navigate(SCREENS.appStack.createOrEditContact, {
      opportunityId,
      opportunityName: name,
      contact,
    });
  };

  const renderContactListItem = ({ item }) => {
    return (
      <ListItemCard
        title={`${item.firstName} ${item.lastName}`}
        subtitle={`${item.title} - ${item.company}`}
        extraSubtitle={item.email}
        subtitleLines={2}
        onPress={() => handleOpportunityContactPressed(item)}
      />
    );
  };

  const renderEmptyStateComponent = () => {
    return (
      <Empty
        image={require("@assets/group-activities-empty.png")}
        title="Looks like there is no one in here..."
        actions={[
          {
            heading: "Start by adding contacts to this opportunity",
            text: "Add a contact",
            onPress: () => {
              setAddLeadModalVisible
                ? setAddLeadModalVisible()
                : navigate(SCREENS.appStack.createOrEditContact, {
                    opportunityId,
                    opportunityName: name,
                  });
            },
            disabled: loading,
          },
        ]}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        onRefresh={fetchOpportunity}
        refreshing={loading}
        renderItem={renderContactListItem}
        data={contacts}
        extraData={contacts?.length}
        keyExtractor={(item) => item.contactId}
        ListEmptyComponent={!loading && renderEmptyStateComponent()}
        contentContainerStyle={styles.listContainer}
      />
      {/* <ConfirmationModal
        titleIcon="trash-can"
        title="Remove contact"
        descriptionText="Are you sure you want to remove this contact?"
        descriptionBold={removeContact?.name}
        afterDescriptionText="?"
        visible={isRemoveModalVisible}
        okTitle="Remove"
        onCancel={() => setRemoveModalVisible(false)}
        okIcon="trash-can-outline"
        onOk={handleRemoveOpportunityContact}
      /> */}
    </View>
  );
};

OpportunityContacts.propTypes = {
  setAddLeadModalVisible: PropTypes.func,
};

export default OpportunityContacts;
