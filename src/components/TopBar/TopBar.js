import React, { useMemo } from "react";
import { Pressable, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import PropTypes from "prop-types";
import { Text } from "react-native-paper";
import { scale } from "react-native-size-matters/extend";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { TEST_IDS } from "@utils/constants";
import { isAndroid } from "@utils/utils";

import { TITLE_FONT_COLOR } from "@styles/styleConstants";

import styles from "./TopBar.style";

const TopBar = ({
  title,
  headerRight,
  iconLeft = "hamburger",
  titleLeftAligned = false,
  titleStyle = {},
  onPressLeftIcon,
  maxLeftAlignedTitleWidth,
}) => {
  const navigation = useNavigation();
  const backBehaviour = useMemo(
    () => onPressLeftIcon || navigation.goBack,
    [onPressLeftIcon, navigation]
  );
  const pressableStyle = ({ pressed }) => [
    {
      opacity: pressed ? 0.5 : 1,
    },
    styles.icon,
    isAndroid() && styles.androidIcon,
  ];

  return (
    <View style={styles.container}>
      {iconLeft === "back" ? (
        <Pressable
          hitSlop={16}
          onPress={backBehaviour}
          style={pressableStyle}
          testID={TEST_IDS.topBar.backButton}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={scale(24)}
            color={TITLE_FONT_COLOR}
          />
        </Pressable>
      ) : null}
      {iconLeft === "hamburger" ? (
        <Pressable
          hitSlop={16}
          style={pressableStyle}
          onPress={() => navigation.toggleDrawer()}
          testID={TEST_IDS.topBar.menuButton}
        >
          <MaterialIcons
            name="menu"
            size={scale(24)}
            color={TITLE_FONT_COLOR}
          />
        </Pressable>
      ) : null}
      <View style={{ flex: 1 }}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[
            styles.text,
            titleLeftAligned && styles.leftAlignedTitle,
            titleStyle,
            titleLeftAligned && {
              maxWidth: maxLeftAlignedTitleWidth,
            },
          ]}
        >
          {title}
        </Text>
      </View>
      {headerRight && (
        <View style={styles.rightIconContainer}>{headerRight}</View>
      )}
    </View>
  );
};

export default TopBar;

TopBar.propTypes = {
  headerRight: PropTypes.element,
  iconLeft: PropTypes.oneOf(["hamburger", "back"]),
  onPressLeftIcon: PropTypes.func,
  title: PropTypes.string,
  titleLeftAligned: PropTypes.bool,
  titleStyle: PropTypes.object,
  maxLeftAlignedTitleWidth: PropTypes.string,
};

TopBar.defaultProps = {
  iconLeft: "hamburger",
  titleLeftAligned: false,
  titleStyle: {},
};
