import React from "react";
import {
    StyleSheet,
    StyleProp,
    TextStyle,
    Text,
    TouchableOpacity,
    TouchableOpacityProps,
    View,
    ViewStyle
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../constants/theme";

type AppButtonProps = TouchableOpacityProps & {
    title?: string;
    width?: ViewStyle["width"];
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    arrowIconSet?: boolean
    iconSize?: number;
    iconName?: keyof typeof Ionicons.glyphMap;
    iconColor?: string;
};

export default function AppButtonProps({ title, width = "100%",
    style, textStyle, arrowIconSet=true, iconSize = 28, iconName="paw", iconColor="#ffff", ...props }: AppButtonProps) {
    return (
        <TouchableOpacity
            activeOpacity={0.85}
            style={[styles.button, { width }, style]}
            {...props}
        >
            <View style={styles.iconSpace} {...props}>
                <Ionicons name={iconName} size={iconSize} color={iconColor}/>
            </View>

            <Text style={[styles.text, textStyle]}>{title}</Text>

            {arrowIconSet && (
                <Ionicons name="arrow-forward" size={20} color={iconColor}/>
            )}

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 62,
        borderRadius: theme.radius.pill,
        backgroundColor: theme.colors.primary,
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "space-between",
        paddingHorizontal: theme.spacing.md,
        marginTop: theme.spacing.md
    },
    iconSpace: {
        width: 40,
        alignItems: "center"
    },
    text: {
        color: "#ffffff",
        fontSize: 25,
        fontWeight: "800",
    }
});