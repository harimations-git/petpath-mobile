import { useEffect } from "react";
import { router } from "expo-router";
import { getCurrentUser } from "aws-amplify/auth";

import LoadingSpinner from "../src/components/ui/LoadingSpinner";
import Screen from "../src/components/layout/Screen";
import { routes } from "../src/constants/routes";
import { redirectAfterLogin } from "../src/utils/navigation/redirectAfterLogin";

export default function IndexScreen() {
    useEffect(() => {
        async function checkSession() {
            try {
                await getCurrentUser();
                await redirectAfterLogin();
            } catch {
                router.replace(routes.auth.login);
            }
        }

        checkSession();
    }, []);

    return (
        <Screen>
            <LoadingSpinner />
        </Screen>
    );
}