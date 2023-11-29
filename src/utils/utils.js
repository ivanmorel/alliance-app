import { Platform } from "react-native";

import * as Contacts from "expo-contacts";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import { parsePhoneNumber } from "libphonenumber-js";
import { DateTime } from "luxon";

import { ALLIANCE_BUSINESS_INVITE } from "@utils/constants";

let iosSingleton = null;
let androidSingleton = null;

export const parsePhone = (phone) => {
  let newPhone = phone.replace("(", "");
  newPhone = newPhone.replace(")", "");
  newPhone = newPhone.replace("-", "");

  return newPhone.split(" ").join("");
};

export const isIOS = () => {
  if (!iosSingleton) {
    iosSingleton = Platform.OS === "ios";
  }

  return iosSingleton;
};

export const isAndroid = () => {
  if (!androidSingleton) {
    androidSingleton = Platform.OS === "android";
  }

  return androidSingleton;
};

export const getAddressFromGoogleObject = ({
  streetOne,
  streetTwo,
  city,
  stateAbbrv,
}) => {
  const streetAddress = [streetOne, streetTwo]
    .filter((value) => value)
    .join(" ");

  return [streetAddress, city, stateAbbrv].filter((value) => value).join(", ");
};

export const makeAddressFromGoogleComponent = (address_components) => {
  const ShouldBeComponent = {
    home: ["street_number"],
    postal_code: ["postal_code"],
    street: ["street_address", "route"],
    region: [
      "administrative_area_level_1",
      "administrative_area_level_2",
      "administrative_area_level_3",
      "administrative_area_level_4",
      "administrative_area_level_5",
    ],
    city: [
      "locality",
      "sublocality",
      "sublocality_level_1",
      "sublocality_level_2",
      "sublocality_level_3",
      "sublocality_level_4",
    ],
    country: ["country"],
  };

  let address = {
    home: "",
    postal_code: "",
    street: "",
    region: "",
    city: "",
    country: "",
  };

  address_components.forEach((component) => {
    for (let shouldBe in ShouldBeComponent) {
      if (ShouldBeComponent[shouldBe].indexOf(component.types[0]) !== -1) {
        if (shouldBe === "country") {
          address[shouldBe] = component.short_name;
        } else {
          address[shouldBe] = component.long_name;
        }
      }
    }
  });

  return address;
};

const states = [
  ["Arizona", "AZ"],
  ["Alabama", "AL"],
  ["Alaska", "AK"],
  ["Arkansas", "AR"],
  ["California", "CA"],
  ["Colorado", "CO"],
  ["Connecticut", "CT"],
  ["Delaware", "DE"],
  ["District Of Columbia", "DC"],
  ["Florida", "FL"],
  ["Georgia", "GA"],
  ["Hawaii", "HI"],
  ["Idaho", "ID"],
  ["Illinois", "IL"],
  ["Indiana", "IN"],
  ["Iowa", "IA"],
  ["Kansas", "KS"],
  ["Kentucky", "KY"],
  ["Louisiana", "LA"],
  ["Maine", "ME"],
  ["Maryland", "MD"],
  ["Massachusetts", "MA"],
  ["Michigan", "MI"],
  ["Minnesota", "MN"],
  ["Mississippi", "MS"],
  ["Missouri", "MO"],
  ["Montana", "MT"],
  ["Nebraska", "NE"],
  ["Nevada", "NV"],
  ["New Hampshire", "NH"],
  ["New Jersey", "NJ"],
  ["New Mexico", "NM"],
  ["New York", "NY"],
  ["North Carolina", "NC"],
  ["North Dakota", "ND"],
  ["Ohio", "OH"],
  ["Oklahoma", "OK"],
  ["Oregon", "OR"],
  ["Pennsylvania", "PA"],
  ["Rhode Island", "RI"],
  ["South Carolina", "SC"],
  ["South Dakota", "SD"],
  ["Tennessee", "TN"],
  ["Texas", "TX"],
  ["Utah", "UT"],
  ["Vermont", "VT"],
  ["Virginia", "VA"],
  ["Washington", "WA"],
  ["West Virginia", "WV"],
  ["Wisconsin", "WI"],
  ["Wyoming", "WY"],
];

export const abbrState = (input = "", to) => {
  if (to === "abbr") {
    input = input.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    for (let i = 0; i < states.length; i++) {
      if (states[i][0] === input) {
        return states[i][1];
      }
    }
  } else if (to === "name") {
    input = input.toUpperCase();
    for (let i = 0; i < states.length; i++) {
      if (states[i][1] === input) {
        return states[i][0];
      }
    }
  }
};

export const getFormattedDate = (timestamp) => {
  const dateTime = DateTime.fromISO(timestamp);
  const now = Date.now();
  if (dateTime.hasSame(now, "day")) {
    return dateTime.toFormat("LLL dd h:mm a");
  }

  if (dateTime.hasSame(now, "year")) {
    return dateTime.toFormat("LLL dd h:mm a");
  }

  return formatDate(timestamp);
};

export const formatDate = (timestamp, format) => {
  const dateTime = DateTime.fromISO(timestamp);

  return dateTime.toFormat(format ?? "LL/dd/yyyy");
};

export const getFile = (fileUrl) => {
  const fileName = fileUrl.split("/").pop();
  const fileType = fileName.split(".").pop();

  return { name: fileName, type: fileType, url: fileUrl };
};

function downloadFile(uri, fileUri) {
  return FileSystem.downloadAsync(uri, fileUri);
}

export async function downloadToFolder(uri, filename, folder, share = true) {
  await MediaLibrary.requestPermissionsAsync();

  const fileName = encodeURI(filename);
  const fileUri = `${FileSystem.documentDirectory}${fileName}`;
  const downloadedFile = await downloadFile(uri, fileUri);

  if (downloadedFile.status !== 200) {
    return false;
  }

  try {
    if (isIOS() && share) {
      await Sharing.shareAsync(downloadedFile.uri, {
        UTI: "public.item",
      });
      return true;
    }

    const asset = await MediaLibrary.createAssetAsync(downloadedFile.uri);
    const album = await MediaLibrary.getAlbumAsync(folder);

    if (album === null) {
      await MediaLibrary.createAlbumAsync(folder, asset, false);
    } else if (!isIOS()) {
      await MediaLibrary.saveToLibraryAsync(downloadedFile.uri);
    }
    FileSystem.deleteAsync(fileUri);
  } catch (e) {
    return false;
  }

  return true;
}

export const parseBranchParams = (params) => ({
  name: params.$canonical_identifier,
  groupId: parseInt(params.groupId),
  groupName: params.groupName,
  inviteCode: params.inviteCode,
  id: params.$identity_id,
});

export const parseOpportunityInviteBranchParams = (params) => ({
  name: params.$canonical_identifier,
  opportunityId: parseInt(params.opportunityId),
  opportunityName: params.opportunityName,
  inviteCode: params.inviteCode,
  id: params.$identity_id,
});

export const parseBusinessInviteBranchParams = (params) => ({
  loginAction: ALLIANCE_BUSINESS_INVITE,
  businessId: parseInt(params.business_id),
  role: params.role,
  id: params.$identity_id,
});

/**
 * `wait` is a helper function for adding delay in async functions.
 *
 * Example: `async function test () { await wait(300); };`
 *
 * @param {number} [ms=200] Time to wait in ms. Default is 200
 * @return {Promise}
 */
export function wait(ms = 200) {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
}

export function formatBytes(bytes = 0, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

/**
 * Calulates the total badge count for an acitivty type, which are defined in
 * `src/Screens/Activities/Activities.utils.js` via `ACTIVITY_TYPES`
 *
 * @param {object} counts Activity counts object: ex: { LEAD_NEW: 5 }
 * @param {[string]} types Types to match and count, ex: ["LEAD_NEW",
 * "GROUP_INVITE"]
 * @return {number}
 */
export const getCountByActivityType = (counts, types) => {
  try {
    if (!counts) throw new Error("Must provide valid `counts` array");
    if (!types || !Array.isArray(types))
      throw new Error("Must provide valid `types` array");

    return types.reduce((acc, type) => {
      if (!counts[type]) return acc;
      return (acc = acc + counts[type]);
    }, 0);
  } catch (error) {
    return 0;
  }
};

/**
 * Calulates the total badge count for specific group or opportunity
 *
 * @param {[object]} activities All activities
 * @param {string|number} groupId The group ID
 * @param {string|number} opportunityId The opportunity ID
 * @return {number}
 */
export const getTotalBadgeCountById = ({
  activities,
  groupId,
  opportunityId,
}) => {
  try {
    if (!activities || !Array.isArray(activities)) {
      throw new Error("Must provide valid activities array");
    }
    if (
      (groupId && opportunityId) ||
      (!groupId && !opportunityId) ||
      (groupId &&
        !(typeof groupId === "string" || typeof groupId === "number")) ||
      (opportunityId &&
        !(
          typeof opportunityId === "string" || typeof opportunityId === "number"
        ))
    ) {
      throw new Error("Must provide valid groupId or opportunityId");
    }

    return activities?.reduce((acc, activity) => {
      const isIdMatching = groupId
        ? Object.values(activity?.data)[0]?.groupId?.toString() ===
          groupId.toString()
        : Object.values(activity?.data)[0]?.opportunityId?.toString() ===
          opportunityId.toString();
      if (isIdMatching) return acc + 1;

      return acc;
    }, 0);
  } catch (error) {
    return 0;
  }
};

export const getTotalBadgeCountByRoomId = ({ activities, roomId }) => {
  try {
    if (!activities || !Array.isArray(activities)) {
      throw new Error("Must provide valid activities array");
    }
    if (
      !roomId ||
      !(typeof roomId === "string" || typeof roomId === "number")
    ) {
      throw new Error("Must provide valid roomId");
    }

    return activities?.reduce((acc, activity) => {
      const isIdMatching =
        Object.values(activity?.data)[0]?.roomId?.toString() ===
        roomId.toString();
      if (isIdMatching) return acc + 1;

      return acc;
    }, 0);
  } catch (error) {
    return 0;
  }
};

export const getActivitiesIdFromRoomId = (roomId, activities) => {
  return filterActivitiesById(activities, roomId, "roomId");
};

export const getActivitiesIdFromOpportunityId = (opportunityId, activities) => {
  return filterActivitiesById(activities, opportunityId, "opportunityId");
};

export const getActivitiesIdFromGroupId = (groupId, activities) => {
  return filterActivitiesById(activities, groupId, "groupId");
};

const filterActivitiesById = (activities, id, type) => {
  return activities
    .filter((activity) => {
      const object = Object.values(activity?.data)[0] || {};
      return object[type]?.toString() === id.toString();
    })
    .map((activity) => {
      const activityObj = Object.values(activity?.data)[0];
      let info;
      if (activityObj.groupId) {
        info = { groupId: activityObj.groupId };
      } else if (activityObj.opportunityId) {
        info = { opportunityId: activityObj.opportunityId };
      } else if (activityObj.businessId) {
        info = { businessId: activityObj.businessId };
      }

      return {
        activityId: activityObj.activityId,
        activity_type: activity.type,
        ...info,
      };
    });
};

const mapAddressToContactAddress = (address = {}) => ({
  label: "work",
  street: address.streetOne + " " + address.streetTwo,
  city: address.city,
  region: abbrState(address.stateAbbrv, "name"),
});

const mapAddressToLeadAddress = (address = {}) => ({
  streetOne: address.street,
  city: address.city,
  stateAbbrv: address.region ? abbrState(address.region, "abbr") : null,
});

export const mapLeadToContact = (lead) => ({
  givenName: lead.firstName,
  familyName: lead.lastName,
  displayName: lead.firstName + " " + lead.lastName,
  company: lead.company,
  emailAddresses: [{ label: "work", email: lead.email }],
  [Contacts.Fields.PhoneNumbers]: [{ label: "mobile", number: lead.phone }],
  postalAddresses: [mapAddressToContactAddress(lead.address)],
  jobTitle: lead.title,
  [Contacts.Fields.Note]: lead.notes,
  imAddresses: [
    { username: lead.linkedin, url: lead.linkedin, service: "LinkedIn" },
  ],
});

const formatPhoneNumber = (phoneNumberString = "") => {
  if (!phoneNumberString) return "";

  return parsePhoneNumber(phoneNumberString, "US")
    .formatInternational()
    .split(" ")
    .join("");
};

export const mapContactToLead = (contact) => ({
  firstName: contact.firstName,
  lastName: contact.lastName,
  company: contact.company,
  email: (contact.emails || [])[0]?.email,
  phone: formatPhoneNumber((contact.phoneNumbers || [])[0]?.number),
  address: mapAddressToLeadAddress((contact.addresses || [])[0]),
  title: contact.jobTitle,
  notes: contact.note,
});

export function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

export const mapUsersToArray = (users) =>
  Object.keys(users)
    .filter((key) => users[key])
    .map((key) => users[key]);

export const mapUsersToIdArray = (users) =>
  Object.entries(users)
    // eslint-disable-next-line no-unused-vars
    .filter(([_, value]) => value)
    .map(([key]) => parseInt(key));
