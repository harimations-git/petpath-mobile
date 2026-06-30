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
import NoticeMessage from "../../src/components/ui/NoticeMessage";
import Spacer from "../../src/components/layout/Spacer";
import InfoListCard from "../../src/components/ui/InfoListCard";
import AppCarousel from "../../src/components/ui/AppCarousel";
import { homeCarouselItems, homeInfoListItems } from "../../src/constants/homeContent";



export default function HomeScreen() {

    const { userProfile, isLoadingProfile } = useUserProfile();

    return (
        <Screen scrollable>
            <Logo hasTagline={true} />

            {isLoadingProfile ? (
                <LoadingSpinner size="small" />
            ) : (
                <>
                    <View style={styles.hero}>
                        <View style={styles.heroText}>


                            <Text style={styles.title}>Find your best match⁠</Text>
                            <Text style={styles.subtitle}>
                                Adoption first, always. Smart guidance to help you find a pet who fits your life and a future you can feel good about.
                            </Text>
                        </View>

                        <PetHeroImage width={200} height={200} top={-30} right={-40} />
                    </View>

                    <View style={styles.page}>
                        <DecorativeLeaf
                            width={140}
                            height={140}
                            top={-350}
                            left={-65}
                            rotate={150}
                            opacity={1}
                            zIndex={0}
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

                        <InfoListCard
                            title="How PetPath helps"
                            items={homeInfoListItems}
                        />

                        <Spacer height={10} />


                        <NoticeMessage
                            iconName="people"
                            message="Better choices today. Better lives tomorrow. For pets, people and our planet."
                        />

                        <AppCarousel
                            title="Pet Care Resources:"
                            items={homeCarouselItems}
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
        width: "56%",
        zIndex: 2,
        marginTop: -30,
    },

    title: {
        fontSize: 28,
        lineHeight: 28,
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