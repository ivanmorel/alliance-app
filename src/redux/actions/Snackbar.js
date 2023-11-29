import {
  SNACKBAR_ADD_MESSAGE_QUEUE,
  SNACKBAR_CLEAR_MESSAGE_QUEUE,
  SNACKBAR_SHOW_MESSAGE_SUCCESS,
} from "@constants";

import { SNACKBAR_TYPES } from "@utils/constants";

export const snackbarAddMessageToQueue = ({
  message,
  type = SNACKBAR_TYPES.info,
  duration = 1500,
  action,
  actionLabel,
}) => {
  return {
    type: SNACKBAR_ADD_MESSAGE_QUEUE,
    payload: {
      message,
      type,
      action,
      actionLabel,
      duration,
    },
  };
};

export const clearMessageQueue = () => {
  return {
    type: SNACKBAR_CLEAR_MESSAGE_QUEUE,
  };
};

export const showMessageSuccess = () => {
  return {
    type: SNACKBAR_SHOW_MESSAGE_SUCCESS,
  };
};
