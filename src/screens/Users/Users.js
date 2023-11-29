import React, { useCallback, useState } from "react";
import { FlatList, View } from "react-native";

import { useFocusEffect } from "@react-navigation/native";
import { Rating } from "react-native-ratings";
import { moderateScale } from "react-native-size-matters/extend";

import { useDispatch, useSelector } from "react-redux";
import {
  activityGlobalRemove,
  activityGroupGet,
  listGroupUsers,
  removeUser,
} from "@actions";
import { ACTIVITY_TYPES } from "@constants";

import {
  ConfirmationModal,
  ListItemCard,
  RightSwipeAction,
  SwipeableButtonWithDelete,
} from "@components";

import { STAR_COLOR } from "@styles/styleConstants";

import styles from "./Users.style";

const Users = () => {
  const dispatch = useDispatch();
  const [isModalVisible, setVisible] = useState(false);
  const [removeUserInfo, setRemoveUserInfo] = useState({});
  const { groupId, users, createdBy, name } = useSelector(
    (state) => state.group.selectedGroup
  );
  const { selectedGroupUsers, loading } = useSelector((state) => state.group);
  const currentUserId = useSelector(({ user }) => user.appUser.userId);
  const groupActivities = useSelector(
    (state) => state.activity.activities?.[`group-${groupId}`]
  );

  const isUserModerator = currentUserId === createdBy;

  useFocusEffect(
    useCallback(() => {
      onRefresh();
    }, [])
  );

  const handleRemoveUserPressed = (info) => {
    setRemoveUserInfo(info);
    setVisible(true);
  };

  const onRefresh = () => {
    if (!groupId) return;
    dispatch(activityGroupGet(groupId));
    dispatch(listGroupUsers({ groupId }));
  };

  const handleUserPressed = (activityId, activityType) => {
    dispatch(
      activityGlobalRemove([
        {
          activityType,
          groupId,
          activityId,
        },
      ])
    );
    onRefresh();
  };

  const onModalConfirm = async () => {
    setVisible(false);
    dispatch(removeUser({ groupId, userId: removeUserInfo?.userId }));
  };

  const renderUserItem = ({ item }) => {
    const { firstName, lastName, userId, rating, submitted } = item;
    const product = users?.find((user) => user?.userId === userId)?.product;
    const userActivity = groupActivities?.find(
      (activity) =>
        (activity?.type === ACTIVITY_TYPES.GROUP_NEW_USER &&
          activity?.data?.groupNewUser?.activityId === userId) ||
        (activity?.type === ACTIVITY_TYPES.GROUP_NEW_USER_ADDED &&
          activity?.data?.groupNewUserAdded?.activityId === userId)
    );

    const isUserNew = !!userActivity;
    const activityType = userActivity?.type;

    return (
      <SwipeableButtonWithDelete
        rightSwipeAction={() => (
          <RightSwipeAction
            text="Remove User"
            onPress={() =>
              handleRemoveUserPressed({ userId, firstName, lastName })
            }
          />
        )}
        enabled={isUserModerator}
      >
        <ListItemCard
          avatarText={`${firstName.charAt(0).toUpperCase()}${lastName
            .charAt(0)
            .toUpperCase()}`}
          title={`${firstName} ${lastName}`}
          subtitle={product}
          caption={`${submitted} lead${submitted !== 1 ? "s" : ""}`}
          icon={
            <Rating
              type="custom"
              ratingColor={STAR_COLOR}
              startingValue={rating}
              imageSize={Math.round(moderateScale(20))}
              readonly
            />
          }
          isNew={isUserNew}
          onPress={() => isUserNew && handleUserPressed(userId, activityType)}
          avatarId={userId}
        />
      </SwipeableButtonWithDelete>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        onRefresh={onRefresh}
        refreshing={loading}
        data={selectedGroupUsers}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.userId.toString()}
      />
      <ConfirmationModal
        visible={isModalVisible}
        titleIcon="delete"
        okIcon="trash-can-outline"
        title="Remove User"
        okTitle="Remove user"
        descriptionText="Do you really want to remove this user from the group:"
        descriptionBold={name}
        afterDescriptionText="?"
        warningText="This operation cannot be undone and the user will lose permanent access to all group data."
        onOk={onModalConfirm}
        onCancel={() => setVisible(false)}
      />
    </View>
  );
};

export default Users;
