import React, { useEffect, useState } from "react";

import { LOCAL_DEVELOPMENT } from "@env";

import Bugsnag from "@bugsnag/react-native";
import { appleAuth } from "@invertase/react-native-apple-authentication";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  createNavigationContainerRef,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Updates from "expo-updates";
import moment from "moment";
import Branch from "react-native-branch";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useDispatch, useSelector } from "react-redux";
import {
  branchJoinGroupLink,
  businessAddUser,
  opportunityBranchJoinLink,
  otaCheckForUpdates,
  otaUpdateEvent,
  userLogout,
  userSetLoginAction,
  userSignUpConfirmation,
} from "@actions";
import { OTA_UPDATE_STATUSES } from "@constants";

import { BugsnagErrorBoundary, bugsnagOnError } from "@services/bugsnag";

import { AppNav } from "@routes/appNavigator";
import { AuthNav } from "@routes/authNavigator";
import { SCREENS } from "@routes/routes.constants";

import {
  ALLIANCE_BUSINESS_INVITE,
  ALLIANCE_RESET_PASSWORD,
  ALLIANCE_SIGNUP_INVITE_NAME,
  OSR_GROUP_INVITE_NAME,
  OSR_OPPORTUNITY_INVITE_NAME,
  OTA_AUTO_CHECK_NUMBER,
  OTA_AUTO_CHECK_UNIT_OF_TIME,
} from "@utils/constants";
import {
  parseBranchParams,
  parseBusinessInviteBranchParams,
  parseOpportunityInviteBranchParams,
} from "@utils/utils";

import { RootFallbackError } from "@screens";

import { DrawerContent } from "@components";

const DrawerStack = createDrawerNavigator();

const DrawerNav = () => {
  const insets = useSafeAreaInsets();
  return (
    <DrawerStack.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: "front",
        drawerStyle: {
          marginTop: insets.top,
          width: "85%",
          borderRadius: 5,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        },
      }}
      drawerContent={() => <DrawerContent />}
    >
      <DrawerStack.Screen
        name={SCREENS.drawerStack.appNavigator}
        component={AppNav}
      />
    </DrawerStack.Navigator>
  );
};

const RootNavigator = createStackNavigator();

export const navigationRef = createNavigationContainerRef();

export function navigateReset(navigationConfig) {
  if (navigationRef.isReady()) {
    navigationRef.reset(navigationConfig);
  }
}

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

const { createNavigationContainer } = Bugsnag?.getPlugin("reactNavigation");
const BugsnagNavigationContainer =
  createNavigationContainer(NavigationContainer);

const Navigation = () => {
  const { checkStatus, lastChecked } = useSelector((state) => state.otaUpdates);
  const { groupInvite } = useSelector((state) => state.group);
  const { opportunityInvite } = useSelector((state) => state.opportunity);
  const { authUser, loading, loginAction, appUser } = useSelector(
    ({ user }) => user
  );
  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useDispatch();

  // OTA event listener
  useEffect(() => {
    const updateListener = Updates.addListener((event) => {
      dispatch(otaUpdateEvent(event));
    });
    return () => {
      updateListener.remove();
    };
  }, []);

  // OTA update timer
  useEffect(() => {
    clearInterval(otaCheckInterval);
    const otaCheckInterval = setInterval(() => {
      const isInProgress =
        checkStatus === OTA_UPDATE_STATUSES.checking ||
        checkStatus === OTA_UPDATE_STATUSES.downloading;
      const now = moment();
      const lastCheckedTimestamp = moment(lastChecked);
      if (
        !isInProgress &&
        LOCAL_DEVELOPMENT !== "true" &&
        (!lastChecked ||
          (lastChecked &&
            now.diff(lastCheckedTimestamp, OTA_AUTO_CHECK_UNIT_OF_TIME) >=
              OTA_AUTO_CHECK_NUMBER))
      ) {
        dispatch(otaCheckForUpdates());
      }
    }, 5000);
    return () => {
      clearInterval(otaCheckInterval);
    };
  }, [lastChecked, checkStatus]);

  useEffect(() => {
    setIsMounted(true);

    // Handle all incoming deep links
    Branch.subscribe(({ error, params }) => {
      if (error) {
        console.error("Error from Branch: " + error);
        return;
      }
      if (params.$canonical_identifier === OSR_GROUP_INVITE_NAME)
        dispatch(branchJoinGroupLink(parseBranchParams(params)));

      if (params.action === ALLIANCE_SIGNUP_INVITE_NAME)
        dispatch(userSignUpConfirmation({ token: params.token }));

      if (params.$canonical_identifier === OSR_OPPORTUNITY_INVITE_NAME)
        dispatch(
          opportunityBranchJoinLink(parseOpportunityInviteBranchParams(params))
        );
      if (params.action === ALLIANCE_RESET_PASSWORD)
        navigate(SCREENS.authStack.resetPassword, { token: params.token });

      if (params.action === ALLIANCE_BUSINESS_INVITE)
        dispatch(userSetLoginAction(parseBusinessInviteBranchParams(params)));
    });

    if (appleAuth.isSupported) {
      // Handle revoked credentials for Apple Sign In
      return appleAuth.onCredentialRevoked(async () => {
        dispatch(userLogout());
      });
    }
  }, []);

  // Handle group invite navigation when `groupInvite` data is present
  useEffect(() => {
    if (groupInvite && authUser) {
      navigate(SCREENS.appStack.joinGroup, groupInvite);
    }
  }, [authUser, groupInvite]);

  useEffect(() => {
    if (loginAction && appUser?.email) {
      const { role, businessId } = loginAction;
      dispatch(businessAddUser({ role, businessId, email: appUser.email }));
    }
  }, [appUser.email, loginAction]);

  // Handle opportunity invite navigation when `opportunityInvite` data is present
  useEffect(() => {
    if (opportunityInvite && authUser) {
      navigate(SCREENS.appStack.joinOpportunity, opportunityInvite);
    }
  }, [authUser, opportunityInvite]);

  // If `authUser` is cleared, navigate to the SignIn page
  useEffect(() => {
    if (!loading && navigationRef.isReady()) {
      if (!authUser) {
        const routeName = navigationRef?.current?.getCurrentRoute()?.name;
        if (
          Object.keys(SCREENS.authStack).every(
            (key) => SCREENS.authStack[key] !== routeName
          )
        ) {
          navigationRef.reset({
            index: 0,
            routes: [{ name: SCREENS.rootNavigator.authStack }],
          });
        }
      } else {
        navigate(SCREENS.rootNavigator.appStack);
      }
    }
  }, [authUser, navigationRef.isReady(), loading]);

  // Using isMounted hack to prevent initial render of authStack before our
  // effect above completes
  if (!isMounted) return null;

  return (
    <BugsnagNavigationContainer ref={navigationRef}>
      <BugsnagErrorBoundary
        // onError will pass in multiple params so we can't use `bugsnagOnError`
        // directly here or it will break the `metadata` param implementation
        onError={(event) => bugsnagOnError(event)}
        FallbackComponent={RootFallbackError}
      >
        <RootNavigator.Navigator screenOptions={{ headerShown: false }}>
          {authUser ? null : (
            <RootNavigator.Screen
              name={SCREENS.rootNavigator.authStack}
              component={AuthNav}
            />
          )}
          <RootNavigator.Screen
            name={SCREENS.rootNavigator.appStack}
            component={DrawerNav}
          />
        </RootNavigator.Navigator>
      </BugsnagErrorBoundary>
    </BugsnagNavigationContainer>
  );
};

export default Navigation;
