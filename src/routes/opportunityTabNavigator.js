import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Keyboard, Pressable, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters/extend";

import { useDispatch, useSelector } from "react-redux";
import {
  activityGlobalRemove,
  opportunityCurrentReset,
  opportunityGet,
} from "@actions";
import { ACTIVITY_TYPES } from "@constants";

import { navigate, navigationRef } from "@routes/navigator";
import { buildIcon, CreateRoomIcon, tabStyle } from "@routes/navigatorUtils";
import { SCREENS } from "@routes/routes.constants";

import { GROUP_CHAT_TYPES } from "@utils/constants";
import { isAndroid } from "@utils/utils";

import {
  ChatRoomList,
  OpportunityContacts,
  OpportunityInformation,
  OpportunityLocation,
} from "@screens";

import { Button, Modal, TopBar } from "@components";

import { APP_BACKGROUND_COLOR, TITLE_FONT_COLOR } from "@styles/styleConstants";

const OpportunityDetailTabs = createBottomTabNavigator();

const opportunitiesToMarkAsRead = [
  ACTIVITY_TYPES.OPPORTUNITY_NEW,
  ACTIVITY_TYPES.OPPORTUNITY_NEW_USER,
  ACTIVITY_TYPES.OPPORTUNITY_NEW_USER_ADDED,
];

const filterActivities = (opportunityId, activities) =>
  activities.filter(
    (activity) =>
      opportunitiesToMarkAsRead.includes(activity.type) &&
      Object.values(activity?.data)[0].opportunityId === opportunityId
  );

/* eslint-disable react/prop-types */
export const OpportunityTabNav = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const route = useRoute();
  const {
    opportunityId: opportunityIdFromRoute,
    opportunityName: opportunityNameFromRoute,
    shouldFetch = true,
  } = route.params || {};
  const routeName = navigationRef.getCurrentRoute()?.name;
  const isContactsTab = routeName === SCREENS.opportunityDetailTabs.contacts;
  const isMessagesTab = routeName === SCREENS.opportunityDetailTabs.messages;
  const insets = useSafeAreaInsets();
  const {
    name: currentOpportunityName,
    opportunityId: currentOpportunityId,
    createdBy,
  } = useSelector((state) => state.opportunity.currentOpportunity);
  const userId = useSelector(({ user }) => user.userId);
  const opportunityId = currentOpportunityId || opportunityIdFromRoute;
  const opportunityName = currentOpportunityName || opportunityNameFromRoute;
  const isModerator = createdBy === userId;
  const globalActivities = useSelector(
    (state) => state.activity.activities?.global
  );
  const [isModalVisible, setModalVisible] = useState(false);
  const isActivityLoading = useSelector(({ activity }) => activity.loading);
  const [isKeyboardVisible, setKeyboardVisible] = useState(true);
  const keyboardEventListeners = useRef([]);
  const messagesBadgeCount =
    globalActivities?.filter(
      (activity) =>
        activity?.type === ACTIVITY_TYPES.CHAT_NEW_OPPORTUNITY_MESSAGE &&
        activity?.data?.chatOpportunityMessage?.opportunityId === opportunityId
    )?.length || 0;

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

  // Fetch the latest opportunity data
  useEffect(() => {
    if (!shouldFetch || !opportunityId) return;
    dispatch(opportunityGet({ opportunity_id: opportunityId }));

    return () => {
      dispatch(opportunityCurrentReset());
    };
  }, [shouldFetch]);

  // Mark the opportunity as seen
  useEffect(() => {
    if (
      !isFocused ||
      isActivityLoading ||
      !opportunityId ||
      !globalActivities?.length
    )
      return;

    const opportunityActivities = filterActivities(
      opportunityId,
      globalActivities
    );

    if (!opportunityActivities?.length) return;

    opportunityActivities.forEach((activity) => {
      dispatch(
        activityGlobalRemove([
          {
            activityType: activity.type,
            opportunityId,
            activityId: Object.values(activity?.data)[0].activityId,
          },
        ])
      );
    });
  }, [isFocused, isActivityLoading, opportunityId, globalActivities]);

  const pressableHeaderIconStyle = ({ pressed }) => [
    { opacity: pressed ? 0.5 : 1, marginLeft: scale(16) },
  ];

  const CreateContactAction = () => (
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
            groupingLevel: GROUP_CHAT_TYPES.opportunity,
            groupingLevelId: opportunityId,
          })
        }
      />
    </View>
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: APP_BACKGROUND_COLOR,
        paddingTop: insets.top,
      }}
    >
      <TopBar
        titleLeftAligned
        iconLeft="back"
        title={opportunityName}
        maxLeftAlignedTitleWidth="70%"
        onPressLeftIcon={navigation.goBack}
        headerRight={
          <>
            {isContactsTab && isModerator ? (
              <CreateContactAction
                opportunityId={opportunityId}
                opportunityName={opportunityName}
              />
            ) : null}
            {isMessagesTab ? <CreateChatAction /> : null}
          </>
        }
      />
      <OpportunityDetailTabs.Navigator
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
        <OpportunityDetailTabs.Screen
          name={SCREENS.opportunityDetailTabs.information}
          component={OpportunityInformation}
          options={{
            tabBarIcon: ({ color, size, focused }) =>
              buildIcon({
                name: "account",
                color,
                size,
                focused,
              }),
            tabBarLabel: "Information",
          }}
        />
        <OpportunityDetailTabs.Screen
          name={SCREENS.opportunityDetailTabs.location}
          component={OpportunityLocation}
          options={{
            tabBarIcon: ({ color, size, focused }) =>
              buildIcon({
                name: "map-marker",
                color,
                size,
                focused,
              }),
            tabBarLabel: "Location",
          }}
        />
        <OpportunityDetailTabs.Screen
          name={SCREENS.opportunityDetailTabs.messages}
          component={ChatRoomList}
          options={{
            tabBarIcon: ({ color, size, focused }) =>
              buildIcon({
                name: "message-text",
                color,
                size,
                badgeNumber: messagesBadgeCount,
                focused,
              }),
            tabBarLabel: "Messages",
          }}
          initialParams={{
            id: opportunityId,
            type: GROUP_CHAT_TYPES.opportunity,
            hideTopBar: true,
          }}
        />
        <OpportunityDetailTabs.Screen
          name={SCREENS.opportunityDetailTabs.contacts}
          options={{
            tabBarIcon: ({ color, size, focused }) =>
              buildIcon({
                name: "account",
                color,
                size,
                focused,
              }),
            tabBarLabel: "Contacts",
          }}
        >
          {(props) => (
            <OpportunityContacts
              {...props}
              setAddLeadModalVisible={() => setModalVisible(true)}
            />
          )}
        </OpportunityDetailTabs.Screen>
      </OpportunityDetailTabs.Navigator>
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
            text="Add manually"
            buttonStyle={{ paddingBottom: 20 }}
            onPress={() => {
              navigate(SCREENS.appStack.createOrEditContact, {
                opportunityId,
                opportunityName,
              });
              setModalVisible(false);
            }}
            dense
            variant
          />
          <Button
            text="Import from phone"
            onPress={() => {
              navigate(SCREENS.appStack.importContactList, {
                opportunityId,
                opportunityName,
                isOpportunity: true,
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
