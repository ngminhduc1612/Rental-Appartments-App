import { Animated, StyleSheet, View } from "react-native";
import { useState, useEffect, useRef } from "react";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

import { Screen } from "@/components/Screen";
import { Card } from "@/components/Card";
import { HEADERHEIGHT } from "@/constants";
import { AnimatedListHeader } from "@/components/AnimatedListHeader";
import { getPropertiesInArea } from "@/data/property";
import { Map } from "@/components/Map";
import { SearchScreenParams } from "@/types";
import MapView from "react-native-maps";
import { useRoute } from "@react-navigation/native";
import { Property } from "@/types/property";
import { Text } from "@ui-kitten/components";

export default function SearchScreen(
    // { route }: { route: { params: SearchScreenParams } }
) {
    const route = useRoute()
    const [mapShown, setMapShown] = useState<boolean>(false)  //Maps state
    const [scrollAnimation] = useState(new Animated.Value(0));
    const mapRef = useRef<MapView | null>(null)
    const [properties, setProperties] = useState<Property[]>([]); //Hiển thị mark ở vùng đó hay không
    const [location, setLocation] = useState<string | undefined>(undefined);
    const navigation = useNavigation();

    useEffect(() => {
        if (route && route.params) {
            const numBoundingBox = [
                Number(route.params.boundingBox[0]),
                Number(route.params.boundingBox[1]),
                Number(route.params.boundingBox[2]),
                Number(route.params.boundingBox[3]),
            ];

            setLocation(route.params.location);

            setProperties(getPropertiesInArea(numBoundingBox));
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
                    properties ? properties.length : undefined
                }
            />
            {
                mapShown ? (
                    <Map
                        properties={properties}
                        mapRef={mapRef}
                        location={location ? location : "Find a Location"}
                        setLocation={setLocation}
                        setProperties={setProperties}
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
                        {properties.length > 0 ? (
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
                                    <Card style={{ marginVertical: 5 }} property={item} onPress={() => navigation.navigate("propertyDeitalsScreen", { propertyID: item.id })}/>
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