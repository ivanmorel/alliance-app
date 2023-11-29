import React, { useState } from "react";

import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters/extend";

import { useDispatch, useSelector } from "react-redux";
import { deleteGroup, leaveGroup } from "@actions";

import { ConfirmationModal, TopBar } from "@components";

import { APP_BACKGROUND_COLOR, WARNING_COLOR } from "@styles/styleConstants";

const GroupSettings = () => {
  const [isVisible, setVisible] = useState(false);
  const { selectedGroup } = useSelector(({ group }) => group);
  const { groupId, name, createdBy } = selectedGroup;
  const userId = useSelector(({ user }) => user.userId);
  const isModerator = userId === createdBy;

  const dispatch = useDispatch();

  const handleModalClose = () => setVisible(false);

  const onModalConfirm = () => {
    dispatch(deleteGroup({ group_id: groupId }));
  };

  const handleCancelGroup = () => setVisible(true);

  return (
    <SafeAreaView style={styles.container}>
      <TopBar iconLeft="back" titleLeftAligned title="Group Settings" />
      <Button
        onPress={handleCancelGroup}
        style={styles.cancelGroupButton}
        mode="contained"
        icon={isModerator ? "delete" : null}
      >
        {isModerator ? "delete Group" : "leave Group"}
      </Button>
      <ConfirmationModal
        titleIcon="delete"
        visible={isVisible && isModerator}
        title="Delete Group"
        okTitle="Delete group"
        descriptionText="Do you really want to delete the group:"
        afterDescriptionText="?"
        descriptionBold={name}
        warningText="This operation cannot be undone and you will lose permanent access to all group data."
        okIcon="trash-can-outline"
        onOk={onModalConfirm}
        onCancel={handleModalClose}
      />
      <ConfirmationModal
        titleIcon="arrow-bottom-left-thick"
        title="Leave Group"
        descriptionText="Do you really want to leave the group:"
        descriptionBold={name}
        afterDescriptionText="?"
        visible={isVisible && !isModerator}
        warningText="This operation cannot be undone and you will lose permanent access to all group data."
        okTitle="Leave Group"
        onCancel={handleModalClose}
        okIcon="arrow-bottom-left-thick"
        onOk={() => {
          dispatch(leaveGroup({ group_id: groupId }));
        }}
      />
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_BACKGROUND_COLOR,
  },
  cancelGroupButton: {
    width: "90%",
    alignSelf: "center",
    marginVertical: "38@vs",
    backgroundColor: WARNING_COLOR,
  },
});

export default GroupSettings;
