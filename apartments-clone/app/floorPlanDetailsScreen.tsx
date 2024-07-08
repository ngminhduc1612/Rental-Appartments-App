import { StyleSheet, ScrollView, Dimensions, View } from "react-native";
import { Screen } from "@/components/Screen";
import { Divider, Text, Card, Layout } from "@ui-kitten/components";
import { useRoute } from "@react-navigation/native";
import { ImageCarousel } from "@/components/ImageCarousel";
import { useApartmentQuery } from "@/hooks/queries/useApartmentQuery";
import { Loading } from "@/components/Loading";
import { theme } from "@/theme";

export default function FloorPlanDetailsScreen() {
    const route = useRoute();
    const { data, isLoading } = useApartmentQuery(route.params.apartmentID);
    const apartment = data ? data[0] : null;

    if (isLoading) return <Loading />;
    if (!apartment) return <Text>Apartment not found</Text>;

    return (
        <Screen>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                {apartment.images ? (
                    <ImageCarousel images={apartment.images} indexShown imageStyle={styles.image} />
                ) : null}
                <Card style={styles.card}>
                    {apartment.unit && (
                        <Text category={"h5"} style={styles.unitText}>
                            {apartment.unit}
                        </Text>
                    )}
                    <Divider style={styles.divider} />
                    <Text category="h5" style={styles.sectionHeader}>
                        Detailed Information
                    </Text>
                    <Text style={styles.detailText}>
                        Number of bedrooms: {apartment.bedrooms}
                    </Text>
                    <Text style={styles.detailText}>
                        Number of bathrooms: {apartment.bathrooms}
                    </Text>
                    <Text style={styles.detailText}>
                        Area: {apartment.sqFt.toLocaleString("en-US")} Sq Ft
                    </Text>
                    <Divider style={styles.divider} />
                    <Text category={"h5"} style={styles.sectionHeader}>
                        Description
                    </Text>
                    <Text style={styles.descriptionText}>
                        {apartment.description || "This unit does not have a description!"}
                    </Text>
                    <Divider style={styles.divider} />
                    <Text category="h5" style={styles.sectionHeader}>
                        Terms and Conditions
                    </Text>
                    <Text style={styles.detailText}>
                        Price: ${apartment.rent.toLocaleString("en-US")}
                    </Text>
                    <Text style={styles.detailText}>
                        Deposit: ${apartment.deposit.toLocaleString("en-US")}
                    </Text>
                    <Text style={styles.detailText}>
                        Lease length: {apartment.leaseLength}
                    </Text>
                    <Divider style={styles.divider} />
                    <Text category="h4" style={styles.availableText}>
                        Available: {apartment.active === false ? "None" : new Date(apartment.availableOn).toLocaleDateString()}
                    </Text>
                </Card>
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    image: {
        width: Dimensions.get("window").width - 40,
        height: 250,
        borderRadius: 10,
        marginBottom: 20,
    },
    card: {
        padding: 20,
        borderRadius: 10,
        backgroundColor: theme["color-basic-100"],
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    unitText: {
        marginBottom: 10,
        color: theme["color-primary-500"],
    },
    divider: {
        backgroundColor: theme["color-gray"],
        marginVertical: 10,
    },
    sectionHeader: {
        marginVertical: 10,
        fontWeight: "bold",
    },
    detailText: {
        marginVertical: 5,
        color: theme["color-basic-600"],
    },
    descriptionText: {
        marginVertical: 5,
        color: theme["color-basic-700"],
    },
    availableText: {
        marginTop: 20,
        color: theme["color-primary-500"],
        textAlign: "center",
    },
});
