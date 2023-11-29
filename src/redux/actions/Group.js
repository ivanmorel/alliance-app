import { snackbarAddMessageToQueue } from "@actions";
import {
  GROUP_ADD,
  GROUP_ADD_FAIL,
  GROUP_ADD_SUCCESS,
  GROUP_BRANCH_JOIN_LINK,
  GROUP_BRANCH_RESET,
  GROUP_CREATE_FORM,
  GROUP_CREATE_FORM_RESET,
  GROUP_CREATE_PRIVATE,
  GROUP_CREATE_PRIVATE_FAIL,
  GROUP_CREATE_PRIVATE_SUCCESS,
  GROUP_DELETE_FAIL,
  GROUP_DELETE_REQUEST,
  GROUP_DELETE_RESET,
  GROUP_DELETE_SUCCESS,
  GROUP_EXPAND_NETWORK,
  GROUP_EXPAND_NETWORK_FAIL,
  GROUP_EXPAND_NETWORK_SUCCESS,
  GROUP_FETCH_INVITE_CODE_FAIL,
  GROUP_FETCH_INVITE_CODE_REQUEST,
  GROUP_FETCH_INVITE_CODE_RESET,
  GROUP_FETCH_INVITE_CODE_SUCCESS,
  GROUP_FETCH_USERS,
  GROUP_FETCH_USERS_SUCCESS,
  GROUP_INVITE_USER,
  GROUP_INVITE_USER_FAIL,
  GROUP_INVITE_USER_RESET,
  GROUP_INVITE_USER_SUCCESS,
  GROUP_LEAVE_FAIL,
  GROUP_LEAVE_REQUEST,
  GROUP_LEAVE_SUCCESS,
  GROUP_LIST,
  GROUP_LIST_FAIL,
  GROUP_LIST_SUCCESS,
  GROUP_REMOVE_FAIL,
  GROUP_REMOVE_SUCCESS,
  GROUP_RESET_USERS,
  GROUP_SET_SELECTED_GROUP,
  GROUP_SHARE_INVITE_LINK,
  GROUP_SHARE_INVITE_LINK_FAIL,
  GROUP_SHARE_INVITE_LINK_OPEN_SHEET,
  GROUP_SHARE_INVITE_LINK_SUCCESS,
} from "@constants";

import { showGroupInviteShareSheet } from "@services/branchLinks";
import { bugsnagNotify } from "@services/bugsnag";
import {
  getGroupWithLeadInfo,
  listGroup,
  listGroupWithLeadInfo,
} from "@services/GroupService";
import { getGroupUserWithRatingAndSubmittedLeads } from "@services/UserService";

import { navigate, navigateReset } from "@routes/navigator";
import { SCREENS } from "@routes/routes.constants";

import { authorizedPost, groupURL, notificationURL } from "@utils/api";
import { SNACKBAR_TYPES } from "@utils/constants";

export const fetchGroup = (payload) => {
  return async (dispatch) => {
    const data = await getGroupWithLeadInfo(payload);

    dispatch(setSelectedGroup(data));
  };
};

export const resetGroup = () => {
  return {
    type: GROUP_SET_SELECTED_GROUP,
    payload: {},
  };
};

export const resetGroupUsers = () => {
  return {
    type: GROUP_RESET_USERS,
  };
};

// expand network
export const groupExpandNetwork = (payload) => {
  return (dispatch) => {
    dispatch(groupExpandNetworkRequest());
    authorizedPost(`${notificationURL()}/expand_network`, payload)
      .then((response) => {
        dispatch(groupExpandNetworkSuccess(response.data));
      })
      .catch((error) => {
        bugsnagNotify(error);
        dispatch(
          groupExpandNetworkFail({
            error: true,
            message: error.response ? error.response.data.message : "error",
          })
        );
      });
  };
};

export const groupExpandNetworkRequest = () => {
  return {
    type: GROUP_EXPAND_NETWORK,
  };
};

export const groupExpandNetworkSuccess = (payload) => {
  return {
    type: GROUP_EXPAND_NETWORK_SUCCESS,
    payload: payload,
  };
};

export const groupExpandNetworkFail = (err) => {
  return {
    type: GROUP_EXPAND_NETWORK_FAIL,
    payload: err,
  };
};

// Add invited user
export const groupAddInvited = (payload) => {
  return async (dispatch) => {
    dispatch(groupAddRequest());
    try {
      await authorizedPost(`${groupURL()}/add_invited`, payload);
      dispatch(setSelectedGroup({ groupId: payload.groupId }));

      navigateReset({
        index: 0,
        routes: [
          { name: SCREENS.appStack.activities },
          { name: SCREENS.appStack.groups },
          { name: SCREENS.appStack.group },
        ],
      });
      dispatch(groupAddSuccess());
    } catch (error) {
      // Below is a ugly fix for now until we get better api responses that can
      // depend on to create a stable object which can map errors to messages
      let message = error.response?.data?.message;
      if (message === "request unauthenticated") {
        message =
          "The invite link is no longer valid or has already been used.";
      } else if (
        message === "sql: no rows in result set" ||
        message === "group is not active"
      ) {
        message = "That group is no longer available.";
      } else if (
        message === "Unable to join group. You are already a member."
      ) {
        message = "You are already a member of that group.";
      } else {
        bugsnagNotify(error);
        message =
          "There was an error joining the group. Please contact support if the problem persists.";
      }
      navigate(SCREENS.appStack.groups);
      dispatch(
        snackbarAddMessageToQueue({ message, type: SNACKBAR_TYPES.error })
      );
      dispatch(
        groupAddFail({
          error: true,
          message,
        })
      );
    }
  };
};

export const groupAddRequest = () => {
  return {
    type: GROUP_ADD,
  };
};

export const groupAddSuccess = (payload) => {
  return {
    type: GROUP_ADD_SUCCESS,
    payload: payload,
  };
};

export const groupAddFail = (err) => {
  return {
    type: GROUP_ADD_FAIL,
    payload: err,
  };
};

// Create private group
export const groupCreatePrivate = ({ name, description, product, target }) => {
  return (dispatch) => {
    dispatch(groupCreatePrivateRequest());
    authorizedPost(`${groupURL()}/create_private`, {
      name,
      description,
      product,
      target,
      group_type: "PRIVATE",
    })
      .then((response) => {
        dispatch(groupCreatePrivateSuccess(response.data));
        dispatch(groupList());
        dispatch(groupCreateFormReset());
        dispatch(setSelectedGroup({ groupId: response.data?.groupId }));
        navigateReset({
          index: 0,
          routes: [
            { name: SCREENS.appStack.activities },
            { name: SCREENS.appStack.groups },
            {
              name: SCREENS.appStack.group,
            },
          ],
        });
      })
      .catch((error) => {
        bugsnagNotify(error);
        dispatch(
          groupCreatePrivateFail({
            error: true,
            message: error.response ? error.response.data.message : "error",
          })
        );
      });
  };
};

export const groupCreatePrivateRequest = () => {
  return {
    type: GROUP_CREATE_PRIVATE,
  };
};

export const groupCreatePrivateSuccess = (payload) => {
  return {
    type: GROUP_CREATE_PRIVATE_SUCCESS,
    payload: payload,
  };
};

export const groupCreatePrivateFail = (err) => {
  return {
    type: GROUP_CREATE_PRIVATE_FAIL,
    payload: err,
  };
};

export const groupCreateForm = (payload) => {
  return {
    type: GROUP_CREATE_FORM,
    payload,
  };
};

export const groupCreateFormReset = () => {
  return {
    type: GROUP_CREATE_FORM_RESET,
  };
};

//
// LIST
//
export const groupList = (position = 1, count = 10, isPaginated = false) => {
  return async (dispatch) => {
    dispatch(groupListRequest());

    try {
      const groups = await listGroup(position, count);

      dispatch(groupListSuccess(groups, isPaginated));
    } catch (error) {
      bugsnagNotify(error);
      dispatch(
        groupListFail({
          error: true,
          message: error.message,
        })
      );
    }
  };
};

export const groupListWithLeadInfo = (
  position = 1,
  count = 10,
  isPaginated = false
) => {
  return async (dispatch) => {
    dispatch(groupListRequest());

    try {
      const groups = await listGroupWithLeadInfo(position, count);

      dispatch(groupListSuccess(groups, isPaginated));
    } catch (error) {
      bugsnagNotify(error);
      dispatch(
        groupListFail({
          error: true,
          message: error.message,
        })
      );
    }
  };
};

export const groupListRequest = (payload) => {
  return {
    type: GROUP_LIST,
    payload: payload,
  };
};

export const groupListSuccess = (response, paginated) => {
  return {
    type: GROUP_LIST_SUCCESS,
    payload: response,
    paginated,
  };
};

export const groupListFail = (err) => {
  return {
    type: GROUP_LIST_FAIL,
    payload: err,
  };
};

export const removeGroupFail = (error) => {
  return {
    type: GROUP_REMOVE_FAIL,
    payload: error,
  };
};

export const removeGroupSuccess = (payload) => {
  return {
    type: GROUP_REMOVE_SUCCESS,
    payload,
  };
};

export const removeUser = (payload) => {
  return (dispatch) => {
    authorizedPost(`${groupURL()}/remove`, payload)
      .then((response) => {
        dispatch(listGroupUsers(payload));
        dispatch(removeGroupSuccess(response.data || {}));
        dispatch(
          snackbarAddMessageToQueue({
            message: "User has been removed",
            type: SNACKBAR_TYPES.error,
          })
        );
      })
      .catch((error) => {
        bugsnagNotify(error);
        dispatch(
          removeGroupFail({
            error: true,
            message: error.response ? error.response.data.message : "error",
          })
        );
      });
  };
};

export const inviteUser = () => {
  return {
    type: GROUP_INVITE_USER,
  };
};

export const inviteUserFail = (error) => {
  return {
    type: GROUP_INVITE_USER_FAIL,
    payload: error,
  };
};

export const inviteUserReset = () => {
  return {
    type: GROUP_INVITE_USER_RESET,
  };
};

export const inviteUserSuccess = () => {
  return {
    type: GROUP_INVITE_USER_SUCCESS,
  };
};

export const inviteUserToGroup = (payload) => {
  return (dispatch) => {
    dispatch(inviteUser());
    authorizedPost(`${groupURL()}/invite`, payload)
      .then(() => {
        dispatch(inviteUserSuccess());
      })
      .catch((error) => {
        bugsnagNotify(error);
        dispatch(
          inviteUserFail({
            error: true,
            message: error.response ? error.response.data.message : "error",
          })
        );
      });
  };
};

export const listGroupUsers = ({ groupId }) => {
  return (dispatch) => {
    dispatch(fetchGroupUsersRequest());
    try {
      getGroupUserWithRatingAndSubmittedLeads(groupId).then((users) =>
        dispatch(fetchGroupUsersSuccess(users))
      );
    } catch (error) {
      bugsnagNotify(error);
      dispatch(fetchGroupUsersFail(error));
    }
  };
};

export const fetchGroupUsersRequest = () => {
  return {
    type: GROUP_FETCH_USERS,
  };
};

export const fetchGroupUsersSuccess = (payload) => {
  return {
    type: GROUP_FETCH_USERS_SUCCESS,
    payload,
  };
};

export const fetchGroupUsersFail = (error) => {
  return {
    type: GROUP_FETCH_USERS_SUCCESS,
    payload: error,
  };
};

export const setSelectedGroup = (payload) => {
  return {
    type: GROUP_SET_SELECTED_GROUP,
    payload,
  };
};

export const deleteGroup = (payload) => {
  return async (dispatch) => {
    dispatch(deleteGroupRequest());
    try {
      await authorizedPost(`${groupURL()}/delete`, payload);
      dispatch(groupList());
      dispatch(
        snackbarAddMessageToQueue({
          message: "You deleted the group",
          type: SNACKBAR_TYPES.error,
        })
      );
      dispatch(deleteGroupSuccess());
      dispatch(deleteGroupReset());
    } catch (error) {
      bugsnagNotify(error);
      dispatch(
        deleteGroupFail(
          "Failed to delete the group. If the problem persists, please contact support@allianceapp.com"
        )
      );
    }
  };
};

const deleteGroupRequest = () => {
  return {
    type: GROUP_DELETE_REQUEST,
  };
};

const deleteGroupSuccess = () => {
  navigate(SCREENS.appStack.groups);
  return {
    type: GROUP_DELETE_SUCCESS,
  };
};

const deleteGroupFail = (error) => {
  return {
    type: GROUP_DELETE_FAIL,
    payload: error,
  };
};

export const deleteGroupReset = () => {
  return {
    type: GROUP_DELETE_RESET,
  };
};

export const fetchInviteCode = (payload) => {
  return async (dispatch) => {
    dispatch(fetchInviteCodeRequest());
    try {
      const { data } = await authorizedPost(`${groupURL()}/invite`, payload);

      dispatch(fetchInviteCodeSuccess(data.inviteCode));

      return data?.inviteCode;
    } catch (error) {
      bugsnagNotify(error);
      dispatch(
        fetchInviteCodeFail(error.response || "Error getting group invite code")
      );

      return false;
    }
  };
};

const fetchInviteCodeRequest = () => {
  return {
    type: GROUP_FETCH_INVITE_CODE_REQUEST,
  };
};

const fetchInviteCodeSuccess = (payload) => {
  return {
    type: GROUP_FETCH_INVITE_CODE_SUCCESS,
    payload,
  };
};

const fetchInviteCodeFail = (payload) => {
  return {
    type: GROUP_FETCH_INVITE_CODE_FAIL,
    payload,
  };
};

export const fetchInviteCodeReset = () => {
  return {
    type: GROUP_FETCH_INVITE_CODE_RESET,
  };
};

export const groupShareInviteLink = ({ groupName, groupId }) => {
  return async (dispatch, getState) => {
    dispatch(groupShareInviteLinkRequest());
    try {
      const inviteCode = await dispatch(fetchInviteCode({ group_id: groupId }));
      if (!inviteCode) throw new Error("Fetch invite code failed");
      dispatch(groupShareInviteLinkOpenSheet());
      const userFirstName = getState()?.user?.appUser?.firstName || "Someone";
      const inviteSuccess = await showGroupInviteShareSheet({
        userFirstName,
        groupName,
        groupId,
        inviteCode,
      });
      dispatch(groupShareInviteLinkSuccess(inviteSuccess));
      if (inviteSuccess) dispatch(inviteUserReset());
    } catch (error) {
      bugsnagNotify(error);
      dispatch(
        groupShareInviteLinkFail(
          error?.message || "Error creating group invite"
        )
      );
    }
  };
};

const groupShareInviteLinkRequest = () => {
  return {
    type: GROUP_SHARE_INVITE_LINK,
  };
};

const groupShareInviteLinkOpenSheet = (payload) => {
  return {
    type: GROUP_SHARE_INVITE_LINK_OPEN_SHEET,
    payload,
  };
};

const groupShareInviteLinkSuccess = (payload) => {
  return {
    type: GROUP_SHARE_INVITE_LINK_SUCCESS,
    payload,
  };
};

const groupShareInviteLinkFail = (payload) => {
  return {
    type: GROUP_SHARE_INVITE_LINK_FAIL,
    payload,
  };
};

export const branchJoinGroupLink = (payload) => {
  return {
    type: GROUP_BRANCH_JOIN_LINK,
    payload,
  };
};

export const branchReset = () => {
  return {
    type: GROUP_BRANCH_RESET,
  };
};

export const leaveGroup = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(leaveGroupRequest());
      await authorizedPost(`${groupURL()}/remove`, payload);
      navigate(SCREENS.appStack.groups);
      dispatch(
        snackbarAddMessageToQueue({
          message: "You left the group",
          type: SNACKBAR_TYPES.error,
        })
      );
      dispatch(leaveGroupSuccess());
    } catch (e) {
      bugsnagNotify(e);
      dispatch(leaveGroupFail(e));
    }
  };
};

const leaveGroupRequest = () => {
  return {
    type: GROUP_LEAVE_REQUEST,
  };
};

const leaveGroupSuccess = (payload) => {
  return {
    type: GROUP_LEAVE_SUCCESS,
    payload,
  };
};

const leaveGroupFail = (payload) => {
  return {
    type: GROUP_LEAVE_FAIL,
    payload,
  };
};
