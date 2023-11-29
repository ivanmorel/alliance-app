import {
  SNACKBAR_ADD_MESSAGE_QUEUE,
  SNACKBAR_CLEAR_MESSAGE_QUEUE,
  SNACKBAR_SHOW_MESSAGE_SUCCESS,
} from "@constants";

const INIT_STATE = {
  messageQueue: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SNACKBAR_ADD_MESSAGE_QUEUE:
      return {
        ...state,
        messageQueue: [...state.messageQueue, action.payload],
      };
    case SNACKBAR_CLEAR_MESSAGE_QUEUE:
      return {
        ...state,
        messageQueue: [],
      };

    case SNACKBAR_SHOW_MESSAGE_SUCCESS:
      return {
        ...state,
        messageQueue: state.messageQueue.slice(1),
      };

    default:
      return state;
  }
};
