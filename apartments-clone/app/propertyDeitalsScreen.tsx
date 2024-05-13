import { StyleSheet, FlatList, Dimensions, View } from "react-native";
import { properties } from "@/data/property";
import { useRoute } from "@react-navigation/native";
import { Divider } from "@ui-kitten/components";

import { Screen } from "@/components/Screen";
import { ImageCarousel } from "@/components/ImageCarousel";
import { PropertyHeaderSection } from "@/components/propertyDetailsSections/propertyHeaderSection";
import { theme } from "@/theme";

export default function PropertyDetailsScreen(
    // { route }: { route: { params: { propertyId: number } } }
) {
    const route = useRoute();
    const index = properties.findIndex(i => i.id === route.params.propertyID);
    const property = properties[index]

    return (
        <Screen>
            <FlatList
                data={[property]}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <>
                        {item.images ? (
                            <ImageCarousel images={item.images} indexShown imageStyle={styles.image}/>
                        ) : null}
                        <View style={styles.contentContainer}>
                            <PropertyHeaderSection property={item} />
                            <Divider style={styles.divider}/>
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