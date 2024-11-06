import React from "react";
import { Stack } from "expo-router";

const LoginRootLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false, animation: "none" }} initialRouteName="index">
      <Stack.Screen name="index" />
      <Stack.Screen name="signupModal" options={{ presentation: "transparentModal" }} />
      <Stack.Screen name="initBreathModal" options={{ presentation: "transparentModal" }} />
      <Stack.Screen name="measureBpm" options={{ presentation: "transparentModal" }} />
    </Stack>
  );
};

export default LoginRootLayout;
