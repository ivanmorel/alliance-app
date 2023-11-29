import React from "react";
import { View } from "react-native";

import PropTypes from "prop-types";
import { TextInput, useTheme } from "react-native-paper";

import { PRIMARY_COLOR } from "@styles/styleConstants";

import styles from "./ChatFooter.style";

const ChatFooter = ({
  message,
  setMessage,
  onSendMessage,
  onSendFile,
  onFocus,
  onBlur,
  placeholder,
  disableFiles,
}) => {
  const theme = useTheme();
  return (
    <View style={{ flexDirection: "row" }}>
      <TextInput
        multiline
        style={styles.chatInput}
        mode="outlined"
        value={message}
        onChangeText={setMessage}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder || "Enter your message"}
        outlineColor="rgba(0, 0, 0, 0.12)"
        dense
        right={
          <TextInput.Icon
            onPress={onSendMessage}
            style={styles.chatSendBtn}
            name="send"
            color={message ? PRIMARY_COLOR : "rgba(51, 51, 51, 0.75)"}
          />
        }
        left={
          onSendFile && !disableFiles ? (
            <TextInput.Icon
              style={styles.chatAttachFile}
              onPress={onSendFile}
              name="attachment"
              theme={theme}
              color="rgba(51, 51, 51, 0.75)"
            />
          ) : null
        }
      />
    </View>
  );
};

export default ChatFooter;

ChatFooter.propTypes = {
  message: PropTypes.string.isRequired,
  onSendMessage: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  onSendFile: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  disableFiles: PropTypes.bool,
};
