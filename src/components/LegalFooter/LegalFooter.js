/* eslint-disable react/prop-types */
import React from "react";
import { View } from "react-native";

import moment from "moment";

import { navigate } from "@routes/navigator";
import { SCREENS } from "@routes/routes.constants";

import { Text, Version } from "@components";

import styles from "./LegalFooter.style";

const LegalFooter = ({
  showAgreements = true,
  showVersion = false,
  ...rest
}) => {
  const onClickUserAgreement = () => navigate(SCREENS.authStack.userAgreement);

  const onClickPrivacyPolicy = () => navigate(SCREENS.authStack.privacyPolicy);

  return (
    <View style={styles.container} {...rest}>
      {showAgreements ? (
        <View style={styles.termsAndConditionsText}>
          <Text style={styles.linkText} onPress={onClickUserAgreement}>
            User Agreement
          </Text>
          <Text style={styles.linkText} onPress={onClickPrivacyPolicy}>
            Privacy Policy
          </Text>
        </View>
      ) : null}
      <Text style={styles.footerText}>
        Copyright © {moment().format("YYYY")} Alliance App, Inc. - All Rights
        Reserved
      </Text>
      {showVersion ? (
        <Version style={[styles.footerText, styles.version]} />
      ) : null}
    </View>
  );
};

export default LegalFooter;
