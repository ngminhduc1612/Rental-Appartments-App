import { StyleSheet } from "react-native";
import { Text, Input, Button } from "@ui-kitten/components";
import * as yup from "yup";
import { Formik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";   // Bàn phím hiển thị không che đi phần input
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";

import { Screen } from "@/components/Screen";
import { ModalHeader } from "@/components/ModalHeader";
import LottieView from "lottie-react-native";

import { forgotPassword } from "@/services/user";
import { useLoading } from "@/hooks/useLoading";

export default function ForgotPasswordScreen() {
    const [emailSent, setEmailSent] = useState(false);

    const { setLoading } = useLoading();
    const handleSubmit = async (values: { email: string }) => {
        try {
            setLoading(true);
            const emailSent = await forgotPassword(values.email);
            if (emailSent?.emailSent) setEmailSent(true);
        } catch (error) {
            alert("Error placing email");
        } finally {
            setLoading(false)
        }
    }

    return (
        <KeyboardAwareScrollView bounces={false}>
            <Screen style={styles.container}>
                <ModalHeader text="DHApartments" XShown />
                {emailSent ? (
                    <>
                        <Text category={"h5"} style={styles.header}>
                            Email Sent!
                        </Text>
                        <Text>
                            An email containing instructions about how to change your Password
                            has been sent to you. Please check your junk mail or spam section
                            if you do not see an email
                        </Text>
                        <LottieView
                            autoPlay
                            style={styles.lottie}
                            source={require("../assets/lotties/EmailSent.json")}
                        />
                    </>
                ) : (
                    <>
                        <Text category={"h5"} style={styles.header}>
                            Forgot Your Password?
                        </Text>
                        <Text>
                            Please enter your mail, and we will send you a link to change your
                            password.
                        </Text>
                        <Formik
                            initialValues={{
                                email: ""
                            }}
                            validationSchema={yup.object().shape({
                                email: yup.string().email().required("Your email is required."),
                            })}
                            onSubmit={handleSubmit}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleSubmit,
                                isSubmitting,
                                setFieldTouched,
                                setFieldValue
                            }) => {
                                return (
                                    <>
                                        <Input
                                            style={styles.input}
                                            value={values.email}
                                            onChangeText={handleChange("email")}
                                            placeholder="Your Email Address"
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                            autoComplete="email"
                                            label="Email"
                                            onBlur={() => setFieldTouched("email")}
                                            caption={
                                                touched.email && errors.email ? errors.email : undefined
                                            }
                                            status={
                                                touched.email && errors.email ? "danger" : "basic"
                                            }
                                        />

                                        <Button
                                            style={styles.button}
                                            onPress={() => handleSubmit()}
                                        >
                                            Continue
                                        </Button>
                                    </>
                                )
                            }}
                        </Formik>
                    </>
                )}
            </Screen>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
    },
    header: {
        textAlign: "center",
        marginVertical: 20,
    },
    button: {
        marginTop: 20,
    },
    input: {
        marginTop: 10,
    },
    lottie: {
        height: 350,
        width: 350,
        marginBottom: 20,
        alignSelf: "center",
    },
});