import { Modal, View, Text, StyleSheet, ViewStyle, StyleProp, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../constants/theme";
import Spacer from "../layout/Spacer";

type InfoModalProps = {
    visible: boolean;
    title: string;
    message?: string;
    warning?: string;
    buttonText?: string;
    buttonTextSecondary?: string;
    iconName?: keyof typeof Ionicons.glyphMap;
    onConfirm?: () => void;
    onClose?: () => void;
    primaryButtonStyle?: StyleProp<ViewStyle>;
};

export default function InfoModal({
    visible,
    title,
    message,
    warning,
    buttonText = "Continue",
    buttonTextSecondary,
    iconName = "information-circle-outline",
    onConfirm,
    onClose,
    primaryButtonStyle
}: InfoModalProps) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={() => onClose?.()}
        >
            <View style={styles.backdrop}>
                <View style={styles.modal}>
                    <View style={styles.iconCircle}>
                        <Ionicons
                            name={iconName}
                            size={30}
                            color={theme.colors.primaryDark}
                        />
                    </View>

                    <Text style={styles.title}>{title}</Text>

                    <Text style={styles.message}>{message}</Text>

                    {warning ? (
                        <>
                            <Text style={styles.warningMessage}>{warning}</Text>
                        </>
                    ) : null}

                    <Spacer height={20}/>
                    <View style={styles.buttonRow}>
                        {buttonTextSecondary ? (
                            <TouchableOpacity
                                style={[styles.button, styles.secondaryButton]}
                                activeOpacity={0.85}
                                onPress={() => onClose?.()}
                            >
                                <Text style={styles.secondaryButtonText}>
                                    {buttonTextSecondary}
                                </Text>

                            </TouchableOpacity>
                        ) : (
                            null
                        )}

                        <TouchableOpacity
                            style={[styles.button, styles.primaryButton, primaryButtonStyle]}
                            activeOpacity={0.85}
                            onPress={() => onConfirm?.()}
                        >
                            <View style={styles.primaryButtonContent}>
                                <Text style={styles.primaryButtonText}>
                                    {buttonText}
                                </Text>
                            </View>

                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.35)",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: theme.spacing.lg,
    },

    modal: {
        width: "100%",
        borderRadius: 22,
        backgroundColor: theme.colors.background,
        padding: theme.spacing.xl,
        alignItems: "center",
    },

    iconCircle: {
        width: 62,
        height: 62,
        borderRadius: 31,
        backgroundColor: theme.colors.paleGreen,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: theme.spacing.md,
    },

    title: {
        fontSize: 22,
        fontWeight: "900",
        color: theme.colors.primaryDark,
        textAlign: "center",
        marginBottom: theme.spacing.sm,
    },

    message: {
        fontSize: 14,
        lineHeight: 21,
        color: theme.colors.text,
        textAlign: "center",
        marginBottom: theme.spacing.sm,
    },

    buttonRow: {
        width: "100%",
        flexDirection: "row",
        gap: theme.spacing.sm,
    },

    button: {
        flex: 1,
        minHeight: 48,
        borderRadius: 24,
        alignItems: "center",
        justifyContent: "center",
    },

    primaryButton: {
        backgroundColor: theme.colors.primaryDark,
    },

    secondaryButton: {
        backgroundColor: theme.colors.background,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },

    primaryButtonContent: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        position: "relative",
        justifyContent: "center",
    },

    primaryButtonText: {
        color: theme.colors.paleGreen,
        fontSize: 15,
        fontWeight: "800",
    },

    secondaryButtonText: {
        color: theme.colors.primaryDark,
        fontSize: 14,
        fontWeight: "800",
    },

    warningMessage: {
        color: theme.colors.error,
        fontSize: 14,
        fontWeight: 800,
        textAlign: "center",
    },
});