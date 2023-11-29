import React, { useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";

import { Loader, TopBar } from "@components";

import styles from "./TermsOfUse.style";

const TermsOfUse = () => {
  const [isLoading, setLoading] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <TopBar titleLeftAligned iconLeft="back" title="Terms of Use" />
      {isLoading ? <Loader /> : null}
      <WebView
        bounces={false}
        onLoadEnd={() => setLoading(false)}
        source={{
          uri: "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/",
        }}
        style={styles.webView}
        containerStyle={styles.webViewContainer}
      />
    </SafeAreaView>
  );
};

export default TermsOfUse;
