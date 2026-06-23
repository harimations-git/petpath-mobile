import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchAuthSession } from "aws-amplify/auth";

const API_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

type PendingPreference = {
    email: string;
    savedPetStatusEmailsEnabled: boolean;
};

export async function savePendingNotificationPreference(
    signedInEmail: string
) {
    const storedValue = await AsyncStorage.getItem(
        "pendingNotificationPreference"
    );

    if (!storedValue) return;

    let preference: PendingPreference;

    try {
        preference = JSON.parse(storedValue);
    } catch {
        await AsyncStorage.removeItem(
            "pendingNotificationPreference"
        );
        return;
    }

    if (
        preference.email !== signedInEmail.trim().toLowerCase() ||
        typeof preference.savedPetStatusEmailsEnabled !== "boolean"
    ) {
        return;
    }

    const session = await fetchAuthSession();
    const accessToken = session.tokens?.accessToken?.toString();

    if (!accessToken) {
        throw new Error("No authenticated session.");
    }

    const response = await fetch(
        `${API_URL}/users/me/notification-preference`,
        {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                savedPetStatusEmailsEnabled:
                    preference.savedPetStatusEmailsEnabled,
            }),
        }
    );

    const responseText = await response.text();

    console.log(
        "Notification preference response:",
        response.status,
        responseText
    );

    let body: { message?: string } = {};

    try {
        body = JSON.parse(responseText);
    } catch {
        // Response was not JSON.
    }

    if (!response.ok) {
        throw new Error(
            body.message ||
            `Unable to save notification preferences (${response.status}).`
        );
    }

    if (!response.ok) {
        throw new Error(
            body.message || "Unable to save notification preferences."
        );
    }

    await AsyncStorage.removeItem(
        "pendingNotificationPreference"
    );
}