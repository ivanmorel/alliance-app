import React from "react";

import PropTypes from "prop-types";

import { Button, Modal, Text } from "@components";

import styles from "./ConfirmationModal.style";

const ConfirmationModal = ({
  visible,
  onOk,
  onCancel,
  okTitle = "Ok",
  cancelTitle = "Cancel",
  title,
  loading,
  disabled,
  okButtonColor = "error",
  okIcon = "check",
  titleIcon,
  descriptionText = "",
  descriptionBold = "",
  warningText = "",
  afterDescriptionText = "",
  showCancelButton = true,
}) => {
  return (
    <Modal visible={visible} onDismiss={onCancel}>
      <Modal.Header title={title} icon={titleIcon} />
      <Modal.Body>
        {descriptionText || descriptionBold ? (
          <Text style={styles.description}>
            {descriptionText}{" "}
            <Text style={styles.descriptionBold}>{descriptionBold}</Text>{" "}
            {afterDescriptionText}
          </Text>
        ) : null}
        <Text style={styles.warningText}>{warningText}</Text>
      </Modal.Body>
      <Modal.Footer
        style={
          showCancelButton ? styles.footer : styles.footerWithoutCancelButton
        }
      >
        {showCancelButton ? (
          <Button
            onPress={onCancel}
            text={cancelTitle}
            variant
            color="dark"
            buttonStyle={styles.cancelButton}
            dense
            uppercase={false}
            textStyle={styles.buttonText}
          />
        ) : null}
        <Button
          onPress={onOk}
          color={okButtonColor}
          loading={loading}
          disabled={disabled}
          text={okTitle}
          icon={okIcon}
          dense
          textStyle={styles.buttonText}
          uppercase={false}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;

ConfirmationModal.propTypes = {
  cancelTitle: PropTypes.string,
  description: PropTypes.string,
  okTitle: PropTypes.string,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  title: PropTypes.string,
  visible: PropTypes.bool,
  TextComponent: PropTypes.element,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  okButtonColor: PropTypes.oneOf([
    "primary",
    "secondary",
    "error",
    "dark",
    "subtitle",
  ]),
  okIcon: PropTypes.string,
  titleIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  descriptionText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  descriptionBold: PropTypes.string,
  warningText: PropTypes.string,
  afterDescriptionText: PropTypes.string,
  showCancelButton: PropTypes.bool,
};

ConfirmationModal.defaultProps = {
  okTitle: "Ok",
  cancelTitle: "Cancel",
};
