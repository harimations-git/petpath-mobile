import React, { useState } from "react";
import {
    FlatList,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../constants/theme";

type DropdownOption = {
    label: string;
    value: string;
};

type PillDropdownProps = {
    title: string;
    description?: string
    iconName: keyof typeof Ionicons.glyphMap
    options: DropdownOption[];
    selectedValue?: string;
    onSelect: (value: string) => void;
    placeholder?: string

}

export default function PillDropdown({
    title, description = "", iconName, options, selectedValue, onSelect, placeholder = "Select option",
}: PillDropdownProps) {
    const [modalVisible, setModalVisible] = useState(false);

    const selectedOption = options.find((option) => option.value === selectedValue);
    const hasSelected = Boolean(selectedOption);

    const label = selectedOption?.label ?? placeholder;

    const displayLabel =
        label.length > 6 ? `${label.slice(0, 6)}...` : label;


    function handleSelect(value: string) {
        onSelect(value);
        setModalVisible(false);
    }

    return (
        <>
            <TouchableOpacity
                activeOpacity={0.85}
                style={styles.container}
                onPress={() => setModalVisible(true)}
            >
                <View style={styles.leftSection}>
                    <View style={styles.iconCircle}>
                        <Ionicons name={iconName} size={22} color={theme.colors.primary} />
                    </View>

                    <Text style={styles.title}>{title}</Text>
                </View>
                <View style={[styles.valuePill, hasSelected ? styles.selectedPill : styles.placeholderPill]}>
                    <Text style={[styles.valueText, hasSelected ? styles.selectedText : styles.placeholderText]}>
                        {displayLabel}
                    </Text>

                    <Ionicons
                        name="chevron-down"
                        size={18}
                        color={hasSelected ? "#FFFFFF" : theme.colors.muted}
                        style={styles.chevronIcon}
                    />
                </View>
            </TouchableOpacity>

            <Modal
                visible={modalVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
                    <View style={styles.modalCard}>
                        <Text style={styles.modalTitle}>{title}</Text>
                        <Text style={styles.message}>{description}</Text>

                        <FlatList
                            data={options}
                            keyExtractor={(item) => item.value}
                            ItemSeparatorComponent={() => <View style={styles.separator} />}
                            renderItem={({ item }) => {
                                const isSelected = item.value === selectedValue;

                                return (
                                    <TouchableOpacity
                                        style={styles.optionRow}
                                        onPress={() => handleSelect(item.value)}
                                        activeOpacity={0.75}
                                    >
                                        <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                                            {item.label}
                                        </Text>

                                        {isSelected && (
                                            <Ionicons
                                                name="checkmark-circle"
                                                size={22}
                                                color={theme.colors.primary}
                                            />
                                        )}
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    </View>
                </Pressable>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: 48,
        borderRadius: 24,
        backgroundColor: theme.colors.card,
        borderWidth: 1,
        borderColor: theme.colors.border,
        paddingLeft: 8,
        paddingRight: 8,
        marginBottom: 10,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.16,
        shadowRadius: 4,
        elevation: 4,
    },

    leftSection: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        marginRight: 8,
    },

    iconCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: theme.colors.paleGreen,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 8,
    },

    title: {
        fontSize: 13,
        fontWeight: "800",
        color: theme.colors.primary,
        flexShrink: 1,
    },

    message: {
        fontSize: 16,
        lineHeight: 21,
        color: theme.colors.text,
        textAlign: "center",
        marginHorizontal: theme.spacing.md,
        marginBottom: theme.spacing.lg,
    },

    valuePill: {
        position: "relative",
        minWidth: 128,
        height: 32,
        borderRadius: 16,
        paddingHorizontal: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
    },

    selectedPill: {
        backgroundColor: theme.colors.primary,
    },

    placeholderPill: {
        backgroundColor: "#E6E8E6",
    },

    chevronIcon: {
        position: "absolute",
        right: theme.spacing.md,
    },

    valueText: {
        fontSize: 14,
        fontWeight: "700",
        textAlign: "left",
    },

    selectedText: {
        color: "#FFFFFF",
    },

    placeholderText: {
        color: theme.colors.muted,
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.35)",
        justifyContent: "center",
        paddingHorizontal: 28,
    },

    modalCard: {
        backgroundColor: theme.colors.card,
        borderRadius: 24,
        padding: 18,
        maxHeight: "70%",
    },

    modalTitle: {
        fontSize: 20,
        fontWeight: "900",
        color: theme.colors.primaryDark,
        marginBottom: 12,
        textAlign: "center",
    },

    optionRow: {
        minHeight: 48,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    optionText: {
        fontSize: 15,
        color: theme.colors.text,
    },

    optionTextSelected: {
        color: theme.colors.primaryDark,
        fontWeight: "800",
    },


    separator: {
        height: 1,
        backgroundColor: theme.colors.border,
    },
});