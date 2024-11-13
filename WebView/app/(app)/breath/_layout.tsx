import React from "react";
import { Stack } from "expo-router";

const LoginRootLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="index">
      <Stack.Screen name="index" />
      <Stack.Screen name="breathEndModal" />
    </Stack>
  );
};

export default LoginRootLayout;
