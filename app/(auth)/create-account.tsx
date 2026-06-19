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

export default function CreateAccountScreen() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [notifySavedPets, setNotifySavedPets] = useState(false);

    function handleCreateAccount() {
        if (!acceptedTerms) {
            Alert.alert(
                "Terms required",
                "You need to accept PetPath’s Terms of Service and Privacy Policy before creating an account."
            );
            return;
        }
        router.push(routes.auth.verifyEmail)
    }

    function handleTermsOfService() {
        router.push(routes.legal.tos)
    }

    function handlePrivacyPolicy() {
        router.push(routes.legal.privacyPolicy)
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
                    <Text style={styles.title}>Create your account</Text>
                    <Text style={styles.subtitle}>
                        Join PetPath to get personalised recommendations and find pets that
                        suit your lifestyle.
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
                        <AuthProgressStepper currentStep={1} />

                        <AppTextInput
                            label="Full Name"
                            placeholder="Enter your full name"
                            iconName="person"
                            value={fullName}
                            onChangeText={setFullName}
                            autoCapitalize="words"
                        />

                        <AppTextInput
                            label="Email address"
                            placeholder="Enter your email address"
                            iconName="mail"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                        />

                        <AppTextInput
                            label="Password"
                            placeholder="Create a password"
                            iconName="lock-closed"
                            isPassword
                            value={password}
                            onChangeText={setPassword}
                        />

                        <AppTextInput
                            label="Confirm password"
                            placeholder="Re-enter your password"
                            iconName="lock-closed"
                            isPassword
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />

                        <TouchableOpacity
                            style={styles.checkboxRow}
                            activeOpacity={0.8}
                            onPress={() => setAcceptedTerms(!acceptedTerms)}
                        >
                            <View style={[styles.checkbox, acceptedTerms && styles.checkboxActive]}>
                                {acceptedTerms && (
                                    <Ionicons name="checkmark" size={15} color="#FFFFFF" />
                                )}
                            </View>

                            <Text style={styles.checkboxText}>
                                I agree to PetPath’s{" "}
                                <Text style={styles.linkText} onPress={handleTermsOfService}>Terms of Service</Text> and{" "}
                                <Text style={styles.linkText} onPress={handlePrivacyPolicy}>Privacy Policy</Text>
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.checkboxRow}
                            activeOpacity={0.8}
                            onPress={() => setNotifySavedPets(!notifySavedPets)}
                        >
                            <View style={[styles.checkbox, notifySavedPets && styles.checkboxActive]}>
                                {notifySavedPets && (
                                    <Ionicons name="checkmark" size={15} color="#FFFFFF" />
                                )}
                            </View>

                            <Text style={styles.checkboxText}>
                                I would like to receive email updates if a pet I have saved becomes
                                reserved, rehomed or unavailable.
                            </Text>
                        </TouchableOpacity>

                        <AppButton title="Create account" onPress={handleCreateAccount} />

                        <View style={styles.loginRow}>
                            <Text style={styles.smallText}>Already have an account? </Text>
                            <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                                <Text style={styles.loginText}>Log in</Text>
                            </TouchableOpacity>
                        </View>
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
    checkboxRow: {
        flexDirection: "row",
        alignItems: "flex-start",
    },
    checkbox: {
        width: 23,
        height: 23,
        borderWidth: 2,
        borderColor: theme.colors.muted,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
        marginRight: theme.spacing.sm,
        marginTop: 1,
    },
    checkboxActive: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
    },
    checkboxText: {
        flex: 1,
        fontSize: 12,
        lineHeight: 17,
        color: theme.colors.text,
        marginBottom:theme.spacing.sm,
    },
    linkText: {
        color: theme.colors.primaryDark,
        fontWeight: "700",
        textDecorationLine: "underline",
    },
    loginRow: {
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
    },

    cardWrapper: {
        position: "relative",
        zIndex: 2,
        elevation: 2,
    },

});