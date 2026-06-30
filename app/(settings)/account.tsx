import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { router, } from "expo-router";
import { routes } from "../../src/constants/routes";
import { deleteCurrentUserAccount, getCurrentUserProfile } from "../../src/services/user/userService";
import { useLocalSearchParams } from "expo-router";

import {
    getNotificationPreferences,
    updateNotificationPreferences,
} from "../../src/services/user/notificationPreferenceService";

import Screen from "../../src/components/layout/Screen"
import DecorativeLeaf from "../../src/components/ui/DecorativeLeaf"
import Logo from "../../src/components/ui/Logo"
import { theme } from "../../src/constants/theme";
import Card from "../../src/components/ui/Card";
import Spacer from "../../src/components/layout/Spacer";

import { Ionicons } from "@expo/vector-icons";
import BackButton from "../../src/components/ui/BackButton";
import InfoModal from "../../src/components/ui/infoModal";
import LoadingSpinner from "../../src/components/ui/LoadingSpinner";

export default function AccountSettings() {

    const { fullName, email } = useLocalSearchParams<{
        fullName?: string;
        email?: string;
    }>();

    const [emailUpdates, setEmailUpdates] = useState(false);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

    const [isLoadingProfile, setIsLoadingProfile] = useState(true);
    const [isLoadingNotifications, setIsLoadingNotifications] = useState(true);
    const [isSavingNotifications, setIsSavingNotifications] = useState(false);
    const [isDeletingAccount, setIsDeletingAccount] = useState(false);
    const [infoModalVisible, setInfoModalVisible] = useState(false);

    const [notificationError, setNotificationError] = useState("");

    type UserProfile = {
        fullName?: string;
        email?: string;
    };

    useEffect(() => {
        let isMounted = true;

        async function loadSettingsData() {
            try {
                setIsLoadingProfile(true);
                loadNotificationPreferences();

                const [profileResult] =
                    await Promise.allSettled([
                        getCurrentUserProfile(),
                    ]);

                if (!isMounted) return;

                if (profileResult.status === "fulfilled") {
                    setUserProfile(profileResult.value);
                } else {
                    console.log(
                        "Could not load current user profile:",
                        profileResult.reason
                    );
                }


            } finally {
                if (isMounted) {
                    setIsLoadingProfile(false);
                }
            }
        }

        loadSettingsData();

        return () => {
            isMounted = false;
        };
    }, []);

    async function loadNotificationPreferences() {
        try {
            setIsLoadingNotifications(true);
            setNotificationError("");

            const preferences = await getNotificationPreferences();

            setEmailUpdates(
                preferences.savedPetStatusEmailsEnabled === true
            );
        } catch (error) {
            console.error("Notification preference load error:", error);
            setNotificationError("Unable to load notification preferences.");
        } finally {
            setIsLoadingNotifications(false);
        }
    }

    async function handleEmailUpdatesToggle() {
        if (isSavingNotifications) return;

        const nextValue = !emailUpdates;

        try {
            setEmailUpdates(nextValue);
            setIsSavingNotifications(true);
            setNotificationError("");

            await updateNotificationPreferences(nextValue);
        } catch (error: any) {
            console.error("Notification preference save error:", error);

            setEmailUpdates(!nextValue);

            setNotificationError(
                error?.message || "Unable to update notification preferences."
            );
        } finally {
            setIsSavingNotifications(false);
        }
    }

    async function handleDeleteAccount() {
        if (isDeletingAccount) return;

        try {
            setIsDeletingAccount(true);

            await deleteCurrentUserAccount();

            setInfoModalVisible(false);
            router.replace({
                pathname: routes.auth.login,
                params: {
                    deletedAccount: "true",
                },
            });
        } catch (error) {
            console.error("Delete account error:", error);

            Alert.alert("Unable to delete account");
        } finally {
            setIsDeletingAccount(false);
        }
    }

    return (
        <Screen scrollable>
            <View style={styles.header}>
                <View style={styles.backButtonWrapper}>
                    <BackButton customRoute={routes.tabs.settings} />
                </View>

                <Logo hasTagline={true} />
            </View>

            <Spacer height={20} />

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
                    width={140}
                    height={140}
                    top={-110}
                    right={-65}
                    rotate={-150}
                    flipX
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
                    {isLoadingNotifications || isLoadingProfile ? (
                        <>
                            <Spacer height={240} />
                            <LoadingSpinner size="large" />
                        </>
                    ) : (
                        <>
                            <Card>
                                <View style={styles.heroText}>
                                    <Text style={styles.title}>Account settings:</Text>
                                    <Text style={styles.subtitle}>
                                        Manage your account details.
                                    </Text>
                                </View>
                                <Spacer height={20} />
                                <View style={styles.accountHeaderBox}>
                                    <View style={styles.accountIcon}>
                                        <Ionicons
                                            name="person-outline"
                                            size={26}
                                            color={theme.colors.primaryDark}
                                        />
                                    </View>

                                    <View style={styles.accountText}>
                                        <Text style={styles.accountLabel}>Email address</Text>
                                        <Text style={styles.accountEmail}>
                                            {userProfile?.email || "No email found"}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.sectionGap}>
                                    <Text style={styles.sectionTitle}>Security</Text>
                                </View>

                                <TouchableOpacity
                                    style={styles.settingsRow}
                                    activeOpacity={0.85}
                                    onPress={() => {
                                        router.push({
                                            pathname: routes.settings.resetPassword,
                                            params: {
                                                email: userProfile?.email || "",
                                            },
                                        });
                                    }}
                                >
                                    <Ionicons
                                        name="key-outline"
                                        size={22}
                                        color={theme.colors.primaryDark}
                                    />

                                    <View style={styles.rowText}>
                                        <Text style={styles.rowTitle}>Reset password</Text>
                                        <Text style={styles.rowDescription}>
                                            Send a password reset link to your email.
                                        </Text>
                                    </View>

                                    <Ionicons
                                        name="chevron-forward"
                                        size={20}
                                        color={theme.colors.primaryDark}
                                    />
                                </TouchableOpacity>

                                < View style={styles.sectionGap}>
                                    <Text style={styles.sectionTitle}>Email preferences</Text>
                                </View>

                                <TouchableOpacity
                                    style={styles.checkboxRow}
                                    activeOpacity={0.85}
                                    disabled={isLoadingNotifications || isSavingNotifications}
                                    onPress={handleEmailUpdatesToggle}
                                >
                                    <View
                                        style={[
                                            styles.checkbox,
                                            emailUpdates && styles.checkboxActive,
                                        ]}
                                    >
                                        {emailUpdates && (
                                            <Ionicons
                                                name="checkmark"
                                                size={16}
                                                color="#FFFFFF"
                                            />
                                        )}
                                    </View>

                                    <View style={styles.rowText}>
                                        <Text style={styles.rowTitle}>
                                            Receive pet updates
                                        </Text>
                                        <Text style={styles.rowDescription}>
                                            Receive emails when pets you are interested in are reserved.
                                        </Text>

                                        {notificationError ? (
                                            <Text style={styles.formError}>{notificationError}</Text>
                                        ) : null}

                                    </View>
                                </TouchableOpacity>

                                <View style={styles.sectionGap}>
                                    <Text style={styles.sectionTitle}>Account removal</Text>
                                </View>

                                <View style={styles.dangerBox}>
                                    <View style={styles.dangerTextWrapper}>
                                        <Text style={styles.dangerTitle}>
                                            Delete account
                                        </Text>
                                        <Text style={styles.dangerDescription}>
                                            Permanently remove your account and saved PetPath data.
                                        </Text>
                                    </View>

                                    <TouchableOpacity
                                        style={styles.deleteButton}
                                        activeOpacity={0.85}
                                        onPress={() => {
                                            setInfoModalVisible(true)
                                        }}
                                    >
                                        <Text style={styles.deleteButtonText}>
                                            Delete account
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </Card>
                        </>
                    )}
                </View >
            </View >
            <InfoModal
                visible={infoModalVisible}
                title="Warning!"
                message="If you delete your account it cannot be recovered"
                buttonText="Delete"
                buttonTextSecondary="Cancel"
                iconName="warning"
                onConfirm={(
                    handleDeleteAccount
                )}
                onClose={() => {
                    setInfoModalVisible(false);
                }}
                primaryButtonStyle={{
                    backgroundColor: theme.colors.error,
                }}
            />
        </Screen >
    );

}

const styles = StyleSheet.create({
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
    subtitle: {
        fontSize: 14,
        lineHeight: 19,
        color: theme.colors.text,
    },

    accountHeaderBox: {
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

    accountLabel: {
        fontSize: 12,
        fontWeight: "800",
        color: theme.colors.text,
        textTransform: "uppercase",
        marginBottom: 3,
    },

    accountEmail: {
        fontSize: 15,
        fontWeight: "900",
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
    formError: {
        marginTop: theme.spacing.sm,
        color: theme.colors.error,
        fontSize: 12,
        fontWeight: "700",
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

    checkboxRow: {
        minHeight: 70,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: theme.spacing.sm,
    },

    checkbox: {
        width: 26,
        height: 26,
        borderRadius: 13,
        borderWidth: 2,
        borderColor: theme.colors.primaryDark,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.card,
    },

    checkboxActive: {
        backgroundColor: theme.colors.primaryDark,
    },

    dangerBox: {
        padding: theme.spacing.md,
        borderRadius: 18,
        backgroundColor: "#FFF1F1",
        borderWidth: 1,
        borderColor: "#F3B5B5",
        marginTop: theme.spacing.sm,
    },

    dangerTextWrapper: {
        marginBottom: theme.spacing.md,
    },

    dangerTitle: {
        fontSize: 15,
        fontWeight: "900",
        color: theme.colors.error,
    },

    dangerDescription: {
        marginTop: 4,
        fontSize: 12,
        lineHeight: 17,
        color: theme.colors.text,
    },

    deleteButton: {
        minHeight: 46,
        borderRadius: 23,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.error,
    },

    deleteButtonText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "900",
    },
})
