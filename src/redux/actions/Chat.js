import {
  CHAT_ADD_USERS,
  CHAT_ADD_USERS_FAIL,
  CHAT_ADD_USERS_SUCCESS,
  CHAT_CREATE_ROOM,
  CHAT_CREATE_ROOM_FAIL,
  CHAT_CREATE_ROOM_SUCCESS,
  CHAT_FETCH_ATTACHMENTS,
  CHAT_FETCH_ATTACHMENTS_FAIL,
  CHAT_FETCH_ATTACHMENTS_SUCCESS,
  CHAT_FETCH_ROOM,
  CHAT_FETCH_ROOM_FAIL,
  CHAT_FETCH_ROOM_SUCCESS,
  CHAT_GET_CONNECTIONS,
  CHAT_GET_CONNECTIONS_FAIL,
  CHAT_GET_CONNECTIONS_SUCCESS,
  CHAT_GET_STREAM_CONNECT,
  CHAT_GET_STREAM_CONNECT_FAIL,
  CHAT_GET_STREAM_CONNECT_RESET,
  CHAT_GET_STREAM_CONNECT_SUCCESS,
  CHAT_GET_STREAM_DISCONNECT_SUCCESS,
  CHAT_REMOVE_USER,
  CHAT_REMOVE_USER_FAIL,
  CHAT_REMOVE_USER_SUCCESS,
  CHAT_ROOM_LIST,
  CHAT_ROOM_LIST_FAIL,
  CHAT_ROOM_LIST_RESET,
  CHAT_ROOM_LIST_SUCCESS,
  CHAT_SNACKBAR_TEXT_RESET,
  CHAT_UPDATE_ROOM,
  CHAT_UPDATE_ROOM_FAIL,
  CHAT_UPDATE_ROOM_SUCCESS,
  DOWNLOAD_FILE_ERROR,
  DOWNLOAD_FILE_REQUEST,
  DOWNLOAD_FILE_RESET,
  DOWNLOAD_FILE_SUCCESS,
} from "@constants";

import { bugsnagNotify } from "@services/bugsnag";
import { client } from "@services/getStream";

import { assetURL, authorizedPost, chatURL, connectionsUrl } from "@utils/api";
import {
  CHAT_CONNECT_MAX_ATTEMPTS,
  OSR_FOLDER_NAME,
  ROOM_TYPES,
} from "@utils/constants";
import { downloadToFolder, wait } from "@utils/utils";

export const chatGetStreamConnect = (previousError) => {
  return async (dispatch, getState) => {
    const chatState = getState()?.chat;
    const isMaxAttempts =
      chatState.getStreamConnectionAttempts > CHAT_CONNECT_MAX_ATTEMPTS;
    try {
      if (isMaxAttempts) {
        throw new Error("Maximum attempts to connect to chat reached");
      }

      dispatch(chatGetStreamConnectRequest(previousError));

      if (client?.userID > 0) {
        dispatch(chatGetStreamConnectSuccess());
        return true;
      }

      const { data } = await authorizedPost(`${chatURL()}/generate_token`);
      const id = getState()?.user?.userId;
      const token = data?.token;
      await client.connectUser({ id: id.toString() }, token);
      dispatch(chatGetStreamConnectSuccess());
      return true;
    } catch (error) {
      if (!isMaxAttempts) {
        await wait(1000);
        dispatch(chatGetStreamConnect(error?.stack));
      } else {
        dispatch(
          chatGetStreamConnectFail({ error, getStreamError: previousError })
        );
        bugsnagNotify(error);
      }
      return false;
    }
  };
};

export const chatGetStreamConnectRequest = (payload) => {
  return {
    type: CHAT_GET_STREAM_CONNECT,
    payload,
  };
};

export const chatGetStreamConnectSuccess = () => {
  return {
    type: CHAT_GET_STREAM_CONNECT_SUCCESS,
  };
};

export const chatGetStreamConnectFail = (err) => {
  return {
    type: CHAT_GET_STREAM_CONNECT_FAIL,
    payload: err,
  };
};

export const chatGetStreamConnectReset = () => {
  return {
    type: CHAT_GET_STREAM_CONNECT_RESET,
  };
};

export const chatGetStreamDisconnect = () => {
  return async (dispatch) => {
    try {
      dispatch(chatGetStreamConnectReset());
      await client.disconnectUser();
      dispatch(chatGetStreamDisconnectSuccess());
    } catch (error) {
      // Swallow this error
    }
  };
};

export const chatGetStreamDisconnectSuccess = (payload) => {
  return {
    type: CHAT_GET_STREAM_DISCONNECT_SUCCESS,
    payload,
  };
};

export const chatRoomList = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(chatRoomListRequest());
      const response = await authorizedPost(`${chatURL()}/room/list`, payload);
      dispatch(chatRoomListSuccess(response.data));
      return response?.data;
    } catch (error) {
      bugsnagNotify(error);
      dispatch(chatRoomListFail(error));
      return [];
    }
  };
};

export const chatRoomListReset = () => {
  return {
    type: CHAT_ROOM_LIST_RESET,
  };
};

export const chatRoomListRequest = () => {
  return {
    type: CHAT_ROOM_LIST,
  };
};

export const chatRoomListSuccess = (payload) => {
  return {
    type: CHAT_ROOM_LIST_SUCCESS,
    payload: payload,
  };
};

export const chatRoomListFail = (err) => {
  return {
    type: CHAT_ROOM_LIST_FAIL,
    payload: err,
  };
};

export const downloadFile = ({ assetId }) => {
  return async (dispatch) => {
    dispatch(downloadFileRequest());
    try {
      const {
        data: { s3SignedUrl, fileName },
      } = await authorizedPost(`${assetURL()}/get_secure`, { assetId });

      downloadToFolder(s3SignedUrl, fileName, OSR_FOLDER_NAME);
      dispatch(downloadFileSuccess());
    } catch (error) {
      dispatch(downloadFileError(error));
    }
  };
};

const downloadFileRequest = () => {
  return {
    type: DOWNLOAD_FILE_REQUEST,
  };
};

const downloadFileSuccess = (payload) => {
  return {
    type: DOWNLOAD_FILE_SUCCESS,
    payload,
  };
};

const downloadFileError = (err) => {
  return {
    type: DOWNLOAD_FILE_ERROR,
    payload: err,
  };
};

export const downloadFileReset = () => {
  return {
    type: DOWNLOAD_FILE_RESET,
  };
};

export const chatSnackbarTextReset = () => {
  return {
    type: CHAT_SNACKBAR_TEXT_RESET,
  };
};

export const chatGetConnections = () => {
  return async (dispatch) => {
    dispatch(chatGetConnectionsRequest());
    try {
      const { data } = await authorizedPost(`${connectionsUrl()}/users/list`);
      dispatch(chatGetConnectionsSuccess(data.users));
      return true;
    } catch (error) {
      bugsnagNotify(error);
      dispatch(chatGetConnectionsFail(error));
      return false;
    }
  };
};

export const chatGetConnectionsRequest = () => {
  return {
    type: CHAT_GET_CONNECTIONS,
  };
};

export const chatGetConnectionsSuccess = (payload) => {
  return {
    type: CHAT_GET_CONNECTIONS_SUCCESS,
    payload,
  };
};

export const chatGetConnectionsFail = (err) => {
  return {
    type: CHAT_GET_CONNECTIONS_FAIL,
    payload: err,
  };
};

export const createChatRoom = ({
  users,
  groupingLevel,
  groupingLevelId,
  chatName,
}) => {
  return async (dispatch) => {
    dispatch(chatRoomCreate());
    try {
      const requestData = {
        room_type: ROOM_TYPES.userCreated,
        grouping_level: groupingLevel,
        grouping_level_id: groupingLevelId,
        user_ids: users,
        room_name: chatName,
      };
      const { data } = await authorizedPost(
        `${chatURL()}/room/create`,
        requestData
      );
      dispatch(chatRoomCreateSuccess(data));
      return data;
    } catch (error) {
      bugsnagNotify(error);
      dispatch(chatRoomCreateFail(error));
      // Error code for when there's a room with the exact same users
      if (error.response?.data?.code === 3) {
        return "There already exists a chat room with the same users";
      }

      return "There was an error creating the chat room, please try again later";
    }
  };
};

const chatRoomCreate = () => {
  return {
    type: CHAT_CREATE_ROOM,
  };
};

export const chatRoomCreateSuccess = (payload) => {
  return {
    type: CHAT_CREATE_ROOM_SUCCESS,
    payload,
  };
};

export const chatRoomCreateFail = (err) => {
  return {
    type: CHAT_CREATE_ROOM_FAIL,
    payload: err,
  };
};

export const chatAddUsers = ({ roomId, users, createNewRoom }) => {
  return async (dispatch) => {
    dispatch(chatAddUsersRequest());
    try {
      const { data } = await authorizedPost(`${chatURL()}/room/add_users`, {
        room_id: roomId,
        user_ids: users,
        create_new_room: createNewRoom,
      });

      dispatch(chatAddUsersSuccess(data));
      return data;
    } catch (error) {
      bugsnagNotify(error);
      dispatch(chatAddUsersFail(error));
      return "There was an error adding users to the chat room, please try again later";
    }
  };
};

const chatAddUsersRequest = () => {
  return {
    type: CHAT_ADD_USERS,
  };
};

const chatAddUsersSuccess = (payload) => {
  return {
    type: CHAT_ADD_USERS_SUCCESS,
    payload,
  };
};

const chatAddUsersFail = (err) => {
  return {
    type: CHAT_ADD_USERS_FAIL,
    payload: err,
  };
};

export const chatRemoveUserFromRoom = ({ roomId, userId }) => {
  return async (dispatch) => {
    dispatch(chatRemoveUserFromRoomRequest());
    try {
      const { data } = await authorizedPost(`${chatURL()}/room/remove_users`, {
        room_id: roomId,
        user_ids: [userId],
      });

      dispatch(chatRemoveUserFromRoomSuccess(data));
      return true;
    } catch (error) {
      bugsnagNotify(error);
      dispatch(chatRemoveUserFromRoomFail(error));
      return false;
    }
  };
};

const chatRemoveUserFromRoomRequest = () => {
  return {
    type: CHAT_REMOVE_USER,
  };
};

const chatRemoveUserFromRoomSuccess = (payload) => {
  return {
    type: CHAT_REMOVE_USER_SUCCESS,
    payload,
  };
};

const chatRemoveUserFromRoomFail = (err) => {
  return {
    type: CHAT_REMOVE_USER_FAIL,
    payload: err,
  };
};

export const chatFetchAttachments = ({ roomId }) => {
  return async (dispatch) => {
    dispatch(chatFetchAttachmentsRequest());
    try {
      const { data } = await authorizedPost(`${chatURL()}/message/list`, {
        list_message_type: "LIST_MESSAGE_TYPE_ATTACHMENT",
        room_id: roomId,
      });

      dispatch(chatFetchAttachmentsSuccess(data));
      return true;
    } catch (error) {
      bugsnagNotify(error);
      dispatch(chatFetchAttachmentsFail(error));
      return false;
    }
  };
};

const chatFetchAttachmentsRequest = () => {
  return {
    type: CHAT_FETCH_ATTACHMENTS,
  };
};

const chatFetchAttachmentsSuccess = (payload) => {
  return {
    type: CHAT_FETCH_ATTACHMENTS_SUCCESS,
    payload,
  };
};

const chatFetchAttachmentsFail = (err) => {
  return {
    type: CHAT_FETCH_ATTACHMENTS_FAIL,
    payload: err,
  };
};

export const chatUpdateRoom = ({ roomId, roomName }) => {
  return async (dispatch) => {
    dispatch(chatUpdateRoomRequest());
    try {
      const { data } = await authorizedPost(`${chatURL()}/room/update`, {
        room_id: roomId,
        name: roomName,
      });

      dispatch(chatUpdateRoomSuccess(data));
      return true;
    } catch (error) {
      bugsnagNotify(error);
      dispatch(chatUpdateRoomFail(error));
      return false;
    }
  };
};

const chatUpdateRoomRequest = () => {
  return {
    type: CHAT_UPDATE_ROOM,
  };
};

const chatUpdateRoomSuccess = (payload) => {
  return {
    type: CHAT_UPDATE_ROOM_SUCCESS,
    payload,
  };
};

const chatUpdateRoomFail = (err) => {
  return {
    type: CHAT_UPDATE_ROOM_FAIL,
    payload: err,
  };
};

export const chatFetchRoom = ({ roomId }) => {
  return async (dispatch) => {
    dispatch(chatFetchRoomRequest());
    try {
      const { data } = await authorizedPost(`${chatURL()}/room/get`, {
        room_id: roomId,
      });

      dispatch(chatFetchRoomSuccess(data));
      return true;
    } catch (error) {
      bugsnagNotify(error);
      dispatch(chatFetchRoomFail(error));
      return false;
    }
  };
};

const chatFetchRoomRequest = () => {
  return {
    type: CHAT_FETCH_ROOM,
  };
};

export const chatFetchRoomSuccess = (payload) => {
  return {
    type: CHAT_FETCH_ROOM_SUCCESS,
    payload,
  };
};

const chatFetchRoomFail = (err) => {
  return {
    type: CHAT_FETCH_ROOM_FAIL,
    payload: err,
  };
};
