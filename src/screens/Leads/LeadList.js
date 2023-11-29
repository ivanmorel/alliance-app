import React from "react";
import { FlatList, Image, View } from "react-native";

import PropTypes from "prop-types";
import { TextMask } from "react-native-masked-text";

import { useSelector } from "react-redux";
import { ACTIVITY_TYPES } from "@constants";

import { navigate } from "@routes/navigator";
import { SCREENS } from "@routes/routes.constants";

import { getAddressFromGoogleObject } from "@utils/utils";

import {
  DeleteLeadModal,
  Empty,
  ListItemCard,
  RightSwipeAction,
  SwipeableButtonWithDelete,
} from "@components";

import opportunitiesIcon from "@assets/opportunities-icon.png";

import styles from "./LeadList.style";

const LeadList = ({
  leads,
  onRefresh = () => {},
  loading = false,
  onPress = () => {},
  loadMore = () => {},
  setAddLeadModalVisible,
  isSwipeEnabled,
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedLeadId, setSelectedLeadId] = React.useState(null);
  const { name: groupName, groupId: selectedGroupId } = useSelector(
    ({ group }) => group.selectedGroup
  );
  const groupActivities = useSelector(
    (state) => state.activity.activities?.[`group-${selectedGroupId}`]
  );

  const renderLeadItem = ({ item }) => {
    const { firstName, lastName, address, phone, leadId, hasOpportunity } =
      item;
    const isLeadNew = groupActivities?.some(
      (activity) =>
        activity?.type === ACTIVITY_TYPES.GROUP_NEW_LEAD &&
        activity?.data?.leadNew?.activityId === leadId
    );
    const badgeCount =
      groupActivities?.filter(
        (activity) =>
          activity?.type === ACTIVITY_TYPES.CHAT_NEW_LEAD_MESSAGE &&
          activity?.data?.chatLeadMessage?.leadId === leadId
      )?.length || 0;

    const removeLeadPressed = () => {
      setSelectedLeadId(leadId);
      setModalVisible(true);
    };

    return (
      <SwipeableButtonWithDelete
        rightSwipeAction={() => (
          <RightSwipeAction text="Remove Lead" onPress={removeLeadPressed} />
        )}
        enabled={isSwipeEnabled}
      >
        <ListItemCard
          title={`${firstName} ${lastName}`}
          subtitle={address?.city ? getAddressFromGoogleObject(address) : null}
          caption={
            <TextMask
              type={"custom"}
              options={{
                mask: "+* (***) ***-****",
              }}
              value={phone}
            />
          }
          onPress={() => onPress({ leadId, firstName, lastName, isLeadNew })}
          isNew={isLeadNew}
          badgeCount={badgeCount}
          icon={
            hasOpportunity ? (
              <Image
                source={opportunitiesIcon}
                style={styles.opportunitiesIcon}
              />
            ) : null
          }
        />
      </SwipeableButtonWithDelete>
    );
  };

  const createLeadPressed = () => {
    setAddLeadModalVisible
      ? setAddLeadModalVisible()
      : navigate(SCREENS.appStack.createLead, {
          groupName,
          groupId: selectedGroupId,
        });
  };

  const renderEmptyStateComponent = () => {
    const actions = [
      {
        heading: "Start by adding a lead to your group.",
        text: "Create a lead",
        onPress: createLeadPressed,
        icon: "account-plus",
      },
    ];

    return (
      <Empty
        image={require("@assets/group-leads-empty.png")}
        title="Looks like there is no one in here..."
        actions={actions}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        onRefresh={onRefresh}
        refreshing={loading}
        data={leads}
        renderItem={renderLeadItem}
        keyExtractor={(item) => item.leadId.toString()}
        onEndReached={loadMore}
        ListEmptyComponent={!loading ? renderEmptyStateComponent() : null}
        contentContainerStyle={styles.listContainer}
      />
      <DeleteLeadModal
        visible={modalVisible}
        leadId={selectedLeadId}
        hideModal={() => setModalVisible(false)}
      />
    </View>
  );
};

export default LeadList;

LeadList.propTypes = {
  leads: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  onPress: PropTypes.func,
  onRefresh: PropTypes.func,
  loadMore: PropTypes.func,
  isSwipeEnabled: PropTypes.bool,
  setAddLeadModalVisible: PropTypes.func,
};
