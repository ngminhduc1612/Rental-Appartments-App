import { Animated, StyleSheet, View } from "react-native";
import { useState, useEffect, useRef } from "react";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "react-query";
import axios from "axios";

import { Screen } from "@/components/Screen";
import { Card } from "@/components/Card";
import { HEADERHEIGHT, endpoints, queryKeys } from "@/constants";
import { AnimatedListHeader } from "@/components/AnimatedListHeader";
import { getPropertiesInArea } from "@/data/property";
import { Map } from "@/components/Map";
import { SearchScreenParams } from "@/types";
import MapView from "react-native-maps";
import { useRoute } from "@react-navigation/native";
import { Property } from "@/types/property";
import { Text } from "@ui-kitten/components";
import { useSearchPropertiesQuery } from "@/hooks/queries/useSearchPropertiesQuery";

export default function SearchScreen(
    // { route }: { route: { params: SearchScreenParams } }
) {
    const navigation = useNavigation();
    const route = useRoute()
    const [mapShown, setMapShown] = useState<boolean>(false)  //Maps state
    const [scrollAnimation] = useState(new Animated.Value(0));
    const mapRef = useRef<MapView | null>(null)
    const [location, setLocation] = useState<string | undefined>(undefined);
    let boundingBox: number[] = [];
    if (route.params?.boundingBox)
        boundingBox = [
            Number(route.params.boundingBox[0]),
            Number(route.params.boundingBox[1]),
            Number(route.params.boundingBox[2]),
            Number(route.params.boundingBox[3]),
        ];
    const searchProperties = useSearchPropertiesQuery(boundingBox);

    useEffect(() => {
        if (route && route.params) {
            setLocation(route.params.location);
            searchProperties.refetch();

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
            <AnimatedListHeader
                scrollAnimation={scrollAnimation}
                setMapShown={setMapShown}
                mapShown={mapShown}
                location={location ? location : "Find a Location"}
                availableProperties={
                    searchProperties.data
                        ? searchProperties.data.length
                        : undefined
                }
            />
            {
                mapShown ? (
                    <Map
                        properties={searchProperties?.data ? searchProperties.data : []}
                        mapRef={mapRef}
                        location={location ? location : "Find a Location"}
                        setLocation={setLocation}
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
                    <>
                        {searchProperties.data && searchProperties.data?.length > 0 ? (
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
                                data={searchProperties?.data}
                                keyExtractor={(item) => item.ID.toString()}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item }) => (
                                    <Card style={{ marginVertical: 5 }} property={item} onPress={() => navigation.navigate("propertyDeitalsScreen", { propertyID: item.ID })} />
                                )}
                            />
                        ) : (
                            <>
                                {route?.params ?
                                    <View style={styles.lottieContainer}>
                                        <Text category="h6">No Properties Found</Text>
                                        <Text appearance="hint">
                                            Please search in a different location
                                        </Text>
                                    </View>
                                    :
                                    <View style={styles.lottieContainer}>
                                        <LottieView
                                            autoPlay
                                            loop
                                            style={styles.lottie}
                                            source={require("../../assets/lotties/SearchScreen.json")}
                                        />
                                        <Text category="h6">Begin Your Search</Text>
                                        <Text appearance="hint">
                                            Find appartments anytime and anywhere.
                                        </Text>
                                    </View>
                                }
                            </>
                        )}

                    </>
                )}
        </Screen>
    );
};

const styles = StyleSheet.create({
    lottieContainer: {
        backgroundColor: "#fff",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    lottie: {
        height: 450,
        width: 450,
    }
})