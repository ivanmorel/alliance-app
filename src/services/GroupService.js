import { getGroupLeadCount } from "@services/LeadService";

import { authorizedPost, groupURL } from "@utils/api";

const sortBy = require("lodash.sortby");

export const listGroup = async () =>
  authorizedPost(`${groupURL()}/list`).then((response) => response.data.groups);

export const fetchGroupUserSubmittedLeads = (
  groupId,
  userIds,
  orderBy = "userId"
) =>
  authorizedPost(`${groupURL()}/stats`, {
    filter_by: "USERS",
    search_by: "GROUP",
    search_ids: [groupId],
    filter_ids: userIds,
  }).then((response) => sortBy(response.data.groups[0].usersStats, [orderBy]));

export const listGroupWithLeadInfo = async () => {
  const groups = await listGroup();
  const groupIds = groups.map(({ groupId }) => groupId);

  if (groupIds.length === 0) return groups;

  const groupLeadCount = await getGroupLeadCount(groupIds);

  return groups.map((group) => {
    const getGroupIndexFromList = (list) => {
      return list.findIndex((item) => item.groupId === group.groupId);
    };

    return {
      ...group,
      allTimeLeads:
        groupLeadCount[getGroupIndexFromList(groupLeadCount)].submitted,
    };
  });
};

export const getGroupWithLeadInfo = async (groupId) => {
  const { data } = await authorizedPost(`${groupURL()}/get`, { groupId });
  const [{ submitted }] = await getGroupLeadCount([groupId]);

  return { ...data, leadCount: submitted };
};
