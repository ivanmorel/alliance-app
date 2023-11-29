import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

import PropTypes from "prop-types";
import { Text } from "react-native-paper";
import { ScaledSheet } from "react-native-size-matters/extend";

import { PRIMARY_COLOR } from "@styles/styleConstants";

const AppLoader = ({ title = "Loading..." }) => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    animation.addListener(({ value }) => {
      if (value === 1) {
        animation.setValue(0);
        Animated.timing(animation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      }
    });

    return () => {
      animation.removeAllListeners();
    };
  }, [animation]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("@assets/loader.png")}
        style={[
          styles.image,
          {
            transform: [
              { scale: 1 },
              {
                rotateZ: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0deg", "360deg"],
                }),
              },
              { perspective: 1000 },
            ],
          },
        ]}
      />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: "20@ms",
    color: PRIMARY_COLOR,
  },
  image: {
    width: "85@ms",
    height: "100@vs",
    tintColor: PRIMARY_COLOR,
    resizeMode: "contain",
  },
});

AppLoader.propTypes = {
  title: PropTypes.string,
};

export default AppLoader;
