import { StyleSheet } from "react-native";
import { Text } from "@ui-kitten/components";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Row } from "../Row";
import { Property } from "@/types/property";
import { BulletedList } from "../BulletedList";

export const AmenitiesSection = ({property} : {property: Property}) => {
    return (
        <>
            <Text category="h5" style={styles.defaultMarginVertical}>
                Amenities
            </Text>
            <Row style={styles.row}>
                <MaterialCommunityIcons
                    name="google-circles-communities"
                    color={"black"}
                    size={24}
                />
                <Text style={styles.text} category="h6">
                    Community Amenites
                </Text>
            </Row>
            <BulletedList data={["Controlled Access"]} heading="Services"/>
            <BulletedList data={["Clubhouse", "Lounge"]} heading="Interior"/>
            <BulletedList data={["Picnic Area", "Gated", "Grill"]} heading="Outdoor Space"/>
            <BulletedList data={["Fitness Center", "Pool", "Spa", "Walking/Biking Trails"]} heading="Fitness & Recreation"/>
            
            <Row style={styles.row}>
                <MaterialCommunityIcons 
                    name="toy-brick-outline"
                    color={"black"}
                    size={24}
                />
                <Text style={styles.text} category="h6">
                    Apartment Features
                </Text>
            </Row>
            <BulletedList
                data={[
                    "Dishwasher",
                    "Disposal",
                    "Microwave",
                    "Kitchen",
                    "Refrigerator",
                    "Oven",
                    "Range",
                ]}
                heading="Kitchen"
            />
            <BulletedList
                data={[
                    "Bay window",
                    "Crown Molding",
                    "Walk-In Closets",
                    "Linen Closet",
                ]}
                heading="Living Space"
            />
            <BulletedList
                data={[
                    "Balcony",
                    "Patio",
                ]}
                heading="Outdoor Space"
            />
        </>
    )
};

const styles = StyleSheet.create({
    row: {
        alignItems: "center",
        paddingVertical: 10,
    },
    text: {
        marginLeft: 10,
    },
    defaultMarginVertical: {
        marginVertical: 10,
    }
});