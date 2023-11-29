import React, { useEffect } from "react";
import { Image, View } from "react-native";

import { useRoute } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text, Title } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useDispatch, useSelector } from "react-redux";
import { opportunityBranchReset, opportunityInviteAccept } from "@actions";

import { Button, TopBar } from "@components";

import styles from "./JoinOpportunity.style";

const JoinOpportunity = () => {
  const dispatch = useDispatch();
  const { inviteLoading } = useSelector(({ opportunity }) => opportunity);
  const route = useRoute();
  const {
    opportunityName = "",
    inviteCode = "",
    opportunityId,
  } = route?.params || {};

  useEffect(() => {
    return () => {
      dispatch(opportunityBranchReset());
    };
  }, []);

  const handleSubmit = async () => {
    dispatch(
      opportunityInviteAccept({ opportunityId, opportunityName, inviteCode })
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TopBar titleLeftAligned iconLeft="back" title="Join an opportunity" />
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <Image
            resizeMode="contain"
            source={require("@assets/join-group.png")}
            style={styles.image}
          />
          <Text style={styles.label}>You are joining the opportunity:</Text>
          <Title style={styles.name}>{opportunityName}</Title>
          <Button
            loading={inviteLoading}
            color="secondary"
            onPress={handleSubmit}
            text="join opportunity"
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default JoinOpportunity;
