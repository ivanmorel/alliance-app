import {
  NOTIFICATION_APP_ICON_BADGE_COUNT_DECREMENT_SUCCESS,
  NOTIFICATION_APP_ICON_BADGE_COUNT_INCREMENT_SUCCESS,
  NOTIFICATION_APP_ICON_BADGE_COUNT_RESET_SUCCESS,
  NOTIFICATION_GET_PUSH_TOKEN_SUCCESS,
  NOTIFICATION_INTERACTION_RECEIVED,
} from "@constants";

const notificationInitialState = {
  expoPushToken: null,
  appIconBadgeCount: 0,
  lastNotificationInteractionId: null,
};

export default (state = notificationInitialState, action) => {
  switch (action.type) {
    case NOTIFICATION_GET_PUSH_TOKEN_SUCCESS: {
      return {
        ...state,
        expoPushToken: action.payload,
      };
    }

    case NOTIFICATION_APP_ICON_BADGE_COUNT_INCREMENT_SUCCESS:
      return {
        ...state,
        appIconBadgeCount: action.payload,
      };

    case NOTIFICATION_APP_ICON_BADGE_COUNT_DECREMENT_SUCCESS: {
      if (state.appIconBadgeCount <= 0) return state;

      return {
        ...state,
        appIconBadgeCount: action.payload,
      };
    }

    case NOTIFICATION_APP_ICON_BADGE_COUNT_RESET_SUCCESS: {
      return {
        ...state,
        appIconBadgeCount: 0,
      };
    }

    case NOTIFICATION_INTERACTION_RECEIVED: {
      return {
        ...state,
        lastNotificationInteractionId: action.payload?.request?.identifier,
      };
    }

    default:
      return state;
  }
};
