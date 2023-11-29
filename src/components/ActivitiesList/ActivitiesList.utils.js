import React from "react";

import { scale } from "react-native-size-matters/extend";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { ACTIVITY_TYPES } from "@constants";

import { SCREENS } from "@routes/routes.constants";

import { PRIMARY_LIGHT_COLOR, WARNING_COLOR } from "@styles/styleConstants";

import styles from "./ActivitiesList.style";

export const getActivityConfigByType = (type) => {
  switch (type) {
    case ACTIVITY_TYPES.GROUP_NEW_LEAD:
      return {
        iconName: "person",
        color: PRIMARY_LIGHT_COLOR,
        route: SCREENS.appStack.leadDetail,
      };
    case ACTIVITY_TYPES.CHAT_NEW_LEAD_MESSAGE:
      return {
        id: 1,
        iconName: "comment",
        color: PRIMARY_LIGHT_COLOR,
        route: SCREENS.appStack.leadDetail,
      };
    case ACTIVITY_TYPES.GROUP_NEW_INVITE:
      return {
        iconName: "people-alt",
        color: PRIMARY_LIGHT_COLOR,
        route: SCREENS.appStack.groups,
      };
    case ACTIVITY_TYPES.GROUP_REMOVED:
      return {
        iconName: "error",
        color: WARNING_COLOR,
        route: SCREENS.appStack.groups,
      };
    case ACTIVITY_TYPES.GROUP_CANCELLED:
      return {
        iconName: "error",
        color: WARNING_COLOR,
        route: SCREENS.appStack.groups,
      };
    case ACTIVITY_TYPES.GROUP_DELETED:
      return {
        iconName: "error",
        color: WARNING_COLOR,
        route: SCREENS.appStack.groups,
      };
    case ACTIVITY_TYPES.GROUP_NEW_USER_ADDED:
    case ACTIVITY_TYPES.GROUP_NEW_USER:
      return {
        iconName: "people-alt",
        color: PRIMARY_LIGHT_COLOR,
        route: SCREENS.appStack.group,
        navigationParams: { screen: SCREENS.groupTabs.users },
        preScreen: SCREENS.appStack.groups,
      };
    case ACTIVITY_TYPES.OPPORTUNITY_NEW_USER_ADDED:
    case ACTIVITY_TYPES.OPPORTUNITY_NEW_USER:
      return {
        iconName: "people-alt",
        color: PRIMARY_LIGHT_COLOR,
        route: SCREENS.appStack.opportunityDetail,
        navigationParams: { screen: SCREENS.opportunityDetailTabs.information },
        preScreen: SCREENS.appStack.opportunities,
      };
    case ACTIVITY_TYPES.CHAT_NEW_GROUP_MESSAGE:
      return {
        navigationParams: { screen: SCREENS.messagesTabs.groups },
        route: SCREENS.appStack.chat,
      };
    case ACTIVITY_TYPES.CHAT_NEW_USER_MESSAGE:
      return {
        navigationParams: { screen: SCREENS.messagesTabs.users },
        route: SCREENS.appStack.chat,
      };
    case ACTIVITY_TYPES.CHAT_NEW_OPPORTUNITY_MESSAGE:
      return {
        navigationParams: { screen: SCREENS.messagesTabs.opportunities },
        route: SCREENS.appStack.chat,
      };
    case ACTIVITY_TYPES.CHAT_NEW_BUSINESS_MESSAGE:
      return {
        navigationParams: { screen: SCREENS.messagesTabs.businesses },
        route: SCREENS.appStack.chat,
      };
    //TODO add business notifications once we consult with BE
    default:
      return {};
  }
};

export const getActivityTextByType = (type, data) => {
  if (!type || !data) return null;

  if (type === ACTIVITY_TYPES.GROUP_NEW_LEAD && data.leadNew) {
    return [data?.leadNew?.groupName, "New lead added to group"];
  }

  if (type === ACTIVITY_TYPES.CHAT_NEW_LEAD_MESSAGE && data.chatLeadMessage) {
    return [
      data?.chatLeadMessage?.groupName,
      `New lead comment at ${data?.chatLeadMessage?.leadName}`,
    ];
  }

  if (
    type === ACTIVITY_TYPES.CHAT_NEW_OPPORTUNITY_MESSAGE &&
    data.chatOpportunityMessage
  ) {
    return [
      data?.chatOpportunityMessage?.opportunityName,
      `New chat message from ${data?.chatOpportunityMessage?.userName}`,
    ];
  }

  // Deprecated? We use invite links now (no invitee data)
  if (type === ACTIVITY_TYPES.GROUP_NEW_INVITE && data.groupInvite) {
    return [data?.groupInvite?.invitedByName, "invited you to a group"];
  }

  if (type === ACTIVITY_TYPES.GROUP_CANCELLED && data.groupCancel) {
    return [data?.groupCancel?.groupName, "This group will be cancelled soon"];
  }

  if (type === ACTIVITY_TYPES.GROUP_DELETED && data.groupDelete) {
    return [data?.groupDelete?.groupName, "This group no longer exists"];
  }

  if (type === ACTIVITY_TYPES.GROUP_REMOVED && data.groupRemove) {
    return [
      data?.groupRemove?.groupName,
      "You have been removed from this group",
    ];
  }

  if (type === ACTIVITY_TYPES.GROUP_NEW_USER && data.groupNewUser) {
    return [
      data?.groupNewUser?.groupName,
      `${data?.groupNewUser?.newUserName} has joined this group`,
    ];
  }

  if (type === ACTIVITY_TYPES.GROUP_NEW_USER_ADDED && data.groupNewUserAdded) {
    return [
      data?.groupNewUserAdded?.groupName,
      `${data?.groupNewUserAdded?.newUserName} has been added this group`,
    ];
  }

  if (type === ACTIVITY_TYPES.OPPORTUNITY_NEW_USER && data.opportunityNewUser) {
    return [
      data?.opportunityNewUser?.opportunityName,
      `${data?.opportunityNewUser?.userName} has joined this opportunity`,
    ];
  }

  if (
    type === ACTIVITY_TYPES.OPPORTUNITY_NEW_USER_ADDED &&
    data.opportunityNewUserAdded
  ) {
    return [
      data?.opportunityNewUserAdded?.opportunityName,
      `${data?.opportunityNewUserAdded?.userName} has been added to this opportunity`,
    ];
  }

  return [];
};

export const getDateStr = (date) => {
  let result = date;
  if (date && date.length > 0 && !Date.parse(date)) {
    const dateSplit = date.split(" ");
    result = `${dateSplit[0]}T${dateSplit[1]}`;
  }
  return result;
};

export const getDate = (dateStr) => {
  return new Date(getDateStr(dateStr));
};

export const getIcon = ({ iconName, color }) => {
  return (
    <MaterialIcons
      name={iconName}
      size={scale(24)}
      color={color}
      style={styles.iconStyle}
    />
  );
};

export const isCancel = ({ type }) => {
  if (type === ACTIVITY_TYPES.GROUP_CANCELLED) {
    return styles.cancelStyle;
  }
};

export const handleGroupActivityTitle = (type, isGroupActivity) => {
  if (!isGroupActivity) return null;

  switch (type) {
    case ACTIVITY_TYPES.GROUP_NEW_LEAD:
      return "New Lead";
    case ACTIVITY_TYPES.GROUP_NEW_USER:
      return "New User";
    case ACTIVITY_TYPES.CHAT_NEW_GROUP_MESSAGE:
      return "New Message";
    case ACTIVITY_TYPES.CHAT_NEW_LEAD_MESSAGE:
      return "New Lead Comment";
  }

  return null;
};
