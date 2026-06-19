import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { theme } from "../../constants/theme";

type CardProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export default function Card({ children, style }: CardProps){
    return <View style={[styles.card, style]}>{children}</View>
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    borderRadius: 34,
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,

    borderWidth: 1,
    borderColor: "rgba(221, 229, 218, 0.9)",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.16,
    shadowRadius: 12,

    elevation: 8,
  },
});