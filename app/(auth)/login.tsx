import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import Screen from "../../src/components/layout/Screen"
import AppTextInput from "../../src/components/ui/AppTextInput"
import DecorativeLeaf from "../../src/components/ui/DecorativeLeaf"
import AppButton from "../../src/components/ui/AppButton"
import Logo from "../../src/components/ui/Logo"
import Card from "../../src/components/ui/Card"
import NoticeMessage from "../../src/components/ui/NoticeMessage";
import Spacer from "../../src/components/layout/Spacer";
import LoadingSpinner from "../../src/components/ui/LoadingSpinner";
import { theme } from "../../src/constants/theme";
import PetHeroImage from "../../src/components/ui/PetHeroImage";

import { router, useLocalSearchParams } from "expo-router";
import { routes } from "../../src/constants/routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser } from "../../src/services/auth/authService";
import { redirectAfterLogin } from "../../src/utils/navigation/redirectAfterLogin";
import { getCurrentUser, signOut } from "aws-amplify/auth";


export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loginLoading, setLoginLoading] = useState(false);
    const [loginError, setLoginError] = useState("");

    type LoginNotice = "accountCreated" | "passwordReset" | null;

    const { accountCreated, passwordReset } = useLocalSearchParams<{
        accountCreated?: string;
        passwordReset?: string;
    }>();

    const [loginNotice, setLoginNotice] = useState<LoginNotice>(() => {
        if (passwordReset === "true") return "passwordReset";
        if (accountCreated === "true") return "accountCreated";
        return null;
    });

    async function handleLogin() {
        if (loginLoading) return;

        if (!email.trim() || !password.trim()) {
            setLoginError("Please enter your email address and password.");
            return;
        }

        const normalisedEmail = email.trim().toLowerCase();

        try {
            setLoginLoading(true);
            setLoginError("");

            const pendingEmail = await AsyncStorage.getItem(
                "pendingVerificationEmail"
            );

            if (pendingEmail === normalisedEmail) {
                router.replace({
                    pathname: routes.auth.verifyEmail,
                    params: { email: normalisedEmail },
                });
                return;
            }

            try {
                await getCurrentUser();
                await signOut();
            } catch {
                // No existing session.
            }

            const result = await loginUser(normalisedEmail, password);

            if (result.isSignedIn) {
                await redirectAfterLogin();
                return;
            }


            if (result.nextStep?.signInStep === "CONFIRM_SIGN_UP") {
                await AsyncStorage.setItem(
                    "pendingVerificationEmail",
                    normalisedEmail
                );

                router.replace({
                    pathname: routes.auth.verifyEmail,
                    params: { email: normalisedEmail },
                });
                return;
            }

            setLoginError("Your account needs another step before you can log in.");
        } catch (error: any) {
            console.log("Login error name:", error?.name);

            if (error?.name === "UserNotConfirmedException") {
                await AsyncStorage.setItem(
                    "pendingVerificationEmail",
                    normalisedEmail
                );

                router.replace({
                    pathname: routes.auth.verifyEmail,
                    params: { email: normalisedEmail },
                });
                return;
            }
            if (
                error?.name === "NotAuthorizedException" ||
                error?.name === "UserNotFoundException"
            ) {
                setLoginError("Invalid email or password.");
                return;
            }
            setLoginError(error?.message || "Login failed. Please try again.");
        } finally {
            setLoginLoading(false);
        }
    }

    function handleCreateNewAccount() {
        router.push(routes.auth.accountType)
    }

    function handleForgetPassword() {
        if (loginLoading) return;

        router.push({
            pathname: routes.auth.forgotPassword,
            params: {
                email: email.trim().toLowerCase(),
            },
        });
    }

    return (
        <Screen scrollable>
            <Logo hasTagline={true} />

            <View style={styles.hero}>
                <View style={styles.heroText}>
                    <Text style={styles.title}>Welcome Back</Text>
                    <Text style={styles.subtitle}>
                        Continue discovering adoptable pets matched to your home, lifestyle and experience.
                    </Text>
                </View>

                <PetHeroImage width={200} height={200} top={-30} right={-40} />
            </View>



            <View style={styles.cardLayer}>

                <DecorativeLeaf
                    width={100}
                    height={100}
                    bottom={-90}
                    left={-25}
                    rotate={90}
                    opacity={1}
                    zIndex={-1}
                />

                <DecorativeLeaf
                    width={100}
                    height={100}
                    bottom={-90}
                    right={-25}
                    rotate={-90}
                    flipX
                    opacity={1}
                    zIndex={-1}
                />
                <View style={styles.cardWrapper}>
                    <Card>
                        <View style={styles.formHeader}>
                            <View style={styles.formIcon}>
                                <Ionicons
                                    name="lock-open-outline"
                                    size={20}
                                    color={theme.colors.primaryDark}
                                />
                            </View>

                            <View style={styles.formHeaderText}>
                                <Text style={styles.formTitle}>
                                    Log in to your account
                                </Text>
                                <Text style={styles.formSubtitle}>
                                    Enter your details below to continue.
                                </Text>
                            </View>
                        </View>

                        <Spacer height={20} />
                        {loginNotice && (
                            <>
                                <NoticeMessage
                                    iconName="key"
                                    message={
                                        loginNotice === "accountCreated"
                                            ? "Account created successfully! Log in to continue your PetPath journey."
                                            : "Password reset successfully! Log in using your new password."
                                    }
                                />
                                <Spacer height={20} />
                            </>
                        )}

                        <AppTextInput
                            label="Email address"
                            placeholder="Enter your email address"
                            iconName="mail"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text);
                                setLoginError("");
                                setLoginNotice(null);
                            }}
                        />

                        <AppTextInput
                            label="Password"
                            placeholder="Enter your password"
                            iconName="lock-closed"
                            isPassword
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text);
                                setLoginError("");
                                setLoginNotice(null);
                            }}
                        />

                        {loginError ? (
                            <View style={styles.errorContainer}>
                                <Ionicons
                                    name="alert-circle-outline"
                                    size={16}
                                    color={theme.colors.error}
                                />
                                <Text style={styles.loginError}>
                                    {loginError}
                                </Text>
                            </View>
                        ) : null}

                        <View style={styles.passwordActions}>
                            <TouchableOpacity
                                onPress={handleForgetPassword}
                                disabled={loginLoading}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.forgotText}>
                                    Forgot your password?
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <Spacer height={10} />

                        {loginLoading ? (
                            <LoadingSpinner size="small" />
                        ) : (
                            <>
                                <AppButton
                                    title="Log in"
                                    width={300}
                                    onPress={handleLogin}
                                />

                                <View style={styles.dividerRow}>
                                    <View style={styles.dividerLine} />
                                    <Text style={styles.dividerText}>
                                        New to PetPath?
                                    </Text>
                                    <View style={styles.dividerLine} />
                                </View>

                                <TouchableOpacity
                                    style={styles.createButton}
                                    onPress={handleCreateNewAccount}
                                    activeOpacity={0.75}
                                >
                                    <Ionicons
                                        name="person-add-outline"
                                        size={18}
                                        color={theme.colors.primaryDark}
                                    />
                                    <Text style={styles.createButtonText}>
                                        Create an account
                                    </Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </Card>
                </View>
            </View>
        </Screen >
    );
}

const styles = StyleSheet.create({
    header: {
        alignItems: "center",
        paddingTop: theme.spacing.md,
        marginBottom: theme.spacing.lg,
    },
    page: {
        flex: 1,
        position: "relative",
    },
    logoRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    logoText: {
        fontSize: 36,
        fontWeight: "900",
        color: theme.colors.primaryDark,
        marginLeft: theme.spacing.sm,
    },
    tagline: {
        color: theme.colors.primary,
        fontSize: 13,
        marginTop: -2,
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
    formCard: {
        backgroundColor: "rgba(255,255,255,0.88)",
        borderRadius: theme.radius.lg,
        paddingVertical: theme.spacing.lg,
    },
    optionsRow: {
        alignItems: "center",
        marginTop: 20,
    },
    rememberRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    optionText: {
        fontSize: 12,
        alignSelf: "center",
        color: theme.colors.text,
    },
    smallText: {
        fontSize: 12,
        color: theme.colors.text,
    },
    linkText: {
        fontSize: 12,
        color: theme.colors.primary,
        fontWeight: "700",
        textDecorationLine: "underline",
    },
    forgotButton: {
        alignSelf: "flex-end",
        paddingVertical: 6,
        paddingLeft: 12,
    },

    dividerRow: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 22,
    },

    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: "#DCE5DB",
    },

    dividerText: {
        marginHorizontal: 12,
        fontSize: 12,
        color: theme.colors.text,
    },

    createButton: {
        minHeight: 48,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        borderWidth: 1.5,
        borderColor: theme.colors.primaryDark,
        borderRadius: 8,
        backgroundColor: "#FFFFFF",
    },

    createButtonText: {
        fontSize: 15,
        fontWeight: "800",
        color: theme.colors.primaryDark,
    },

    errorContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        marginTop: 8,
        paddingHorizontal: 8,
    },

    loginError: {
        flexShrink: 1,
        color: theme.colors.error,
        fontSize: 12,
        lineHeight: 17,
        fontWeight: "700",
        textAlign: "center",
    },

    passwordActions: {
        alignItems: "center",
        marginTop: 14,
    },

    forgotText: {
        color: theme.colors.primaryDark,
        fontSize: 12,
        fontWeight: "700",
        textDecorationLine: "underline",
    },

    formHeader: {
        flexDirection: "row",
        alignItems: "center",
    },

    formIcon: {
        width: 42,
        height: 42,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.paleGreen,
        marginLeft: 25,
    },

    formHeaderText: {
        flex: 1,
        marginLeft: 20,
    },

    formTitle: {
        fontSize: 17,
        lineHeight: 22,
        fontWeight: "800",
        color: theme.colors.primaryDark,
    },

    formSubtitle: {
        marginTop: 2,
        fontSize: 12,
        lineHeight: 17,
        color: theme.colors.text,
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