import {
  SUBMIT_FEEDBACK,
  SUBMIT_FEEDBACK_FAIL,
  SUBMIT_FEEDBACK_RESET,
  SUBMIT_FEEDBACK_SUCCESS,
} from "@constants";

import { bugsnagNotify } from "@services/bugsnag";

import { authorizedPost, feedbackURL } from "@utils/api";

export const feedbackSubmit = (payload) => {
  return async (dispatch) => {
    dispatch(submitFeedbackRequest());
    try {
      await authorizedPost(`${feedbackURL()}/submit`, payload);
      dispatch(submitFeedbackSuccess());
      return true;
    } catch (error) {
      bugsnagNotify(error);
      dispatch(
        submitFeedbackFail({
          error: true,
          message: error.response.data.message || "error",
        })
      );
      return false;
    }
  };
};

export const submitFeedbackRequest = (feedback) => {
  return {
    type: SUBMIT_FEEDBACK,
    payload: feedback,
  };
};

export const submitFeedbackSuccess = () => {
  return {
    type: SUBMIT_FEEDBACK_SUCCESS,
  };
};

export const submitFeedbackFail = (feedback) => {
  return {
    type: SUBMIT_FEEDBACK_FAIL,
    payload: feedback,
  };
};

export const feedbackSubmitReset = () => {
  return {
    type: SUBMIT_FEEDBACK_RESET,
  };
};
