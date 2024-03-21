import { View, ViewStyle } from "react-native";
import { Text, Button } from "@ui-kitten/components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from '../theme'
import { Property } from "@/types/property";
import { ImageCarousel } from "./ImageCarousel";

const LISTMARGIN = 10;

export const Card = ({
    property,
    style
}: {
    property: Property,
    style?: ViewStyle
}) => {
    return (
        <View style={style}>
            <ImageCarousel images={property.images} />
            <View
                style={{
                    paddingVertical: 10,
                    paddingHorizontal: 5,
                    borderColor: "#d3d3d3",
                    borderWidth: 1,
                    borderBottomLeftRadius: 5,
                    borderBottomRightRadius: 5,
                }}
            >
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text category="s1">${property.rentLow.toLocaleString()} - ${property.rentHigh.toLocaleString()}</Text>
                    <MaterialCommunityIcons name='heart-outline' color={theme["color-primary-500"]} size={24} />
                </View>
                <Text category={"c1"}>
                    {property.bedroomLow} - {property.bedroomHigh} Beds
                </Text>
                <Text category={"c1"} style={{ marginTop: 5 }}>
                    {property.name}
                </Text>
                <Text category={"c1"}>
                    {property.street}
                </Text>
                <Text category={"c1"}>
                    {property.city}, {property.state} {property.zip}
                </Text>
                <Text category={"c1"} style={{ marginTop: 5 }}>
                    {property.tags.map((tag, index) =>
                        index === property.tags.length - 1 ? tag : '${tag}, '
                    )}
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        marginTop: 5,
                        justifyContent: "space-between"
                    }}
                >
                    <Button
                        appearance={"ghost"}
                        style={{
                            borderColor: theme["color-primary-500"],
                            width: "49%"
                        }}
                        size="small"
                        onPress={() => console.log("email the item manager")}
                    >
                        Email
                    </Button>
                    <Button
                        style={{
                            width: "49%"
                        }}
                        size="small"
                        onPress={() => console.log("call the property manager")}
                    >
                        Call
                    </Button>
                </View>
            </View>

        </View>)
}