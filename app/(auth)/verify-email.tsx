import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, Alert } from "react-native";


import { routes } from "../../src/constants/routes";
import { useLocalSearchParams, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { verifyEmail, resendVerificationCode } from "../../src/services/auth/authService";

import Screen from "../../src/components/layout/Screen"
import AppButton from "../../src/components/ui/AppButton"
import Logo from "../../src/components/ui/Logo"
import Card from "../../src/components/ui/Card"
import BackButton from "../../src/components/ui/BackButton";
import AuthProgressStepper from "../../src/components/ui/auth/AuthProgressStepper";
import VerificationCodeInput from "../../src/components/ui/auth/VerificationCodeInput";
import { theme } from "../../src/constants/theme";
import LoadingSpinner from "../../src/components/ui/LoadingSpinner";

export default function VerifyEmailScreen() {
    const [verificationCode, setVerificationCode] = useState("");
    const { email } = useLocalSearchParams<{ email: string }>();

    const [formError, setFormError] = useState("");
    const [loginLoading, setLoginLoading] = useState(false);

    async function handleVerifyEmail() {
        if (loginLoading) return;
        try {
            setLoginLoading(true)
            const result = await verifyEmail(email, verificationCode);

            if (result.isSignUpComplete) {
                await AsyncStorage.removeItem("pendingVerificationEmail");

                router.replace({
                    pathname: routes.onboarding.lifestyle,
                    params: { accountCreated: "true" },
                });
            }
        } catch (error) {
            setFormError("The verification code is incorrect or has expired.");
        } finally{
            setLoginLoading(false);
        }
    }

    async function handleResendCode() {
        try {
            await resendVerificationCode(email);
            Alert.alert("Code sent", "A new verification code has been emailed to you.");
        } catch {
            setFormError("We couldn't resend the code. Please try again.");
        }
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

                        {loginLoading ? (
                            <LoadingSpinner size="small" />
                        ) : (
                            <>
                                <AppButton title="Verify Email" onPress={handleVerifyEmail} />

                                <View style={styles.helperContainer}>
                                    <Text style={styles.smallText}>
                                        Didn't receive an email?
                                    </Text>
                                    <View style={styles.helperRow}>
                                        <Text style={styles.smallText}>Check your spam or </Text>

                                        <TouchableOpacity onPress={handleResendCode}>
                                            <Text style={styles.loginText}>resend the code</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </>
                        )}

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
    helperContainer: {
        marginTop: theme.spacing.sm,
        alignItems: "center",
        gap: 1,
    },
    helperRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
    },
    smallText: {
        fontSize: 12,
        color: theme.colors.text,
        textAlign: "center",
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