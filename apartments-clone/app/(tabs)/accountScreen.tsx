import { ScrollView, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text, Button } from "@ui-kitten/components";

import { Screen } from "@/components/Screen";
import { SignUpAndSignInButtons } from "@/components/SignUpAndSignInButtons";
import { theme } from "@/theme";

export default function AccountScreen() {
    const user = false;
    const navigation = useNavigation();

    const firstSignOutButtons = [
        {
            label: "Add a Property",
            onPress: () => console.log("navigate to AddProperty"),
        },
        {
            label: "View my Properties",
            onPress: () => console.log("navigate to my properties"),
        },
    ];

    const supportButtons = [
        {
            label: "Help Center",
            onPress: () => console.log("navigate to Help Center"),
        },
        {
            label: "Terms and Conditions",
            onPress: () => console.log("navigate to Terms and Condition"),
        },
    ];

    const rentingButtons = [
        {
            label: "Favorite Properties",
            onPress: () => navigation.navigate("(tabs)", { screen: "savedScreen" }),
        },
        {
            label: "Rental Applications",
            onPress: () => console.log("navigate to Rental Applications"),
        },
        {
            label: "My Residences",
            onPress: () => console.log("navigate to My Residences"),
        },
        {
            label: "Rent Payments",
            onPress: () => console.log("navigate to Rent Payments"),
        },
    ]

    const accountButtons = [
        {
            label: "Account Settings",
            onPress: () => console.log("navigate to Account Settings"),
        },
        {
            label: "Billing History",
            onPress: () => console.log("navigate to Billing History"),
        },
        {
            label: "Banks and Cards",
            onPress: () => console.log("navigate to Banks and Cards"),
        },
    ]

    const rentalManagementButtons = [
        {
            label: "Add a Property",
            onPress: () => console.log("navigate to AddProperties"),
        },
        {
            label: "Add Apartment to Property",
            onPress: () => console.log("navigate to MyProperties"),
        },
        {
            label: "View My Properties",
            onPress: () => console.log("navigate to MyProperties"),
        },
    ]




    return (
        <Screen>
            <ScrollView style={styles.container}>
                <View style={styles.defaultMarginHorizontal}>
                    {user ? (
                        <>
                            <Text style={styles.userName} category={"h4"}>
                                Welcome, User's FirstName
                            </Text>
                            <Text style={styles.email} category={"h6"}>
                                user@example.com
                            </Text>
                        </>
                    ) : (
                        <>
                            <Text style={styles.header} category={"h5"}>
                                Renting has never been easier
                            </Text>

                            <SignUpAndSignInButtons />
                            <View style={styles.middleContainer}>
                                <Text category={"s1"} style={styles.subheader}>
                                    Are you a property owner or manager?
                                </Text>
                                <Text style={styles.bodyText}>
                                    Visit our website to access our full suite of rental
                                    management tools and start receiving applications in minutes!
                                </Text>
                            </View>
                        </>
                    )}
                </View>
            </ScrollView>
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    defaultMarginHorizontal: {
        marginHorizontal: 10,
    },
    userName: {
        textAlign: "center",
        fontWeight: "600",
        marginBottom: 5,
        textTransform: "capitalize",
    },
    email: {
        textAlign: "center",
        fontWeight: "500",
        marginBottom: 20,
    },
    header: {
        textAlign: "center",
        marginVertical: 25,
        marginHorizontal: 70,
        fontWeight: "600",
    },
    middleContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 30,
        paddingBottom: 50,
        borderTopColor: theme["color-gray"],
        borderTopWidth: 2,
    },
    subheader: {
        textAlign: "center",
        paddingHorizontal: 20,
    },
    bodyText: {
        marginTop: 10,
        textAlign: "center",
        marginHorizontal: 15,
    },
});