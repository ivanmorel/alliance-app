import React, { useEffect, useState } from "react";
import {
  // FlatList,
  // Pressable,
  View,
} from "react-native";

import { useRoute } from "@react-navigation/native";
import { useFormik } from "formik";
// import { Divider, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
// import { scale } from "react-native-size-matters/extend";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import {
  // chatFetchAttachments,
  chatRemoveUserFromRoom,
  chatSnackbarTextReset,
  chatUpdateRoom,
  // downloadFile,
  downloadFileReset,
  snackbarAddMessageToQueue,
} from "@actions";

import { navigate } from "@routes/navigator";
import { SCREENS } from "@routes/routes.constants";

import { SNACKBAR_TYPES } from "@utils/constants";
import {
  // formatBytes,
  // getFormattedDate,
  isAndroid,
} from "@utils/utils";

import {
  Button,
  ConfirmationModal,
  Input,
  // ListItemCard,
  TopBar,
} from "@components";

import style from "./ChatSettings.style";

// const icon = (
//   <View style={style.iconStyle}>
//     <MaterialCommunityIcons
//       name="attachment"
//       size={scale(24)}
//       color="rgba(51, 51, 51, 0.75)"
//     />
//   </View>
// );

const schema = yup.object().shape({
  chatName: yup.string().max(100, "Must be less than 100 characters"),
});

const ChatSettings = () => {
  const dispatch = useDispatch();
  // const [isFileListExpanded, setFileListExpanded] = useState(true);
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [submitting, setSubmitting] = useState(false);
  const userId = useSelector((state) => state.user.userId);
  const [leavingLoading, setLeavingLoading] = useState(false);
  const route = useRoute();
  // const attachments = useSelector(({ chat }) => chat.attachments);
  const { roomId, ownerId, roomName = "", userCount } = route.params;
  const isModerator = ownerId === userId;
  const [currentRoomName, setCurrentRoomName] = useState(roomName);

  // useEffect(() => {
  //   dispatch(chatFetchAttachments({ roomId }));
  // }, []);

  const formik = useFormik({
    initialValues: {
      chatName: currentRoomName,
    },
    validationSchema: schema,
    validateOnChange: true,
    onSubmit: (values) => handleSubmit(values),
  });

  const handleBack = () => {
    navigate(SCREENS.appStack.chat, {
      roomId,
      roomName: currentRoomName,
      ownerId,
    });
  };

  const { downloadFeedbackAndroid, mediaFeedback } = useSelector(
    ({ chat }) => chat
  );

  useEffect(() => {
    if (downloadFeedbackAndroid && isAndroid()) {
      dispatch(
        snackbarAddMessageToQueue({
          message: downloadFeedbackAndroid,
        })
      );
    }

    return () => {
      dispatch(downloadFileReset());
    };
  }, [downloadFeedbackAndroid]);

  useEffect(() => {
    if (mediaFeedback) {
      dispatch(
        snackbarAddMessageToQueue({
          message: mediaFeedback,
        })
      );
    }

    return () => {
      dispatch(chatSnackbarTextReset());
    };
  }, [mediaFeedback]);

  const handleSubmit = async (values) => {
    setSubmitting(true);
    const response = await dispatch(
      chatUpdateRoom({ roomId, roomName: values.chatName })
    );
    setSubmitting(false);

    if (response) {
      setCurrentRoomName(values.chatName);
      formik.resetForm({ values: { chatName: values.chatName } });
      dispatch(
        snackbarAddMessageToQueue({
          message: "Chat updated successfully",
          type: SNACKBAR_TYPES.success,
        })
      );
    } else {
      dispatch(
        snackbarAddMessageToQueue({
          message: "Error updating chat name",
          type: SNACKBAR_TYPES.error,
        })
      );
    }
  };

  const handleLeaveRoom = async () => {
    setLeavingLoading(true);
    const response = await dispatch(chatRemoveUserFromRoom({ roomId, userId }));

    if (response) {
      setConfirmationModalVisible(false);
      navigate(SCREENS.messagesTabs.users);
    } else {
      setLeavingLoading(false);
      dispatch(
        snackbarAddMessageToQueue({
          message:
            "Something went wrong while trying to leave the group, please try again later",
        })
      );
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <TopBar
        iconLeft="back"
        titleLeftAligned
        title="Chat Settings"
        onPressLeftIcon={handleBack}
      />
      {isModerator ? (
        <View style={style.chatNameContainer}>
          <Input.Text
            inputId="chatName"
            label="Chat name"
            handleChange={formik.handleChange}
            errors={formik.errors}
            values={formik.values}
            touched={formik.touched}
            handleBlur={formik.handleBlur}
            returnKeyType="done"
            placeholder="Enter chat name"
            maxLength={100}
          />
          <Button
            color="secondary"
            text="save"
            buttonStyle={style.buttonStyle}
            disabled={!formik.dirty && formik.isValid && !submitting}
            onPress={formik.submitForm}
            loading={submitting}
          />
        </View>
      ) : null}
      {/*<View>*/}
      {/*  <Text>Chat Notifications</Text>*/}
      {/*  <Switch*/}
      {/*    title="Chat Notifications"*/}
      {/*    setValue={setChatNotifications}*/}
      {/*    value={chatNotifications}*/}
      {/*  />*/}
      {/*</View>*/}

      {/* disable attachments for now */}
      {/* <View style={style.attachmentContainer}>
        <Pressable onPress={() => setFileListExpanded(!isFileListExpanded)}>
          <View style={style.attachmentTitleContainer}>
            <Text style={style.text}>Attachments ({attachments.length})</Text>
            <Divider style={style.divider} />
            <View style={style.chevronContainer}>
              <Text style={style.text}>
                {isFileListExpanded ? "hide" : "show"}
              </Text>
              <MaterialCommunityIcons
                name={isFileListExpanded ? "chevron-up" : "chevron-down"}
                size={scale(24)}
                style={style.expandIcon}
              />
            </View>
          </View>
        </Pressable>
        {isFileListExpanded && (
          <FlatList
            data={attachments}
            keyExtractor={(item) => item?.attachment.assetId}
            renderItem={({ item }) => {
              const { assetId, fileName, fileSizeBytes } = item.attachment;
              return (
                <ListItemCard
                  title={fileName}
                  caption={getFormattedDate(item.timestamp)}
                  subtitle={formatBytes(fileSizeBytes)}
                  key={assetId}
                  avatarIcon={icon}
                  onPress={() => {
                    dispatch(downloadFile({ assetId }));
                  }}
                />
              );
            }}
          />
        )}
      </View> */}
      <Button
        color="error"
        text="leave conversation"
        onPress={() => setConfirmationModalVisible(true)}
        buttonStyle={style.leaveButton}
        disabled={userCount < 3}
      />
      <ConfirmationModal
        visible={confirmationModalVisible}
        title="Leave Conversation"
        descriptionText="Do you really want to leave this conversation?"
        cancelTitle="Cancel"
        okTitle="Leave Chat"
        okIcon={null}
        onOk={handleLeaveRoom}
        loading={leavingLoading}
        onCancel={() => setConfirmationModalVisible(false)}
      />
    </SafeAreaView>
  );
};

export default ChatSettings;
