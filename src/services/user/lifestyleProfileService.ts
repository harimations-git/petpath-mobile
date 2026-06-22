import { fetchAuthSession } from "aws-amplify/auth";

const API_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export type LifestyleProfileInput = {
    homeType: string;
    outdoorSpace: string;
    activityLevel: string;
    dailyRoutine: string;
    budget: string;
    petExperience: string;
};

export async function saveLifestyleProfile(
    profile: LifestyleProfileInput
) {
    if (!API_URL) {
        throw new Error("API URL is not configured")
    }



    const session = await fetchAuthSession();
    const token = session.tokens?.accessToken?.toString();

    if (!token) {
        throw new Error("No authenticated session")
    }

    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    const testResponse = await fetch(`${API_URL}/users/me`, {
        method: "GET",
        headers,
    });

    console.log(
        "GET profile test:",
        testResponse.status,
        await testResponse.text()
    );

    const response = await fetch(
        `${API_URL}/users/me/lifestyle-profile`,
        {
            method: "PUT",
            headers,
            body: JSON.stringify(profile),
        }
    );
    const body = await response.json();

    console.log(
        "Lifestyle response:",
        response.status,
        body
    );

    if (!response.ok) {
        throw new Error(
            body.message ?? "Unable to save lifestyle profile"
        );
    }

    return body;

}