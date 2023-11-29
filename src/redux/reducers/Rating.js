import {
  RATING_ADD_QUALITY,
  RATING_ADD_QUALITY_FAIL,
  RATING_ADD_QUALITY_SUCCESS,
  RATING_ADD_RELEVANCY,
  RATING_ADD_RELEVANCY_FAIL,
  RATING_ADD_RELEVANCY_SUCCESS,
  RATING_GET_QUALITY,
  RATING_GET_QUALITY_FAIL,
  RATING_GET_QUALITY_SUCCESS,
} from "@constants";
// import logger, { apiError } from '../../loggly/logger';

const RatingInitialState = {
  quality: null,
  loading: false,
  error: null,
};

const RatingReducer = (state = RatingInitialState, action) => {
  switch (action.type) {
    case RATING_GET_QUALITY:
      return {
        ...state,
        loading: true,
      };

    case RATING_GET_QUALITY_SUCCESS:
      return {
        ...state,
        quality: action.payload,
        loading: false,
      };

    case RATING_GET_QUALITY_FAIL:
      // logger.push({
      //   ...apiError,
      //   action: 'RATING_GET_QUALITY_FAIL',
      //   error: action.payload,
      // });
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case RATING_ADD_QUALITY:
      return {
        ...state,
        loading: true,
      };

    case RATING_ADD_QUALITY_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case RATING_ADD_QUALITY_FAIL:
      // logger.push({
      //   ...apiError,
      //   action: 'RATING_ADD_QUALITY_FAIL',
      //   error: action.payload,
      // });
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case RATING_ADD_RELEVANCY:
      return {
        ...state,
        loading: false,
      };

    case RATING_ADD_RELEVANCY_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case RATING_ADD_RELEVANCY_FAIL:
      // logger.push({
      //   ...apiError,
      //   action: 'RATING_ADD_RELEVANCY_FAIL',
      //   error: action.payload,
      // });
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default RatingReducer;
