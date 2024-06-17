import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { View, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Formik } from "formik";
import { Button, Divider } from "@ui-kitten/components";
import * as yup from "yup";

import { Screen } from "@/components/Screen";
import { EditApartment } from "@/types/apartment";
import { bedValues } from "@/constants/bedValues";
import { bathValues } from "@/constants/bathValues";
import { MangeUnitsCard } from "@/components/ManageUnitsCard";
import { theme } from "@/theme";
import { PickerItem } from "react-native-woodpicker";
import { useApartmentsQuery } from "@/hooks/queries/useApartmentsQuery";
import { useEditApartmentMutation } from "@/hooks/mutations/useEditApartmentsMutation";

export default function ManageUnitsScreen(
    // {route,} : {route: {params: {properyID: number}}}
) {
    const route = useRoute();
    // const queryClient = useQueryClient();
    // const navigation = useNavigation();
    // const { setLoading } = useLoading();
    // const apartments = useQuery<{ data: Apartment[] }>("apartments", () =>
    //     axios.get(
    //         `${endpoints.getApartmentsByPropertyID}${route.params.propertyID}`
    //     )
    // );
    const apartments = useApartmentsQuery(route.params.propertyID);

    const editApartments = useEditApartmentMutation();
    // const editApartments = useMutation(
    //     (obj: EditApartment[]) =>
    //         axios.patch(
    //             `${endpoints.updateApartments}${route.params.propertyID}`,
    //             obj
    //         ),
    //     {
    //         onMutate: () => {
    //             setLoading(true);
    //         },
    //         onError(err) {
    //             setLoading(false);
    //             alert("Error updating apartments");
    //         },
    //         onSuccess() {
    //             queryClient.invalidateQueries(queryKeys.myProperties);
    //             setLoading(false);
    //             navigation.goBack();
    //         }
    //     }
    // )

    const apartmentData = apartments.data;
    const initialApartments: EditApartment[] = [];
    if (apartmentData) {
        for (let i of apartmentData) {
            initialApartments.push({
                ID: i.ID,
                unit: i.unit,
                bedrooms: bedValues.filter((item) => item.value === i.bedrooms)[0],
                bathrooms: bathValues.filter((item) => item.value === i.bathrooms)[0],
                sqFt: i.sqFt ? i.sqFt.toString() : "",
                active: i.active,
                editName: i.unit ? false : true,
                availableOn: new Date(i.availableOn),
            });
        }
    }

    return (
        <KeyboardAwareScrollView>
            <Screen>
                <Formik
                    initialValues={{ apartments: initialApartments }}
                    enableReinitialize
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        for (let i of values.apartments) {
                            i.bedrooms = (i.bedrooms as PickerItem).value;
                            i.bathrooms = (i.bathrooms as PickerItem).value;
                            i.sqFt = Number(i.sqFt);
                        }

                        // editApartments.mutate(values.apartments);
                        editApartments.mutate({
                            obj: values.apartments,
                            propertyID: route.params.propertyID,
                        });
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleSubmit,
                        setFieldTouched,
                        setFieldValue,
                        handleChange,
                    }) => {
                        const addUnit = () => {
                            const newApartments = [...values.apartments];

                            newApartments.push({
                                active: true,
                                bedrooms: bedValues[0],
                                bathrooms: bathValues[0],
                                editName: true,
                                sqFt: "",
                                unit: "",
                                availableOn: new Date(),
                            });

                            setFieldValue("apartments", newApartments);
                        };

                        const removeUnit = (index: number) => {
                            const newApartments = values.apartments.filter(
                                (_, idx) => idx !== index
                            );

                            setFieldValue("apartments", newApartments);
                        };
                        return (
                            <View>
                                {values.apartments?.map((apartments, index) => (
                                    <MangeUnitsCard
                                        apartment={apartments}
                                        key={index}
                                        removable={
                                            apartmentData && index > apartmentData.length - 1
                                                ? true
                                                : false
                                        }
                                        index={index}
                                        errors={errors}
                                        touched={touched}
                                        removeUnit={removeUnit}
                                        setFieldValue={setFieldValue}
                                        handleChange={handleChange}
                                        setFieldTouched={setFieldTouched}
                                    />
                                ))}
                                <Button
                                    onPress={addUnit}
                                    appearance="ghost"
                                    status="info"
                                    style={styles.addUnitButton}
                                >
                                    Add Unit
                                </Button>
                                <Divider style={styles.divider} />
                                <Button
                                    style={styles.saveButton}
                                    onPress={() => handleSubmit()}
                                    disabled={values.apartments.length === 0 ? true : false}
                                >
                                    Save Updates
                                </Button>
                            </View>
                        )
                    }}
                </Formik>
            </Screen>
        </KeyboardAwareScrollView>
    )
};

const validationSchema = yup.object().shape({
    apartments: yup.array(
        yup.object().shape({
            unit: yup.string().required("Required"),
            bedrooms: yup.object().shape({
                label: yup.string().required("Required"),
                value: yup.string().required("Required"),
            }),
            bathrooms: yup.object().shape({
                label: yup.string().required("Required"),
                value: yup.string().required("Required"),
            }),
            sqFt: yup.string().required("Required"),
            active: yup.bool().required(),
            editName: yup.bool(),
            availableOn: yup.date().required(),
        })
    ),
});

const styles = StyleSheet.create({
    addUnitButton: { alignSelf: "flex-start", marginVertical: 10 },
    divider: {
        backgroundColor: theme["color-gray"],
        width: "100%",
    },
    saveButton: { marginHorizontal: 10, marginTop: 20 },
});