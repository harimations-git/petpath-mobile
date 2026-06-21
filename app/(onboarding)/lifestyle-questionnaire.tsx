import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { routes } from "../../src/constants/routes";
import { router } from "expo-router";

import Screen from "../../src/components/layout/Screen"
import AppTextInput from "../../src/components/ui/AppTextInput"
import DecorativeLeaf from "../../src/components/ui/DecorativeLeaf"
import AppButton from "../../src/components/ui/AppButton"
import Logo from "../../src/components/ui/Logo"
import Card from "../../src/components/ui/Card"
import BackButton from "../../src/components/ui/BackButton";
import AuthProgressStepper from "../../src/components/ui/auth/AuthProgressStepper";
import { theme } from "../../src/constants/theme";
import PillDropdown from "../../src/components/ui/PillDropdown";
import InfoModal from "../../src/components/ui/infoModal";

export default function CreateAccountScreen() {
    const [homeType, setHomeType] = useState("");
    const [outdoorSpace, setOutdoorSpace] = useState("");
    const [activityLevel, setActivityLevel] = useState("");
    const [dailyRoutine, setDailyRoutine] = useState("");
    const [budget, setBudget] = useState("");
    const [petExperience, setPetExperience] = useState("");

    //const [missingFields, setMissingFields] = useState<string[]>([]);
    const [formError, setFormError] = useState("");
    const [infoModalVisible, setInfoModalVisible] = useState(false);


    function handleContinue() {
        const allFieldsChosen =
            homeType &&
            outdoorSpace &&
            activityLevel &&
            dailyRoutine &&
            budget &&
            petExperience;

        if (!allFieldsChosen) {
            setFormError("Please make sure all fields are chosen before continuing.");
            return;
        }

        setFormError("");
        setInfoModalVisible(true);
    }

    return (
        <Screen
            scrollable
            keyboardAware
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
                    <Text style={styles.title}>Tell us about your lifestyle</Text>
                    <Text style={styles.subtitle}>
                        A few quick questions help PetPath recommend pets that suit your lifestyle and meet their needs responsibly.
                    </Text>
                </View>

                <View style={styles.petIllustration}>
                    <Ionicons name="paw" size={70} color={theme.colors.primary} />
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
                        <AuthProgressStepper currentStep={3} />

                        <PillDropdown
                            title="Home type"
                            description="What type of home do you live in?"
                            iconName="home-outline"
                            selectedValue={homeType}
                            onSelect={(value) => {
                                setHomeType(value)
                                setFormError("");
                            }}
                            options={[
                                { label: "Flat", value: "flat" },
                                { label: "House", value: "house" },
                            ]}
                        />

                        <PillDropdown
                            title="Outdoor Space"
                            description="What kind of outdoor space do you have access to?"
                            iconName="leaf-outline"
                            selectedValue={outdoorSpace}
                            onSelect={(value) => {
                                setOutdoorSpace(value)
                                setFormError("");
                            }}
                            options={[
                                { label: "None", value: "none" },
                                { label: "Shared space", value: "shared" },
                                { label: "Private garden", value: "private_garden" },
                            ]}
                        />

                        <PillDropdown
                            title="Activity Level"
                            description="How active is your lifestyle?"
                            iconName="walk-outline"
                            selectedValue={activityLevel}
                            onSelect={(value) => {
                                setActivityLevel(value)
                                setFormError("");
                            }}
                            options={[
                                { label: "Low", value: "low" },
                                { label: "Moderate", value: "moderate" },
                                { label: "High", value: "high" },
                            ]}
                        />

                        <PillDropdown
                            title="Daily routine"
                            description="How often are you usually at home?"
                            iconName="briefcase-outline"
                            selectedValue={dailyRoutine}
                            onSelect={(value) => {
                                setDailyRoutine(value)
                                setFormError("");
                            }}
                            options={[
                                { label: "Mostly home", value: "mostly_home" },
                                { label: "Hybrid", value: "hybrid" },
                                { label: "Out often", value: "out_often" },
                            ]}
                        />

                        <PillDropdown
                            title="Budget"
                            description="What level of pet care costs suits you?"
                            iconName="wallet-outline"
                            selectedValue={budget}
                            onSelect={(value) => {
                                setBudget(value)
                                setFormError("");
                            }}
                            options={[
                                { label: "Low", value: "low" },
                                { label: "Medium", value: "medium" },
                                { label: "High", value: "high" },
                            ]}
                        />

                        <PillDropdown
                            title="Pet experience"
                            description="How much experience do you have with pets?"
                            iconName="paw-outline"
                            selectedValue={petExperience}
                            onSelect={(value) => {
                                setPetExperience(value)
                                setFormError("");
                            }}
                            options={[
                                { label: "First-time", value: "first_time" },
                                { label: "Some experience", value: "some" },
                                { label: "Experienced", value: "experienced" },
                            ]}
                        />

                        {formError ? (
                            <Text style={styles.formError}>{formError}</Text>
                        ) : null}

                        <AppButton title="Continue" onPress={handleContinue} />
                    </Card>
                </View>
            </View>
            <InfoModal
                visible={infoModalVisible}
                title="Your situation can change, and so can your answers."
                message={
                    "You can update your lifestyle questionnaire anytime in Settings."
                }
                buttonText="Got it"
                iconName="leaf-outline"
                onClose={() => {
                    setInfoModalVisible(false);

                    router.push(routes.onboarding.location)

                    // router.push("/(onboarding)/location-permission");
                    //and backend stuff
                }}
            />
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
        flexDirection: "row",
        alignItems: "center",
        marginBottom: theme.spacing.sm,
    },
    heroText: {
        flex: 1,
        marginLeft: 10
    },
    title: {
        fontSize: 28,
        lineHeight: 34,
        fontWeight: "900",
        color: theme.colors.primaryDark,
        marginBottom: theme.spacing.sm,
    },
    subtitle: {
        fontSize: 14,
        lineHeight: 19,
        color: theme.colors.text,
    },
    petIllustration: {
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: theme.colors.paleGreen,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: theme.spacing.sm,
    },
    page: {
        flex: 1,
        position: "relative",
    },
    cardLayer: {
        position: "relative",
    },
    formError: {
        color: theme.colors.error,
        fontSize: 12,
        fontWeight: "700",
        textAlign: "center",
        marginTop: 6,
        marginBottom: 6,
    },
    cardWrapper: {
        position: "relative",
        zIndex: 2,
        elevation: 2,
    },

});