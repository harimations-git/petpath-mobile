import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { router } from "expo-router";
import { routes } from "../../src/constants/routes";
import { signOut, fetchAuthSession } from "aws-amplify/auth";
import { getCurrentUserProfile } from "../../src/services/user/userService";
import { getLifestyleProfile } from "../../src/services/user/lifestyleProfileService";
import { updateSearchDistance } from "../../src/services/user/lifestyleProfileService";

import Screen from "../../src/components/layout/Screen"
import DecorativeLeaf from "../../src/components/ui/DecorativeLeaf"
import Logo from "../../src/components/ui/Logo"
import { theme } from "../../src/constants/theme";
import Card from "../../src/components/ui/Card";
import Spacer from "../../src/components/layout/Spacer";
import AppButtonProps from "../../src/components/ui/AppButton";
import InfoModal from "../../src/components/ui/infoModal";
import { Ionicons } from "@expo/vector-icons";
import DistanceSlider from "../../src/components/ui/DistanceSlider";
import LoadingSpinner from "../../src/components/ui/LoadingSpinner";
import { useUserProfile } from "../../src/context/UserProfileContext";

export default function Settings() {

    const [originalDistance, setOriginalDistance] = useState(0);
    const [distance, setDistance] = useState(5);
    const [distanceError, setDistanceError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const { userProfile, isLoadingProfile } = useUserProfile();

    const [isLoadingDistance, setIsLoadingDistance] = useState(false);
    const [isSavingDistance, setIsSavingDistance] = useState(false);
    const [infoModalVisible, setInfoModalVisible] = useState(false);

    useEffect(() => {
        let isMounted = true;

        async function loadSettingsData() {
            try {
                setIsLoadingDistance(true);
                setDistanceError("");

                const lifestyleProfile = await getLifestyleProfile();

                if (!isMounted) return;

                if (typeof lifestyleProfile.searchDistance === "number") {
                    setDistance(lifestyleProfile.searchDistance);
                    setOriginalDistance(lifestyleProfile.searchDistance);
                }
            } catch (error) {
                console.log("Could not load lifestyle profile:", error);

                if (isMounted) {
                    setDistanceError(
                        "Unable to load your saved search distance."
                    );
                }
            } finally {
                if (isMounted) {
                    setIsLoadingDistance(false);

                }
            }
        }

        loadSettingsData();

        return () => {
            isMounted = false;
        };
    }, []);

    async function handleLogout() {
        try {
            await signOut();
            setInfoModalVisible(false);
            router.replace(routes.auth.login);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }

    async function handleSaveDistance() {
        try {
            setIsSavingDistance(true);
            setDistanceError("");

            await updateSearchDistance(distance);


        } catch (error: any) {
            console.error("Save distance error:", error);

            setDistanceError(
                error?.message || "Unable to save search distance."
            );
        } finally {
            setSuccessMessage("Search distance saved!");
            setIsSavingDistance(false);
        }
    }

    function handleDistanceChange(value: number) {
        setDistance(value);
        setSuccessMessage("Save Settings");
    }

    return (
        <Screen scrollable>
            <Logo hasTagline={true} />

            <View style={styles.cardLayer}>
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
                    width={100}
                    height={100}
                    bottom={-40}
                    right={-25}
                    rotate={-90}
                    flipX
                    opacity={1}
                    zIndex={-1}
                />

                <View style={styles.cardWrapper}>
                    <Card>

                        <TouchableOpacity
                            style={styles.accountSummary}
                            activeOpacity={1}
                            onPress={() => router.push(routes.settings.account)}
                        >
                            <View style={styles.accountIcon}>
                                <Ionicons name="person-outline" size={24} color={theme.colors.primaryDark} />
                            </View>

                            <View style={styles.accountText}>
                                {isLoadingProfile ? (
                                    <LoadingSpinner size="small" />
                                ) : (
                                    <>
                                        <Text style={styles.accountName}>
                                            {userProfile?.fullName || "Username"}
                                        </Text>
                                        <Text style={styles.accountEmail}>{userProfile?.email || "Username@email.com"}</Text>
                                    </>
                                )}

                                <Text style={styles.viewMore}>View account details</Text>
                            </View>

                            <Ionicons name="chevron-forward" size={22} color={theme.colors.primaryDark} />
                        </TouchableOpacity>

                        <View style={styles.sectionGap}>
                            <Text style={styles.sectionTitle}>Matching settings</Text>
                        </View>

                        <TouchableOpacity
                            style={styles.settingsRow}
                            activeOpacity={0.85}
                            onPress={() => router.push(routes.settings.lifestyle)}
                        >
                            <Ionicons name="home-outline" size={22} color={theme.colors.primaryDark} />
                            <View style={styles.rowText}>
                                <Text style={styles.rowTitle}>Lifestyle questionnaire</Text>
                                <Text style={styles.rowDescription}>Only update your answers when your circumstances have genuinely changed. Your answers should reflect your real situation, not the results you want to see.</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color={theme.colors.primaryDark} />
                        </TouchableOpacity>

                        <View style={styles.distanceBox}>
                            <View style={styles.distanceHeader}>
                                <View>
                                    <Text style={styles.rowTitle}>Search distance</Text>
                                    <Text style={styles.rowDescription}>Choose how far PetPath should search.</Text>
                                </View>

                            </View>
                            <Spacer height={20} />
                            {isLoadingDistance ? (
                                <LoadingSpinner size="small" />
                            ) : (
                                <DistanceSlider
                                    value={distance}
                                    onChange={handleDistanceChange}
                                    min={5}
                                    max={100}
                                    step={1}
                                    unit="miles"
                                    labels={["5 miles", "25 miles", "100 miles"]}
                                    caption={(value) => `Within ${value} miles`}
                                />
                            )}

                            {distanceError ? (
                                <Text style={styles.formError}>
                                    {distanceError}
                                </Text>
                            ) : null}

                            {successMessage !== "" && (
                                <TouchableOpacity
                                    style={[styles.button, styles.primaryButton]}
                                    activeOpacity={0.85}
                                    onPress={handleSaveDistance}
                                >
                                    <View style={styles.primaryButtonContent}>
                                        {isSavingDistance ? (
                                            <LoadingSpinner size="small" />
                                        ) : (
                                            <Text style={styles.primaryButtonText}>
                                                {successMessage}
                                            </Text>
                                        )}
                                    </View>
                                </TouchableOpacity>
                            )}
                        </View>

                        <View style={styles.sectionGap}>
                            <Text style={styles.sectionTitle}>More info and support</Text>
                        </View>

                        <TouchableOpacity
                            style={styles.settingsRow}
                            activeOpacity={0.85}
                            onPress={() => router.push(routes.legal.tos)}
                        >
                            <Ionicons name="document-text-outline" size={22} color={theme.colors.primaryDark} />
                            <View style={styles.rowText}>
                                <Text style={styles.rowTitle}>Terms of Service</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color={theme.colors.primaryDark} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.settingsRow}
                            activeOpacity={0.85}
                            onPress={() => router.push(routes.legal.privacyPolicy)}
                        >
                            <Ionicons name="shield-checkmark-outline" size={22} color={theme.colors.primaryDark} />
                            <View style={styles.rowText}>
                                <Text style={styles.rowTitle}>Privacy Policy</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color={theme.colors.primaryDark} />
                        </TouchableOpacity>

                        <View style={styles.supportDetails}>
                            <Text style={styles.support}>For customer support please email:</Text>
                            <Text style={styles.supportEmail}>petpathsupport@gmail.com</Text>
                        </View>


                        <View style={styles.logoutWrapper}>
                            <AppButtonProps
                                title="Log Out"
                                onPress={() => setInfoModalVisible(true)}
                            />
                        </View>
                    </Card>

                    <Spacer height={40} />

                </View>
            </View>

            <InfoModal
                visible={infoModalVisible}
                title="Log out?"
                message="Are you sure you want to log out?"
                buttonText="Continue"
                buttonTextSecondary="Cancel"
                iconName="leaf-outline"
                onConfirm={handleLogout}
                onClose={() => setInfoModalVisible(false)}
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
    cardLayer: {
        position: "relative",
    },
    cardWrapper: {
        position: "relative",
        zIndex: 2,
        elevation: 2,
    },
    optionGap: {
        width: "100%",
        marginVertical: theme.spacing.md,
    },

    optionGapLine: {
        height: 1,
        width: "100%",
        backgroundColor: theme.colors.border,
    },

    optionGapText: {
        alignSelf: "flex-start",
        marginTop: 6,
        fontSize: 12,
        fontWeight: "700",
        color: theme.colors.text,
        textTransform: "uppercase",
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: "900",
        color: theme.colors.primaryDark,
        marginBottom: theme.spacing.lg,
    },

    accountSummary: {
        flexDirection: "row",
        alignItems: "center",
        padding: theme.spacing.md,
        borderRadius: 18,
        backgroundColor: theme.colors.paleGreen,
        marginBottom: theme.spacing.lg,
    },

    accountIcon: {
        width: 52,
        height: 52,
        borderRadius: 26,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.background,
        marginRight: theme.spacing.md,
    },

    accountText: {
        flex: 1,
    },

    accountName: {
        fontSize: 17,
        fontWeight: "900",
        color: theme.colors.primaryDark,
    },

    accountEmail: {
        marginTop: 2,
        fontSize: 13,
        color: theme.colors.text,
    },

    viewMore: {
        marginTop: 6,
        fontSize: 12,
        fontWeight: "800",
        color: theme.colors.primaryDark,
    },

    sectionGap: {
        marginTop: theme.spacing.sm,
        marginBottom: theme.spacing.sm,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        paddingTop: theme.spacing.sm,
    },

    sectionTitle: {
        fontSize: 12,
        fontWeight: "800",
        color: theme.colors.text,
        textTransform: "uppercase",
    },

    settingsRow: {
        minHeight: 64,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: theme.spacing.sm,
    },

    rowText: {
        flex: 1,
        marginLeft: theme.spacing.md,
    },

    rowTitle: {
        fontSize: 15,
        fontWeight: "900",
        color: theme.colors.primaryDark,
    },

    rowDescription: {
        marginTop: 3,
        fontSize: 12,
        lineHeight: 17,
        color: theme.colors.text,
    },

    distanceBox: {
        padding: theme.spacing.md,
        borderRadius: 18,
        backgroundColor: theme.colors.background,
        borderWidth: 1,
        borderColor: theme.colors.border,
        marginTop: theme.spacing.sm,
        marginBottom: theme.spacing.md,
    },

    distanceHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: theme.spacing.md,
    },

    sliderThumb: {
        position: "absolute",
        left: "52%",
        top: -6,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: theme.colors.primaryDark,
    },

    formError: {
        color: theme.colors.error,
        fontSize: 12,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 6,
    },

    button: {
        flex: 1,
        minHeight: 48,
        borderRadius: 24,
        alignItems: "center",
        justifyContent: "center",
    },

    primaryButton: {
        backgroundColor: theme.colors.paleGreen,
    },

    primaryButtonContent: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "center",
    },

    primaryButtonText: {
        color: theme.colors.primaryDark,
        fontSize: 15,
        fontWeight: "800",
    },

    supportDetails: {
        marginTop: 3,
        fontSize: 14,
        fontWeight: 900,
        lineHeight: 17,
        color: theme.colors.primaryDark,
    },

    support: {
        marginTop: 3,
        fontSize: 14,
        lineHeight: 17,
        color: theme.colors.text,
    },

    supportEmail: {
        marginTop: 3,
        fontSize: 14,
        fontWeight: 900,
        lineHeight: 17,
        color: theme.colors.primaryDark,
    },
    saveButton: {
        minHeight: 23,
        height: 20,
        fontSize: 12
    },

    logoutWrapper: {
        marginTop: theme.spacing.lg,
    },
});