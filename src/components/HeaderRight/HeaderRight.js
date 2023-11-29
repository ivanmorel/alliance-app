import React from "react";
import { View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { scale } from "react-native-size-matters/extend";

import { SCREENS } from "@routes/routes.constants";

const HeaderRight = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flexDirection: "row" }}>
      <MaterialCommunityIcons
        name="bell"
        size={24}
        color="rgba(255, 255, 255, 0.74)"
        style={{
          marginRight: scale(18),
          paddingHorizontal: scale(10),
          paddingVertical: scale(5),
        }}
        onPress={() => navigation.navigate(SCREENS.appStack.activities)}
      />
    </View>
  );
};

export default HeaderRight;
