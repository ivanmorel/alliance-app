import { NODE_ENV } from "@env";

export const OSR_FOLDER_NAME = "OSRAlliance";

export const OSR_GROUP_INVITE_NAME = "Alliance App Group Invite";
export const ALLIANCE_SIGNUP_INVITE_NAME = "SIGNUP_CONFIRMATION";
export const ALLIANCE_RESET_PASSWORD = "RESET_PASSWORD";
export const OSR_OPPORTUNITY_INVITE_NAME = "Alliance App Opportunity Invite";
export const ALLIANCE_BUSINESS_INVITE = "BUSINESS_INVITE";

// Over the air updates
export const OTA_AUTO_CHECK_UNIT_OF_TIME =
  NODE_ENV === "production" ? "minutes" : "seconds";

export const OTA_AUTO_CHECK_NUMBER = 15;

export const appErrors = {
  lead: {
    delete: "Lead could not be deleted",
  },
  signIn: {
    generalError:
      "There was an error signing in. If the problem persists, please contact support at: support@allianceapp.com",
    5: "There is no account with this email.",
    7: "This account has been deleted. Please create a new account or reach out to support at support@allianceapp.com",
    16: "Wrong email/password combination. Please try a different password.",
  },
};

export const GROUP_CHAT_TYPES = {
  group: "ROOM_GROUPING_GROUP",
  opportunity: "ROOM_GROUPING_OPPORTUNITY",
  user: "ROOM_GROUPING_USERS",
  lead: "ROOM_GROUPING_LEAD",
  business: "ROOM_GROUPING_BUSINESS",
};

export const CHAT_CONNECT_MAX_ATTEMPTS = 7;

export const CHAT_CHANNEL_TYPES = {
  ROOM_GROUPING_GROUP: "group",
  ROOM_GROUPING_OPPORTUNITY: "opportunity",
  ROOM_GROUPING_USERS: "user",
  ROOM_GROUPING_LEAD: "lead",
  ROOM_GROUPING_BUSINESS: "business",
};

export const ROOM_TYPES = {
  default: "ROOM_TYPE_DEFAULT",
  userCreated: "ROOM_TYPE_USER_CREATED",
};

export const SNACKBAR_TYPES = {
  info: "snackbar_info",
  success: "snackbar_success",
  warning: "snackbar_warning",
  error: "snackbar_error",
};

export const TEST_IDS = {
  welcome: {
    screenContainer: "welcome.screenContainer",
    createAccountButton: "welcome.createAccountButton",
    loginButton: "welcome.loginButton",
  },
  createAccount: {
    screenContainer: "createAccount.screenContainer",
    withEmailButton: "createAccount.withEmailButton",
  },
  createAccountWithEmail: {
    screenContainer: "createAccountWithEmail.screenContainer",
    firstNameInput: "createAccountWithEmail.firstNameInput",
    firstNameInputError: "createAccountWithEmail.firstNameInputError",
    lastNameInput: "createAccountWithEmail.lastNameInput",
    lastNameInputError: "createAccountWithEmail.lastNameInputError",
    emailInput: "createAccountWithEmail.emailInput",
    emailInputError: "createAccountWithEmail.emailInputError",
    passwordInput: "createAccountWithEmail.passwordInput",
    passwordInputError: "createAccountWithEmail.passwordInputError",
    passwordConfirmInput: "createAccountWithEmail.passwordConfirmInput",
    passwordConfirmInputError:
      "createAccountWithEmail.passwordConfirmInputError",
    submitButton: "createAccountWithEmail.submitButton",
  },
  login: {
    screenContainer: "login.screenContainer",
    withEmailButton: "login.withEmailButton",
  },
  loginWithEmail: {
    emailInput: "loginWithEmail.emailInput",
    emailInputError: "loginWithEmail.emailInputError",
    passwordInput: "loginWithEmail.passwordInput",
    passwordInputError: "loginWithEmail.passwordInputError",
    submitButton: "loginWithEmail.submitButton",
  },
  SSOButtons: {
    container: "SSOButtons.container",
  },
  topBar: {
    menuButton: "topBar.menuButton",
    backButton: "topBar.backButton",
  },
  drawerMenu: {
    logout: "drawerMenu.logout",
  },
  activities: {
    screenContainer: "activities.screenContainer",
  },
};
