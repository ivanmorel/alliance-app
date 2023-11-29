import React, { useEffect } from "react";
import { LogBox, View } from "react-native";

import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { Portal, Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PersistGate } from "redux-persist/integration/react";

import { Provider } from "react-redux";

import Navigation from "@routes/navigator";

import { Snackbar } from "@components";

import { theme } from "@styles/theme";

import "react-native-gesture-handler";
import "intl";
import "intl/locale-data/jsonp/en";

import { persistor, store } from "./src/redux/store";

// Ignoring recent "ViewPropTypes" deprecation warnings. This is especially
// important for Detox tests, as to not interrupt tap zones.
LogBox.ignoreLogs([
  "ViewPropTypes will be removed",
  "Sending `onAnimatedValueUpdate`",
  "Must use physical device for Push",
  "Constants.platform.ios.model has been",
  "userDeleteDevice: ",
  "Already disconnected from App Store",
]);

// Prevent native splash screen from autohiding before App component declaration
preventAutoHideAsync();

function App() {
  // Hide the splash screen
  useEffect(() => {
    hideAsync();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={theme}>
          <SafeAreaProvider>
            <StatusBar style="dark" />
            <Navigation />
            <View>
              <Portal.Host />
            </View>
            <Snackbar />
          </SafeAreaProvider>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
