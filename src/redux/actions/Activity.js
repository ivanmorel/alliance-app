import {
  notificationAppBadgeCountDecrement,
  notificationAppBadgeCountSet,
  setSelectedGroup,
} from "@actions";
import {
  ACTIVITY_GLOBAL_GET,
  ACTIVITY_GLOBAL_GET_FAIL,
  ACTIVITY_GLOBAL_GET_SUCCESS,
  ACTIVITY_GLOBAL_REMOVE,
  ACTIVITY_GLOBAL_REMOVE_FAIL,
  ACTIVITY_GLOBAL_REMOVE_SUCCESS,
  ACTIVITY_GROUP_GET,
  ACTIVITY_GROUP_GET_FAIL,
  ACTIVITY_GROUP_GET_SUCCESS,
  ACTIVITY_GROUP_REMOVE,
  ACTIVITY_GROUP_REMOVE_FAIL,
  ACTIVITY_GROUP_REMOVE_SUCCESS,
  ACTIVITY_TYPES,
  globalActivitiesCountTypes,
} from "@constants";

import { bugsnagNotify } from "@services/bugsnag";

import { navigate, navigationRef } from "@routes/navigator";
import { SCREENS } from "@routes/routes.constants";

import { activityURL, authorizedPost } from "@utils/api";
import { GROUP_CHAT_TYPES } from "@utils/constants";
import { getCountByActivityType } from "@utils/utils";

// GLOBAL GET
export const activityGlobalGet = (activitTypes = ["ALL_TYPES"]) => {
  return async (dispatch) => {
    try {
      dispatch(activityGetRequest());
      const { data } = await authorizedPost(`${activityURL()}/global`, {
        activity_types: activitTypes,
      });
      const globalActivitiesCount = getCountByActivityType(
        data?.globalActivities?.counts,
        globalActivitiesCountTypes
      );
      dispatch(notificationAppBadgeCountSet(globalActivitiesCount));
      dispatch(activityGetSuccess(data?.globalActivities));
    } catch (error) {
      bugsnagNotify(error);
      dispatch(
        activityGetFail({
          error: true,
          message: error?.message || "Error fetching global activity data",
        })
      );
    }
  };
};

export const activityGetRequest = (payload) => {
  return {
    type: ACTIVITY_GLOBAL_GET,
    payload: payload,
  };
};

export const activityGetSuccess = (data) => {
  return {
    type: ACTIVITY_GLOBAL_GET_SUCCESS,
    payload: data,
  };
};

export const activityGetFail = (err) => {
  return {
    type: ACTIVITY_GLOBAL_GET_FAIL,
    payload: err,
  };
};

// GLOBAL REMOVE
export const activityGlobalRemove = (seenActivities) => {
  return async (dispatch) => {
    try {
      if (seenActivities.length === 0) return;

      dispatch(activityGlobalRemoveRequest(seenActivities));
      const { data } = await authorizedPost(`${activityURL()}/remove_ids`, {
        seenActivities,
      });
      dispatch(activityGlobalRemoveSuccess(data));
      dispatch(notificationAppBadgeCountDecrement(seenActivities?.length));
      return true;
    } catch (error) {
      bugsnagNotify(error);
      dispatch(
        activityGlobalRemoveFail({
          error: true,
          message: error?.message || "Error removing global activity data",
        })
      );
      return false;
    }
  };
};

export const activityGlobalRemoveRequest = (payload) => {
  return {
    type: ACTIVITY_GLOBAL_REMOVE,
    payload: payload,
  };
};

export const activityGlobalRemoveSuccess = (data) => {
  return {
    type: ACTIVITY_GLOBAL_REMOVE_SUCCESS,
    payload: data,
  };
};

export const activityGlobalRemoveFail = (err) => {
  return {
    type: ACTIVITY_GLOBAL_REMOVE_FAIL,
    payload: err,
  };
};

// GROUP GET
export const activityGroupGet = (groupId, activitTypes = ["ALL_TYPES"]) => {
  return async (dispatch) => {
    try {
      dispatch(activityGroupGetRequest());
      const { data } = await authorizedPost(`${activityURL()}/group`, {
        groupId,
        activity_types: activitTypes,
      });
      dispatch(
        activityGroupGetSuccess({ groupId, data: data?.groupActivities })
      );
      dispatch(activityGlobalGet());
    } catch (error) {
      bugsnagNotify(error);
      dispatch(
        activityGroupGetFail({
          error: true,
          message: error?.message || "Error fetching group activity data",
        })
      );
    }
  };
};

export const activityGroupGetRequest = (payload) => {
  return {
    type: ACTIVITY_GROUP_GET,
    payload: payload,
  };
};

export const activityGroupGetSuccess = (payload) => {
  return {
    type: ACTIVITY_GROUP_GET_SUCCESS,
    payload,
  };
};

export const activityGroupGetFail = (err) => {
  return {
    type: ACTIVITY_GROUP_GET_FAIL,
    payload: err,
  };
};

// GROUP REMOVE
export const activityGroupRemove = (groupId) => {
  return async (dispatch) => {
    try {
      dispatch(activityGroupRemoveRequest());
      const { data } = await authorizedPost(`${activityURL()}/remove_group`, {
        groupId,
      });
      dispatch(activityGroupRemoveSuccess(data));
      return true;
    } catch (error) {
      bugsnagNotify(error);
      dispatch(
        activityGroupRemoveFail({
          error: true,
          message: error?.message || "Error removing group activity",
        })
      );
      return false;
    }
  };
};

export const activityGroupRemoveRequest = (payload) => {
  return {
    type: ACTIVITY_GROUP_REMOVE,
    payload: payload,
  };
};

export const activityGroupRemoveSuccess = (data) => {
  return {
    type: ACTIVITY_GROUP_REMOVE_SUCCESS,
    payload: data,
  };
};

export const activityGroupRemoveFail = (err) => {
  return {
    type: ACTIVITY_GROUP_REMOVE_FAIL,
    payload: err,
  };
};

export const showActivity = ({
  type,
  data,
  route,
  navigationParams,
  preScreen,
  groupActivities,
}) => {
  return async (dispatch) => {
    if (groupActivities && navigationParams?.screen) {
      navigate(navigationParams.screen);
      return;
    }
    let params = {};
    let currentParams = navigationRef.getCurrentRoute().params;
    let isAlreadyAtRoute = route === navigationRef.getCurrentRoute().name;
    let bypassNavigation = false;

    switch (type) {
      case ACTIVITY_TYPES.GROUP_NEW_LEAD: {
        const {
          leadName,
          groupId,
          groupName,
          activityId: leadId,
        } = data?.leadNew || data;
        dispatch(setSelectedGroup({ groupId }));
        navigate(SCREENS.appStack.groups);
        navigate(SCREENS.appStack.group, {
          groupId,
          groupName,
          screen: SCREENS.groupTabs.leads,
        });

        // this case will also navigate via `route` below using these params
        params = {
          groupId,
          leadId,
          leadName,
          isLeadNew: true,
        };
        break;
      }

      case ACTIVITY_TYPES.CHAT_NEW_LEAD_MESSAGE: {
        const {
          groupingLevelName: leadName,
          groupId,
          groupName,
          groupingLevelId: leadId,
        } = data?.chatLeadMessage || data;
        dispatch(setSelectedGroup({ groupId }));
        navigate(SCREENS.appStack.groups);
        navigate(SCREENS.appStack.group, {
          groupId,
          groupName,
          screen: SCREENS.groupTabs.leads,
        });

        // this case will also navigate via `route` below using these params
        params = {
          groupId,
          leadId,
          leadName,
          screen: SCREENS.leadDetailTabs.comments,
        };
        break;
      }

      case ACTIVITY_TYPES.GROUP_NEW_INVITE: {
        const { groupId, groupName } = data?.groupInvite || data;
        dispatch(setSelectedGroup({ groupId }));
        params.name = groupName;
        break;
      }

      case ACTIVITY_TYPES.GROUP_NEW_USER: {
        const { groupId, groupName } = data?.groupNewUser || data;
        dispatch(setSelectedGroup({ groupId }));
        params.name = groupName;
        break;
      }

      case ACTIVITY_TYPES.GROUP_NEW_USER_ADDED: {
        const { groupId, groupName } = data?.groupNewUserAdded || data;
        dispatch(setSelectedGroup({ groupId }));
        params.name = groupName;
        break;
      }

      case ACTIVITY_TYPES.OPPORTUNITY_NEW_USER: {
        const { opportunityId, opportunityName } =
          data?.opportunityNewUser || data;
        params = {
          ...navigationParams,
          opportunityId,
          opportunityName,
        };
        break;
      }

      case ACTIVITY_TYPES.OPPORTUNITY_NEW_USER_ADDED: {
        const { opportunityId, opportunityName } =
          data?.opportunityNewUserAdded || data;
        params = {
          ...navigationParams,
          opportunityId,
          opportunityName,
        };
        break;
      }

      case ACTIVITY_TYPES.CHAT_NEW_BUSINESS_MESSAGE: {
        const { roomId, groupingLevelId } = data;
        // Prevent navigation steps if we're already in the chat room
        if (isAlreadyAtRoute && currentParams?.roomId === parseInt(roomId)) {
          bypassNavigation = true;
          return;
        }

        navigate(SCREENS.appStack.messages, {
          screen: SCREENS.messagesTabs.businesses,
        });

        // this case will also navigate via `route` below using these params
        params = {
          roomId,
          groupingLevelId,
        };
        break;
      }
      case ACTIVITY_TYPES.CHAT_NEW_USER_MESSAGE: {
        const { roomId, groupingLevelId } = data;
        // Prevent navigation steps if we're already in the chat room
        if (isAlreadyAtRoute && currentParams?.roomId === parseInt(roomId)) {
          bypassNavigation = true;
          return;
        }

        navigate(SCREENS.appStack.messages, {
          screen: SCREENS.messagesTabs.businesses,
        });

        // this case will also navigate via `route` below using these params
        params = {
          roomId,
          groupingLevelId,
        };
        break;
      }

      case ACTIVITY_TYPES.CHAT_NEW_GROUP_MESSAGE:
      case ACTIVITY_TYPES.CHAT_NEW_OPPORTUNITY_MESSAGE: {
        const { roomId, groupingLevelId } = data;
        if (
          isAlreadyAtRoute &&
          currentParams?.roomId &&
          currentParams?.roomId === parseInt(roomId)
        ) {
          bypassNavigation = true;
          return;
        }
        const chatType = getChatTypeFromNotification(type);
        const screen =
          chatType === GROUP_CHAT_TYPES.group
            ? SCREENS.messagesTabs.groups
            : SCREENS.messagesTabs.opportunities;
        navigate(SCREENS.appStack.messages, {
          screen,
        });
        navigate(SCREENS.appStack.roomList, {
          id: groupingLevelId,
          type: chatType,
        });

        params = {
          roomId,
        };
        break;
      }
    }

    if (bypassNavigation) return;

    if (preScreen) navigate(preScreen);
    if (route) navigate(route, params);
  };
};

const getChatTypeFromNotification = (notificationType) => {
  switch (notificationType) {
    case ACTIVITY_TYPES.CHAT_NEW_USER_MESSAGE:
      return GROUP_CHAT_TYPES.user;
    case ACTIVITY_TYPES.CHAT_NEW_GROUP_MESSAGE:
      return GROUP_CHAT_TYPES.group;
    case ACTIVITY_TYPES.CHAT_NEW_OPPORTUNITY_MESSAGE:
      return GROUP_CHAT_TYPES.opportunity;
    case ACTIVITY_TYPES.CHAT_NEW_BUSINESS_MESSAGE:
      return GROUP_CHAT_TYPES.business;
    default:
      return null;
  }
};
