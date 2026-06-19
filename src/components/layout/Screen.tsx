import React, { useEffect, useRef, useState } from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleProp,
    StyleSheet,
    View,
    ViewStyle,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../../constants/theme";

type ScreenProps = {
    children: React.ReactNode;
    scrollable?: boolean;
    keyboardAware?: boolean;
    scrollOnlyWhenKeyboardOpen?: boolean;
    contentContainerStyle?: StyleProp<ViewStyle>;
};

export default function Screen({
    children,
    scrollable = false,
    keyboardAware = false,
    scrollOnlyWhenKeyboardOpen = false,
    contentContainerStyle,
}: ScreenProps) {
    const scrollRef = useRef<ScrollView>(null);
    const [keyboardOpen, setKeyboardOpen] = useState(false);


    useEffect(() => {
        const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
        const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

        const showListener = Keyboard.addListener(showEvent, () => {
            setKeyboardOpen(true);
        });

        const hideListener = Keyboard.addListener(hideEvent, () => {
            setKeyboardOpen(false);

            setTimeout(() => {
                scrollRef.current?.scrollTo({
                    y: 0,
                    animated: true,
                });
            }, 100);
        });

        return () => {
            showListener.remove();
            hideListener.remove();
        };
    }, []);

    const shouldUseScrollView = scrollable || scrollOnlyWhenKeyboardOpen;

    const content = shouldUseScrollView ? (
        <ScrollView
            ref={scrollRef}
            style={styles.scrollView}
            contentContainerStyle={[
                styles.scrollContent,
                contentContainerStyle,
                scrollOnlyWhenKeyboardOpen && keyboardOpen && styles.keyboardPadding,
            ]}
            scrollEnabled={scrollable || keyboardOpen}
            keyboardShouldPersistTaps="never"
            keyboardDismissMode={Platform.OS === "ios" ? "interactive" : "none"}
            showsVerticalScrollIndicator={false}
        >
            {children}
        </ScrollView>
    ) : (
        <View style={[styles.fixedContent, contentContainerStyle]}>
            {children}
        </View>
    );

    return (
        <View style={styles.root}>
            <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
                {keyboardAware || scrollOnlyWhenKeyboardOpen ? (
                    <KeyboardAvoidingView
                        style={styles.keyboardView}
                        behavior="height"
                        keyboardVerticalOffset={0}
                        enabled={keyboardOpen}
                    >
                        {content}
                    </KeyboardAvoidingView>
                ) : (
                    content
                )}
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },

    safeArea: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },

    keyboardView: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },

    keyboardPadding: {
        paddingBottom: 40,
    },

    scrollView: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },

    scrollContent: {
        flexGrow: 1,
        backgroundColor: theme.colors.background,
        paddingHorizontal: theme.spacing.lg,
        paddingTop: theme.spacing.sm,
        paddingBottom: theme.spacing.sm,
    },

    fixedContent: {
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingHorizontal: theme.spacing.lg,
        paddingTop: theme.spacing.sm,
        paddingBottom: theme.spacing.sm,
    },
});