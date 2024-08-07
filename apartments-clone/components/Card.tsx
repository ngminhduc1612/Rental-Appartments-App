import { Pressable, ViewStyle, StyleSheet, TouchableOpacity, View, Modal, Dimensions } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Button } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

import { Property } from "@/types/property";
import { ImageCarousel } from "./ImageCarousel";
import { CardInformation } from "./CardInformation";
import { LISTMARGIN } from "@/constants";
import { theme } from "@/theme";
import { useDeletePropertyMutation } from "@/hooks/mutations/useDeletePropertyMutation";

export const Card = ({
    property,
    onPress,
    myProperty,
    style,
}: {
    property: Property;
    onPress?: () => void;
    myProperty?: boolean;
    style?: ViewStyle;
}) => {
    const navigation = useNavigation();
    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);
    const deleteProperty = useDeletePropertyMutation();

    const handleEditProperty = () => {
        navigation.navigate("editPropertyScreen", { propertyID: property.ID });
        closeModal();
    };

    const handleDeleteProperty = () => {
        deleteProperty.mutate({
            propertyID: property.ID,
        });
        closeModal();
    };

    return (
        <Pressable onPress={onPress} style={[styles.container, styles. boxShadow, style]}>
            <ImageCarousel
                onImagePress={onPress}
                images={property.images}
                chevronsShown
            />
            <CardInformation property={property} myProperty={myProperty} />

            {myProperty ? (
                <TouchableOpacity onPress={openModal} style={styles.elipses}>
                    <MaterialCommunityIcons
                        name="dots-horizontal"
                        color={theme["color-primary-500"]}
                        size={30}
                    />
                </TouchableOpacity>
            ) : null}
            <Modal
                visible={showModal}
                transparent
            >
                <View style={[styles.modal, styles.boxShadow]}>
                    <Button status={"info"} appearance="ghost" style={styles.modalButton} onPress={handleEditProperty}>
                        Edit Property
                    </Button>
                    <Button status={"danger"} appearance="ghost" onPress={handleDeleteProperty}
                    >
                        Delete Property
                    </Button>
                    <Button appearance="ghost" onPress={closeModal}>
                        Cancle
                    </Button>
                </View>
            </Modal>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: LISTMARGIN,
        borderRadius: 5,
        backgroundColor: "white",
    },
    elipses: {
        backgroundColor: "#fff",
        position: "absolute",
        borderRadius: 5,
        paddingHorizontal: 5,
        top: 10,
        right: 15,
    },
    backdrop: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modal: {
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 20,
        position: "absolute",
        top: Dimensions.get("screen").height / 3,
        right: Dimensions.get("screen").width / 4,
    },
    modalButton: {
        marginBottom: 5, // Adjust this value to increase/decrease the space
    },
    boxShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    }
})