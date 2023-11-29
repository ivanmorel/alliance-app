import React, { useEffect, useMemo } from "react";
import { FlatList, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { scale } from "react-native-size-matters/extend";

import { useDispatch, useSelector } from "react-redux";
import {
  activityGlobalGet,
  activityGlobalRemove,
  chatFetchRoomSuccess,
  chatRoomList,
  chatRoomListReset,
} from "@actions";

import { navigate } from "@routes/navigator";
import { SCREENS } from "@routes/routes.constants";

import { GROUP_CHAT_TYPES } from "@utils/constants";
import {
  formatDate,
  getActivitiesIdFromRoomId,
  getTotalBadgeCountByRoomId,
} from "@utils/utils";

import {
  Empty,
  ListItemCard,
  MarkAsReadRightSwipe,
  OSRAvatar,
  SwipeableButtonWithDelete,
} from "@components";

import style from "../../components/ListItemCard/ListItemCard.style";
import styles from "./ChatList.style";

const ChatList = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { loading, rooms } = useSelector(({ chat }) => chat);
  const currentUserId = useSelector((state) => state.user.userId);
  const isFocused = useIsFocused();
  const globalActivities = useSelector(
    (state) => state.activity.activities?.global
  );

  const onRefresh = () => {
    dispatch(activityGlobalGet());
    dispatch(chatRoomList({ grouping_level: GROUP_CHAT_TYPES.user }));
  };

  useEffect(() => {
    isFocused ? onRefresh() : dispatch(chatRoomListReset());
  }, [isFocused, globalActivities?.length]);

  const handleMarkAsRead = async (roomId) => {
    const seenActivities = getActivitiesIdFromRoomId(roomId, globalActivities);
    const response = await dispatch(activityGlobalRemove(seenActivities));
    response && dispatch(activityGlobalGet());
  };

  const renderChatListItem = ({ item }) => {
    const { name, lastMessage, users, roomId, getstreamChannelId } = item;
    const { message, timestamp, attachment } = lastMessage;
    const isMultiGroup = users.length > 2;
    const badgeCount = getTotalBadgeCountByRoomId({
      activities: globalActivities,
      roomId,
    });

    let icon = null;
    if (isMultiGroup) {
      icon = (
        <View style={styles.iconStyle}>
          <MaterialCommunityIcons
            name="account-multiple"
            size={scale(24)}
            color="rgba(51, 51, 51, 0.75)"
          />
        </View>
      );
    } else {
      const { userId: otherUserId } =
        users.find(({ userId }) => userId !== currentUserId) || {};
      const [firstName = "", lastName = ""] = name.split(" ");
      icon = (
        <OSRAvatar
          size={48}
          label={firstName.charAt(0) + lastName.charAt(0)}
          userId={otherUserId}
          avatarStyle={style.avatar}
          labelStyle={style.avatarLabel}
        />
      );
    }
    return (
      <SwipeableButtonWithDelete
        rightSwipeAction={() => (
          <MarkAsReadRightSwipe
            maskAsReadPressed={() => handleMarkAsRead(roomId)}
          />
        )}
        enabled={!!badgeCount}
      >
        <ListItemCard
          title={name}
          caption={timestamp ? formatDate(timestamp) : ""}
          subtitle={attachment ? attachment.fileName : message}
          avatarIcon={icon}
          subtitleLines={2}
          onPress={() => {
            dispatch(chatFetchRoomSuccess(item));
            navigation.navigate(SCREENS.appStack.chat, {
              roomId,
              getstreamChannelId,
            });
          }}
          badgeCount={badgeCount}
        />
      </SwipeableButtonWithDelete>
    );
  };

  const renderEmptyStateComponent = useMemo(() => {
    let image = require("@assets/messages-empty.png");

    return (
      <Empty
        image={image}
        title="Looks like it is a bit quiet in here..."
        subtitle="Start a conversation with other members and expand your network"
        actions={[
          {
            text: "START A NEW CONVERSATION",
            onPress: () =>
              navigate(SCREENS.appStack.inviteUsersToChat, {
                isNewChat: true,
                groupingLevel: GROUP_CHAT_TYPES.user,
                groupingLevelId: null,
              }),
          },
        ]}
      />
    );
  }, []);

  return (
    <FlatList
      onRefresh={onRefresh}
      refreshing={loading}
      renderItem={renderChatListItem}
      data={rooms}
      keyExtractor={(item) => item.roomId}
      // dev note, since we are sending a jacob chat, this will never happen. removing it so that we don't have
      // a blink
      ListEmptyComponent={!loading && renderEmptyStateComponent}
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default ChatList;
