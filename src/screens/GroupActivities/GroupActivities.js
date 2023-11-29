import React, { useCallback } from "react";

import { useFocusEffect } from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux";
import { activityGroupGet, groupShareInviteLink } from "@actions";
import { groupActivitiesBadgeCountTypes } from "@constants";

import { navigate } from "@routes/navigator";
import { SCREENS } from "@routes/routes.constants";

import { useSectionActivities } from "@hooks";

import { ActivitiesList, Empty } from "@components";

const GroupActivities = () => {
  const dispatch = useDispatch();
  const { activities, loading } = useSelector(({ activity }) => activity);
  const userId = useSelector(({ user }) => user.userId);
  const {
    loading: groupLoading,
    inviteLoading,
    selectedGroup,
  } = useSelector(({ group }) => group);
  const { name: groupName, groupId, createdBy, users } = selectedGroup;
  // Adding a check for moderator and users to conditionally render the empty
  // state of the list component (see figma designs for various empty states)
  const isModerator = userId === createdBy;
  const hasUsers = users?.length > 1;
  const groupActivities = activities[`group-${groupId}`] || [];
  const filteredActivities = groupActivities.filter(({ type }) =>
    groupActivitiesBadgeCountTypes.includes(type)
  );

  const sectionedActivities = useSectionActivities(filteredActivities);

  const onRefresh = () => {
    if (groupId) dispatch(activityGroupGet(groupId));
  };

  useFocusEffect(
    useCallback(() => {
      onRefresh();
    }, [])
  );

  const inviteUserPressed = () => {
    dispatch(groupShareInviteLink({ groupName, groupId }));
  };

  const createLeadPressed = () => {
    navigate(SCREENS.appStack.createLead, { groupName, groupId });
  };

  const renderEmptyStateComponent = () => {
    let actions = [];
    let image = require("@assets/activities-empty.png");
    let title = "No activities yet";

    if (!hasUsers && isModerator) {
      image = require("@assets/group-activities-empty.png");
      title = "Looks like there is no one in here...";
      actions.push(
        {
          heading: "Start by inviting someone to your group",
          text: "Send an invite",
          onPress: inviteUserPressed,
          disabled: inviteLoading,
          icon: "email",
        },
        {
          heading: "Or adding a new lead",
          text: "Create a lead",
          onPress: createLeadPressed,
          icon: "account-plus",
        }
      );
    }

    return <Empty image={image} title={title} actions={actions} />;
  };

  return (
    <ActivitiesList
      loading={loading || groupLoading}
      loadMore={() => {}}
      onRefresh={onRefresh}
      activities={sectionedActivities}
      emptyStateComponent={renderEmptyStateComponent()}
      sections
      groupActivities
    />
  );
};

export default GroupActivities;
