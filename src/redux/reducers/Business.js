import {
  BUSINESS_GET,
  BUSINESS_GET_FAIL,
  BUSINESS_GET_SUCCESS,
} from "@constants";

const BusinessInitialState = {
  business: {},
  hasBusiness: false,
  loading: false,
  error: false,
};

const BusinessReducer = (state = BusinessInitialState, action) => {
  switch (action.type) {
    case BUSINESS_GET:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case BUSINESS_GET_SUCCESS:
      return {
        ...state,
        business: action.payload,
        hasBusiness: true,
        loading: false,
        error: false,
      };
    case BUSINESS_GET_FAIL:
      return {
        ...state,
        businesses: [],
        hasBusiness: false,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default BusinessReducer;
