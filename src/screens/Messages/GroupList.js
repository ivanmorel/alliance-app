import React, { useCallback, useState } from "react";
import { FlatList, View } from "react-native";

import { useFocusEffect } from "@react-navigation/native";
import PropTypes from "prop-types";
import { scale } from "react-native-size-matters/extend";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import { useDispatch, useSelector } from "react-redux";
import {
  activityGlobalGet,
  activityGroupRemove,
  groupListWithLeadInfo,
} from "@actions";

import { navigate } from "@routes/navigator";
import { SCREENS } from "@routes/routes.constants";

import { getTotalBadgeCountById } from "@utils/utils";

import {
  Empty,
  ListItemCard,
  MarkAsReadRightSwipe,
  SwipeableButtonWithDelete,
} from "@components";

import styles from "./GroupList.style";

const GroupList = ({ onPress, isMessageTab }) => {
  const [position, setCurrentPosition] = useState(1);
  const dispatch = useDispatch();
  const { groups, loading } = useSelector(({ group }) => group);
  const userId = useSelector(({ user }) => user.userId);
  const activities = useSelector((state) =>
    isMessageTab
      ? state.activity.activities.messageActivities
      : state.activity.activities.global
  );

  useFocusEffect(
    useCallback(() => {
      onRefresh();
    }, [])
  );

  const maskAsReadPressed = async ({ groupId }) => {
    const response = await dispatch(activityGroupRemove(groupId));
    response && dispatch(activityGlobalGet());
  };

  const loadMore = () => {
    if (groups.length < 10) {
      groupListWithLeadInfo();
    } else {
      dispatch(
        groupListWithLeadInfo({
          start_position: position.toString(),
          get_next: "10",
          paginated: position !== 1,
        })
      );
      setCurrentPosition((prevState) => prevState + 10);
    }
  };

  const onRefresh = () => {
    dispatch(activityGlobalGet());
    dispatch(
      groupListWithLeadInfo({
        start_position: 1,
        get_next: "10",
      })
    );

    setCurrentPosition(11);
  };

  const renderItem = ({ item }) => {
    const { name, users, groupId, allTimeLeads = 0, createdBy } = item;
    const isModerator = createdBy === userId;
    const badgeCount = getTotalBadgeCountById({
      activities,
      groupId,
    });

    return (
      <SwipeableButtonWithDelete
        rightSwipeAction={() => (
          <MarkAsReadRightSwipe
            maskAsReadPressed={() => maskAsReadPressed(item)}
          />
        )}
        enabled={!!badgeCount}
      >
        <ListItemCard
          title={name}
          titleIcon={
            isModerator ? (
              <FontAwesome5
                name="crown"
                size={scale(12)}
                color="rgba(51, 51, 51, 0.9)"
                style={styles.moderatorIcon}
              />
            ) : null
          }
          caption={`${allTimeLeads} Lead${allTimeLeads === 1 ? "" : "s"}`}
          subtitle={`${users.length} User${users.length > 1 ? "s" : ""}`}
          badgeCount={badgeCount}
          onPress={() => onPress({ name, groupId, isModerator })}
        />
      </SwipeableButtonWithDelete>
    );
  };

  const handleGoToGroupsPressed = () => {
    navigate(SCREENS.appStack.createGroup);
  };

  const renderEmptyStateComponent = () => (
    <Empty
      image={require("@assets/messages-group-empty.png")}
      title="Looks like it is a bit quiet in here..."
      actions={[
        {
          heading: "Create a group and invite users to get started",
          text: "Create a group",
          onPress: handleGoToGroupsPressed,
        },
      ]}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        onRefresh={onRefresh}
        refreshing={loading}
        data={groups}
        renderItem={renderItem}
        keyExtractor={(item) => item.groupId.toString()}
        onEndReached={loadMore}
        ListEmptyComponent={!loading ? renderEmptyStateComponent() : null}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

GroupList.propTypes = {
  onPress: PropTypes.func.isRequired,
  disableSwipe: PropTypes.bool,
  isMessageTab: PropTypes.bool,
};

export default GroupList;
