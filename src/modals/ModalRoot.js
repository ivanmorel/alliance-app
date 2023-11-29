import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { hideHelpDialog } from "@actions";

import { SupportModal } from "@components";

const ModalRoot = () => {
  const { showHelp } = useSelector(({ modal }) => modal);
  const dispatch = useDispatch();

  return (
    <SupportModal
      isVisible={showHelp}
      onDismiss={() => dispatch(hideHelpDialog())}
    />
  );
};

export default ModalRoot;
