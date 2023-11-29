import React, { useMemo } from "react";
import { View } from "react-native";

import * as Linking from "expo-linking";
import PropTypes from "prop-types";
import { Modal, Text } from "react-native-paper";
import { verticalScale } from "react-native-size-matters/extend";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { useSelector } from "react-redux";

import { isIOS } from "@utils/utils";

import { Button } from "@components";

import { MORE_INFO_COLOR, PRIMARY_DARK_COLOR } from "@styles/styleConstants";

import { wrapWithPortal } from "../../hocs";
import styles from "./MapCallout.style";

const MapCallout = ({ leadId, onDismiss, navigateToLead }) => {
  const { currentLead } = useSelector(({ lead }) => lead);
  const { firstName, lastName, company, title, phone, address } =
    currentLead || {};

  const mapLink = useMemo(() => {
    if (address) {
      const baseUrl = isIOS()
        ? "https://maps.apple.com/?t=m&&daddr="
        : "geo://?q=";

      return baseUrl + address.latitude + "," + address.longitude;
    }
    return "";
  }, [address]);

  return (
    <Modal
      visible
      onDismiss={() => onDismiss()}
      contentContainerStyle={styles.container}
      style={{ justifyContent: "flex-end" }}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {firstName} {lastName}
        </Text>
        <Text style={styles.subtitle}>
          {title} @ {company}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          icon={() => (
            <MaterialIcons
              name="perm-contact-calendar"
              size={verticalScale(20)}
              color={PRIMARY_DARK_COLOR}
            />
          )}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
          onPress={() => navigateToLead(leadId, `${firstName} ${lastName}`)}
          text="more information"
          dense
        />
        <View style={styles.buttonGroup}>
          <Button
            icon={() => (
              <MaterialIcons
                name="location-on"
                size={verticalScale(20)}
                color={PRIMARY_DARK_COLOR}
              />
            )}
            buttonStyle={[mapLink ? styles.button : null, styles.leftButton]}
            textStyle={styles.buttonText}
            disabled={!mapLink}
            onPress={() => {
              onDismiss();
              Linking.openURL(mapLink);
            }}
            text="navigate"
            dense
          />
          <Button
            icon={() => (
              <MaterialIcons
                name="phone"
                size={verticalScale(20)}
                color={MORE_INFO_COLOR}
              />
            )}
            disabled={!phone}
            buttonStyle={[phone ? styles.button : null, styles.rightButton]}
            textStyle={styles.buttonText}
            onPress={() => Linking.openURL(`tel:${phone}`)}
            text="call"
            dense
          />
        </View>
      </View>
    </Modal>
  );
};

export default wrapWithPortal(MapCallout);

MapCallout.propTypes = {
  leadId: PropTypes.number,
  onDismiss: PropTypes.func,
  navigateToLead: PropTypes.func,
};
