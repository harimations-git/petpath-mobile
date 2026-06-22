import React, { useState } from "react";
import {StyleSheet, Text, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import Screen from "../../src/components/layout/Screen"
import DecorativeLeaf from "../../src/components/ui/DecorativeLeaf"
import Logo from "../../src/components/ui/Logo"
import { theme } from "../../src/constants/theme";


export default function LoginScreen() {


    return (
        <Screen>
            <Logo hasTagline={true} />

            <View style={styles.hero}>
                <View style={styles.heroText}>
                    <Text style={styles.title}>You did it</Text>
                    <Text style={styles.subtitle}>
                        Thats why he is the G.O.A.T
                    </Text>
                </View>

                <View style={styles.petCircle}>
                    <Ionicons name="paw" size={76} color={theme.colors.primary} />
                    <Text style={styles.subtitle}>
                        Placeholder
                    </Text>
                </View>
            </View>

            <View style={styles.page}>
                <DecorativeLeaf
                    width={100}
                    height={100}
                    bottom={-40}
                    left={-25}
                    rotate={90}
                    opacity={1}
                    zIndex={-1}
                />

                <DecorativeLeaf
                    width={100}
                    height={100}
                    bottom={-40}
                    right={-25}
                    rotate={-90}
                    flipX
                    opacity={1}
                    zIndex={-1}
                />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    header: {
        alignItems: "center",
        paddingTop: theme.spacing.md,
        marginBottom: theme.spacing.lg,
    },
    page: {
        flex: 1,
        position: "relative",
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
    hero: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: theme.spacing.xl,
    },
    heroText: {
        flex: 1,
        marginLeft: 10
    },
    title: {
        fontSize: 24,
        fontWeight: "900",
        color: theme.colors.primaryDark,
        marginBottom: theme.spacing.xs,
    },
    subtitle: {
        fontSize: 15,
        color: theme.colors.text,
        lineHeight: 22,
        width: "90%",
    },
    petCircle: {
        width: 138,
        height: 138,
        borderRadius: 69,
        backgroundColor: theme.colors.paleGreen,
        alignItems: "center",
        justifyContent: "center",
    },
    formCard: {
        backgroundColor: "rgba(255,255,255,0.88)",
        borderRadius: theme.radius.lg,
        paddingVertical: theme.spacing.lg,
    },
    
});