import { snackbarAddMessageToQueue } from "@actions";
import {
  OPPORTUNITY_BRANCH_JOIN_LINK,
  OPPORTUNITY_BRANCH_JOIN_LINK_RESET,
  OPPORTUNITY_CONTACT_CREATE,
  OPPORTUNITY_CONTACT_CREATE_FAIL,
  OPPORTUNITY_CONTACT_CREATE_RESET,
  OPPORTUNITY_CONTACT_CREATE_SUCCESS,
  OPPORTUNITY_CONTACT_EDIT,
  OPPORTUNITY_CONTACT_EDIT_FAIL,
  OPPORTUNITY_CONTACT_EDIT_RESET,
  OPPORTUNITY_CONTACT_EDIT_SUCCESS,
  OPPORTUNITY_CONVERT_LEAD,
  OPPORTUNITY_CONVERT_LEAD_FAIL,
  OPPORTUNITY_CONVERT_LEAD_RESET,
  OPPORTUNITY_CONVERT_LEAD_SUCCESS,
  OPPORTUNITY_CREATE,
  OPPORTUNITY_CREATE_FAIL,
  OPPORTUNITY_CREATE_FORM,
  OPPORTUNITY_CREATE_FORM_RESET,
  OPPORTUNITY_CREATE_RESET,
  OPPORTUNITY_CREATE_SUCCESS,
  OPPORTUNITY_CURRENT_RESET,
  OPPORTUNITY_DELETE,
  OPPORTUNITY_DELETE_FAIL,
  OPPORTUNITY_DELETE_SUCCESS,
  OPPORTUNITY_GET,
  OPPORTUNITY_GET_FAIL,
  OPPORTUNITY_GET_INVITE_CODE_FAIL,
  OPPORTUNITY_GET_INVITE_CODE_REQUEST,
  OPPORTUNITY_GET_INVITE_CODE_RESET,
  OPPORTUNITY_GET_INVITE_CODE_SUCCESS,
  OPPORTUNITY_GET_SUCCESS,
  OPPORTUNITY_INVITE_ACCEPTED_FAIL,
  OPPORTUNITY_INVITE_ACCEPTED_REQUEST,
  OPPORTUNITY_INVITE_ACCEPTED_SUCCESS,
  OPPORTUNITY_LIST,
  OPPORTUNITY_LIST_FAIL,
  OPPORTUNITY_LIST_NEARBY,
  OPPORTUNITY_LIST_NEARBY_FAIL,
  OPPORTUNITY_LIST_NEARBY_SUCCESS,
  OPPORTUNITY_LIST_SUCCESS,
  OPPORTUNITY_SHARE_LINK,
  OPPORTUNITY_SHARE_LINK_FAIL,
  OPPORTUNITY_SHARE_LINK_OPEN_SHEET,
  OPPORTUNITY_SHARE_LINK_SUCCESS,
  OPPORTUNITY_UPDATE,
  OPPORTUNITY_UPDATE_FAIL,
  OPPORTUNITY_UPDATE_RESET,
  OPPORTUNITY_UPDATE_SUCCESS,
} from "@constants";

import { showOpportunityInviteShareSheet } from "@services/branchLinks";
import { bugsnagNotify } from "@services/bugsnag";
import { getUser } from "@services/UserService";

import { navigate, navigateReset } from "@routes/navigator";
import { SCREENS } from "@routes/routes.constants";

import { authorizedPost, opportunityURL } from "@utils/api";
import { appErrors, SNACKBAR_TYPES } from "@utils/constants";

export const opportunityCurrentReset = () => {
  return {
    type: OPPORTUNITY_CURRENT_RESET,
  };
};

export const opportunityGet = (payload) => {
  return async (dispatch) => {
    dispatch(opportunityGetRequest(payload));
    try {
      const { data } = await authorizedPost(`${opportunityURL()}/get`, {
        ...payload,
        data: 1,
      });
      dispatch(opportunityGetSuccess(data));
    } catch (error) {
      bugsnagNotify(error);
      dispatch(
        opportunityGetFail({
          error: true,
          message: error?.message || "Error getting opportunity",
        })
      );
    }
  };
};

export const opportunityGetRequest = (payload) => {
  return {
    type: OPPORTUNITY_GET,
    payload,
  };
};

export const opportunityGetSuccess = (payload) => {
  return {
    type: OPPORTUNITY_GET_SUCCESS,
    payload,
  };
};

export const opportunityGetFail = (err) => {
  return {
    type: OPPORTUNITY_GET_FAIL,
    payload: err,
  };
};

export const opportunityCreateForm = (payload) => {
  return {
    type: OPPORTUNITY_CREATE_FORM,
    payload,
  };
};

export const opportunityCreateFormReset = () => {
  return {
    type: OPPORTUNITY_CREATE_FORM_RESET,
  };
};

export const opportunityCreate = (payload) => {
  return async (dispatch) => {
    dispatch(opportunityCreateRequest(payload));
    try {
      const { data } = await authorizedPost(`${opportunityURL()}/set`, payload);
      await dispatch(opportunityGet({ opportunity_id: data?.opportunityId }));
      navigateReset({
        index: 0,
        routes: [
          { name: SCREENS.appStack.activities },
          { name: SCREENS.appStack.opportunities },
          { name: SCREENS.appStack.opportunityDetail },
        ],
      });
      dispatch(opportunityCreateSuccess(data));
      dispatch(opportunityCreateReset());
      dispatch(opportunityCreateFormReset());
      dispatch(opportunityList());
    } catch (error) {
      bugsnagNotify(error);
      dispatch(
        opportunityCreateFail({
          error: true,
          message: error?.message || "Error creating opportunity",
        })
      );
    }
  };
};

export const opportunityCreateRequest = (payload) => {
  return {
    type: OPPORTUNITY_CREATE,
    payload,
  };
};

export const opportunityCreateSuccess = (payload) => {
  return {
    type: OPPORTUNITY_CREATE_SUCCESS,
    payload,
  };
};

export const opportunityCreateFail = (err) => {
  return {
    type: OPPORTUNITY_CREATE_FAIL,
    payload: err,
  };
};

export const opportunityCreateReset = () => {
  return {
    type: OPPORTUNITY_CREATE_RESET,
  };
};

export const opportunityUpdate = (payload) => {
  return async (dispatch) => {
    dispatch(opportunityUpdateRequest(payload));
    try {
      const { data } = await authorizedPost(
        `${opportunityURL()}/update`,
        payload
      );
      dispatch(opportunityUpdateSuccess(data));
    } catch (error) {
      bugsnagNotify(error);
      dispatch(
        opportunityUpdateFail({
          error: true,
          message: error?.message || "Error updating opportunity",
        })
      );
    }
  };
};

export const opportunityUpdateRequest = (payload) => {
  return {
    type: OPPORTUNITY_UPDATE,
    payload,
  };
};

export const opportunityUpdateSuccess = (payload) => {
  return {
    type: OPPORTUNITY_UPDATE_SUCCESS,
    payload,
  };
};

export const opportunityUpdateFail = (err) => {
  return {
    type: OPPORTUNITY_UPDATE_FAIL,
    payload: err,
  };
};

export const opportunityUpdateReset = () => {
  return {
    type: OPPORTUNITY_UPDATE_RESET,
  };
};

export const opportunityConvertLead = (payload) => {
  return async (dispatch) => {
    dispatch(opportunityConvertLeadRequest(payload));
    try {
      const { data } = await authorizedPost(
        `${opportunityURL()}/convert`,
        payload
      );
      dispatch(opportunityConvertLeadSuccess(data));
    } catch (error) {
      bugsnagNotify(error);
      dispatch(
        opportunityConvertLeadFail({
          error: true,
          message: error?.message || "Error converting link into opportunity",
        })
      );
    }
  };
};

export const opportunityConvertLeadRequest = (payload) => {
  return {
    type: OPPORTUNITY_CONVERT_LEAD,
    payload,
  };
};

export const opportunityConvertLeadSuccess = (payload) => {
  return {
    type: OPPORTUNITY_CONVERT_LEAD_SUCCESS,
    payload,
  };
};

export const opportunityConvertLeadFail = (err) => {
  return {
    type: OPPORTUNITY_CONVERT_LEAD_FAIL,
    payload: err,
  };
};

export const opportunityConvertLeadReset = () => {
  return {
    type: OPPORTUNITY_CONVERT_LEAD_RESET,
  };
};

export const opportunityList = (payload) => {
  return async (dispatch) => {
    dispatch(opportunityListRequest());
    try {
      const {
        data: { opportunities = [] },
      } = await authorizedPost(`${opportunityURL()}/list`, {
        ...payload,
        data: 1,
      });

      const opportunitiesList = opportunities.map(async (opportunity) => {
        const createdByUser = await getUser(opportunity.createdBy);
        return {
          ...opportunity,
          createdByName: `${createdByUser?.firstName} ${createdByUser?.lastName}`,
        };
      });
      const result = await Promise.all(opportunitiesList);
      dispatch(opportunityListSuccess(result));
    } catch (error) {
      bugsnagNotify(error);
      dispatch(
        opportunityListFail({
          error: true,
          message: error?.message || "Error fetching opportunities list",
        })
      );
    }
  };
};

export const opportunityListRequest = (payload) => {
  return {
    type: OPPORTUNITY_LIST,
    payload,
  };
};

export const opportunityListSuccess = (response) => {
  return {
    type: OPPORTUNITY_LIST_SUCCESS,
    payload: response,
  };
};

export const opportunityListFail = (err) => {
  return {
    type: OPPORTUNITY_LIST_FAIL,
    payload: err,
  };
};

export const opportunityListNearby = (payload) => {
  return async (dispatch) => {
    dispatch(opportunityListNearbyRequest());
    try {
      const { data } = await authorizedPost(
        `${opportunityURL()}/list_nearby`,
        payload
      );
      dispatch(opportunityListNearbySuccess(data));
    } catch (error) {
      bugsnagNotify(error);
      dispatch(
        opportunityListNearbyFail({
          error: true,
          message: error.message || "Error fetching nearby opportunities",
        })
      );
    }
  };
};

export const opportunityListNearbySuccess = (response) => {
  return {
    type: OPPORTUNITY_LIST_NEARBY_SUCCESS,
    payload: response,
  };
};

export const opportunityListNearbyRequest = () => {
  return {
    type: OPPORTUNITY_LIST_NEARBY,
  };
};

export const opportunityListNearbyFail = (payload) => {
  return {
    type: OPPORTUNITY_LIST_NEARBY_FAIL,
    payload,
  };
};

// TODO this is not being used anywhere, remove?
export const opportunityDelete = ({ opportunityId, groupId }) => {
  return async (dispatch) => {
    dispatch(opportunityDeleteRequest());
    try {
      await authorizedPost(`${opportunityURL()}/delete`, { opportunityId });
      dispatch(opportunityDeleteSuccess());

      if (groupId) {
        dispatch(opportunityList({ groupId }));
      }

      navigate(SCREENS.appStack.group);

      dispatch(
        snackbarAddMessageToQueue({
          message: "The opportunity has been deleted",
        })
      );
    } catch (error) {
      bugsnagNotify(error);
      dispatch(opportunityDeleteFail(appErrors.opportunity.delete));
    }
  };
};

export const opportunityDeleteRequest = () => {
  return {
    type: OPPORTUNITY_DELETE,
  };
};

export const opportunityDeleteSuccess = (response) => {
  return {
    type: OPPORTUNITY_DELETE_SUCCESS,
    payload: response,
  };
};

export const opportunityDeleteFail = (err) => {
  return {
    type: OPPORTUNITY_DELETE_FAIL,
    payload: err,
  };
};

export const opportunityGetInviteCode = (payload) => {
  return async (dispatch) => {
    dispatch(opportunityGetInviteCodeRequest());
    try {
      const { data } = await authorizedPost(
        `${opportunityURL()}/user/invite`,
        payload
      );

      dispatch(opportunityGetInviteCodeSuccess(data.inviteCode));

      return data?.inviteCode;
    } catch (error) {
      bugsnagNotify(error);
      dispatch(
        opportunityGetInviteCodeFail(
          error.message || "Error getting invite code for opportunity"
        )
      );

      return false;
    }
  };
};

const opportunityGetInviteCodeRequest = () => {
  return {
    type: OPPORTUNITY_GET_INVITE_CODE_REQUEST,
  };
};

const opportunityGetInviteCodeSuccess = (payload) => {
  return {
    type: OPPORTUNITY_GET_INVITE_CODE_SUCCESS,
    payload,
  };
};

const opportunityGetInviteCodeFail = (payload) => {
  return {
    type: OPPORTUNITY_GET_INVITE_CODE_FAIL,
    payload,
  };
};

export const opportunityGetInviteCodeReset = () => {
  return {
    type: OPPORTUNITY_GET_INVITE_CODE_RESET,
  };
};

export const opportunityShareLink = ({ opportunityId, opportunityName }) => {
  return async (dispatch, getState) => {
    dispatch(opportunityShareLinkRequest());
    try {
      const inviteCode = await dispatch(
        opportunityGetInviteCode({ opportunity_id: opportunityId })
      );
      if (!inviteCode) throw new Error("Fetch invite code failed");
      dispatch(opportunityShareLinkOpenSheet());
      const userFirstName = getState()?.user?.appUser?.firstName || "Someone";
      const inviteSuccess = await showOpportunityInviteShareSheet({
        inviteCode,
        opportunityId,
        opportunityName,
        userFirstName,
      });
      dispatch(opportunityShareLinkSuccess(inviteSuccess));
    } catch (error) {
      bugsnagNotify(error);
      dispatch(
        opportunityShareLinkFail(
          error?.message || "Error creating opportunity invite"
        )
      );
    }
  };
};

const opportunityShareLinkRequest = () => {
  return {
    type: OPPORTUNITY_SHARE_LINK,
  };
};

const opportunityShareLinkSuccess = (payload) => {
  return {
    type: OPPORTUNITY_SHARE_LINK_SUCCESS,
    payload,
  };
};

const opportunityShareLinkFail = (payload) => {
  return {
    type: OPPORTUNITY_SHARE_LINK_FAIL,
    payload,
  };
};

const opportunityShareLinkOpenSheet = (payload) => {
  return {
    type: OPPORTUNITY_SHARE_LINK_OPEN_SHEET,
    payload,
  };
};

export const opportunityBranchJoinLink = (payload) => {
  return {
    type: OPPORTUNITY_BRANCH_JOIN_LINK,
    payload,
  };
};

export const opportunityBranchReset = () => {
  return {
    type: OPPORTUNITY_BRANCH_JOIN_LINK_RESET,
  };
};

// Add invited user
export const opportunityInviteAccept = ({
  opportunityId,
  opportunityName,
  inviteCode,
}) => {
  return async (dispatch) => {
    dispatch(opportunityInviteAcceptRequest());
    try {
      await authorizedPost(`${opportunityURL()}/user/invite_accept`, {
        opportunity_id: opportunityId,
        invite_code: inviteCode,
      });
      await dispatch(opportunityCurrentReset());
      await dispatch(opportunityGet({ opportunity_id: opportunityId }));
      navigateReset({
        index: 0,
        routes: [
          { name: SCREENS.appStack.activities },
          { name: SCREENS.appStack.opportunities },
          {
            name: SCREENS.appStack.opportunityDetail,
            params: { opportunityId, opportunityName },
          },
        ],
      });
      dispatch(opportunityInviteAcceptSuccess());
      dispatch(opportunityBranchReset());
    } catch (error) {
      // Below is a ugly fix for now until we get better api responses that can
      // depend on to create a stable object which can map errors to messages
      let message = error.response?.data?.message;
      if (message === "request unauthenticated") {
        message =
          "The invite link is no longer valid or has already been used.";
      } else if (
        message === "sql: no rows in result set" ||
        message === "opportunity is not active"
      ) {
        message = "That opportunity is no longer available.";
      } else if (
        message === "Unable to join opportunity. You are already a member."
      ) {
        message = "You are already a member of that opportunity.";
      } else {
        bugsnagNotify(error);
        message =
          "There was an error joining the opportunity. Please contact support if the problem persists.";
      }
      navigate(SCREENS.appStack.opportunities);
      dispatch(
        snackbarAddMessageToQueue({
          message,
          type: SNACKBAR_TYPES.error,
        })
      );
      dispatch(
        opportunityInviteAcceptFail({
          error: true,
          message,
        })
      );
    }
  };
};

export const opportunityInviteAcceptRequest = () => {
  return {
    type: OPPORTUNITY_INVITE_ACCEPTED_REQUEST,
  };
};

export const opportunityInviteAcceptSuccess = (payload) => {
  return {
    type: OPPORTUNITY_INVITE_ACCEPTED_SUCCESS,
    payload: payload,
  };
};

export const opportunityInviteAcceptFail = (err) => {
  return {
    type: OPPORTUNITY_INVITE_ACCEPTED_FAIL,
    payload: err,
  };
};

export const opportunityContactCreate = (payload) => {
  return async (dispatch) => {
    dispatch(opportunityContactCreateRequest(payload));
    try {
      const { data } = await authorizedPost(
        `${opportunityURL()}/contact/set`,
        payload
      );
      dispatch(opportunityContactCreateSuccess(data));
      return true;
    } catch (error) {
      bugsnagNotify(error);
      dispatch(
        opportunityContactCreateFail({
          error: true,
          message: error?.message || "Error creating the opportunity contact",
        })
      );
      return false;
    }
  };
};

export const opportunityContactCreateRequest = (payload) => {
  return {
    type: OPPORTUNITY_CONTACT_CREATE,
    payload,
  };
};

export const opportunityContactCreateSuccess = (payload) => {
  return {
    type: OPPORTUNITY_CONTACT_CREATE_SUCCESS,
    payload,
  };
};

export const opportunityContactCreateFail = (err) => {
  return {
    type: OPPORTUNITY_CONTACT_CREATE_FAIL,
    payload: err,
  };
};

export const opportunityContactCreateReset = () => {
  return {
    type: OPPORTUNITY_CONTACT_CREATE_RESET,
  };
};

export const opportunityContactEdit = (payload) => {
  return async (dispatch) => {
    dispatch(opportunityContactEditRequest(payload));
    try {
      const { data } = await authorizedPost(
        `${opportunityURL()}/contact/update`,
        payload
      );
      dispatch(opportunityContactEditSuccess(data));
    } catch (error) {
      bugsnagNotify(error);
      dispatch(
        opportunityContactEditFail({
          error: true,
          message: error?.message || "Error editing the opportunity contact",
        })
      );
    }
  };
};

export const opportunityContactEditRequest = (payload) => {
  return {
    type: OPPORTUNITY_CONTACT_EDIT,
    payload,
  };
};

export const opportunityContactEditSuccess = (payload) => {
  return {
    type: OPPORTUNITY_CONTACT_EDIT_SUCCESS,
    payload,
  };
};

export const opportunityContactEditFail = (err) => {
  return {
    type: OPPORTUNITY_CONTACT_EDIT_FAIL,
    payload: err,
  };
};

export const opportunityContactEditReset = () => {
  return {
    type: OPPORTUNITY_CONTACT_EDIT_RESET,
  };
};
