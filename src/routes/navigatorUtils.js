import React from "react";
import { Pressable, View } from "react-native";

import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import { scale, verticalScale } from "react-native-size-matters/extend";

import { Badge, Text } from "@components";

import { APP_BACKGROUND_COLOR, TITLE_FONT_COLOR } from "@styles/styleConstants";
import { theme } from "@styles/theme";

export const buildIcon = ({
  icon,
  name,
  color,
  size,
  hideBadge,
  badgeNumber = null,
  iconStyle = {},
  focused = false,
}) => {
  const theme = useTheme();

  return (
    <View
      style={
        focused
          ? {
              backgroundColor: "#D9E3F9",
              width: scale(50),
              alignItems: "center",
              borderRadius: scale(10),
            }
          : {}
      }
    >
      {icon ? (
        icon
      ) : (
        <MaterialCommunityIcons
          name={name}
          size={size}
          color={color}
          style={iconStyle}
        />
      )}
      {!hideBadge && badgeNumber ? (
        <Badge
          size={18}
          number={badgeNumber}
          style={{
            position: "absolute",
            top: -4,
            right: -16,
            fontSize: 12,
            ...theme.fonts.semiBold,
          }}
        />
      ) : null}
    </View>
  );
};

export const tabStyle = {
  tabBarActiveTintColor: "#121C2B",
  tabBarInactiveTintColor: "#121C2B",
  tabBarInactiveBackgroundColor: APP_BACKGROUND_COLOR,
  tabBarActiveBackgroundColor: "#D9E3F9",
  tabBarLabelStyle: { paddingBottom: verticalScale(8) },
  tabBarIconStyle: { marginTop: verticalScale(8) },
  tabBarStyle: { backgroundColor: APP_BACKGROUND_COLOR },
};

// eslint-disable-next-line react/prop-types
export const CreateRoomIcon = ({ onPress = () => {} }) => (
  <Pressable hitSlop={16} onPress={onPress}>
    <MaterialCommunityIcons
      name="message-text"
      size={scale(24)}
      color="rgba(51, 51, 51, 0.75)"
    />
    <View
      style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "white",
        borderRadius: 25,
      }}
    >
      <MaterialCommunityIcons
        name="plus-thick"
        size={scale(14)}
        color="rgba(51, 51, 51, 0.75)"
      />
    </View>
  </Pressable>
);

// eslint-disable-next-line react/prop-types
export const LeadTabTopBarRightIcon = ({ onPress }) => (
  <Pressable onPress={onPress}>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Text
        style={{
          color: TITLE_FONT_COLOR,
          ...theme.fonts.medium,
          fontSize: scale(14),
          letterSpacing: scale(1.25),
          paddingRight: scale(4),
        }}
      >
        EXPORT
      </Text>
      <Feather name="upload" size={scale(18)} color={TITLE_FONT_COLOR} />
    </View>
  </Pressable>
);
