import { Stack } from "expo-router";
import { theme } from "../src/constants/theme";
import "../src/config/amplify";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    />
  );
}