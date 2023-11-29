import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Keyboard, Pressable, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters/extend";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchGroup,
  groupShareInviteLink,
  resetDeleteLead,
  resetGroup,
  resetGroupUsers,
  snackbarAddMessageToQueue,
} from "@actions";

import { navigate, navigationRef } from "@routes/navigator";
import { buildIcon, CreateRoomIcon, tabStyle } from "@routes/navigatorUtils";

import { GROUP_CHAT_TYPES, SNACKBAR_TYPES } from "@utils/constants";
import { isAndroid } from "@utils/utils";

import { ChatRoomList, GroupActivities, Leads, Users } from "@screens";

import { AppLoader, Button, Modal, TopBar } from "@components";

import { APP_BACKGROUND_COLOR, TITLE_FONT_COLOR } from "@styles/styleConstants";

import { SCREENS } from "./routes.constants";

const GroupTabs = createBottomTabNavigator();

export const GroupNav = () => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const {
    name: groupName,
    createdBy,
    groupId,
  } = useSelector(({ group }) => group.selectedGroup);
  const {
    activities: activitiesBadgeCount,
    leads: leadsBadgeCount,
    users: usersBadgeCount,
    messages: messagesBadgeCount,
  } = useSelector((state) => state.activity.counts?.[`group-${groupId}`] || {});
  const leadError = useSelector(({ lead }) => lead.error);
  const userId = useSelector(({ user }) => user.userId);
  const navigation = useNavigation();
  const { isModerator: isModeratorFromParams, name } = useRoute().params || {};
  const [isKeyboardVisible, setKeyboardVisible] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const keyboardEventListeners = useRef([]);
  const isModerator = isModeratorFromParams || userId === createdBy;
  const routeName = navigationRef.getCurrentRoute()?.name;
  const isLeadsTab = routeName === SCREENS.groupTabs.leads;
  const isUsersTab = routeName === SCREENS.groupTabs.users;
  const isMessagesTab = routeName === SCREENS.groupTabs.messages;

  useEffect(() => {
    if (groupId) {
      dispatch(fetchGroup(groupId));
    }

    return () => {
      dispatch(resetGroup());
      dispatch(resetGroupUsers());
    };
  }, []);

  // Using keyboard listeners to show/hide the tab bar due to odd transitions
  // when using `tabBarHideOnKeyboard` navigator options (even with custom
  // animations using `tabBarVisibilityAnimationConfig` the issue persists)
  useLayoutEffect(() => {
    const listeners = keyboardEventListeners.current;
    if (isAndroid()) {
      listeners?.push(
        Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(false))
      );
      listeners?.push(
        Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(true))
      );
    }

    return () => listeners && listeners.forEach((event) => event.remove());
  }, []);

  useEffect(() => {
    if (leadError) {
      dispatch(
        snackbarAddMessageToQueue({
          message: leadError,
          type: SNACKBAR_TYPES.error,
        })
      );
      dispatch(resetDeleteLead());
    }
  }, [leadError]);

  const pressableHeaderIconStyle = ({ pressed }) => [
    { opacity: pressed ? 0.5 : 1, marginLeft: scale(16) },
  ];

  const GroupSettingsAction = () => (
    <Pressable
      hitSlop={8}
      onPress={() => navigate(SCREENS.appStack.groupSettings)}
      style={pressableHeaderIconStyle}
    >
      <MaterialCommunityIcons
        name="cog"
        size={scale(28)}
        color={TITLE_FONT_COLOR}
      />
    </Pressable>
  );

  const CreateLeadAction = () => (
    <Pressable
      hitSlop={8}
      onPress={() => setModalVisible(true)}
      style={pressableHeaderIconStyle}
    >
      <MaterialCommunityIcons
        name="account-plus"
        size={scale(28)}
        color={TITLE_FONT_COLOR}
      />
    </Pressable>
  );

  const CreateChatAction = () => (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <CreateRoomIcon
        onPress={() =>
          navigate(SCREENS.appStack.inviteUsersToChat, {
            isNewChat: true,
            groupingLevel: GROUP_CHAT_TYPES.group,
            groupingLevelId: groupId,
          })
        }
      />
    </View>
  );

  const handleCreateGroupInviteURLPressed = async () => {
    dispatch(groupShareInviteLink({ groupName, groupId }));
  };

  const InviteUserAction = () => (
    <Pressable
      hitSlop={8}
      onPress={handleCreateGroupInviteURLPressed}
      style={pressableHeaderIconStyle}
    >
      <MaterialCommunityIcons
        name="email"
        size={scale(28)}
        color={TITLE_FONT_COLOR}
      />
    </Pressable>
  );

  return (
    <View
      flex={1}
      style={{ backgroundColor: APP_BACKGROUND_COLOR, paddingTop: insets.top }}
    >
      <TopBar
        titleLeftAligned
        iconLeft="back"
        title={name || groupName}
        maxLeftAlignedTitleWidth="70%"
        headerRight={
          <>
            {isLeadsTab ? <CreateLeadAction /> : null}
            {isModerator && isUsersTab ? <InviteUserAction /> : null}
            {isMessagesTab ? <CreateChatAction /> : null}
            <GroupSettingsAction />
          </>
        }
        onPressLeftIcon={navigation.goBack}
      />
      {!groupName && !createdBy ? (
        <AppLoader />
      ) : (
        <GroupTabs.Navigator
          screenOptions={{
            ...tabStyle,
            headerShown: false,
            tabBarStyle: {
              ...tabStyle.tabBarStyle,
              display: isKeyboardVisible ? "flex" : "none",
            },
            tabBarActiveBackgroundColor: null,
          }}
        >
          <GroupTabs.Screen
            name={SCREENS.groupTabs.activityFeed}
            options={{
              tabBarLabel: "Activity Feed",
              tabBarIcon: ({ color, size, focused }) =>
                buildIcon({
                  name: "rss",
                  color,
                  size,
                  badgeNumber: activitiesBadgeCount,
                  focused,
                }),
            }}
            component={GroupActivities}
          />
          <GroupTabs.Screen
            name={SCREENS.groupTabs.leads}
            options={{
              tabBarLabel: "Leads",
              tabBarIcon: ({ color, size, focused }) =>
                buildIcon({
                  name: "account",
                  color,
                  size,
                  badgeNumber: leadsBadgeCount,
                  focused,
                }),
            }}
          >
            {(props) => (
              <Leads
                {...props}
                setAddLeadModalVisible={() => setModalVisible(true)}
              />
            )}
          </GroupTabs.Screen>
          <GroupTabs.Screen
            name={SCREENS.groupTabs.users}
            component={Users}
            options={{
              tabBarLabel: "Users",
              tabBarIcon: ({ color, size, focused }) =>
                buildIcon({
                  name: "account-supervisor-circle",
                  color,
                  size,
                  badgeNumber: usersBadgeCount,
                  focused,
                }),
            }}
          />
          <GroupTabs.Screen
            name={SCREENS.groupTabs.messages}
            component={ChatRoomList}
            options={{
              tabBarLabel: "Messages",
              tabBarIcon: ({ color, size, focused }) =>
                buildIcon({
                  name: "message-text",
                  color,
                  size,
                  badgeNumber: messagesBadgeCount,
                  focused,
                }),
            }}
            initialParams={{
              id: groupId,
              type: GROUP_CHAT_TYPES.group,
              hideTopBar: true,
            }}
          />
        </GroupTabs.Navigator>
      )}
      <Modal
        visible={isModalVisible}
        onDismiss={() => setModalVisible(false)}
        contentContainerStyle={{
          position: "absolute",
          bottom: 0,
          alignSelf: "center",
          backgroundColor: "white",
          width: "100%",
        }}
      >
        <Modal.Body>
          <Button
            text="Create Lead"
            buttonStyle={{ paddingBottom: 20 }}
            onPress={() => {
              navigate(SCREENS.appStack.createLead, { groupId, groupName });
              setModalVisible(false);
            }}
            dense
            variant
          />
          <Button
            text="Import leads"
            onPress={() => {
              navigate(SCREENS.appStack.importContactList, {
                groupId,
                groupName,
              });
              setModalVisible(false);
            }}
            dense
            variant
          />
        </Modal.Body>
      </Modal>
    </View>
  );
};
