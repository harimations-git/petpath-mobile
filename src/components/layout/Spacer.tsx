import React from "react";
import { View, ViewStyle } from "react-native";

type SpacerProps = {
  height?: ViewStyle["height"];
  width?: ViewStyle["width"];
};

export default function Spacer({ height = 16, width = 0 }: SpacerProps) {
  return <View style={{ height, width }} />;
}