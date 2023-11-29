import React, { useEffect, useRef } from "react";
import { Image, View } from "react-native";

import { LINKEDIN_CLIENT_ID, LINKEDIN_REDIRECT_URI } from "@env";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import PropTypes from "prop-types";
import queryString from "query-string";
import LinkedInModal from "react-native-linkedin";
import { verticalScale } from "react-native-size-matters";

import { useDispatch, useSelector } from "react-redux";
import {
  snackbarAddMessageToQueue,
  userAppleLogin,
  userGoogleLogin,
  userLinkedinLogin,
  userLinkedinLoginURL,
  userLinkedinLoginURLFail,
  userLinkedinLoginURLReset,
  userLoginMethodsReset,
} from "@actions";

import { navigate } from "@routes/navigator";
import { SCREENS } from "@routes/routes.constants";

import { SNACKBAR_TYPES, TEST_IDS } from "@utils/constants";
import { isIOS } from "@utils/utils";

import { Button, TextDivider } from "@components";

import { LINKEDIN_COLOR, SUBTITLE_GRAY_COLOR } from "@styles/styleConstants";

import { styles } from "./SSOButtons.style";

const SSOButtons = ({ context, containerStyles }) => {
  const dispatch = useDispatch();
  const {
    authUser,
    loginWithSocialError,
    googleLoginLoading,
    loading: userLoading,
    linkedInUrl,
  } = useSelector((state) => state.user);
  const loading = userLoading || googleLoginLoading;
  const linkedinLogin = useRef(null);
  const contextText = context === "login" ? "Sign in" : "Continue";

  const resetLinkedinURL = () => {
    dispatch(userLinkedinLoginURLReset());
  };

  const resetLoginMethods = () => {
    dispatch(userLoginMethodsReset());
  };

  // Reset the URL upon mount
  useEffect(() => {
    // resetLinkedinURL();
    resetLoginMethods();
  }, []);

  // Open the linkedin modal if we have the url and aren't logged in
  useEffect(() => {
    if (linkedInUrl && !loading && !authUser) {
      linkedinLogin.current.open();
    }
  }, [linkedInUrl, loading, authUser]);

  // Show snackbar error on any failed login attempts
  useEffect(() => {
    if (loginWithSocialError) {
      dispatch(
        snackbarAddMessageToQueue({
          message: loginWithSocialError.message,
          type: SNACKBAR_TYPES.error,
          duration: 5000,
        })
      );
    }
  }, [loginWithSocialError]);

  const handleOpenLinkedInWebView = () => {
    dispatch(userLinkedinLoginURL());
  };

  const handleAppleLogin = () => {
    dispatch(userAppleLogin());
  };

  const handleGoogleLogin = () => {
    dispatch(userGoogleLogin());
  };

  const handleLinkedInSuccess = ({ authentication_code }) => {
    const { state } = queryString.parse(linkedInUrl);
    dispatch(
      userLinkedinLogin({
        code: authentication_code,
        state,
        LINKEDIN_CLIENT_ID,
        LINKEDIN_REDIRECT_URI,
      })
    );
  };

  const handleLinkedInError = (error) => {
    // Ignore dispatching a Fail action when it was a user cancelled error type
    if (error?.type !== "user_cancelled_login") {
      dispatch(userLinkedinLoginURLFail(error));
    }
  };

  return (
    <View style={containerStyles} testID={TEST_IDS.SSOButtons.container}>
      <LinkedInModal
        ref={linkedinLogin}
        shouldGetAccessToken={false}
        clientSecret={null}
        clientID={LINKEDIN_CLIENT_ID}
        redirectUri={LINKEDIN_REDIRECT_URI}
        onError={handleLinkedInError}
        onSuccess={handleLinkedInSuccess}
        onClose={resetLinkedinURL}
        renderButton={() => (
          <Button
            onPress={handleOpenLinkedInWebView}
            text={`${contextText} with LinkedIn`}
            color="subtitle"
            icon={() => (
              <MaterialCommunityIcons
                name="linkedin"
                size={verticalScale(32)}
                color={LINKEDIN_COLOR}
              />
            )}
            loading={loading}
            disabled={loading}
            mode="outlined"
            buttonStyle={styles.button}
            inverted
          />
        )}
      />
      {isIOS() ? (
        <Button
          onPress={handleAppleLogin}
          color="subtitle"
          icon={() => (
            <MaterialCommunityIcons
              name="apple"
              size={verticalScale(32)}
              color="black"
            />
          )}
          loading={loading}
          disabled={loading}
          text={`${contextText} with Apple`}
          mode="outlined"
          buttonStyle={styles.button}
          inverted
        />
      ) : null}
      <Button
        onPress={handleGoogleLogin}
        // variant
        color="subtitle"
        icon={() => (
          <Image
            resizeMode="contain"
            source={require("@assets/google-icon.png")}
            style={styles.googleButtonIcon}
          />
        )}
        loading={loading}
        disabled={loading}
        text={`${contextText} with Google`}
        mode="outlined"
        buttonStyle={styles.button}
        inverted
      />
      <TextDivider text="OR" />
      <Button
        onPress={() =>
          navigate(
            context === "login"
              ? SCREENS.authStack.loginWithEmail
              : SCREENS.authStack.createAccountWithEmail
          )
        }
        color="subtitle"
        icon={() => (
          <MaterialCommunityIcons
            name="at"
            size={verticalScale(24)}
            style={styles.emailButtonIcon}
            color={SUBTITLE_GRAY_COLOR}
          />
        )}
        text={`${contextText} with email`}
        testID={TEST_IDS.login.withEmailButton}
        mode="outlined"
        buttonStyle={styles.button}
        inverted
      />
    </View>
  );
};

SSOButtons.propTypes = {
  containerStyles: PropTypes.array,
  context: PropTypes.string,
};

export default SSOButtons;
