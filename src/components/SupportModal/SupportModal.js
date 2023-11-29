import React from "react";
import { Linking } from "react-native";

import PropTypes from "prop-types";
import { Button, Text } from "react-native-paper";
import { ScaledSheet } from "react-native-size-matters/extend";

import { Modal } from "@components";

import { PRIMARY_COLOR } from "@styles/styleConstants";

const SupportModal = ({ isVisible, onDismiss }) => {
  const handleSupportEmailPressed = () => {
    Linking.openURL("mailto:support@allianceapp.com");
  };

  return (
    <Modal visible={isVisible} onDismiss={onDismiss}>
      <Modal.Header>Support</Modal.Header>
      <Modal.Body>
        <Text style={styles.infoText}>
          For help or tech support please reach out to us at:{" "}
          <Text style={styles.emailText} onPress={handleSupportEmailPressed}>
            support@allianceapp.com
          </Text>
        </Text>
      </Modal.Body>
      <Modal.Footer>
        <Button color={PRIMARY_COLOR} mode="contained" onPress={onDismiss}>
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const styles = ScaledSheet.create({
  infoText: {
    fontSize: "16@s",
    color: "#828282",
    textAlign: "center",
  },
  emailText: {
    fontSize: "16@s",
    color: "rgba(0, 0, 0, 0.87)",
  },
});

SupportModal.propTypes = {
  isVisible: PropTypes.bool,
  onDismiss: PropTypes.func,
};

export default SupportModal;
