import React, { useEffect, useRef, useState } from "react";
import { FlatList, KeyboardAvoidingView, View } from "react-native";

import { useIsFocused } from "@react-navigation/native";
import { hasNotch } from "react-native-device-info";

import { useDispatch, useSelector } from "react-redux";
import {
  activityGlobalGet,
  activityGlobalRemove,
  activityGroupGet,
  chatListLeadMessage,
  chatSendLeadMessage,
} from "@actions";
import { ACTIVITY_TYPES } from "@constants";

import { formatDate, isIOS } from "@utils/utils";

import { ChatFooter, Empty, ListItemCard } from "@components";

import styles from "./LeadComments.style";

const LeadComments = () => {
  const dispatch = useDispatch();
  const { leadMessages } = useSelector(({ chat }) => chat);
  const {
    loading,
    currentLead: { leadId, groupId },
  } = useSelector(({ lead }) => lead);
  const { firstName = "", lastName = "" } = useSelector(
    (state) => state.user.appUser || {}
  );

  const groupActivities = useSelector(
    (state) => state.activity.activities?.[`group-${groupId}`]
  );
  const [chatMessage, setChatMessage] = useState("");
  const [keyboardActive, setKeyboardActive] = useState(false);
  let flatListRef = useRef();
  const isFocused = useIsFocused();
  const getChatListLeadMessages = () => {
    dispatch(
      chatListLeadMessage({
        leadId,
      })
    );
  };

  const scrollToEnd = () => {
    flatListRef?.current?.scrollToEnd({ animated: true });
  };

  // Remove lead chat activities
  useEffect(() => {
    if (!isFocused || !leadId || !groupId || !groupActivities?.length) return;

    const leadChatActivities = groupActivities?.filter((activity) => {
      return (
        activity?.type === ACTIVITY_TYPES.CHAT_NEW_LEAD_MESSAGE &&
        activity?.data?.chatLeadMessage?.leadId === leadId
      );
    });

    if (!leadChatActivities?.length) return;
    leadChatActivities.forEach((activity) => {
      dispatch(
        activityGlobalRemove([
          {
            activityType: activity.type,
            groupId,
            activityId: activity.data?.chatLeadMessage?.activityId,
          },
        ])
      );
    });
    // Refresh activities
    setTimeout(() => {
      dispatch(activityGroupGet(groupId));
      dispatch(activityGlobalGet());
    }, 500);
  }, [isFocused, leadId, groupId, groupActivities]);

  useEffect(() => {
    setTimeout(() => scrollToEnd(), 1);
  }, [keyboardActive]);

  const onRefresh = () => {
    dispatch(activityGroupGet(groupId));
    getChatListLeadMessages();
  };

  useEffect(() => {
    if (!isFocused || !groupId || !leadId) return;
    onRefresh();
  }, [isFocused, groupId, leadId]);

  const onSendMessage = () => {
    if (chatMessage) {
      dispatch(
        chatSendLeadMessage({
          message: chatMessage.trim(),
          roomId: leadMessages.roomId,
          user: { firstName, lastName },
        })
      );
      setChatMessage("");
    }
  };

  const renderLeadChat = ({ item }) => {
    const { user, timestamp, message } = item;

    return (
      <ListItemCard
        title={` ${user.firstName} ${user.lastName}`}
        caption={formatDate(timestamp)}
        subtitle={message}
        // TODO: Only show a few lines and allow this card to be expanded
        subtitleLines={500}
      />
    );
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        flex={1}
        style={styles.keyboardAvoidContainer}
        behavior={isIOS() ? "padding" : "height"}
        keyboardVerticalOffset={hasNotch() ? 112 : 72}
      >
        <FlatList
          contentContainerStyle={styles.listContainer}
          data={leadMessages.messages || []}
          renderItem={renderLeadChat}
          keyExtractor={(item, index) => `${index}-${item.timestamp}`}
          onContentSizeChange={scrollToEnd}
          ref={flatListRef}
          onRefresh={onRefresh}
          refreshing={loading}
          ListEmptyComponent={
            <Empty
              image={require("@assets/messages-lead-empty.png")}
              title="There’s not much here yet."
              subtitle="Leave a comment to provide additional information or share your experience(s) working with this lead"
            />
          }
        />
        <ChatFooter
          message={chatMessage}
          setMessage={setChatMessage}
          onSendMessage={onSendMessage}
          onFocus={() => setKeyboardActive(true)}
          onBlur={() => setKeyboardActive(false)}
          placeholder="Enter your comment"
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default LeadComments;
