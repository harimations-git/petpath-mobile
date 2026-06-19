import React, { useRef } from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import { theme } from "../../../constants/theme";

type VerificationCodeInputProps = {
    length?: number;
    value: string;
    onChangeText: (code: string) => void;
};

export default function VerificationCodeInput({
    length = 6,
    value,
    onChangeText,
}: VerificationCodeInputProps) {
    const inputRef = useRef<TextInput>(null);

    function handleChange(text: string) {
        const numbersOnly = text.replace(/[^0-9]/g, "").slice(0, length);
        onChangeText(numbersOnly);
    }

    const digits = Array.from({ length }, (_, index) => value[index] || "");

    return (
        <Pressable
            style={styles.container}
            onPress={() => {
                inputRef.current?.blur();

                setTimeout(() => {
                    inputRef.current?.focus();
                }, 50);
            }}
        >
            <View style={styles.codeRow}>
                {digits.map((digit, index) => {
                    const isActive = value.length === index;

                    return (
                        <View
                            key={index}
                            style={[styles.codeBox, isActive && styles.activeBox]}
                        >
                            <Text style={styles.codeText}>{digit}</Text>
                        </View>
                    );
                })}
            </View>

            <TextInput
                ref={inputRef}
                value={value}
                onChangeText={handleChange}
                keyboardType="number-pad"
                maxLength={length}
                caretHidden
                textContentType="oneTimeCode"
                autoComplete="sms-otp"
                style={styles.hiddenInput}
            />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        marginVertical: theme.spacing.md,
    },

    codeRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 14,
    },

    codeBox: {
        width: 42,
        height: 58,
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: theme.colors.muted,
        backgroundColor: "#FDFDFD",
        alignItems: "center",
        justifyContent: "center",

        shadowColor: "#000",
        shadowOpacity: 0.18,
        shadowRadius: 3,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 3,
    },

    activeBox: {
        borderColor: theme.colors.primary,
    },

    codeText: {
        fontSize: 34,
        lineHeight: 40,
        fontWeight: "800",
        color: theme.colors.primary,
    },

    hiddenInput: {
        position: "absolute",
        opacity: 0,
        width: 1,
        height: 1,
    },
});