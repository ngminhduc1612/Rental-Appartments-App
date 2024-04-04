import { FlatList, Animated, LayoutChangeEvent } from "react-native";
import { useState } from "react";

import { Screen } from "@/components/Screen";
import { Card } from "@/components/Card";
import { HEADERHEIGHT, LISTMARGIN } from "@/constants";

export default function SearchScreen() {
    const properties = [{
        id: 1,
        images: [
            "https://visaho.vn/upload_images/images/2022/04/01/dien-tich-can-ho-chung-cu-2-min.jpg",
            "https://vcdn-kinhdoanh.vnecdn.net/2019/12/23/image002-8881-1577094450.png"
        ],
        rentLow: 3750,
        rentHigh: 31054,
        bedroomLow: 1,
        bedroomHigh: 5,
        name: "The Duly",
        street: "London 35th St",
        city: "Miami",
        state: "Floria",
        zip: 33137,
        tags: ["Parking"]
    },
    {
        id: 2,
        images: [
            "https://visaho.vn/upload_images/images/2022/04/01/dien-tich-can-ho-chung-cu-2-min.jpg",
            "https://vcdn-kinhdoanh.vnecdn.net/2019/12/23/image002-8881-1577094450.png"
        ],
        rentLow: 3750,
        rentHigh: 31054,
        bedroomLow: 1,
        bedroomHigh: 5,
        name: "The Duly 2",
        street: "Hola 35th St",
        city: "Miami",
        state: "Floria",
        zip: 33137,
        tags: ["Parking"]
    },
    {
        id: 3,
        images: [
            "https://visaho.vn/upload_images/images/2022/04/01/dien-tich-can-ho-chung-cu-2-min.jpg",
            "https://vcdn-kinhdoanh.vnecdn.net/2019/12/23/image002-8881-1577094450.png"
        ],
        rentLow: 3750,
        rentHigh: 31054,
        bedroomLow: 1,
        bedroomHigh: 5,
        name: "The Duly 2",
        street: "Hola 35th St",
        city: "Miami",
        state: "Floria",
        zip: 33137,
        tags: ["Parking"]
    },
    {
        id: 4,
        images: [
            "https://visaho.vn/upload_images/images/2022/04/01/dien-tich-can-ho-chung-cu-2-min.jpg",
            "https://vcdn-kinhdoanh.vnecdn.net/2019/12/23/image002-8881-1577094450.png"
        ],
        rentLow: 3750,
        rentHigh: 31054,
        bedroomLow: 1,
        bedroomHigh: 5,
        name: "The Duly 2",
        street: "Hola 35th St",
        city: "Miami",
        state: "Floria",
        zip: 33137,
        tags: ["Parking"]
    },
    {
        id: 5,
        images: [
            "https://visaho.vn/upload_images/images/2022/04/01/dien-tich-can-ho-chung-cu-2-min.jpg",
            "https://vcdn-kinhdoanh.vnecdn.net/2019/12/23/image002-8881-1577094450.png"
        ],
        rentLow: 3750,
        rentHigh: 31054,
        bedroomLow: 1,
        bedroomHigh: 5,
        name: "The Duly 2",
        street: "Hola 35th St",
        city: "Miami",
        state: "Floria",
        zip: 33137,
        tags: ["Parking"]
    }
    ];

    const [scrollAnimation] = useState(new Animated.Value(0));
    const [offsetAnimation] = useState(new Animated.Value(0));
    const [clampedScroll, setClampedScroll] = useState(
        Animated.diffClamp(
            Animated.add(
                scrollAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                    extrapolateLeft: "clamp"
                }),
                offsetAnimation
            ),
            0,
            1
        )
    );

    const navbarTranslate = clampedScroll.interpolate({
        inputRange: [0, HEADERHEIGHT],
        outputRange: [0, -HEADERHEIGHT],
        extrapolate: "clamp",
    });

    const onLayout = (event: LayoutChangeEvent) => {
        let { height } = event.nativeEvent.layout
        setClampedScroll(
            Animated.diffClamp(
                Animated.add(
                    scrollAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                        extrapolateLeft: "clamp"
                    }),
                    offsetAnimation
                ),
                0,
                height
            )
        )
    }

    return (
        <Screen>
            <Animated.View
                style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    left: 0,
                    zIndex: 1000,
                    height: HEADERHEIGHT,
                    backgroundColor: "#fff",
                    transform: [{ translateY: navbarTranslate }],
                }}
                onLayout={onLayout}
            ></Animated.View>

            <Animated.FlatList
                onScroll={Animated.event([
                    {
                        nativeEvent: {
                            contentOffset: {
                                y: scrollAnimation,
                            },
                        },
                    },
                ],
                    { useNativeDriver: true }
                )}
                contentContainerStyle={{paddingTop: HEADERHEIGHT + 20}}
                bounces={false}
                scrollEventThrottle={16}
                data={properties}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                style={{ marginHorizontal: LISTMARGIN }}
                renderItem={({ item }) => (
                    <Card style={{ marginVertical: 5 }} property={item} />
                )}
            />
        </Screen>
    );
};