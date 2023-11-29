import React, { useEffect } from "react";
import { Pressable } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters/extend";

import { useDispatch, useSelector } from "react-redux";
import { setSelectedGroup, snackbarAddMessageToQueue } from "@actions";

import { navigate } from "@routes/navigator";
import { SCREENS } from "@routes/routes.constants";

import { GroupList } from "@screens";

import { TopBar } from "@components";

import { SUBTITLE_GRAY_COLOR } from "@styles/styleConstants";

import styles from "./Groups.style";

const Groups = () => {
  const { error } = useSelector((state) => state.group);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      dispatch(
        snackbarAddMessageToQueue({
          message: error?.message ? error.message : error,
        })
      );
    }
  }, [error]);

  const onGroupPressed = ({ groupId, name, isModerator }) => {
    dispatch(setSelectedGroup({ groupId }));
    navigate(SCREENS.appStack.group, { name, isModerator });
  };

  const CreateGroupHeaderAction = () => {
    const pressableStyle = ({ pressed }) => ({ opacity: pressed ? 0.5 : 1 });

    return (
      <Pressable
        onPress={() => navigate(SCREENS.appStack.createGroup)}
        style={pressableStyle}
        hitSlop={16}
      >
        <MaterialCommunityIcons
          name="folder-plus"
          size={scale(28)}
          color={SUBTITLE_GRAY_COLOR}
        />
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopBar title="Groups" headerRight={<CreateGroupHeaderAction />} />
      <GroupList onPress={onGroupPressed} />
    </SafeAreaView>
  );
};

export default Groups;
