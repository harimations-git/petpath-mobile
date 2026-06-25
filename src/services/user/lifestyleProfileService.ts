import { fetchAuthSession } from "aws-amplify/auth";

const API_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export type LifestyleProfile = {
    homeType?: string;
    outdoorSpace?: string;
    activityLevel?: string;
    dailyRoutine?: string;
    budget?: string;
    petExperience?: string;
    latitude?: number;
    longitude?: number;
    searchDistance?: number;
    approximate?: boolean;
};

export async function saveLifestyleProfile(
    profile: LifestyleProfile
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

    const response = await fetch(
        `${API_URL}/users/me/lifestyle-profile`,
        {
            method: "PUT",
            headers,
            body: JSON.stringify(profile),
        }
    );
    const body = await response.json();

    if (!response.ok) {
        throw new Error(
            body.message ?? "Unable to save lifestyle profile"
        );
    }

    return body;

}

export async function getLifestyleProfile(): Promise<LifestyleProfile> {
    const session = await fetchAuthSession();
    const token = session.tokens?.accessToken?.toString();

    if (!token) {
        throw new Error("No authenticated session.");
    }

    const response = await fetch(
        `${API_URL}/users/me/lifestyle-profile`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const responseText = await response.text();

    let body: any = {};

    try {
        body = JSON.parse(responseText);
    } catch {
        body = { message: responseText };
    }

    if (!response.ok) {
        throw new Error(
            body.message || "Unable to load lifestyle profile."
        );
    }

    return body;
}

export async function updateSearchDistance(searchDistance: number) {
    const session = await fetchAuthSession();
    const token = session.tokens?.accessToken?.toString();

    if (!token) {
        throw new Error("No authenticateed session")
    }

    const response = await fetch(
        `${API_URL}/users/me/lifestyle-profile/search-distance`,
        {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                searchDistance 
            }),
        }
    );

    const responseText = await response.text();

    let body: any = {};

    try {
        body = JSON.parse(responseText);
    } catch {
        body = { message: responseText };
    }

    if (!response.ok) {
        throw new Error(
            body.message ||
            `Unable to update search distance (${response.status})`
        ); 
    } 

    return body;
}