import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { routes } from "../../src/constants/routes";
import { router } from "expo-router";
import { saveLocationSettings } from "../../src/services/user/locationService";

import { theme } from "../../src/constants/theme";
import Screen from "../../src/components/layout/Screen"
import DecorativeLeaf from "../../src/components/ui/DecorativeLeaf"
import AppButton from "../../src/components/ui/AppButton"
import Logo from "../../src/components/ui/Logo"
import Card from "../../src/components/ui/Card"
import BackButton from "../../src/components/ui/BackButton";
import AuthProgressStepper from "../../src/components/ui/auth/AuthProgressStepper";
import InfoModal from "../../src/components/ui/infoModal";
import DistanceSlider from "../../src/components/ui/DistanceSlider";
import Spacer from "../../src/components/layout/Spacer";
import LocationPermissionButton from "../../src/components/ui/LocationPermissionButton";
import type { ApproximateLocation } from "../../src/components/ui/LocationPermissionButton";
import NoticeMessage from "../../src/components/ui/NoticeMessage";
import LoadingSpinner from "../../src/components/ui/LoadingSpinner";


type LocationAccess =
    | ApproximateLocation
    | {
        status: "denied" | "";
        approximate: true;
    };

export default function CreateAccountScreen() {

    const [locationAccess, setLocationAccess] = useState<LocationAccess>({
        status: "",
        approximate: true,
    });

    const [distance, setDistance] = useState(18);
    const [formError, setFormError] = useState("");
    const [infoModalVisible, setInfoModalVisible] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    async function handleContinue() {
        if (locationAccess.status !== "granted") {
            setFormError("Please allow location access before continuing.");
            return;
        }

        try {
            setIsLoading(true);
            setFormError("");

            await saveLocationSettings({
                latitude: locationAccess.latitude,
                longitude: locationAccess.longitude,
                searchDistance: distance,
            });

            setInfoModalVisible(true);
        } catch (error: any) {
            console.error("Location settings error:", error);
            setFormError(
                error?.message || "Unable to save your location settings."
            );
        } finally {
            setIsLoading(false);
        }
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
                        <AuthProgressStepper currentStep={4} />

                        <Spacer height={20} />

                        <View style={styles.hero}>
                            <View style={styles.heroText}>
                                <Text style={styles.heading}>Set your location</Text>
                                <Text style={styles.subtitle}>
                                    PetPath uses your general location to show you nearby rescue centres and pets that match your preferences.
                                </Text>
                            </View>
                        </View>

                        <Spacer height={30} />

                        <LocationPermissionButton
                            title="Allow location access"
                            grantedTitle="Location access allowed"
                            deniedTitle="Location access denied"
                            onPermissionGranted={(location) => {
                                setLocationAccess(location);
                                setFormError("");
                            }}
                            onPermissionDenied={() => {
                                setLocationAccess({
                                    status: "denied",
                                    approximate: true,
                                });
                            }}
                        />

                        <Spacer height={40} />

                        <View style={styles.hero}>
                            <View style={styles.heroText}>
                                <Text style={styles.heading}>Set your search area</Text>
                                <Text style={styles.subtitle}>
                                    This helps us show you pets for adoption near you.
                                </Text>

                            </View>
                        </View>

                        <DistanceSlider
                            value={distance}
                            onChange={setDistance}
                            min={5}
                            max={100}
                            step={1}
                            unit="miles"
                            labels={["5 miles", "25 miles", "100 miles"]}
                            caption={(value) => `Within ${value} miles`}
                        />

                        <Spacer height={10} />

                        <NoticeMessage
                            message="For privacy, PetPath only stores your approximate location. Your exact address is never saved." />

                        <Spacer height={10} />

                        {formError ? (
                            <Text style={styles.formError}>{formError}</Text>
                        ) : null}

                        {isLoading ? (
                            <LoadingSpinner size="small" />
                        ) : (
                            <>
                                <AppButton title="Continue" onPress={handleContinue} disabled={isLoading} />
                            </>
                        )}
                    </Card>
                </View>
            </View>
            <InfoModal
                visible={infoModalVisible}
                title="Setup complete"
                message="Your preferences have been saved. You can update them anytime in Settings."
                buttonText="Start exploring"
                iconName="leaf-outline"
                onClose={() => {
                    setInfoModalVisible(false);
                    router.replace(routes.tabs.home);
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
    background: {
        backgroundColor: "#e9f3e8"
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
    heading: {
        fontSize: 25,
        lineHeight: 34,
        fontWeight: "900",
        color: theme.colors.primaryDark,
        textAlign: "center"
    },
    subtitle: {
        fontSize: 12.9,
        lineHeight: 19,
        color: theme.colors.text,
        textAlign: "center"
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
    },
    cardWrapper: {
        position: "relative",
        zIndex: 2,
        elevation: 2,
    },

});