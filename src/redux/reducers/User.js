import {
  USER_APPLE_LOGIN,
  USER_APPLE_LOGIN_CANCELLED,
  USER_APPLE_LOGIN_FAIL,
  USER_APPLE_LOGIN_SUCCESS,
  USER_DELETE_ACCOUNT,
  USER_DELETE_ACCOUNT_FAIL,
  USER_DELETE_ACCOUNT_SUCCESS,
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
  USER_REFRESH_TOKEN_SUCCESS,
  USER_RESET_PASSWORD,
  USER_RESET_PASSWORD_CONFIRMATION,
  USER_RESET_PASSWORD_CONFIRMATION_FAIL,
  USER_RESET_PASSWORD_CONFIRMATION_SUCCESS,
  USER_RESET_PASSWORD_FAIL,
  USER_RESET_PASSWORD_STATUS_RESET,
  USER_RESET_PASSWORD_SUCCESS,
  USER_SET_LOGIN_ACTION,
  USER_SIGNUP_CONFIRMATION,
  USER_SIGNUP_CONFIRMATION_FAIL,
  USER_SIGNUP_CONFIRMATION_SUCCESS,
  USER_UPDATE,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
  USER_UPDATE_SUCCESS,
} from "@constants";

const UserInitialState = {
  authUser: null,
  userId: null,
  businessId: null,
  user: {},
  users: {},
  notificationSetting: {
    enableEmail: false,
  },
  linkedInUrl: null,
  linkedInStep: "1",
  error: null,
  loginWithEmailError: null,
  loginWithSocialError: null,
  confirmResetPasswordLoading: false,
  confirmResetPasswordError: null,
  appUser: {},
  loading: false,
  sendResetEmailSuccess: false,
  userUpdated: false,
  loginMethods: [],
  googleLoginLoading: false,
  googleLoginSuccess: false,
  loginAction: null,
};

const loginReduce = (action) => ({
  authUser: action.payload.accessToken,
  userId: action.payload.userId,
  businessId: action.payload.businessId,
});

const UserReducer = (state = UserInitialState, action) => {
  switch (action.type) {
    case USER_LOGOUT: {
      return {
        ...UserInitialState,
      };
    }

    case USER_LINKEDIN_LOGIN:
      return {
        ...state,
        loading: true,
      };

    case USER_LINKEDIN_LOGIN_SUCCESS:
      return {
        ...state,
        ...loginReduce(action),
        linkedInStep: action.payload.signupStep,
        loginWithSocialError: null,
        loading: false,
      };

    case USER_LINKEDIN_LOGIN_FAIL:
      return {
        ...state,
        linkedInUrl: null,
        loginWithSocialError: action.payload,
        loading: false,
      };

    case USER_LINKEDIN_LOGIN_URL:
      return {
        ...state,
        loading: true,
      };

    case USER_LINKEDIN_LOGIN_URL_SUCCESS:
      return {
        ...state,
        linkedInUrl: action.payload.url,
        loginWithSocialError: null,
        loading: false,
      };

    case USER_LINKEDIN_LOGIN_URL_FAIL:
      return {
        ...state,
        loginWithSocialError: action.payload,
        loading: false,
      };

    case USER_LINKEDIN_LOGIN_URL_RESET:
      return {
        ...state,
        linkedInUrl: null,
        loginWithSocialError: null,
        loading: false,
      };

    case USER_LOGIN:
      return {
        ...state,
        loading: true,
        loginWithEmailError: null,
      };

    case USER_REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        ...loginReduce(action),
      };
    }
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        ...loginReduce(action),
        loginWithEmailError: null,
        loading: false,
      };

    case USER_LOGIN_FAIL:
      return {
        ...state,
        loginWithEmailError: action.payload,
        loading: false,
      };

    case USER_APPLE_LOGIN:
      return {
        ...state,
        loading: true,
      };

    case USER_APPLE_LOGIN_SUCCESS:
      return {
        ...state,
        ...loginReduce(action),
        loginWithSocialError: null,
        loading: false,
      };

    case USER_APPLE_LOGIN_CANCELLED:
      return {
        ...state,
        loading: false,
      };

    case USER_APPLE_LOGIN_FAIL:
      return {
        ...state,
        loginWithSocialError: action.payload,
        loading: false,
      };

    case USER_GOOGLE_LOGIN:
      return {
        ...state,
        googleLoginLoading: true,
        googleLoginSuccess: false,
        loginWithSocialError: null,
      };

    case USER_GOOGLE_LOGIN_SUCCESS:
      return {
        ...state,
        ...loginReduce(action),
        googleLoginLoading: false,
        googleLoginSuccess: true,
        loginWithSocialError: null,
      };

    case USER_GOOGLE_LOGIN_CANCELLED:
      return {
        ...state,
        googleLoginLoading: false,
        googleLoginSuccess: false,
        loginWithSocialError: null,
      };

    case USER_GOOGLE_LOGIN_FAIL:
      return {
        ...state,
        googleLoginLoading: false,
        googleLoginSuccess: false,
        loginWithSocialError: action.payload,
      };

    case USER_RESET_PASSWORD:
      return {
        ...state,
        loading: true,
        sendResetEmailSuccess: false,
      };

    case USER_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        sendResetEmailSuccess: true,
      };

    case USER_RESET_PASSWORD_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        sendResetEmailSuccess: false,
      };

    case USER_RESET_PASSWORD_STATUS_RESET:
      return {
        ...state,
        loading: false,
        sendResetEmailSuccess: false,
        error: null,
      };

    case USER_RESET_PASSWORD_CONFIRMATION:
      return {
        ...state,
        confirmResetPasswordLoading: true,
        confirmResetPasswordError: null,
      };

    case USER_RESET_PASSWORD_CONFIRMATION_SUCCESS:
      return {
        ...state,
        ...loginReduce(action),
        confirmResetPasswordError: null,
        confirmResetPasswordLoading: false,
      };

    case USER_RESET_PASSWORD_CONFIRMATION_FAIL:
      return {
        ...state,
        confirmResetPasswordError: action.payload,
        confirmResetPasswordLoading: false,
      };

    case USER_SIGNUP_CONFIRMATION_SUCCESS:
      return {
        ...state,
        ...loginReduce(action),
        error: null,
        loading: false,
      };

    case USER_SIGNUP_CONFIRMATION:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case USER_SIGNUP_CONFIRMATION_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case USER_GET:
      return {
        ...state,
        loading: true,
      };

    case USER_GET_SUCCESS:
      return {
        ...state,
        appUser: action.payload,
        error: null,
        loading: false,
      };

    case USER_GET_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case USER_UPDATE:
      return {
        ...state,
        loading: true,
        userUpdated: false,
      };

    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        appUser: action.payload,
        error: null,
        loading: false,
        userUpdated: true,
      };

    case USER_UPDATE_RESET:
      return {
        ...state,
        error: null,
        loading: false,
        userUpdated: false,
      };

    case USER_UPDATE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        userUpdated: false,
      };

    case USER_GET_LOGIN_METHODS:
      return {
        ...state,
        loading: true,
        error: null,
        loginMethods: [],
      };

    case USER_GET_LOGIN_METHODS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        loginMethods: action.payload.loginMethods,
      };

    case USER_GET_LOGIN_METHODS_RESET:
    case USER_GET_LOGIN_METHODS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        loginWithEmailError: null,
        loginWithSocialError: null,
        loginMethods: [],
      };

    case USER_SET_LOGIN_ACTION:
      return {
        ...state,
        loginAction: action.payload,
      };

    case USER_DELETE_ACCOUNT:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case USER_DELETE_ACCOUNT_SUCCESS:
    case USER_DELETE_ACCOUNT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default UserReducer;
