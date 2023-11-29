import * as React from "react";

import PropTypes from "prop-types";
import { Badge as PaperBadge } from "react-native-paper";
import { scale } from "react-native-size-matters/extend";

import { PRIMARY_COLOR, WARNING_COLOR } from "@styles/styleConstants";

import styles from "./Badge.style";

const Badge = ({
  number,
  size = 24,
  color = "blue",
  style,
  maxNumber = 99,
  maxNumberSymbol = "+",
  isNew = false,
}) => {
  if (number === 0) return null;

  const numberText =
    number > maxNumber ? `${maxNumber}${maxNumberSymbol}` : number;

  return (
    <PaperBadge
      size={scale(size)}
      style={[
        styles.badge,
        isNew ? styles.newBadge : {},
        { backgroundColor: color === "blue" ? PRIMARY_COLOR : WARNING_COLOR },
        style,
      ]}
    >
      {isNew ? "NEW" : numberText}
    </PaperBadge>
  );
};

export default Badge;

Badge.propTypes = {
  style: PropTypes.object,
  number: PropTypes.number,
  maxNumber: PropTypes.number,
  size: PropTypes.number,
  color: PropTypes.oneOf(["red", "blue"]),
  maxNumberSymbol: PropTypes.string,
  isNew: PropTypes.bool,
};
