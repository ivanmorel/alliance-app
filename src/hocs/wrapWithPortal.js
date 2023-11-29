import React from "react";

import { Portal } from "react-native-paper";

export default (Component) => (props) =>
  (
    <Portal>
      <Component {...props} />
    </Portal>
  );
