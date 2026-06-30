import React, { useEffect, useRef } from "react";
import { Animated, Easing, Image, ImageStyle, StyleProp, StyleSheet, useWindowDimensions, ViewStyle } from "react-native";

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
    animate?: boolean;
    slideFromRight?: number,
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
    animate = true,
    slideFromRight = 90,
}: PetHeroImageProps) {

    const fadeAnimation = useRef(new Animated.Value(0)).current;

    const slideAnimation = useRef(
        new Animated.Value(slideFromRight)
    ).current;

    useEffect(() => {
        if (!animate) return;

        Animated.parallel([
            Animated.timing(fadeAnimation, {
                toValue: opacity,
                duration: 1000,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true
            }),

            Animated.timing(slideAnimation, {
                toValue: 0,
                duration: 600,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true
            }),
        ]).start();
    }, [animate, fadeAnimation, opacity, slideAnimation]);
    return (
        <Animated.Image
            source={require("../../../assets/images/Logo-Animals.png")}
            resizeMode="contain"
            style={[
                styles.image,
                {
                    width,
                    height,
                    top,
                    right,
                    opacity: fadeAnimation,
                    zIndex,
                    transform: [
                        { translateX: slideAnimation },
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