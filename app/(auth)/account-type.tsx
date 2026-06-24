import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import Screen from "../../src/components/layout/Screen"
import DecorativeLeaf from "../../src/components/ui/DecorativeLeaf"
import Logo from "../../src/components/ui/Logo"
import { theme } from "../../src/constants/theme";

import { router } from "expo-router";
import { routes } from "../../src/constants/routes";
import BackButton from "../../src/components/ui/BackButton";
import PetHeroImage from "../../src/components/ui/PetHeroImage";

export default function AccountTypeScreen() {

    function handleCreateRegularAccount() {
        router.push(routes.auth.createAccount)
    }

    function handleCreateShelterAccount() {
        Alert.alert("Redirect to petpath shelter web app")
    }

    return (
        <Screen scrollable contentContainerStyle={styles.content}>
            <View style={styles.header}>
                <View style={styles.backButtonWrapper}>
                    <BackButton />
                </View>

                <Logo hasTagline={true} />
            </View>

            <View style={styles.hero}>
                <View style={styles.heroText}>
                    <Text style={styles.title}>Choose your account type</Text>
                    <Text style={styles.subtitle}>
                        Pick the option that best describes how you’ll use PetPath.
                    </Text>
                </View>

                <PetHeroImage width={200} height={200} top={-30} right={-40} />
            </View>

            <View style={styles.optionsLayer}>
                <DecorativeLeaf
                    width={110}
                    height={110}
                    bottom={-105}
                    right={99}
                    rotate={-120}
                    opacity={1}
                    zIndex={-1}
                />

                <DecorativeLeaf
                    width={140}
                    height={140}
                    top={-315}
                    left={-65}
                    rotate={65}
                    opacity={1}
                    zIndex={0}
                />

                <View style={styles.optionsPanel}>
                    <TouchableOpacity
                        style={styles.accountOption}
                        activeOpacity={0.85}
                        onPress={() => router.push("/(auth)/create-account")}
                    >
                        <View style={styles.optionIcon}>
                            <Ionicons
                                name="person-outline"
                                size={26}
                                color={theme.colors.primaryDark}
                            />
                        </View>

                        <View style={styles.optionTextWrapper}>
                            <Text style={styles.optionLabel}>For adopters</Text>
                            <Text style={styles.optionTitle}>Regular account</Text>
                            <Text style={styles.optionDescription}>
                                Find suitable pets, save favourites, and contact shelters or breeders.
                            </Text>
                        </View>

                        <Ionicons
                            name="chevron-forward"
                            size={24}
                            color={theme.colors.primaryDark}
                        />
                    </TouchableOpacity>

                    <View style={styles.optionGap}>
                        <View style={styles.optionGapLine} />
                        <Text style={styles.optionGapText}>or</Text>
                        <View style={styles.optionGapLine} />
                    </View>

                    <TouchableOpacity
                        style={styles.accountOption}
                        activeOpacity={0.85}
                        onPress={handleCreateShelterAccount}
                    >
                        <View style={styles.optionIcon}>
                            <Ionicons
                                name="home-outline"
                                size={26}
                                color={theme.colors.primaryDark}
                            />
                        </View>

                        <View style={styles.optionTextWrapper}>
                            <Text style={styles.optionLabel}>For organisations</Text>
                            <Text style={styles.optionTitle}>Shelter account</Text>
                            <Text style={styles.optionDescription}>
                                Register your charity and list animals that are ready for adoption.
                            </Text>
                        </View>

                        <Ionicons
                            name="chevron-forward"
                            size={24}
                            color={theme.colors.primaryDark}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    content: {
        flexGrow: 1,
        paddingHorizontal: theme.spacing.lg,
        paddingBottom: theme.spacing.xl,
    },

    header: {
        minHeight: 88,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: theme.spacing.md,
    },

    backButtonWrapper: {
        position: "absolute",
        left: 0,
        top: theme.spacing.md,
        bottom: 0,
        justifyContent: "center",
        zIndex: 2,
    },

    hero: {
        position: "relative",
        minHeight: 175,
        justifyContent: "center",
        overflow: "visible",
        marginTop: theme.spacing.md,
    },

    heroText: {
        width: "58%",
        zIndex: 2,
        marginTop: -30,
    },

    title: {
        fontSize: 28,
        lineHeight: 34,
        fontWeight: "900",
        color: theme.colors.primaryDark,
    },

    subtitle: {
        marginTop: 6,
        fontSize: 13,
        lineHeight: 18,
        color: theme.colors.text,
    },

    optionsLayer: {
        position: "relative",
    },

    optionsPanel: {
        position: "relative",
        zIndex: 2,
        padding: theme.spacing.md,
        borderRadius: 18,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: theme.colors.border,
        elevation: 2,
    },

    accountOption: {
        minHeight: 135,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: theme.spacing.lg,
        paddingHorizontal: theme.spacing.md,
        borderRadius: 14,
        backgroundColor: theme.colors.background,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },

    optionIcon: {
        width: 54,
        height: 54,
        borderRadius: 27,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.paleGreen,
        marginRight: theme.spacing.md,
    },

    optionTextWrapper: {
        flex: 1,
        paddingRight: theme.spacing.sm,
    },

    optionLabel: {
        fontSize: 11,
        fontWeight: "800",
        color: theme.colors.primaryDark,
        textTransform: "uppercase",
        marginBottom: 4,
    },

    optionTitle: {
        fontSize: 17,
        fontWeight: "900",
        color: theme.colors.primaryDark,
        marginBottom: 5,
    },

    optionDescription: {
        fontSize: 13,
        lineHeight: 18,
        color: theme.colors.text,
    },

    optionGap: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: theme.spacing.md,
    },

    optionGapLine: {
        flex: 1,
        height: 1,
        backgroundColor: theme.colors.border,
    },

    optionGapText: {
        marginHorizontal: theme.spacing.sm,
        fontSize: 12,
        fontWeight: "800",
        color: theme.colors.text,
        textTransform: "uppercase",
    },
});