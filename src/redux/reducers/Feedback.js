import {
  SUBMIT_FEEDBACK,
  SUBMIT_FEEDBACK_FAIL,
  SUBMIT_FEEDBACK_RESET,
  SUBMIT_FEEDBACK_SUCCESS,
} from "@constants";

const FeedbackInitialState = {
  subject: "",
  content: "",
  error: null,
  loading: false,
  submitted: false,
};

const FeedbackReducer = (state = FeedbackInitialState, action) => {
  switch (action.type) {
    case SUBMIT_FEEDBACK:
      return {
        ...state,
        loading: true,
      };
    case SUBMIT_FEEDBACK_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        submitted: true,
      };

    case SUBMIT_FEEDBACK_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case SUBMIT_FEEDBACK_RESET:
      return {
        ...state,
        error: null,
        loading: false,
        submitted: false,
      };

    default:
      return state;
  }
};

export default FeedbackReducer;
