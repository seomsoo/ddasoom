import React from "react";
import WebView from "react-native-webview";

const AuthedScreen = () => {
  return <WebView style={{ flex: 1 }} source={{ uri: "https://expo.dev" }} />;
};

export default AuthedScreen;
