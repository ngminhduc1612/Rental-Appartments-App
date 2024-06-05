import { StyleSheet, View } from "react-native";
import { Text, CheckBox } from "@ui-kitten/components";
import { memo } from "react";

import { ModalHeader } from "./ModalHeader";
import { unitAmenities, kitchenAmenities, livingSpaceAmenities, outdoorAmenities } from "@/constants/unitAmenities";

const AmenityCheckBox = memo(({
    name,
    onPress,
    checked,
}: {
    name: string;
    onPress: () => void;
    checked: boolean;
}) => {
    return (
        <CheckBox
            checked={checked}
            style={styles.defaultMarginVertical}
            onChange={onPress}
        >
            {name}
        </CheckBox>
    )
})
export const UnitAmenities = ({
    amenities,
    field,
    setAmenites,
    cancel,
}: {
    amenities: string[];
    field: string;
    setAmenites: (field: string, values: any) => void;
    cancel?: () => void;
}) => {
    const amenitiesMap = new Map<string, boolean>();
    unitAmenities.forEach((i) => amenitiesMap.set(i, false));
    kitchenAmenities.forEach((i) => amenitiesMap.set(i, false));
    livingSpaceAmenities.forEach((i) => amenitiesMap.set(i, false));
    outdoorAmenities.forEach((i) => amenitiesMap.set(i, false));
    amenities.forEach((i) => {
        amenitiesMap.set(i, true);
    });

    const handleAddAmenity = (name: string) => {
        amenitiesMap.set(name, true);
        const newAmenities = [...amenities];
        newAmenities.push(name);
        setAmenites(field, newAmenities);
    };

    const handleDeleteAmenity = (name: string) => {
        amenitiesMap.set(name, false);
        const newAmenities = amenities.filter((i) => i !== name);
        setAmenites(field, newAmenities);
    };

    return (
        <View>
            <ModalHeader
                XShown
                text="Unit Amenities"
                onPress={cancel ? cancel : undefined}
            />
            <Text category="h6" style={styles.header}>
                Features
            </Text>
            {unitAmenities.map((i) => (
                <AmenityCheckBox
                    name={i}
                    key={i}
                    onPress={
                        amenitiesMap.get(i)
                            ? () => handleDeleteAmenity(i)
                            : () => handleAddAmenity(i)
                    }
                    checked={amenitiesMap.get(i) ? true : false}
                />
            ))}
            <Text category="h6" style={styles.header}>
                Kitchen
            </Text>
            {kitchenAmenities.map((i) => (
                <AmenityCheckBox
                    name={i}
                    key={i}
                    onPress={
                        amenitiesMap.get(i)
                            ? () => handleDeleteAmenity(i)
                            : () => handleAddAmenity(i)
                    }
                    checked={amenitiesMap.get(i) ? true : false}
                />
            ))}
            <Text category="h6" style={styles.header}>
                Living Space
            </Text>
            {livingSpaceAmenities.map((i) => (
                <AmenityCheckBox
                    name={i}
                    key={i}
                    onPress={
                        amenitiesMap.get(i)
                            ? () => handleDeleteAmenity(i)
                            : () => handleAddAmenity(i)
                    }
                    checked={amenitiesMap.get(i) ? true : false}
                />
            ))}
            <Text category="h6" style={styles.header}>
                Outdoors
            </Text>
            {outdoorAmenities.map((i) => (
                <AmenityCheckBox
                    name={i}
                    key={i}
                    onPress={
                        amenitiesMap.get(i)
                            ? () => handleDeleteAmenity(i)
                            : () => handleAddAmenity(i)
                    }
                    checked={amenitiesMap.get(i) ? true : false}
                />
            ))}
        </View>

    );
};

const styles = StyleSheet.create({
    header: {
        marginTop: 10,
        marginBottom: 20,
    },
    defaultMarginVertical: {
        marginVertical: 10,
    }
})