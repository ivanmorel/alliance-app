import { fetchGroupUserSubmittedLeads } from "@services/GroupService";
import { getRatingsForUsers } from "@services/RatingService";

import { authorizedPost, userURL } from "@utils/api";

export const getUsersForGroup = (groupId, position = 0, count = 10) =>
  authorizedPost(`${userURL()}/get_users_by_group`, {
    groupId,
    get_next: position,
    start_position: count,
  }).then((response) => response.data.users);

export const getUser = (userId) =>
  authorizedPost(`${userURL()}/get`, {
    user_id: userId,
  }).then((response) => response.data);

export const getGroupUserWithRatingAndSubmittedLeads = async (
  groupId,
  position = 0,
  count = 10
) => {
  const users = await getUsersForGroup(groupId, position, count);

  const userIds = users.map(({ userId }) => userId);

  const usersRatings = await getRatingsForUsers(userIds);
  const userSubmittedLeads = await fetchGroupUserSubmittedLeads(
    groupId,
    userIds
  );

  return users.map((user, index) => ({
    ...user,
    rating: usersRatings[index].rating,
    submitted: userSubmittedLeads[index].leadsSubmitted,
  }));
};
