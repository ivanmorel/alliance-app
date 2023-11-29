/* eslint-disable react/prop-types */
import React, { useRef } from "react";
import { FlatList, Pressable, SectionList, View } from "react-native";

import PropTypes from "prop-types";
import { Swipeable } from "react-native-gesture-handler";
import { Text } from "react-native-paper";
import { scale } from "react-native-size-matters/extend";

import { useDispatch } from "react-redux";
import { activityGlobalRemove, showActivity } from "@actions";

import { TEST_IDS } from "@utils/constants";
import { formatDate } from "@utils/utils";

import { ListItemCard, SectionTitle } from "@components";

import { PRIMARY_COLOR } from "@styles/styleConstants";
import { theme } from "@styles/theme";

import styles from "./ActivitiesList.style";
import {
  getActivityConfigByType,
  getActivityTextByType,
  getDate,
  getIcon,
  handleGroupActivityTitle,
} from "./ActivitiesList.utils";

const RenderActivityItem = ({ item, groupActivities, onRefresh }) => {
  const dispatch = useDispatch();
  const swipeRef = useRef();
  const { timestamp, type, data } = item?.item;
  const activityConfig = getActivityConfigByType(type);
  if (!activityConfig || !data) return null;

  const [title, subtitle] = getActivityTextByType(type, data);
  const groupTitle = handleGroupActivityTitle(type, groupActivities);
  const { iconName, color, route, navigationParams, preScreen } =
    activityConfig;

  const maskAsReadPressed = async () => {
    const [activity] = Object.keys(data);
    const { activityId, groupId, opportunityId, businessId } = data[activity];
    let info = {};
    if (groupId) {
      info = { groupId };
    } else if (opportunityId) {
      info = { opportunityId };
    } else if (businessId) {
      info = { businessId };
    }

    const response = await dispatch(
      activityGlobalRemove([
        {
          activityType: type,
          activityId,
          ...info,
        },
      ])
    );
    swipeRef?.current?.close();
    response && onRefresh();
  };

  return (
    <Swipeable
      ref={swipeRef}
      renderRightActions={() => (
        <Pressable
          onPress={maskAsReadPressed}
          style={{
            backgroundColor: PRIMARY_COLOR,
            justifyContent: "center",
            width: "50%",
            alignItems: "center",
            flexDirection: "row",
            flexWrap: "nowrap",
            marginBottom: scale(8),
          }}
        >
          <Text
            style={{
              color: "white",
              ...theme.fonts.bold,
              fontSize: scale(14),
            }}
          >
            MARK AS READ
          </Text>
        </Pressable>
      )}
      enabled={!groupActivities}
      overshootRight={false}
    >
      <ListItemCard
        avatarIcon={getIcon({ iconName, color })}
        title={groupTitle || title}
        subtitle={subtitle}
        caption={formatDate(timestamp, "t")}
        onPress={() =>
          dispatch(
            showActivity({
              type,
              data,
              route,
              navigationParams,
              preScreen,
              groupActivities,
            })
          )
        }
      />
    </Swipeable>
  );
};

const ActivitiesList = ({
  activities,
  onRefresh,
  loading,
  emptyStateComponent = null,
  groupActivities = false,
  sections = false,
  listHeaderComponent = null,
}) => {
  return (
    <View style={styles.container} testID={TEST_IDS.activities.screenContainer}>
      {sections ? (
        <SectionList
          sections={activities}
          onRefresh={onRefresh}
          renderItem={(item) => (
            <RenderActivityItem
              item={item}
              groupActivities={groupActivities}
              onRefresh={onRefresh}
            />
          )}
          keyExtractor={(item, index) =>
            getDate(item.timestamp)
              .getTime()
              .toString()
              .concat(index.toString())
          }
          refreshing={loading}
          ListEmptyComponent={!loading ? emptyStateComponent : null}
          contentContainerStyle={styles.listContainer}
          renderSectionHeader={({ section: { title } }) => (
            <SectionTitle title={title} />
          )}
          stickySectionHeadersEnabled
          ListHeaderComponent={listHeaderComponent}
        />
      ) : (
        <FlatList
          data={activities}
          onRefresh={onRefresh}
          renderItem={(item) => (
            <RenderActivityItem
              item={item}
              groupActivities={groupActivities}
              onRefresh={onRefresh}
            />
          )}
          keyExtractor={(item, index) =>
            getDate(item.timestamp)
              .getTime()
              .toString()
              .concat(index.toString())
          }
          refreshing={loading}
          ListEmptyComponent={!loading ? emptyStateComponent : null}
          contentContainerStyle={styles.listContainer}
          ListHeaderComponent={listHeaderComponent}
        />
      )}
    </View>
  );
};

export default ActivitiesList;

ActivitiesList.propTypes = {
  activities: PropTypes.array.isRequired,
  onRefresh: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  emptyStateComponent: PropTypes.element,
  groupActivities: PropTypes.bool,
  sections: PropTypes.bool,
  listHeaderComponent: PropTypes.element,
};
