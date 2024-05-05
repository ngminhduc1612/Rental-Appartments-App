import { Animated, View } from "react-native";
import { useState, useEffect, useRef } from "react";

import { Screen } from "@/components/Screen";
import { Card } from "@/components/Card";
import { HEADERHEIGHT } from "@/constants";
import { AnimatedListHeader } from "@/components/AnimatedListHeader";
import { properties } from "@/data/property";
import { Map } from "@/components/Map";
import { SearchScreenParams } from "@/types";
import MapView from "react-native-maps";
import { useRoute } from "@react-navigation/native";

export default function SearchScreen(
    // { route }: { route: { params: SearchScreenParams } }
) {
    const route = useRoute()
    const [mapShown, setMapShown] = useState<boolean>(false)  //Maps state
    const [scrollAnimation] = useState(new Animated.Value(0));
    const mapRef = useRef<MapView | null>(null)

    useEffect(() => {
        if (route && route.params) {
            mapRef?.current?.animateCamera({
                center: {
                    latitude: Number(route.params.lat),
                    longitude: Number(route.params.lon),
                },
            });
        }
    }, [route]);

    return (
        <Screen>
            <AnimatedListHeader scrollAnimation={scrollAnimation} setMapShown={setMapShown} mapShown={mapShown} />
            {
                mapShown ? (
                    <Map
                        properties={properties}
                        mapRef={mapRef}
                        initialRegion={
                            route?.params
                                ? {
                                    latitude: Number(route.params.lat),
                                    longitude: Number(route.params.lon),
                                    latitudeDelta: 0.4,
                                    longitudeDelta: 0.4,
                                }
                                : undefined
                        }
                    />
                ) : (
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
                        contentContainerStyle={{ paddingTop: HEADERHEIGHT - 20 }}
                        bounces={false}
                        scrollEventThrottle={16}
                        data={properties}
                        keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <Card style={{ marginVertical: 5 }} property={item} />
                        )}
                    />
                )}
        </Screen>
    );
};