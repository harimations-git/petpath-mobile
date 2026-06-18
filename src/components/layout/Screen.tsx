import React from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
} from "react-native";

import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from "../../constants/theme";

type ScreenProps = {
    children: React.ReactNode;
};

export default function Screen({ children }: ScreenProps){
    return(
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
            style={styles.keyboardView}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <ScrollView
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                >
                    {children}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    ); 
}

const styles = StyleSheet.create({
    safeArea:{
        flex:1,
        backgroundColor: theme.colors.background,
    },
    keyboardView:{
        flex: 1,
    },
    content:{
        flexGrow: 1,
        paddingHorizontal: theme.spacing.lg,
        paddingBottom: theme.spacing.xl,
    },
});



