import React, { useEffect, useState } from "react";
import { FlatList, Keyboard, View } from "react-native";

import { useRoute } from "@react-navigation/native";
import { useFormik } from "formik";
import { Checkbox, Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import * as yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import {
  chatAddUsers,
  chatGetConnections,
  createChatRoom,
  fetchGroup,
  snackbarAddMessageToQueue,
} from "@actions";

import { navigate } from "@routes/navigator";
import { SCREENS } from "@routes/routes.constants";

import { GROUP_CHAT_TYPES, SNACKBAR_TYPES } from "@utils/constants";
import { mapUsersToIdArray } from "@utils/utils";

import {
  Button,
  Input,
  ListItemCard,
  Loader,
  Switch,
  Text,
  TopBar,
} from "@components";

import { PRIMARY_COLOR } from "@styles/styleConstants";

import style from "./InviteUsersToChat.style";

const schema = yup.object().shape({
  chatName: yup.string().max(100, "Must be less than 100 characters"),
});

const InviteUsersToChat = () => {
  const dispatch = useDispatch();
  const [checkedUsers, setCheckedUsers] = useState({});
  const [allowUserToSeeHistory, setAllowUserToSeeHistory] = useState();
  const { connections, currentRoom } = useSelector(({ chat }) => chat);
  const selectedGroup = useSelector((state) => state.group.selectedGroup);
  const userId = useSelector((state) => state.user.userId);
  const { isNewChat, groupingLevel, groupingLevelId, roomId } =
    useRoute().params;

  const users = isNewChat ? [] : currentRoom.users;

  const isNewGroupChat = groupingLevel === GROUP_CHAT_TYPES.group && isNewChat;
  const isUserGroupOwner = selectedGroup?.users?.find(
    (u) => u.userId === userId && u.userRole === "OWNER"
  );

  const filteredConnections = connections.filter((connection) =>
    isNewGroupChat && !isUserGroupOwner
      ? // If this is a new group chat room and the user is not an owner, we filter
        // to only show users in the current group to prevent invite errors
        selectedGroup?.users?.find(
          (selectedGroupUser) => selectedGroupUser.userId === connection.userId
        )
      : // Otherwise, only show connections that are not already in the current room
        !users.find(
          (currentRoomUser) => currentRoomUser.userId === connection.userId
        )
  );

  const title = isNewChat ? "Create new chat" : "Add people to chat";
  const [isLoading, setLoading] = useState(true);

  const formik = useFormik({
    initialValues: {
      chatName: "",
    },
    validationSchema: schema,
  });

  const handleSubmit = async () => {
    setLoading(true);
    let promise = null;
    if (isNewChat) {
      const payload = {
        users: [...mapUsersToIdArray(checkedUsers), userId],
        groupingLevel,
        groupingLevelId,
        chatName: formik.values.chatName,
      };

      promise = dispatch(createChatRoom(payload));
    } else {
      const payload = {
        users: mapUsersToIdArray(checkedUsers),
        roomId,
        createNewRoom: !allowUserToSeeHistory,
      };
      promise = dispatch(chatAddUsers(payload));
    }

    const response = await promise;
    if (response?.roomId) {
      setLoading(false);
      navigate(SCREENS.appStack.chat, {
        roomId: response.roomId,
        getstreamChannelId: response.getstreamChannelId,
        roomName: response.name,
        ownerId: response.ownerId,
      });
    } else {
      setLoading(false);
      dispatch(snackbarAddMessageToQueue({ message: response }));
    }
  };

  const getConnections = async () => {
    const response = await dispatch(chatGetConnections());
    if (!response) {
      dispatch(
        snackbarAddMessageToQueue({
          message:
            "Something went wrong getting your connections, please try again later",
          type: SNACKBAR_TYPES.error,
        })
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    getConnections();
  }, []);

  // When in the "Group" context, `selectedGroup` should exist, but when in the
  // "Messages" context, no group was selected and we need to fetch it first.
  // This helps us filter connections for non-owner users who want to create new
  // chat rooms within a group and prevent failures due to their permissions (as
  // they can not invite users to the group)
  useEffect(() => {
    if (
      (!selectedGroup || selectedGroup?.groupId !== groupingLevelId) &&
      isNewGroupChat
    )
      dispatch(fetchGroup(groupingLevelId));
  }, [isNewGroupChat, selectedGroup]);

  const renderUserItem = ({ item }) => {
    const { firstName, lastName, userId } = item;

    return (
      <ListItemCard
        onPress={() => {
          setCheckedUsers((val) => ({ ...val, [userId]: !val[userId] }));
        }}
        avatarText={`${firstName.charAt(0).toUpperCase()}${lastName
          .charAt(0)
          .toUpperCase()}`}
        title={`${firstName} ${lastName}`}
        titleStyle={{ marginTop: 8 }}
        subtitleStyle={{ marginBottom: -64 }}
        avatarId={userId}
        caption={
          <Checkbox.Android
            color={PRIMARY_COLOR}
            status={checkedUsers[userId] ? "checked" : "unchecked"}
          />
        }
      />
    );
  };

  return (
    <SafeAreaView style={style.safeArea}>
      <TopBar title={title} titleLeftAligned iconLeft="back" />
      <View style={style.container}>
        {isNewChat ? (
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
            onSubmitEditing={() => Keyboard.dismiss()}
          />
        ) : null}
        <View style={style.subtitleContainer}>
          <Text style={style.subtitle}>
            Select the contacts to add ({mapUsersToIdArray(checkedUsers).length}{" "}
            selected)
          </Text>
          <Divider style={style.divider} />
        </View>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <FlatList
              data={filteredConnections}
              renderItem={renderUserItem}
              keyExtractor={(item) => item.userId}
            />
            {!isNewChat ? (
              <Switch
                value={allowUserToSeeHistory}
                setValue={() =>
                  setAllowUserToSeeHistory(!allowUserToSeeHistory)
                }
                title="Allow user(s) to access chat history"
              />
            ) : null}
            <Button
              text="CREATE CHAT"
              color="secondary"
              buttonStyle={style.button}
              disabled={mapUsersToIdArray(checkedUsers).length === 0}
              onPress={handleSubmit}
            />
          </>
        )}
        {/*TODO Commenting this out because we decided to reduce the scope for
        now and only invite people in osr*/}
        {/*{!isNewChat ? (
          <React.Fragment>
            <View
              style={[style.subtitleContainer, style.shareInviteLinkManually]}
            >
              <Text style={style.subtitle}>
                Or share an invite link manually
              </Text>
              <Divider style={style.divider} />
            </View>
            <Button text="Share invite link" buttonStyle={style.button} />
          </React.Fragment>
        ) : null}*/}
      </View>
    </SafeAreaView>
  );
};

export default InviteUsersToChat;
