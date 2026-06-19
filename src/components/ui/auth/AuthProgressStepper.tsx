import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../../constants/theme";

type Step = {
  label: string;
};

type AuthProgressStepperProps = {
  currentStep: number;
  steps?: Step[];
};

const defaultSteps: Step[] = [
  { label: "Account" },
  { label: "Verify Email" },
  { label: "Lifestyle" },
  { label: "Location" },
];

export default function AuthProgressStepper({
  currentStep,
  steps = defaultSteps,
}: AuthProgressStepperProps) {
  return (
    <View style={styles.container}>
      <View style={styles.line} />

      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;
        const isUpcoming = stepNumber > currentStep;

        return (
          <View key={step.label} style={styles.step}>
            <View
              style={[
                styles.circle,
                isCompleted && styles.completedCircle,
                isCurrent && styles.currentCircle,
                isUpcoming && styles.upcomingCircle,
              ]}
            >
              {isCompleted ? (
                <Ionicons name="checkmark" size={14} color="#FFFFFF" />
              ) : (
                <Text
                  style={[
                    styles.stepNumber,
                    isCurrent && styles.currentText,
                    isUpcoming && styles.upcomingText,
                  ]}
                >
                  {stepNumber}
                </Text>
              )}
            </View>

            <Text
              style={[
                styles.label,
                isCurrent && styles.currentLabel,
                isUpcoming && styles.upcomingLabel,
              ]}
            >
              {step.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  line: {
    position: "absolute",
    top: 10,
    left: 42,
    right: 42,
    height: 3,
    backgroundColor: theme.colors.primaryDark,
    borderRadius: 10,
  },
  step: {
    alignItems: "center",
    flex: 1,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.card,
    zIndex: 2,
  },
  completedCircle: {
    backgroundColor: theme.colors.primaryDark,
    borderColor: theme.colors.primaryDark,
  },
  currentCircle: {
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.primaryDark,
  },
  upcomingCircle: {
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.primaryDark,
  },
  stepNumber: {
    fontSize: 12,
    fontWeight: "900",
    color: theme.colors.primaryDark,
  },
  currentText: {
    color: theme.colors.primaryDark,
  },
  upcomingText: {
    color: theme.colors.primaryDark,
  },
  label: {
    marginTop: 3,
    fontSize: 11,
    color: theme.colors.text,
    textAlign: "center",
  },
  currentLabel: {
    color: theme.colors.primaryDark,
    fontWeight: "700",
  },
  upcomingLabel: {
    color: theme.colors.muted,
  },
});