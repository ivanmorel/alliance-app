import {
  BUSINESS_ADD_USER,
  BUSINESS_ADD_USER_FAIL,
  BUSINESS_ADD_USER_SUCCESS,
  BUSINESS_GET,
  BUSINESS_GET_FAIL,
  BUSINESS_GET_SUCCESS,
} from "@constants";

import { authorizedPost, businessUrl } from "@utils/api";

import { userRefreshToken, userSetLoginAction } from "./User";

export const businessGet = ({ businessId }) => {
  return async (dispatch) => {
    dispatch(businessGetRequest());

    try {
      const { data } = await authorizedPost(`${businessUrl()}/get`, {
        businessId,
      });

      dispatch(businessGetSuccess(data));
    } catch (error) {
      dispatch(
        businessGetFail({
          error: true,
          message: error.message,
        })
      );
    }
  };
};

const businessGetRequest = () => ({
  type: BUSINESS_GET,
});

const businessGetSuccess = (payload) => ({
  type: BUSINESS_GET_SUCCESS,
  payload,
});

const businessGetFail = (payload) => ({
  type: BUSINESS_GET_FAIL,
  payload,
});

export const businessAddUser = ({ role, businessId, email }) => {
  return async (dispatch) => {
    dispatch(businessAddUserRequest());

    try {
      const { data } = await authorizedPost(
        `${businessUrl()}/add_invited_user`,
        {
          role,
          businessId,
          email,
        }
      );

      dispatch(businessAddUserSuccess(data.business));
      dispatch(userSetLoginAction(null));
      await dispatch(userRefreshToken());

      return true;
    } catch (error) {
      dispatch(
        businessAddUserFail({
          error: true,
          message: error.message,
        })
      );
      return false;
    }
  };
};

const businessAddUserRequest = () => ({ type: BUSINESS_ADD_USER });

const businessAddUserSuccess = (payload) => ({
  type: BUSINESS_ADD_USER_SUCCESS,
  payload,
});

const businessAddUserFail = (payload) => ({
  type: BUSINESS_ADD_USER_FAIL,
  payload,
});
