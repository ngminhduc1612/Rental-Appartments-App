import { View, StyleSheet, FlatList } from "react-native";
import { Button, Text } from "@ui-kitten/components";
import { useState } from "react";
import LottieView from "lottie-react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { Screen } from "@/components/Screen";
import { Row } from "@/components/Row";
import { theme } from "@/theme";
import { properties } from "@/data/property";
import { Card } from "@/components/Card";
import { Property } from "@/types/property";
import { SignUpAndSignInButtons } from "@/components/SignUpAndSignInButtons";
import { useUser } from "@/hooks/useUser";
import { useSavedPropertiesQuery } from "@/hooks/queries/useSavedPropertiesQuery";
import { Loading } from "@/components/Loading";

export default function SavedScreen() {
    const [activeIndex, setActiveIndex] = useState<number>(0); // Đánh dấu button nào đang active, thay đổi màu
    const savedProperties = useSavedPropertiesQuery();
    const contactedProperties = undefined;
    const applicationProperties = undefined;
    const navigation = useNavigation();

    // Refetch nếu properties không xuất hiện sau khi đăng nhập
    useFocusEffect(() => {
        if (
            (!savedProperties.data || savedProperties.data.length === 0) &&
            user &&
            user?.savedProperties &&
            user.savedProperties.length > 0
        )
            savedProperties.refetch();
    })

    const { user } = useUser();  //Tài khoản người sử dụng

    const getButtonAppearance = (buttonIndex: number) => {
        if (activeIndex === buttonIndex) return "filled";
        return "ghost";
    };

    const handleButtonPress = (index: number) => {
        setActiveIndex(index);
    };

    if (savedProperties.isLoading) return <Loading />;

    const getBodyText = (heading: string, subHeading: string) => {
        return (
            <View style={styles.textContainer}>
                <Text category={"h6"} style={styles.text}>
                    {heading}
                </Text>
                <Text appearance={"hint"} style={[styles.text, styles.subHeading]}>
                    {subHeading}
                </Text>
            </View>
        );
    };

    const getPropertiesFlatList = (properties: Property[]) => {
        return (
            <FlatList
                showsVerticalScrollIndicator={false}
                data={properties}
                style={{ marginTop: 10 }}
                renderItem={({ item }) => <Card property={item} style={styles.card} onPress={() => navigation.navigate("propertyDeitalsScreen", { propertyID: item.ID })} />}
                keyExtractor={(item) => item.ID.toString()}
            />
        );
    };

    const getBody = () => {
        if (activeIndex === 0) {
            if (savedProperties?.data && savedProperties.data.length > 0)
                return getPropertiesFlatList(savedProperties.data); 
            return (
                <>
                    <LottieView
                        autoPlay
                        style={styles.lottie}
                        source={require("../../assets/lotties/Favorites.json")}
                    />
                    {getBodyText(
                        "You do not have any favorites saved",
                        "Tap the heart icon on rentals to add favorites"
                    )}
                    {!user && (
                        <SignUpAndSignInButtons
                            style={styles.signInAndSignUpButtonsContainer}
                        />
                    )}
                </>
            );
        };
        if (activeIndex === 1) {
            if (contactedProperties) return getPropertiesFlatList(contactedProperties);
            return (
                <>
                    <LottieView
                        autoPlay
                        style={styles.lottie}
                        source={require("../../assets/lotties/Contacted.json")}
                    />
                    {getBodyText(
                        "You do not contacted any properties yet",
                        "Your contacted properties will show here"
                    )}
                    {!user && (
                        <SignUpAndSignInButtons
                            style={styles.signInAndSignUpButtonsContainer}
                        />
                    )}
                </>
            );
        };
        if (applicationProperties)
            return getPropertiesFlatList(applicationProperties);
        return (
            <>
                <LottieView
                    autoPlay
                    style={styles.lottie}
                    source={require("../../assets/lotties/Applications.json")}
                />
                {getBodyText(
                    "Check the status of your rental applications here",
                    "Any properties that you have applied to will show here"
                )}
                {!user && (
                    <SignUpAndSignInButtons
                        style={styles.signInAndSignUpButtonsContainer}
                    />
                )}
            </>
        );
    };

    return (
        <Screen style={styles.screen}>
            <Row style={styles.buttonContainer}>
                <Button
                    style={[styles.button, styles.favoritesButton]}
                    size="small"
                    appearance={getButtonAppearance(0)}
                    onPress={() => handleButtonPress(0)}
                >
                    Favorites
                </Button>
                <Button
                    style={[styles.button, styles.contactedButton]}
                    size="small"
                    appearance={getButtonAppearance(1)}
                    onPress={() => handleButtonPress(1)}
                >
                    Contacted
                </Button>
                <Button
                    style={[styles.button, styles.applicationButton]}
                    size="small"
                    appearance={getButtonAppearance(2)}
                    onPress={() => handleButtonPress(2)}
                >
                    Aplications
                </Button>
            </Row>
            <View style={styles.container}>{getBody()}</View>
        </Screen>
    );
};

const styles = StyleSheet.create({
    screen: {
        marginVertical: 5,
    },
    buttonContainer: {
        alignItems: "center",
        borderRadius: 5,
    },
    button: {
        width: "33.3%",
        borderRadius: 0,
        borderColor: theme["color-primary-500"]
    },
    applicationButton: {
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    favoritesButton: {
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    contactedButton: {
        borderLeftWidth: 0,
        borderRightWidth: 0,
    },
    container: {
        flex: 1,
        justifyContent: "center",
    },
    lottie: {
        height: 180,
        width: 180,
        marginBottom: 20,
        alignSelf: "center",
    },
    textContainer: {
        marginVertical: 15,
    },
    text: {
        textAlign: "center",
    },
    subHeading: {
        marginTop: 10,
    },
    signInAndSignUpButtonsContainer: {
        marginTop: 15,
    },
    card: {
        marginVertical: 10,
    },
});