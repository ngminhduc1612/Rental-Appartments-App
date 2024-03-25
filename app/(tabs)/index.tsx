import { FlatList, } from "react-native";
import { Screen } from "@/components/Screen";
import { Card } from "@/components/Card";
import { LISTMARGIN } from "@/constants";

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
                renderItem={({ item }) => (
                    <Card style={{ marginVertical: 5 }} property={item} />
                )}
            />
        </Screen>
    );
};