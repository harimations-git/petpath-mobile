import { router } from "expo-router";

import { routes } from "../../constants/routes";
import { getCurrentUserProfile } from "../../services/user/userService";

const CURRENT_ONBOARDING_VERSION = 1;

export async function redirectAfterLogin() {
    const profile = await getCurrentUserProfile();

    if (
        profile.onboardingComplete &&
        profile.onboardingVersion === CURRENT_ONBOARDING_VERSION
    ) {
        router.replace(routes.tabs.home);
        return;
    }

    switch (profile.currentStep) {
        case "lifeStyleQuestionnaire":
            router.replace(routes.onboarding.lifestyle);
            break;
        case "location":
            router.replace(routes.onboarding.location);
            break;
        default:
            router.replace(routes.auth.createAccount);

    }
}