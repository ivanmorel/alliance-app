import { authorizedPost, leadURL } from "@utils/api";

const sortBy = require("lodash.sortby");

export const getGroupLeadCount = (groupIds, orderBy = "groupId") =>
  authorizedPost(`${leadURL()}/group_stats`, {
    ids: groupIds,
    search_by: "GROUP",
  }).then((response) => sortBy(response.data.groups, [orderBy]));

export const getLast24hourLeadsForGroup = (groupIds, orderBy = "groupId") => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  return authorizedPost(`${leadURL()}/group_stats`, {
    ids: groupIds,
    search_by: "GROUP",
    start_time: yesterday.toISOString(),
  }).then((response) => sortBy(response.data.groups, [orderBy]));
};
