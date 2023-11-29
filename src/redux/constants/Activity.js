export const ACTIVITY_GLOBAL_GET = "ACTIVITY_GLOBAL_GET";
export const ACTIVITY_GLOBAL_GET_SUCCESS = "ACTIVITY_GLOBAL_GET_SUCCESS";
export const ACTIVITY_GLOBAL_GET_FAIL = "ACTIVITY_GLOBAL_GET_FAIL";

export const ACTIVITY_GLOBAL_REMOVE = "ACTIVITY_GLOBAL_REMOVE";
export const ACTIVITY_GLOBAL_REMOVE_SUCCESS = "ACTIVITY_GLOBAL_REMOVE_SUCCESS";
export const ACTIVITY_GLOBAL_REMOVE_FAIL = "ACTIVITY_GLOBAL_REMOVE_FAIL";

export const ACTIVITY_GROUP_GET = "ACTIVITY_GROUP_GET";
export const ACTIVITY_GROUP_GET_SUCCESS = "ACTIVITY_GROUP_GET_SUCCESS";
export const ACTIVITY_GROUP_GET_FAIL = "ACTIVITY_GROUP_GET_FAIL";

export const ACTIVITY_GROUP_REMOVE = "ACTIVITY_GROUP_REMOVE";
export const ACTIVITY_GROUP_REMOVE_SUCCESS = "ACTIVITY_GROUP_REMOVE_SUCCESS";
export const ACTIVITY_GROUP_REMOVE_FAIL = "ACTIVITY_GROUP_REMOVE_FAIL";

export const ACTIVITY_TYPES = {
  CHAT_NEW_GROUP_MESSAGE: "CHAT_GROUP_MESSAGE",
  CHAT_NEW_LEAD_MESSAGE: "CHAT_LEAD_MESSAGE",
  CHAT_NEW_OPPORTUNITY_MESSAGE: "CHAT_OPPORTUNITY_MESSAGE",
  CHAT_NEW_USER_MESSAGE: "CHAT_USER_MESSAGE",
  CHAT_NEW_BUSINESS_MESSAGE: "CHAT_BUSINESS_MESSAGE",
  GROUP_CANCELLED: "GROUP_CANCEL",
  GROUP_DELETED: "GROUP_DELETE",
  GROUP_NEW_INVITE: "GROUP_INVITE",
  GROUP_NEW_LEAD: "LEAD_NEW",
  GROUP_NEW_USER: "GROUP_NEW_USER",
  GROUP_REMOVED: "GROUP_REMOVE",
  GROUP_NEW_USER_ADDED: "GROUP_NEW_USER_ADDED",
  OPPORTUNITY_NEW: "OPPORTUNITY_NEW",
  OPPORTUNITY_NEW_USER: "OPPORTUNITY_NEW_USER",
  OPPORTUNITY_NEW_USER_ADDED: "OPPORTUNITY_NEW_USER_ADDED",
};

export const globalActivitiesCountTypes = [
  ACTIVITY_TYPES.CHAT_NEW_GROUP_MESSAGE,
  ACTIVITY_TYPES.CHAT_NEW_LEAD_MESSAGE,
  ACTIVITY_TYPES.CHAT_NEW_OPPORTUNITY_MESSAGE,
  ACTIVITY_TYPES.CHAT_NEW_USER_MESSAGE,
  ACTIVITY_TYPES.GROUP_CANCELLED,
  ACTIVITY_TYPES.GROUP_DELETED,
  ACTIVITY_TYPES.GROUP_NEW_LEAD,
  ACTIVITY_TYPES.GROUP_NEW_USER,
  ACTIVITY_TYPES.GROUP_REMOVED,
];

// Globals (main menu badges)
export const globalActivitiesBadgeCountTypes = [
  ACTIVITY_TYPES.CHAT_NEW_LEAD_MESSAGE,
  ACTIVITY_TYPES.CHAT_NEW_OPPORTUNITY_MESSAGE,
  ACTIVITY_TYPES.GROUP_CANCELLED,
  ACTIVITY_TYPES.GROUP_DELETED,
  ACTIVITY_TYPES.GROUP_NEW_LEAD,
  ACTIVITY_TYPES.GROUP_NEW_USER,
  ACTIVITY_TYPES.GROUP_REMOVED,
];

export const globalGroupsBadgeCountTypes = [
  ACTIVITY_TYPES.CHAT_NEW_GROUP_MESSAGE,
  ACTIVITY_TYPES.CHAT_NEW_LEAD_MESSAGE,
  ACTIVITY_TYPES.GROUP_CANCELLED,
  ACTIVITY_TYPES.GROUP_NEW_LEAD,
  ACTIVITY_TYPES.GROUP_NEW_USER,
  ACTIVITY_TYPES.GROUP_NEW_USER_ADDED,
];

export const globalMessagesBadgeCountTypes = [
  ACTIVITY_TYPES.CHAT_NEW_GROUP_MESSAGE,
  ACTIVITY_TYPES.CHAT_NEW_USER_MESSAGE,
  ACTIVITY_TYPES.CHAT_NEW_OPPORTUNITY_MESSAGE,
  ACTIVITY_TYPES.CHAT_NEW_BUSINESS_MESSAGE,
];

export const globalGroupsMessagesBadgeCountTypes = [
  ACTIVITY_TYPES.CHAT_NEW_GROUP_MESSAGE,
];

export const globalUsersMessagesBadgeCountTypes = [
  ACTIVITY_TYPES.CHAT_NEW_USER_MESSAGE,
];

export const globalOpportunitiesBadgeCountTypes = [
  ACTIVITY_TYPES.CHAT_NEW_OPPORTUNITY_MESSAGE,
  ACTIVITY_TYPES.OPPORTUNITY_NEW,
  ACTIVITY_TYPES.OPPORTUNITY_NEW_USER,
  ACTIVITY_TYPES.OPPORTUNITY_NEW_USER_ADDED,
];

export const globalOpportunitiesMessagesCountTypes = [
  ACTIVITY_TYPES.CHAT_NEW_OPPORTUNITY_MESSAGE,
];

// Group (bottom tab badges)
export const groupActivitiesBadgeCountTypes = [
  ACTIVITY_TYPES.CHAT_NEW_LEAD_MESSAGE,
  ACTIVITY_TYPES.GROUP_CANCELLED,
  ACTIVITY_TYPES.GROUP_NEW_LEAD,
  ACTIVITY_TYPES.GROUP_NEW_USER,
  ACTIVITY_TYPES.GROUP_NEW_USER_ADDED,
];

export const groupLeadsBadgeCountTypes = [
  ACTIVITY_TYPES.CHAT_NEW_LEAD_MESSAGE,
  ACTIVITY_TYPES.GROUP_NEW_LEAD,
];

export const groupUsersBadgeCountTypes = [
  ACTIVITY_TYPES.GROUP_NEW_USER,
  ACTIVITY_TYPES.GROUP_NEW_USER_ADDED,
];

export const groupMessagesBadgeCountTypes = [
  ACTIVITY_TYPES.CHAT_NEW_GROUP_MESSAGE,
];

export const businessMessagesBadgeCountTypes = [
  ACTIVITY_TYPES.CHAT_NEW_BUSINESS_MESSAGE,
];