import { Platform, StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Input, Button, Text } from "@ui-kitten/components";

import { Screen } from "@/components/Screen";
import { ModalHeader } from "@/components/ModalHeader";
import { theme } from "../theme";
import { Row } from "@/components/Row";
import { useNavigation } from "@react-navigation/native";
import { getSuggestedLocations } from "@/services/location";
import { Location } from "@/types/locationIQ";

export default function FindLocationScreen() {
    const [value, setValue] = useState("");
    const [suggestions, setSuggestions] = useState<Location[]>([]);;
    const navigation = useNavigation();

    const handleChange = async (val: string) => {
        setValue(val);
        if (val.length > 2) {
            const locations = await getSuggestedLocations(val);
            if (locations.length > 0) setSuggestions(locations);
        } else if (val.length === 0) setSuggestions([])
    };

    const handleSubmitEditing = async () => {
        const locations = await getSuggestedLocations(value);
        if (locations.length > 0) {
            handleNavigate(locations[0])
        }
    };

    const handleNavigate = (location: Location) => {
        navigation.navigate("(tabs)", {
            screen: "index",
            params: {
                boundingBox: location.boundingbox,
                location: getFormattedLocationText(location),
                lat: location.lat,
                lon: location.lon,
            },
        });
    };

    const getInput = () => {
        if (Platform.OS === "ios")
            return (
                <Input
                    keyboardType="default"
                    autoFocus
                    selectionColor={theme["color-primary-500"]}
                    placeholder="Enter Location"
                    size={"large"}
                    value={value}
                    onChangeText={handleChange}
                    onSubmitEditing={handleSubmitEditing}
                    style={styles.defaultMarginTop}
                />
            );

        return (
            <Row>
                <Input
                    keyboardType="default"
                    autoFocus
                    selectionColor={theme["color-primary-500"]}
                    placeholder="Enter Location"
                    size={"large"}
                    value={value}
                    onChangeText={handleChange}
                    onSubmitEditing={handleSubmitEditing}
                    style={[styles.defaultMarginTop, { width: "80%" }]}
                />
                <Button appearance={"ghost"} status="info" onPress={navigation.goBack}>
                    Cancle
                </Button>
            </Row>
        )
    };

    const getFormattedLocationText = (item: Location) => {
        let location = item.address.name;
        if (item.type === "city" && item.address.state)
            location += ", " + item.address.state;
        return location;
    }

    const SuggestedText = ({ locationItem }: { locationItem: Location }) => {
        const location = getFormattedLocationText(locationItem);
        return (
            <Row style={styles.suggestionContainer}>
                <Text>{location}</Text>
            </Row>
        );
    }
    return (
        <Screen>
            {Platform.OS === "ios" ? <ModalHeader /> : null}
            <View style={styles.screenContent}>
                {getInput()}
                {suggestions.length > 0 ?
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={suggestions}
                        keyExtractor={(item, index) => item.place_id + index}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                onPress={() => { handleNavigate(item) }}
                            >
                                <SuggestedText locationItem={item} />
                            </TouchableOpacity>
                        )}
                    />
                    : null}
            </View>
        </Screen>
    );
};

const styles = StyleSheet.create({
    defaultMarginTop: {
        marginTop: 10,
    },
    screenContent: {
        marginHorizontal: 10,
    },
    suggestionContainer: {
        alignItems: "center",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: theme["color-gray"],
    }
});