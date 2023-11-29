import React from "react";
import { Image, TouchableOpacity, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Divider, List } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters/extend";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { useDispatch, useSelector } from "react-redux";
import { showHelpDialog, userLogout } from "@actions";

import { SCREENS } from "@routes/routes.constants";

import { TEST_IDS } from "@utils/constants";

import { Badge, OSRAvatar, Text, Version } from "@components";

import { PRIMARY_COLOR, SUBTITLE_GRAY_COLOR } from "@styles/styleConstants";

import opportunitiesIcon from "@assets/opportunities-icon.png";

import styles from "./DrawerContent.style";

const ICON_COLOR = SUBTITLE_GRAY_COLOR;

const DrawerContent = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const {
    firstName = "",
    lastName = "",
    userId,
  } = useSelector((state) => state.user.appUser || {});

  const {
    activities: activitiesBadgeCount,
    groups: groupsBadgeCount,
    messages: { total: messagesBadgeCount },
    opportunities: opportunitiesBadgeCount,
  } = useSelector((state) => state.activity.counts.global);

  // eslint-disable-next-line react/prop-types
  const MenuItem = ({ title, onPress, icon, notificationCount }) => {
    const isIconString = typeof icon === "string";

    return (
      <TouchableOpacity style={styles.menuItemContainer} onPress={onPress}>
        {isIconString ? (
          <MaterialCommunityIcons
            name={icon}
            size={scale(24)}
            color={ICON_COLOR}
            style={styles.iconStyle}
          />
        ) : (
          icon
        )}
        <Text style={styles.menuItemTitle} numberOfLines={1}>
          {title}
        </Text>
        <View flex={1} style={{ minWidth: 50 }}>
          {notificationCount ? (
            <Badge number={notificationCount} size={24} />
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  const handleNavigation = (screenName) => {
    navigation.navigate(screenName);
  };

  const logoutUser = () => {
    dispatch(userLogout());
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  const openHelpDialog = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
    dispatch(showHelpDialog());
  };

  return (
    <View flex={1} style={styles.menu}>
      <List.Item
        titleStyle={styles.menuHeaderTitle}
        title={`${firstName} ${lastName}`}
        left={() => (
          <OSRAvatar
            color={PRIMARY_COLOR}
            size={44}
            userId={userId}
            label={`${firstName[0]}${lastName[0]}`}
            avatarStyle={styles.avatarStyle}
            labelStyle={styles.avatarLabel}
          />
        )}
        style={styles.menuHeader}
      />
      <Divider style={[styles.divider, { marginTop: 0 }]} />
      <MenuItem
        title="Activity Feed"
        icon="rss"
        onPress={() => handleNavigation(SCREENS.appStack.activities)}
        notificationCount={activitiesBadgeCount}
      />
      <MenuItem
        title="Opportunities"
        icon={
          <Image source={opportunitiesIcon} style={styles.opportunitiesIcon} />
        }
        onPress={() => handleNavigation(SCREENS.appStack.opportunities)}
        notificationCount={opportunitiesBadgeCount}
      />
      <MenuItem
        title="Groups"
        icon="account-multiple"
        onPress={() => handleNavigation(SCREENS.appStack.groups)}
        notificationCount={groupsBadgeCount}
      />
      <MenuItem
        title="Messages"
        icon="message-text"
        onPress={() => handleNavigation(SCREENS.appStack.messages)}
        notificationCount={messagesBadgeCount}
      />
      <MenuItem
        title="Leads Nearby"
        icon="map-marker"
        onPress={() => handleNavigation(SCREENS.appStack.nearbyLeads)}
      />
      <Divider style={styles.divider} />
      <MenuItem
        title="Create Group"
        icon="folder-plus"
        onPress={() => handleNavigation(SCREENS.appStack.createGroup)}
      />
      <Divider style={styles.divider} />
      <MenuItem
        title="My Settings"
        icon="face-man"
        onPress={() => handleNavigation(SCREENS.appStack.mySettings)}
      />
      <MenuItem
        title="Help"
        icon={
          <MaterialIcons
            name="live-help"
            size={scale(24)}
            color={ICON_COLOR}
            style={styles.iconStyle}
          />
        }
        onPress={openHelpDialog}
      />
      <MenuItem
        title="Send Feedback"
        icon="message-alert"
        onPress={() => handleNavigation(SCREENS.appStack.sendFeedback)}
      />
      <View
        flex={1}
        style={[
          styles.logoutButton,
          insets.bottom === 0 ? { bottom: verticalScale(10) } : {},
        ]}
      >
        <List.Item
          style={styles.menuItem}
          titleStyle={styles.logoutButtonTitle}
          onPress={logoutUser}
          left={() => (
            <MaterialCommunityIcons
              name="login-variant"
              size={scale(20)}
              color={ICON_COLOR}
              style={styles.logoutIcon}
            />
          )}
          title="Logout"
          right={() => (
            <Version title="APP VERSION" style={styles.appVersion} />
          )}
          testID={TEST_IDS.drawerMenu.logout}
        />
      </View>
    </View>
  );
};

export default DrawerContent;
