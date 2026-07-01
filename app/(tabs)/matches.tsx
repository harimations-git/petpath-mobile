import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import Screen from "../../src/components/layout/Screen"
import DecorativeLeaf from "../../src/components/ui/DecorativeLeaf"
import Logo from "../../src/components/ui/Logo"
import { theme } from "../../src/constants/theme";
import Card from "../../src/components/ui/Card";
import AppButtonProps from "../../src/components/ui/AppButton";
import InfoModal from "../../src/components/ui/infoModal";

import { routes } from "../../src/constants/routes";
import { router } from "expo-router";

export default function MatchesScreen() {

    const [filterModal, setFilterModal] = useState(false);
    const [matches, setMatches] = useState("");
    const noMatchesImage = require("../../assets/images/empty-states/no-results-found.png")

    return (
        <Screen scrollable>
            <Logo hasTagline={true} />

            <View style={styles.hero}>
                <View style={styles.heroText}>
                    <Text style={styles.title}>Your Matches</Text>
                    <Text style={styles.subtitle}>
                        Pets that suit your lifestyle
                    </Text>
                </View>
            </View>

            <View style={styles.cardLayer}>
                <DecorativeLeaf
                    width={140}
                    height={140}
                    top={-240}
                    left={-80}
                    rotate={140}
                    opacity={1}
                    zIndex={0}
                />

                <DecorativeLeaf
                    width={80}
                    height={80}
                    top={-100}
                    right={-10}
                    rotate={160}
                    flipY
                    opacity={1}
                    zIndex={0}
                />
                <DecorativeLeaf
                    width={60}
                    height={60}
                    top={-60}
                    right={50}
                    rotate={170}
                    flipY
                    flipX
                    opacity={1}
                    zIndex={0}
                />

                <View style={styles.cardWrapper}>

                    <Card style={styles.toggleCard}>
                        <View style={styles.toggleRow}>
                            <AppButtonProps
                                title="Recommended"
                                width="52%"
                                style={styles.recommendedButton}
                                textStyle={styles.recommendedButtonText}
                                arrowIconSet={false}
                                iconSize={20}
                            />
                            <AppButtonProps
                                title="Nearest"
                                width="35%"
                                style={styles.nearestLocationButton}
                                textStyle={styles.nearestLocationButtonText}
                                arrowIconSet={false}
                                iconSize={20}
                                iconName="location"
                                iconColor={theme.colors.primaryDark}
                            />
                            <AppButtonProps
                                width="13%"
                                style={styles.filterButton}
                                arrowIconSet={false}
                                iconSize={20}
                                iconName="filter-outline"
                                iconColor={theme.colors.primaryDark}
                                onPress={() => {
                                    setFilterModal(true)
                                }}
                            />
                        </View>
                    </Card>
                    {matches === "" ? (
                            <View style={styles.emptyState}>
                                <Image
                                    source={noMatchesImage}
                                    style={styles.emptyImage}
                                    resizeMode="contain"
                                />

                                <Text style={styles.emptyTitle}>No matches found</Text>

                                <Text style={styles.emptySubtitle}>
                                    Try increasing your{" "}
                                    <Text
                                        style={styles.emptyLink}
                                        onPress={() => router.push(routes.tabs.settings)}
                                    >
                                        search distance
                                    </Text>{" "}
                                    from the settings or adjusting your filters!
                                </Text>
                            </View>
                    ) : (
                        <Text>Matches here</Text>
                    )}

                </View>
            </View>
            <InfoModal
                visible={filterModal}
                title="Filters"
                message="Please select your filters"
                buttonText="Continue"
                buttonTextSecondary="Cancel"
                iconName="filter"
                onConfirm={() => {
                    setFilterModal(false)
                }}
                onClose={() => setFilterModal(false)}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        position: "relative",
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
        lineHeight: 13,
        width: "90%",
    },

    cardLayer: {
        position: "relative",
    },
    cardWrapper: {
        position: "relative",
        zIndex: 2,
        elevation: 2,
    },
    toggleCard: {
        borderRadius: 10,
        marginTop: -15,
        paddingLeft: 5,
        paddingBottom: 10,
        paddingTop: 20
    },
    toggleRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
    },
    recommendedButton: {
        paddingVertical: 7,
        borderRadius: 15,
        alignSelf: "flex-start",
        paddingLeft: 5,
        marginTop: -10,
        height: 45
    },
    recommendedButtonText: {
        fontSize: 16,
        fontWeight: "800",
        marginRight: 44,
    },
    nearestLocationButton: {
        backgroundColor: "#ffffff",
        borderColor: "#D0D5DD",
        borderWidth: 1,
        paddingVertical: 7,
        borderRadius: 15,
        height: 45,
        marginTop: -10,
        paddingLeft: 0
    },

    nearestLocationButtonText: {
        fontSize: 16,
        fontWeight: "800",
        marginRight: 42,
        color: theme.colors.primaryDark,
    },

    filterButton: {
        backgroundColor: "#ffffff",
        borderColor: "#D0D5DD",
        borderWidth: 1,
        borderRadius: 15,
        height: 45,
        marginTop: -10,
        paddingLeft: 1
    },

    emptyState: {
        alignItems: "center",
        paddingVertical: theme.spacing.lg,
        paddingHorizontal: theme.spacing.md,
    },

    emptyImage: {
        width: 300,
        height: 300,
        marginBottom: theme.spacing.md,
    },

    emptyTitle: {
        fontSize: 25,
        fontWeight: "900",
        color: theme.colors.primaryDark,
        textAlign: "center",
        marginBottom: theme.spacing.sm,
    },

    emptySubtitle: {
        fontSize: 15,
        lineHeight: 22,
        color: theme.colors.text,
        textAlign: "center",
    },

    emptyLink: {
        color: theme.colors.primaryDark,
        fontWeight: "900",
        textDecorationLine: "underline",
    },


});