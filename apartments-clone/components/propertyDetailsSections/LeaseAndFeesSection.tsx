import { StyleSheet, FlatList } from "react-native";
import { Text } from "@ui-kitten/components";
import { MaterialIcons } from "@expo/vector-icons";

import { Property } from "@/types/property";
import { Row } from "../Row";
import { Petcard } from "../PetCard";
import { GeneralTextCard } from "../GeneralTextCard";


export const LeaseAndFeesSection = ({ property }: { property: Property }) => {
    return (
        <>
            <Text category={"h5"} style={styles.defaultMarginVertical}>
                Lease Detail & Fees
            </Text>
            {property.pets ? (
                <>
                    <Row style={styles.row}>
                        <MaterialIcons name="pets" color={"black"} size={24} />
                        <Text category="h6" style={styles.rowText}>
                            Pet Policies
                        </Text>
                    </Row>
                    <FlatList
                        style={styles.defaultMarginVertical}
                        horizontal
                        data={property.pets}
                        renderItem={({ item }) => <Petcard pet={item} style={styles.petCard} />}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.type}
                    />
                </>
            ) : null}
            {/* Làm thêm đoạn này giống đoạn trên pet*/}
            <Row style={styles.row}>
                <MaterialIcons name="attach-money" color={"black"} size={24} />
                <Text category="h6" style={styles.rowText}>
                    Fees
                </Text>
            </Row>
            <FlatList
                style={styles.defaultMarginVertical}
                horizontal
                data={[
                    {
                        heading: "Parking",
                        body: ["Others"]
                    },
                    {
                        heading: "Electric",
                        body: [
                            "Free",
                        ],
                    },
                    {
                        heading: "Water",
                        body: [
                            "Not Free",
                        ],
                    },
                ]
                }
                renderItem={({ item }) => (
                    <GeneralTextCard
                        heading={item.heading}
                        body={item.body}
                        style={styles.textCard}
                    />
                )}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.heading}
            />

            <Row style={[styles.row, { paddingTop: 10 }]}>
                <MaterialIcons name="list-alt" color={"black"} size={24} />
                <Text category="h6" style={styles.rowText}>
                    Details
                </Text>
            </Row>
            <FlatList
                style={styles.defaultMarginVertical}
                horizontal
                data={[
                    {
                        heading: "lease options",
                        body: ["12 months"]
                    },
                    {
                        heading: "proderty information",
                        body: [
                            "Built in 2017",
                            "Apartment Community",
                            "242 units/5 stories",
                        ],
                    },
                ]}
                renderItem={({ item }) => (
                    <GeneralTextCard
                        heading={item.heading}
                        body={item.body}
                        style={styles.textCard}
                    />
                )}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.heading}
            />
        </>
    )
};

const styles = StyleSheet.create({
    defaultMarginVertical: {
        marginVertical: 10
    },
    row: {
        alignItems: "center",
        marginVertical: 15,
    },
    rowText: {
        marginLeft: 10,
    },
    petCard: {
        marginRight: 15,
    },
    textCard: {
        marginRight: 10,
    }
})