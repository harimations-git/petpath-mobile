import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import Screen from "../../src/components/layout/Screen"
import DecorativeLeaf from "../../src/components/ui/DecorativeLeaf"
import Logo from "../../src/components/ui/Logo"
import Card from "../../src/components/ui/Card"
import BackButton from "../../src/components/ui/BackButton";
import { theme } from "../../src/constants/theme";
import Spacer from "../../src/components/layout/Spacer";

export default function CreateAccountScreen() {

    return (
        <Screen
            scrollable={true}
            contentContainerStyle={styles.verificationContent}
        >
            <View style={styles.header}>
                <View style={styles.backButtonWrapper}>
                    <BackButton />
                </View>

                <View style={styles.logoWrapper}>
                    <Logo hasTagline={true} />
                </View>
            </View>

            <View style={styles.hero}>
                <View style={styles.heroText}>
                    <Text style={styles.title}>Privacy Policy</Text>
                    <Text style={styles.subtitle}>
                        These terms explain how PetPath should be used and how the adoption process works through official rescue organisations.
                    </Text>
                </View>
            </View>

            <View style={styles.cardLayer}>
                <DecorativeLeaf
                    width={140}
                    height={140}
                    bottom={-45}
                    left={-45}
                    rotate={90}
                    opacity={1}
                    zIndex={0}
                />

                <DecorativeLeaf
                    width={140}
                    height={140}
                    bottom={-45}
                    right={-45}
                    rotate={-90}
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
                                <Text style={styles.sectionTitle}>• Responsible use</Text>
                                <Text style={styles.bodyText}>
                                    Users should provide accurate information in their lifestyle profile so that PetPath can recommend pets responsibly. Inaccurate answers may affect the suitability of the matches shown.
                                </Text>
                            </View>

                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>• Adoption process</Text>
                                <Text style={styles.bodyText}>
                                    PetPath does not directly manage adoptions. Any enquiries, applications, home checks or adoption decisions are handled by the official shelter, rescue centre or charity that created the listing.
                                </Text>
                            </View>

                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>• Organisation listings</Text>
                                <Text style={styles.bodyText}>
                                    Pet listings are created and managed by approved shelters, rescue centres and charities. PetPath aims to display trustworthy information, but users should confirm final details with the organisation before applying to adopt.
                                </Text>
                            </View>

                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>• Suitability matching</Text>
                                <Text style={styles.bodyText}>
                                    Match scores are provided as guidance only. They are based on the user’s lifestyle answers and the animal’s matching profile, but they do not guarantee that an adoption application will be accepted.
                                </Text>
                            </View>

                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>• Saved pets and updates</Text>
                                <Text style={styles.bodyText}>
                                    Users may save pets they are interested in and choose to receive updates if a saved pet becomes reserved, rehomed or unavailable.
                                </Text>
                            </View>

                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>• Safety and reporting</Text>
                                <Text style={styles.bodyText}>
                                    Users can report inaccurate, outdated or concerning listings so they can be reviewed by PetPath administrators.
                                </Text>
                            </View>

                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>• No marketplace activity</Text>
                                <Text style={styles.bodyText}>
                                    PetPath is not a marketplace and does not handle payments, deposits, private sales or ownership transfers. The platform is intended to support responsible adoption through verified organisations.
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
        marginBottom: theme.spacing.sm,
        textAlign: "center",
    },

    subtitle: {
        fontSize: 14,
        lineHeight: 20,
        color: theme.colors.text,
        marginBottom: theme.spacing.sm,
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
        maxHeight: 430,
    },

    termsScrollContent: {
        paddingBottom: theme.spacing.sm,
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
