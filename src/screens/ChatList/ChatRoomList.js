import React, { useEffect } from "react";
import { FlatList, Image, View } from "react-native";

import { useIsFocused, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useDispatch, useSelector } from "react-redux";
import {
  activityGlobalGet,
  activityGlobalRemove,
  chatFetchRoomSuccess,
  chatRoomList,
  chatRoomListReset,
} from "@actions";

import { navigate } from "@routes/navigator";
import { CreateRoomIcon } from "@routes/navigatorUtils";
import { SCREENS } from "@routes/routes.constants";

import { GROUP_CHAT_TYPES, ROOM_TYPES } from "@utils/constants";
import {
  formatDate,
  getActivitiesIdFromRoomId,
  getTotalBadgeCountByRoomId,
} from "@utils/utils";

import {
  ListItemCard,
  MarkAsReadRightSwipe,
  SwipeableButtonWithDelete,
  TopBar,
} from "@components";

import groupIcon from "@assets/group-messages-tab-icon-white.png";
import opportunitiesIcon from "@assets/opportunities-icon-white.png";

import styles from "./ChatList.style";
import style from "./ChatRoomList.style";

const ChatRoomList = () => {
  const dispatch = useDispatch();
  const { type, id, name, hideTopBar } = useRoute()?.params;
  const { loading, rooms } = useSelector(({ chat }) => chat);
  const isFocused = useIsFocused();
  const globalActivities = useSelector(
    (state) => state.activity.activities?.global
  );

  // eslint-disable-next-line react/prop-types
  const Container = ({ children }) => {
    if (hideTopBar) {
      return <React.Fragment>{children}</React.Fragment>;
    }
    return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
  };

  const onRefresh = () => {
    dispatch(activityGlobalGet());
    dispatch(chatRoomList({ grouping_level: type, grouping_level_id: id }));
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
    const {
      name,
      lastMessage,
      roomId,
      getstreamChannelId,
      roomType,
      groupingLevel,
    } = item;
    const { message, timestamp, attachment } = lastMessage;
    const badgeCount = getTotalBadgeCountByRoomId({
      activities: globalActivities,
      roomId,
    });
    let icon = null;

    if (roomType === ROOM_TYPES.default) {
      const source =
        groupingLevel === GROUP_CHAT_TYPES.group
          ? groupIcon
          : opportunitiesIcon;

      icon = (
        <View style={style.iconContainer}>
          <Image source={source} style={style.icon} />
        </View>
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
          title={"#" + name}
          caption={timestamp ? formatDate(timestamp) : ""}
          avatarIcon={icon}
          subtitle={attachment ? attachment.fileName : message}
          subtitleLines={2}
          badgeCount={badgeCount}
          onPress={() => {
            dispatch(chatFetchRoomSuccess(item));
            navigate(SCREENS.appStack.chat, {
              roomId,
              getstreamChannelId,
            });
          }}
        />
      </SwipeableButtonWithDelete>
    );
  };

  return (
    <Container>
      {!hideTopBar ? (
        <TopBar
          iconLeft="back"
          titleLeftAligned
          title={name}
          headerRight={
            <CreateRoomIcon
              onPress={() =>
                navigate(SCREENS.appStack.inviteUsersToChat, {
                  isNewChat: true,
                  groupingLevel: type,
                  groupingLevelId: id,
                })
              }
            />
          }
        />
      ) : null}
      <FlatList
        onRefresh={onRefresh}
        refreshing={loading}
        renderItem={renderChatListItem}
        data={rooms}
        keyExtractor={(item) => item.roomId}
        contentContainerStyle={styles.listContainer}
      />
    </Container>
  );
};

export default ChatRoomList;
