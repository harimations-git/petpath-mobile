import { Tabs } from "expo-router";

import AppTabBar from "../../src/components/ui/navigation/AppTabBar";
import { UserProfileProvider } from "../../src/context/UserProfileContext";

export default function TabsLayout() {
    return (
        <UserProfileProvider>
            <Tabs
                tabBar={(props) => <AppTabBar {...props} />}
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{ title: "Home" }}
                />

                <Tabs.Screen
                    name="matches"
                    options={{ title: "Matches" }}
                />

                <Tabs.Screen
                    name="saved-pets"
                    options={{ title: "Saved Pets" }}
                />

                <Tabs.Screen
                    name="settings"
                    options={{ title: "Settings" }}
                />
            </Tabs >
        </UserProfileProvider>
    )
}