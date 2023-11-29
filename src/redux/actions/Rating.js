import {
  RATING_ADD_QUALITY,
  RATING_ADD_QUALITY_FAIL,
  RATING_ADD_QUALITY_SUCCESS,
  RATING_ADD_RELEVANCY,
  RATING_ADD_RELEVANCY_FAIL,
  RATING_ADD_RELEVANCY_SUCCESS,
  RATING_GET_QUALITY,
  RATING_GET_QUALITY_FAIL,
  RATING_GET_QUALITY_SUCCESS,
} from "@constants";

import { bugsnagNotify } from "@services/bugsnag";

import { authorizedPost, ratingURL } from "@utils/api";

/*
GET QUALITY
*/

export const ratingGetQuality = (payload) => {
  return (dispatch) => {
    dispatch(ratingGetQualityRequest());
    authorizedPost(`${ratingURL()}/quality/get`, payload)
      .then((response) => {
        dispatch(ratingGetQualitySuccess(response.data));
      })
      .catch((error) => {
        bugsnagNotify(error);
        dispatch(
          ratingGetQualityFail({
            error: true,
            message: error.response.data.message || "error",
          })
        );
      });
  };
};

export const ratingGetQualityRequest = () => {
  return {
    type: RATING_GET_QUALITY,
  };
};

export const ratingGetQualitySuccess = (payload) => {
  return {
    type: RATING_GET_QUALITY_SUCCESS,
    payload: payload,
  };
};

export const ratingGetQualityFail = (err) => {
  return {
    type: RATING_GET_QUALITY_FAIL,
    payload: err,
  };
};

/*
ADD QUALITY
*/

export const ratingAddQuality = (payload) => {
  return (dispatch) => {
    dispatch(ratingAddQualityRequest());
    authorizedPost(`${ratingURL()}/quality/rate`, payload)
      .then((response) => {
        dispatch(ratingAddQualitySuccess(response.data));
      })
      .catch((error) => {
        bugsnagNotify(error);
        dispatch(
          ratingAddQualityFail({
            error: true,
            message: error.response.data.message || "error",
          })
        );
      });
  };
};

export const ratingAddQualityRequest = () => {
  return {
    type: RATING_ADD_QUALITY,
  };
};

export const ratingAddQualitySuccess = (payload) => {
  return {
    type: RATING_ADD_QUALITY_SUCCESS,
    payload: payload,
  };
};

export const ratingAddQualityFail = (err) => {
  return {
    type: RATING_ADD_QUALITY_FAIL,
    payload: err,
  };
};

/*
ADD RELEVANCY
*/

export const ratingAddRelevancy = (payload) => {
  return (dispatch) => {
    dispatch(ratingAddRelevancyRequest());
    authorizedPost(`${ratingURL()}/relevancy/rate`, payload)
      .then((response) => {
        dispatch(ratingAddRelevancySuccess(response.data));
      })
      .catch((error) => {
        bugsnagNotify(error);
        dispatch(
          ratingAddRelevancyFail({
            error: true,
            message: error.response.data.message || "error",
          })
        );
      });
  };
};

export const ratingAddRelevancyRequest = () => {
  return {
    type: RATING_ADD_RELEVANCY,
  };
};

export const ratingAddRelevancySuccess = (payload) => {
  return {
    type: RATING_ADD_RELEVANCY_SUCCESS,
    payload: payload,
  };
};

export const ratingAddRelevancyFail = (err) => {
  return {
    type: RATING_ADD_RELEVANCY_FAIL,
    payload: err,
  };
};
