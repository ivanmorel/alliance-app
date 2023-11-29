import moment from "moment";

import {
  OTA_UPDATE_ERROR,
  OTA_UPDATE_EVENT,
  OTA_UPDATE_STATUS,
  OTA_UPDATE_STATUSES,
  OTA_UPDATE_SUCCESS,
} from "@constants";

const INIT_STATE = {
  checkStatus: null,
  lastChecked: null,
  lastEvent: null,
  error: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case OTA_UPDATE_STATUS: {
      return {
        ...state,
        checkStatus: action.payload,
        lastChecked: moment(),
        error: null,
      };
    }

    case OTA_UPDATE_SUCCESS: {
      return {
        ...state,
        checkStatus: OTA_UPDATE_STATUSES.complete,
        error: null,
      };
    }

    case OTA_UPDATE_ERROR: {
      return {
        ...state,
        checkStatus: OTA_UPDATE_STATUSES.error,
        error: action.payload,
      };
    }

    case OTA_UPDATE_EVENT: {
      return {
        ...state,
        lastEvent: action.payload,
      };
    }

    default:
      return state;
  }
};
