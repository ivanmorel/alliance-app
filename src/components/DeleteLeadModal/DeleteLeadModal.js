import React, { useEffect } from "react";

import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import { leadDelete } from "@actions";

import { ConfirmationModal, Text } from "@components";

import style from "./DeleteLeadModal.style";

const DeleteLeadModal = ({ visible, leadId, hideModal }) => {
  const dispatch = useDispatch();
  const { groupId, name } = useSelector(({ group }) => group.selectedGroup);
  const { deleteLoading: loading, deleteSuccess } = useSelector(
    ({ lead }) => lead
  );

  useEffect(() => {
    if (deleteSuccess) {
      hideModal();
    }
  }, [deleteSuccess]);

  return (
    <ConfirmationModal
      visible={visible}
      titleIcon="delete"
      title="Delete lead"
      descriptionText={
        <Text style={style.description}>
          Do you really want to delete this lead from the group:{" "}
          <Text style={style.descriptionBold}>{name}</Text> ?
        </Text>
      }
      warningText="This operation cannot be undone and the lead will be permanent deleted from the group."
      okTitle="Remove"
      okIcon="trash-can-outline"
      onOk={() => {
        dispatch(leadDelete({ leadId, groupId }));
      }}
      onCancel={() => hideModal()}
      disabled={loading}
    />
  );
};

export default DeleteLeadModal;

DeleteLeadModal.propTypes = {
  hideModal: PropTypes.func,
  leadId: PropTypes.number,
  visible: PropTypes.bool,
  groupId: PropTypes.number,
};
