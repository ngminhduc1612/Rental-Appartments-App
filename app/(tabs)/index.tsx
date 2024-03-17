import { View, StyleSheet, Dimensions, Image } from "react-native";
import { Text, Button } from "@ui-kitten/components";
import { Screen } from "@/components/Screen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from '../../theme'

const LISTMARGIN = 10;
const WIDTH = Dimensions.get("screen").width - LISTMARGIN * 2;

export default function SearchScreen() {
    const property = {
        images: [
            "https://visaho.vn/upload_images/images/2022/04/01/dien-tich-can-ho-chung-cu-2-min.jpg",
            "https://scontent.fsgn14-1.fna.fbcdn.net/v/t39.30808-6/316676083_1040304227363951_1346145859235063490_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeH4913emvP93fFx9LlpGCbwG0rFVMN35CcbSsVUw3fkJ-cc6cjKxcCNeTf7q-tAYfMsa33ZWYeFeY39ii4U86b9&_nc_ohc=A9I4ksFtF4EAX-ZHDeH&_nc_ht=scontent.fsgn14-1.fna&oh=00_AfBgF0vLXAWSFTjKAgp1r6WLeFGzR5my2wlCkok2El5Ldw&oe=65F935C3"
        ],
        rentLow: 3750,
        rentHigh: 31054,
        bedroomLow: 1,
        bedroomHigh: 5,
        name: "The Duly",
        street: "London 35th St",
        city: "London",
        state: "UN State",
        zip: 33137,
        tags: ["Parking"]
    };

    return (
        <Screen style={{marginHorizontal: LISTMARGIN}}>
            <View>
                <Image source={{ uri: property.images[0] }} style={{ height: 250, width: WIDTH }} />
                <View style={{flexDirection: "row"}}>
                    <Text>${property.rentLow}-${property.rentHigh}</Text>
                </View>
            </View>
        </Screen>
    );
};