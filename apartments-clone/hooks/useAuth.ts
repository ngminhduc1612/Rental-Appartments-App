import { useNavigation } from "expo-router";

import { loginUser, registerUser } from "@/services/user";
import { User } from "@/types/user";
import { useUser } from "./useUser";
import { useLoading } from "./useLoading";

export const useAuth = () => {
    const { login } = useUser();
    const { goBack } = useNavigation();
    const { setLoading } = useLoading();

    const handleSignInUser = (user?: User | null) => {
        if (user) {
            login(user);
            goBack();
        }
    }

    const handleAuthError = () => alert("Unable to authorize");

    const nativeRegister = async (values: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }) => {
        try {
            setLoading(true)

            const user = await registerUser(
                values.firstName,
                values.lastName,
                values.email,
                values.password
            );
            handleSignInUser(user);
        } catch (error) {
            handleAuthError();
        } finally {
            setLoading(false);
        }
    }

    const nativeLogin = async (values: { email: string; password: string }) => {
        try {
            setLoading(true);

            const user = await loginUser(values.email, values.password);
            handleSignInUser(user);
        } catch (error) {
            handleAuthError();
        } finally {
            setLoading(false);
        }
    };

    return { nativeRegister, nativeLogin };
}