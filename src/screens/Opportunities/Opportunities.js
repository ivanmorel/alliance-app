import React, { useEffect, useState } from "react";
import { FlatList, Image, Pressable, View } from "react-native";

import { useIsFocused, useRoute } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import { useDispatch, useSelector } from "react-redux";
import {
  activityGlobalGet,
  opportunityConvertLead,
  opportunityList,
} from "@actions";

import { navigate } from "@routes/navigator";
import { SCREENS } from "@routes/routes.constants";

import { getTotalBadgeCountById } from "@utils/utils";

import { Empty, ListItemCard, TopBar } from "@components";

import opportunitiesIcon from "@assets/opportunities-icon.png";

import { styles } from "./Opportunities.style";

const Opportunities = () => {
  const dispatch = useDispatch();
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const {
    loading,
    opportunities: allOpportunities,
    convertLeadSuccess,
    convertLeadInfo,
  } = useSelector((state) => state.opportunity);
  const activities = useSelector((state) => state.activity.activities);
  const userId = useSelector(({ user }) => user.userId);
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();
  const { params: { leadId } = {} } = useRoute();
  let opportunities = allOpportunities;
  if (leadId) {
    opportunities = opportunities.filter((opportunity) => {
      return opportunity?.leadId === leadId;
    });
  }

  // Handle any snackbars
  useEffect(() => {
    if (!snackbarVisible) return;
    setSnackbarVisible(true);
  }, [snackbarVisible]);

  const fetchOpportunities = () => {
    if (loading) return;
    dispatch(opportunityList());
    dispatch(activityGlobalGet());
  };

  useEffect(() => {
    if (!isFocused) return;
    fetchOpportunities();
  }, [isFocused]);

  useEffect(() => {
    if (!convertLeadSuccess) return;

    navigate(SCREENS.appStack.opportunities);
    navigate(SCREENS.appStack.opportunityDetail, {
      screen: SCREENS.opportunityDetailTabs.information,
      isEditing: true,
      opportunityId: convertLeadInfo?.opportunityId,
      opportunityName: convertLeadInfo?.name,
    });
  }, [convertLeadSuccess]);

  const pressableHeaderIconStyle = ({ pressed }) => [
    { opacity: pressed ? 0.5 : 1, marginLeft: scale(16) },
  ];

  const CreateOpportunityAction = () => (
    <Pressable
      hitSlop={8}
      onPress={() => navigate(SCREENS.appStack.createOpportunity)}
      style={pressableHeaderIconStyle}
    >
      <Image source={opportunitiesIcon} style={styles.opportunitiesIcon} />
    </Pressable>
  );

  const handleOpportunityPressed = ({ opportunityId, opportunityName }) => {
    navigate(SCREENS.appStack.opportunityDetail, {
      screen: SCREENS.opportunityDetailTabs.information,
      opportunityId,
      opportunityName,
    });
  };

  const renderOpportunityItem = ({ item }) => {
    const badgeCount = getTotalBadgeCountById({
      activities: activities.global,
      opportunityId: item.opportunityId,
    });

    return (
      <ListItemCard
        title={item.name}
        caption={`${item.contacts?.length} contact${
          item.contacts?.length > 1 ? "s" : ""
        }`}
        subtitle={`Created by ${item.createdByName}`}
        subtitleLines={2}
        onPress={() => handleOpportunityPressed(item)}
        badgeCount={badgeCount}
        titleIcon={
          item.createdBy === userId ? (
            <FontAwesome5
              name="crown"
              size={scale(12)}
              color="rgba(51, 51, 51, 0.9)"
              style={styles.moderatorIcon}
            />
          ) : null
        }
      />
    );
  };

  const renderEmptyStateComponent = () => {
    if (leadId) {
      return (
        <Empty
          image={require("@assets/group-activities-empty.png")}
          title="Not an opportunity yet?"
          actions={[
            {
              heading:
                "Create a new opportunity for this lead and help people sell more!",
              text: "Create an opportunity",
              onPress: () =>
                dispatch(opportunityConvertLead({ lead_id: leadId })),
              disabled: loading,
            },
          ]}
        />
      );
    }

    return (
      <Empty
        image={require("@assets/opportunities-empty.png")}
        title="Looks like it is a bit quiet in here..."
        actions={[
          {
            heading: "Create an opportunity to help you close your deals",
            text: "Create an opportunity",
            onPress: () => navigate(SCREENS.appStack.createOpportunity),
            disabled: loading,
          },
        ]}
      />
    );
  };

  return (
    <View style={{ ...styles.container, paddingTop: !leadId ? insets.top : 0 }}>
      {!leadId ? (
        <TopBar
          titleLeftAligned
          title="Opportunities"
          maxLeftAlignedTitleWidth="70%"
          headerRight={<CreateOpportunityAction />}
        />
      ) : null}
      <FlatList
        onRefresh={fetchOpportunities}
        refreshing={loading}
        renderItem={renderOpportunityItem}
        data={opportunities}
        extraData={opportunities?.length}
        keyExtractor={(item) => item.opportunityId}
        ListEmptyComponent={!loading && renderEmptyStateComponent()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default Opportunities;
