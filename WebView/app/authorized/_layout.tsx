import React from "react";
import { Stack } from "expo-router";

const AuthedLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="index">
      <Stack.Screen name="index" />
      <Stack.Screen name="ble" options={{ presentation: "transparentModal" }} />
    </Stack>
  );
};

export default AuthedLayout;
