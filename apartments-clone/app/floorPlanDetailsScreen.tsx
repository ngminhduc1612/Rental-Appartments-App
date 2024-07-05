import { StyleSheet, FlatList, Dimensions, View } from "react-native";

import { Screen } from "@/components/Screen";
import { Divider, Text } from "@ui-kitten/components";
import { useRoute } from "@react-navigation/native";
import { ImageCarousel } from "@/components/ImageCarousel";
import { useApartmentQuery } from "@/hooks/queries/useApartmentQuery";
import { Loading } from "@/components/Loading";
import { theme } from "@/theme";
import { Row } from "@/components/Row";

export default function FloorPlanDetailsScreen() {
    const route = useRoute();
    const { data, isLoading } = useApartmentQuery(route.params.apartmentID);
    const apartment = data[0];


    if (isLoading) return <Loading />;

    return (
        <Screen>
            <View style={styles.container}>
                {apartment.images ? (
                    <ImageCarousel images={apartment.images} indexShown imageStyle={styles.image} />
                ) : null}
                {apartment.unit ? (
                    <Text category={"h5"} style={styles.defaultMarginTop}>
                        Unit {apartment.unit}:
                    </Text>
                ) : null}
                <Divider style={styles.divider} />
                <Text category="h5" style={styles.defaultMarginVertical}>
                    Detailed Information
                </Text>
                <Text style={styles.layeredText}>
                    Number of bedrooms: {apartment.bedrooms}
                </Text>
                <Text style={styles.layeredText}>
                    Number of bathrooms: {apartment.bathrooms}
                </Text>
                <Text style={styles.layeredText}>
                    Area: {apartment.sqFt.toLocaleString("en-US")} Sq Ft
                </Text>
                <Divider style={styles.divider} />
                <Text category={"h5"} style={styles.defaultMarginTop}>
                    Description
                </Text>
                {apartment.description ? (
                    <Text >
                        {apartment.description}
                    </Text>
                ) : <Text >
                    This unit does not have description!
                </Text>}
                <Divider style={styles.divider} />
                <Text category="h5" style={styles.defaultMarginVertical}>
                    Terms and Conditions
                </Text>
                <Text style={styles.layeredText}>
                    Price: ${apartment.rent.toLocaleString("en-US")}
                </Text>
                <Text style={styles.layeredText}>
                    Deposit: ${apartment.deposit.toLocaleString("en-US")}
                </Text>
                <Text style={styles.layeredText}>
                    Lease length: ${apartment.leaseLength}
                </Text>
                <Divider style={styles.divider} />
                <Text category="h4" style={{ color: theme["color-primary-500"] }}>
                    Available: {apartment.active === false ? "None" : new Date(apartment.availableOn).toLocaleDateString()}
                </Text>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginTop: 20,
    },
    image: {
        width: Dimensions.get("window").width,
        height: 250,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
    },
    contentContainer: {
        marginHorizontal: 10
    },
    divider: {
        backgroundColor: theme["color-gray"],
        marginTop: 10,
    },
    defaultMarginVertical: {
        marginVertical: 10
    },
    containerRow: {
        justifyContent: "space-between",
    },
    iconRow: {
        padding: 5,
    },
    shareIcon: {
        marginRight: 20,
        marginTop: 0,
    },
    defaultMarginTop: {
        marginTop: 10,
    },
    layeredText: { flexDirection: 'row' },
    availableText: { width: "50%" },
});