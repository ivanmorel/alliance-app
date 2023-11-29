import React from "react";
import { ScrollView } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Text, TopBar } from "@components";

import styles from "./PrivacyPolicy.style";

const PrivacyPolicy = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TopBar titleLeftAligned iconLeft="back" title="Privacy Policy" />
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContentContainer}
      >
        <Text style={styles.paragraph}>
          This Privacy Policy applies to our website, www.allianceapp.com, our
          apps, communications, and other services (the “Services”). Our
          registered users (“Members”) share their professional identities,
          refer business leads to each other, and develop their careers and
          businesses. Certain content on some of our Services is viewable to
          non-Members (“Visitors”).
        </Text>
        <Text style={styles.paragraph}>
          Alliance App, Inc. (“we” or “us”) can modify this Privacy Policy, and
          if we make material changes to it, we will provide notice through our
          Services, or by other means, to provide you the opportunity to review
          the changes before they become effective. If you object to any
          changes, you may close your account.
        </Text>
        <Text style={styles.paragraph}>
          You acknowledge that your continued use of our Services after we
          publish or send a notice about our changes to this Privacy Policy
          means that the collection, use and sharing of your personal data is
          subject to the updated Privacy Policy, as of its effective date.
        </Text>
        <Text style={styles.paragraph}>1. Data We Collect </Text>
        <Text style={styles.paragraph}>1.1 Data You Provide To Us</Text>
        <Text style={styles.paragraph}>
          We collect data you provide to us. To create and use your account, you
          need to provide data to us including your name, email address, phone
          number, password, credit card or other payment information, and
          billing information. In order to maximize the usefulness of our
          Services, you will also need to complete your profile with information
          such as your company, job title, work experience, photo, and
          geographic region. Please do not post personal data to your profile
          that you do not want to be publicly available.
        </Text>
        <Text style={styles.paragraph}>
          We also collect data that you provide while using the Services, such
          as when you provide a lead to another Member, rate another Member’s
          lead, or provide us feedback about the Services.
        </Text>
        <Text style={styles.paragraph}>1.2 Data From Others</Text>
        <Text style={styles.paragraph}>
          We collect data about you that others provide to us, such as the
          ratings that other Members provide for your leads.
        </Text>
        <Text style={styles.paragraph}>1.3 Service Use</Text>
        <Text style={styles.paragraph}>
          We log usage data when you visit or otherwise use our Services, such
          as when you view or click on content, provide a Lead (defined in our
          User Agreement), or rate a Lead. We use log-ins, cookies, device
          information and internet protocol (“IP”) addresses to identify you and
          log your use.
        </Text>
        <Text style={styles.paragraph}>1.4 Cookies</Text>
        <Text style={styles.paragraph}>
          A cookie is a small file placed onto your device. We use cookies and
          similar technologies to collect data (e.g., device IDs) to recognize
          you and your device(s) and to enable our features and functionality.
          You may be able to disable our cookies using your web browser
          settings. However, doing so will make it more difficult for you to use
          the Services effectively, and may make it impossible to access some of
          the functions we offer through the Services.
        </Text>
        <Text style={styles.paragraph}>1.5 Your Device and Location</Text>
        <Text style={styles.paragraph}>
          When you visit or leave our Services, we receive the URL of both the
          site you came from and the one you go to and the time of your visit.
          We also get information about your network and device (e.g., IP
          address, proxy server, operating system, web browser and add-ons,
          device identifier and features, cookie IDs and/or ISP, or your mobile
          carrier). If you use our Services from a mobile device, that device
          will send us data about your location based on your phone settings.
        </Text>
        <Text style={styles.paragraph}>1.6 Messages</Text>
        <Text style={styles.paragraph}>
          We collect information about you when you send, receive, or engage
          with referrals or other messages in connection with our Services. We
          may also use automatic scanning technology on messages to support and
          protect our site. For example, we may use this technology to block
          content that violates our User Agreement from our Services.
        </Text>
        <Text style={styles.paragraph}>1.7 Sites and Services of Others</Text>
        <Text style={styles.paragraph}>
          We get data when you visit sites that include our ads or cookies.
        </Text>
        <Text style={styles.paragraph}>1.8 Other</Text>
        <Text style={styles.paragraph}>
          Our Services are dynamic and we may introduce new features, which may
          require the collection of new information. If we collect materially
          different personal data or materially change how we collect, use or
          share your data, we will modify this Privacy Policy and notify you of
          the changes as described above.
        </Text>
        <Text style={styles.paragraph}>2. How We Use Your Data</Text>
        <Text style={styles.paragraph}>
          WE DO NOT SELL, RENT OR LEASE YOUR PERSONAL DATA. WE DO NOT USE YOUR
          PERSONAL DATA TO DRIVE TARGETED ADVERTISEMENTS TO YOU. We do use your
          data as described below.
        </Text>
        <Text style={styles.paragraph}>2.1 Our Services</Text>
        <Text style={styles.paragraph}>
          We use your personal data to provide, support, and develop our
          Services. For example, we use your personal data such as your name,
          email address, and password to communicate with you, administer your
          account, process your membership dues, and ensure that you receive the
          leads directed to you from the other Members. We partner with Stripe
          to process your payments.
        </Text>
        <Text style={styles.paragraph}>
          We share your name, photo, job title, industry, and similar personal
          data with other Members so that they can provide useful referrals to
          you. We also track the feedback that you and other Members provide.
          While your personal data is accessible to other Members, we will not
          make it generally available to the public. However, you should be
          aware that we cannot control how other Members use your personal data
          or prevent other Members from making your personal data public. Please
          do not share or upload personal data (for example, your home address)
          that you would not want to be available to other Members or that you
          would not want other Members to make public.
        </Text>
        <Text style={styles.paragraph}>2.2 Service Providers</Text>
        <Text style={styles.paragraph}>
          We may use others to help us provide our Services (e.g., payment
          processing, maintenance, analysis, audit, fraud detection, marketing
          and development). They will have access to your data as reasonably
          necessary to perform these tasks on our behalf and will be obligated
          not to disclose or use it for other purposes.
        </Text>
        <Text style={styles.paragraph}>2.3 Communications</Text>
        <Text style={styles.paragraph}>
          We will use your personal data to communicate with you. For example,
          we may send you emails, messages or push notifications about
          Service-related issues such as pending referrals, network updates,
          reminders, or billing matters.
        </Text>
        <Text style={styles.paragraph}>2.4 Advertising</Text>
        <Text style={styles.paragraph}>
          We will not serve you tailored advertisements through the Services.
          However, we may advertise on other platforms. If you view or click on
          an ad that is hosted off of our Services, the ad provider will get a
          signal that someone visited the page that displayed the ad, and they
          may, through the use of mechanisms such as cookies, determine it is
          you. Any personal data that the ad provider gathers about you will be
          subject to the privacy policy of the platform that hosted the ad.
        </Text>
        <Text style={styles.paragraph}>2.5 Marketing</Text>
        <Text style={styles.paragraph}>
          We may use your data for invitations and communications promoting our
          Services, such as by showing the Members that you have used a feature
          on the Services or that you have achieved a milestone. However, we
          will not share your personal data with non-Members unless we have your
          permission. We will not use your personal data to drive targeted
          advertisements to you.
        </Text>
        <Text style={styles.paragraph}></Text>
        <Text style={styles.paragraph}>
          2.6 Developing Services and Research
        </Text>
        <Text style={styles.paragraph}>
          We use data, including Member feedback and referral ratings, to
          conduct research and development for our Services in order to provide
          you and other Members with a better, more productive experience,
          promote quality referrals, and to drive membership growth and
          engagement. In some cases, we work with trusted third parties to
          perform this research, under controls that are designed to protect
          your privacy. We may publish or allow others to publish the insights
          derived from this research, but only presented as aggregated data
          rather than personal data.
        </Text>
        <Text style={styles.paragraph}>
          We may conduct polls and surveys through the Services, or allow others
          to do so. For example, we will invite you to rate the quality and
          relevance of the leads you receive through the Services. We will use
          the information we gather to enhance the quality and relevance of the
          referrals provided through the Services.
        </Text>
        <Text style={styles.paragraph}>2.7 Customer Support</Text>
        <Text style={styles.paragraph}>
          We will use your personal data (which can include your communications)
          to investigate, respond to and resolve complaints and for Service
          issues (e.g., bugs).
        </Text>
        <Text style={styles.paragraph}>
          2.8. Insights That Do Not Identify You
        </Text>
        <Text style={styles.paragraph}>
          We will use your data to produce and share insights that do not
          identify you. For example, we may use your data to generate statistics
          about our Members and the quality of the referrals they generate and
          receive in order to improve the Services or to advertise the Services
          to non-Members.
        </Text>
        <Text style={styles.paragraph}>2.9 Security and Investigations</Text>
        <Text style={styles.paragraph}>
          We also use your personal data (including your communications) for
          security purposes or to prevent or investigate possible fraud or other
          violations of our User Agreement and/or attempts to harm our Members
          or others.
        </Text>
        <Text style={styles.paragraph}>3. How We Share Information</Text>
        <Text style={styles.paragraph}>3.1 Our Services</Text>
        <Text style={styles.paragraph}>
          Any data that you include on your profile and any content that you
          post (such as a referral that you submit) will be seen by others. For
          example, the information in your profile will be visible to other
          Members. And, any referral that you submit to another Member will be
          seen by the recipient.
        </Text>
        <Text style={styles.paragraph}>3.2 Others’ Services</Text>
        <Text style={styles.paragraph}>
          If you link your account with another service such as LinkedIn,
          personal data may become available to the other service. The sharing
          and use of that personal data will be described in, or linked to, a
          consent screen when you opt to link the accounts. Third-party services
          have their own privacy policies, and you may be giving them permission
          to use your data in ways we would not.
        </Text>
        <Text style={styles.paragraph}>
          We do not authorize other parties to collect personally identifiable
          information about you over time and across different Web sites (other
          than our website). However, if you choose to use third-party Web sites
          or services, you will be subject to their own privacy policies, which
          may allow them to collect your information in this manner. We cannot
          control third-party privacy policies.
        </Text>
        <Text style={styles.paragraph}>3.3 Service Providers</Text>
        <Text style={styles.paragraph}>
          We use others to help us provide our Services (e.g., maintenance,
          analysis, audit, payments, fraud detection, marketing and
          development). They will have access to your information as reasonably
          necessary to perform these tasks on our behalf and are obligated not
          to disclose or use it for other purposes.
        </Text>
        <Text style={styles.paragraph}>3.4 Legal Disclosures </Text>
        <Text style={styles.paragraph}>
          It is possible that we will need to disclose information about you
          when required by law, subpoena, or other legal process or if we have a
          good faith belief that disclosure is reasonably necessary to (1)
          investigate, prevent or take action regarding suspected or actual
          illegal activities or to assist government enforcement agencies; (2)
          enforce our agreements with you; (3) investigate and defend ourselves
          against any third-party claims or allegations; (4) protect the
          security or integrity of our Services (such as by sharing with
          companies facing similar threats); or (5) exercise or protect the
          rights and safety of Alliance App, Inc., our Members, personnel or
          others.
        </Text>
        <Text style={styles.paragraph}>3.5 Change in Control or Sale</Text>
        <Text style={styles.paragraph}>
          We can also share your personal data as part of a sale, merger or
          change in control, or in preparation for any of these events. Any
          other entity which buys us or part of our business will have the right
          to continue to use your data as set out in this Privacy Policy, and to
          change this Privacy Policy as described above.
        </Text>
        <Text style={styles.paragraph}>3.6 Your Employer</Text>
        <Text style={styles.paragraph}>
          If you have a Team Account (defined in the User Agreement), your
          employer will have access to the personal data that you provide to us.
          For example, we may allow your employer to download it onto your
          employer’s customer relationship management (“CRM”) system. We cannot
          control how your employer uses and protects your confidential
          information.
        </Text>
        <Text style={styles.paragraph}>4. Data Retention & Related Issues</Text>
        <Text style={styles.paragraph}>
          We reserve the right to retain your personal data indefinitely. This
          includes data you or others provided to us and data generated or
          inferred from your use of our Services. However, we also reserve the
          right to delete your personal data after you close your account or if
          we close your account for breach of the User Agreement. We are not an
          online backup service and do not guaranty the retention of your data.
        </Text>
        <Text style={styles.paragraph}>
          If you choose to close your account, your personal data will generally
          stop being visible to others on our Services within 24 hours.
          Information you have shared with others, such as referrals, will
          remain visible after your account is closed, and we do not control
          data that other Members have copied out of our Services. Your profile
          may continue to be displayed in the services of others (e.g., search
          engine results) until they refresh their cache.
        </Text>
        <Text style={styles.paragraph}>5. Other Important Information</Text>
        <Text style={styles.paragraph}>5.1 Security</Text>
        <Text style={styles.paragraph}>
          We implement security safeguards designed to protect your data, such
          as HTTPS. We regularly monitor our systems for possible
          vulnerabilities and attacks. However, we cannot warrant the security
          of any information that you send us. There is no guarantee that data
          may not be accessed, disclosed, altered, or destroyed by breach of any
          of our physical, technical, or managerial safeguards.
        </Text>
        <Text style={styles.paragraph}>
          5.2 Direct Marketing and Do Not Track Signals
        </Text>
        <Text style={styles.paragraph}>
          We do not share personal data with third parties for their direct
          marketing purposes without your permission. Currently, we do not
          respond to “do not track” signals, as we do not collect personally
          identifiable information about your online activities over time and
          across third-party Web sites.
        </Text>
        <Text style={styles.paragraph}>5.3 Third-Party Services</Text>
        <Text style={styles.paragraph}>
          While using the Services, you may encounter links to third-party
          services such as the websites of other Members. Third-party services
          have their own privacy policies. If you navigate out of our Services
          onto a third-party service, you may be giving them permission to use
          your data in ways we would not.
        </Text>
        <Text style={styles.paragraph}>5.4 Children</Text>
        <Text style={styles.paragraph}>
          We do not knowingly collect information from or about anyone under age
          18.
        </Text>
        <Text style={styles.paragraph}>5.5 Contact Information</Text>
        <Text style={styles.paragraph}>
          If you have questions or complaints about this Privacy Policy, please
          contact us by email at emily@alliance.com. You can also reach us by
          physical mail at:
        </Text>
        <Text style={styles.paragraph}>
          {`
            Alliance App, Inc.
            ATTN: Privacy
            6371 Copperleaf Drive
            Wamego, KS 66547
          `}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicy;
