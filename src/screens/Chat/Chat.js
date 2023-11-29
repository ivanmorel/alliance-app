import React, { useEffect, useState } from "react";
import { Linking, Pressable, TouchableOpacity, View } from "react-native";

import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { DateTime } from "luxon";
import { hasNotch } from "react-native-device-info";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";
import {
  Channel,
  Chat,
  InputButtons,
  MessageInput,
  MessageList,
  OverlayProvider,
  ReactionList,
} from "stream-chat-expo";

import { useDispatch, useSelector } from "react-redux";
import {
  activityGlobalGet,
  activityGlobalRemove,
  chatGetStreamConnect,
  chatGetStreamConnectReset,
  snackbarAddMessageToQueue,
} from "@actions";

import { client } from "@services/getStream";

import { navigate } from "@routes/navigator";
import { CreateRoomIcon } from "@routes/navigatorUtils";
import { SCREENS } from "@routes/routes.constants";

import {
  CHAT_CHANNEL_TYPES,
  CHAT_CONNECT_MAX_ATTEMPTS,
  OSR_FOLDER_NAME,
} from "@utils/constants";
import {
  downloadToFolder,
  formatDate,
  getActivitiesIdFromRoomId,
  isIOS,
} from "@utils/utils";

import {
  AppLoader,
  Button,
  Empty,
  LinkTo,
  ListItemCard,
  Text,
  TopBar,
} from "@components";

import {
  SUBTITLE_STRONG_GRAY_COLOR,
  TITLE_FONT_COLOR,
} from "@styles/styleConstants";

import styles, { getStreamStyles, maxWidth } from "./Chat.style";

const GetStreamChatRoom = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { top } = useSafeAreaInsets();
  const [channel, setChannel] = useState(null);
  const [downloadingFile, setDownloadingFile] = useState(false);
  const { currentRoom, loading, getStreamConnectionAttempts } = useSelector(
    ({ chat }) => chat
  );
  const isActivityLoading = useSelector(({ activity }) => activity.loading);
  const globalActivities = useSelector(
    ({ activity }) => activity.activities?.global
  );
  const {
    name: roomName,
    roomId: roomIdFromRedux,
    getstreamChannelId: getstreamChannelIdFromRedux,
    groupingLevel,
    users,
    ownerId,
  } = currentRoom;
  const isMaxAttempts = getStreamConnectionAttempts > CHAT_CONNECT_MAX_ATTEMPTS;
  const {
    getstreamChannelId: getstreamChannelIdFromParams,
    roomId: roomIdFromParams,
    hideTopBar = false,
  } = useRoute().params;
  const roomId = roomIdFromRedux || roomIdFromParams;
  const getstreamChannelId =
    getstreamChannelIdFromRedux || getstreamChannelIdFromParams;

  // `getstreamChannelType` was added to the api response after the initial work
  // was completed, so we'll keep using `groupingLevel` to get the type for now
  const messageType = CHAT_CHANNEL_TYPES[groupingLevel];

  const bottomInset = hasNotch() ? -24 : 0;
  const verticalOffset = isIOS() ? top + 64 : 0;

  const isLead = messageType === CHAT_CHANNEL_TYPES.ROOM_GROUPING_LEAD;
  let channelPropsForLead;
  if (isLead) {
    channelPropsForLead = {
      enableMessageGroupingByUser: false,
      forceAlignMessages: "left",
      hideStickyDateHeader: true,
      hideDateSeparators: true,
      disableTypingIndicator: true,
      MessageFooter: () => null,
      MessageAvatar: () => null,
      MessageStatus: () => null,
      ReactionList: () => <ReactionList messageContentWidth={maxWidth} />,
      MessageText: (props) => {
        /* eslint-disable react/prop-types */
        const date = DateTime.fromJSDate(props.message?.created_at);

        return (
          <ListItemCard
            title={props.message?.user?.name}
            caption={formatDate(date)}
            subtitle={props.message?.text}
            // TODO: Only show a few lines and allow this card to be
            // expanded
            subtitleLines={500}
            containerStyle={{ marginHorizontal: 0 }}
          />
        );
        /* eslint-enable react/prop-types */
      },
    };
  }

  useEffect(() => {
    if (loading || !client || isMaxAttempts) return;

    const connectChat = async () => {
      const connectSuccess = await dispatch(chatGetStreamConnect());
      if (!connectSuccess) return;

      const channel = client.channel(messageType, getstreamChannelId);
      setChannel(channel);
    };

    connectChat();
  }, [loading, isMaxAttempts]);

  // Remove chat activities for this room whenever activities finishes loading
  useEffect(() => {
    const removeChatRoomActivities = async () => {
      if (isActivityLoading || !globalActivities?.length) return;

      const seenActivities = getActivitiesIdFromRoomId(
        roomId,
        globalActivities
      );
      if (seenActivities.length > 0) {
        const response = await dispatch(activityGlobalRemove(seenActivities));
        response && dispatch(activityGlobalGet());
      }
    };

    !isActivityLoading && removeChatRoomActivities();
  }, [isActivityLoading]);

  // Always refresh global activities on screen focus
  useEffect(() => {
    if (!isFocused) return;
    dispatch(activityGlobalGet());
  }, [isFocused]);

  const renderLoadingOrFailed = () => {
    return isMaxAttempts ? (
      <View style={styles.flexCentered}>
        <Text style={styles.errorText}>
          There was an error loading this chat room.
        </Text>
        <Button
          variant
          text="Try again"
          onPress={() => dispatch(chatGetStreamConnectReset())}
        />
        <LinkTo
          text="Need help?"
          linkText="Contact support"
          onPress={() => Linking.openURL("mailto:support@allianceapp.com")}
        />
      </View>
    ) : (
      <AppLoader
        title={
          getStreamConnectionAttempts > 3
            ? "Hang tight, we'll try a few more times!"
            : "Loading chat messages..."
        }
      />
    );
  };

  return (
    <SafeAreaView style={[styles.container, { marginTop: isLead ? -top : 0 }]}>
      {!hideTopBar ? (
        <TopBar
          iconLeft="back"
          titleLeftAligned
          title={roomName}
          maxLeftAlignedTitleWidth="70%"
          headerRight={
            <View style={styles.iconContainer}>
              <CreateRoomIcon
                onPress={() =>
                  navigate(SCREENS.appStack.inviteUsersToChat, {
                    isNewChat: false,
                    roomId,
                  })
                }
              />
              <Pressable
                hitSlop={8}
                onPress={() =>
                  navigate(SCREENS.appStack.chatSettings, {
                    roomId,
                    roomName,
                    ownerId,
                    userCount: users.length,
                  })
                }
                style={styles.settingsButton}
              >
                <MaterialCommunityIcons
                  name="cog"
                  size={scale(24)}
                  color={TITLE_FONT_COLOR}
                />
              </Pressable>
            </View>
          }
        />
      ) : null}
      <View style={styles.innerContainer}>
        {loading || !channel ? (
          <View style={styles.flexCentered}>{renderLoadingOrFailed()}</View>
        ) : (
          <OverlayProvider
            bottomInset={bottomInset}
            imageGalleryCustomComponents={{
              footer: {
                leftElement: ({ photo, share, shareMenuOpen }) => (
                  <>
                    <TouchableOpacity
                      accessibilityLabel="Download Button"
                      disabled={downloadingFile || shareMenuOpen}
                      onPress={async () => {
                        setDownloadingFile(true);
                        dispatch(
                          snackbarAddMessageToQueue({
                            message: "Downloading file...",
                          })
                        );

                        const splitURI = photo?.uri?.split("?")[0]?.split(".");
                        const filename = splitURI?.slice(-2)?.join(".");
                        if (!filename) return;

                        const isDownloadSuccess = await downloadToFolder(
                          photo?.uri,
                          filename,
                          OSR_FOLDER_NAME,
                          false
                        );

                        setDownloadingFile(false);
                        dispatch(
                          snackbarAddMessageToQueue({
                            message: isDownloadSuccess
                              ? "File download complete"
                              : // TODO: ensure the error is added to redux state
                                // bugsnag debugging
                                "Failed to download the file. If the problem persists please contact support@allianceapp.com",
                          })
                        );
                      }}
                    >
                      <View style={styles.imageGalleryFooterLeftIcon}>
                        <MaterialIcons
                          name="file-download"
                          size={scale(24)}
                          color={SUBTITLE_STRONG_GRAY_COLOR}
                        />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      accessibilityLabel="Share Button"
                      disabled={shareMenuOpen}
                      onPress={share}
                    >
                      <View style={styles.imageGalleryFooterLeftIcon}>
                        <MaterialCommunityIcons
                          name="share"
                          size={scale(24)}
                          color={SUBTITLE_STRONG_GRAY_COLOR}
                        />
                      </View>
                    </TouchableOpacity>
                  </>
                ),
                rightElement: ({ openGridView }) => (
                  <>
                    <View
                      style={[
                        styles.imageGalleryFooterRightIcon,
                        styles.imageGalleryFooterRightSpacer,
                      ]}
                    />
                    <TouchableOpacity onPress={openGridView}>
                      <View style={styles.imageGalleryFooterRightIcon}>
                        <MaterialCommunityIcons
                          name="dots-grid"
                          size={scale(24)}
                          color={SUBTITLE_STRONG_GRAY_COLOR}
                        />
                      </View>
                    </TouchableOpacity>
                  </>
                ),
              },
            }}
          >
            <Chat client={client} style={isLead ? getStreamStyles : {}}>
              <Channel
                channel={channel}
                keyboardVerticalOffset={verticalOffset}
                messageActions={({ copyMessage, quotedReply, reply }) =>
                  isLead ? [copyMessage] : [copyMessage, quotedReply, reply]
                }
                EmptyStateIndicator={() => (
                  <Empty
                    image={require("@assets/messages-empty.png")}
                    title="Looks like it is a bit quiet in here..."
                    subtitle={`Start a conversation with ${roomName} now!`}
                  />
                )}
                {...channelPropsForLead}
              >
                <MessageList />
                <MessageInput
                  InputButtons={
                    isLead ? null : () => <InputButtons hasCommands={false} />
                  }
                  additionalTextInputProps={{
                    placeholder: isLead ? "Add a comment" : "Send a message",
                  }}
                />
              </Channel>
            </Chat>
          </OverlayProvider>
        )}
      </View>
    </SafeAreaView>
  );
};

export default GetStreamChatRoom;
