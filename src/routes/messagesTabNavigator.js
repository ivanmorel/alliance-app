import React from "react";
import { Image, View } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters/extend";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { useSelector } from "react-redux";

import { navigate, navigationRef } from "@routes/navigator";
import { buildIcon, CreateRoomIcon, tabStyle } from "@routes/navigatorUtils";
import { SCREENS } from "@routes/routes.constants";

import { GROUP_CHAT_TYPES } from "@utils/constants";

import { ChatList, ChatRoomList, GroupList, OpportunityList } from "@screens";

import { TopBar } from "@components";

import { APP_BACKGROUND_COLOR } from "@styles/styleConstants";

import opportunitiesIcon from "@assets/opportunities-icon.png";

const MessagesTabs = createBottomTabNavigator();

const RenderGroupList = () => {
  return (
    <GroupList
      isMessageTab={true}
      onPress={({ groupId, name }) =>
        navigate(SCREENS.appStack.roomList, {
          type: GROUP_CHAT_TYPES.group,
          id: groupId,
          name,
        })
      }
    />
  );
};

export const MessagesNav = () => {
  const insets = useSafeAreaInsets();
  const {
    messages: {
      groups: groupsBadgeCount,
      users: usersBadgeCount,
      opportunities: opportunitiesBadgeCount,
      business: businessBadgeCount,
    },
  } = useSelector((state) => state.activity.counts.global);
  const { hasBusiness, business } = useSelector((state) => state.business);

  // Dev Note. just a fancy way to make it rerender when you focus it
  const routeName = navigationRef.getCurrentRoute()?.name;

  const isUsersTab = routeName === SCREENS.messagesTabs.users;

  // NOTE: see commented code in `headerRight` prop below
  // const isBusinessTab = routeName === SCREENS.messagesTabs.businesses;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: APP_BACKGROUND_COLOR,
        paddingTop: insets.top,
      }}
    >
      <TopBar
        title="Messages"
        headerRight={
          <>
            {isUsersTab ? (
              <CreateRoomIcon
                onPress={() =>
                  navigate(SCREENS.appStack.inviteUsersToChat, {
                    isNewChat: true,
                    groupingLevel: GROUP_CHAT_TYPES.user,
                    groupingLevelId: null,
                  })
                }
              />
            ) : null}
            {/* TODO discuss if we can create business chat from here, given that not sure if we have */}
            {/* logic to invite people to a business like groups/opportunities*/}
            {/* {isBusinessTab ? (
              <CreateRoomIcon
                onPress={() =>
                  navigate(SCREENS.appStack.inviteUsersToChat, {
                    isNewChat: true,
                    groupingLevel: GROUP_CHAT_TYPES.business,
                    groupingLevelId: business.businessId,
                  })
                }
              />
            ) : null} */}
          </>
        }
      />
      <MessagesTabs.Navigator
        screenOptions={{
          ...tabStyle,
          headerShown: false,
          tabBarActiveBackgroundColor: null,
        }}
      >
        <MessagesTabs.Screen
          name={SCREENS.messagesTabs.users}
          component={ChatList}
          options={{
            tabBarIcon: ({ color, size, focused }) =>
              buildIcon({
                name: "message-text",
                color,
                size,
                badgeNumber: usersBadgeCount,
                focused,
              }),
            tabBarLabel: "Chat",
          }}
        />

        <MessagesTabs.Screen
          name={SCREENS.messagesTabs.opportunities}
          component={OpportunityList}
          options={{
            tabBarIcon: ({ size, focused }) =>
              buildIcon({
                icon: (
                  <Image
                    source={opportunitiesIcon}
                    style={{ height: verticalScale(size), width: scale(size) }}
                  />
                ),
                badgeNumber: opportunitiesBadgeCount,
                focused,
              }),
            tabBarLabel: "Opportunities",
          }}
        />
        <MessagesTabs.Screen
          name={SCREENS.messagesTabs.groups}
          component={RenderGroupList}
          options={{
            tabBarIcon: ({ size, focused }) =>
              buildIcon({
                icon: (
                  <MaterialIcons
                    name="group-work"
                    size={scale(size)}
                    color="black"
                  />
                ),
                badgeNumber: groupsBadgeCount,
                focused,
              }),
            tabBarLabel: "Groups",
          }}
        />
        {hasBusiness ? (
          <MessagesTabs.Screen
            name={SCREENS.messagesTabs.businesses}
            component={ChatRoomList}
            initialParams={{
              type: GROUP_CHAT_TYPES.business,
              id: business.businessId,
              hideTopBar: true,
            }}
            options={{
              tabBarIcon: ({ size, focused }) =>
                buildIcon({
                  icon: (
                    <FontAwesome5
                      name="globe"
                      size={scale(size * 0.9)}
                      color="black"
                    />
                  ),
                  badgeNumber: businessBadgeCount,
                  focused,
                }),
              tabBarLabel: "Business",
            }}
          />
        ) : null}
      </MessagesTabs.Navigator>
    </View>
  );
};
