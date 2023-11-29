import { authorizedPost, ratingURL } from "@utils/api";

const sortBy = require("lodash.sortby");

export const getRatingsForUsers = (userIds, orderBy = "userId") =>
  authorizedPost(`${ratingURL()}/user`, {
    user_ids: userIds,
  }).then((response) => sortBy(response.data.userRatings, [orderBy]));
