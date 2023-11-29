import React, { useCallback, useEffect, useMemo } from "react";
import { View } from "react-native";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import {
  activityGroupGet,
  leadList,
  opportunityList,
  snackbarAddMessageToQueue,
} from "@actions";

import { SCREENS } from "@routes/routes.constants";

import { SNACKBAR_TYPES } from "@utils/constants";

import { LeadList } from "@screens";

import { APP_BACKGROUND_COLOR } from "@styles/styleConstants";

const Leads = ({ setAddLeadModalVisible }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    leads,
    loading: leadsLoading,
    currentGroupId,
  } = useSelector(({ lead }) => lead);
  const { opportunities } = useSelector(({ opportunity }) => opportunity);
  const leadCreated = false;
  const { groupId, createdBy } = useSelector(
    ({ group }) => group.selectedGroup
  );
  const userId = useSelector(({ user }) => user.appUser.userId);
  const isUserModerator = useMemo(
    () => userId === createdBy,
    [createdBy, userId]
  );

  // Fetch all opportunities only at first loading
  useEffect(() => {
    fetchOpportunities();
  }, []);

  useEffect(() => {
    if (leadCreated) {
      dispatch(
        snackbarAddMessageToQueue({
          message: "New lead added",
          type: SNACKBAR_TYPES.success,
        })
      );
    }
  }, [leadCreated]);

  const fetchLeads = () => {
    if (!leadsLoading) {
      dispatch(
        leadList({
          group_id: groupId,
          sort_by: "ACTIVITY",
        })
      );
      // else {
      //   dispatch(
      //     leadList({
      //       group_id: groupId,
      //       start_position: position.toString(),
      //       get_next: "10",
      //       paginated: position > 1,
      //     })
      //   );
      //   setCurrentPosition((prevState) => prevState + 10);
      // }
      getGroupActivities();
    }
  };

  const fetchOpportunities = () => {
    dispatch(opportunityList());
  };

  useFocusEffect(
    useCallback(() => {
      fetchLeads();
    }, [])
  );

  const getGroupActivities = () => {
    if (groupId) dispatch(activityGroupGet(groupId));
  };

  const onLeadPress = ({ leadId, firstName, lastName, isLeadNew }) => {
    navigation.push(SCREENS.appStack.leadDetail, {
      groupId,
      leadId,
      leadName: `${firstName} ${lastName}`,
      isLeadNew,
    });
  };

  const memoizedLeads = useMemo(() => {
    if (leads.length > 0) {
      if (opportunities.length > 0) {
        leads.forEach((lead) => {
          if (opportunities.find((opp) => opp.leadId === lead.leadId)) {
            lead["hasOpportunity"] = true;
          }
        });
      }
      return leads;
    }
    return [];
  }, [opportunities, leads]);

  return (
    <View flex={1} style={{ backgroundColor: APP_BACKGROUND_COLOR }}>
      <LeadList
        loading={leadsLoading}
        onPress={onLeadPress}
        leads={currentGroupId === groupId ? memoizedLeads : []}
        // loadMore={fetchLeads}
        onRefresh={fetchLeads}
        isSwipeEnabled={isUserModerator}
        setAddLeadModalVisible={setAddLeadModalVisible}
      />
    </View>
  );
};

Leads.propTypes = {
  setAddLeadModalVisible: PropTypes.func,
};

export default Leads;
