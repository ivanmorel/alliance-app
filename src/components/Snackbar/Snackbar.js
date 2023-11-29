import * as React from "react";
import { useEffect } from "react";

import { Snackbar as PaperSnackbar } from "react-native-paper";

import { useDispatch, useSelector } from "react-redux";
import { showMessageSuccess } from "@actions";

import { Text } from "@components";

import style from "./Snackbar.style";

let throttleTimer;
const throttle = (callback, time) => {
  if (throttleTimer) return;
  throttleTimer = true;
  setTimeout(() => {
    callback();
    throttleTimer = false;
  }, time);
};

const Snackbar = () => {
  const [visible, setVisible] = React.useState(false);
  const [currentMessage, setCurrentMessage] = React.useState({});
  const dispatch = useDispatch();
  const messageQueue = useSelector((state) => state.snackbar.messageQueue);
  const showMessage = () => {
    const [message] = messageQueue;

    setCurrentMessage(message);
    setVisible(true);
    dispatch(showMessageSuccess());
  };

  useEffect(() => {
    if (!visible && messageQueue.length > 0) {
      // Hack to let the animation finish before showing the next message
      throttle(showMessage, 200);
    }
  }, [messageQueue, visible]);

  return (
    <PaperSnackbar
      visible={visible}
      onDismiss={() => setVisible(false)}
      action={{
        label: currentMessage.actionLabel,
        onPress: currentMessage.action,
      }}
      duration={currentMessage.duration ? currentMessage.duration : 1500}
      style={style[currentMessage.type]}
    >
      <Text style={style.snackbarText}>{currentMessage.message}</Text>
    </PaperSnackbar>
  );
};

export default Snackbar;
