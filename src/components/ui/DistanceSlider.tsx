import React from "react";
import {
    StyleProp,
    StyleSheet,
    Text,
    View,
    ViewStyle,
} from "react-native";
import Slider from "@react-native-community/slider";

import { theme } from "../../constants/theme";

type DistanceSliderProps = {
    value: number;
    onChange: (value: number) => void;

    min?: number;
    max?: number;
    step?: number;
    unit?: string;

    labels?: [string, string, string];
    caption?: (value: number) => string;

    containerStyle?: StyleProp<ViewStyle>;
};

export default function DistanceSlider({
    value,
    onChange,
    min = 5,
    max = 100,
    step = 1,
    unit = "miles",
    labels,
    caption,
    containerStyle,
}: DistanceSliderProps) {
    const roundedValue = Math.round(value);

    const displayLabels = labels ?? [
        `${min} ${unit}`,
        `${Math.round((min + max) / 2)} ${unit}`,
        `${max} ${unit}`,
    ];

    const displayCaption =
        caption?.(roundedValue) ?? `Within ${roundedValue} ${unit}`;

    return (
        <View style={[styles.container, containerStyle]}>
            <View style={styles.labelsRow}>
                <Text style={styles.label}>{displayLabels[0]}</Text>
                <Text style={styles.label}>{displayLabels[1]}</Text>
                <Text style={styles.label}>{displayLabels[2]}</Text>
            </View>

            <Slider
                style={styles.slider}
                minimumValue={min}
                maximumValue={max}
                step={step}
                value={value}
                onValueChange={onChange}
                minimumTrackTintColor={theme.colors.primaryDark}
                maximumTrackTintColor={theme.colors.border}
                thumbTintColor={theme.colors.primaryDark}
            />

            <Text style={styles.caption}>{displayCaption}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: theme.colors.card,
        borderRadius: 18,
        paddingHorizontal: theme.spacing.md,
        paddingTop: theme.spacing.sm,
        paddingBottom: theme.spacing.sm,
        marginBottom: theme.spacing.md,

        shadowColor: "#000",
        shadowOpacity: 0.16,
        shadowRadius: 6,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        elevation: 4,
    },

    labelsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    label: {
        fontSize: 12,
        color: theme.colors.text,
    },

    slider: {
        width: "100%",
        height: 36,
    },

    caption: {
        fontSize: 12,
        color: theme.colors.text,
        textAlign: "center",
        marginTop: -4,
    },
});