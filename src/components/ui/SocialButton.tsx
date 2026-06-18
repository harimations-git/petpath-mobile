import React from "react";
import { Pressable, StyleSheet, ViewStyle } from "react-native";
import GoogleSignInButton from "../../../assets/images/android_light_rd_SU.svg";

type SocialButtonProps = {
    onPress: () => void;
    style?: ViewStyle;
};

export default function SocialButton({ onPress, style }: SocialButtonProps) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.buttonWrapper,
                style,
                pressed && styles.pressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Sign in with Google"
        >
            <GoogleSignInButton width={220} height={48} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    buttonWrapper: {
        alignSelf: "center",
        marginTop: 16,
    },
    pressed: {
        opacity: 0.65,
    },
});