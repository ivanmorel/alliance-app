import { useMemo } from "react";

import { formatDate } from "@utils/utils";

const useSectionActivities = (activities) =>
  useMemo(() => {
    const sections = activities.reduce((acc, activity) => {
      const activityDate = formatDate(activity.timestamp);

      acc[activityDate] = [...(acc[activityDate] || []), activity];

      return acc;
    }, {});

    const sortDates = (d1, d2) => {
      return d2 - d1;
    };

    return Object.keys(sections)
      .sort(sortDates)
      .map((date) => ({
        title: date,
        data: sections[date],
      }));
  }, [activities]);

export default useSectionActivities;
