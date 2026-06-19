import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, Alert } from "react-native";


import { routes } from "../../src/constants/routes";
import { router } from "expo-router";

import Screen from "../../src/components/layout/Screen"
import DecorativeLeaf from "../../src/components/ui/DecorativeLeaf"
import AppButton from "../../src/components/ui/AppButton"
import Logo from "../../src/components/ui/Logo"
import Card from "../../src/components/ui/Card"
import BackButton from "../../src/components/ui/BackButton";
import AuthProgressStepper from "../../src/components/ui/auth/AuthProgressStepper";
import VerificationCodeInput from "../../src/components/ui/auth/VerificationCodeInput";
import { theme } from "../../src/constants/theme";

export default function CreateAccountScreen() {
    const [verificationCode, setVerificationCode] = useState("");

    function handleEmailVerification() {
        router.push(routes.onboarding.lifestyle)
    }

    function handleResendCode() {
        Alert.alert("Code resend unavailable", "This will be connected later.");
    }

    return (
        <Screen
            scrollOnlyWhenKeyboardOpen
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

                <View style={styles.cardWrapper}>
                    <Card>

                        <AuthProgressStepper currentStep={2} />

                        <View style={styles.hero}>
                            <View style={styles.heroText}>
                                <Text style={styles.title}>Verify your email</Text>
                                <Text style={styles.subtitle}>
                                    We’ve sent you a 6-digit verification code{"\n"}to
                                    <Text style={styles.boldText}> harry@example.com</Text>{"\n"} {/* Will get the user's entered email */}
                                    Please enter the code below.
                                </Text>
                            </View>
                        </View>

                        <View style={styles.imageWrapper}>
                            <Image
                                source={require("../../assets/images/EmailVerification.png")}
                                style={styles.emailImage}
                                resizeMode="contain"
                            />
                        </View>

                        <View style={styles.codePromptSection}>
                            <Text style={styles.codePromptTitle}>
                                Enter the 6-digit code:
                            </Text>
                        </View>

                        <VerificationCodeInput
                            length={6}
                            value={verificationCode}
                            onChangeText={setVerificationCode}
                        />


                        <AppButton title="Verify Email" onPress={handleEmailVerification} />

                        <View style={styles.helperRow}>
                            <Text style={styles.smallText}>Didn't receive an email? </Text>
                            <TouchableOpacity onPress={handleResendCode}>
                                <Text style={styles.loginText}>Resend code</Text>
                            </TouchableOpacity>
                        </View>
                    </Card>
                </View>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    verificationContent: {
        paddingBottom: 40,
    },
    header: {
        position: "relative",
        minHeight: 52,
        justifyContent: "center",
        alignItems: "center",
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
        justifyContent: "center",
    },

    heroText: {
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 0,
    },
    boldText: {
        fontWeight: "700",
        color: theme.colors.primaryDark,
    },

    title: {
        fontSize: 28,
        lineHeight: 34,
        fontWeight: "900",
        color: theme.colors.primaryDark,
        textAlign: "center",
    },

    subtitle: {
        fontSize: 14,
        lineHeight: 19,
        color: theme.colors.text,
        textAlign: "center",
    },
    imageWrapper: {
        alignItems: "center",
        justifyContent: "center",
    },
    emailImage: {
        width: 260,
        height: 200,
    },
    codePromptSection: {
        width: "100%",
        alignItems: "flex-start",
    },
    codePromptTitle: {
        fontSize: 18,
        lineHeight: 24,
        fontWeight: "500",
        color: theme.colors.primaryDark,
        textAlign: "left",
    },
    helperRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: theme.spacing.sm,
    },
    smallText: {
        fontSize: 12,
        color: theme.colors.text,
    },
    loginText: {
        fontSize: 12,
        color: theme.colors.primaryDark,
        fontWeight: "700",
        textDecorationLine: "underline",
    },
    page: {
        flex: 1,
        position: "relative",
    },
    cardLayer: {
        position: "relative",
        overflow: "visible",
        marginBottom: theme.spacing.sm,
    },

    cardWrapper: {
        position: "relative",
        zIndex: 2,
        elevation: 2,
    },

});