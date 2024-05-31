import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import { Input, Text } from "@ui-kitten/components";
import { View, StyleSheet } from "react-native";
import { useState } from "react";
import { Formik } from "formik";
import { PickerItem } from "react-native-woodpicker";

import { Screen } from "./Screen";
import { ModalHeader } from "./ModalHeader";
import { Row } from "./Row";
import { UnitButton } from "./UnitButton";
import { SearchLocation } from "@/types/locationIQ";
import { SearchAddress } from "./SearchAddress";
import { getStateAbbreviation } from "@/utils/getStateAbbreviation";
import { Select } from "./Select";

export const AddPropertySection = () => {
    const [searchingLocation, setSearchingLocation] = useState(false);
    const [suggestions, setSuggestions] = useState<SearchLocation[]>([]);

    const handleGoBack = () => {
        setSearchingLocation(false);
    }

    return (
        <KeyboardAwareFlatList
            data={[1]}
            renderItem={() => {
                return (
                    <Screen>
                        {!searchingLocation && <ModalHeader text="DH Apartments" XShown />}
                        <View style={styles.container}>
                            {!searchingLocation && <Text category="h5" style={styles.header}>
                                Add a Property
                            </Text>
                            }
                            <Formik
                                initialValues={{
                                    unitType: "single",
                                    street: "",
                                    city: "",
                                    state: "",
                                    zip: "",
                                    lat: "",
                                    lng: "",
                                    propertyTypes: propertyTypes[0],
                                    unit: {
                                        bedrooms: bedValues[0],
                                        bathrooms: bathValues[0],
                                    },
                                }}
                                onSubmit={(values) => console.log(values)}
                            >
                                {({
                                    values,
                                    errors,
                                    touched,
                                    handleSubmit,
                                    setFieldTouched,
                                    setFieldValue,
                                    handleChange
                                }) => {
                                    const onLocationFocus = () => {
                                        setSearchingLocation(true);
                                        setFieldTouched("street");
                                    };

                                    const handleSuggestionPress = (item: any) => {
                                        const location = item as SearchLocation;

                                        let street = location.address?.road;
                                        if (location.address?.house_number)
                                            street = `${location.address.house_number} ${street}`;

                                        // Áp dụng được ở US
                                        let state = location.address.state;
                                        if (!state) state = location.address.country;

                                        setFieldValue("street", street);
                                        setFieldValue("city", location.address.city);
                                        setFieldValue("state", state);
                                        setFieldValue("zip", location.address.postcode);
                                        setFieldValue("lat", location.lat);
                                        setFieldValue("lng", location.lon);

                                        handleGoBack();
                                    };

                                    const currentLocation = values.street   // default value
                                        ? values.state
                                            ? `${values.street}, ${values.city
                                            }, ${getStateAbbreviation(values.state)}`
                                            : `${values.street}, ${values.city}`
                                        : "";

                                    if (searchingLocation) return (
                                        <SearchAddress
                                            type="search"
                                            suggestions={suggestions}
                                            setSuggestions={(item) =>
                                                setSuggestions(item as SearchLocation[])
                                            }
                                            handleGoBack={handleGoBack}
                                            handleSuggestionPress={handleSuggestionPress}
                                            defaultLocation={currentLocation}
                                        />
                                    );

                                    return <View>
                                        <Row style={styles.row}>
                                            <UnitButton
                                                text="Single Unit"
                                                iconName="home"
                                                active={values.unitType === "single" ? true : false}
                                                onPress={() => setFieldValue("unitType", "single")}
                                            />
                                            <UnitButton
                                                text="Multiple Units"
                                                iconName="apartment"
                                                active={values.unitType === "multiple" ? true : false}
                                                onPress={() => setFieldValue("unitType", "multiple")}
                                            />
                                        </Row>

                                        <Input
                                            placeholder="Property Address"
                                            label="Address"
                                            value={currentLocation}
                                            onFocus={onLocationFocus}
                                            style={styles.input}
                                            caption={
                                                !values.street && touched.street && errors.street
                                                    ? errors.street
                                                    : undefined
                                            }
                                            status={
                                                !values.street && touched.street && errors.street
                                                    ? "danger"
                                                    : "basic"
                                            }
                                        />

                                        <Select
                                            label="Property Type"
                                            item={values.propertyTypes}
                                            items={propertyTypes}
                                            onItemChange={(item) =>
                                                setFieldValue("propertyType", item)
                                            }
                                            isNullable={false}
                                            style={styles.input}
                                        />

                                        <Row style={[styles.unitRow, styles.input]}>
                                            <Select
                                                label="Beds"
                                                item={values.unit.bedrooms}
                                                items={bedValues}
                                                onItemChange={(item) => {
                                                    setFieldValue("unit.bedrooms", item);
                                                }}
                                                isNullable={false}
                                                style={styles.smallSelect}
                                            />
                                            <Select
                                                label="Baths"
                                                item={values.unit.bathrooms}
                                                items={bathValues}
                                                onItemChange={(item) => {
                                                    setFieldValue("unit.bathrooms", item);
                                                }}
                                                isNullable={false}
                                                style={styles.smallSelect}
                                            />
                                        </Row>
                                    </View>
                                }}
                            </Formik>
                        </View>
                    </Screen>
                )
            }}
            bounces={false}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
    },
    header: {
        marginVertical: 20,
        textAlign: "center",
    },
    row: {
        justifyContent: "space-evenly",
    },
    input: {
        marginTop: 15,
    },
    unitRow: {
        justifyContent: "space-between",
    },
    smallSelect: {
        width: "45%",
    }
});

const propertyTypes: PickerItem[] = [
    { label: "Apartment", value: "Apartment" },
    { label: "Single Family House", value: "Single Family House" },
    { label: "Condominium", value: "Condominium" },
    { label: "Townhouse", value: "Townhouse" },
    {
        label: "Mobile Home / Manufactured Home",
        value: "Mobile Home / Manufactured Home",
    },
];

const bedValues: PickerItem[] = [
    { label: "Studio", value: 0 },
    { label: "1.0", value: 1 },
    { label: "2.0", value: 2 },
    { label: "3.0", value: 3 },
    { label: "4.0", value: 4 },
    { label: "5.0", value: 5 },
    { label: "6.0", value: 6 },
]

const bathValues: PickerItem[] = [
    { label: "0.5", value: 0.5 },
    { label: "1.0", value: 1 },
    { label: "1.5", value: 1.5 },
    { label: "2.0", value: 2 },
    { label: "2.5", value: 2.5 },
    { label: "3.0", value: 3 },
    { label: "3.5", value: 3.5 },
    { label: "4.0", value: 4 },
    { label: "4.5", value: 4.5 },
    { label: "5.0", value: 5 },
    { label: "5.5", value: 5.5 },
    { label: "6.0", value: 6 },
    { label: "6.5", value: 6.5 },
]