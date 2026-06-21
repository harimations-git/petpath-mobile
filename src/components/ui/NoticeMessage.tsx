import React from "react";
import {
    StyleProp,
    StyleSheet,
    Text,
    View,
    ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { theme } from "../../constants/theme";

type NoticeMessageProps = {
    message?: string
    iconName?: keyof typeof Ionicons.glyphMap;
    containerStyle?: StyleProp<ViewStyle>
};

export default function NoticeMessage({
    message = "", iconName = "shield-checkmark-outline", containerStyle,
}: NoticeMessageProps) {
    return (
        <View style={[styles.container, containerStyle]}>
            <View style={styles.iconCircle}>
                <Ionicons
                    name={iconName}
                    size={28}
                    color={theme.colors.primaryDark}
                />
            </View>
            <Text style={styles.message}>{message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        minHeight: 58,
        borderRadius: theme.radius.pill,
        backgroundColor: theme.colors.paleGreen,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.sm,

        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        elevation: 6,
    },

    iconCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "#D7F0A4",
        alignItems: "center",
        justifyContent: "center",
        marginRight: theme.spacing.sm,
    },

    message: {
        flex: 1,
        fontSize: 13,
        lineHeight: 18,
        fontWeight: "600",
        color: theme.colors.primaryDark,
    },
});