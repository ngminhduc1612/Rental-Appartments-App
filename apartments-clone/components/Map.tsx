import MapView, { LatLng, Region } from "react-native-maps"
import { View, StyleSheet, Platform, TouchableOpacity } from "react-native";
import { useState, useRef, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { Property } from "@/types/property";
import { MapMarker } from "./MapMarker";
import { theme } from "@/theme";
import { Card } from "./Card";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "@ui-kitten/components";
import { getPropertiesInArea } from "@/data/property";

//used to persist the region if search area from the map
let mapRegion: Region | undefined = undefined;

export const Map = ({
    properties,
    mapRef,
    location,
    setLocation,
    setProperties,
    initialRegion,
}: {
    properties: Property[];
    mapRef: React.MutableRefObject<MapView | null>;
    location: string;
    setLocation: (location: string) => void;
    setProperties: (properties: Property[]) => void;
    initialRegion?: Region | undefined;
}) => {
    const [activeIndex, setActiveIndex] = useState(-1);
    const [showSearchAreaButton, setShowSearchAreaButton] = useState(false);
    const [boundingBox, setBoundingBox] = useState<number[]>([]); // dung de search properties
    const [region, setRegion] = useState<Region | undefined>(
        mapRegion ? mapRegion : undefined
    );
    const navigation = useNavigation();
    useEffect(() => {
        if (location === "Map Area") return;

        if (initialRegion) {
            setShowSearchAreaButton(false);
            setRegion(initialRegion);
        }
    }, [initialRegion])

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
        setTimeout(() => {
            mapRef.current?.animateCamera({
                center: {
                    latitude: properties[index].lat,
                    longitude: properties[index].lng
                },
            });
        }, 100)

        setTimeout(() => {
           const newRegion: Region = {
                latitude: properties[index].lat,
                latitudeDelta: region?.latitudeDelta ? region.latitudeDelta : 0.4,
                longitude: properties[index].lng,
                longitudeDelta: region?.longitudeDelta ? region.longitudeDelta : 0.4,
           }

           setRegion(newRegion);
        }, 600)

        setActiveIndex(index);
        navigation.setOptions({ tabBarStyle: { display: "none" } });
    };

    const handleSearchAreaButtonPress = () => {
        setProperties(getPropertiesInArea(boundingBox));
        setLocation("Map Area");
        mapRegion = region;
        setShowSearchAreaButton(false);
    }

    return (
        <View style={styles.container} >
            <MapView
                provider="google"
                style={styles.map}
                userInterfaceStyle={"light"}
                ref={mapRef}
                onPress={handleMapPress}
                region={region}
                onRegionChangeComplete={(region, isGesture) => {
                    if (isGesture?.isGesture) {
                        if (!showSearchAreaButton) setShowSearchAreaButton(true);

                        const newBoundingBox = [
                            region.latitude - region.latitudeDelta / 2,
                            region.latitude + region.latitudeDelta / 2,
                            region.longitude - region.longitudeDelta / 2,
                            region.longitude + region.longitudeDelta / 2,
                        ];
                        setRegion(region);
                        setBoundingBox(newBoundingBox);
                    }
                }}
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
            {showSearchAreaButton && activeIndex === -1 && (
                <Button
                    style={styles.searchAreaButton}
                    appearance={"ghost"}
                    onPress={handleSearchAreaButtonPress}
                >
                    Search Area
                </Button>
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
    },
    searchAreaButton: {
        position: "absolute",
        bottom: 30,
        zIndex: 100,
        borderRadius: 30,
        alignSelf: "center",
        backgroundColor: "white",
        borderColor: theme["color-gray"],
        borderWidth: 1,
    },
})