import React, { useRef, useState } from "react";
import {
    Dimensions,
    FlatList,
    ImageBackground,
    ImageSourcePropType,
    Linking,
    NativeScrollEvent,
    NativeSyntheticEvent,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../constants/theme";

const { width } = Dimensions.get("window"); //Makes the carousel feel equally responsive on different screen sizes

const CARD_WIDTH = width * 0.74;
const CARD_SPACING = 16;

export type AppCarouselItem = {
    title: string,
    description: string;
    image: ImageSourcePropType;
    url: string;
    tag?: string;
}

type AppCarouselProps = {
    title?: string;
    items: AppCarouselItem[];
};

export default function AppCarousel({
    title = "Useful resources",
    items
}: AppCarouselProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef<FlatList<AppCarouselItem>>(null); //lets us manually move the carousel

    async function handleOpenLink(url: string) { //runs when the user taps a carousel card
        try {
            const canOpen = await Linking.canOpenURL(url);

            if (canOpen) {
                await Linking.openURL(url)
            }

        } catch (error) {
            console.log("Could not open resource link:", error);
        }
    }

    function handleScroll(event: NativeSyntheticEvent<NativeScrollEvent>) { //runs when carousel  is scrolling
        const offsetX = event.nativeEvent.contentOffset.x; //this gets how far the user has scrolled horizontally
        const index = Math.round(offsetX / (CARD_WIDTH + CARD_SPACING)); //this works out which card is active
        setActiveIndex(index)
    } 

    return (
        <View style={styles.wrapper}>
            <View style={styles.headerRow}>
                <Text style={styles.title}>{title}</Text>
            </View>

            <FlatList
                ref={flatListRef}
                data={items}
                keyExtractor={(item) => item.title}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={CARD_WIDTH + CARD_SPACING} //snap to nearest card
                decelerationRate={"fast"}
                bounces={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                ItemSeparatorComponent={() => <View style={{ width: CARD_SPACING }} />} //adds space between each image
                renderItem={({ item }) => (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => handleOpenLink(item.url)}
                    >
                        <View style={styles.card}>
                            <ImageBackground
                                source={item.image}
                                resizeMode="cover"
                                style={styles.image}
                                imageStyle={styles.imageRadius}
                            >

                                {item.tag ? (
                                    <View style={styles.tag}>
                                        <Text style={styles.tagText}>{item.tag}</Text>
                                    </View>
                                ) : null}

                                <View style={styles.textPanel}>
                                    <Text style={styles.cardTitle}>{item.title}</Text>

                                    <Text style={styles.cardDescription}>
                                        {item.description}
                                    </Text>

                                    <View style={styles.linkRow}>
                                        <Text style={styles.linkText}>Learn more</Text>
                                        <Ionicons
                                            name="arrow-forward"
                                            size={15}
                                            color={theme.colors.primaryDark}
                                        />
                                    </View>
                                </View>
                            </ImageBackground>
                        </View>
                    </TouchableOpacity>
                )}
            />
         <View style={styles.dotsRow}>
                {items.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            activeIndex === index && styles.activeDot,
                        ]}
                    />
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: "100%",
        marginTop: theme.spacing.md,
    },

    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 12,
        paddingHorizontal: 4,
    },

    title: {
        fontSize: 20,
        fontWeight: "900",
        color: theme.colors.primaryDark,
    },

    headerIcon: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: theme.colors.paleGreen,
        alignItems: "center",
        justifyContent: "center",
    },

    card: {
        width: CARD_WIDTH,
        height: 260,
        borderRadius: 32,
        overflow: "hidden",
        backgroundColor: "#F1ECF5",
    },

    image: {
        flex: 1,
        justifyContent: "flex-end",
    },

    imageRadius: {
        borderRadius: 32,
    },

    tag: {
        position: "absolute",
        top: 16,
        left: 16,
        backgroundColor: "rgba(255, 255, 255, 0.88)",
        borderRadius: 999,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },

    tagText: {
        fontSize: 12,
        fontWeight: "800",
        color: theme.colors.primaryDark,
    },

    textPanel: {
        margin: 14,
        padding: 16,
        borderRadius: 24,
        backgroundColor: "rgba(255, 255, 255, 0.92)",
    },

    cardTitle: {
        fontSize: 17,
        fontWeight: "900",
        color: theme.colors.primaryDark,
        marginBottom: 5,
    },

    cardDescription: {
        fontSize: 13,
        lineHeight: 18,
        color: theme.colors.text,
    },

    linkRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        marginTop: 10,
    },

    linkText: {
        fontSize: 13,
        fontWeight: "800",
        color: theme.colors.primaryDark,
    },

    dotsRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 7,
        marginTop: 14,
    },

    dot: {
        width: 7,
        height: 7,
        borderRadius: 999,
        backgroundColor: "#D8D0DD",
    },

    activeDot: {
        width: 18,
        backgroundColor: theme.colors.primaryDark,
    },
});