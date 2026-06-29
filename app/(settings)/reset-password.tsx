import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useLocalSearchParams, router } from "expo-router";
import { routes } from "../../src/constants/routes";
import { completePasswordReset, requestPasswordReset } from "../../src/services/auth/authService";

import Screen from "../../src/components/layout/Screen"
import DecorativeLeaf from "../../src/components/ui/DecorativeLeaf"
import Logo from "../../src/components/ui/Logo"
import Card from "../../src/components/ui/Card"
import BackButton from "../../src/components/ui/BackButton";
import { theme } from "../../src/constants/theme";
import Spacer from "../../src/components/layout/Spacer";
import AppTextInput from "../../src/components/ui/AppTextInput";
import AppButtonProps from "../../src/components/ui/AppButton";
import InfoModal from "../../src/components/ui/infoModal";

export default function ResetPasswordScreen() {

    const params = useLocalSearchParams<{ email?: string }>();

    const [email, setEmail] = useState(params.email ?? "");
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [codeSent, setCodeSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formError, setFormError] = useState("");

    const [infoModalVisible, setInfoModalVisible] = useState(false);


    async function handleSendCode() {
        if (!email?.trim()) {
            setFormError("Please enter your email address.");
            return;
        }

        try {
            setIsLoading(true);
            setFormError("");

            const result = await requestPasswordReset(email);

            if (
                result.nextStep.resetPasswordStep ===
                "CONFIRM_RESET_PASSWORD_WITH_CODE"
            ) {
                setCodeSent(true);
            }
        } catch (error: any) {
            setFormError(
                error?.message || "Unable to send the reset code."
            );
        } finally {
            setIsLoading(false);
        }
    }

    async function handleResetPassword() {
        if (!code.trim() || !newPassword || !confirmPassword) {
            setFormError("Please complete every field.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setFormError("Passwords do not match.");
            return;
        }

        try {
            setIsLoading(true);
            setFormError("");

            await completePasswordReset(email, code, newPassword);

            setInfoModalVisible(true)

        } catch (error: any) {
            if (error?.name === "CodeMismatchException") {
                setFormError("The reset code is incorrect.");
                return;
            }

            if (error?.name === "ExpiredCodeException") {
                setFormError("The reset code has expired.");
                return;
            }

            setFormError(
                error?.message || "Unable to reset your password."
            );
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Screen
            scrollable
            keyboardAware
            contentContainerStyle={styles.content}
        >
            <View style={styles.header}>
                <View style={styles.backButtonWrapper}>
                    <BackButton />
                </View>

                <Logo hasTagline />
            </View>

            <Spacer height={40} />

            <View style={styles.cardLayer}>

                <DecorativeLeaf
                    width={140}
                    height={140}
                    bottom={-140}
                    left={-45}
                    rotate={90}
                    opacity={1}
                    zIndex={0}
                />

                <DecorativeLeaf
                    width={140}
                    height={140}
                    bottom={-140}
                    right={-45}
                    rotate={-90}
                    flipX
                    opacity={1}
                    zIndex={0}
                />

                <View style={styles.cardWrapper}>
                    <Card>
                        <Text style={styles.heading}>
                            {codeSent && email
                                ? "Create a new password"
                                : "Forgot your password?"}
                        </Text>

                        <Text style={styles.subtitle}>
                            {codeSent
                                ? `Enter the code sent to ${email} and choose a new password.`
                                : "Enter your email address and we'll send you a password reset code."}
                        </Text>

                        <Spacer height={24} />

                        {!codeSent ? (
                            <>
                                <AppTextInput
                                    label="Email address"
                                    placeholder="Enter your email address"
                                    iconName="mail-outline"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    value={email}
                                    onChangeText={(value) => {
                                        setEmail(value);
                                        setFormError("");
                                    }}
                                />

                                {formError ? (
                                    <Text style={styles.formError}>
                                        {formError}
                                    </Text>
                                ) : null}

                                <Spacer height={10} />

                                <AppButtonProps
                                    title={isLoading ? "Sending..." : "Send reset code"}
                                    onPress={handleSendCode}
                                    disabled={isLoading}
                                />
                            </>
                        ) : (
                            <>
                                <AppTextInput
                                    label="Reset code"
                                    placeholder="Enter your reset code"
                                    iconName="key-outline"
                                    keyboardType="number-pad"
                                    value={code}
                                    onChangeText={(value) => {
                                        setCode(value);
                                        setFormError("");
                                    }}
                                />

                                <AppTextInput
                                    label="New password"
                                    placeholder="Enter your new password"
                                    iconName="lock-closed-outline"
                                    isPassword
                                    value={newPassword}
                                    onChangeText={(value) => {
                                        setNewPassword(value);
                                        setFormError("");
                                    }}
                                />

                                <AppTextInput
                                    label="Confirm password"
                                    placeholder="Confirm your new password"
                                    iconName="lock-closed-outline"
                                    isPassword
                                    value={confirmPassword}
                                    onChangeText={(value) => {
                                        setConfirmPassword(value);
                                        setFormError("");
                                    }}
                                />

                                {formError ? (
                                    <Text style={styles.formError}>
                                        {formError}
                                    </Text>
                                ) : null}

                                <Spacer height={10} />

                                <AppButtonProps
                                    title={isLoading ? "Resetting..." : "Reset password"}
                                    onPress={handleResetPassword}
                                    disabled={isLoading}
                                />

                                <Spacer height={14} />

                                <TouchableOpacity
                                    disabled={isLoading}
                                    onPress={handleSendCode}
                                >
                                    <Text style={styles.resendText}>
                                        Resend reset code
                                    </Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </Card>
                </View>
            </View>
            <InfoModal
                visible={infoModalVisible}
                title="Success!"
                message="You password has been successfully changed"
                buttonText="Continue"
                iconName="checkmark-circle-outline"
                onConfirm={() => {
                    router.replace(routes.settings.account)
                }}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    content: {
        paddingBottom: theme.spacing.lg,
    },
    header: {
        position: "relative",
        minHeight: 44,
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
    heading: {
        fontSize: 25,
        lineHeight: 34,
        fontWeight: "900",
        color: theme.colors.primaryDark,
        textAlign: "center",
    },
    subtitle: {
        marginTop: theme.spacing.sm,
        fontSize: 13,
        lineHeight: 19,
        color: theme.colors.text,
        textAlign: "center",
    },
    formError: {
        marginTop: theme.spacing.sm,
        color: theme.colors.error,
        fontSize: 12,
        fontWeight: "700",
        textAlign: "center",
    },
    resendText: {
        color: theme.colors.primaryDark,
        fontSize: 13,
        fontWeight: "700",
        textAlign: "center",
        textDecorationLine: "underline",
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