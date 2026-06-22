import { ActivityIndicator, StyleSheet, View } from "react-native";

import { theme } from "../../constants/theme";

type LoadingSpinnerProps = {
    size?: "small" | "large";
    fullScreen?: boolean;
};

export default function LoadingSpinner({
    size = "large",
    fullScreen = false,
}: LoadingSpinnerProps) {
    return (
        <View style={fullScreen ? styles.fullScreen : styles.container}>
            <ActivityIndicator
                size={size}
                color={theme.colors.primary}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: theme.spacing.md,
    },
    fullScreen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.background,
    },
});