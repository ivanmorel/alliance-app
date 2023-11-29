import * as Updates from "expo-updates";

import {
  OTA_UPDATE_ERROR,
  OTA_UPDATE_EVENT,
  OTA_UPDATE_STATUS,
  OTA_UPDATE_STATUSES,
  OTA_UPDATE_SUCCESS,
} from "@constants";

import { bugsnagNotify } from "@services/bugsnag";

import { wait } from "@utils/utils";

export const otaUpdateStatus = (payload) => {
  return {
    type: OTA_UPDATE_STATUS,
    payload,
  };
};

// TODO:
//   - Allow users to choose if they want to download and then install
//   - Check if on WIFI before downloading (user option perhaps?)
//   - Required/Priority updates will force a download/install (user can still
//     choose when to download and install if not on WIFI, but the app should
//     not be usable if the update fixes current priority bugs/issues/concerns)
//   - We may want a custom screen to show update status/info and action items
//     support the above UX ideas
export const otaCheckForUpdates = () => {
  return async (dispatch) => {
    try {
      dispatch(otaUpdateStatus(OTA_UPDATE_STATUSES.checking));
      const { isAvailable } = await Updates.checkForUpdateAsync();
      if (isAvailable) {
        dispatch(otaUpdateStatus(OTA_UPDATE_STATUSES.downloading));
        const { isNew } = await Updates.fetchUpdateAsync();
        if (isNew) {
          dispatch(otaUpdateSuccess());
          await wait(1000);
          await Updates.reloadAsync();
        }
      }
      dispatch(otaUpdateSuccess());
    } catch (error) {
      bugsnagNotify(error);
      dispatch(otaUpdateError(error?.message || "Unknown OTA update error"));
    }
  };
};

export const otaUpdateSuccess = () => {
  return {
    type: OTA_UPDATE_SUCCESS,
  };
};

export const otaUpdateError = (payload) => {
  return {
    type: OTA_UPDATE_ERROR,
    payload,
  };
};

export const otaUpdateEvent = (payload) => {
  return {
    type: OTA_UPDATE_EVENT,
    payload,
  };
};
