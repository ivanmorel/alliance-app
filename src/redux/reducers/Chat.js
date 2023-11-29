import {
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
  CHAT_ROOM_LIST,
  CHAT_ROOM_LIST_FAIL,
  CHAT_ROOM_LIST_RESET,
  CHAT_ROOM_LIST_SUCCESS,
  CHAT_SNACKBAR_TEXT_RESET,
  CHAT_UPDATE_ROOM_SUCCESS,
  DOWNLOAD_FILE_ERROR,
  DOWNLOAD_FILE_REQUEST,
  DOWNLOAD_FILE_RESET,
  DOWNLOAD_FILE_SUCCESS,
} from "@constants";

const INIT_STATE = {
  currentUser: null,
  error: null,
  loading: false,
  attachmentLoading: false,
  attachments: [],
  rooms: [],
  messages: [],
  connections: [],
  leadMessages: {},
  currentRoom: {},
  getStreamConnectionAttempts: 0,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CHAT_GET_STREAM_CONNECT:
      return {
        ...state,
        loading: true,
        getStreamPreviousError: action.payload,
        getStreamConnectionAttempts: state.getStreamConnectionAttempts + 1,
      };
    case CHAT_GET_STREAM_CONNECT_SUCCESS:
      return {
        ...state,
        loading: false,
        getStreamConnectionAttempts: 0,
      };
    case CHAT_GET_STREAM_CONNECT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CHAT_GET_STREAM_CONNECT_RESET:
      return {
        ...state,
        loading: false,
        error: null,
        getStreamConnectionAttempts: 0,
      };

    case CHAT_ROOM_LIST:
      return {
        ...state,
        messages: [],
        loading: true,
      };

    case CHAT_ROOM_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        rooms: action.payload.rooms,
      };

    case CHAT_ROOM_LIST_RESET:
      return {
        ...state,
        rooms: [],
      };

    case CHAT_ROOM_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DOWNLOAD_FILE_SUCCESS: {
      return {
        ...state,
        error: null,
        downloadFeedbackAndroid: "File downloaded successfully",
      };
    }

    case DOWNLOAD_FILE_REQUEST: {
      return {
        ...state,
        error: null,
        downloadFeedbackAndroid: "Downloading file...",
      };
    }

    case DOWNLOAD_FILE_ERROR: {
      return {
        ...state,
        error: action.payload,
        mediaFeedback: "Error while downloading file",
      };
    }

    case DOWNLOAD_FILE_RESET: {
      return {
        ...state,
        error: null,
        downloadFeedbackAndroid: "",
      };
    }

    case CHAT_SNACKBAR_TEXT_RESET: {
      return {
        ...state,
        error: null,
        mediaFeedback: "",
      };
    }

    case CHAT_GET_CONNECTIONS_FAIL:
    case CHAT_GET_CONNECTIONS: {
      return {
        ...state,
        connections: [],
      };
    }

    case CHAT_GET_CONNECTIONS_SUCCESS: {
      return {
        ...state,
        connections: action.payload,
      };
    }

    case CHAT_FETCH_ATTACHMENTS_FAIL:
    case CHAT_FETCH_ATTACHMENTS: {
      return { ...state, attachments: [] };
    }

    case CHAT_FETCH_ATTACHMENTS_SUCCESS: {
      return { ...state, attachments: action.payload.messages };
    }

    case CHAT_FETCH_ROOM_FAIL:
      return { ...state, loading: false, error: action.payload };

    case CHAT_FETCH_ROOM:
      return { ...state, loading: true, error: null };

    case CHAT_CREATE_ROOM_SUCCESS:
    case CHAT_UPDATE_ROOM_SUCCESS:
    case CHAT_FETCH_ROOM_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        currentRoom: action.payload,
      };

    default:
      return state;
  }
};
