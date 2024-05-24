import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import { Text } from "@ui-kitten/components";
import { View, StyleSheet } from "react-native";

import { Screen } from "./Screen";
import { ModalHeader } from "./ModalHeader";
import { Formik } from "formik";
import { Row } from "./Row";
import { UnitButton } from "./UnitButton";

export const AddPropertySection = () => {
    return (
        <KeyboardAwareFlatList
            data={[1]}
            renderItem={() => {
                return (
                    <Screen>
                        <ModalHeader text="DH Apartments" XShown />
                        <View style={styles.container}>
                            <Text category="h5" style={styles.header}>
                                Add a Property
                            </Text>

                            <Formik
                                initialValues={{
                                    unitType: "single",
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
    }
});