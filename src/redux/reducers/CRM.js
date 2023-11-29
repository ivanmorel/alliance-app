import {
  CRM_LEAD_ADD,
  CRM_LEAD_ADD_ERROR,
  CRM_LEAD_ADD_SUCCESS,
  CRM_USER_CHECK,
  CRM_USER_CHECK_ERROR,
  CRM_USER_CHECK_SUCCESS,
} from "@constants";

const INIT_STATE = {
  hasIntegration: false,
  userCheckLoading: false,
  userCheckSuccess: false,
  userCheckError: null,
  addLeadLoading: false,
  addLeadSuccess: false,
  addLeadError: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CRM_USER_CHECK: {
      return {
        ...state,
        userCheckLoading: true,
        userCheckSuccess: false,
        userCheckError: null,
      };
    }

    case CRM_USER_CHECK_SUCCESS: {
      return {
        ...state,
        hasIntegration: action.payload,
        userCheckLoading: false,
        userCheckSuccess: true,
        userCheckError: null,
      };
    }

    case CRM_USER_CHECK_ERROR: {
      return {
        ...state,
        userCheckLoading: false,
        userCheckSuccess: false,
        userCheckError: action.payload,
      };
    }

    case CRM_LEAD_ADD: {
      return {
        ...state,
        leadAddLoading: true,
        leadAddSuccess: false,
        leadAddError: null,
      };
    }

    case CRM_LEAD_ADD_SUCCESS: {
      return {
        ...state,
        leadAddLoading: false,
        leadAddSuccess: true,
        leadAddError: null,
      };
    }

    case CRM_LEAD_ADD_ERROR: {
      return {
        ...state,
        leadAddLoading: false,
        leadAddSuccess: false,
        leadAddError: action.payload,
      };
    }

    default:
      return state;
  }
};
