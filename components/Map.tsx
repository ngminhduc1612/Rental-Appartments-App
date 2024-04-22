import MapView from "react-native-maps"
import { View, StyleSheet, Platform } from "react-native";
import { useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";

import { Property } from "@/types/property";
import { MapMarker } from "./MapMarker";
import { theme } from "@/theme";
import { Card } from "./Card";

export const Map = ({ properties }: { properties: Property[] }) => {
    const [activeIndex, setActiveIndex] = useState(-1);
    const mapRef = useRef<MapView | null>(null)
    const naigation = useNavigation()

    const handleMarkerPress = (index: number) => {
        if (Platform.OS === "ios") {
            setTimeout(() => {
                mapRef.current?.animateCamera({
                    center: {
                        latitude: properties[index].lat,
                        longitude: properties[index].lng
                    },
                });
            }, 100)
        }

        setActiveIndex(index);
        naigation.setOptions({ tabBarStyle: {display: "none"}});
    };
    return (
        <View style={styles.container} >
            <MapView style={styles.map} userInterfaceStyle={"light"} ref={mapRef}>
                {properties.map((i, index) => (
                    <MapMarker
                        lat={i.lat}
                        lng={i.lng}
                        color={
                            activeIndex === index
                                ? theme["color-info-400"]
                                : theme["color-primary-500"]
                        }
                        onPress={() => handleMarkerPress(index)}
                    />
                ))}
            </MapView>
            {activeIndex > -1 && <Card property={properties[activeIndex]} style={styles.card}/>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: "hidden"
    },
    map: {
        height: "100%",
        width: "100%"
    },
    card: {
        position: "absolute",
        bottom: 10,
        height: 360,
    }
})