import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Linking,
    Pressable,
    StyleProp,
    StyleSheet,
    Text,
    View,
    ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";

import { theme } from "../../constants/theme";

export type ApproximateLocation = {
    status: "granted";
    latitude: number;
    longitude: number;
    accuracy?: number | null;
    approximate: true;
};

type LocationPermissionButtonProps = {
    title?: string;
    grantedTitle?: string;
    deniedTitle?: string;
    iconName?: keyof typeof Ionicons.glyphMap;

    onPermissionGranted?: (location: ApproximateLocation) => void;
    onPermissionDenied?: () => void;

    containerStyle?: StyleProp<ViewStyle>;
};

function roundCoordinate(value: number, decimals = 2) {
    return Number(value.toFixed(decimals));
}

export default function LocationPermissionButton({
    title = "Allow location access",
    grantedTitle = "Location access allowed",
    deniedTitle = "Location access denied",
    iconName = "location-outline",
    onPermissionGranted,
    onPermissionDenied,
    containerStyle,
}: LocationPermissionButtonProps) {
    const [loading, setLoading] = useState(false);
    const [permissionState, setPermissionState] = useState<
        "idle" | "granted" | "denied"
    >("idle");

    async function handleRequestLocation() {
        try {
            setLoading(true);

            const permission = await Location.requestForegroundPermissionsAsync();

            if (!permission.granted) {
                setPermissionState("denied");
                onPermissionDenied?.();

                if (!permission.canAskAgain) {
                    Alert.alert(
                        "Location permission needed",
                        "Location access has been blocked. You can enable it again from your device settings.",
                        [
                            { text: "Cancel", style: "cancel" },
                            { text: "Open Settings", onPress: () => Linking.openSettings() },
                        ]
                    );
                } else {
                    Alert.alert(
                        "Location permission needed",
                        "PetPath needs your general location to show nearby rescue centres and pets."
                    );
                }

                return;
            }

            let currentLocation = await Location.getLastKnownPositionAsync();

            if (!currentLocation) {
                currentLocation = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.Low,
                });
            }

            const approximateLocation: ApproximateLocation = {
                status: "granted",
                latitude: roundCoordinate(currentLocation.coords.latitude, 2),
                longitude: roundCoordinate(currentLocation.coords.longitude, 2),
                accuracy: currentLocation.coords.accuracy,
                approximate: true,
            };

            setPermissionState("granted");
            onPermissionGranted?.(approximateLocation);
        } catch (error) {
            Alert.alert(
                "Location unavailable",
                "We could not get your location. Please make sure location services are enabled."
            );

            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const buttonText =
        permissionState === "granted"
            ? grantedTitle
            : permissionState === "denied"
                ? deniedTitle
                : title;

    return (
        <Pressable
            style={({ pressed }) => [
                styles.container,
                pressed && styles.containerPressed,
                permissionState === "granted" && styles.containerGranted,
                containerStyle,
            ]}
            onPress={handleRequestLocation}
            disabled={loading}
        >
            <View style={styles.iconCircle}>
                {loading ? (
                    <ActivityIndicator size="small" color={theme.colors.primaryDark} />
                ) : (
                    <Ionicons
                        name={permissionState === "granted" ? "checkmark" : iconName}
                        size={23}
                        color={theme.colors.primaryDark}
                    />
                )}
            </View>

            <Text style={styles.title}>{buttonText}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: "center",
        minWidth: 250,
        minHeight: 48,
        borderRadius: theme.radius.pill,
        backgroundColor: theme.colors.paleGreen,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 8,

        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        elevation: 6,
    },

    containerPressed: {
        opacity: 0.8,
        transform: [{ scale: 0.98 }],
    },

    containerGranted: {
        backgroundColor: theme.colors.paleGreen,
    },

    iconCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#D7F0A4",
        alignItems: "center",
        justifyContent: "center",
        marginRight: theme.spacing.md,
    },

    title: {
        flex: 1,
        fontSize: 14,
        fontWeight: "800",
        color: theme.colors.primaryDark,
    },
});