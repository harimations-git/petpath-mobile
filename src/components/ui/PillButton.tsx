import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    ViewStyle,
    StyleProp,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../constants/theme";

type PillButtonProps = {
    label?: string
    title?: string
    description?: string
    centerTitle?: boolean;
    iconName?: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
};

export default function PillButton({
    label,
    title,
    description,
    iconName,
    centerTitle = false,
    onPress,
    style
}: PillButtonProps) {
    return (
        <TouchableOpacity
            style={[styles.accountOption, style]}
            activeOpacity={0.85}
            onPress={onPress}
        >
            <View style={styles.optionIcon}>
                <Ionicons
                    name={iconName}
                    size={26}
                    color={theme.colors.primaryDark}
                />
            </View>

            <View style={styles.optionTextWrapper}>
                {label ? (
                    <Text style={styles.optionLabel}>{label}</Text>
                ) : null}

                <Text style={[styles.optionTitle, centerTitle && styles.centerTitle]}>
                    {title}
                </Text>
                
                {description ? (
                    <Text style={styles.optionDescription}>
                        {description}
                    </Text>
                ) : null}
            </View>

            <Ionicons
                name="chevron-forward"
                size={24}
                color={theme.colors.primaryDark}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    accountOption: {
        minHeight: 135,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: theme.spacing.lg,
        paddingHorizontal: theme.spacing.md,
        borderRadius: 30,
        backgroundColor: theme.colors.background,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },

    optionIcon: {
        width: 54,
        height: 54,
        borderRadius: 27,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.paleGreen,
        marginRight: theme.spacing.md,
    },

    optionTextWrapper: {
        flex: 1,
        paddingRight: theme.spacing.sm,
    },

    optionLabel: {
        fontSize: 11,
        fontWeight: "800",
        color: theme.colors.primaryDark,
        textTransform: "uppercase",
        marginBottom: 4,
    },

    optionTitle: {
        fontSize: 17,
        fontWeight: "900",
        color: theme.colors.primaryDark,
        marginBottom: 5,
    },

    optionDescription: {
        fontSize: 13,
        lineHeight: 18,
        color: theme.colors.text,
    },
    centerTitle: {
        textAlign: "center",
    },
});