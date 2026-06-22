import { fetchAuthSession } from "aws-amplify/auth";

const API_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

type LocationSettings = {
    latitude: number;
    longitude: number;
    searchDistance: number;
};

export async function saveLocationSettings(
    settings: LocationSettings
) {
    const session = await fetchAuthSession();
    const accessToken = session.tokens?.accessToken?.toString();

    if (!accessToken) {
        throw new Error("You must be logged in.")
    }

    const response = await fetch(
        `${API_URL}/users/me/location-settings`,
        {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(settings),
        }
    );
    const body = await response.json();

    if(!response.ok){
        throw new Error(body.message || "Unable to save location settings");
    }

    return body;
}