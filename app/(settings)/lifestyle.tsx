import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import { routes } from "../../src/constants/routes";
import { router } from "expo-router";
import { saveLifestyleProfile, getLifestyleProfile } from "../../src/services/user/lifestyleProfileService";

import Screen from "../../src/components/layout/Screen"
import DecorativeLeaf from "../../src/components/ui/DecorativeLeaf"
import AppButton from "../../src/components/ui/AppButton"
import Logo from "../../src/components/ui/Logo"
import Card from "../../src/components/ui/Card"
import BackButton from "../../src/components/ui/BackButton";
import { theme } from "../../src/constants/theme";
import PillDropdown from "../../src/components/ui/PillDropdown";
import InfoModal from "../../src/components/ui/infoModal";
import LoadingSpinner from "../../src/components/ui/LoadingSpinner";
import PetHeroImage from "../../src/components/ui/PetHeroImage";

export default function LifestyleQuestionnaireUpdateScreen() {
    const [buttonTitle, setButtonTitle] = useState("Continue")

    const [homeType, setHomeType] = useState("");
    const [outdoorSpace, setOutdoorSpace] = useState("");
    const [activityLevel, setActivityLevel] = useState("");
    const [dailyRoutine, setDailyRoutine] = useState("");
    const [budget, setBudget] = useState("");
    const [petExperience, setPetExperience] = useState("");

    const [formError, setFormError] = useState("");
    const [infoModalVisible, setInfoModalVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoadingProfile, setIsLoadingProfile] = useState(true);

    async function handleSubmitQuestionnaire() {
        if (isSubmitting) return;

        const allFieldsChosen =
            homeType &&
            outdoorSpace &&
            activityLevel &&
            dailyRoutine &&
            budget &&
            petExperience;

        if (!allFieldsChosen) {
            setFormError("Please make sure all fields are chosen before saving.");
            return;
        }

        try {
            setIsSubmitting(true);
            setFormError("");

            await saveLifestyleProfile({
                homeType,
                outdoorSpace,
                activityLevel,
                dailyRoutine,
                budget,
                petExperience,
            });

            router.replace(routes.tabs.settings);
        } catch (error) {
            console.error("Questionnaire error:", error);

            setFormError(
                error instanceof Error
                    ? error.message
                    : "We couldn't save your answers. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    useEffect(() => {
        let isMounted = true;

        async function loadLifestyleProfile() {
            try {
                setIsLoadingProfile(true);
                setFormError("");

                const lifestyleProfile = await getLifestyleProfile();

                if (!isMounted || !lifestyleProfile) return;

                setHomeType(lifestyleProfile.homeType ?? "");
                setOutdoorSpace(lifestyleProfile.outdoorSpace ?? "");
                setActivityLevel(lifestyleProfile.activityLevel ?? "");
                setDailyRoutine(lifestyleProfile.dailyRoutine ?? "");
                setBudget(lifestyleProfile.budget ?? "");
                setPetExperience(lifestyleProfile.petExperience ?? "");
            } catch (error) {
                console.error("Lifestyle profile fetch error:", error);

                if (isMounted) {
                    setFormError(
                        error instanceof Error
                            ? error.message
                            : "We couldn't load your current answers. Please try again."
                    );
                }
            } finally {
                if (isMounted) {
                    setIsLoadingProfile(false);
                }
            }
        }

        loadLifestyleProfile();

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        async function showWarning() {
            setInfoModalVisible(true)
        }

        showWarning();
    }, []);

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
                    <Text style={styles.title}>Update your Lifestyle</Text>
                    <Text style={styles.subtitle}>
                        These questions help PetPath recommend pets that suit your lifestyle and meet their needs responsibly.
                    </Text>
                </View>

                <View style={styles.petIllustration}>
                    <PetHeroImage width={200} height={170} top={-35} right={-50} />
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
                        {isLoadingProfile ? (
                            <LoadingSpinner size="small" />
                        ) : (
                            <>
                                <PillDropdown
                                    title="Home type"
                                    description="What type of home do you live in?"
                                    iconName="home-outline"
                                    selectedValue={homeType}
                                    onSelect={(value) => {
                                        setHomeType(value)
                                        setFormError("");
                                        setButtonTitle("Save Changes");
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
                                        setButtonTitle("Save Changes");
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
                                        setButtonTitle("Save Changes");
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
                                        setButtonTitle("Save Changes");
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
                                        setButtonTitle("Save Changes");
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
                                        setButtonTitle("Save Changes");
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

                                {isSubmitting ? (
                                    <LoadingSpinner size="small" />
                                ) : (
                                    <>
                                        <AppButton title={buttonTitle} onPress={handleSubmitQuestionnaire} />
                                    </>
                                )}
                            </>
                        )}
                    </Card>
                </View>
            </View>

            <InfoModal
                visible={infoModalVisible}
                title="Please Note:"
                message="Your answers should reflect your real circumstances, not the matches you want to see. Changing your answers to improve your matches can lead to unsuitable recommendations."
                warning="Note: Shelters may carry out home checks to make sure a pet is going to a suitable home."
                buttonText="Continue"
                buttonTextSecondary="Cancel"
                iconName="warning"
                onConfirm={() => {
                    setInfoModalVisible(false);
                }}
                onClose={() => {
                    router.replace(routes.tabs.settings)
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