import { EAS_BUILD_PROFILE } from "@env";

export const buildImageUrl = (userId) => {
  let environment = "";
  switch (EAS_BUILD_PROFILE) {
    case "preview":
      environment = "stage";
      break;
    case "production":
      environment = "prod";
      break;
    case "development":
      environment = "dev";
      break;
    case "feature-test":
    case "gsd":
    default:
      environment = "gsd";
      break;
  }

  return `https://alliance-user-profile-${environment}.s3.amazonaws.com/profile_pictures/${userId}.jpg`;
};
