import { fetchAuthSession, signOut } from "aws-amplify/auth";

const API_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export type UserProfile = {
    userId: string;
    email: string;
    fullName: string;
    onboardingComplete: boolean;
    onboardingVersion: number;
    completedSteps: string[],
    currentStep: string;
}

export async function getCurrentUserProfile() {

    if (!API_URL) {
        throw new Error("EXPO_PUBLIC_API_BASE_URL is not configured");
    }

    const session = await fetchAuthSession();
    const accessToken = session.tokens?.accessToken?.toString();

    if (!accessToken) {
        throw new Error("No authenticated session found");
    }

    const url = `${API_URL.replace(/\/$/, "")}/users/me`;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
        },
    });

    const body = await response.text();

    if (!response.ok) {
        throw new Error(`Profile request failed: ${response.status}`);
    }

    return JSON.parse(body);
}

export async function deleteCurrentUserAccount() {
    if (!API_URL) {
        throw new Error("API URL is not configured");
    }

    const session = await fetchAuthSession();
    const token = session.tokens?.accessToken?.toString();

    if (!token) {
        throw new Error("No authenticated session");
    }

    const response = await fetch(`${API_URL}/users/me`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    const text = await response.text();

    console.log("Delete account response status:", response.status);
    console.log("Delete account response body:", text);

    let body;

    try {
        body = JSON.parse(text);
    } catch {
        body = { message: text };
    }

    if (!response.ok) {
        throw new Error(body.message ?? "Unable to delete account");
    }

    return body;
}