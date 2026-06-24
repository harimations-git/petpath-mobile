import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import Screen from "../../src/components/layout/Screen"
import DecorativeLeaf from "../../src/components/ui/DecorativeLeaf"
import Logo from "../../src/components/ui/Logo"
import Card from "../../src/components/ui/Card"
import BackButton from "../../src/components/ui/BackButton";
import { theme } from "../../src/constants/theme";
import Spacer from "../../src/components/layout/Spacer";

export default function PrivacyPolicyScreen() {

    return (
        <Screen
            scrollable={true}
            contentContainerStyle={styles.verificationContent}
        >
            <Spacer height={30}/>
            <View style={styles.header}>
                <View style={styles.backButtonWrapper}>
                    <BackButton />
                </View>
            

            <View style={styles.hero}>
                <View style={styles.heroText}>
                    <Text style={styles.title}>Privacy Policy</Text>
                    <Text style={styles.subtitle}>
                        Learn how PetPath uses your information.
                    </Text>
                </View>
            </View>
            </View>

            <View style={styles.cardLayer}>
                <DecorativeLeaf
                    width={140}
                    height={140}
                    bottom={-180}
                    left={10}
                    rotate={0}
                    opacity={1}
                    zIndex={0}
                />

                <DecorativeLeaf
                    width={140}
                    height={140}
                    top={-160}
                    left={-65}
                    rotate={150}
                    opacity={1}
                    zIndex={0}
                />

                <DecorativeLeaf
                    width={140}
                    height={140}
                    top={-80}
                    right={-75}
                    rotate={150}
                    flipY
                    flipX
                    opacity={1}
                    zIndex={0}
                />

                <DecorativeLeaf
                    width={140}
                    height={140}
                    bottom={-150}
                    right={20}
                    rotate={50}
                    flipY
                    flipX   
                    opacity={1}
                    zIndex={0}
                />

                <View style={styles.cardWrapper}>
                    <Card>
                        <ScrollView
                            style={styles.termsScroll}
                            contentContainerStyle={styles.termsScrollContent}
                            showsVerticalScrollIndicator={false}
                        >

                            <Spacer height={10} />


                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>• Information we collect</Text>
                                <Text style={styles.bodyText}>
                                    PetPath may collect account details, lifestyle questionnaire answers, approximate location, saved pets and report information.
                                </Text>
                            </View>

                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>• How your data is used</Text>
                                <Text style={styles.bodyText}>
                                    Your information is used to calculate pet matches, personalise recommendations, save pets and support safety/moderation features.
                                </Text>
                            </View>

                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>• Organisation listings</Text>
                                <Text style={styles.bodyText}>
                                    Pet listings are created and managed by approved shelters, rescue centres and charities. PetPath aims to display trustworthy information, but users should confirm final details with the organisation before applying to adopt.
                                </Text>
                            </View>

                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>• Location data</Text>
                                <Text style={styles.bodyText}>
                                    Approximate location is used only to show pets within a relevant search distance.
                                </Text>
                            </View>

                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>• Email updates</Text>
                                <Text style={styles.bodyText}>
                                    Users can choose to receive email updates when saved pets become reserved, rehomed or unavailable. User's cant opt out of this at any time from the settings menu.
                                </Text>
                            </View>

                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>• Data sharing</Text>
                                <Text style={styles.bodyText}>
                                    PetPath does not sell user data. Information is only used to provide the app’s core features and support moderation where necessary.
                                </Text>
                            </View>

                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>• Account control</Text>
                                <Text style={styles.bodyText}>
                                    Users can update their profile and notification preferences from settings.
                                </Text>
                            </View>
                        </ScrollView>
                    </Card>
                </View>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    header: {
        position: "relative",
        minHeight: 44,
        justifyContent: "center",
        alignItems: "center",
    },
    heading: {
        fontSize: 22,
        fontWeight: "800",
        color: theme.colors.primaryDark,
        marginBottom: 8,
    },
    verificationContent: {
        paddingBottom: theme.spacing.lg,
    },
    backButtonWrapper: {
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        justifyContent: "center",
        zIndex: 2,
    },

    logoWrapper: {
        alignItems: "center",
        justifyContent: "center",
    },
    hero: {
        alignItems: "center",
        marginTop: theme.spacing.sm,
        marginBottom: theme.spacing.sm,
    },

    heroText: {
        alignItems: "center",
        paddingHorizontal: theme.spacing.md,
    },

    title: {
        fontSize: 30,
        lineHeight: 36,
        fontWeight: "900",
        color: theme.colors.primaryDark,

        textAlign: "center",
    },

    subtitle: {
        fontSize: 14,
        lineHeight: 20,
        color: theme.colors.text,
        textAlign: "center",
    },

    cardWrapper: {
        position: "relative",
        zIndex: 2,
        elevation: 2,
        marginTop: theme.spacing.md,
    },

    cardHeading: {
        fontSize: 20,
        fontWeight: "800",
        color: theme.colors.primaryDark,
        textAlign: "center",
        marginBottom: theme.spacing.xs,
    },

    cardIntro: {
        fontSize: 13,
        lineHeight: 19,
        color: theme.colors.text,
        textAlign: "center",
        marginBottom: theme.spacing.md,
    },

    cardLayer: {
        position: "relative",
    },

    termsScroll: {
        maxHeight: 590,
    },

    termsScrollContent: {
        paddingTop: theme.spacing.md,
        paddingBottom: theme.spacing.md,
    },

    section: {
        marginBottom: theme.spacing.md,
    },

    sectionTitle: {
        fontSize: 15,
        fontWeight: "800",
        color: theme.colors.primaryDark,
        marginBottom: 4,
    },

    bodyText: {
        fontSize: 13,
        lineHeight: 19,
        color: theme.colors.text,
    },
});
