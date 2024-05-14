import { View, StyleSheet } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, Button } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

import { Row } from "./Row";
import { Property } from "@/types/property"
import { theme } from '../theme'
import { callPhoneNumber } from "@/utils/callPhoneNumber";

export const CardInformation = ({ property }: { property: Property }) => {
    const navigation = useNavigation();
    return <View
        style={styles.informationContainer}
    >
        <Row style={styles.rowJustification}>
            <Text category="s1">${property.rentLow.toLocaleString()} - ${property.rentHigh.toLocaleString()}</Text>
            <MaterialCommunityIcons name='heart-outline' color={theme["color-primary-500"]} size={24} />
        </Row>
        <Text category={"c1"}>
            {property.bedroomLow === 0 ? "Studio" : property.bedroomLow} -{" "} 
            {property.bedroomHigh} Beds
        </Text>
        <Text category={"c1"} style={styles.defaultMarginTop}>
            {property.name}
        </Text>
        <Text category={"c1"}>
            {property.street}
        </Text>
        <Text category={"c1"}>
            {property.city}, {property.state} {property.zip}
        </Text>
        <Text category={"c1"} style={styles.defaultMarginTop}>
            {property.tags.map((tag, index) =>
                index === property.tags.length - 1 ? tag : '${tag}, '
            )}
        </Text>
        <Row
            style={[
                styles.defaultMarginTop,
                styles.rowJustification,
            ]}
        >
            <Button
                appearance={"ghost"}
                style={[
                    {
                        borderColor: theme["color-primary-500"]
                    },
                    styles.button,
                ]}
                size="small"
                onPress={() => navigation.navigate("messageScreen", {propertyID: property.id})}
            >
                Email
            </Button>
            <Button
                style={styles.button}
                size="small"
                onPress={() => callPhoneNumber(property.phoneNumber)}
            >
                Call
            </Button>
        </Row>
    </View>

}

const styles = StyleSheet.create({
    button: {
        width: "49%"
    },
    defaultMarginTop:{
        marginTop: 5 
    }, 
    rowJustification: {
        justifyContent: "space-between"
    },
    informationContainer: {
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderColor: "#d3d3d3",
        borderWidth: 1,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    }
})