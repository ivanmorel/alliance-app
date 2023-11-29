import {
  ACTIVITY_GLOBAL_GET,
  ACTIVITY_GLOBAL_GET_FAIL,
  ACTIVITY_GLOBAL_GET_SUCCESS,
  ACTIVITY_GROUP_GET,
  ACTIVITY_GROUP_GET_FAIL,
  ACTIVITY_GROUP_GET_SUCCESS,
  businessMessagesBadgeCountTypes,
  globalActivitiesBadgeCountTypes,
  globalActivitiesCountTypes,
  globalGroupsBadgeCountTypes,
  globalGroupsMessagesBadgeCountTypes,
  globalMessagesBadgeCountTypes,
  globalOpportunitiesBadgeCountTypes,
  globalOpportunitiesMessagesCountTypes,
  globalUsersMessagesBadgeCountTypes,
  groupActivitiesBadgeCountTypes,
  groupLeadsBadgeCountTypes,
  groupMessagesBadgeCountTypes,
  groupUsersBadgeCountTypes,
} from "@constants";

import { getCountByActivityType } from "@utils/utils";

const ActivityInitialState = {
  activities: {
    global: [],
  },
  loading: false,
  error: null,
  counts: {
    global: {
      total: 0,
      activities: 0,
      groups: 0,
      messages: {
        total: 0,
        groups: 0,
        users: 0,
        opportunities: 0,
        business: 0,
      },
      opportunities: 0,
    },
  },
};

const ActivityReducer = (state = ActivityInitialState, action) => {
  switch (action.type) {
    case ACTIVITY_GLOBAL_GET:
      return {
        ...state,
        loading: true,
      };

    case ACTIVITY_GLOBAL_GET_SUCCESS: {
      const getCount = getCountByActivityType.bind(
        null,
        action.payload?.counts
      );

      const globalActivitiesCount = getCount(globalActivitiesCountTypes);
      const globalActivitiesBadgeCount = getCount(
        globalActivitiesBadgeCountTypes
      );
      const globalGroupsCount = getCount(globalGroupsBadgeCountTypes);
      const globalMessagesCount = getCount(globalMessagesBadgeCountTypes);
      const globalGroupsMessagesCount = getCount(
        globalGroupsMessagesBadgeCountTypes
      );
      const globalUsersMessagesCount = getCount(
        globalUsersMessagesBadgeCountTypes
      );
      const globalOpportunitiesCount = getCount(
        globalOpportunitiesBadgeCountTypes
      );
      const globalOpportunitiesMessagesCount = getCount(
        globalOpportunitiesMessagesCountTypes
      );
      const globalBusinessesMessageCount = getCount(
        businessMessagesBadgeCountTypes
      );

      const messageActivities = action.payload?.activities?.filter((activity) =>
        globalMessagesBadgeCountTypes.includes(activity.type)
      );

      return {
        ...state,
        activities: {
          ...state.activities,
          global: action.payload?.activities || [],
          messageActivities,
        },
        error: null,
        loading: false,
        counts: {
          ...state.counts,
          global: {
            total: globalActivitiesCount,
            activities: globalActivitiesBadgeCount,
            groups: globalGroupsCount,
            messages: {
              groups: globalGroupsMessagesCount,
              users: globalUsersMessagesCount,
              opportunities: globalOpportunitiesMessagesCount,
              business: globalBusinessesMessageCount,
              total: globalMessagesCount,
            },
            opportunities: globalOpportunitiesCount,
          },
        },
      };
    }

    case ACTIVITY_GLOBAL_GET_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case ACTIVITY_GROUP_GET:
      return {
        ...state,
        loading: true,
      };

    case ACTIVITY_GROUP_GET_SUCCESS: {
      const groupId = `group-${action.payload?.groupId}`;
      const getCount = getCountByActivityType.bind(
        null,
        action.payload?.data?.counts
      );
      const groupActivitiesCount = getCount(groupActivitiesBadgeCountTypes);
      const groupLeadsCount = getCount(groupLeadsBadgeCountTypes);
      const groupUsersCount = getCount(groupUsersBadgeCountTypes);
      const groupMessagesCount = getCount(groupMessagesBadgeCountTypes);

      return {
        ...state,
        activities: {
          ...state.activities,
          [groupId]: action.payload?.data?.activities || [],
        },
        error: null,
        loading: false,
        counts: {
          ...state.counts,
          [groupId]: {
            activities: groupActivitiesCount,
            leads: groupLeadsCount,
            users: groupUsersCount,
            messages: groupMessagesCount,
          },
        },
      };
    }

    case ACTIVITY_GROUP_GET_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default ActivityReducer;
