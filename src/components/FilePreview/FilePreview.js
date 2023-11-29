import React from "react";
import { TouchableWithoutFeedback, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import { Text } from "react-native-paper";
import { scale } from "react-native-size-matters/extend";

import { useDispatch } from "react-redux";
import { downloadFile } from "@actions";

import { formatBytes } from "@utils/utils";

import { PRIMARY_COLOR } from "@styles/styleConstants";

import styles from "./FilePreview.style";

const FilePreview = ({ file }) => {
  const dispatch = useDispatch();
  const { fileName, fileSizeBytes, assetId } = file;
  return (
    <TouchableWithoutFeedback
      onPress={() => assetId && dispatch(downloadFile({ assetId }))}
    >
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="attachment"
          size={scale(40)}
          color={PRIMARY_COLOR}
        />
        <View style={styles.textContainer}>
          <Text style={styles.text}>{fileName}</Text>
          <Text style={styles.text}>{formatBytes(fileSizeBytes)}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default FilePreview;

FilePreview.propTypes = {
  file: PropTypes.shape({
    assetId: PropTypes.number,
    fileName: PropTypes.string,
    fileSizeBytes: PropTypes.number,
  }),
};
