import { StyleSheet, FlatList, View } from "react-native";
import { Text, Button } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

import { Screen } from "@/components/Screen";
import { useUser } from "@/hooks/useUser";
import SignUpOrSignInScreen from "./signUpOrSignInScreen";
import { Loading } from "@/components/Loading";
import { Card } from "@/components/Card";
import { ModalHeader } from "@/components/ModalHeader";
import { theme } from "@/theme";
import { useMyPropertiesQuery } from "@/hooks/queries/useMyPropertiesQuery";

export default function MyPropertiesScreen() {
    const navigation = useNavigation();
    const { user } = useUser();
    const properties = useMyPropertiesQuery();

    const addPropertyNavigation = () => {
        navigation.navigate("addPropertyScreen")
    }

    if (!user) return <SignUpOrSignInScreen />

    if (properties.isLoading) return <Loading />;

    return (
        <Screen>
            {properties?.data && properties.data.length > 0 ? (
                <FlatList
                    ListHeaderComponent={
                        <>
                            <Button
                                accessoryLeft={
                                    <Entypo
                                        name="plus"
                                        size={16}
                                        color={theme["color-primary-500"]}
                                    />
                                }
                                appearance="ghost"
                                size="small"
                                style={styles.button}
                                onPress={addPropertyNavigation}
                            >
                                Add a Property
                            </Button>
                            <Button
                                accessoryLeft={
                                    <MaterialCommunityIcons
                                        name="refresh"
                                        size={16}
                                        color={theme["color-primary-500"]}
                                    />
                                }
                                appearance="ghost"
                                size="small"
                                style={styles.button}
                                onPress={() => properties.refetch()}
                            >
                                Refresh All
                            </Button>
                        </>
                    }
                    data={properties.data}
                    renderItem={({ item }) => (
                        <Card
                            property={item}
                            myProperty={true}
                            style={styles.card}
                            onPress={() =>
                                navigation.navigate("editPropertyScreen", { propertyID: item.ID })
                            }
                        />
                    )}
                    keyExtractor={(item) => item.ID.toString()}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <>
                    <ModalHeader XShown text="DH Apartments" />
                    <View style={styles.noPropertiesContainer}>
                        <LottieView
                            autoPlay
                            style={styles.lottie}
                            source={require("../assets/lotties/AddProperty.json")}
                        />
                        <Text category="h6" style={styles.text}>
                            You Have No Properties
                        </Text>
                        <Text appearance="hint" style={[styles.text, styles.bottomText]}>
                            Add a property and start renting
                        </Text>

                        <Button
                            style={styles.addPropertyButton}
                            onPress={addPropertyNavigation}
                        >
                            Add Property
                        </Button>
                    </View>
                </>
            )}
        </Screen>
    );
};

const styles = StyleSheet.create({
    noPropertiesContainer: {
        marginTop: 30,
        marginHorizontal: 10,
    },
    card: {
        marginVertical: 10,
    },
    lottie: {
        marginBottom: 50,
        height: 250,
        width: 250,
        alignSelf: "center",
    },
    text: {
        textAlign: "center",
    },
    bottomText: {
        marginTop: 10,
        marginBottom: 30,
    },
    addPropertyButton: {
        marginTop: 20,
    },
    button: {
        alignSelf: "flex-start",
        marginVertical: 5,
    }
});