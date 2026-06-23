import { fetchAuthSession } from "aws-amplify/auth";

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