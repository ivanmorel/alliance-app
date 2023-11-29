import React, { useEffect } from "react";
import { FlatList } from "react-native";

import { useIsFocused } from "@react-navigation/native";
import { scale } from "react-native-size-matters";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import { useDispatch, useSelector } from "react-redux";
import {
  activityGlobalGet,
  activityGlobalRemove,
  opportunityList,
} from "@actions";

import { navigate } from "@routes/navigator";
import { SCREENS } from "@routes/routes.constants";

import { GROUP_CHAT_TYPES } from "@utils/constants";
import {
  getActivitiesIdFromOpportunityId,
  getTotalBadgeCountById,
} from "@utils/utils";

import {
  Empty,
  ListItemCard,
  MarkAsReadRightSwipe,
  SwipeableButtonWithDelete,
} from "@components";

import { styles } from "../Opportunities/Opportunities.style";

const OpportunityList = () => {
  const dispatch = useDispatch();
  const { loading, opportunities } = useSelector((state) => state.opportunity);
  const activities = useSelector((state) => state.activity.activities);
  const globalActivities = useSelector(
    (state) => state.activity.activities?.global
  );
  const userId = useSelector(({ user }) => user.userId);
  const isFocused = useIsFocused();

  const fetchOpportunities = () => {
    if (loading) return;
    dispatch(opportunityList());
    dispatch(activityGlobalGet());
  };

  useEffect(() => {
    if (!isFocused) return;
    fetchOpportunities();
  }, [isFocused]);

  const handleOpportunityPressed = ({ opportunityId, name }) => {
    navigate(SCREENS.appStack.roomList, {
      id: opportunityId,
      type: GROUP_CHAT_TYPES.opportunity,
      name,
    });
  };

  const handleMarkAsRead = async (opportunityId) => {
    const seenActivities = getActivitiesIdFromOpportunityId(
      opportunityId,
      globalActivities
    );

    const response = await dispatch(activityGlobalRemove(seenActivities));
    response && dispatch(activityGlobalGet());
  };

  const renderOpportunityItem = ({ item }) => {
    const badgeCount = getTotalBadgeCountById({
      activities: activities.messageActivities,
      opportunityId: item.opportunityId,
    });

    return (
      <SwipeableButtonWithDelete
        rightSwipeAction={() => (
          <MarkAsReadRightSwipe
            maskAsReadPressed={() => handleMarkAsRead(item.opportunityId)}
          />
        )}
        enabled={!!badgeCount}
      >
        <ListItemCard
          title={item.name}
          caption={`${item.contacts?.length} contact${
            item.contacts?.length > 1 ? "s" : ""
          }`}
          subtitle={`Created by ${item.createdByName}`}
          subtitleLines={2}
          onPress={() => handleOpportunityPressed(item)}
          badgeCount={badgeCount}
          titleIcon={
            item.createdBy === userId ? (
              <FontAwesome5
                name="crown"
                size={scale(12)}
                color="rgba(51, 51, 51, 0.9)"
                style={styles.moderatorIcon}
              />
            ) : null
          }
        />
      </SwipeableButtonWithDelete>
    );
  };

  const renderEmptyStateComponent = () => {
    return (
      <Empty
        image={require("@assets/opportunities-empty.png")}
        title="Looks like it is a bit quiet in here..."
        actions={[
          {
            heading: "Create an opportunity to help you close your deals",
            text: "Create an opportunity",
            onPress: () => navigate(SCREENS.appStack.createOpportunity),
            disabled: loading,
          },
        ]}
      />
    );
  };

  return (
    <FlatList
      onRefresh={fetchOpportunities}
      refreshing={loading}
      renderItem={renderOpportunityItem}
      data={opportunities}
      extraData={opportunities?.length}
      keyExtractor={(item) => item.opportunityId}
      ListEmptyComponent={!loading && renderEmptyStateComponent()}
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default OpportunityList;
