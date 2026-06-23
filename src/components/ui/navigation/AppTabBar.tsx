import { Ionicons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { theme } from "../../../constants/theme";

const TAB_DETAILS = {
    home: {
        label: "Home",
        activeIcon: "home",
        inactiveIcon: "home-outline",
    },
    matches: {
        label: "Matches",
        activeIcon: "paw",
        inactiveIcon: "paw-outline",
    },
    "saved-pets": {
        label: "Saved Pets",
        activeIcon: "heart",
        inactiveIcon: "heart-outline",
    },
    settings: {
        label: "Settings",
        activeIcon: "settings",
        inactiveIcon: "settings-outline",
    },
} as const;

type TabName = keyof typeof TAB_DETAILS;

export default function AppTabBar({
    state,
    descriptors,
    navigation,
}: BottomTabBarProps) {
    const insets = useSafeAreaInsets();

    return (
        <View
            style={[
                styles.container,
                { paddingBottom: Math.max(insets.bottom, 8) },
            ]}
        >
            {state.routes.map((route, index) => {
                const details = TAB_DETAILS[route.name as TabName];

                if (!details) return null;

                const isFocused = state.index === index;
                const options = descriptors[route.key].options;

                function handlePress() {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                }

                function handleLongPress() {
                    navigation.emit({
                        type: "tabLongPress",
                        target: route.key,
                    });
                }

                return (
                    <Pressable
                        key={route.key}
                        accessibilityRole="button"
                        accessibilityState={
                            isFocused ? { selected: true } : {}
                        }
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        onPress={handlePress}
                        onLongPress={handleLongPress}
                        style={({ pressed }) => [
                            styles.tab,
                            pressed && styles.tabPressed,
                        ]}
                    >
                        <View style={styles.iconContainer}>
                            {isFocused && (
                                <View style={styles.activeIndicator} />
                            )}

                            <Ionicons
                                name={
                                    isFocused
                                        ? details.activeIcon
                                        : details.inactiveIcon
                                }
                                size={24}
                                color={
                                    isFocused
                                        ? theme.colors.primaryDark
                                        : styles.inactive.color
                                }
                            />
                        </View>

                        <Text
                            numberOfLines={1}
                            style={[
                                styles.label,
                                isFocused && styles.activeLabel,
                            ]}
                        >
                            {details.label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        borderTopWidth: 1,
        borderTopColor: "#E2E8E1",
        paddingTop: 8,
        minHeight: 68,

        shadowColor: "#1D2A20",
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 10,
    },
    tab: {
        flex: 1,
        minWidth: 0,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 2,
        paddingVertical: 4,
    },
    tabPressed: {
        opacity: 0.65,
    },
    iconContainer: {
        minHeight: 28,
        alignItems: "center",
        justifyContent: "flex-end",
    },
    activeIndicator: {
        position: "absolute",
        top: -8,
        width: 28,
        height: 3,
        borderRadius: 2,
        backgroundColor: theme.colors.primaryDark,
    },
    label: {
        marginTop: 3,
        fontSize: 11,
        lineHeight: 14,
        fontWeight: "600",
        color: "#667269",
        textAlign: "center",
    },
    activeLabel: {
        color: theme.colors.primaryDark,
        fontWeight: "800",
    },
    inactive: {
        color: "#667269",
    },
});