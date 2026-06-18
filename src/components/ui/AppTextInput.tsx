import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../constants/theme";

type AppTextInputProps = TextInputProps & {
    label: String;
    iconName: keyof typeof Ionicons.glyphMap;
    isPassword?: boolean;
};

export default function AppTextInput({
    label, iconName, isPassword = false, ...props
}: AppTextInputProps) {
    const [secure, setSecure] = useState(isPassword);

    return (
        <View style={styles.container}>
            <View style={styles.iconCircle}>
                <Ionicons name={iconName} size={20} color={theme.colors.primary} />
            </View>

            <View style={styles.inputArea}>
                <Text style={styles.label}>{label}</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#A2AEA7"
                    secureTextEntry={secure}
                    {...props} />
            </View>

            {isPassword && (
                <TouchableOpacity onPress={() => setSecure(!secure)}>
                    <Ionicons
                        name={secure ? "eye-off-outline" : "eye-outline"}
                        size={22}
                        color={theme.colors.muted}
                    />
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    minHeight: 58,
    borderRadius: theme.radius.pill,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: theme.colors.paleGreen,
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.sm,
  },
  inputArea: {
    flex: 1,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: theme.colors.primary,
  },
  input: {
    fontSize: 14,
    color: theme.colors.text,
    paddingVertical: 1,
  },
});