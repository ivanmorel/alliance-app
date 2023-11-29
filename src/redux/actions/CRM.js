import {
  CRM_LEAD_ADD,
  CRM_LEAD_ADD_ERROR,
  CRM_LEAD_ADD_SUCCESS,
  CRM_USER_CHECK,
  CRM_USER_CHECK_ERROR,
  CRM_USER_CHECK_SUCCESS,
} from "@constants";

import { bugsnagNotify } from "@services/bugsnag";

import { authorizedPost, crmURL } from "@utils/api";

export const crmUserCheck = () => {
  return async (dispatch) => {
    try {
      dispatch(crmUserCheckRequest());
      const { data } = await authorizedPost(`${crmURL()}/user/check`);
      dispatch(crmUserCheckSuccess(data?.integrationExists));
    } catch (error) {
      bugsnagNotify(error);
      dispatch(
        crmUserCheckError(
          error?.message || "Failed to check CRM integration for user"
        )
      );
    }
  };
};

export const crmUserCheckRequest = () => {
  return {
    type: CRM_USER_CHECK,
  };
};

export const crmUserCheckSuccess = (hasIntegration) => {
  return {
    type: CRM_USER_CHECK_SUCCESS,
    payload: hasIntegration,
  };
};

export const crmUserCheckError = (payload) => {
  return {
    type: CRM_USER_CHECK_ERROR,
    payload,
  };
};

export const crmLeadAdd = ({ leadId }) => {
  return async (dispatch) => {
    try {
      dispatch(crmLeadAddRequest({ leadId }));
      const { data } = await authorizedPost(`${crmURL()}/lead/add`, {
        lead_id: leadId,
      });
      dispatch(crmLeadAddSuccess(data));
    } catch (error) {
      bugsnagNotify(error);
      dispatch(crmLeadAddError(error?.message || "Failed to push lead to CRM"));
    }
  };
};

export const crmLeadAddRequest = (payload) => {
  return {
    type: CRM_LEAD_ADD,
    payload,
  };
};

export const crmLeadAddSuccess = () => {
  return {
    type: CRM_LEAD_ADD_SUCCESS,
  };
};

export const crmLeadAddError = (payload) => {
  return {
    type: CRM_LEAD_ADD_ERROR,
    payload,
  };
};
