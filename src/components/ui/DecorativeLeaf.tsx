import React from "react";
import {
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";

type DecorativeLeafProps = {
  width?: number;
  height?: number;
  top?: ViewStyle["top"];
  bottom?: ViewStyle["bottom"];
  left?: ViewStyle["left"];
  right?: ViewStyle["right"];
  rotate?: number;
  flipX?: boolean;
  flipY?: boolean;
  opacity?: number;
  zIndex?: number;
  style?: StyleProp<ImageStyle>;
};

export default function DecorativeLeaf({
  width = 120,
  height = 120,
  top,
  bottom,
  left,
  right,
  rotate = 0,
  flipX = false,
  flipY = false,
  opacity = 0.25,
  zIndex = 0,
  style,
}: DecorativeLeafProps) {
  return (
    <Image
      source={require("../../../assets/images/leaf.png")}
      resizeMode="contain"
      style={[
        styles.leaf,
        {
          width,
          height,
          top,
          bottom,
          left,
          right,
          opacity,
          transform: [
            { rotate: `${rotate}deg` },
            { scaleX: flipX ? -1 : 1 },
            { scaleY: flipY ? -1 : 1 },
          ],
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  leaf: {
    position: "absolute",
  },
});