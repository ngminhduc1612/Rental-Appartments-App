import { StyleSheet } from "react-native";
import { Button, Text } from "@ui-kitten/components";
import * as yup from "yup";
import { Formik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Screen } from "../components/Screen";
import { ModalHeader } from "../components/ModalHeader";
import { PasswordInput } from "../components/PasswordInput";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useLoading } from "@/hooks/useLoading";
import { resetPassword } from "@/services/user";

export default function ResetPasswordScreen(
  // { route, }: { route: { params: { token: string } } }
) {
  const route = useRoute();
  const { navigate } = useNavigation();
  const { setLoading } = useLoading();

  const handleSubmit = async (values: {
    password: string;
    passwordRepeat: string;
  }) => {
    try {
      setLoading(true);
      const passwordReset = await resetPassword(
        values.password,
        route.params.token
      );
      if (passwordReset) navigate("signInScreen");
    } catch (error) {
      alert("Unable to reset password");
    } finally {
      setLoading(false);
    }
  };
  // const navigation = useNavigation();

  // const resetPassword = useMutation(
  //   async (password: string) => {
  //     return axios.post(
  //       endpoints.resetPassword,
  //       { password },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${route.params.token}`,
  //         },
  //       }
  //     );
  //   },
  //   {
  //     onSuccess() {
  //       navigation.navigate("signInScreen");
  //     },
  //     onError(error: any) {
  //       if (error.response.staus === 401) 
  //         return alert("Invalid or Expired Token");

  //       alert("Unable to reset password.");
  //     },
  //   }
  // );

  // if (resetPassword.isLoading) return <Loading />;

  return (
    <KeyboardAwareScrollView bounces={false}>
      <Screen style={styles.container}>
        <ModalHeader text="DHApartments" XShown />
        <Text category={"h5"} style={styles.header}>
          Reset Password
        </Text>
        <Formik
          initialValues={{
            password: "",
            passwordRepeat: "",
          }}
          validationSchema={yup.object().shape({
            password: yup
              .string()
              .required("A password is required.")
              .matches(
                /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&-+=()!? "]).{8,128}$/,
                "Your password must have 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 special character."
              ),
            passwordRepeat: yup
              .string()
              .oneOf([yup.ref("password"), null], "Passwords don't match")
              .required("Required"),
          })}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            setFieldTouched,
            setFieldValue,
          }) => {
            return (
              <>
                <PasswordInput
                  style={styles.input}
                  value={values.password}
                  onChangeText={handleChange("password")}
                  placeholder="Your Password"
                  label="Password"
                  onBlur={() => setFieldTouched("password")}
                  caption={
                    touched.password && errors.password
                      ? errors.password
                      : undefined
                  }
                  status={
                    touched.password && errors.password ? "danger" : "basic"
                  }
                />
                <PasswordInput
                  style={styles.input}
                  value={values.passwordRepeat}
                  onChangeText={handleChange("passwordRepeat")}
                  placeholder="Repeated Password"
                  label="Repeat Password"
                  onBlur={() => setFieldTouched("passwordRepeat")}
                  caption={
                    touched.passwordRepeat && errors.passwordRepeat
                      ? errors.passwordRepeat
                      : undefined
                  }
                  status={
                    touched.passwordRepeat && errors.passwordRepeat
                      ? "danger"
                      : "basic"
                  }
                />

                <Button
                  style={styles.submitButton}
                  onPress={() => handleSubmit()}
                >
                  Reset Password
                </Button>
              </>
            );
          }}
        </Formik>
      </Screen>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10
  },
  header: {
    textAlign: "center",
    marginVertical: 20
  },
  input: {
    marginTop: 10,
  },
  submitButton: {
    marginTop: 20
  },
});