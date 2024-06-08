import { StyleSheet, FlatList, Dimensions, View } from "react-native";
import { properties } from "@/data/property";
import { useRoute } from "@react-navigation/native";
import { Divider, Text } from "@ui-kitten/components";
import { useQuery } from "react-query";
import axios from "axios";

import { Screen } from "@/components/Screen";
import { ImageCarousel } from "@/components/ImageCarousel";
import { PropertyHeaderSection } from "@/components/propertyDetailsSections/propertyHeaderSection";
import { theme } from "@/theme";
import { PricingAndFloorPlanSection } from "@/components/propertyDetailsSections/PricingAndFloorPlanSection";
import { AboutSection } from "@/components/propertyDetailsSections/AboutSection";
import { ContactSection } from "@/components/propertyDetailsSections/ContactSection";
import { AmenitiesSection } from "@/components/propertyDetailsSections/AmenitiesSection";
import { LeaseAndFeesSection } from "@/components/propertyDetailsSections/LeaseAndFeesSection";
import { LocationSection } from "@/components/propertyDetailsSections/LocationSection";
import { ReviewSection } from "@/components/propertyDetailsSections/ReviewSection";
import { endpoints } from "@/constants";

export default function PropertyDetailsScreen(
    // { route }: { route: { params: { propertyId: number } } }
) {
    const route = useRoute();
    const property = useQuery("selectedproperty", () => {
        return axios.get(`${endpoints.getPropertyById}${route.params.propertyID}`);
    });

    if (!property.data?.data) return <Text>Unable to get property ...</Text>; //thêm lotties vào đây

    return (
        <Screen>
            <FlatList
                data={[property.data.data]}
                keyExtractor={item => item.ID.toString()}
                renderItem={({ item }) => (
                    <>
                        {item.images ? (
                            <ImageCarousel images={item.images} indexShown imageStyle={styles.image} />
                        ) : null}
                        <View style={styles.contentContainer}>
                            <PropertyHeaderSection property={item} />
                            <Divider style={styles.divider} />
                            <PricingAndFloorPlanSection property={item} />
                            <Divider style={styles.divider} />
                            <AboutSection property={item} />
                            <Divider style={styles.divider} />
                            <ContactSection property={item} />
                            <Divider style={styles.divider} />
                            <AmenitiesSection property={item} />
                            <Divider style={styles.divider} />
                            <LeaseAndFeesSection property={item} />
                            <Divider style={styles.divider} />
                            <LocationSection property={item} />
                            <Divider style={styles.divider} />
                            <ReviewSection property={item} />
                            <Divider style={styles.divider} />
                        </View>
                    </>
                )}
            />
        </Screen>
    );
};

const styles = StyleSheet.create({
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
    }
});