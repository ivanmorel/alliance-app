import React, { useEffect, useMemo } from "react";
import { Image, ScrollView, View } from "react-native";

import { useIsFocused } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";
import * as Linking from "expo-linking";
import { TextMask } from "react-native-masked-text";
import { Caption, Card, Text } from "react-native-paper";
import { AirbnbRating } from "react-native-ratings";
import { moderateScale } from "react-native-size-matters/extend";

import { useDispatch, useSelector } from "react-redux";
import {
  activityGroupGet,
  crmLeadAdd,
  crmUserCheck,
  opportunityConvertLead,
  ratingAddQuality,
  resetDeleteLead,
  snackbarAddMessageToQueue,
} from "@actions";

import { navigate } from "@routes/navigator";
import { SCREENS } from "@routes/routes.constants";

import { SNACKBAR_TYPES } from "@utils/constants";
import { getAddressFromGoogleObject, isIOS } from "@utils/utils";

import { Button, DeleteLeadModal, Loader } from "@components";

import { STAR_COLOR } from "@styles/styleConstants";

import opportunitiesIcon from "@assets/opportunities-icon-white.png";

import styles from "./LeadInformation.style";

const LeadInformation = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const dispatch = useDispatch();
  const { quality } = useSelector(({ rating }) => rating);
  const { convertLeadLoading, convertLeadSuccess, convertLeadInfo } =
    useSelector(({ opportunity }) => opportunity);
  const { hasIntegration } = useSelector(({ crm }) => crm);
  const { currentLead: lead, error } = useSelector(({ lead }) => lead);
  const {
    firstName,
    lastName,
    phone,
    email,
    linkedin,
    address,
    title,
    company,
    notes,
    leadId,
    groupId,
    isOwner,
  } = lead;
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused || !groupId) return;
    dispatch(activityGroupGet(groupId));
    dispatch(crmUserCheck());
  }, [isFocused, groupId]);

  useEffect(() => {
    if (!error) return;
    dispatch(
      snackbarAddMessageToQueue({ message: error, type: SNACKBAR_TYPES.error })
    );
    dispatch(resetDeleteLead());
  }, [error]);

  useEffect(() => {
    if (!convertLeadSuccess) return;

    navigate(SCREENS.appStack.opportunities);
    navigate(SCREENS.appStack.opportunityDetail, {
      screen: SCREENS.opportunityDetailTabs.information,
      isEditing: true,
      opportunityId: convertLeadInfo?.opportunityId,
      opportunityName: convertLeadInfo?.name,
    });
  }, [convertLeadSuccess]);

  const mapLink = useMemo(() => {
    if (!address) return "";

    const baseUrl = isIOS()
      ? "https://maps.apple.com/?t=m&&daddr="
      : "google.navigation:q:";

    return baseUrl + address.latitude + "," + address.longitude;
  }, [address]);

  const copyToClipboard = (string) => {
    Clipboard.setString(string);
    dispatch(snackbarAddMessageToQueue({ message: "Copied to clipboard" }));
  };

  const handlePhonePressed = (string) => {
    copyToClipboard(string);
  };

  const handlePushToCRM = () => {
    dispatch(crmLeadAdd({ leadId }));
  };

  const rateLead = (rating) => {
    dispatch(
      ratingAddQuality({
        lead_id: leadId,
        rating: rating,
      })
    );
  };

  const handleConvertLeadToOpportunity = () => {
    dispatch(opportunityConvertLead({ lead_id: leadId }));
  };

  if (!lead || !Object.keys(lead).length) {
    return <Loader containerStyle={styles.loader} />;
  }

  return (
    <React.Fragment>
      <ScrollView
        style={styles.scrollViewContainer}
        contentContainerStyle={styles.scrollViewContentContainer}
      >
        <Card mode="elevated" elevation={0} style={styles.cardContainer}>
          <Card.Title
            titleStyle={styles.cardTitle}
            subtitleStyle={styles.cardSubtitle}
            title={`${firstName} ${lastName}`}
            subtitle={`${title} @ ${company}`}
            subtitleNumberOfLines={3}
          />
          <Card.Content style={styles.cardContent}>
            <AirbnbRating
              selectedColor={STAR_COLOR}
              size={moderateScale(30)}
              showRating={false}
              defaultRating={quality !== null ? quality.rating : 1}
              onFinishRating={rateLead}
              starContainerStyle={styles.starContainer}
              isDisabled={isOwner}
            />
            {phone ? (
              <View style={styles.buttonContainer}>
                <Button
                  variant
                  dense
                  icon="content-copy"
                  text={
                    <TextMask
                      type={"custom"}
                      options={{
                        mask: "+* (***) ***-****",
                      }}
                      value={phone}
                    />
                  }
                  onPress={() => handlePhonePressed(phone)}
                  textContainerStyle={styles.button}
                />
              </View>
            ) : null}
            {email ? (
              <View style={styles.buttonContainer}>
                <Button
                  variant
                  dense
                  icon="email"
                  text={email}
                  onPress={() => Linking.openURL(`mailto:${email}`)}
                  textContainerStyle={styles.button}
                />
              </View>
            ) : null}
            {linkedin ? (
              <View style={styles.buttonContainer}>
                <Button
                  variant
                  dense
                  icon="link"
                  text="VIEW ON LINKEDIN"
                  onPress={() => Linking.openURL(`https:${linkedin}`)}
                  textContainerStyle={styles.button}
                />
              </View>
            ) : null}
            <View style={styles.buttonContainer}>
              <Button
                variant
                dense
                icon="map-marker"
                text={getAddressFromGoogleObject(address)}
                onPress={() => Linking.openURL(mapLink)}
                textContainerStyle={styles.button}
                contentStyle={styles.buttonText}
              />
            </View>
            {notes ? (
              <View style={styles.notesContainer}>
                <Caption>Notes:</Caption>
                <Text style={styles.noteText}>{notes}</Text>
              </View>
            ) : null}
          </Card.Content>
        </Card>
        <Button
          color="secondary"
          icon={() => (
            <Image
              source={opportunitiesIcon}
              style={styles.opportunitiesIcon}
            />
          )}
          onPress={handleConvertLeadToOpportunity}
          text="Create Opportunity"
          loading={convertLeadLoading}
        />
        {hasIntegration ? (
          <Button
            color="dark"
            inverted
            icon="cloud-upload"
            onPress={handlePushToCRM}
            text="Push to CRM"
            buttonStyle={styles.crmButton}
            loading={convertLeadLoading}
          />
        ) : null}
      </ScrollView>
      <View style={styles.footerContainer}>
        {/* TODO: Change these to white... waiting on https://github.com/osr-alliance/app/pull/179  */}
        <Button
          color="primary"
          icon="message-text"
          onPress={() => Linking.openURL(`sms:${phone}`)}
          text="Message"
          buttonStyle={styles.messageButton}
          disabled={!phone}
        />
        <Button
          color="primary"
          icon="phone"
          onPress={() => Linking.openURL(`tel:${phone}`)}
          text="Call"
          buttonStyle={styles.callButton}
          disabled={!phone}
        />
      </View>
      <DeleteLeadModal
        leadId={leadId}
        visible={modalVisible}
        hideModal={() => setModalVisible(false)}
      />
    </React.Fragment>
  );
};

export default LeadInformation;
