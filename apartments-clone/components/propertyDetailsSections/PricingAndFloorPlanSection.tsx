import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { Text, Divider } from "@ui-kitten/components";

import { Property } from "@/types/property";
import { TabBar } from "../TabBar";
import { theme } from "@/theme";
import { Row } from "../Row";

export const PricingAndFloorPlanSection = ({
    property
}: {
    property: Property
}) => {
    const [currentApartments, setCurrentApartments] = useState(
        property.apartments
    );

    useEffect(() => {
        if (property.apartments !== currentApartments) {
            setCurrentApartments(property.apartments);
        }
    }, [property]);

    const filterByBedroom = (
        numOfBedrooms: number,
        equalityType: "gt" | "eq"
    ) => {
        if (property.apartments) {
            let filtered;

            if (equalityType === "eq") {
                filtered = property.apartments.filter(
                    (i) => i.bedrooms === numOfBedrooms
                );
            } else {
                filtered = property.apartments.filter(
                    (i) => i.bedrooms > numOfBedrooms
                )
            };
            setCurrentApartments(filtered);
        }
    };

    const floorPlanOptions = [
        {
            title: "All",
            onPress: () => setCurrentApartments(property.apartments),
        },
        {
            title: "Studio",
            onPress: () => filterByBedroom(0, "eq"),
        },
        {
            title: "1 Bedroomm",
            onPress: () => filterByBedroom(1, "eq"),
        },
        {
            title: "2 Bedroomm",
            onPress: () => filterByBedroom(2, "eq"),
        },
        {
            title: "3+ Bedroomm",
            onPress: () => filterByBedroom(3, "gt"),
        },
    ]

    return (<>
        <Text category="h5" style={styles.defaultMarginVertical}>
            Pricing & Floor Plans
        </Text>
        <TabBar tabs={floorPlanOptions} style={styles.defaultMarginVertical} />
        {currentApartments && currentApartments.length > 0 ? (
            currentApartments.map((i) => (
                <View
                    style={[styles.container, styles.defaultMarginVertical]}
                    key={i.ID.toString()}
                >
                    <Row>
                        <View style={styles.apartmentLogisticsContainer}>
                            <Text style={styles.apartmentLogisticsTitle}>
                                {i.bedrooms === 0 ? "Studio" : i.bedrooms + " Bed"}{" "}
                                {i.bathrooms} Bath
                            </Text>
                            <Text style={styles.apartmentLogisticsMargin} category={"c1"}>
                                ${i.rent.toLocaleString("en-US")}
                            </Text>
                            <Text style={styles.apartmentLogisticsMargin} category={"c1"}>
                                {i.bedrooms === 0 ? "Studio" : i.bedrooms + " Bed, "}{" "}
                                {i.bathrooms + " Bath, "}{" "}
                                {i.sqFt.toLocaleString("en-US") + " sqrt"}
                            </Text>
                        </View>
                        {i.images && i.images.length > 0 && (
                            <Image source={{ uri: i.images[0] }} style={styles.image} />
                        )}
                    </Row>
                    {/* Availablle now part */}
                    <Row style={styles.availableNowContainer}>
                        <Text category={"c1"} style={{ fontWeight: "600" }}>
                            Available: Now
                        </Text>
                        <TouchableOpacity
                            onPress={() => console.log("navigate to floor plan details")}
                        >
                            <Text category={"c1"} status="info">
                                Floor Plan Details
                            </Text>
                        </TouchableOpacity>
                    </Row>
                    {/* conditional part if apartments available */}
                    <Divider style={styles.divider} />
                    <Row style={styles.defaultMarginVertical}>
                        <Text category={"c1"} style={styles.layeredText}>
                            Unit
                        </Text>
                        <Text category={"c1"} style={styles.layeredText}>
                            Price
                        </Text>
                        <Text category={"c1"} style={styles.layeredText}>
                            Sq Ft
                        </Text>
                        <Text category={"c1"} style={styles.availableText}>
                            Availability
                        </Text>
                    </Row>
                    <Divider style={styles.divider} />
                    <Row style={styles.defaultMarginVertical}>
                        <Text category={"c1"} style={styles.layeredText}>
                            {i.unit}:
                        </Text>
                        <Text category={"c1"} style={styles.layeredText}>
                            {i.rent.toLocaleString("en-US")}
                        </Text>
                        <Text category={"c1"} style={styles.layeredText}>
                            {i.sqFt.toLocaleString("en-US")}
                        </Text>
                        <Text category={"c1"} style={styles.availableText}>
                            {new Date().toLocaleDateString("en", {
                                year: "numeric",
                                month: "2-digit",
                                day: "numeric",
                            })}
                        </Text>
                    </Row>
                    <Divider style={styles.divider} />
                </View>
            ))
        ) : (
            <Text style={styles.apartmentLogisticsTitle}>No Apartments Listed</Text>
        )}
    </>)
};

const styles = StyleSheet.create({
    defaultMarginVertical: {
        marginTop: 10,
    },
    container: {
        padding: 10,
        width: "100%",
        borderColor: theme["color-gray"],
        borderWidth: 1,
        borderRadius: 5,
    },
    apartmentLogisticsContainer: {
        flexShrink: 1,
        width: "90%",
        paddingRight: 10,
        marginTop: -5,
    },
    apartmentLogisticsTitle: { fontSize: 16, fontWeight: "600" },
    apartmentLogisticsMargin: { marginTop: 1 },
    image: {
        height: 60,
        width: 60,
        borderRadius: 5,
        borderColor: theme["color-gray"],
        borderWidth: 1,
    },
    availableNowContainer: {
        marginTop: 15,
        justifyContent: "space-between",
    },
    divider: {
        backgroundColor: theme["color-gray"],
        marginTop: 5,
    },
    layeredText: { width: "21%" },
    availableText: { width: "37%" },
});