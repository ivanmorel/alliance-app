import {
  HIDE_CREATE_GROUP_MODAL,
  HIDE_HELP_DIALOG,
  HIDE_JOIN_GROUP_DIALOG,
  HIDE_PAYMENT_DIALOG,
  SHOW_CREATE_GROUP_MODAL,
  SHOW_FEEDBACK_DIALOG,
  SHOW_HELP_DIALOG,
  SHOW_JOIN_GROUP_DIALOG,
  SHOW_PAYMENT_DIALOG,
} from "@constants";

export const showCreateGroupModal = (payload) => {
  return (dispatch) => {
    dispatch({
      type: SHOW_CREATE_GROUP_MODAL,
      payload: payload,
    });
  };
};

export const hideCreateGroupModal = () => {
  return (dispatch) => {
    dispatch({
      type: HIDE_CREATE_GROUP_MODAL,
    });
  };
};

export const showJoinGroupDialog = (payload) => {
  return (dispatch) => {
    dispatch({
      type: SHOW_JOIN_GROUP_DIALOG,
      payload: payload,
    });
  };
};

export const hideJoinGroupDialog = () => {
  return (dispatch) => {
    dispatch({
      type: HIDE_JOIN_GROUP_DIALOG,
    });
  };
};

export const showFeedbackDialog = (payload) => {
  return (dispatch) => {
    dispatch({
      type: SHOW_FEEDBACK_DIALOG,
      payload: payload,
    });
  };
};

export const showPaymentDialog = (payload) => {
  return (dispatch) => {
    dispatch({
      type: SHOW_PAYMENT_DIALOG,
      payload: payload,
    });
  };
};

export const hidePaymentDialog = () => {
  return (dispatch) => {
    dispatch({
      type: HIDE_PAYMENT_DIALOG,
    });
  };
};

export const hideHelpDialog = () => {
  return (dispatch) => {
    dispatch({
      type: HIDE_HELP_DIALOG,
    });
  };
};

export const showHelpDialog = () => {
  return (dispatch) => {
    dispatch({
      type: SHOW_HELP_DIALOG,
    });
  };
};
