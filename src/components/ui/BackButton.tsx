import React from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { theme } from "../../constants/theme";

type BackButtonProps = {
  style?: StyleProp<ViewStyle>;
  fallbackRoute?: string;
  customRoute?: string;
};

export default function BackButton({
  style,
  fallbackRoute = "/",
  customRoute,
}: BackButtonProps) {
  const router = useRouter();
  const navigation = useNavigation();

  function handleBack() {
    if (customRoute) {
      router.replace(customRoute as never);
      return;
    }

    if (navigation.canGoBack()) {
      router.back();
      return;
    }

    router.replace(fallbackRoute as never);
  }

  return (
    <Pressable
      onPress={handleBack}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel="Go back"
    >
      <Ionicons name="chevron-back" size={26} color={theme.colors.primary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 4,
  },
  pressed: {
    opacity: 0.65,
    transform: [{ scale: 0.96 }],
  },
});