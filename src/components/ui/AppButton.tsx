import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableOpacityProps,
    View,
    ViewStyle
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../constants/theme";

type AppButtonProps = TouchableOpacityProps & {
    title: string;
    width?: ViewStyle["width"];
};

export default function AppButtonProps({ title, width = "100%",
    style, ...props }: AppButtonProps) {
    return (
        <TouchableOpacity
            activeOpacity={0.85}
            style={[styles.button, { width }, style]}
            {...props}
        >
            <View style={styles.iconSpace}>
                <Ionicons name="paw" size={28} color="#ffffff" />
            </View>

            <Text style={styles.text}>{title}</Text>

            <Ionicons name="arrow-forward" size={20} color="#ffffff" />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 62,
        borderRadius: theme.radius.pill,
        backgroundColor: theme.colors.primary,
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "space-between",
        paddingHorizontal: theme.spacing.md,
        marginTop: theme.spacing.lg
    },
    iconSpace: {
        width: 40,
        alignItems: "center"
    },
    text: {
        color: "#ffffff",
        fontSize: 25,
        fontWeight: "800",
    }
});