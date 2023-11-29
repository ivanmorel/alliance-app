import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Image, Keyboard, View } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import * as Contacts from "expo-contacts";
import RNContacts from "react-native-contacts";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters/extend";

import { useDispatch, useSelector } from "react-redux";
import {
  activityGlobalRemove,
  chatFetchRoomSuccess,
  chatRoomList,
  chatRoomListReset,
  leadClear,
  leadGet,
  ratingGetQuality,
  snackbarAddMessageToQueue,
} from "@actions";
import { ACTIVITY_TYPES } from "@constants";

import {
  buildIcon,
  LeadTabTopBarRightIcon,
  tabStyle,
} from "@routes/navigatorUtils";
import { SCREENS } from "@routes/routes.constants";

import { GROUP_CHAT_TYPES } from "@utils/constants";
import { isAndroid, mapLeadToContact } from "@utils/utils";

import { Chat, LeadInformation, LeadLocation, Opportunities } from "@screens";

import { TopBar } from "@components";

import { APP_BACKGROUND_COLOR } from "@styles/styleConstants";

import opportunitiesIcon from "@assets/opportunities-icon.png";

const LeadTabs = createBottomTabNavigator();

export const LeadTabNav = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute();
  const {
    groupId,
    leadId,
    shouldFetch = true,
    isLeadNew = false,
  } = route.params;
  const globalActivities = useSelector(
    (state) => state.activity.activities?.global
  );
  const groupActivities = useSelector(
    (state) => state.activity.activities?.[`group-${groupId}`]
  );
  const lead = useSelector((state) => state.lead.currentLead);
  const [isKeyboardVisible, setKeyboardVisible] = useState(true);
  const keyboardEventListeners = useRef([]);
  const commentsBadgeCount =
    groupActivities?.filter(
      (activity) =>
        activity?.type === ACTIVITY_TYPES.CHAT_NEW_LEAD_MESSAGE &&
        activity?.data?.chatLeadMessage?.leadId === leadId
    )?.length || 0;
  const opportunitiesBadgeCount =
    globalActivities?.filter(
      (activity) =>
        activity?.type === ACTIVITY_TYPES.OPPORTUNITY_NEW &&
        activity?.data?.opportunityNew?.leadId === leadId
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
  });

  // Fetch the lead chat room and preload it
  useEffect(() => {
    const fetchRoom = async () => {
      const leadRoom = await dispatch(
        chatRoomList({
          grouping_level: GROUP_CHAT_TYPES.lead,
          grouping_level_id: leadId,
        })
      );
      dispatch(chatFetchRoomSuccess(leadRoom?.rooms[0]));
    };

    if (isFocused && leadId) {
      fetchRoom();
    }

    return () => {
      dispatch(chatRoomListReset());
    };
  }, [isFocused, leadId]);

  useEffect(() => {
    if (isLeadNew && groupId) {
      dispatch(
        activityGlobalRemove([
          {
            activityType: ACTIVITY_TYPES.GROUP_NEW_LEAD,
            groupId,
            activityId: leadId,
          },
        ])
      );
    }
  }, []);

  useEffect(() => {
    if (shouldFetch) {
      dispatch(leadGet({ lead_id: leadId }));
      dispatch(ratingGetQuality({ lead_id: leadId }));

      return () => {
        dispatch(leadClear());
      };
    }
  }, [shouldFetch]);

  return (
    <View
      flex={1}
      style={{ backgroundColor: APP_BACKGROUND_COLOR, paddingTop: insets.top }}
    >
      <TopBar
        iconLeft="back"
        titleLeftAligned
        title="Lead Details"
        onPressLeftIcon={() => navigation.goBack()}
        headerRight={
          <LeadTabTopBarRightIcon
            onPress={async () => {
              const { status } = await Contacts.requestPermissionsAsync();
              if (status === "granted") {
                const contact = mapLeadToContact(lead);
                const response = await RNContacts.openContactForm(contact);
                if (response) {
                  dispatch(
                    snackbarAddMessageToQueue({
                      message: "Contact was exported successfully",
                    })
                  );
                }
              } else {
                dispatch(
                  snackbarAddMessageToQueue({
                    message: "Please enable contacts permissions",
                  })
                );
              }
            }}
          />
        }
      />
      <LeadTabs.Navigator
        screenOptions={{
          ...tabStyle,
          headerShown: false,
          tabBarStyle: {
            ...tabStyle.tabBarStyle,
            display: isKeyboardVisible ? "flex" : "none",
          },
          tabBarActiveBackgroundColor: null,
        }}
        backBehavior="history"
      >
        <LeadTabs.Screen
          name={SCREENS.leadDetailTabs.information}
          component={LeadInformation}
          options={{
            tabBarIcon: ({ color, size, focused }) =>
              buildIcon({
                name: "account-multiple",
                color,
                size,
                focused,
              }),
            tabBarLabel: "Information",
          }}
        />
        <LeadTabs.Screen
          name={SCREENS.leadDetailTabs.location}
          component={LeadLocation}
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
        <LeadTabs.Screen
          name={SCREENS.leadDetailTabs.comments}
          component={Chat}
          options={{
            tabBarIcon: ({ color, size, focused }) =>
              buildIcon({
                name: "message-text",
                color,
                size,
                badgeNumber: commentsBadgeCount,
                focused,
              }),
            tabBarLabel: "Comments",
          }}
          initialParams={{ hideTopBar: true }}
        />
        <LeadTabs.Screen
          name={SCREENS.leadDetailTabs.opportunities}
          component={Opportunities}
          initialParams={{ leadId }}
          options={{
            tabBarIcon: ({ color, size, focused }) =>
              buildIcon({
                icon: (
                  <Image
                    source={opportunitiesIcon}
                    style={{
                      marginLeft: scale(8),
                      marginRight: scale(8),
                      width: scale(24),
                      height: verticalScale(24),
                    }}
                  />
                ),
                color,
                size,
                badgeNumber: opportunitiesBadgeCount,
                focused,
              }),
            tabBarLabel: "Opportunities",
          }}
        />
      </LeadTabs.Navigator>
    </View>
  );
};
