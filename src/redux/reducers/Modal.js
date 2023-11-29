import {
  HIDE_CREATE_GROUP_MODAL,
  HIDE_HELP_DIALOG,
  HIDE_JOIN_GROUP_DIALOG,
  HIDE_PAYMENT_DIALOG,
  SHOW_CREATE_GROUP_MODAL,
  SHOW_FEEDBACK_DIALOG,
  SHOW_HELP_DIALOG,
  SHOW_JOIN_GROUP_DIALOG,
  SHOW_PAYMENT_DIALOG,
} from "@constants";

const ModalInitialState = {
  showCreateGroup: false,
  showJoinGroup: false,
  showFeedback: false,
  showPayment: false,
  showHelp: false,
  prevModalData: null,
  error: null,
  loading: false,
};

const ModalReducer = (state = ModalInitialState, action) => {
  switch (action.type) {
    case SHOW_CREATE_GROUP_MODAL:
      return {
        ...state,
        showCreateGroup: true,
        error: action.payload,
      };
    case HIDE_CREATE_GROUP_MODAL:
      return {
        ...state,
        showCreateGroup: false,
      };
    case SHOW_JOIN_GROUP_DIALOG:
      return {
        ...state,
        showJoinGroup: true,
        error: action.payload,
      };
    case HIDE_JOIN_GROUP_DIALOG:
      return {
        ...state,
        showJoinGroup: false,
      };
    case SHOW_FEEDBACK_DIALOG:
      return {
        ...state,
        showFeedback: action.payload,
      };
    case SHOW_PAYMENT_DIALOG:
      return {
        ...state,
        showPayment: true,
        prevModalData: action.payload,
      };
    case HIDE_PAYMENT_DIALOG:
      return {
        ...state,
        showPayment: false,
      };
    case SHOW_HELP_DIALOG:
      return {
        ...state,
        showHelp: true,
      };
    case HIDE_HELP_DIALOG:
      return {
        ...state,
        showHelp: false,
      };
    default:
      return state;
  }
};

export default ModalReducer;
