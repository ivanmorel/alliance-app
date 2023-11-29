import { Platform } from "react-native";

import { ANDROID_OAUTH_WEB_CLIENT_ID } from "@env";

import appleAuth from "@invertase/react-native-apple-authentication";
import CookieManager from "@react-native-cookies/cookies";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import axios from "axios";

import { chatGetStreamDisconnect } from "@actions/Chat";
import {
  RESET_APP_STATE,
  USER_ADD_DEVICE,
  USER_ADD_DEVICE_FAIL,
  USER_ADD_DEVICE_SUCCESS,
  USER_APPLE_LOGIN,
  USER_APPLE_LOGIN_CANCELLED,
  USER_APPLE_LOGIN_FAIL,
  USER_APPLE_LOGIN_SUCCESS,
  USER_DELETE_ACCOUNT,
  USER_DELETE_ACCOUNT_FAIL,
  USER_DELETE_ACCOUNT_SUCCESS,
  USER_DELETE_DEVICE,
  USER_DELETE_DEVICE_FAIL,
  USER_DELETE_DEVICE_SUCCESS,
  USER_FETCH_LIST,
  USER_FETCH_LIST_FAIL,
  USER_FETCH_LIST_SUCCESS,
  USER_GET,
  USER_GET_FAIL,
  USER_GET_LOGIN_METHODS,
  USER_GET_LOGIN_METHODS_FAIL,
  USER_GET_LOGIN_METHODS_RESET,
  USER_GET_LOGIN_METHODS_SUCCESS,
  USER_GET_SUCCESS,
  USER_GOOGLE_LOGIN,
  USER_GOOGLE_LOGIN_CANCELLED,
  USER_GOOGLE_LOGIN_FAIL,
  USER_GOOGLE_LOGIN_SUCCESS,
  USER_GOOGLE_LOGOUT,
  USER_GOOGLE_LOGOUT_FAIL,
  USER_GOOGLE_LOGOUT_SUCCESS,
  USER_LINKEDIN_LOGIN,
  USER_LINKEDIN_LOGIN_FAIL,
  USER_LINKEDIN_LOGIN_SUCCESS,
  USER_LINKEDIN_LOGIN_URL,
  USER_LINKEDIN_LOGIN_URL_FAIL,
  USER_LINKEDIN_LOGIN_URL_RESET,
  USER_LINKEDIN_LOGIN_URL_SUCCESS,
  USER_LOGIN,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REFRESH_TOKEN_FAIL,
  USER_REFRESH_TOKEN_SUCCESS,
  USER_RESET_PASSWORD,
  USER_RESET_PASSWORD_CONFIRMATION,
  USER_RESET_PASSWORD_CONFIRMATION_FAIL,
  USER_RESET_PASSWORD_CONFIRMATION_SUCCESS,
  USER_RESET_PASSWORD_FAIL,
  USER_RESET_PASSWORD_STATUS_RESET,
  USER_RESET_PASSWORD_SUCCESS,
  USER_SET_LOGIN_ACTION,
  USER_SIGNUP,
  USER_SIGNUP_CONFIRMATION,
  USER_SIGNUP_CONFIRMATION_FAIL,
  USER_SIGNUP_CONFIRMATION_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_SUCCESS,
  USER_UPDATE,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
  USER_UPDATE_SUCCESS,
} from "@constants";

import { bugsnagNotify } from "@services/bugsnag";

import { authorizedPost, axiosClient, userURL } from "@utils/api";
import {
  getAuthUser,
  resetAuthStorage,
  saveAuthUser,
} from "@utils/AsyncStorageUtils";
import { appErrors } from "@utils/constants";
import { isIOS } from "@utils/utils";

import { persistor } from "../store";

//
// GENERATE LINKEDIN LOGIN URL
//
export const userLinkedinLoginURL = (payload) => {
  return async (dispatch) => {
    dispatch(userLinkedinLoginURLRequest());
    try {
      const response = await axios.post(`${userURL()}/linkedin_url`, payload);
      dispatch(userLinkedinLoginURLSuccess(response.data));
    } catch (error) {
      bugsnagNotify(error);
      dispatch(
        userLinkedinLoginURLFail({
          error: true,
          message: error?.message || "error",
        })
      );
    }
  };
};

export const userLinkedinLoginURLRequest = (payload) => {
  return {
    type: USER_LINKEDIN_LOGIN_URL,
    payload: payload,
  };
};

export const userLinkedinLoginURLSuccess = (payload) => {
  return {
    type: USER_LINKEDIN_LOGIN_URL_SUCCESS,
    payload: payload,
  };
};

export const userLinkedinLoginURLFail = (payload) => {
  return {
    type: USER_LINKEDIN_LOGIN_URL_FAIL,
    payload: payload,
  };
};

export const userLinkedinLoginURLReset = () => {
  return {
    type: USER_LINKEDIN_LOGIN_URL_RESET,
  };
};

//
// EMAIL/PASS LOGIN
//
export const userLogin = (payload) => {
  return async (dispatch) => {
    dispatch(userLoginRequest());
    try {
      const response = await axios.post(`${userURL()}/login`, payload);
      await saveAuthUser(response.data);
      dispatch(userLoginSuccess(response.data));
      dispatch(userGet({ user_id: response.data?.userId }));
    } catch (error) {
      if (error?.response?.data?.code === 6) {
        dispatch(getLoginMethods({ email: payload.email }));
      } else {
        let message = appErrors.signIn.generalError;
        if (error?.response?.data?.code in appErrors.signIn) {
          message = appErrors.signIn[error?.response?.data?.code];
        }

        bugsnagNotify(error);
        dispatch(userLoginFail({ error, message }));
      }
    }
  };
};

export const getLoginMethods = (payload) => {
  return async (dispatch) => {
    dispatch(userGetLoginMethods());
    try {
      const { data } = await axios.post(
        `${userURL()}/get_login_methods`,
        payload
      );

      dispatch(userGetLoginMethodsSuccess(data));
    } catch (error) {
      bugsnagNotify(error);
      userGetLoginMethodsFail({ error: true, message: error?.message });
    }
  };
};

const userGetLoginMethods = () => {
  return {
    type: USER_GET_LOGIN_METHODS,
  };
};

const userGetLoginMethodsSuccess = (payload) => {
  return {
    type: USER_GET_LOGIN_METHODS_SUCCESS,
    payload: payload,
  };
};

const userGetLoginMethodsFail = (payload) => {
  return {
    type: USER_GET_LOGIN_METHODS_FAIL,
    payload: payload,
  };
};

export const userLoginMethodsReset = () => {
  return {
    type: USER_GET_LOGIN_METHODS_RESET,
  };
};

export const userLoginRequest = (payload) => {
  return {
    type: USER_LOGIN,
    payload: payload,
  };
};

export const userLoginSuccess = (payload) => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: payload,
  };
};

export const userLoginFail = (payload) => {
  return {
    type: USER_LOGIN_FAIL,
    payload: payload,
  };
};

//
// LINKEDIN LOGIN
//
export const userLinkedinLogin = ({ code, state, ...rest }) => {
  return async (dispatch) => {
    dispatch(userLinkedinLoginRequest({ code, state, ...rest }));
    try {
      const response = await axios.post(`${userURL()}/linkedin_signup`, {
        code,
        state,
      });
      await saveAuthUser(response.data);
      dispatch(userLinkedinLoginSuccess(response.data));
      dispatch(userGet({ user_id: response.data?.userId }));
    } catch (error) {
      let message = error.response?.data?.message;
      if (message === "account deletion in progress") {
        message = appErrors.signIn.accountDeletionInProgress;
      } else {
        message = appErrors.signIn.generalError;
      }

      bugsnagNotify(error);
      dispatch(
        userLinkedinLoginFail({
          error: true,
          message,
        })
      );
      // Clear WebView cookies to prevent cookies auto logging in each time the
      // LinkedIn button is pressed (allows changing info if needed)
      await CookieManager.clearAll();
      await CookieManager.clearAll(true);
    }
  };
};

export const userLinkedinLoginRequest = (payload) => {
  return {
    type: USER_LINKEDIN_LOGIN,
    payload: payload,
  };
};

export const userLinkedinLoginSuccess = (payload) => {
  return {
    type: USER_LINKEDIN_LOGIN_SUCCESS,
    payload: payload,
  };
};

export const userLinkedinLoginFail = (payload) => {
  return {
    type: USER_LINKEDIN_LOGIN_FAIL,
    payload: payload,
  };
};

//
// APPLE LOGIN
//
export const userAppleLogin = () => {
  return async (dispatch) => {
    dispatch(userAppleLoginRequest());
    try {
      // Performs the apple login request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      // Get current authentication state for user
      // Note: getCredentialStateForUser will always fail on a simulator, as it
      // checks device authenticity (Always test apple sign in on real devices)
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse?.user
      );

      // Use credentialState response to ensure the user is authenticated
      if (credentialState !== appleAuth.State.AUTHORIZED) {
        throw Error(
          `User is not authenticated. Credential state: ${credentialState}`
        );
      }

      // Verify the apple auth and exchange for tokens
      const { authorizationCode, fullName, user, identityToken } =
        appleAuthRequestResponse;
      const response = await axios.post(`${userURL()}/apple_signup`, {
        code: authorizationCode,
        first_name: fullName?.givenName || "",
        last_name: fullName?.familyName || "",
        user_identifier: user,
        identity_token: identityToken,
      });

      await saveAuthUser(response.data);
      dispatch(userAppleLoginSuccess(response.data));
      dispatch(userGet({ user_id: response.data?.userId }));
    } catch (error) {
      if (error?.code === appleAuth.Error.CANCELED) {
        dispatch(userAppleLoginCancelled());
      } else {
        let message = error.response?.data?.message;
        if (message === "account deletion in progress") {
          message = appErrors.signIn.accountDeletionInProgress;
        } else {
          message = appErrors.signIn.generalError;
        }

        bugsnagNotify(error);
        dispatch(
          userAppleLoginFail({
            error: true,
            message,
          })
        );
      }
    }
  };
};

export const userAppleLoginRequest = (payload) => {
  return {
    type: USER_APPLE_LOGIN,
    payload: payload,
  };
};

export const userAppleLoginSuccess = (payload) => {
  return {
    type: USER_APPLE_LOGIN_SUCCESS,
    payload: payload,
  };
};

export const userAppleLoginCancelled = (payload) => {
  return {
    type: USER_APPLE_LOGIN_CANCELLED,
    payload: payload,
  };
};

export const userAppleLoginFail = (payload) => {
  return {
    type: USER_APPLE_LOGIN_FAIL,
    payload: payload,
  };
};

export const userResetPassword = (payload) => {
  return async (dispatch) => {
    dispatch(userResetPasswordRequest());
    try {
      await axios.post(`${userURL()}/reset_password`, payload);
      dispatch(userResetPasswordSuccess());
    } catch (error) {
      bugsnagNotify(error);
      dispatch(
        userResetPasswordFail({
          error: true,
          message:
            error.response?.data?.message || "Error resetting user password",
        })
      );
    }
  };
};

export const userResetPasswordRequest = (payload) => {
  return {
    type: USER_RESET_PASSWORD,
    payload,
  };
};

export const userResetPasswordSuccess = (payload) => {
  return {
    type: USER_RESET_PASSWORD_SUCCESS,
    payload,
  };
};

export const userResetPasswordFail = (payload) => {
  return {
    type: USER_RESET_PASSWORD_FAIL,
    payload,
  };
};

export const userResetPasswordStatusReset = () => {
  return {
    type: USER_RESET_PASSWORD_STATUS_RESET,
  };
};

export const userResetPasswordConfirmation = ({ token, password }) => {
  return async (dispatch) => {
    dispatch(userResetPasswordConfirmationRequest());
    try {
      const response = await axiosClient.post(
        `${userURL()}/email_confirmation_action/${token}`,
        {
          action: "RESET_PASSWORD",
          token,
          password,
        }
      );
      await saveAuthUser(response.data);
      dispatch(userResetPasswordConfirmationSuccess(response.data));
      dispatch(userGet({ user_id: response.data?.userId }));
    } catch (error) {
      bugsnagNotify(error);
      dispatch(
        userResetPasswordConfirmationFail({
          error: true,
          message: error?.message || "Error confirming reset password",
        })
      );
    }
  };
};

export const userResetPasswordConfirmationRequest = () => {
  return {
    type: USER_RESET_PASSWORD_CONFIRMATION,
  };
};

export const userResetPasswordConfirmationSuccess = (payload) => {
  return {
    type: USER_RESET_PASSWORD_CONFIRMATION_SUCCESS,
    payload,
  };
};

export const userResetPasswordConfirmationFail = (payload) => {
  return {
    type: USER_RESET_PASSWORD_CONFIRMATION_FAIL,
    payload,
  };
};

//
// INITIALIZE GOOGLE SIGN IN MODULE
//
if (isIOS()) {
  GoogleSignin.configure();
} else {
  GoogleSignin.configure({
    webClientId: ANDROID_OAUTH_WEB_CLIENT_ID,
    offlineAccess: true,
  });
}

//
// GOOGLE SIGN IN
//
export const userGoogleLogin = () => {
  return async (dispatch) => {
    try {
      dispatch(userGoogleLoginRequest());
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const response = await axios.post(`${userURL()}/google_signup`, {
        idToken: idToken,
        platform: Platform.OS.toUpperCase(),
      });
      await saveAuthUser(response?.data);
      dispatch(userGoogleLoginSuccess(response?.data));
      dispatch(userGet({ user_id: response?.data?.userId }));
    } catch (error) {
      if (error?.code === statusCodes.SIGN_IN_CANCELLED) {
        dispatch(userGoogleLoginCancelled());
        return;
      } else if (error?.code === statusCodes.IN_PROGRESS) {
        return;
      }
      // Ensure logout if an error occurs and somehow the user was signed in
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) dispatch(userGoogleLogout());

      bugsnagNotify(error);
      dispatch(
        userGoogleLoginFail({
          message:
            "There was an error singing in with Google. If the problem persists, please contact support@allianceapp.com",
          error,
        })
      );
    }
  };
};

export const userGoogleLoginRequest = (payload) => {
  return {
    type: USER_GOOGLE_LOGIN,
    payload: payload,
  };
};

export const userGoogleLoginSuccess = (payload) => {
  return {
    type: USER_GOOGLE_LOGIN_SUCCESS,
    payload: payload,
  };
};

export const userGoogleLoginCancelled = (payload) => {
  return {
    type: USER_GOOGLE_LOGIN_CANCELLED,
    payload: payload,
  };
};

export const userGoogleLoginFail = (payload) => {
  return {
    type: USER_GOOGLE_LOGIN_FAIL,
    payload: payload,
  };
};

//
// GOOGLE SIGN OUT
//
export const userGoogleLogout = () => {
  return async (dispatch) => {
    try {
      dispatch(userGoogleLogoutRequest());
      await GoogleSignin.signOut();
      dispatch(userGoogleLogoutSuccess());
    } catch (error) {
      bugsnagNotify(error);
      dispatch(userGoogleLogoutFail(error));
    }
  };
};

export const userGoogleLogoutRequest = () => {
  return {
    type: USER_GOOGLE_LOGOUT,
  };
};

export const userGoogleLogoutSuccess = () => {
  return {
    type: USER_GOOGLE_LOGOUT_SUCCESS,
  };
};

export const userGoogleLogoutFail = (payload) => {
  return {
    type: USER_GOOGLE_LOGOUT_FAIL,
    payload: payload,
  };
};

//
// ADD DEVICE TOKEN
//
export const userAddDevice = (token) => {
  return async (dispatch) => {
    dispatch(userAddDeviceRequest());
    try {
      const { data } = await authorizedPost(`${userURL()}/add_device`, {
        device_expo_id: token,
      });
      dispatch(userAddDeviceSuccess(data));
    } catch (error) {
      bugsnagNotify(error);
      dispatch(
        userAddDeviceFail({
          error: true,
          message: error?.message || "Error adding device for user",
        })
      );
    }
  };
};

export const userAddDeviceRequest = (payload) => {
  return {
    type: USER_ADD_DEVICE,
    payload: payload,
  };
};

export const userAddDeviceSuccess = (user) => {
  return {
    type: USER_ADD_DEVICE_SUCCESS,
    payload: user,
  };
};

export const userAddDeviceFail = (err) => {
  return {
    type: USER_ADD_DEVICE_FAIL,
    payload: err,
  };
};

//
// DELETE DEVICE TOKEN
//
export const userDeleteDevice = () => {
  return async (dispatch, getState) => {
    try {
      const token = getState()?.notification?.expoPushToken;
      if (!token) throw new Error("userDeleteDevice: No token to delete");
      dispatch(userDeleteDeviceRequest());
      const { data } = await authorizedPost(`${userURL()}/delete_device`, {
        device_expo_id: token,
      });
      dispatch(userDeleteDeviceSuccess(data));
    } catch (error) {
      bugsnagNotify(error);
      dispatch(
        userDeleteDeviceFail({
          error: true,
          message: error?.message || "Error deleting device for user",
        })
      );
    }
  };
};

export const userDeleteDeviceRequest = (payload) => {
  return {
    type: USER_DELETE_DEVICE,
    payload: payload,
  };
};

export const userDeleteDeviceSuccess = (user) => {
  return {
    type: USER_DELETE_DEVICE_SUCCESS,
    payload: user,
  };
};

export const userDeleteDeviceFail = (err) => {
  return {
    type: USER_DELETE_DEVICE_FAIL,
    payload: err,
  };
};

//
// FETCH USER LIST
//
export const userFetchList = (payload) => {
  return async (dispatch) => {
    dispatch(userFetchListRequest());
    try {
      const response = await authorizedPost(`${userURL()}/get_list`, payload);
      dispatch(userFetchListSuccess(response.data));
    } catch (error) {
      bugsnagNotify(error);
      dispatch(
        userFetchListFail({
          error: true,
          message: error?.message || "error",
        })
      );
    }
  };
};

export const userFetchListRequest = () => {
  return {
    type: USER_FETCH_LIST,
  };
};

export const userFetchListSuccess = (payload) => {
  return {
    type: USER_FETCH_LIST_SUCCESS,
    payload: payload,
  };
};

export const userFetchListFail = (err) => {
  return {
    type: USER_FETCH_LIST_FAIL,
    payload: err,
  };
};

//
// GET USER
//
export const userGet = (payload) => {
  return async (dispatch) => {
    dispatch(userGetRequest());
    try {
      const response = await authorizedPost(`${userURL()}/get`, payload);
      dispatch(userGetSuccess(response?.data));
    } catch (error) {
      bugsnagNotify(error);
      dispatch(
        userGetFail({
          error: true,
          message: error?.message || "error",
        })
      );
    }
  };
};

export const userGetRequest = (payload) => {
  return {
    type: USER_GET,
    payload: payload,
  };
};

export const userGetSuccess = (payload) => {
  return {
    type: USER_GET_SUCCESS,
    payload: payload,
  };
};

export const userGetFail = (payload) => {
  return {
    type: USER_GET_FAIL,
    payload: payload,
  };
};

//
// UPDATE USER
//
export const userUpdate = (payload) => {
  return async (dispatch) => {
    dispatch(userUpdateRequest());
    try {
      const response = await authorizedPost(`${userURL()}/update`, payload);
      dispatch(userUpdateSuccess(response.data));
      return true;
    } catch (error) {
      bugsnagNotify(error);
      dispatch(
        userUpdateFail({
          error: true,
          message: error?.message || "error",
        })
      );
      return false;
    }
  };
};

export const userUpdateRequest = (payload) => {
  return {
    type: USER_UPDATE,
    payload: payload,
  };
};

export const userUpdateSuccess = (user) => {
  return {
    type: USER_UPDATE_SUCCESS,
    payload: user,
  };
};

export const userUpdateFail = (err) => {
  return {
    type: USER_UPDATE_FAIL,
    payload: err,
  };
};

export const userUpdateReset = () => {
  return {
    type: USER_UPDATE_RESET,
  };
};

//
// REFRESH TOKEN
//
export const userRefreshTokenSuccess = (payload) => {
  saveAuthUser(payload);

  return {
    type: USER_REFRESH_TOKEN_SUCCESS,
    payload,
  };
};

//
// LOGOUT
//
export const userLogout = () => {
  return async (dispatch) => {
    await dispatch(chatGetStreamDisconnect());
    await dispatch(userDeleteDevice());
    dispatch({
      type: USER_LOGOUT,
    });
    dispatch({
      type: RESET_APP_STATE,
    });
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) dispatch(userGoogleLogout());
    resetAuthStorage();
    // Clear cookies (eg linkedin login cookies in webview)
    await CookieManager.clearAll();
    await CookieManager.clearAll(true);
    persistor.purge();
    persistor.persist();
  };
};

export const userSignUp = (payload) => {
  return async (dispatch) => {
    dispatch(userSignUpRequest());
    try {
      const response = await axiosClient.post(
        `${userURL()}/email_signup`,
        payload
      );
      dispatch(userSignUpSuccess(response.data));
      return true;
    } catch (error) {
      bugsnagNotify(error);
      dispatch(
        userSignUpFail({
          error: true,
          message: error?.response || "error",
        })
      );
      return false;
    }
  };
};

const userSignUpRequest = () => {
  return {
    type: USER_SIGNUP,
  };
};

const userSignUpSuccess = (user) => {
  return {
    type: USER_SIGNUP_SUCCESS,
    payload: user,
  };
};

const userSignUpFail = (err) => {
  return {
    type: USER_SIGNUP_FAIL,
    payload: err,
  };
};

export const userSignUpConfirmation = ({ token }) => {
  return async (dispatch) => {
    dispatch(userSignUpConfirmationRequest());
    try {
      const response = await axiosClient.post(
        `${userURL()}/email_confirmation_action/${token}`,
        {
          action: "SIGNUP_CONFIRMATION",
        }
      );
      await saveAuthUser(response.data);
      dispatch(userSignUpConfirmationSuccess(response.data));
      dispatch(userGet({ user_id: response.data?.userId }));
      return true;
    } catch (error) {
      bugsnagNotify(error);
      dispatch(
        userSignUpConfirmationFail({
          error: true,
          message: error?.response || "error",
        })
      );
      return false;
    }
  };
};

const userSignUpConfirmationRequest = () => {
  return {
    type: USER_SIGNUP_CONFIRMATION,
  };
};

const userSignUpConfirmationSuccess = (user) => {
  return {
    type: USER_SIGNUP_CONFIRMATION_SUCCESS,
    payload: user,
  };
};

const userSignUpConfirmationFail = (err) => {
  return {
    type: USER_SIGNUP_CONFIRMATION_FAIL,
    payload: err,
  };
};

export const userDeleteAccount = () => {
  return async (dispatch) => {
    dispatch(userDeleteAccountRequest());
    try {
      await authorizedPost(`${userURL()}/schedule_delete`);
      dispatch(userDeleteAccountSuccess());
      return true;
    } catch (error) {
      bugsnagNotify(error);
      dispatch(
        userDeleteAccountFail({
          error: true,
          message: error?.message || "error",
        })
      );
      return false;
    }
  };
};

const userDeleteAccountRequest = () => {
  return {
    type: USER_DELETE_ACCOUNT,
  };
};

const userDeleteAccountSuccess = () => {
  return {
    type: USER_DELETE_ACCOUNT_SUCCESS,
  };
};

const userDeleteAccountFail = (err) => {
  return {
    type: USER_DELETE_ACCOUNT_FAIL,
    payload: err,
  };
};

export const userSetLoginAction = (payload) => {
  return {
    type: USER_SET_LOGIN_ACTION,
    payload,
  };
};

export const userRefreshToken = () => {
  return async (dispatch) => {
    try {
      const { refreshToken, userId } = await getAuthUser();

      const { data } = await authorizedPost(`${userURL()}/refresh_token`, {
        refresh_token: refreshToken,
      });
      dispatch(userRefreshTokenSuccess({ ...data, userId }));
    } catch (error) {
      bugsnagNotify(error);
      dispatch(userRefreshTokenFail(error));
    }
  };
};

const userRefreshTokenFail = (err) => {
  return {
    type: USER_REFRESH_TOKEN_FAIL,
    payload: err,
  };
};
