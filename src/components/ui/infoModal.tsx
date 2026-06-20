import React from "react";
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../constants/theme";
import AppButton from "./AppButton";

type InfoModalProps = {
    visible: boolean;
    title: string;
    message: string;
    buttonText?: string;
    iconName?: keyof typeof Ionicons.glyphMap;
    onClose: () => void;
};

export default function InfoModal({
    visible,
    title,
    message,
    buttonText = "Continue",
    iconName = "heart-outline",
    onClose,
}: InfoModalProps) {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <Pressable style={styles.overlay} onPress={onClose}>
                <Pressable style={styles.modalCard}>
                    <View style={styles.iconCircle}>
                        <Ionicons name={iconName} size={34} color={theme.colors.primaryDark} />
                    </View>

                    <Text style={styles.title}>{title}</Text>

                    <Text style={styles.message}>{message}</Text>

                    <AppButton title={buttonText} onPress={onClose} style={styles.button} />
                </Pressable>
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(18, 60, 43, 0.35)",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: theme.spacing.lg,
    },
    modalCard: {
        width: "100%",
        backgroundColor: theme.colors.card,
        borderRadius: 32,
        paddingHorizontal: theme.spacing.lg,
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.lg,
        alignItems: "center",

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.18,
        shadowRadius: 14,
        elevation: 8,
    },
    iconCircle: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: theme.colors.paleGreen,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: theme.spacing.md,
    },
    title: {
        fontSize: 21,
        lineHeight: 29,
        fontWeight: "900",
        color: theme.colors.primaryDark,
        textAlign: "center",
        marginBottom: theme.spacing.sm,
        paddingHorizontal: theme.spacing.sm,
    },
    message: {
        fontSize: 14,
        lineHeight: 21,
        color: theme.colors.text,
        textAlign: "center",
        marginHorizontal: theme.spacing.md,
        marginBottom: theme.spacing.lg,
        opacity: 0.9,
    },
    button: {
        marginTop: 0,
        width: "100%",
    },
});