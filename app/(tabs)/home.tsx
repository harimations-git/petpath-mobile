import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import Screen from "../../src/components/layout/Screen"
import DecorativeLeaf from "../../src/components/ui/DecorativeLeaf"
import Logo from "../../src/components/ui/Logo"
import { theme } from "../../src/constants/theme";
import PetHeroImage from "../../src/components/ui/PetHeroImage";

import { useUserProfile } from "../../src/context/UserProfileContext";
import LoadingSpinner from "../../src/components/ui/LoadingSpinner";



export default function HomeScreen() {

    const { userProfile, isLoadingProfile } = useUserProfile();

    return (
        <Screen>
            <Logo hasTagline={true} />

            {isLoadingProfile ? (
                <LoadingSpinner size="small" />
            ) : (
                <>
                    <View style={styles.hero}>
                        <View style={styles.heroText}>


                            <Text style={styles.title}>Welcome Back</Text>
                            <Text style={styles.subtitle}>
                                Continue discovering adoptable pets matched to your home, lifestyle and experience.
                            </Text>
                        </View>

                        <PetHeroImage width={200} height={200} top={-30} right={-40} />
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
                </>
            )}
        </Screen>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        position: "relative",
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
    petCircle: {
        width: 138,
        height: 138,
        borderRadius: 69,
        backgroundColor: theme.colors.paleGreen,
        alignItems: "center",
        justifyContent: "center",
    },

});