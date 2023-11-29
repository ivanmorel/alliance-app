import React from "react";
import { Pressable } from "react-native";

import PropTypes from "prop-types";
import { Text } from "react-native-paper";
import { scale } from "react-native-size-matters/extend";

import { PRIMARY_COLOR } from "@styles/styleConstants";

const MarkAsReadRightSwipe = ({ maskAsReadPressed }) => {
  return (
    <Pressable
      onPress={maskAsReadPressed}
      style={{
        backgroundColor: PRIMARY_COLOR,
        justifyContent: "center",
        width: "50%",
        alignItems: "center",
        flexDirection: "row",
        flexWrap: "nowrap",
        marginBottom: scale(8),
      }}
    >
      <Text
        style={{
          color: "white",
          fontWeight: "700",
          fontSize: scale(14),
        }}
      >
        MARK AS READ
      </Text>
    </Pressable>
  );
};

export default MarkAsReadRightSwipe;

MarkAsReadRightSwipe.propTypes = {
  maskAsReadPressed: PropTypes.func.isRequired,
};
