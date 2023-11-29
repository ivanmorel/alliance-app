import React, { useEffect, useState } from "react";

import axios from "axios";
import PropTypes from "prop-types";
import { Avatar } from "react-native-paper";
import { scale } from "react-native-size-matters/extend";

import { bugsnagNotify } from "@services/bugsnag";

import { PRIMARY_COLOR } from "@styles/styleConstants";

import { buildImageUrl } from "./OSRAvatar.utils";

const OSRAvatar = ({ label, userId, size = 44, avatarStyle, labelStyle }) => {
  const imgURL = buildImageUrl(userId);
  const [err, setErr] = useState(false);

  useEffect(() => {
    const getUrl = async () => {
      if (!userId) {
        setErr(true);
        return;
      }

      try {
        await axios.get(imgURL);
        setErr(false);
      } catch (err) {
        if (err?.response?.status !== 404) bugsnagNotify(err);
        setErr(true);
      }
    };
    getUrl();
  }, [imgURL, userId]);

  if (!err) {
    return (
      <Avatar.Image
        size={scale(size)}
        style={avatarStyle}
        source={{ uri: imgURL }}
      />
    );
  }

  return (
    <Avatar.Text
      color={PRIMARY_COLOR}
      size={scale(size)}
      label={label}
      style={avatarStyle}
      labelStyle={labelStyle}
    />
  );
};

export default OSRAvatar;

OSRAvatar.propTypes = {
  avatarStyle: PropTypes.object,
  label: PropTypes.string,
  labelStyle: PropTypes.object,
  size: PropTypes.number,
  style: PropTypes.object,
  userId: PropTypes.number,
};

OSRAvatar.defaultProps = {
  size: 44,
};
