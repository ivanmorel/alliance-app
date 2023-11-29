import { snackbarAddMessageToQueue } from "@actions";
import {
  LEAD_CLEAR,
  LEAD_CREATE,
  LEAD_CREATE_FAIL,
  LEAD_CREATE_RESET,
  LEAD_CREATE_SUCCESS,
  LEAD_DELETE,
  LEAD_DELETE_FAIL,
  LEAD_DELETE_SUCCESS,
  LEAD_GET,
  LEAD_GET_FAIL,
  LEAD_GET_SUCCESS,
  LEAD_LIST,
  LEAD_LIST_FAIL,
  LEAD_LIST_NEARBY,
  LEAD_LIST_NEARBY_FAIL,
  LEAD_LIST_NEARBY_SUCCESS,
  LEAD_LIST_NEW,
  LEAD_LIST_NEW_FAIL,
  LEAD_LIST_NEW_SUCCESS,
  LEAD_LIST_SUCCESS,
  RESET_DELETE_LEAD,
} from "@constants";

import { bugsnagNotify } from "@services/bugsnag";

import { navigate } from "@routes/navigator";
import { SCREENS } from "@routes/routes.constants";

import { authorizedPost, leadURL } from "@utils/api";
import { appErrors, SNACKBAR_TYPES } from "@utils/constants";

export const leadList = (payload) => {
  return (dispatch) => {
    dispatch(leadListRequest());
    authorizedPost(`${leadURL()}/list`, payload)
      .then((response) => {
        dispatch(leadListSuccess(response.data, payload.paginated));
      })
      .catch((error) => {
        bugsnagNotify(error);
        dispatch(
          leadListFail({
            error: true,
            message: error.message,
          })
        );
      });
  };
};

export const leadGet = (payload) => {
  return (dispatch) => {
    dispatch(leadGetRequest());
    authorizedPost(`${leadURL()}/get`, payload)
      .then((response) => {
        dispatch(leadGetSuccess(response.data));
      })
      .catch((error) => {
        bugsnagNotify(error);
        dispatch(
          leadGetFail({
            error: true,
            message: error.response.data.message || "error",
          })
        );
      });
  };
};

export const leadCreate = (payload) => {
  return async (dispatch) => {
    dispatch(leadCreateRequest("LEAD CREATE PAYLOAD", payload));
    return authorizedPost(`${leadURL()}/create`, payload)
      .then((response) => {
        dispatch(leadCreateSuccess(response.data.lead));
        return true;
      })
      .catch((error) => {
        bugsnagNotify(error);
        dispatch(
          leadCreateFail({
            error: true,
            message: error.message,
          })
        );
        return false;
      });
  };
};

export const leadCreateReset = () => {
  return {
    type: LEAD_CREATE_RESET,
  };
};

export const leadListNew = (payload) => {
  return (dispatch) => {
    dispatch(leadListNewRequest());
    authorizedPost(`${leadURL()}/list_new`, payload)
      .then((response) => {
        dispatch(leadListNewSuccess(response.data));
      })
      .catch((error) => {
        bugsnagNotify(error);
        dispatch(leadListNewFail({ error: true, message: error.message }));
      });
  };
};

export const leadClear = () => {
  return {
    type: LEAD_CLEAR,
  };
};

export const leadGetRequest = () => {
  return {
    type: LEAD_GET,
  };
};

export const leadGetSuccess = (payload) => {
  return {
    type: LEAD_GET_SUCCESS,
    payload: payload,
  };
};

export const leadGetFail = (err) => {
  return {
    type: LEAD_GET_FAIL,
    payload: err,
  };
};

export const leadCreateRequest = (payload) => {
  return {
    type: LEAD_CREATE,
    payload: payload,
  };
};

export const leadCreateSuccess = (response) => {
  return {
    type: LEAD_CREATE_SUCCESS,
    payload: response,
  };
};

export const leadCreateFail = (err) => {
  return {
    type: LEAD_CREATE_FAIL,
    payload: err,
  };
};

export const leadListRequest = (payload) => {
  return {
    type: LEAD_LIST,
    payload: payload,
  };
};

export const leadListSuccess = (response, paginated) => {
  return {
    type: LEAD_LIST_SUCCESS,
    payload: response,
    paginated,
  };
};

export const leadListFail = (err) => {
  return {
    type: LEAD_LIST_FAIL,
    payload: err,
  };
};

export const leadListNewRequest = (payload) => {
  return {
    type: LEAD_LIST_NEW,
    payload: payload,
  };
};

export const leadListNewSuccess = (response) => {
  return {
    type: LEAD_LIST_NEW_SUCCESS,
    payload: response,
  };
};

export const leadListNewFail = (err) => {
  return {
    type: LEAD_LIST_NEW_FAIL,
    paylaod: err,
  };
};

export const leadListNearby = (payload) => {
  return (dispatch) => {
    dispatch(leadListNearbyRequest());
    authorizedPost(`${leadURL()}/list_nearby`, payload)
      .then((response) => {
        dispatch(leadListNearbySuccess(response.data));
        return true;
      })
      .catch((error) => {
        bugsnagNotify(error);
        dispatch(
          leadListNearbyFail({
            error: true,
            message: error.message,
          })
        );
        return false;
      });
  };
};

export const leadListNearbySuccess = (response) => {
  return {
    type: LEAD_LIST_NEARBY_SUCCESS,
    payload: response,
  };
};

export const leadListNearbyRequest = () => {
  return {
    type: LEAD_LIST_NEARBY,
  };
};

export const leadListNearbyFail = (payload) => {
  return {
    type: LEAD_LIST_NEARBY_FAIL,
    payload,
  };
};

export const leadDelete = ({ leadId, groupId }) => {
  return async (dispatch) => {
    dispatch(leadDeleteRequest());
    try {
      await authorizedPost(`${leadURL()}/delete`, { leadId });
      dispatch(leadDeleteSuccess());

      if (groupId) {
        dispatch(leadList({ groupId }));
      }

      navigate(SCREENS.appStack.group, {
        screen: SCREENS.groupTabs.leads,
      });
      dispatch(
        snackbarAddMessageToQueue({
          message: "The lead has been deleted",
          type: SNACKBAR_TYPES.error,
        })
      );
    } catch (error) {
      bugsnagNotify(error);
      dispatch(leadDeleteFail(appErrors.lead.delete));
    }
  };
};

export const leadDeleteRequest = () => {
  return {
    type: LEAD_DELETE,
  };
};

export const leadDeleteSuccess = (response) => {
  return {
    type: LEAD_DELETE_SUCCESS,
    payload: response,
  };
};

export const leadDeleteFail = (err) => {
  return {
    type: LEAD_DELETE_FAIL,
    payload: err,
  };
};

export const resetDeleteLead = () => {
  return {
    type: RESET_DELETE_LEAD,
  };
};
