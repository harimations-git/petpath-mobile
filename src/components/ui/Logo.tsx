import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacityProps,
    View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Spacer from "../layout/Spacer"
import { theme } from "../../constants/theme";

type LogoProps = TouchableOpacityProps & {
    hasTagline: boolean;
};

export default function Logo({ hasTagline,
    style, ...props }: LogoProps) {
    return (
        <View style={styles.header}>
            <Spacer height={30} />
            <View style={styles.logoRow}>
                <Ionicons name="paw" size={46} color={theme.colors.primary} />
                <Text style={styles.logoText}>PetPath</Text>
            </View>
            {hasTagline && (
            <Text style={styles.tagline}>Good choices. Happy pets. Better futures</Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        alignItems: "center",
        paddingTop: theme.spacing.md,
        marginBottom: theme.spacing.sm,
    },
    logoRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    logoText: {
        fontSize: 36,
        fontWeight: "900",
        color: theme.colors.primaryDark,
        marginLeft: theme.spacing.sm,
    },
    tagline: {
        color: theme.colors.primary,
        fontSize: 13,
        marginTop: -2,
    },
});