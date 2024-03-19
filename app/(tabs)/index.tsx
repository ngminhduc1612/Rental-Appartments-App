import { View, StyleSheet, Dimensions, Image, FlatList, Pressable } from "react-native";
import { Text, Button } from "@ui-kitten/components";
import { Screen } from "@/components/Screen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from '../../theme'
import { useRef, useState } from "react";
import { Card } from "@/components/Card";

const LISTMARGIN = 10;
const WIDTH = Dimensions.get("screen").width - LISTMARGIN * 2;

export default function SearchScreen() {
    const properties = [{
        id: 1,
        images: [
            "https://visaho.vn/upload_images/images/2022/04/01/dien-tich-can-ho-chung-cu-2-min.jpg",
            "https://vcdn-kinhdoanh.vnecdn.net/2019/12/23/image002-8881-1577094450.png"
        ],
        rentLow: 3750,
        rentHigh: 31054,
        bedroomLow: 1,
        bedroomHigh: 5,
        name: "The Duly",
        street: "London 35th St",
        city: "Miami",
        state: "Floria",
        zip: 33137,
        tags: ["Parking"]
        },
        {
            id: 2,
            images: [
                "https://visaho.vn/upload_images/images/2022/04/01/dien-tich-can-ho-chung-cu-2-min.jpg",
                "https://vcdn-kinhdoanh.vnecdn.net/2019/12/23/image002-8881-1577094450.png"
            ],
            rentLow: 3750,
            rentHigh: 31054,
            bedroomLow: 1,
            bedroomHigh: 5,
            name: "The Duly 2",
            street: "Hola 35th St",
            city: "Miami",
            state: "Floria",
            zip: 33137,
            tags: ["Parking"]
        }
    ];

    return (
        <Screen style={{ marginHorizontal: LISTMARGIN }}>
            <FlatList 
                data={properties} 
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                    <Card property={item}/>
                )}
            />
        </Screen>
    );
};