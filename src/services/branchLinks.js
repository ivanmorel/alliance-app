import { Share } from "react-native";

import branch from "react-native-branch";

import {
  OSR_GROUP_INVITE_NAME,
  OSR_OPPORTUNITY_INVITE_NAME,
} from "@utils/constants";
import { isIOS } from "@utils/utils";

const showShareSheet = async ({
  branchUniversalObject,
  shareOptions,
  linkProperties,
}) => {
  if (isIOS()) {
    const response = await branchUniversalObject.showShareSheet(
      shareOptions,
      linkProperties
    );

    return response;
  } else {
    const { url } = await branchUniversalObject.generateShortUrl();

    if (!url) return false;

    const response = await Share.share({
      title: shareOptions.messageHeader,
      message: `${shareOptions.messageBody}: ${url}`,
    });

    return response;
  }
};

export const showGroupInviteShareSheet = async ({
  groupName,
  groupId,
  inviteCode,
}) => {
  try {
    const title = "Group Invite!";
    const description = `Hi, let’s use Alliance to close these deals. Alliance is a sales communication platform that centralizes everything around our leads & opportunities. To start chatting on ${groupName}, click: `;
    // Don't let typescript linting fool you, await is needed here
    const branchUniversalObject = await branch.createBranchUniversalObject(
      OSR_GROUP_INVITE_NAME,
      {
        locallyIndex: true,
        title,
        contentDescription: description,
        contentMetadata: {
          customMetadata: {
            groupId: groupId.toString(),
            groupName,
            inviteCode,
          },
        },
      }
    );
    if (!branchUniversalObject) return false;
    let shareOptions = { messageHeader: title, messageBody: description };
    let linkProperties = { feature: "groupShare", channel: "RNApp" };
    showShareSheet({ branchUniversalObject, shareOptions, linkProperties });
  } catch (e) {
    return false;
  }
};

export const showOpportunityInviteShareSheet = async ({
  inviteCode,
  opportunityId,
  opportunityName,
  userFirstName,
}) => {
  try {
    const title = "Opportunity Invite!";
    const description = `Hi! ${userFirstName} is inviting you to ${opportunityName} at Alliance App, the sales communication platform`;
    // Don't let typescript linting fool you, await is needed here
    const branchUniversalObject = await branch.createBranchUniversalObject(
      OSR_OPPORTUNITY_INVITE_NAME,
      {
        locallyIndex: true,
        title,
        contentDescription: description,
        contentMetadata: {
          customMetadata: {
            opportunityId: opportunityId.toString(),
            opportunityName,
            inviteCode,
          },
        },
      }
    );
    if (!branchUniversalObject) return false;
    let shareOptions = { messageHeader: title, messageBody: description };
    let linkProperties = { feature: "opportunityShare", channel: "RNApp" };
    showShareSheet({ branchUniversalObject, shareOptions, linkProperties });
  } catch (e) {
    return false;
  }
};
