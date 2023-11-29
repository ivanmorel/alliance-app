import { Platform } from "react-native";

import { isDevice } from "expo-device";
import {
  AndroidImportance,
  getExpoPushTokenAsync,
  getPermissionsAsync,
  requestPermissionsAsync,
  scheduleNotificationAsync,
  setBadgeCountAsync,
  setNotificationChannelAsync,
  setNotificationHandler,
} from "expo-notifications";
import * as TaskManager from "expo-task-manager";

import {
  activityGlobalGet,
  activityGroupGet,
  showActivity,
  userAddDevice,
} from "@actions";
import {
  NOTIFICATION_APP_ICON_BADGE_COUNT_DECREMENT,
  NOTIFICATION_APP_ICON_BADGE_COUNT_DECREMENT_ERROR,
  NOTIFICATION_APP_ICON_BADGE_COUNT_DECREMENT_SUCCESS,
  NOTIFICATION_APP_ICON_BADGE_COUNT_INCREMENT,
  NOTIFICATION_APP_ICON_BADGE_COUNT_INCREMENT_ERROR,
  NOTIFICATION_APP_ICON_BADGE_COUNT_INCREMENT_SUCCESS,
  NOTIFICATION_APP_ICON_BADGE_COUNT_RESET,
  NOTIFICATION_APP_ICON_BADGE_COUNT_RESET_ERROR,
  NOTIFICATION_APP_ICON_BADGE_COUNT_RESET_SUCCESS,
  NOTIFICATION_APP_ICON_BADGE_COUNT_SET,
  NOTIFICATION_APP_ICON_BADGE_COUNT_SET_ERROR,
  NOTIFICATION_APP_ICON_BADGE_COUNT_SET_SUCCESS,
  NOTIFICATION_BACKGROUND_TASK,
  NOTIFICATION_GET_PUSH_TOKEN_ERROR,
  NOTIFICATION_GET_PUSH_TOKEN_REQUEST,
  NOTIFICATION_GET_PUSH_TOKEN_SUCCESS,
  NOTIFICATION_GET_SETTINGS_ERROR,
  NOTIFICATION_GET_SETTINGS_REQUEST,
  NOTIFICATION_GET_SETTINGS_SUCCESS,
  NOTIFICATION_INTERACTION_RECEIVED,
  NOTIFICATION_RECEIVED,
  NOTIFICATION_SEND_PUSH_ERROR,
  NOTIFICATION_SEND_PUSH_REQUEST,
  NOTIFICATION_SEND_PUSH_SUCCESS,
  NOTIFICATION_SET_HANDLER,
  NOTIFICATION_SET_HANDLER_ERROR,
  NOTIFICATION_SET_HANDLER_SUCCESS,
  NOTIFICATION_TOGGLE_SETTINGS_ERROR,
  NOTIFICATION_TOGGLE_SETTINGS_REQUEST,
  NOTIFICATION_TOGGLE_SETTINGS_SUCCESS,
} from "@constants";

import { bugsnagNotify } from "@services/bugsnag";

import { authorizedPost, notificationURL } from "@utils/api";

import { getActivityConfigByType } from "@components/ActivitiesList/ActivitiesList.utils";

import { store } from "../store";

//
// BACKGROUND TASK
//
TaskManager.defineTask(
  NOTIFICATION_BACKGROUND_TASK,
  ({ data, error, executionInfo }) => {
    store.dispatch(
      notificationBackgroundListener({ data, error, executionInfo })
    );
  }
);

//
// HANDLE BACKGROUND TASK EVENT
//
export const notificationBackgroundListener = ({
  data,
  error,
  executionInfo,
}) => {
  return async (dispatch) => {
    dispatch(notificationAppBadgeCountIncrement(1));
    dispatch(activityGlobalGet());

    dispatch({
      type: NOTIFICATION_BACKGROUND_TASK,
      payload: { data, error, executionInfo },
    });
  };
};

//
// INITIALIZE NOTIFICATION HANDLER
//
export const notificationInitialize = () => {
  return async (dispatch) => {
    try {
      dispatch(notificationInitializeDispatched());

      // Handles notifications when app is in foreground
      setNotificationHandler({
        handleNotification: async () => {
          return {
            shouldShowAlert: false,
            shouldPlaySound: false,
            shouldSetBadge: true,
          };
        },
      });

      // TODO: Handle notifications when app is in background

      dispatch(notificationInitializeSuccess());
      dispatch(notificationGetPushToken());
    } catch (error) {
      bugsnagNotify(error);
      dispatch(
        notificationInitializeError(
          error?.message || "Failed to set notification handler"
        )
      );
    }
  };
};

export const notificationInitializeDispatched = () => {
  return {
    type: NOTIFICATION_SET_HANDLER,
  };
};

export const notificationInitializeSuccess = () => {
  return {
    type: NOTIFICATION_SET_HANDLER_SUCCESS,
  };
};

export const notificationInitializeError = (payload) => {
  return {
    type: NOTIFICATION_SET_HANDLER_ERROR,
    payload,
  };
};

//
// GET PUSH TOKEN
//
export const notificationGetPushToken = () => {
  return async (dispatch) => {
    try {
      dispatch(notificationGetPushTokenRequest());
      if (isDevice) {
        const { status: existingStatus } = await getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await requestPermissionsAsync({
            ios: {
              allowAlert: true,
              allowBadge: true,
              allowSound: true,
              allowAnnouncements: true,
              allowCriticalAlerts: true,
            },
          });
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          throw new Error("Failed to get push token for push notification!");
        }
        const { data: token } = await getExpoPushTokenAsync();
        if (Platform.OS === "android") {
          setNotificationChannelAsync("default", {
            name: "default",
            importance: AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
          });
        }

        dispatch(notificationGetPushTokenSuccess(token));
        dispatch(userAddDevice(token));

        // TODO: Add notification settings UI to Manage Settings screen
        // For now, we'll get all settings (for redux debugging in bugsnag
        // errors) and then toggle on all types of notifications for the user
        dispatch(notificationGetSettings());
        dispatch(notificationToggleSettings());
      } else {
        throw new Error("Must use physical device for Push Notifications");
      }
    } catch (error) {
      bugsnagNotify(error);
      dispatch(
        notificationGetPushTokenError(error?.message || "Unknown error")
      );
    }
  };
};

export const notificationGetPushTokenRequest = () => {
  return {
    type: NOTIFICATION_GET_PUSH_TOKEN_REQUEST,
  };
};

export const notificationGetPushTokenSuccess = (payload) => {
  return {
    type: NOTIFICATION_GET_PUSH_TOKEN_SUCCESS,
    payload,
  };
};

export const notificationGetPushTokenError = (payload) => {
  return {
    type: NOTIFICATION_GET_PUSH_TOKEN_ERROR,
    payload,
  };
};

//
// GET NOTIFICATION SETTINGS
//
export const notificationGetSettings = () => {
  return async (dispatch) => {
    try {
      dispatch(notificationGetSettingsRequest());
      const { data } = await authorizedPost(
        `${notificationURL()}/settings/get`
      );
      dispatch(notificationGetSettingsSuccess(data));
    } catch (error) {
      bugsnagNotify(error);
      dispatch(
        notificationGetSettingsFail({
          error: true,
          message: error?.message || "Error getting notification settings",
        })
      );
    }
  };
};

export const notificationGetSettingsRequest = (payload) => {
  return {
    type: NOTIFICATION_GET_SETTINGS_REQUEST,
    payload: payload,
  };
};

export const notificationGetSettingsSuccess = (user) => {
  return {
    type: NOTIFICATION_GET_SETTINGS_SUCCESS,
    payload: user,
  };
};

export const notificationGetSettingsFail = (err) => {
  return {
    type: NOTIFICATION_GET_SETTINGS_ERROR,
    payload: err,
  };
};

//
// TOGGLE NOTIFICATION SETTINGS
//
export const notificationToggleSettings = () => {
  return async (dispatch) => {
    try {
      dispatch(notificationToggleSettingsRequest());
      const { data } = await authorizedPost(
        `${notificationURL()}/settings/toggle`,
        {
          service: "SERVICE_ALL",
          delivery_method: "DELIVERY_ALL",
          action: "ACTION_ALL",
          toggled_on: true,
        }
      );
      dispatch(notificationToggleSettingsSuccess(data));
    } catch (error) {
      bugsnagNotify(error);
      dispatch(
        notificationToggleSettingsFail({
          error: true,
          message: error?.message || "Error toggling notification settings",
        })
      );
    }
  };
};

export const notificationToggleSettingsRequest = (payload) => {
  return {
    type: NOTIFICATION_TOGGLE_SETTINGS_REQUEST,
    payload: payload,
  };
};

export const notificationToggleSettingsSuccess = (user) => {
  return {
    type: NOTIFICATION_TOGGLE_SETTINGS_SUCCESS,
    payload: user,
  };
};

export const notificationToggleSettingsFail = (err) => {
  return {
    type: NOTIFICATION_TOGGLE_SETTINGS_ERROR,
    payload: err,
  };
};

//
// SEND PUSH NOTIFICATION (FOR TESTING/DEBUGGING)
//
export const notificationSendPush = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(notificationSendPushRequest());

      // To test the client implementation only, use debug=true:
      const debug = false;

      if (!debug) {
        const expoPushToken = getState()?.notification?.expoPushToken;
        if (!expoPushToken) throw new Error("No Expo push token exists");
        const message = {
          to: expoPushToken,
          sound: "default",
          title: "Alliance",
          body: "This is a push notification from Expo notification servers, not a local test!",
          data: { testData: "some test data" },
        };
        const response = await fetch("https://exp.host/--/api/v2/push/send", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Accept-encoding": "gzip, deflate",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(message),
        });
        dispatch(notificationSendPushSuccess(response));
      } else {
        const localNotification = {
          content: {
            title: "Local notification test",
            body: "This is a local push notification test",
            sound: true,
            vibrate: true,
          },
          trigger: null,
        };
        await scheduleNotificationAsync(localNotification);
        dispatch(notificationSendPushSuccess(localNotification));
      }
      dispatch(notificationAppBadgeCountIncrement());
    } catch (error) {
      bugsnagNotify(error);
      dispatch(
        notificationSendPushError(
          error?.message || "Error sending push notification"
        )
      );
    }
  };
};

export const notificationSendPushRequest = () => {
  return {
    type: NOTIFICATION_SEND_PUSH_REQUEST,
  };
};

export const notificationSendPushSuccess = (payload) => {
  return {
    type: NOTIFICATION_SEND_PUSH_SUCCESS,
    payload,
  };
};

export const notificationSendPushError = (payload) => {
  return {
    type: NOTIFICATION_SEND_PUSH_ERROR,
    payload,
  };
};

//
// NOTIFICATION RECEIVED (foreground)
//
export const notificationReceived = (payload) => {
  return async (dispatch, getState) => {
    dispatch({
      type: NOTIFICATION_RECEIVED,
      payload,
    });

    // fetch latest group activities (if user is viewing a group)
    const groupId = getState()?.group?.selectedGroup?.groupId;
    if (groupId) dispatch(activityGroupGet(groupId));

    // fetch global activities
    dispatch(activityGlobalGet());
  };
};

//
// "INTERACTION" NOTIFICATION SETTINGS (user tapped a notificaiton)
//
export const notificationInteractionReceived = ({ notification }) => {
  return async (dispatch) => {
    try {
      dispatch(notificationInteractionReceivedDispatched(notification));
      const data = notification?.request?.content?.data;
      if (!data) {
        throw new Error(
          "Unable to handle notification tap due to `data` failure"
        );
      }

      const type = data?.type;
      const activityConfig = getActivityConfigByType(type);
      const { route, navigationParams, preScreen } = activityConfig || {};
      dispatch(
        showActivity({
          type,
          data,
          route,
          navigationParams,
          preScreen,
        })
      );
      return true;
    } catch (error) {
      dispatch(notificationInteractionReceivedError(error?.message));
      return false;
    }
  };
};

export const notificationInteractionReceivedDispatched = (payload) => {
  return {
    type: NOTIFICATION_INTERACTION_RECEIVED,
    payload,
  };
};

export const notificationInteractionReceivedError = (payload) => {
  return {
    type: "NOTIFICATION_INTERACTION_RECEIVED_ERROR",
    payload,
  };
};

//
// SET BADGE COUNT FOR APP ICON
//
export const notificationAppBadgeCountSet = (number) => {
  return async (dispatch) => {
    try {
      dispatch(notificationAppBadgeCountSetDispatched(number));
      await setBadgeCountAsync(number);
      dispatch(notificationAppBadgeCountSetSuccess(number));
    } catch (error) {
      bugsnagNotify(error);
      dispatch(
        notificationAppBadgeCountSetError(
          error?.message || "Error setting badge count"
        )
      );
    }
  };
};

export const notificationAppBadgeCountSetDispatched = (payload) => {
  return {
    type: NOTIFICATION_APP_ICON_BADGE_COUNT_SET,
    payload,
  };
};

export const notificationAppBadgeCountSetSuccess = (payload) => {
  return {
    type: NOTIFICATION_APP_ICON_BADGE_COUNT_SET_SUCCESS,
    payload,
  };
};

export const notificationAppBadgeCountSetError = (payload) => {
  return {
    type: NOTIFICATION_APP_ICON_BADGE_COUNT_SET_ERROR,
    payload,
  };
};

//
// INCREMENT BADGE COUNT FOR APP ICON
//
export const notificationAppBadgeCountIncrement = (incrementByNumber = 1) => {
  return async (dispatch, getState) => {
    try {
      dispatch(notificationAppBadgeCountIncrementDispatched(incrementByNumber));
      const currentBadgeCount = getState().notification.appIconBadgeCount;
      const updatedBadgeCount = currentBadgeCount + incrementByNumber;
      await setBadgeCountAsync(updatedBadgeCount);
      dispatch(notificationAppBadgeCountIncrementSuccess(updatedBadgeCount));
    } catch (error) {
      bugsnagNotify(error);
      dispatch(
        notificationAppBadgeCountIncrementError(
          error?.message || "Error incrementing badge count"
        )
      );
    }
  };
};

export const notificationAppBadgeCountIncrementDispatched = (payload) => {
  return {
    type: NOTIFICATION_APP_ICON_BADGE_COUNT_INCREMENT,
    payload,
  };
};

export const notificationAppBadgeCountIncrementSuccess = (payload) => {
  return {
    type: NOTIFICATION_APP_ICON_BADGE_COUNT_INCREMENT_SUCCESS,
    payload,
  };
};

export const notificationAppBadgeCountIncrementError = (payload) => {
  return {
    type: NOTIFICATION_APP_ICON_BADGE_COUNT_INCREMENT_ERROR,
    payload,
  };
};

//
// DECREMENT BADGE COUNT FOR APP ICON
//
export const notificationAppBadgeCountDecrement = (decrementByNumber = 1) => {
  return async (dispatch, getState) => {
    try {
      dispatch(notificationAppBadgeCountDecrementDispatched(decrementByNumber));
      const currentBadgeCount = getState().notification.appIconBadgeCount;
      const updatedBadgeCount =
        currentBadgeCount > 0 ? currentBadgeCount - decrementByNumber : 0;
      await setBadgeCountAsync(updatedBadgeCount);
      dispatch(notificationAppBadgeCountDecrementSuccess(updatedBadgeCount));
    } catch (error) {
      bugsnagNotify(error);
      dispatch(
        notificationAppBadgeCountDecrementError(
          error?.message || "Error decrementing badge count"
        )
      );
    }
  };
};

export const notificationAppBadgeCountDecrementDispatched = (payload) => {
  return {
    type: NOTIFICATION_APP_ICON_BADGE_COUNT_DECREMENT,
    payload,
  };
};

export const notificationAppBadgeCountDecrementSuccess = (payload) => {
  return {
    type: NOTIFICATION_APP_ICON_BADGE_COUNT_DECREMENT_SUCCESS,
    payload,
  };
};

export const notificationAppBadgeCountDecrementError = (payload) => {
  return {
    type: NOTIFICATION_APP_ICON_BADGE_COUNT_DECREMENT_ERROR,
    payload,
  };
};

//
// RESET BADGE COUNT FOR APP ICON
//
export const notificationAppBadgeCountReset = () => {
  return async (dispatch) => {
    try {
      dispatch(notificationAppBadgeCountResetDispatched());
      await setBadgeCountAsync(0);
      dispatch(notificationAppBadgeCountResetSuccess());
    } catch (error) {
      bugsnagNotify(error);
      dispatch(
        notificationAppBadgeCountResetError(
          error?.message || "Error resetting badge count"
        )
      );
    }
  };
};

export const notificationAppBadgeCountResetDispatched = () => {
  return {
    type: NOTIFICATION_APP_ICON_BADGE_COUNT_RESET,
  };
};

export const notificationAppBadgeCountResetSuccess = () => {
  return {
    type: NOTIFICATION_APP_ICON_BADGE_COUNT_RESET_SUCCESS,
  };
};

export const notificationAppBadgeCountResetError = (payload) => {
  return {
    type: NOTIFICATION_APP_ICON_BADGE_COUNT_RESET_ERROR,
    payload,
  };
};
