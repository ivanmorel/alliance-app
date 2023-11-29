import {
  PRODUCT_LIST,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUBCATEGORIES,
  PRODUCT_LIST_SUBCATEGORIES_FAIL,
  PRODUCT_LIST_SUBCATEGORIES_SUCCESS,
  PRODUCT_LIST_SUCCESS,
} from "@constants";

import { bugsnagNotify } from "@services/bugsnag";

import { authorizedPost, productURL } from "@utils/api";

export const productList = (payload) => {
  return (dispatch) => {
    dispatch(productListRequest());
    authorizedPost(`${productURL()}/list`, payload)
      .then((response) => {
        dispatch(productListSuccess(response.data));
      })
      .catch((error) => {
        bugsnagNotify(error);
        dispatch(
          productListFail({
            error: true,
            message: error.response ? error.response.data.message : "error",
          })
        );
      });
  };
};

export const productListRequest = () => {
  return {
    type: PRODUCT_LIST,
  };
};

export const productListSuccess = (payload) => {
  return {
    type: PRODUCT_LIST_SUCCESS,
    payload: payload,
  };
};

export const productListFail = (err) => {
  return {
    type: PRODUCT_LIST_FAIL,
    payload: err,
  };
};

export const productListSubcategories = (payload) => {
  return (dispatch) => {
    dispatch(productListSubcategoriesRequest());
    authorizedPost(`${productURL()}/category/list`, payload)
      .then((response) => {
        dispatch(productListSubcategoriesSuccess(response.data));
      })
      .catch((error) => {
        bugsnagNotify(error);
        dispatch(
          productListSubcategoriesFail({
            error: true,
            message: error.response ? error.response.data.message : "error",
          })
        );
      });
  };
};

export const productListSubcategoriesRequest = () => {
  return {
    type: PRODUCT_LIST_SUBCATEGORIES,
  };
};

export const productListSubcategoriesSuccess = (payload) => {
  return {
    type: PRODUCT_LIST_SUBCATEGORIES_SUCCESS,
    payload: payload,
  };
};

export const productListSubcategoriesFail = (err) => {
  return {
    type: PRODUCT_LIST_SUBCATEGORIES_FAIL,
    payload: err,
  };
};
