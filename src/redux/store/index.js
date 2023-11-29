import { LOCAL_DEVELOPMENT } from "@env";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { applyMiddleware, createStore } from "redux";
import ReduxAsyncQueue from "redux-async-queue";
import { persistReducer, persistStore } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import thunk from "redux-thunk";

import { RESET_APP_STATE } from "@constants";

import { bugsnagUpdateReduxMetadata } from "@services/bugsnag";

import reducers from "../reducers";
import { blacklistTransforms } from "./blacklistTransforms";

const persistConfig = {
  timeout: 10000,
  key: "root",
  version: 1,
  debug: true,
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  whitelist: [
    "chat",
    "user",
    "group",
    "lead",
    "rating",
    "product",
    "modal",
    "otaUpdates",
    "opportunity",
    "crm",
  ],
  transforms: [blacklistTransforms],
};

// Create the root reducer from persistReducer
const persistedReducer = persistReducer(persistConfig, reducers);
const rootReducer = (state, action) => {
  if (action.type === RESET_APP_STATE) {
    state = undefined;
  }
  bugsnagUpdateReduxMetadata(state, action);

  return persistedReducer(state, action);
};

// Middleware
const middlewares = [thunk, ReduxAsyncQueue];
const bindMiddleware = (middleware) => {
  if (LOCAL_DEVELOPMENT === "true") {
    const reduxFlipper = require("redux-flipper").default;
    middlewares.push(reduxFlipper());
    const { composeWithDevTools } = require("redux-devtools-extension");

    return composeWithDevTools(applyMiddleware(...middleware));
  }

  return applyMiddleware(...middleware);
};

// Export store and persistor
export const store = createStore(
  rootReducer,
  undefined,
  bindMiddleware(middlewares)
);

export const persistor = persistStore(store);
