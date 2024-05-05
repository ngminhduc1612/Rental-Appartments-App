import MapView, { LatLng, Region } from "react-native-maps"
import { View, StyleSheet, Platform, TouchableOpacity } from "react-native";
import { useState, useRef, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { Property } from "@/types/property";
import { MapMarker } from "./MapMarker";
import { theme } from "@/theme";
import { Card } from "./Card";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const Map = ({
    properties,
    mapRef,
    initialRegion,
}: {
    properties: Property[];
    mapRef: React.MutableRefObject<MapView | null>;
    initialRegion?: Region | undefined;
}) => {
    const [activeIndex, setActiveIndex] = useState(-1);
    const navigation = useNavigation()

    // useEffect(() => {
    //     if (mapRef.current && properties.length > 0) {
    //         // Lấy vị trí của tài sản đầu tiên
    //         const firstPropertyLocation: LatLng = {
    //             latitude: properties[0].lat,
    //             longitude: properties[0].lng
    //         };

    //         // Tạo một vùng chứa tất cả các tài sản
    //         const coordinates = properties.map(property => ({
    //             latitude: property.lat,
    //             longitude: property.lng
    //         }));
    //         const region = coordinates.reduce(
    //             (acc, curr) => ({
    //                 latitude: Math.min(acc.latitude, curr.latitude),
    //                 longitude: Math.min(acc.longitude, curr.longitude),
    //                 latitudeDelta: Math.abs(acc.latitude - curr.latitude) * 1.2,
    //                 longitudeDelta: Math.abs(acc.longitude - curr.longitude) * 1.2
    //             }),
    //             { latitude: Infinity, longitude: Infinity, latitudeDelta: 0, longitudeDelta: 0 }
    //         );

    //         // Di chuyển bản đồ đến vị trí đầu tiên và điều chỉnh để hiển thị tất cả các tài sản
    //         mapRef.current.animateToRegion(region, 1000);
    //         mapRef.current.fitToCoordinates(coordinates, {
    //             edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    //             animated: true
    //         });
    //     }
    // }, [properties]);

    const unFocusProperty = () => {
        setActiveIndex(-1);
        navigation.setOptions({ tabBarStyle: { display: "flex" } });
    }

    const handleMapPress = () => {
        if (Platform.OS === "android") {
            unFocusProperty();
        }
    }

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
        navigation.setOptions({ tabBarStyle: { display: "none" } });
    };

    return (
        <View style={styles.container} >
            <MapView
                style={styles.map}
                userInterfaceStyle={"light"}
                ref={mapRef}
                onPress={handleMapPress}
                initialRegion={initialRegion ? initialRegion : undefined}
            >
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
            {activeIndex > -1 && (
                <>
                    {Platform.OS === "ios" &&
                        <TouchableOpacity style={styles.exit} onPress={unFocusProperty}>
                            <MaterialCommunityIcons
                                name="close"
                                color={theme["color-primary-500"]}
                                size={24}
                            />
                        </TouchableOpacity>}
                    <Card property={properties[activeIndex]} style={styles.card} />
                </>
            )}
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
    },
    exit: {
        backgroundColor: "#fff",
        padding: 10,
        position: "absolute",
        top: 170,
        left: 15,
        borderRadius: 30,
    }
})