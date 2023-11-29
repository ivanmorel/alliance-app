import {
  PRODUCT_LIST,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUBCATEGORIES,
  PRODUCT_LIST_SUBCATEGORIES_FAIL,
  PRODUCT_LIST_SUBCATEGORIES_SUCCESS,
  PRODUCT_LIST_SUCCESS,
} from "@constants";
// import logger, { apiError } from '../../loggly/logger';

const ProductInitialState = {
  error: null,
  loading: false,
  products: [],
  subcategories: [],
};

const ProductReducer = (state = ProductInitialState, action) => {
  switch (action.type) {
    case PRODUCT_LIST_SUBCATEGORIES:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_LIST_SUBCATEGORIES_SUCCESS:
      return {
        ...state,
        subcategories: action.payload.subcategories,
        loading: false,
        error: null,
      };
    case PRODUCT_LIST_SUBCATEGORIES_FAIL:
      // logger.push({
      //   ...apiError,
      //   action: 'PRODUCT_LIST_SUBCATEGORIES_FAIL',
      //   error: action.payload,
      // });
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case PRODUCT_LIST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        products: action.payload.products,
        loading: false,
        error: null,
      };
    case PRODUCT_LIST_FAIL:
      // logger.push({
      //   ...apiError,
      //   action: 'PRODUCT_LIST_FAIL',
      //   error: action.payload,
      // });
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default ProductReducer;
