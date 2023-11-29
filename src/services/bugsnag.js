import React from "react";

import { EAS_BUILD_PROFILE, LOCAL_DEVELOPMENT, NODE_ENV } from "@env";

import BugsnagPluginReactNavigation from "@bugsnag/plugin-react-navigation";
import Bugsnag from "@bugsnag/react-native";

const baseReport = {
  history: [],
  state: {},
};

export function isBugsnagReady() {
  return !!Bugsnag._client;
}

export function bugsnagUpdateReduxMetadata(state, action) {
  baseReport.state = state;
  baseReport.history.push(action);
  // Remove the first entry each time a new action is added to the stack once we
  // reach 100 items in the history to prevent large memory usage (base64 values
  // can be quite large)
  if (baseReport.history.length > 100) baseReport.history.shift();
}

export function bugsnagOnError(event, metadata) {
  event.app.releaseStage = EAS_BUILD_PROFILE || NODE_ENV;
  event.addMetadata("Redux State", baseReport.state);
  event.addMetadata("Redux History", baseReport.history);
  const {
    userId,
    appUser: { email, firstName, lastName },
  } = baseReport?.state?.user;
  if (userId) event.setUser(userId, email, `${firstName} ${lastName}`);
  if (metadata) {
    metadata.forEach(({ name, data }) => event.addMetadata(name, data));
  }
}

export function bugsnagNotify(error, metadata) {
  if (LOCAL_DEVELOPMENT === "true") {
    console.error(error, metadata);
  } else {
    Bugsnag.notify(error, (event) => bugsnagOnError(event, metadata));
  }
}

if (!isBugsnagReady()) {
  Bugsnag.start({
    plugins: [new BugsnagPluginReactNavigation()],
    onError: bugsnagOnError,
  });
}

export const BugsnagErrorBoundary =
  Bugsnag.getPlugin("react").createErrorBoundary(React);
