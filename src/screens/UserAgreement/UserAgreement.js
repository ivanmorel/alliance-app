import React from "react";
import { ScrollView } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Text, TopBar } from "@components";

import styles from "./UserAgreement.style";

const UserAgreement = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TopBar titleLeftAligned iconLeft="back" title="User Agreement" />
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContentContainer}
      >
        <Text style={styles.paragraph}>1. Introduction</Text>
        <Text style={styles.paragraph}>
          When you use our Services you agree to all of these terms. Your use of
          our Services is also subject to our Privacy Policy, which covers how
          we collect, use, share, and store your personal information.
        </Text>
        <Text style={styles.paragraph}>
          You agree that by registering, accessing or using our services
          (described below), you are agreeing to enter into a legally binding
          contract with Alliance App, Inc. (“we,” “us” or “Alliance App”). This
          is true even if you are using our Services on behalf of a third party
          such as your employer. If you do not agree to this contract (the
          “Agreement”), do not click “Join Now” (or similar) and do not access
          or otherwise use any of our Services. If you wish to terminate this
          Agreement, at any time you can do so by closing your account and no
          longer accessing or using our Services.
        </Text>
        <Text style={styles.paragraph}>
          This Agreement applies to www.allianceapp.com and to the apps,
          communications and other services that state that they are offered
          under this Agreement (“Services”). Registered users of our Services
          are “Members” and unregistered users are “Visitors”.
        </Text>
        <Text style={styles.paragraph}>1.1 Alliance App</Text>
        <Text style={styles.paragraph}>
          You are entering into this Agreement with Alliance App (also referred
          to as “we” and “us”). This Agreement applies to Members and Visitors.
          As a Visitor or Member of our Services, the collection, use and
          sharing of your personal data is subject to the Privacy Policy and
          updates.
        </Text>
        <Text style={styles.paragraph}>1.2 Members and Visitors</Text>
        <Text style={styles.paragraph}>
          When you register and join our Services, you become a Member. If you
          have chosen not to register for our Services, you may access certain
          features as a “Visitor.”
        </Text>
        <Text style={styles.paragraph}>1.3 Change</Text>
        <Text style={styles.paragraph}>
          We may modify this Agreement and our Privacy Policy from time to time.
          If we make material changes to it, we will provide you notice through
          our Services, or by other means, to provide you the opportunity to
          review the changes before they become effective. We agree that changes
          cannot be retroactive. If you object to any changes, you may close
          your account. You may also obtain a pro-rata refund of any fees you
          have prepaid, if you have an Individual Account (defined below). Your
          continued use of our Services after we publish or send a notice about
          our changes to these terms means that you are consenting to the
          updated terms as of their effective date.
        </Text>
        <Text style={styles.paragraph}>2. Obligations</Text>
        <Text style={styles.paragraph}>2.1 Service Eligibility</Text>
        <Text style={styles.paragraph}>
          To use the Services, you agree that: (1) you must be no less than age
          18; (2) you will only have one Alliance App account, which must be in
          your real name; and (3) you are not already restricted by Alliance App
          from using the Services. Creating an account with false information is
          a violation of our terms, including accounts registered on behalf of
          others or persons under the age of 18.
        </Text>
        <Text style={styles.paragraph}>2.2 Your Account</Text>
        <Text style={styles.paragraph}>
          Members are account holders. You agree to: (1) use a strong password
          and keep it confidential; (2) not transfer any part of your account;
          and (3) follow the law and the terms of this Agreement, including our
          list of Dos and Don’ts. You are responsible for anything that happens
          through your account unless you close it or report misuse.
        </Text>
        <Text style={styles.paragraph}>
          As between you and others, your account belongs to you. However, if
          your account is paid for by your employer (a “Team Account”), your
          employer has the right to control access to and get reports on your
          use of the Services through the Team Account. If your employment
          relationship is terminated, your Team Account will also be terminated.
          After your Team Account is terminated, you may set up your own
          independent account (an “Individual Account”). Or, you may set up a
          new Team Account with your new employer.
        </Text>
        <Text style={styles.paragraph}>
          Members with Team Accounts will be assigned to a leads group made up
          of other Members who share the same employer. This type of leads group
          may be referred to as a “Team.”
        </Text>
        <Text style={styles.paragraph}>
          Members with Individual Accounts will be grouped together in leads
          groups (each a “Leads Group”). We endeavor to assign each Member with
          an Individual Account to a Leads Group that is made up of Members who
          are likely to complement each other’s business interests and provide
          useful referrals to each other. However, we do not guaranty that any
          Leads Group will be entirely free of Members with competing interests.
          We reserve the right to assign or re-assign your Individual Account to
          an appropriate Leads Group on an as-needed basis.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserAgreement;
