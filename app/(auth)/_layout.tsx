import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { theme } from "../../src/constants/theme";

export default function RootLayout() {
  return (
    <>
      <StatusBar
        style="dark"
        backgroundColor={theme.colors.primary}
      />

      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </>
  );
}