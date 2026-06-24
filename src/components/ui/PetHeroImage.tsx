import React from "react";
import { Image, ImageStyle, StyleProp, StyleSheet, ViewStyle } from "react-native";

type PetHeroImageProps = {
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

export default function PetHeroImage({
    width = 165,
    height = 165,
    top = 5,
    right = -10,
    rotate = 0,
    flipX = false,
    flipY = false,
    opacity = 1,
    zIndex = 1,
    style,
}: PetHeroImageProps) {
    return (
        <Image
            source={require("../../../assets/images/Logo-Animals.png")}
            resizeMode="contain"
            style={[
                styles.image,
                {
                    width,
                    height,
                    top,
                    right,
                    opacity,
                    zIndex,
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
    image: {
        position: "absolute",
    },
});