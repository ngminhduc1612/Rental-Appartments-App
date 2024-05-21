import { View, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text } from "@ui-kitten/components";
import { useRoute } from "@react-navigation/native";

import { Screen } from "@/components/Screen";
import { ModalHeader } from "@/components/ModalHeader";
import { useAuth } from "@/hooks/useAuth";
import SignUpOrSignInScreen from "./signUpOrSignInScreen";
import CreateManagerScreen from "./createManagerScreen";


export default function AddPropertyScreen(
    { route }: { route: { params: { propertyID: number } } }
) {
    // const route = useRoute();
    const {user} = useAuth();
    const manager = false;

    if (!user) return <SignUpOrSignInScreen />;

    if (!manager) return <CreateManagerScreen />;
 
    return (
        <KeyboardAwareScrollView>
            <Screen>
                <ModalHeader text="DH Apartments" XShown/>
                <View style={styles.container}>
                    <Text category="h5" style={styles.header}>
                        Add a Property
                    </Text>
                </View>
            </Screen>
        </KeyboardAwareScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
    }, 
    header: {
        marginVertical: 20,
    }
});

