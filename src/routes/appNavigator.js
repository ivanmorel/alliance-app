import React, { useEffect, useRef } from "react";

import { createStackNavigator } from "@react-navigation/stack";
import {
  addNotificationReceivedListener,
  DEFAULT_ACTION_IDENTIFIER,
  registerTaskAsync,
  removeNotificationSubscription,
  unregisterTaskAsync,
  useLastNotificationResponse,
} from "expo-notifications";

import { useDispatch, useSelector } from "react-redux";
import {
  businessGet,
  chatGetStreamConnect,
  groupList,
  notificationInitialize,
  notificationInteractionReceived,
  notificationReceived,
  userGet,
} from "@actions";
import { NOTIFICATION_BACKGROUND_TASK } from "@constants";

import { GroupNav } from "@routes/groupTabNavigator";
import { LeadTabNav } from "@routes/leadTabNavigator";
import { MessagesNav } from "@routes/messagesTabNavigator";
import { OpportunityTabNav } from "@routes/opportunityTabNavigator";
import { SCREENS } from "@routes/routes.constants";

import {
  Activities,
  Chat,
  ChatRoomList,
  ChatSettings,
  CreateGroup,
  CreateGroupProductInfo,
  CreateLead,
  CreateOpportunity,
  CreateOrEditContact,
  Groups,
  GroupSettings,
  ImportContact,
  ImportContactList,
  ImportLead,
  InviteUsersToChat,
  JoinGroup,
  JoinOpportunity,
  MySettings,
  NearbyLeads,
  Opportunities,
  PrivacyPolicy,
  SendFeedback,
  TermsOfUse,
  UserAgreement,
} from "@screens";

import { Overlay } from "@components";

import ModalRoot from "../modals";

const AppStack = createStackNavigator();

export const AppNav = () => {
  const dispatch = useDispatch();
  const {
    authUser,
    appUser: { userId },
    businessId,
  } = useSelector((state) => state.user);
  const inviteLoading = useSelector((state) => state.group.inviteLoading);
  const sharingInvite = useSelector((state) => state.group.sharingInvite);
  const sharingInviteSheetOpened = useSelector(
    (state) => state.group.sharingInviteSheetOpened
  );

  // Ensure we have current user info and use this effect to run other
  // post-login actions
  useEffect(() => {
    if (authUser && userId) {
      dispatch(userGet({ user_id: userId }));
      dispatch(groupList());
      if (businessId > 0) {
        dispatch(businessGet({ businessId }));
      }
      dispatch(chatGetStreamConnect());
    }
  }, [authUser, userId, businessId]);

  useEffect(() => {
    // Setup push notifications
    dispatch(notificationInitialize());
  }, []);

  // Handle notification received while the app is in the foreground
  const notificationListener = useRef();
  useEffect(() => {
    notificationListener.current = addNotificationReceivedListener(
      (notification) => {
        dispatch(notificationReceived(notification));
      }
    );
    registerTaskAsync(NOTIFICATION_BACKGROUND_TASK);

    return () => {
      removeNotificationSubscription(notificationListener.current);
      unregisterTaskAsync(NOTIFICATION_BACKGROUND_TASK);
    };
  }, []);

  // Handle notification taps (foreground, background, or when killed)
  const lastNotificationResponse = useLastNotificationResponse();
  useEffect(() => {
    if (
      lastNotificationResponse?.actionIdentifier === DEFAULT_ACTION_IDENTIFIER
    ) {
      dispatch(notificationInteractionReceived(lastNotificationResponse));
    }
  }, [lastNotificationResponse]);

  if (!authUser) {
    return null;
  }

  return (
    <>
      <Overlay
        active={sharingInvite && !sharingInviteSheetOpened}
        showSpinner={inviteLoading}
      />
      <AppStack.Navigator
        screenOptions={{ headerShown: false }}
        defaultScreenOptions={{ cardStyle: { backgroundColor: "white" } }}
      >
        <AppStack.Screen
          name={SCREENS.appStack.activities}
          component={Activities}
          initialParams={{ snackbarText: null }}
        />
        <AppStack.Screen
          name={SCREENS.appStack.nearbyLeads}
          component={NearbyLeads}
        />
        <AppStack.Screen
          name={SCREENS.appStack.createGroup}
          component={CreateGroup}
        />
        <AppStack.Screen
          name={SCREENS.appStack.createGroupProductInfo}
          component={CreateGroupProductInfo}
        />
        <AppStack.Screen
          name={SCREENS.appStack.joinGroup}
          component={JoinGroup}
        />
        <AppStack.Screen
          name={SCREENS.appStack.mySettings}
          component={MySettings}
        />
        <AppStack.Screen
          name={SCREENS.appStack.sendFeedback}
          component={SendFeedback}
        />
        <AppStack.Screen
          name={SCREENS.appStack.importContactList}
          component={ImportContactList}
        />
        <AppStack.Screen
          name={SCREENS.appStack.importLead}
          component={ImportLead}
        />
        <AppStack.Screen
          name={SCREENS.appStack.leadDetail}
          component={LeadTabNav}
        />
        <AppStack.Screen name={SCREENS.appStack.group} component={GroupNav} />
        <AppStack.Screen
          name={SCREENS.appStack.messages}
          component={MessagesNav}
        />
        <AppStack.Screen name={SCREENS.appStack.chat} component={Chat} />
        <AppStack.Screen
          name={SCREENS.appStack.createLead}
          component={CreateLead}
        />
        <AppStack.Screen
          name={SCREENS.appStack.termsOfUse}
          component={TermsOfUse}
        />
        <AppStack.Screen
          name={SCREENS.appStack.userAgreement}
          component={UserAgreement}
        />
        <AppStack.Screen
          name={SCREENS.appStack.privacyPolicy}
          component={PrivacyPolicy}
        />
        <AppStack.Screen
          name={SCREENS.appStack.groups}
          component={Groups}
          initialParams={{ snackbarText: null }}
        />
        <AppStack.Screen
          name={SCREENS.appStack.groupSettings}
          component={GroupSettings}
        />
        <AppStack.Screen
          name={SCREENS.appStack.opportunities}
          component={Opportunities}
        />
        <AppStack.Screen
          name={SCREENS.appStack.opportunityDetail}
          component={OpportunityTabNav}
        />
        <AppStack.Screen
          name={SCREENS.appStack.createOpportunity}
          component={CreateOpportunity}
        />
        <AppStack.Screen
          name={SCREENS.appStack.joinOpportunity}
          component={JoinOpportunity}
        />
        <AppStack.Screen
          name={SCREENS.appStack.createOrEditContact}
          component={CreateOrEditContact}
        />
        <AppStack.Screen
          name={SCREENS.appStack.inviteUsersToChat}
          component={InviteUsersToChat}
        />
        <AppStack.Screen
          name={SCREENS.appStack.roomList}
          component={ChatRoomList}
        />
        <AppStack.Screen
          name={SCREENS.appStack.importContact}
          component={ImportContact}
        />
        <AppStack.Screen
          name={SCREENS.appStack.chatSettings}
          component={ChatSettings}
        />
      </AppStack.Navigator>
      <ModalRoot />
    </>
  );
};
