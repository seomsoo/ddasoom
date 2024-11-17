import { Stack } from "expo-router";

const AppLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="(login)">
      <Stack.Screen name="(login)" />
      <Stack.Screen name="authorized" />
      <Stack.Screen name="breath" />
    </Stack>
  );
};

export default AppLayout;
