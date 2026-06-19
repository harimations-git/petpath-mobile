import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Screen from "../../src/components/layout/Screen"
import AppTextInput from "../../src/components/ui/AppTextInput"
import DecorativeLeaf from "../../src/components/ui/DecorativeLeaf"
import AppButton from "../../src/components/ui/AppButton"
import SocialButton from "../../src/components/ui/SocialButton"
import Logo from "../../src/components/ui/Logo"
import Card from "../../src/components/ui/Card"
import { theme } from "../../src/constants/theme";

import { router } from "expo-router";
import { routes } from "../../src/constants/routes";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    function handleLogin() {
        Alert.alert("Login unavailable", "This will be connected later.");
    }

    function handleCreateAccount() {
        router.push(routes.auth.createAccount)
    }

    function handleGoogleLogin() {
        Alert.alert("Google login unavailable", "This will be connected later.");
    }

    function handleForgetPassword() {
        Alert.alert("Forget Password unavailable", "This will be connected later.");
    }
    return (
        <Screen>
            <Logo hasTagline={true}/>

            <View style={styles.hero}>
                <View style={styles.heroText}>
                    <Text style={styles.title}>Welcome Back</Text>
                    <Text style={styles.subtitle}>
                        Log in to view your matches and continue finding the right pet for your lifestyle.
                    </Text>
                </View>

                <View style={styles.petCircle}>
                    <Ionicons name="paw" size={76} color={theme.colors.primary} />
                    <Text style={styles.subtitle}>
                        Placeholder
                    </Text>
                </View>
            </View>

            <Card>
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
                    placeholder="Enter your password"
                    iconName="lock-closed"
                    isPassword
                    value={password}
                    onChangeText={setPassword}
                />

                <View style={styles.optionsRow}>
                    <TouchableOpacity style={styles.rememberRow}
                        onPress={() => setRememberMe(!rememberMe)}
                        activeOpacity={0.8}
                    >
                        <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
                            {rememberMe && <Ionicons name="checkmark" size={15} color="#ffffff" />}
                        </View>
                        <Text style={styles.optionText}>Remember me?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text style={styles.forgotText} onPress={handleForgetPassword}>Forgot password?</Text>
                    </TouchableOpacity>
                </View>

                <AppButton title="Log in" width={300} onPress={handleLogin} />

                <SocialButton onPress={handleGoogleLogin} />

                <View style={styles.createRow}>
                    <Text style={styles.smallText}>Don't have an account?</Text>
                    <TouchableOpacity>
                        <Text style={styles.linkText} onPress={handleCreateAccount}>Create account</Text>
                    </TouchableOpacity>
                </View>
            </Card>
            <View style={styles.page}>
                <DecorativeLeaf
                    width={100}
                    height={100}
                    bottom={-40}
                    left={-25}
                    rotate={90}
                    opacity={1}
                    zIndex={-1}
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
            </View>
        </Screen>
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
    subtitle: {
        fontSize: 15,
        color: theme.colors.text,
        lineHeight: 22,
        width: "90%",
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
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: -4,
    },
    rememberRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    checkbox: {
        width: 23,
        height: 23,
        borderWidth: 2,
        borderColor: theme.colors.text,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
        marginRight: theme.spacing.sm,
    },
    checkboxActive: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
    },
    optionText: {
        fontSize: 12,
        color: theme.colors.text,
    },
    forgotText: {
        fontSize: 12,
        color: theme.colors.primary,
        textDecorationLine: "underline",
    },
    createRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: theme.spacing.lg,
        gap: 3
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
});