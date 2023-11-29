import { DateTime } from "luxon";

import { formatDate } from "@utils/utils";

export const getLabel = (milliseconds) => {
  const dateTime = DateTime.fromFormat(milliseconds, "LL/dd/yyyy");
  let label;

  if (dateTime.hasSame(DateTime.local(), "day")) label = "Today";
  if (dateTime.hasSame(DateTime.local().minus({ days: 1 }), "day"))
    label = "Yesterday";

  return label ? label : `${formatDate(dateTime, "MMM d")}th`;
};
