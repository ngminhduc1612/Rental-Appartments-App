import { View, StyleSheet, ViewStyle } from "react-native";
import { Button } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

import { theme } from "../theme";

export const SignUpAndSignInButtons = ({ style }: { style?: ViewStyle }) => {
    const navigation = useNavigation();
    return (
        <View style={style}>
            <Button
                onPress={() => navigation.navigate("signInScreen")}
            >
                Sign In
            </Button>
            <Button
                appearance={"ghost"}
                style={styles.signUpButton}
                onPress={() => navigation.navigate("signUpScreen")}
            >
                Create Acount
            </Button>
        </View>
    )
};

const styles = StyleSheet.create({
    signUpButton: {
        marginVertical: 10,
        borderColor: theme["color-primary-500"],
      },
});