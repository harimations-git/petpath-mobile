import React, { useEffect, useRef } from "react";
import { Animated, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Card from "./Card";
import DecorativeLeaf from "./DecorativeLeaf";
import { theme } from "../../constants/theme";

export type InfoListItem = {
    title: string;
    description: string;
    iconName: keyof typeof Ionicons.glyphMap;
    backgroundColor?: string;
    iconColor?: string;
};

type InfoListCardProps = {
    title: string;
    items: InfoListItem[];
    showLeaves?: boolean;
    animate?: boolean;
    animationDelay?: number;
    animationDuration?: number;
};

export default function InfoListCard({
    title,
    items,
    showLeaves = true,
    animate = true,
    animationDelay = 180,
    animationDuration = 450,
}: InfoListCardProps) {
    const itemAnimations = useRef<Animated.Value[]>([]);

    if (itemAnimations.current.length !== items.length) {
        itemAnimations.current = items.map(() => new Animated.Value(0));
    }

    useEffect(() => {
        itemAnimations.current.forEach((animation) => {
            animation.setValue(animate ? 0 : 1);
        });

        if (!animate) return;

        Animated.stagger(
            animationDelay,
            itemAnimations.current.map((animation) =>
                Animated.timing(animation, {
                    toValue: 1,
                    duration: animationDuration,
                    useNativeDriver: true,
                })
            )
        ).start();
    }, [items.length, animate, animationDelay, animationDuration]);

    return (
        <View style={styles.wrapper}>
            <Card>
                <View style={styles.titleRow}>
                    {showLeaves && (
                        <>
                            <DecorativeLeaf
                                width={50}
                                height={50}
                                top={-18}
                                left={10}
                                rotate={90}
                                opacity={1}
                                flipY
                                zIndex={0}
                            />

                            <DecorativeLeaf
                                width={50}
                                height={50}
                                top={-18}
                                right={10}
                                rotate={-90}
                                flipX
                                flipY
                                opacity={1}
                                zIndex={0}
                            />
                        </>
                    )}

                    <Text style={styles.title}>{title}</Text>
                </View>

                <ScrollView
                    style={styles.termsScroll}
                    contentContainerStyle={styles.termsScrollContent}
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled
                >
                    <View style={styles.list}>
                        {items.map((item, index) => {
                            const isLastItem = index === items.length - 1;
                            const animation = itemAnimations.current[index];

                            return (
                                <Animated.View
                                    key={`${item.title}-${index}`}
                                    style={{
                                        opacity: animation,
                                        transform: [
                                            {
                                                translateY: animation.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [14, 0],
                                                }),
                                            },
                                        ],
                                    }}
                                >
                                    <View style={styles.itemRow}>
                                        <View
                                            style={[
                                                styles.iconCircle,
                                                {
                                                    backgroundColor:
                                                        item.backgroundColor ||
                                                        theme.colors.paleGreen,
                                                },
                                            ]}
                                        >
                                            <Ionicons
                                                name={item.iconName}
                                                size={28}
                                                color={
                                                    item.iconColor ||
                                                    theme.colors.primaryDark
                                                }
                                            />
                                        </View>

                                        <View style={styles.itemText}>
                                            <Text style={styles.itemTitle}>
                                                {item.title}
                                            </Text>

                                            <Text style={styles.itemDescription}>
                                                {item.description}
                                            </Text>
                                        </View>
                                    </View>

                                    {!isLastItem && <View style={styles.divider} />}
                                </Animated.View>
                            );
                        })}
                    </View>
                </ScrollView>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        width: "100%",
    },

    titleRow: {
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 42,
        marginBottom: theme.spacing.sm,
    },

    title: {
        zIndex: 2,
        fontSize: 24,
        fontWeight: "900",
        color: theme.colors.primaryDark,
        textAlign: "center",
    },

    list: {
        marginTop: theme.spacing.xs,
    },

    itemRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: theme.spacing.md,
    },
    termsScroll: {
        maxHeight: 250,
    },

    termsScrollContent: {
        paddingTop: theme.spacing.sm,
        paddingBottom: theme.spacing.md,
    },


    iconCircle: {
        width: 54,
        height: 54,
        borderRadius: 27,
        alignItems: "center",
        justifyContent: "center",
        marginRight: theme.spacing.md,
    },

    itemText: {
        flex: 1,
    },

    itemTitle: {
        fontSize: 15,
        lineHeight: 20,
        fontWeight: "900",
        color: theme.colors.primaryDark,
    },

    itemDescription: {
        marginTop: 3,
        fontSize: 13,
        lineHeight: 17,
        color: theme.colors.text,
    },

    divider: {
        height: 1,
        backgroundColor: theme.colors.border,
        marginLeft: 54 + theme.spacing.md,
    },
});