import React from "react";

import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useSelector } from "react-redux";

import { SCREENS } from "@routes/routes.constants";

import { mapContactToLead } from "@utils/utils";

import { ContactList, TopBar } from "@components";

import styles from "../Groups/Groups.style";

const ImportContactList = () => {
  const navigation = useNavigation();
  const { isOpportunity, opportunityId } = useRoute().params;
  const { groupId } = useSelector(({ group }) => group.selectedGroup);

  const handleSubmit = (contacts) => {
    const leads = contacts.map((contact) => mapContactToLead(contact));

    if (isOpportunity) {
      navigation.replace(SCREENS.appStack.importContact, {
        contacts: leads,
        opportunityId,
      });
    } else {
      navigation.replace(SCREENS.appStack.importLead, {
        leads,
        groupId,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopBar title="Import leads" titleLeftAligned iconLeft="back" />
      <ContactList onSubmit={handleSubmit} />
    </SafeAreaView>
  );
};

export default ImportContactList;
