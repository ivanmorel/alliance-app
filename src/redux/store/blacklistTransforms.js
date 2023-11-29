import { createTransform } from "redux-persist";

export const blacklistTransforms = createTransform(
  // transform state on its way to being serialized and persisted.
  null,
  // transform state being rehydrated
  (state) => {
    const newState = { ...state };
    newState.linkedInUrl = null;

    return newState;
  },
  // define which reducers this transform gets called for.
  { whitelist: ["user"] }
);
