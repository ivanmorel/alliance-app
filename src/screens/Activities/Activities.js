import React, { useEffect } from "react";
import { View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import PropTypes from "prop-types";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters/extend";

import { useDispatch, useSelector } from "react-redux";
import { activityGlobalGet } from "@actions";
import { globalMessagesBadgeCountTypes } from "@constants";

import { navigate } from "@routes/navigator";
import { SCREENS } from "@routes/routes.constants";

import { useSectionActivities } from "@hooks";

import { ActivitiesList, Empty, ListItemCard, TopBar } from "@components";

import { CONFIRM_COLOR } from "@styles/styleConstants";

import styles from "./Activities.style";

const Activities = () => {
  const dispatch = useDispatch();
  const {
    activities,
    counts: {
      global: {
        messages: {
          groups: groupMessagesCount,
          users: userMessagesCount,
          opportunities: opportunityMessagesCount,
          business: businessMessageCount,
          total: totalMessagesCount,
        },
      },
    },
    loading,
  } = useSelector(({ activity }) => activity);
  const isFocused = useIsFocused();
  const filteredActivities =
    activities?.global?.filter(
      ({ type }) => !globalMessagesBadgeCountTypes.includes(type)
    ) || [];
  const sectionedActivities = useSectionActivities(filteredActivities);
  const directMessages =
    userMessagesCount > 0 ? `${userMessagesCount} direct messages` : "";
  const groupMessages =
    groupMessagesCount > 0 ? `${groupMessagesCount} group messages` : "";
  const opportunityMessages =
    opportunityMessagesCount > 0
      ? `${opportunityMessagesCount} opportunity messages`
      : "";
  const businessMessages =
    businessMessageCount > 0 ? `${businessMessageCount} business messages` : "";

  const hasMessages = totalMessagesCount > 0;
  const getActivities = () => {
    dispatch(activityGlobalGet());
  };

  useEffect(() => {
    if (isFocused) {
      getActivities();
    }
  }, [isFocused]);

  const handleGoToGroupsPressed = () => {
    navigate(SCREENS.appStack.groups);
  };

  const renderEmptyStateComponent = () => (
    <Empty
      image={require("@assets/activities-empty.png")}
      title="No new activities"
      actions={[
        {
          text: "Go to groups",
          onPress: handleGoToGroupsPressed,
        },
      ]}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <TopBar
        title="Activities"
        showBackArrow={false}
        // TODO: Dismiss actions will be added at a later time
        // headerRight={<DismissAllActivitiesAction />}
      />
      <ActivitiesList
        activities={sectionedActivities}
        onRefresh={getActivities}
        loading={loading}
        loadMore={getActivities}
        emptyStateComponent={
          !loading && !hasMessages ? renderEmptyStateComponent() : null
        }
        sections
        listHeaderComponent={
          hasMessages ? (
            <ListItemCard
              avatarIcon={
                <View style={styles.icon}>
                  <MaterialCommunityIcons
                    name="email"
                    size={scale(24)}
                    color={CONFIRM_COLOR}
                  />
                </View>
              }
              title={`You have ${totalMessagesCount} new messages`}
              subtitle={[
                directMessages,
                groupMessages,
                opportunityMessages,
                businessMessages,
              ]
                .filter((value) => value)
                .join(", ")}
              subtitleLines={2}
              containerStyle={styles.newMessageContainer}
              titleStyle={styles.newMessageText}
              subtitleStyle={styles.newMessageText}
              onPress={() => {
                navigate(SCREENS.appStack.messages);
              }}
            />
          ) : null
        }
      />
    </SafeAreaView>
  );
};

Activities.propTypes = {
  navigation: PropTypes.any,
};

export default Activities;
